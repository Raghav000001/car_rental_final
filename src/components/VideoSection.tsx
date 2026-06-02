"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function VideoSection() {
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [60, -60],
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[500px] lg:h-[600px] overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          style={{
            y: bgY,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1638299638532-8795cb0440a8?w=1600&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="relative mb-8">
            <div
              className="absolute inset-0 bg-primary rounded-full opacity-20"
              style={{ animation: "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            />
            <button
              onClick={() => setShowModal(true)}
              className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center hover:bg-white transition-all duration-500 cursor-pointer shadow-glow-red-strong border-4 border-white/10"
              aria-label="Play video"
            >
              <svg
                className="w-10 h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
          <span className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4">
            Promo Video
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-heading leading-tight tracking-tighter max-w-2xl">
            Watch Our Latest{" "}
            <span className="text-gradient-primary">Fleet Showcase</span>
          </h2>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black shadow-premium border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors text-sm cursor-pointer z-10 flex items-center gap-2 font-bold uppercase tracking-widest"
            >
              <span>Close</span>
              <span className="w-8 h-8 rounded-full border border-white/30 hover:border-primary hover:bg-primary flex items-center justify-center transition-all">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/nfP5N9Yc72A?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
