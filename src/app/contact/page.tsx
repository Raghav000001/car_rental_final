import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import ContactMapSection from "@/components/ContactMapSection";

export const metadata: Metadata = {
  title: "Contact Us - Rohit Tour & Travel Premium Car Rental",
  description:
    "Get in touch with Rohit Tour & Travel. Send us a message, and our team will get back to you within 24 hours. Premium car rental services across India.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
        <ContactMapSection />
      </main>
      <Footer />
    </>
  );
}
