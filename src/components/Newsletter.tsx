"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  placeholder?: string;
  benefitLabel?: string;
}

export default function Newsletter({
  title = "Never Miss a Ride",
  subtitle = "Get exclusive offers, new arrival alerts, and driving tips delivered straight to your inbox. Join 2,400+ subscribers who ride with us.",
  buttonText = "Subscribe",
  placeholder = "Enter your email",
  benefitLabel = "Get 10% Off Your First Rental",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setMessage("You\u2019re in! Check your inbox for a welcome surprise.");
      setTimeout(() => {
        setStatus("idle");
        setEmail("");
        setMessage("");
      }, 4000);
    }, 1500);
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-secondary">
      {/* Full-bleed background image with cinematic slow-zoom */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 12, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1624190094006-510057da58df?w=1600&q=85"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        {/* Lighter, more transparent overlays so the car is visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-secondary/30" />
      </div>

      {/* Speed light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-20 w-40 h-[1px] bg-gradient-to-l from-primary/50 via-primary/20 to-transparent"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: -600, opacity: [0, 0.8, 0] }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-2/3 -right-20 w-32 h-[1px] bg-gradient-to-l from-white/40 via-white/15 to-transparent"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: -700, opacity: [0, 0.6, 0] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity, delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 -right-20 w-24 h-[1px] bg-gradient-to-l from-primary/30 via-primary/10 to-transparent"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: -500, opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity, delay: 0.8 }}
        />
      </div>

      {/* Atmospheric glow orbs */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Left column: value prop */}
          <div className="lg:col-span-2">
            <div className="w-14 h-14 mb-6 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>

            {benefitLabel && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {benefitLabel}
              </div>
            )}

            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter italic leading-[0.9] mb-5 pr-1">
              {title}
            </h2>

            <p className="text-body text-sm md:text-base leading-relaxed max-w-sm">
              {subtitle}
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-2 mt-8 text-body/60 text-xs flex-wrap">
              <Users className="w-3.5 h-3.5" />
              <span>
                Join{" "}
                <span className="text-white font-bold">2,400+</span> subscribers
              </span>
              <span className="w-1 h-1 rounded-full bg-body/30 mx-1" />
              <span>No spam, unsubscribe anytime</span>
            </div>
          </div>

          {/* Right column: glass card with form */}
          <div className="lg:col-span-3 lg:pl-8">
            <div className="glass rounded-2xl p-8 md:p-10 lg:p-12 shadow-glow-red relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

              <p className="text-heading text-sm font-bold uppercase tracking-widest mb-1">
                Subscribe Now
              </p>
              <p className="text-body text-xs mb-8">
                Enter your email and hit subscribe &mdash; it&rsquo;s that
                simple.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={placeholder}
                      required
                      autoComplete="email"
                      className="w-full px-5 py-3.5 bg-white/[0.04] border border-white/20 text-white placeholder:text-body/50 text-sm focus:outline-none focus:border-primary transition-all duration-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-primary-dark transition-all duration-300 disabled:opacity-70 shrink-0 cursor-pointer rounded-lg flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Done!
                      </>
                    ) : (
                      <>
                        {buttonText}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {message && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 text-sm ${
                        status === "success"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
