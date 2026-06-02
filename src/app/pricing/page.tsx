"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cycles = [
  { id: "hourly", label: "Hourly", suffix: "/hr" },
  { id: "daily", label: "Daily", suffix: "/day" },
  { id: "weekly", label: "Weekly", suffix: "/wk" },
  { id: "monthly", label: "Monthly", suffix: "/mo" },
];

const tiers = {
  hourly: [
    { name: "Economy", price: "199", desc: "Swift, Wagon R, Alto", featured: false, features: ["Unlimited km", "Basic insurance", "Pickup & drop", "24/7 support"] },
    { name: "Premium", price: "399", desc: "Creta, Seltos, Innova", featured: true, features: ["Unlimited km", "Premium insurance", "Free delivery in 5km", "Priority support", "Free cancellation"] },
    { name: "Luxury", price: "899", desc: "Fortuner, Audi, BMW", featured: false, features: ["Unlimited km", "Comprehensive insurance", "Chauffeur option", "VIP support", "Free cancellation", "Premium delivery"] },
  ],
  daily: [
    { name: "Economy", price: "1,499", desc: "Swift, Wagon R, Alto", featured: false, features: ["200 km/day", "Basic insurance", "Pickup & drop", "24/7 support"] },
    { name: "Premium", price: "3,499", desc: "Creta, Seltos, Innova", featured: true, features: ["300 km/day", "Premium insurance", "Free delivery in 10km", "Priority support", "Free cancellation"] },
    { name: "Luxury", price: "8,999", desc: "Fortuner, Audi, BMW", featured: false, features: ["Unlimited km", "Comprehensive insurance", "Chauffeur option", "VIP support", "Free cancellation", "Premium delivery"] },
  ],
  weekly: [
    { name: "Economy", price: "8,999", desc: "Swift, Wagon R, Alto", featured: false, features: ["1,500 km/week", "Basic insurance", "Pickup & drop", "24/7 support"] },
    { name: "Premium", price: "21,999", desc: "Creta, Seltos, Innova", featured: true, features: ["2,500 km/week", "Premium insurance", "Free delivery", "Priority support", "Free cancellation"] },
    { name: "Luxury", price: "55,999", desc: "Fortuner, Audi, BMW", featured: false, features: ["Unlimited km", "Comprehensive insurance", "Chauffeur option", "VIP support", "Free cancellation"] },
  ],
  monthly: [
    { name: "Economy", price: "29,999", desc: "Swift, Wagon R, Alto", featured: false, features: ["6,000 km/month", "Basic insurance", "Pickup & drop", "24/7 support"] },
    { name: "Premium", price: "74,999", desc: "Creta, Seltos, Innova", featured: true, features: ["12,000 km/month", "Premium insurance", "Free delivery", "Priority support", "Vehicle swap available"] },
    { name: "Luxury", price: "1,99,999", desc: "Fortuner, Audi, BMW", featured: false, features: ["Unlimited km", "Comprehensive insurance", "Chauffeur option", "VIP support", "Vehicle swap available"] },
  ],
};

const addons = [
  { name: "Zero-Dep Insurance", price: "\u20b9299/day", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>) },
  { name: "Additional Driver", price: "\u20b9199/day", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>) },
  { name: "Child Seat", price: "\u20b9149/day", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>) },
  { name: "4G WiFi Hotspot", price: "\u20b999/day", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" /></svg>) },
  { name: "GPS Navigation", price: "\u20b9149/day", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>) },
  { name: "Roof Carrier", price: "\u20b9249/day", icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>) },
];

const faqs = [
  { q: "Are taxes included in the prices?", a: "GST is calculated at checkout. All prices shown are exclusive of 18% GST, which is transparently added to your final invoice." },
  { q: "Can I switch plans mid-rental?", a: "Yes — you can upgrade to a longer cycle or premium vehicle at any time. We'll prorate the difference." },
  { q: "What if I exceed the km limit?", a: "Extra km is charged at \u20b912/km (economy) to \u20b925/km (luxury). We notify you at 80% of your limit." },
  { q: "Is fuel included?", a: "No — fuel is the customer's responsibility. We provide the vehicle with a full tank and expect it back full (or pre-paid fuel option at +20%)." },
];

