"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          tabIndex={-1}
          poster="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80"
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2023/08/11/174007-852409527_large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-secondary/80 via-secondary/60 to-secondary/80" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
          Subscribe for latest update about Automobil
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="flex-1 px-5 py-4 text-sm bg-white/5 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors backdrop-blur-sm"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-primary text-white font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors duration-300 cursor-pointer"
          >
            {submitted ? "Done!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
