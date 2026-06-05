"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal, { StaggerItem } from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import VehicleCard from "@/components/VehicleCard";
import FleetPagination from "@/components/FleetPagination";
import VehicleComparisonModal from "@/components/VehicleComparisonModal";
import BookingModal from "@/components/BookingModal";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import {
  vehicles,
  localRentalPackages,
  serviceTypeLabels,
} from "@/app/fleet/vehicleData";
import { formatPrice } from "@/lib/utils";
import type { CompareVehicle } from "@/app/fleet/types";

type TabId = "self-drive" | "airport-drop" | "local-rental";

const tabs: { id: TabId; label: string }[] = [
  { id: "self-drive", label: "Self Drive Cars" },
  { id: "airport-drop", label: "Airport Drop Service" },
  { id: "local-rental", label: "Local Rental" },
];

const stats = [
  { to: 8, label: "Premium Vehicles", prefix: "", suffix: "+" },
  { to: 32, label: "Cities Served", prefix: "", suffix: "+" },
  { to: 50000, label: "Happy Customers", prefix: "", suffix: "+" },
  { to: 12, label: "Years of Service", prefix: "", suffix: "+" },
];

const whyChooseUs = [
  {
    title: "Well Maintained Vehicles",
    desc: "Every vehicle undergoes rigorous inspection and maintenance after every trip to ensure peak performance and safety.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Sanitized After Every Trip",
    desc: "All vehicles are deep-cleaned and sanitized following strict hygiene protocols for a safe and healthy ride.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Experienced Drivers",
    desc: "Our professional drivers are thoroughly vetted, trained, and committed to providing safe, courteous service.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "GPS Enabled",
    desc: "Every vehicle is equipped with real-time GPS tracking so you can share your location and stay safe on the road.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "24x7 Support",
    desc: "Round-the-clock customer support ensures help is always a phone call away — anytime, anywhere, any emergency.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-2.829-2.829a5 5 0 000-7.07m-4.243 4.243a1 1 0 010-1.414" />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden charges, no surprises. You pay exactly what you see — crystal clear pricing with full breakdowns.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function FleetPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabId>("self-drive");
  const [currentPage, setCurrentPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingVehicleId, setBookingVehicleId] = useState<string | undefined>(undefined);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => v.serviceType === activeTab);
  }, [activeTab]);

  // Only paginate self-drive and airport-drop tabs
  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const handleCompare = useCallback(
    (id: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((i) => i !== id);
        if (prev.length >= 4) return prev;
        return [...prev, id];
      });
    },
    [],
  );

  const compareVehicles: CompareVehicle[] = useMemo(
    () =>
      compareIds
        .map((id) => vehicles.find((v) => v.id === id))
        .filter(Boolean) as CompareVehicle[],
    [compareIds],
  );

  const featuredVehicles = useMemo(
    () => vehicles.filter((v) => v.serviceType === "self-drive"),
    [],
  );

  useEffect(() => {
    if (featuredVehicles.length === 0) return;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredVehicles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredVehicles.length]);

  const handleBook = useCallback((id: string) => {
    setBookingVehicleId(id);
    setShowBooking(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setShowBooking(false);
    setBookingVehicleId(undefined);
  }, []);

  const featuredPrev = () => {
    setFeaturedIndex((prev) =>
      prev <= 0 ? featuredVehicles.length - 1 : prev - 1,
    );
  };
  const featuredNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredVehicles.length);
  };

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        {/* ───────── Hero ───────── */}
        <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-28 overflow-hidden bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/60" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={prefersReducedMotion ? {} : { y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold mb-8">
                <Link href="/" className="text-body hover:text-primary transition-colors">Home</Link>
                <span className="text-primary/60">/</span>
                <span className="text-white">Our Fleet</span>
              </nav>
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? {} : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.9] mb-6 pr-1"
            >
              Find the Perfect{" "}
              <span className="text-gradient-primary">Ride</span>{" "}
              for Every Journey
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Choose from our premium fleet of self-drive cars, airport taxi
              service, and local rental packages — all available in Rohtak.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToGrid}
                className="group relative inline-flex items-center gap-3 bg-primary hover:bg-white text-secondary font-black px-8 sm:px-10 py-4 sm:py-5 transition-all duration-300 overflow-hidden cursor-pointer shadow-glow-red hover:shadow-glow-red-strong"
              >
                <span className="relative z-10 uppercase tracking-wider text-xs sm:text-sm">
                  Browse Vehicles
                </span>
                <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => { setBookingVehicleId(undefined); setShowBooking(true); }}
                className="group inline-flex items-center gap-3 border-2 border-white/20 hover:border-primary bg-white/5 backdrop-blur-sm hover:bg-primary/10 text-white font-black px-8 sm:px-10 py-4 sm:py-5 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
              >
                Book Your Vehicle
              </button>
            </motion.div>
          </div>
        </section>

        {/* ───────── Stats ───────── */}
        <section className="py-16 lg:py-20 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={prefersReducedMotion ? {} : { y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  className="text-center relative"
                >
                  <div className="text-4xl md:text-5xl font-black italic tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pr-1">
                    <AnimatedCounter to={stat.to} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] md:text-xs text-body font-bold uppercase tracking-[0.2em] mt-2">
                    {stat.label}
                  </p>
                  {i < stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Tab Navigation ───────── */}
        <section className="pt-12 pb-0 bg-secondary relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                    setCompareIds([]);
                  }}
                  className={`relative px-6 py-3.5 text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-body/50 hover:text-body"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Fleet Grid / Local Rental ───────── */}
        <section
          id="fleet-grid"
          ref={gridRef}
          className="py-12 lg:py-16 bg-secondary relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
            <AnimatePresence mode="wait">
              {activeTab === "local-rental" ? (
                <motion.div
                  key="local-rental"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Dzire Local Rental
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mt-3 pr-1">
                      Local Rental{" "}
                      <span className="text-gradient-primary">Packages</span>
                    </h2>
                    <p className="text-body text-base md:text-lg mt-4 max-w-2xl mx-auto">
                      Maruti Dzire — perfect for local travel in and around
                      Rohtak. Choose the package that fits your needs.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {localRentalPackages.map((pkg, i) => (
                      <motion.div
                        key={pkg.id}
                        initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="group relative bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.25)] shine-effect"
                      >
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                        <div className="p-6 lg:p-8 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border bg-green-500/20 text-green-400 border-green-500/30 mb-4">
                            Dzire
                          </span>
                          <h3 className="text-2xl lg:text-3xl font-black text-white italic tracking-tighter mb-2">
                            {pkg.name}
                          </h3>
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="flex items-center gap-1.5 text-body">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-xs font-bold">{pkg.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-body">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              <span className="text-xs font-bold">{pkg.distance}</span>
                            </div>
                          </div>
                          <div className="text-5xl lg:text-6xl font-black text-primary italic tracking-tighter mb-6">
                            {formatPrice(pkg.price)}
                          </div>
                          <ul className="space-y-2 mb-6 text-left max-w-xs mx-auto">
                            {pkg.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-body text-xs">
                                <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/contact"
                            className="block w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl text-center transition-all duration-300 shadow-glow-red hover:shadow-glow-red-strong"
                          >
                            Book This Package
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div>
                    {paginated.length === 0 ? (
                      <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                          <svg className="w-10 h-10 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-white font-black text-xl italic tracking-tighter mb-2">
                          No Vehicles Found
                        </h3>
                        <p className="text-body text-sm max-w-md mx-auto mb-6">
                          No vehicles available in this category.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                          {paginated.map((vehicle, i) => (
                            <VehicleCard
                              key={vehicle.id}
                              vehicle={vehicle}
                              index={i}
                              onCompare={handleCompare}
                              compareIds={compareIds}
                              onBook={handleBook}
                            />
                          ))}
                        </div>

                        {totalPages > 1 && (
                          <div className="mt-10 border-t border-white/5 pt-6">
                            <FleetPagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              totalItems={filtered.length}
                              itemsPerPage={itemsPerPage}
                              onPageChange={setCurrentPage}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ───────── Compare Bar ───────── */}
        {compareIds.length > 0 && (
          <div className="sticky bottom-0 z-50 bg-gradient-to-b from-bg-dark/95 to-bg-dark border-t border-white/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
              <p className="text-sm text-body">
                <span className="text-white font-bold">{compareIds.length}</span> vehicle{compareIds.length > 1 ? "s" : ""} selected for comparison
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCompareIds([])}
                  className="text-[10px] text-body/60 font-bold uppercase tracking-wider hover:text-body transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowCompare(true)}
                  className="px-5 py-2 rounded-xl bg-primary text-white font-black text-[10px] uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red cursor-pointer"
                >
                  Compare ({compareIds.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───────── Featured Fleet ───────── */}
        <ScrollReveal direction="up">
          <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Featured Fleet
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mt-3 pr-1">
                    Our <span className="text-gradient-primary">Self Drive</span>{" "}
                    Selection
                  </h2>
                </div>
                <p className="text-body text-sm md:max-w-md leading-relaxed">
                  Handpicked self-drive vehicles that offer the best value,
                  comfort, and driving experience.
                </p>
              </div>

              <div ref={featuredRef} className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredIndex}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {[0, 1].map((offset) => {
                      const idx = (featuredIndex + offset) % featuredVehicles.length;
                      const v = featuredVehicles[idx];
                      if (!v) return null;
                      return (
                        <div
                          key={v.id}
                          className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-500"
                        >
                          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden relative">
                              <Image
                                src={v.image}
                                alt={v.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                            <div className="sm:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/80 mb-1">
                                {serviceTypeLabels[v.serviceType]}
                              </span>
                              <h3 className="text-xl lg:text-2xl font-black text-white italic tracking-tighter mb-2">
                                {v.name}
                              </h3>
                              <p className="text-body/70 text-xs leading-relaxed mb-4 line-clamp-2">
                                {v.description}
                              </p>
                              <div className="flex items-center gap-4 mb-4">
                                <div>
                                  <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">Rent for</p>
                                  <p className="text-xl font-black text-primary italic">{formatPrice(v.price)}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">{v.priceLabel}</p>
                                  <p className="text-lg font-black text-white italic">Self Drive</p>
                                </div>
                                <div className="flex items-center gap-1 ml-auto">
                                  <svg className="w-4 h-4 text-star" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-white font-bold text-sm">{v.rating}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleBook(v.id)}
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-glow-red w-fit cursor-pointer"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={featuredPrev}
                    className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-body hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="Previous featured"
                  >
                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    {featuredVehicles.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setFeaturedIndex(i)}
                        className={`rounded-full transition-all duration-500 cursor-pointer ${
                          i === featuredIndex
                            ? "w-8 h-2 bg-primary"
                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to featured vehicle ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={featuredNext}
                    className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-body hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 cursor-pointer"
                    aria-label="Next featured"
                  >
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ───────── Why Choose Us ───────── */}
        <ScrollReveal direction="up">
          <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Why Choose Us
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mt-3 pr-1">
                  Why Our{" "}
                  <span className="text-gradient-primary">Fleet</span> Stands Out
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {whyChooseUs.map((item) => (
                  <StaggerItem key={item.title} direction="up">
                    <div className="group relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-primary/40 rounded-2xl p-6 lg:p-8 transition-all duration-500 h-full">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-5">
                        {item.icon}
                      </div>
                      <h3 className="text-white font-black text-base lg:text-lg mb-3">{item.title}</h3>
                      <p className="text-body/70 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <Testimonials />

        {/* ───────── CTA ───────── */}
        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/60" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_60%)]" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 lg:px-8 text-center">
            <motion.span
              initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.25em] uppercase text-primary bg-primary/10 border border-primary/30 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Ready to Go?
            </motion.span>
            <motion.h2
              initial={prefersReducedMotion ? {} : { y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.9] mb-6 pr-1"
            >
              Ready For Your{" "}
              <span className="text-gradient-primary">Next Journey</span>?
            </motion.h2>
            <motion.p
              initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Book your perfect vehicle today and experience the Rohit Tour &
              Travel difference — premium service, transparent pricing, and
              unforgettable journeys.
            </motion.p>
            <motion.div
              initial={prefersReducedMotion ? {} : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => { setBookingVehicleId(undefined); setShowBooking(true); }}
                className="group relative inline-flex items-center gap-3 bg-primary hover:bg-white text-secondary font-black px-8 sm:px-10 py-4 sm:py-5 transition-all duration-300 overflow-hidden cursor-pointer shadow-glow-red hover:shadow-glow-red-strong"
              >
                <span className="relative z-10 uppercase tracking-wider text-xs sm:text-sm">
                  Book Now
                </span>
                <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-2 border-white/20 hover:border-primary bg-white/5 backdrop-blur-sm hover:bg-primary/10 text-white font-black px-8 sm:px-10 py-4 sm:py-5 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />

      {showCompare && (
        <VehicleComparisonModal
          vehicles={compareVehicles}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => {
            setCompareIds((prev) => prev.filter((i) => i !== id));
          }}
          onAdd={(id) => {
            setCompareIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }}
        />
      )}

      {showBooking && (
        <BookingModal
          onClose={handleCloseBooking}
          initialVehicleId={bookingVehicleId}
        />
      )}
    </>
  );
}
