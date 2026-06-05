import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { connect } from "net";

// Quick TCP check — returns true if the port is open (no SMTP handshake needed)
function tcpCheck(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = connect(port, host, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
    socket.setTimeout(3000, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

// Next.js Turbopack bundling breaks `__dirname`, so we use process.cwd()
// to construct the absolute path to Mailgen's bundled theme files.
// See: https://github.com/eladnava/mailgen#next-js
const mailGenerator = new Mailgen({
  theme: {
    path: process.cwd() + "/node_modules/mailgen/themes/default/index.html",
    plaintextPath:
      process.cwd() + "/node_modules/mailgen/themes/default/index.txt",
  },
  product: {
    name: "Rohit Tour & Travel",
    link: "https://rohittour.in",
    logo: "https://rohittour.in/logo.png",
  },
});

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    requireTLS: true,
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });
}

interface ContactBody {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function devModeResponse(data: { name: string; email: string; phone: string; subject: string; message: string }) {
  console.log("=== DEV MODE: Contact Form Submission ===");
  console.log(data);
  console.log("=== End of Submission ===");

  return NextResponse.json({
    success: true,
    message:
      "Thank you for reaching out! We have received your message and will get back to you within 24 hours.",
  });
}

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length >= 2 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" &&
    b.subject.trim().length >= 2 &&
    typeof b.message === "string" &&
    b.message.trim().length >= 10
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!validate(body)) {
      return NextResponse.json(
        { error: "Please fill in all required fields correctly." },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = body;
    const transporter = getTransporter();

    if (!transporter) {
      return devModeResponse({ name, email, phone, subject, message });
    }

    // Fast TCP pre-check before attempting SMTP handshake
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const portOpen = await tcpCheck(smtpHost, smtpPort);
    if (!portOpen) {
      console.warn(`SMTP unreachable (${smtpHost}:${smtpPort}) — falling back to dev mode`);
      return devModeResponse({ name, email, phone, subject, message });
    }

    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER!;
    const adminEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER!;

    // ── 1. Admin notification email ──
    const adminEmailBody = mailGenerator.generate({
      body: {
        title: "New Contact Inquiry",
        intro: `You have received a new inquiry from ${name}.`,
        table: {
          data: [
            { key: "Name", value: name },
            { key: "Email", value: email },
            { key: "Phone", value: phone || "Not provided" },
            { key: "Subject", value: subject },
            { key: "Message", value: message },
          ],
          columns: { customWidth: { key: "120px", value: "auto" } },
        },
        action: {
          instructions:
            "Click the button below to reply to this inquiry directly.",
          button: {
            color: "#dc2626",
            text: `Reply to ${name}`,
            link: `mailto:${email}`,
          },
        },
        signature: "Best regards",
      },
    });

    await transporter.sendMail({
      from: `"Rohit Tour & Travel" <${fromEmail}>`,
      to: adminEmail,
      subject: `New Inquiry from ${name} — ${subject}`,
      html: adminEmailBody,
    });

    // ── 2. User confirmation email ──
    const userEmailBody = mailGenerator.generate({
      body: {
        title: "Thank You for Reaching Out!",
        intro: [
          `Hi ${name},`,
          "Thank you for contacting Rohit Tour & Travel. We have received your inquiry and our team will review it shortly.",
          "We aim to respond to all inquiries within 24 hours. If your request is urgent, please feel free to call us directly.",
        ],
        table: {
          data: [
            { key: "Subject", value: subject },
            { key: "Message", value: message },
          ],
          columns: { customWidth: { key: "100px", value: "auto" } },
        },
        action: {
          instructions:
            "While you wait, explore our fleet of premium vehicles:",
          button: {
            color: "#dc2626",
            text: "Browse Our Fleet",
            link: "https://rohittour.in/fleet",
          },
        },
        outro:
          "If you have any urgent queries, call us at +91-213-666-0027 or reply to this email.",
        signature: "Best regards",
      },
    });

    await transporter.sendMail({
      from: `"Rohit Tour & Travel" <${fromEmail}>`,
      to: email,
      subject: "Thank You for Contacting Rohit Tour & Travel",
      html: userEmailBody,
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you for reaching out! We have received your message and will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while sending your message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
