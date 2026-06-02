"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

const steps = [
  { id: 1, label: "Trip Details" },
  { id: 2, label: "Personal Info" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Confirm" },
];

const vehicles = [
  { name: "Maruti Swift Dzire", price: 1499, image: "https://picsum.photos/seed/swift/200/120" },
  { name: "Hyundai Creta", price: 3499, image: "https://picsum.photos/seed/creta/200/120" },
  { name: "Toyota Fortuner", price: 8999, image: "https://picsum.photos/seed/fortuner/200/120" },
  { name: "Innova Crysta", price: 4999, image: "https://picsum.photos/seed/innova/200/120" },
];

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { id: "upi", label: "UPI", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
  { id: "netbanking", label: "Net Banking", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

const banks = ["Select your bank", "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Yes Bank"];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [vehicle, setVehicle] = useState(vehicles[1].name);
  const [pickup, setPickup] = useState("Rohtak");
  const [drop, setDrop] = useState("Rohtak");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [payment, setPayment] = useState("card");
  const [bookingNumber] = useState(() => Math.floor(Math.random() * 900000) + 100000);

  const selectedVehicle = vehicles.find((v) => v.name === vehicle)!;
  const subtotal = selectedVehicle.price;
  const insurance = Math.round(subtotal * 0.15);
  const gst = Math.round((subtotal + insurance) * 0.18);
  const total = subtotal + insurance + gst;

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="bg-bg-dark min-h-screen pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="relative max-w-3xl mx-auto px-4 lg:px-8 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-8 shadow-glow-red-strong animate-scaleIn">
              <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="bento-chip mb-6">Booking Confirmed</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic leading-[0.9] mb-4 mt-4">
              You&apos;re All <span className="text-gradient-primary">Set!</span>
            </h1>
            <p className="text-body text-lg mb-10 max-w-xl mx-auto">
              Your booking for <span className="text-white font-bold">{vehicle}</span> has been confirmed. A confirmation has been sent to <span className="text-white font-bold">{email || "your email"}</span>.
            </p>
            <div className="bento-card p-8 text-left max-w-md mx-auto inline-block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Booking ID
              </span>
              <p className="bento-number text-5xl mt-2 mb-6">
                #CRL-{bookingNumber}
              </p>
              <div className="bento-divider" />
              <div className="space-y-3 text-sm mt-4">
                <div className="flex justify-between"><span className="text-body">Vehicle</span><span className="text-white font-bold">{vehicle}</span></div>
                <div className="flex justify-between"><span className="text-body">Pickup</span><span className="text-white font-bold">{pickup}</span></div>
                <div className="flex justify-between"><span className="text-body">Drop</span><span className="text-white font-bold">{drop}</span></div>
                <div className="flex justify-between pt-3 border-t border-white/10"><span className="text-body">Total</span><span className="text-primary font-black text-lg">₹{total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-36 pb-14 bg-bg-dark overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/60 to-bg-dark" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/[0.04] to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2.5 text-sm mb-4">
              <Link href="/" className="text-body hover:text-primary transition-colors duration-200">Home</Link>
              <span className="text-white/10">/</span>
              <span className="text-body">Pages</span>
              <span className="text-white/10">/</span>
              <span className="text-primary font-semibold">Checkout</span>
            </nav>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter italic leading-[0.9]">
              Check<span className="text-gradient-primary">out</span>
            </h1>
            <p className="text-body mt-3 max-w-xl text-sm sm:text-base">
              Complete your booking in four simple steps — secure payment, instant confirmation.
            </p>
          </div>
        </section>

        <section className="pb-24 bg-bg-dark relative">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-center mb-12">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  {i > 0 && (
                    <div className={`w-10 sm:w-16 md:w-24 h-[2px] transition-all duration-700 ${step > i ? "bg-primary" : "bg-white/10"}`} />
                  )}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-500 ${
                        step > s.id
                          ? "bg-primary text-white"
                          : step === s.id
                            ? "bg-primary text-white shadow-glow-red"
                            : "bg-white/5 text-body border border-white/10"
                      }`}
                    >
                      {step > s.id ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        `0${s.id}`
                      )}
                    </div>
                    <span className={`hidden sm:block text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mt-2.5 transition-colors duration-500 ${
                      step >= s.id ? "text-white" : "text-body"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-8">
                <div className="bento-card p-6 sm:p-8 lg:p-10">
                  <form onSubmit={submit}>
                    {step === 1 && (
                      <div className="animate-fadeIn">
                        <span className="bento-chip mb-4">Step 01</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter mb-6 mt-3">
                          Trip <span className="text-gradient-primary">Details</span>
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-body mb-3">
                              Choose Your Vehicle
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {vehicles.map((v) => (
                                <button
                                  type="button"
                                  key={v.name}
                                  onClick={() => setVehicle(v.name)}
                                  className={`group relative p-4 rounded-xl border text-left transition-all duration-300 ${
                                    vehicle === v.name
                                      ? "border-primary bg-primary/[0.08]"
                                      : "border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-primary/[0.04]"
                                  }`}
                                >
                                  {vehicle === v.name && (
                                    <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </span>
                                  )}
                                  <div className="flex items-center gap-4">
                                    <img src={v.image} alt={v.name} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                                    <div className="min-w-0">
                                      <p className="text-white font-bold text-sm truncate">{v.name}</p>
                                      <p className="text-primary text-xs font-black mt-1">
                                        ₹{v.price.toLocaleString()}
                                        <span className="text-body font-normal text-[10px]">/day</span>
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Pickup Location</label>
                              <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Drop Location</label>
                              <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input value={drop} onChange={(e) => setDrop(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Pickup Date</label>
                            <div className="relative">
                              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300 [color-scheme:dark]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="animate-fadeIn">
                        <span className="bento-chip mb-4">Step 02</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter mb-6 mt-3">
                          Personal <span className="text-gradient-primary">Info</span>
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Full Name</label>
                            <div className="relative">
                              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="John Doe" />
                            </div>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Email</label>
                              <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="you@example.com" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Phone</label>
                              <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="+91 99999 99999" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Driving License Number</label>
                            <div className="relative">
                              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <line x1="8" y1="9" x2="16" y2="9" />
                                <line x1="8" y1="13" x2="13" y2="13" />
                              </svg>
                              <input value={license} onChange={(e) => setLicense(e.target.value)} required className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="HR-26-2014-XXXXXXX" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="animate-fadeIn">
                        <span className="bento-chip mb-4">Step 03</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter mb-6 mt-3">
                          Payment <span className="text-gradient-primary">Method</span>
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                          {paymentMethods.map((m) => (
                            <button
                              type="button"
                              key={m.id}
                              onClick={() => setPayment(m.id)}
                              className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                                payment === m.id
                                  ? "border-primary bg-primary/10 text-white shadow-glow-red"
                                  : "border-white/10 text-body hover:border-primary/30 hover:bg-white/[0.03]"
                              }`}
                            >
                              <svg className={`w-6 h-6 mx-auto mb-2 ${payment === m.id ? "text-primary" : "text-body"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                              </svg>
                              <span className="text-xs font-bold">{m.label}</span>
                            </button>
                          ))}
                        </div>

                        {payment === "card" && (
                          <div className="space-y-4 animate-fadeIn">
                            <div>
                              <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Card Number</label>
                              <input required className="w-full px-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Expiry</label>
                                <input required className="w-full px-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="MM/YY" />
                              </div>
                              <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">CVV</label>
                                <input required className="w-full px-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="123" />
                              </div>
                            </div>
                          </div>
                        )}

                        {payment === "upi" && (
                          <div className="animate-fadeIn">
                            <div className="relative">
                              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              <input required className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300" placeholder="yourname@upi" />
                            </div>
                          </div>
                        )}

                        {payment === "netbanking" && (
                          <div className="animate-fadeIn">
                            <label className="block text-xs font-black uppercase tracking-widest text-body mb-2">Select Bank</label>
                            <select className="w-full px-4 py-3.5 bg-secondary border border-white/10 focus:border-primary text-white text-sm outline-none rounded-xl transition-all duration-300">
                              {banks.map((b) => (
                                <option key={b} className="bg-secondary">{b}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    {step === 4 && (
                      <div className="animate-fadeIn">
                        <span className="bento-chip mb-4">Step 04</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter mb-6 mt-3">
                          Review & <span className="text-gradient-primary">Confirm</span>
                        </h3>
                        <div className="rounded-xl border border-white/10 overflow-hidden">
                          {[
                            { label: "Vehicle", value: vehicle },
                            { label: "Pickup", value: pickup },
                            { label: "Drop", value: drop },
                            { label: "Date", value: date || "\u2014" },
                            { label: "Name", value: name || "\u2014" },
                            { label: "Email", value: email || "\u2014" },
                            { label: "Phone", value: phone || "\u2014" },
                            { label: "Payment", value: paymentMethods.find((m) => m.id === payment)?.label || payment },
                          ].map((row, i) => (
                            <div key={row.label} className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-white/[0.02]" : ""} ${i < 7 ? "border-b border-white/5" : ""}`}>
                              <span className="text-body text-xs font-semibold uppercase tracking-wider">{row.label}</span>
                              <span className="text-white font-bold text-right">{row.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={back}
                          className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 hover:border-primary text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary/10 rounded-xl"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7l-7-7 7-7" />
                          </svg>
                          Back
                        </button>
                      )}
                      <div className="flex-1" />
                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={next}
                          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-white text-white hover:text-secondary font-black text-sm uppercase tracking-wider transition-all duration-300 rounded-xl group cursor-pointer"
                        >
                          Continue
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-white text-white hover:text-secondary font-black text-sm uppercase tracking-wider transition-all duration-300 rounded-xl group cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Confirm Booking
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bento-card-featured p-6 lg:p-8 lg:sticky lg:top-32">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Order Summary</span>
                      <p className="text-white font-bold text-sm mt-0.5">{vehicle}</p>
                    </div>
                  </div>

                  <div className="bento-divider" />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-body">Subtotal</span>
                      <span className="text-white font-bold">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body flex items-center gap-1.5">
                        Insurance
                        <span className="text-[10px] text-primary font-bold">(15%)</span>
                      </span>
                      <span className="text-white font-bold">₹{insurance.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body flex items-center gap-1.5">
                        GST
                        <span className="text-[10px] text-primary font-bold">(18%)</span>
                      </span>
                      <span className="text-white font-bold">₹{gst.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bento-divider" />

                  <div className="flex items-center justify-between">
                    <span className="text-white font-black uppercase tracking-wider text-sm">Total</span>
                    <span className="bento-number text-3xl">₹{total.toLocaleString()}</span>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-[10px] text-body leading-relaxed">
                        Final amount may vary based on actual rental duration and add-ons. Free cancellation up to 24 hours before pickup.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
