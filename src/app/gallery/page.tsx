"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const filters = [
  { id: "all", label: "All" },
  { id: "fleet", label: "Our Fleet" },
  { id: "luxury", label: "Luxury" },
  { id: "suv", label: "SUV" },
  { id: "sedan", label: "Sedan" },
  { id: "delivery", label: "Delivery" },
];

const gallery = [
  { src: "https://picsum.photos/seed/rohit-1/800/600", cat: "fleet", label: "Premium Sedan" },
  { src: "https://picsum.photos/seed/rohit-2/800/800", cat: "luxury", label: "Luxury Showroom" },
  { src: "https://picsum.photos/seed/rohit-3/800/600", cat: "suv", label: "Adventure SUV" },
  { src: "https://picsum.photos/seed/rohit-4/800/600", cat: "fleet", label: "City Hatchback" },
  { src: "https://picsum.photos/seed/rohit-5/800/800", cat: "luxury", label: "Premium Interior" },
  { src: "https://picsum.photos/seed/rohit-6/800/600", cat: "sedan", label: "Executive Sedan" },
  { src: "https://picsum.photos/seed/rohit-7/800/600", cat: "suv", label: "Family SUV" },
  { src: "https://picsum.photos/seed/rohit-8/800/600", cat: "delivery", label: "Doorstep Delivery" },
  { src: "https://picsum.photos/seed/rohit-9/800/800", cat: "luxury", label: "Black Edition" },
  { src: "https://picsum.photos/seed/rohit-10/800/600", cat: "fleet", label: "Compact Choice" },
  { src: "https://picsum.photos/seed/rohit-11/800/600", cat: "sedan", label: "Business Class" },
  { src: "https://picsum.photos/seed/rohit-12/800/600", cat: "delivery", label: "Airport Pickup" },
];

const ITEMS_PER_PAGE = 6;

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const filtered = filter === "all" ? gallery : gallery.filter((g) => g.cat === filter);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (id: string) => {
    setFilter(id);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-40 pb-28 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark to-secondary" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15)_0%,transparent_60%)]" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-body/60 mb-6">
              <span className="w-8 h-px bg-primary/60" />
              Visual Journey
              <span className="w-8 h-px bg-primary/60" />
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.85] mb-6">
              Our <span className="text-gradient-primary">Gallery</span>
            </h1>
            <p className="text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A curated showcase of the vehicles, service, and moments that define the Rohit Tour & Travel experience.
            </p>
          </div>
        </section>

        <section className="py-12 bg-bg-dark border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterChange(f.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    filter === f.id
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-white/5 text-body hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 bg-bg-dark">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {visible.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-body text-lg">No images found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((item) => {
                  const idx = gallery.indexOf(item);
                  return (
                    <div
                      key={item.src}
                      className="group relative overflow-hidden rounded-2xl bg-secondary border border-white/5 cursor-pointer"
                      onClick={() => setActiveImage(idx)}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80 mb-1">
                          {filters.find((f) => f.id === item.cat)?.label}
                        </p>
                        <p className="text-white font-bold text-lg">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {hasMore && (
              <div className="flex justify-center mt-14">
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filtered.length))}
                  className="group relative bg-transparent border-2 border-primary text-white font-black px-10 py-4 transition-all duration-300 text-sm uppercase tracking-wider overflow-hidden"
                >
                  <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative z-10 flex items-center gap-2">
                    Load More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="relative max-w-3xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-body/60 mb-6">
              <span className="w-8 h-px bg-primary/60" />
              Stay Connected
              <span className="w-8 h-px bg-primary/60" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.9] mb-5">
              Subscribe to Our <span className="text-gradient-primary">Newsletter</span>
            </h2>
            <p className="text-body text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Get the latest updates on new vehicles, exclusive offers, and rental tips delivered straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/10 text-white px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors duration-300 placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-black px-8 py-4 text-sm uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[activeImage].src}
              alt={gallery[activeImage].label}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-premium"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-secondary to-transparent rounded-b-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                {filters.find((f) => f.id === gallery[activeImage].cat)?.label}
              </p>
              <p className="text-white font-black text-2xl italic tracking-tighter">
                {gallery[activeImage].label}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
