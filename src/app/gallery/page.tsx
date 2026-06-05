"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

const filters = [
  { id: "all", label: "All" },
  { id: "fleet", label: "Our Fleet" },
  { id: "luxury", label: "Luxury" },
  { id: "suv", label: "SUV" },
  { id: "sedan", label: "Sedan" },
  { id: "delivery", label: "Delivery" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1748215210950-536c6621629a?w=800&q=85", cat: "fleet", label: "Toyota Innova" },
  { src: "https://images.unsplash.com/photo-1748215041497-fdf9c4727681?w=800&q=85", cat: "fleet", label: "Hyundai Santro" },
  { src: "https://images.unsplash.com/photo-1715249411747-63dc11f4507b?w=800&q=85", cat: "fleet", label: "City Commute" },
  { src: "https://images.unsplash.com/photo-1769673459558-21dc11802e3c?w=800&q=85", cat: "luxury", label: "Mercedes AMG" },
  { src: "https://images.unsplash.com/photo-1638299638532-8795cb0440a8?w=800&q=85", cat: "luxury", label: "Toyota Fortuner" },
  { src: "https://images.unsplash.com/photo-1747944827952-7520103c4d5c?w=800&q=85", cat: "luxury", label: "Mercedes A-Class" },
  { src: "https://images.unsplash.com/photo-1670054953044-2605dbd0d747?w=800&q=85", cat: "suv", label: "Toyota Fortuner" },
  { src: "https://images.unsplash.com/photo-1730829633900-0d97444c2bc6?w=800&q=85", cat: "suv", label: "Mahindra Thar" },
  { src: "https://images.unsplash.com/photo-1624190094006-510057da58df?w=800&q=85", cat: "suv", label: "Mahindra Scorpio" },
  { src: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=85", cat: "sedan", label: "Mercedes C Class" },
  { src: "https://images.unsplash.com/photo-1750834115223-f3a3c2e50c79?w=800&q=85", cat: "delivery", label: "City Transit" },
  { src: "https://images.unsplash.com/photo-1731066549944-f0ddac578a7a?w=800&q=85", cat: "suv", label: "Mahindra Thar" },
];

const ITEMS_PER_PAGE = 6;

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const filtered = filter === "all" ? gallery : gallery.filter((g) => g.cat === filter);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (id: string) => {
    setFilter(id);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* <section className="relative pt-40 pb-28 lg:pt-48 lg:pb-32 overflow-hidden">
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
        </section> */}

        <section className="py-12 mt-20 bg-bg-dark border-t border-white/5">
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
            {paginatedItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-body text-lg">No images found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((item) => {
                  const idx = gallery.indexOf(item);
                  return (
                    <div
                      key={item.src}
                      className="group relative overflow-hidden rounded-2xl bg-secondary border border-white/5 cursor-pointer"
                      onClick={() => setActiveImage(idx)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.src}
                          alt={item.label}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 text-sm font-bold uppercase tracking-wider rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${
                        page === safePage
                          ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                          : "bg-white/5 text-body hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-primary/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 text-sm font-bold uppercase tracking-wider rounded-lg"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        <Newsletter
          title="Subscribe to Our Newsletter"
          subtitle="Get the latest updates on new vehicles, exclusive offers, and rental tips delivered straight to your inbox."
          benefitLabel="Gallery Updates Weekly"
        />
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
            <Image
              src={gallery[activeImage].src}
              alt={gallery[activeImage].label}
              width={1200}
              height={800}
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
