import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HowItWorks } from "@/components/ui/how-it-works";
import BrandsCarousel from "@/components/BrandsCarousel";
import TimeLine_01 from "@/components/ui/release-time-line";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "About Us - Rohit Tour & Travel Premium Car Rental",
  description:
    "Learn about Rohit Tour & Travel — Rohtak's premium car rental service. Our story, mission, and the team that drives your journeys forward.",
};

const stats = [
  { value: "12+", label: "Years of Service", sub: "Driving trust since 2012" },
  { value: "32+", label: "Cities Covered", sub: "Pan-North India footprint" },
  { value: "850+", label: "Premium Vehicles", sub: "Handpicked fleet" },
  { value: "24/7", label: "Always Available", sub: "Concierge support" },
];

const values = [
  {
    title: "Safety First",
    text: "Every vehicle is rigorously inspected, sanitized, and maintained to the highest safety standards before it reaches your hands.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Always On Time",
    text: "Punctuality is our promise. We deliver and pick up vehicles exactly when scheduled — never a wasted minute for you.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    text: "From economy hatchbacks to luxury SUVs — every model in our fleet is handpicked for comfort, performance, and style.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Customer Centric",
    text: "You are at the heart of everything we do. Our support team is available 24/7 to ensure a smooth, worry-free rental experience.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Rohit Sharma",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/400?img=11",
    socials: [
      { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
      { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
      { name: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
    ],
  },
  {
    name: "Priya Verma",
    role: "Operations Head",
    image: "https://i.pravatar.cc/400?img=5",
    socials: [
      { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
      { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
      { name: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
    ],
  },
  {
    name: "Arjun Singh",
    role: "Fleet Manager",
    image: "https://i.pravatar.cc/400?img=12",
    socials: [
      { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
      { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
      { name: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
    ],
  },
  {
    name: "Neha Kapoor",
    role: "Customer Relations",
    image: "https://i.pravatar.cc/400?img=9",
    socials: [
      { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
      { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
      { name: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
    ],
  },
];

const testimonials = [
  {
    name: "Vikram Mehta",
    role: "Business Traveler",
    text: "Rohit Tour & Travel made my trip to Chandigarh effortless. The car was spotless, delivered on time, and the return process was seamless. Truly a premium experience.",
    rating: 5,
  },
  {
    name: "Ananya Gupta",
    role: "Weekend Explorer",
    text: "I've rented from Rohit Tour & Travel multiple times now. They never disappoint — always on time, always professional. The fleet quality is unmatched in North India.",
    rating: 5,
  },
  {
    name: "Karan Joshi",
    role: "Family Vacationer",
    text: "Rented an SUV for a family trip to Manali. The vehicle was in pristine condition, spacious, and the chauffeur was incredibly courteous. Highly recommended!",
    rating: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-star" : "text-white/10"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero — Breadcrumb */}
        <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
              alt="Luxury sports car on road"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-secondary" />
            <div className="absolute inset-0 dot-pattern opacity-40" />
          </div>
          <div className="relative z-10 text-center px-4">
            <nav className="flex items-center justify-center gap-2 text-sm text-body mb-5">
              <Link href="/" className="hover:text-primary transition-colors duration-500">
                Home
              </Link>
              <span className="text-body/30">/</span>
              <span className="text-primary font-semibold">About Us</span>
            </nav>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic text-white tracking-tighter leading-[0.85] pr-1">
              About <span className="text-gradient-primary">Us</span>
            </h1>
            <p className="text-body text-base md:text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              From a two-car garage in Rohtak to North India&apos;s most trusted premium car rental brand — driven by passion, built on trust.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-dark to-transparent" />
        </section>

        {/* 2. About Section — Two Columns */}
        <section className="py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-3 bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
                    alt="Premium car front view"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 border border-primary/40 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl font-black italic text-primary pr-1">12+</span>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mb-6 pr-1">
                  A Decade of <span className="text-gradient-primary">Driving</span> Excellence
                </h2>
                <p className="text-body text-base leading-relaxed mb-4">
                  Rohit Tour &amp; Travel began in 2012 with one simple promise: <span className="text-white font-bold">&ldquo;Your journey, our responsibility.&rdquo;</span> What started as a humble two-car operation in Rohtak has grown into North India&apos;s most respected premium car rental brand.
                </p>
                <p className="text-body text-base leading-relaxed mb-10">
                  We don&apos;t just rent cars — we deliver experiences. Every vehicle in our fleet is handpicked, regularly serviced, and prepared to factory-fresh standards.
                </p>
                <div className="space-y-5">
                  {[
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ),
                      title: "Handpicked Fleet",
                      text: "Every vehicle selected for comfort, performance, and style.",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      title: "Professional Chauffeurs",
                      text: "Experienced drivers trained in safety, courtesy, and navigation.",
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      title: "Pan-North India",
                      text: "Serving 32+ cities with consistent premium quality across the region.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 group">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                        <p className="text-body text-xs leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stats */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <p className="text-6xl md:text-7xl font-black italic tracking-tighter leading-[0.85] text-gradient-primary mb-2 pr-1">
                    {stat.value}
                  </p>
                  <p className="text-white font-bold text-sm tracking-wide uppercase">{stat.label}</p>
                  <div className="w-8 h-0.5 bg-primary/50 mx-auto mt-3 mb-2 group-hover:w-12 transition-all duration-500" />
                  <p className="text-body text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. Brands */}
        <BrandsCarousel />

        {/* 6. Video Section */}
        <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
            alt="Car driving on scenic road"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative z-10 text-center px-4">
            <button
              className="group w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-8 hover:bg-white transition-all duration-500 shadow-glow-red hover:shadow-glow-red-strong cursor-pointer"
              aria-label="Play video"
            >
              <svg
                className="w-8 h-8 text-white group-hover:text-primary transition-colors duration-500 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-tight leading-[1.1] pr-1">
              Experience the <span className="text-gradient-primary">Rohit Tour &amp; Travel</span> Difference
            </h3>
            <p className="text-body text-sm mt-4 max-w-md mx-auto">
              Watch our story unfold — from Rohtak&apos;s streets to India&apos;s highways.
            </p>
          </div>
        </section>

        {/* 7. Values */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6">
                Our Values
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
                What We <span className="text-gradient-primary">Stand For</span>
              </h2>
              <p className="text-body text-sm mt-4 max-w-lg mx-auto">
                Four principles guide every decision, every vehicle, every interaction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group p-8 bg-bg-dark border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-glow-red"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {v.icon}
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tight pr-1">{v.title}</h3>
                  </div>
                  <p className="text-body text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Timeline / Journey */}
        <TimeLine_01 />

        {/* 9. Team */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6">
                Our Team
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
                Meet the <span className="text-gradient-primary">Drivers</span> Behind Rohit Tour &amp; Travel
              </h2>
              <p className="text-body text-sm mt-4 max-w-lg mx-auto">
                Passionate people dedicated to making every journey extraordinary.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="group text-center">
                  <div className="relative overflow-hidden mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.15]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      {member.socials.map((social) => (
                        <a
                          key={social.name}
                          href="#"
                          aria-label={social.name}
                          className="w-8 h-8 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center transition-all duration-300"
                        >
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-white italic tracking-tight pr-1">{member.name}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Testimonials */}
        <section className="py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6">
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
                What Our <span className="text-gradient-primary">Customers</span> Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="group p-8 bg-secondary/50 border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-glow-red flex flex-col"
                >
                  <StarRating rating={t.rating} />
                  <p className="text-body text-sm leading-relaxed mt-5 mb-6 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="pt-5 border-t border-white/5">
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-body text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Map */}
        <section className="h-[400px] relative overflow-hidden">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=76.5%2C28.8%2C76.9%2C29.0&amp;layer=mapnik"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(1) invert(0.9) hue-rotate(180deg) saturate(0.5)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rohit Tour & Travel Service Area Map"
          />
          <div className="absolute inset-0 pointer-events-none border-4 border-secondary" />
        </section>

        {/* 12. Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
