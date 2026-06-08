"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StaggerItem } from "@/components/ScrollReveal";
import { formatPrice } from "@/lib/utils";
import BookingModal from "@/components/BookingModal";

const cars = [
  {
    name: "Maruti Swift",
    slug: "swift",
    image: "https://images.unsplash.com/photo-1663852397535-18292e115327?w=800&q=80",
    description: "India's favourite hatchback known for its peppy performance, sporty looks, and excellent fuel efficiency.",
    doors: "4 Doors",
    suitcase: "1 Large, 2 Small",
    passengers: "05",
    price: 1500,
    tag: "Popular",
  },
  {
    name: "Mahindra Scorpio",
    slug: "scorpio",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mahindra_Scorpio_GLX_2.6_m-Hawk_2011_%2836756517492%29.jpg/960px-Mahindra_Scorpio_GLX_2.6_m-Hawk_2011_%2836756517492%29.jpg",
    description: "Built for tough roads and long drives. Commanding presence, powerful engine, and comfortable 7-seater cabin.",
    doors: "4 Doors",
    suitcase: "2 Large, 2 Small",
    passengers: "07",
    price: 3500,
    tag: "SUV",
  },
  {
    name: "Toyota Innova Crysta",
    slug: "innova",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_Z_front_right.jpg/960px-Toyota_Innova_Crysta_2.4_Z_front_right.jpg",
    description: "The ultimate family MPV with spacious three-row seating, bulletproof reliability, and unmatched ride comfort.",
    doors: "4 Doors",
    suitcase: "2 Large, 3 Small",
    passengers: "07",
    price: 4000,
    tag: "Family",
  },
  {
    name: "Maruti Baleno",
    slug: "baleno",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view_02.jpg/960px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view_02.jpg",
    description: "Premium hatchback with a sleek design, feature-packed cabin, and class-leading boot space for city drives.",
    doors: "4 Doors",
    suitcase: "1 Large, 2 Small",
    passengers: "05",
    price: 1500,
    tag: "Premium",
  },
  {
    name: "Maruti Dzire",
    slug: "dzire",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG/960px-Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG",
    description: "India's best-selling sedan. Comfortable, fuel-efficient, and perfect for daily commutes and airport transfers.",
    doors: "4 Doors",
    suitcase: "1 Large, 2 Small",
    passengers: "05",
    price: 2000,
    tag: "Best Value",
  },
  {
    name: "Mahindra Thar",
    slug: "thar",
    image: "https://images.unsplash.com/photo-1710225427267-d21102737ad1?w=800&q=80",
    description: "Conquer every terrain with the rugged Mahindra Thar. Off-road capable, stylish, and adventure-ready.",
    doors: "4 Doors",
    suitcase: "1 Large, 1 Small",
    passengers: "04",
    price: 3500,
    tag: "Adventure",
  },
];

export default function CarFleet() {
  const [showBooking, setShowBooking] = useState(false);
  const [bookingSlug, setBookingSlug] = useState<string | undefined>(undefined);

  const handleBook = (slug: string) => {
    setBookingSlug(slug);
    setShowBooking(true);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setBookingSlug(undefined);
  };

  return (
    <><section className="py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">
                Our Cars
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
              Our Car <span className="text-gradient-primary">Fleet</span>
            </h2>
            <p className="text-body mt-4 max-w-md font-medium">
              India&apos;s favourite cars — from hatchbacks to SUVs — at budget-friendly prices.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-body font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>6 Available Now</span>
            </div>
            <Link
              href="/fleet"
              className="group inline-flex items-center gap-3 font-black text-white hover:text-primary transition-colors uppercase tracking-widest text-sm"
            >
              <span>View All Cars</span>
              <span className="w-10 h-10 rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg]">
                <svg
                  className="w-4 h-4 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cars.map((car, index) => (
            <StaggerItem key={index} direction="up">
            <div
              className="group relative bg-bg-light overflow-hidden shadow-premium hover:shadow-glow-red border border-white/5 hover:border-primary/30 transition-all duration-500 shine-effect"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-bg-light/30 to-transparent opacity-60" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-glow-red">
                    {car.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  <button
                    className="w-9 h-9 rounded-full glass border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center transition-all duration-300 group/heart cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <svg
                      className="w-4 h-4 text-white group-hover/heart:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 glass border border-white/10 px-3 py-1.5 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-black text-white">4.8</span>
                  <span className="text-[10px] text-body">(124)</span>
                </div>
              </div>

              <div className="p-7 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-1">
                  <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors duration-300">
                    {car.name}
                  </h3>
                  <div className="text-left sm:text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-primary">{formatPrice(car.price)}</span>
                      <span className="text-xs text-body font-bold uppercase">/Day</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-body leading-relaxed mb-6 line-clamp-2 font-medium">
                  {car.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-5 border-y border-white/10 mb-7">
                  <div className="flex flex-col items-center gap-1.5">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-body">
                      {car.doors}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 border-x border-white/10">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-body">
                      {car.suitcase}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-tighter text-body">
                      {car.passengers} Seats
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleBook(car.slug)}
                    className="group/btn relative flex-1 bg-primary hover:bg-white text-white hover:text-secondary font-black py-4 transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer overflow-hidden"
                  >
                    <span className="relative z-10">Rent Now</span>
                    <svg
                      className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                  <Link
                    href={`/fleet/${car.slug}`}
                    className="w-12 h-12 border-2 border-white/20 hover:border-primary hover:bg-primary/10 text-white flex items-center justify-center transition-all duration-300"
                    aria-label="View details"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            </StaggerItem>
          ))}
        </div>
      </div>
  </section>

      {showBooking && (
        <BookingModal
          onClose={handleCloseBooking}
          initialVehicleId={bookingSlug}
        />
      )}
  </>);
}
