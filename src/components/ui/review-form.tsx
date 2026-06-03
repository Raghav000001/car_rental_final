"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !review.trim() || rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setRating(0);
      setReview("");
    }, 4000);
  };

  return (
    <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-primary">
                Share Your Experience
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mb-5">
              Give Us Your{" "}
              <span className="text-gradient-primary">Feedback</span>
            </h2>
            <p className="text-body leading-relaxed mb-8">
              Your feedback helps us improve and deliver the premium experience
              you deserve. Whether it was a weekend getaway or a corporate trip,
              we want to hear about it.
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
                  <a href="tel:+919999999999" className="text-white font-bold hover:text-primary transition-colors">+91 99999 99999</a>
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
                  <a href="mailto:feedback@rohittour.in" className="text-white font-bold hover:text-primary transition-colors">feedback@rohittour.in</a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 lg:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white italic tracking-tight mb-2">
                  Thank You!
                </h3>
                <p className="text-body">
                  Your feedback means the world to us. We&apos;ll review it shortly.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="review-name" className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-primary placeholder:text-body/40"
                  />
                </div>
                <div>
                  <label htmlFor="review-email" className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">
                    Email Address
                  </label>
                  <input
                    id="review-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-primary placeholder:text-body/40"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">
                    Your Rating <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer transition-all duration-150 hover:scale-110"
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                      >
                        <svg
                          className={`w-8 h-8 transition-colors duration-200 ${
                            star <= (hoverRating || rating)
                              ? "text-star fill-star"
                              : "text-white/20"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review-text" className="text-xs font-bold text-white uppercase tracking-[0.1em] block mb-2">
                    Your Review <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="review-text"
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience..."
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 focus:border-primary placeholder:text-body/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-white text-white hover:text-secondary font-black py-3.5 px-6 text-sm uppercase tracking-wider transition-all duration-300 rounded-xl cursor-pointer shine-effect overflow-hidden"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
