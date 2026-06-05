"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Jonathan Blue",
    role: "Manager",
    avatar: "https://i.pravatar.cc/120?img=1",
    quote: "Seamless Booking and Pickup! I rented car from Rohit Tour & Travel, and the process was incredibly smooth. The online booking system is user-friendly, and the pickup was quick and efficient.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/120?img=5",
    quote: "Exceptional service and a fantastic fleet of vehicles. The staff was professional and accommodating. I highly recommend Rohit Tour & Travel for anyone looking for a hassle-free car rental experience.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Business Executive",
    avatar: "https://i.pravatar.cc/120?img=3",
    quote: "Outstanding experience from start to finish. The luxury sedan I rented was immaculate, and the return process was just as smooth as the pickup. Will definitely use again.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Photographer",
    avatar: "https://i.pravatar.cc/120?img=9",
    quote: "I needed a reliable SUV for a cross-country road trip, and Rohit Tour & Travel delivered beyond expectations. Great rates, excellent vehicle condition, and wonderful customer support throughout my journey.",
    rating: 5,
  },
];

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`${className} text-primary`} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const itemsPerPage = 2;
  const maxIndex = testimonials.length - itemsPerPage;

  const prev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(current, current + itemsPerPage);

  return (
    <section className="py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/[0.08] rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic mt-5"
          >
            Love From <span className="text-gradient-primary inline-block pr-1">Clients</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-body text-sm mt-4 max-w-lg mx-auto"
          >
            Real stories from real customers who trusted us with their journeys.
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex flex-col md:flex-row gap-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }}
            >
              {visibleTestimonials.map((t, index) => (
                <motion.div
                  key={`${current}-${index}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex-1 min-w-0"
                >
                  <div className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-primary/40 p-8 lg:p-10 h-full transition-all duration-500">
                    {/* Subtle top gradient line on hover */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Glow on hover */}
                    <div className="absolute -inset-[1px] bg-primary/10 rounded-sm opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                    <div className="relative">
                      {/* Quote mark */}
                      <div className="absolute -top-2 -right-2 text-6xl font-black text-white/[0.04] select-none pointer-events-none leading-none">
                        &quot;
                      </div>

                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-110 transition-transform duration-500" />
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-primary/60 transition-all duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-base">{t.name}</h4>
                          <p className="text-primary text-sm font-medium">{t.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-0.5 mb-5">
                        {[...Array(t.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4" />
                        ))}
                      </div>

                      <p className="text-body text-base leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prev}
            className="group w-11 h-11 bg-white/[0.04] border border-white/10 flex items-center justify-center text-body hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative rounded-full transition-all duration-500 cursor-pointer ${
                  i === current
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="group w-11 h-11 bg-white/[0.04] border border-white/10 flex items-center justify-center text-body hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
