"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    badge: "Affordable Rentals",
    title: "Find Budget-Friendly Cars for Every Trip",
    highlightWords: [2, 3],
    subtitle:
      "Reliable hatchbacks, sedans, and SUVs at prices that suit your pocket. Explore our wide range of Indian cars for a smooth and economical ride.",
    image:
      "https://images.unsplash.com/photo-1718173402850-c20bb4ba3e2e?w=1600&q=80",
    stats: [
      { value: "500+", label: "Budget Cars" },
      { value: "24/7", label: "Support" },
      { value: "32+", label: "Locations" },
    ],
  },
  {
    badge: "Top Models",
    title: "Swift, Baleno, Fortuner & More",
    highlightWords: [1, 3],
    subtitle:
      "Choose from India's favourite cars — from the peppy Swift to the rugged Fortuner. We have the perfect ride for your journey.",
    image:
      "https://images.unsplash.com/photo-1670054953044-2605dbd0d747?w=1600&q=80",
    stats: [
      { value: "98%", label: "Happy Clients" },
      { value: "15+", label: "Years Experience" },
      { value: "50K+", label: "Trips Completed" },
    ],
  },
  {
    badge: "Drive In Style",
    title: "Economy Cars, Premium Experience",
    highlightWords: [1, 3],
    subtitle:
      "Get the best value for every kilometre. Our well-maintained Indian cars deliver comfort, reliability, and great fuel efficiency.",
    image:
      "https://images.unsplash.com/photo-1748215210950-536c6621629a?w=1600&q=80",
    stats: [
      { value: "200+", label: "Car Models" },
      { value: "4.9★", label: "User Rating" },
      { value: "100%", label: "Insured" },
    ],
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index === current) return;
    setCurrent(index);
  };

  const slide = slides[current];

  return (
    // FIX #2: Changed min-h to ensure enough vertical space on all screens.
    // Using min-h-screen on mobile too so content never gets crushed.
    // overflow-hidden here also handles the blob negative-margin scroll issue (Fix #6).
    <section className="relative min-h-screen md:mt-20 sm:mt-16 bg-secondary overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Background images */}
      <div className="absolute inset-0">
        {slides.map((s, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 bg-cover bg-center ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              transition: "opacity 900ms ease-out, transform 7000ms linear",
              // FIX #9: Added will-change for GPU compositing — smoother Ken Burns on mobile
              willChange: "transform",
              transform: index === current ? "scale(1)" : "scale(1.08)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/75 to-secondary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-secondary/40" />
      </div>

      {/* Main content */}
      {/* FIX #4: Added pr-12 sm:pr-16 lg:pr-0 so text never goes behind the right-side indicators */}
      <div className="relative h-full flex items-center pt-28 sm:pt-36 lg:pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pr-12 sm:pr-16 lg:pr-8">
          <div key={current} className="animate-fadeInUp max-w-full sm:max-w-3xl">

            {/* Badge */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-12 sm:w-16 h-[2px] bg-primary" />
              <span className="text-primary text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                {slide.badge}
              </span>
            </div>

            {/* FIX #1: Smoother clamp so there's no abrupt jump at sm breakpoint.
                clamp(1.6rem, 6vw, 4.5rem) scales naturally across all widths. */}
            <h1
              className="font-black text-white leading-[1.1] mb-5 sm:mb-8 tracking-tighter break-words"
              style={{ fontSize: "clamp(1.6rem, 6vw, 4.5rem)" }}
            >
              {slide.title.split(" ").map((word, i) => (
                <span key={i}>
                  <span
                    className={
                      slide.highlightWords.includes(i)
                        ? "text-gradient-primary"
                        : ""
                    }
                  >
                    {word}
                  </span>
                  {i < slide.title.split(" ").length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>

            <p className="text-gray-300 text-sm sm:text-lg md:text-xl mb-7 sm:mb-10 leading-relaxed max-w-xl font-medium">
              {slide.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link
                href="/fleet"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary hover:bg-white text-secondary font-black px-8 sm:px-10 py-3.5 sm:py-5 transition-all duration-300 overflow-hidden cursor-pointer shadow-glow-red hover:shadow-glow-red-strong"
              >
                <span className="relative z-10 uppercase tracking-wider text-xs sm:text-sm">
                  Explore Cars
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/#video-section"
                className="group inline-flex items-center justify-center gap-3 border-2 border-white/20 hover:border-primary bg-white/5 backdrop-blur-sm hover:bg-primary/10 text-white font-black px-8 sm:px-10 py-3.5 sm:py-5 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-primary group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Video
              </Link>
            </div>

            {/* FIX #3: Always grid-cols-3 so no orphan stat on a new row.
                Reduced text sizes slightly on mobile to fit comfortably. */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-10 max-w-xs sm:max-w-sm md:max-w-xl">
              {slide.stats.map((stat, i) => (
                <div key={`${current}-${i}`} className="relative">
                  <div className="text-lg sm:text-2xl md:text-3xl font-black text-white mb-0.5 sm:mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs font-bold text-body uppercase tracking-widest leading-tight">
                    {stat.label}
                  </div>
                  {i < slide.stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 sm:h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators — right side */}
      <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 lg:right-12 z-20">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* FIX #7: Counter text hidden on mobile, shown sm+ */}
          <span className="hidden sm:block text-white/30 text-xs font-mono tracking-widest select-none [writing-mode:vertical-lr] rotate-180">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-3 sm:gap-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group cursor-pointer py-1.5 sm:py-2"
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Slightly thinner bars on mobile so they don't feel oversized */}
                <div className="relative w-0.5 sm:w-1 h-8 sm:h-12 bg-white/10 overflow-hidden rounded-full">
                  <div
                    className={`absolute inset-x-0 top-0 bg-gradient-to-b from-primary to-red-400 transition-all duration-700 rounded-full ${
                      index === current ? "h-full" : "h-0 group-hover:h-1/2"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative blobs — pointer-events-none already set, overflow-hidden on section handles scroll (Fix #6) */}
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-primary/20 backdrop-blur-3xl rounded-full -mr-20 -mb-20 z-10 animate-float pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 w-2 h-2 bg-primary rounded-full z-10 hidden lg:block pointer-events-none" />
      <div className="absolute right-1/3 top-1/3 w-1.5 h-1.5 bg-white/30 rounded-full z-10 hidden lg:block pointer-events-none" />
      <div className="absolute right-1/2 top-1/2 w-1 h-1 bg-primary rounded-full z-10 hidden lg:block pointer-events-none" />
    </section>
  );
}