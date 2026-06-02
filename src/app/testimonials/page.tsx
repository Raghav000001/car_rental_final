import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Testimonials - Rohit Tour & Travel Premium Car Rental",
  description:
    "Read what our customers say about Rohit Tour & Travel. Real stories from real journeys across North India.",
};

const testimonials = [
  {
    name: "Aakash Mehta",
    role: "Business Traveler, Gurugram",
    rating: 5,
    text: "I've been using Rohit Tour & Travel for all my Gurugram-Rohtak trips for the past 3 years. The cars are always spotless, the drivers are courteous, and the prices are unbeatable. Truly the gold standard of car rentals in Haryana.",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Wedding Planner, Delhi",
    rating: 5,
    text: "We rented 12 luxury cars for a destination wedding in Jaipur. Rohit Tour & Travel delivered every single one on time, in pristine condition. The team was on-call 24/7 throughout the event. Absolutely flawless service.",
    initials: "PS",
  },
  {
    name: "Vikram Singh",
    role: "Self-Drive Customer, Chandigarh",
    rating: 5,
    text: "Took a Fortuner for a 5-day Himachal road trip. Car was in perfect mechanical condition, the insurance was comprehensive, and the return process was a breeze. Already planning my next booking.",
    initials: "VS",
  },
  {
    name: "Anita Desai",
    role: "Family Trip, Panchkula",
    rating: 5,
    text: "Travelled with my parents and two kids to Manali. Rohit Tour & Travel arranged a spacious Innova Crysta with a child seat — something I had to ask twice with other services. They thought of everything.",
    initials: "AD",
  },
  {
    name: "Rajesh Khanna",
    role: "Corporate Client, Karnal",
    rating: 5,
    text: "Our company has a monthly contract with Rohit Tour & Travel for 8 vehicles. Their reliability is unmatched. Zero downtime in 18 months. The dedicated account manager is a game-changer.",
    initials: "RK",
  },
  {
    name: "Sneha Kapoor",
    role: "Outstation Trip, Ambala",
    rating: 5,
    text: "I was nervous about self-driving to Leh. Rohit Tour & Travel's team gave me a full briefing, provided an emergency contact, and checked in mid-trip. Felt like family looking out for me.",
    initials: "SK",
  },
  {
    name: "Manoj Yadav",
    role: "Monthly Subscriber, Hisar",
    rating: 5,
    text: "Subscribed to the monthly plan for a Swift Dzire. Saves me 40% compared to daily rentals, and the car gets swapped for a fresh one every 30 days. Brilliant model.",
    initials: "MY",
  },
  {
    name: "Divya Reddy",
    role: "Solo Traveler, Rohtak",
    rating: 5,
    text: "As a woman traveling solo, safety is non-negotiable. Rohit Tour & Travel's chauffeur-driven cars have GPS tracking, verified drivers, and 24/7 support. I feel safe and cared for.",
    initials: "DR",
  },
  {
    name: "Harsh Aggarwal",
    role: "Airport Transfer, Delhi",
    rating: 5,
    text: "Booked 4 AM airport transfer. Driver was at my door 10 minutes early, helped with luggage, and got me to the airport in 35 minutes flat. Premium experience, every time.",
    initials: "HA",
  },
];

const stats = [
  { value: "4.9", label: "Google Rating", sub: "Across 12,500+ reviews" },
  { value: "12,500+", label: "Verified Reviews", sub: "From real customers" },
  { value: "98%", label: "Repeat Customers", sub: "Trust that returns" },
  { value: "4.8/5", label: "Satisfaction", sub: "Independent audit" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-star fill-star" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: (typeof testimonials)[number]; index: number }) {
  return (
    <div
      className={`relative p-8 lg:p-10 rounded-2xl border transition-all duration-500 card-hover ${
        index === 0
          ? "bg-gradient-to-br from-primary/10 via-bg-light/50 to-bg-dark border-primary/30 shadow-glow-red"
          : "bg-bg-light/30 border-white/5 hover:border-primary/25"
      }`}
    >
      <svg
        className={`w-10 h-10 mb-6 ${index === 0 ? "text-primary" : "text-primary/40"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>

      <StarRating rating={t.rating} />

      <p className="text-body leading-relaxed italic mt-5 mb-8">
        &ldquo;{t.text}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
          <span className="text-primary font-black italic text-sm">{t.initials}</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm">{t.name}</p>
          <p className="text-body text-xs mt-0.5">{t.role}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-black tracking-[0.3em] text-primary/60 uppercase">
          /0{index + 1}
        </span>
      </div>
    </div>
  );
}

function StatCard({ s, index }: { s: (typeof stats)[number]; index: number }) {
  return (
    <div className="relative p-6 lg:p-8 rounded-2xl bg-bg-light/30 border border-white/5 hover:border-primary/25 transition-all duration-500 card-hover text-center group">
      <span className="text-[10px] font-black tracking-[0.3em] text-primary/60 uppercase block mb-4">
        /0{index + 1}
      </span>
      <p className="bento-number text-5xl lg:text-6xl mb-2">{s.value}</p>
      <p className="text-white font-black italic tracking-tight text-lg">{s.label}</p>
      <p className="text-body text-xs mt-1">{s.sub}</p>
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-28 overflow-hidden bg-secondary">
          <div className="absolute inset-0 grid-pattern opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-bg-dark" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-black tracking-[0.25em] uppercase text-primary">
                Real Stories
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.9] mb-6">
              Love From{" "}
              <span className="text-gradient-primary">Clients</span>
            </h1>
            <p className="text-body text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Don&rsquo;t just take our word for it. Hear from thousands of customers who have
              trusted Rohit Tour & Travel with their journeys.
            </p>
            <nav
              aria-label="Breadcrumb"
              className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm"
            >
              <Link
                href="/"
                className="text-body hover:text-primary transition-colors font-semibold"
              >
                Home
              </Link>
              <span className="text-primary/60">/</span>
              <span className="text-white font-bold">Testimonials</span>
            </nav>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <span className="bento-chip mb-4">By the Numbers</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-3">
                  Trusted by{" "}
                  <span className="text-gradient-primary">Thousands</span>
                </h2>
              </div>
              <p className="text-body text-sm md:max-w-md leading-relaxed">
                Independent reviews, verified feedback, and a satisfaction score that speaks for
                itself.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <StatCard key={s.label} s={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <span className="bento-chip mb-4">Customer Love</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-3">
                  Voices of{" "}
                  <span className="text-gradient-primary">Our Customers</span>
                </h2>
              </div>
              <p className="text-body text-sm md:max-w-md leading-relaxed">
                Real stories from real journeys. From weddings to weekend getaways — they trusted
                Rohit Tour &amp; Travel.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.name} t={t} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <span className="bento-chip mb-4">Stay Connected</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-[0.95] mt-3 mb-6">
                Subscribe to Our{" "}
                <span className="text-gradient-primary">Newsletter</span>
              </h2>
              <p className="text-body leading-relaxed mb-10">
                Get the latest updates on new vehicles, exclusive offers, and travel tips delivered
                straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-xl bg-bg-light/50 border border-white/10 text-white placeholder:text-body/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  className="px-8 py-3.5 rounded-xl bg-primary text-white font-black text-sm tracking-wider uppercase hover:bg-primary-dark transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
