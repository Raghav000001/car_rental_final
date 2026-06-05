import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import path from "path";
import fs from "fs";

const PRODUCT = {
  name: "Rohit Tour & Travel",
  link: "https://rohittour.in",
  logo: "https://rohittour.in/logo.png",
};

let mailGenerator: Mailgen | null = null;

function getMailGenerator(): Mailgen | null {
  if (mailGenerator) return mailGenerator;

  const candidates: string[] = [];

  // Try resolving via mailgen's own package.json (most reliable)
  try {
    const pkgPath = require.resolve("mailgen/package.json");
    const root = path.dirname(pkgPath);
    candidates.push(path.join(root, "themes/default/index.html"));
  } catch {
    /* empty */
  }

  candidates.push(
    path.join(process.cwd(), "node_modules/mailgen/themes/default/index.html"),
  );

  for (const themePath of candidates) {
    try {
      if (fs.existsSync(themePath)) {
        mailGenerator = new Mailgen({
          theme: {
            path: themePath,
            plaintextPath: themePath.replace("index.html", "index.txt"),
          },
          product: PRODUCT,
        });
        return mailGenerator;
      }
    } catch {
      /* empty */
    }
  }

  return null;
}

function buildAdminHtml(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): string {
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;background:#111;color:#f3f4f6;padding:40px">
<div style="max-width:560px;margin:auto;background:#1a1a1a;border-radius:12px;padding:32px;border:1px solid #27272a">
<h2 style="color:#dc2626;margin:0 0 24px">New Contact Inquiry</h2>
<table style="width:100%;border-collapse:collapse">
<tr><td style="padding:8px 0;color:#9ca3af">Name</td><td style="padding:8px 0;color:#f3f4f6">${data.name}</td></tr>
<tr><td style="padding:8px 0;color:#9ca3af">Email</td><td style="padding:8px 0;color:#f3f4f6">${data.email}</td></tr>
<tr><td style="padding:8px 0;color:#9ca3af">Phone</td><td style="padding:8px 0;color:#f3f4f6">${data.phone || "Not provided"}</td></tr>
<tr><td style="padding:8px 0;color:#9ca3af">Subject</td><td style="padding:8px 0;color:#f3f4f6">${data.subject}</td></tr>
<tr><td style="padding:8px 0;color:#9ca3af">Message</td><td style="padding:8px 0;color:#f3f4f6">${data.message}</td></tr>
</table>
<a href="mailto:${data.email}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#dc2626;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Reply to ${data.name}</a>
<p style="margin-top:32px;color:#9ca3af;font-size:12px">Rohit Tour &amp; Travel</p>
</div></body></html>`;
}

function buildUserHtml(name: string): string {
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;background:#111;color:#f3f4f6;padding:40px">
<div style="max-width:560px;margin:auto;background:#1a1a1a;border-radius:12px;padding:32px;border:1px solid #27272a">
<h2 style="color:#dc2626;margin:0 0 16px">Thank You for Reaching Out!</h2>
<p>Hi ${name},</p>
<p>Thank you for contacting Rohit Tour &amp; Travel. We have received your inquiry and our team will review it shortly.</p>
<p>We aim to respond to all inquiries within 24 hours. For urgent requests, call us at <strong>+91-213-666-0027</strong>.</p>
<a href="https://rohittour.in/fleet" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#dc2626;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold">Browse Our Fleet</a>
<p style="margin-top:32px;color:#9ca3af;font-size:12px">Rohit Tour &amp; Travel</p>
</div></body></html>`;
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    socketTimeout: 10000,
  });
}

const FROM_EMAIL = process.env.FROM_EMAIL || process.env.SMTP_USER || "noreply@rohittour.in";
const ADMIN_EMAIL = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "rohit1998raman@gmail.com";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping admin notification", data);
    return;
  }

  const mg = getMailGenerator();
  const html = mg
    ? mg.generate({
        body: {
          title: "New Contact Inquiry",
          intro: `You have received a new inquiry from ${data.name}.`,
          table: {
            data: [
              { key: "Name", value: data.name },
              { key: "Email", value: data.email },
              { key: "Phone", value: data.phone || "Not provided" },
              { key: "Subject", value: data.subject },
              { key: "Message", value: data.message },
            ],
            columns: { customWidth: { key: "120px", value: "auto" } },
          },
          action: {
            instructions: "Click the button below to reply directly.",
            button: {
              color: "#dc2626",
              text: `Reply to ${data.name}`,
              link: `mailto:${data.email}`,
            },
          },
          signature: "Best regards",
        },
      })
    : buildAdminHtml(data);

  await transporter.sendMail({
    from: `"Rohit Tour & Travel" <${FROM_EMAIL}>`,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry from ${data.name} — ${data.subject}`,
    html,
  });
}

export async function sendSubmissionAcknowledgment(data: ContactFormData): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured — skipping user ack", data);
    return;
  }

  const mg = getMailGenerator();
  const html = mg
    ? mg.generate({
        body: {
          title: "Thank You for Reaching Out!",
          intro: [
            `Hi ${data.name},`,
            "Thank you for contacting Rohit Tour & Travel. We have received your inquiry and our team will review it shortly.",
            "We aim to respond to all inquiries within 24 hours. If your request is urgent, please feel free to call us directly.",
          ],
          table: {
            data: [
              { key: "Subject", value: data.subject },
              { key: "Message", value: data.message },
            ],
            columns: { customWidth: { key: "100px", value: "auto" } },
          },
          action: {
            instructions: "While you wait, explore our fleet of premium vehicles:",
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
      })
    : buildUserHtml(data.name);

  await transporter.sendMail({
    from: `"Rohit Tour & Travel" <${FROM_EMAIL}>`,
    to: data.email,
    subject: "Thank You for Contacting Rohit Tour & Travel",
    html,
  });
}
