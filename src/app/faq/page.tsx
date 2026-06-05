"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const categories = [
  { id: "general", label: "General", desc: "About Rohit Tour & Travel, our cities, our story" },
  { id: "booking", label: "Booking", desc: "How to book, modify, cancel" },
  { id: "pricing", label: "Pricing", desc: "Rates, deposits, hidden costs" },
  { id: "documents", label: "Documents", desc: "ID, license, deposit details" },
  { id: "support", label: "Support", desc: "Help, breakdown, contact" },
];

const faqs = [
  {
    cat: "general",
    q: "What is Rohit Tour & Travel?",
    a: "Rohit Tour & Travel is North India's most trusted premium car rental service, founded in 2012 and headquartered in Rohtak, Haryana. We operate 850+ vehicles across 32+ cities.",
  },
  {
    cat: "general",
    q: "Which cities does Rohit Tour & Travel operate in?",
    a: "We currently operate in Rohtak, Gurugram, Panchkula, Karnal, Ambala, Hisar, Sonipat, Panipat, Chandigarh, Delhi-NCR and 22+ other cities across North India.",
  },
  {
    cat: "booking",
    q: "How do I book a car with Rohit Tour & Travel?",
    a: "You can book directly on our website via the Search Bar, call us at +91 99999 99999, or visit any Rohit Tour & Travel branch. Online bookings are confirmed within 5 minutes.",
  },
  {
    cat: "booking",
    q: "Can I cancel or modify my booking?",
    a: "Yes. Free cancellation up to 24 hours before pickup. Modifications are accepted up to 6 hours before pickup, subject to vehicle availability.",
  },
  {
    cat: "booking",
    q: "How far in advance should I book?",
    a: "For regular cars, 24-48 hours is sufficient. For peak seasons (weddings, holidays) and luxury vehicles, we recommend booking 7-14 days in advance.",
  },
  {
    cat: "pricing",
    q: "What's included in the rental price?",
    a: "All prices include vehicle usage, basic insurance, 24/7 roadside assistance, and unlimited kilometers within city limits. Fuel is the customer's responsibility.",
  },
  {
    cat: "pricing",
    q: "Are there any hidden charges?",
    a: "No. Our pricing is fully transparent. The only additional charges may be: fuel, tolls, parking, traffic violations, or damages — all clearly itemized.",
  },
  {
    cat: "pricing",
    q: "Do you offer long-term rentals?",
    a: "Yes! We offer monthly and yearly subscription plans with significant discounts. Visit our Pricing page or contact us for a custom quote.",
  },
  {
    cat: "documents",
    q: "What documents do I need to rent a car?",
    a: "For self-drive: original driving license, Aadhaar/PAN, one passport-size photo. For chauffeur-driven: Aadhaar or any government ID is sufficient.",
  },
  {
    cat: "documents",
    q: "Is there a security deposit?",
    a: "Yes, a refundable security deposit is required. It ranges from ₹2,000 (economy) to ₹15,000 (luxury), returned within 5-7 business days after vehicle return.",
  },
  {
    cat: "support",
    q: "What if I face a breakdown?",
    a: "We provide 24/7 roadside assistance. Just call our helpline and a replacement vehicle will be dispatched within 60 minutes — at no extra cost.",
  },
  {
    cat: "support",
    q: "How do I contact customer support?",
    a: "Call +91 99999 99999, email support@rohittour.in, or use the in-app chat. Our team responds within 30 seconds, 24/7.",
  },
];

export default function FAQPage() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? faqs : faqs.filter((f) => f.cat === filter);

  return (
    <>
      <Navbar />
      <main>
        <section id="faqs" className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
          <div className="relative max-w-4xl mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2.5 mb-14">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                  filter === "all"
                    ? "bg-primary text-white shadow-glow-red"
                    : "bg-white/5 text-body border border-white/10 hover:border-primary/50 hover:text-white"
                }`}
              >
                All ({faqs.length})
              </button>
              {categories.map((c) => {
                const count = faqs.filter((f) => f.cat === c.id).length;
                const isActive = filter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-glow-red"
                        : "bg-white/5 text-body border border-white/10 hover:border-primary/50 hover:text-white"
                    }`}
                  >
                    {c.label} ({count})
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {visible.length === 0 && (
                <p className="text-body text-center py-16 text-base">
                  No questions found for this category.
                </p>
              )}
              {visible.map((faq, i) => {
                const key = `${faq.q}-${i}`;
                const isOpen = active === key;
                return (
                  <div
                    key={key}
                    className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                      isOpen
                        ? "border-primary/40 bg-gradient-to-br from-primary/[0.07] to-transparent shadow-glow-red"
                        : "border-white/[0.06] bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => setActive(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary/70 mb-1.5 block">
                          {faq.cat}
                        </span>
                        <h3
                          className={`font-black text-base lg:text-lg italic tracking-tight transition-colors duration-300 ${
                            isOpen ? "text-white" : "text-white/90 group-hover:text-white"
                          }`}
                        >
                          {faq.q}
                        </h3>
                      </div>
                      <span
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isOpen
                            ? "bg-primary rotate-45"
                            : "bg-white/5 border border-white/10 group-hover:border-primary/40"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                          <div className="h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent mb-4" />
                          <p className="text-body leading-relaxed text-base">
                            <span className="text-primary font-black italic tracking-tight mr-2">
                              A.
                            </span>
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="bento-chip mb-5">Still Have Questions?</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-4 mb-5">
                  We Are Here to{" "}
                  <span className="text-gradient-primary">Help</span>
                </h2>
                <p className="text-body leading-relaxed mb-8">
                  Our support team is available 24/7 to answer any questions you
                  may have. Fill out the form and we&apos;ll get back to you within
                  30 minutes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-body font-semibold tracking-wide uppercase">Call Us</p>
                      <a href="tel:+918708765123" className="text-white font-bold hover:text-primary transition-colors">+91 87087 65123</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-body font-semibold tracking-wide uppercase">Email Us</p>
                      <a href="mailto:support@rohittour.in" className="text-white font-bold hover:text-primary transition-colors">support@rohittour.in</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-10">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-primary placeholder:text-body/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-primary placeholder:text-body/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">Your Question</label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-primary placeholder:text-body/40 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-white text-white hover:text-secondary font-black py-3.5 px-6 text-sm uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer shine-effect overflow-hidden"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