export default function PricingPage() {
  const [cycle, setCycle] = useState<keyof typeof tiers>("daily");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const plans = tiers[cycle];
  const cycleMeta = cycles.find((c) => c.id === cycle)!;

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-secondary overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-body/60 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="w-4 h-px bg-primary/40" />
              <span className="text-primary/80">Pricing</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white leading-[0.9]">
              Our <span className="text-gradient-primary">Plans</span>
            </h1>
            <p className="mt-6 text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Choose the rental cycle that fits your journey. All plans include insurance, 24/7 support, and our 850+ premium vehicles.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
              {cycles.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCycle(c.id as keyof typeof tiers)}
                  className={`relative px-7 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    cycle === c.id
                      ? "bg-primary text-white shadow-glow-red"
                      : "bg-white/5 text-body border border-white/10 hover:border-primary/50 hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 lg:p-10 flex flex-col transition-all duration-500 ${
                    plan.featured
                      ? "bg-gradient-to-b from-primary/[0.15] via-bg-dark to-bg-dark border-2 border-primary/40 shadow-[0_0_60px_-15px_rgba(220,38,38,0.3)] scale-[1.02] lg:scale-105"
                      : "bg-white/[0.04] border border-white/10 hover:border-white/20"
                  }`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-primary rounded-full text-white text-[10px] font-black tracking-[0.25em] uppercase shadow-glow-red">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[10px] font-black tracking-[0.3em] text-primary/60 uppercase">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-black text-white mt-1 capitalize">{plan.name}</h3>
                    </div>
                    {plan.featured && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />}
                  </div>

                  <p className="text-body text-sm mb-6 border-l-2 border-primary/30 pl-3">{plan.desc}</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-lg text-primary font-bold">₹</span>
                    <span className="text-6xl lg:text-7xl font-black italic tracking-tighter leading-none bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-body text-sm font-bold ml-2">{cycleMeta.suffix}</span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-6" />

                  <ul className="space-y-3.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/checkout"
                    className={`block text-center w-full py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all duration-300 ${
                      plan.featured
                        ? "bg-primary text-white hover:bg-primary-dark shadow-glow-red hover:shadow-glow-red-strong"
                        : "border border-white/20 text-white hover:bg-white hover:text-secondary"
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Extras
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mt-3">
                  Add-Ons &{" "}
                  <span className="text-gradient-primary">Upgrades</span>
                </h2>
              </div>
              <p className="text-body text-sm md:max-w-md leading-relaxed md:text-right">
                Tailor your ride with optional services designed for comfort, safety, and convenience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {addons.map((addon, i) => (
                <div
                  key={addon.name}
                  className="group relative bg-white/[0.03] border border-white/10 hover:border-primary/30 rounded-2xl p-5 lg:p-6 flex items-center justify-between transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {addon.icon}
                    </div>
                    <p className="text-white font-bold text-sm lg:text-base">{addon.name}</p>
                  </div>
                  <p className="text-primary font-black italic whitespace-nowrap">{addon.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="max-w-3xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Common Questions
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mt-3">
                Frequently{" "}
                <span className="text-gradient-primary">Asked</span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-all duration-300 ${
                    openFaq === i
                      ? "border-primary/40 bg-primary/[0.06]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
                  >
                    <span className="text-white font-bold text-sm lg:text-base pr-4">{faq.q}</span>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        openFaq === i
                          ? "bg-primary border-primary rotate-45"
                          : "border-white/20 group-hover:border-primary"
                      }`}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />
                      <p className="text-body text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl mx-auto px-4 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6">
              Stay Connected
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mb-6">
              Get{" "}
              <span className="text-gradient-primary">Exclusive</span>{" "}
              Deals
            </h2>
            <p className="text-body leading-relaxed mb-10 max-w-lg mx-auto">
              Subscribe to our newsletter and be the first to know about new fleets, seasonal discounts, and premium offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-body/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-primary text-white font-black uppercase tracking-wider text-sm hover:bg-primary-dark transition-all shadow-glow-red hover:shadow-glow-red-strong"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
