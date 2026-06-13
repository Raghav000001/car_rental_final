"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 870 876 5123",
    href: "tel:+918708765123",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "rohit1998raman@gmail.com",
    href: "mailto:rohit1998raman@gmail.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "Sector 14, Rohtak, Haryana 124001, India",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon - Fri: 8:00 AM - 6:00 PM",
    href: null,
  },
];

const inputClasses =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-primary/60 focus:bg-white/[0.06] focus:shadow-[0_0_20px_-5px_rgba(220,38,38,0.2)] hover:border-white/20";

const labelClasses = "block text-sm font-semibold text-gray-300 mb-2";

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (formData.name.trim().length < 2) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (formData.subject.trim().length < 2)
      newErrors.subject = "Subject is required";
    if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState("loading");
    setServerMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitState("success");
        setServerMsg(data.message);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitState("error");
        setServerMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitState("error");
      setServerMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full dot-pattern opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-strong" />
              Get In Touch
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5">
              Let&apos;s{" "}
              <span className="text-gradient-primary">Start a Conversation</span>
            </h1>
            <p className="text-body text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Have a question about our fleet or services? We&apos;d love to hear
              from you. Send us a message and we&apos;ll respond promptly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass rounded-2xl p-5 hover:border-primary/30 transition-all duration-500 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-white font-medium hover:text-primary transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white font-medium">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">
                Follow Us
              </p>
              <div className="flex justify-center gap-3">
                {[
                  { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", url: "https://facebook.com/rohittourtravel" },
                  { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z", url: "https://twitter.com/rohittourtravel" },
                  { name: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z", url: "https://instagram.com/rohittourtravel" },
                  { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z", url: "https://linkedin.com/company/rohittourtravel" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <div className="glass rounded-3xl p-6 md:p-8 lg:p-10 border border-white/[0.06]">
                <AnimatePresence mode="wait">
                  {submitState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-6"
                      >
                        <svg
                          className="w-10 h-10 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-body text-sm leading-relaxed max-w-md mx-auto mb-8">
                        {serverMsg}
                      </p>
                      <button
                        onClick={() => setSubmitState("idle")}
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            Send us a Message
                          </h3>
                          <p className="text-xs text-gray-500">
                            All fields marked with * are required
                          </p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {submitState === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30"
                          >
                            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-red-300">{serverMsg}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="name" className={labelClasses}>
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`${inputClasses} ${errors.name ? "border-red-500/50 focus:border-red-500" : ""}`}
                          />
                          {errors.name && (
                            <p className="text-xs text-red-400 mt-1.5">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="email" className={labelClasses}>
                            Email Address <span className="text-primary">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`${inputClasses} ${errors.email ? "border-red-500/50 focus:border-red-500" : ""}`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-400 mt-1.5">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="phone" className={labelClasses}>
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className={inputClasses}
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className={labelClasses}>
                            Subject <span className="text-primary">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`${inputClasses} appearance-none ${errors.subject ? "border-red-500/50 focus:border-red-500" : ""}`}
                          >
                            <option value="" className="bg-secondary">Select a subject</option>
                            <option value="General Inquiry" className="bg-secondary">General Inquiry</option>
                            <option value="Fleet Booking" className="bg-secondary">Fleet Booking</option>
                            <option value="Corporate Rental" className="bg-secondary">Corporate Rental</option>
                            <option value="Wedding Fleet" className="bg-secondary">Wedding Fleet</option>
                            <option value="Outstation Trip" className="bg-secondary">Outstation Trip</option>
                            <option value="Complaint" className="bg-secondary">Complaint / Feedback</option>
                            <option value="Other" className="bg-secondary">Other</option>
                          </select>
                          {errors.subject && (
                            <p className="text-xs text-red-400 mt-1.5">
                              {errors.subject}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className={labelClasses}>
                          Message <span className="text-primary">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your requirements..."
                          className={`${inputClasses} resize-none ${errors.message ? "border-red-500/50 focus:border-red-500" : ""}`}
                        />
                        {errors.message && (
                          <p className="text-xs text-red-400 mt-1.5">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={submitState === "loading"}
                        className="group relative w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {submitState === "loading" ? (
                            <>
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Send Message
                            </>
                          )}
                        </span>
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
