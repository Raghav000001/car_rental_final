"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/mapcn-map-arc";

const ROHTAK_CENTER: [number, number] = [76.6066, 28.8955];

const cities = [
  { name: "Rohtak", state: "Haryana", tier: "Headquarters", isHQ: true, code: "HQ" },
  { name: "Gurugram", state: "Haryana", tier: "Tier 1", isHQ: false, code: "T1" },
  { name: "Panchkula", state: "Haryana", tier: "Tier 1", isHQ: false, code: "T1" },
  { name: "Chandigarh", state: "Chandigarh (UT)", tier: "Tier 1", isHQ: false, code: "T1" },
  { name: "Delhi NCR", state: "Delhi", tier: "Tier 1", isHQ: false, code: "T1" },
  { name: "Karnal", state: "Haryana", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Ambala", state: "Haryana", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Hisar", state: "Haryana", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Sonipat", state: "Haryana", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Panipat", state: "Haryana", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Noida", state: "Uttar Pradesh", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Jaipur", state: "Rajasthan", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Amritsar", state: "Punjab", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Ludhiana", state: "Punjab", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Agra", state: "Uttar Pradesh", tier: "Tier 2", isHQ: false, code: "T2" },
  { name: "Shimla", state: "Himachal Pradesh", tier: "Tier 3", isHQ: false, code: "T3" },
  { name: "Dehradun", state: "Uttarakhand", tier: "Tier 3", isHQ: false, code: "T3" },
  { name: "Varanasi", state: "Uttar Pradesh", tier: "Tier 3", isHQ: false, code: "T3" },
  { name: "Manali", state: "Himachal Pradesh", tier: "Tourist", isHQ: false, code: "TR" },
  { name: "Haridwar", state: "Uttarakhand", tier: "Tourist", isHQ: false, code: "TR" },
];

const tierColors: Record<string, string> = {
  "Headquarters": "bg-primary text-white border-primary",
  "Tier 1": "bg-white/10 text-white border-white/20 group-hover:bg-primary/30 group-hover:border-primary/50",
  "Tier 2": "bg-white/5 text-body border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-white",
  "Tier 3": "bg-white/5 text-body/70 border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-white",
  "Tourist": "bg-white/5 text-body border-white/10 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:text-white",
};

export default function ServiceAreasPage() {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-secondary overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-body/60 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="w-4 h-px bg-primary/40" />
              <span className="text-primary/80">Service Areas</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white leading-[0.9]">
              Service <span className="text-gradient-primary">Areas</span>
            </h1>
            <p className="mt-6 text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              From our headquarters in Rohtak, Rohit Tour & Travel serves 20+ cities across North India with premium vehicles, 24/7 support, and lightning-fast delivery.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-5 gap-6 lg:gap-8">
              <div className="md:col-span-3 lg:col-span-3 relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[560px] bento-card bento-card-featured p-0">
                <div className="relative h-[400px] lg:h-[560px]">
                  <Map
                    center={ROHTAK_CENTER}
                    zoom={9}
                    theme="dark"
                    className="w-full h-full"
                  >
                    <MapControls
                      position="top-right"
                      showZoom
                      showCompass={false}
                      showLocate
                      showFullscreen
                    />

                    <MapMarker
                      longitude={ROHTAK_CENTER[0]}
                      latitude={ROHTAK_CENTER[1]}
                    >
                      <MarkerContent>
                        <button
                          type="button"
                          onClick={() => setPopupOpen((v) => !v)}
                          aria-label="Open Rohtak office details"
                          className="relative -translate-y-1/2 -translate-x-1/2 cursor-pointer group/pin"
                        >
                          <span className="absolute inset-0 -m-2 rounded-full bg-primary/30 animate-ping" />
                          <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary border-2 border-white shadow-[0_0_30px_rgba(220,38,38,0.7)] group-hover/pin:scale-110 transition-transform duration-200">
                            <svg
                              className="w-6 h-6 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </span>
                        </button>
                      </MarkerContent>
                    </MapMarker>

                    {popupOpen && (
                      <MarkerPopup
                        longitude={ROHTAK_CENTER[0]}
                        latitude={ROHTAK_CENTER[1]}
                        offset={28}
                        closeOnClick={false}
                      >
                        <div className="bg-secondary border border-primary/40 shadow-premium p-4 min-w-[220px] font-sans">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                              Main Office
                            </p>
                          </div>
                          <h4 className="text-white text-base font-black uppercase tracking-tighter mb-1">
                            Rohtak, Haryana
                          </h4>
                          <p className="text-xs text-body font-medium leading-relaxed">
                            Sector 14, Near Bus Stand<br />
                            Rohtak, Haryana 124001, India
                          </p>
                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-body">Open 24/7</span>
                            <a
                              href="https://www.openstreetmap.org/?mlat=28.8955&mlon=76.6066#map=13/28.8955/76.6066"
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:text-white transition-colors"
                            >
                              Get Directions →
                            </a>
                          </div>
                        </div>
                      </MarkerPopup>
                    )}
                  </Map>

                  <div className="absolute top-4 left-4 glass border border-white/10 px-4 py-2 flex items-center gap-2 pointer-events-none z-10">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                      Live Network
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 glass border border-white/10 px-4 py-2 text-right pointer-events-none z-10">
                    <p className="text-[10px] font-bold text-body uppercase tracking-widest">
                      Active Cities
                    </p>
                    <p className="text-xl font-black text-white">{cities.length}+</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-2 bento-card p-8 flex flex-col">
                <span className="bento-chip mb-4">Headquarters</span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic leading-[0.95] mt-2">
                  <span className="text-gradient-primary">Rohtak</span>
                  <br />Haryana, India
                </h2>
                <div className="bento-divider" />
                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase mb-1">
                      Address
                    </p>
                    <p className="text-white font-bold text-sm leading-relaxed">
                      Sector 14, Near Bus Stand<br />
                      Rohtak, Haryana 124001
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase mb-1">
                      Hours
                    </p>
                    <p className="text-white font-bold text-sm">Open 24/7</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase mb-1">
                      Fleet at HQ
                    </p>
                    <p className="bento-number text-5xl">240+</p>
                  </div>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=28.8955&mlon=76.6066#map=13/28.8955/76.6066"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-primary hover:bg-white text-white hover:text-secondary font-black px-5 py-3 transition-all duration-300 text-xs uppercase tracking-wider"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-14">
              <span className="bento-chip mb-5">Coverage Network</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter text-white leading-[0.9]">
                Our <span className="text-gradient-primary">Service Areas</span>
              </h2>
              <p className="mt-4 text-body text-base max-w-xl mx-auto">
                {cities.length} cities across North India, from metros to mountain towns — we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {cities.map((city, i) => (
                <div
                  key={city.name}
                  className="group relative bento-card p-5 flex flex-col gap-3 min-h-[130px] cursor-default"
                  style={{ animationDelay: `${(i % 12) * 0.06}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${city.isHQ ? "bg-primary" : "bg-white/20 group-hover:bg-primary/60"}`} />
                      <h3 className="text-white font-black tracking-tight text-lg group-hover:text-primary transition-colors duration-300">
                        {city.name}
                      </h3>
                    </div>
                    <span className="text-[9px] font-black tracking-[0.3em] text-primary/60 uppercase shrink-0">
                      {city.code}
                    </span>
                  </div>
                  <p className="text-body text-sm -mt-1 pl-5">{city.state}</p>
                  <div className="mt-auto flex items-center gap-2 pl-5">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all duration-300 ${tierColors[city.tier] || tierColors["Tier 2"]}`}>
                      {city.tier}
                    </span>
                    {city.isHQ && (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary/70 px-2 py-0.5">
                        ★ Main
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="bento-card bento-card-featured p-10 lg:p-16 text-center">
              <span className="bento-chip border-white/20 text-white/90 bg-white/10 mb-6">
                Expansion
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-[0.9] mb-6 mt-4">
                Don't See Your <span className="text-gradient-primary">City?</span>
              </h2>
              <p className="text-body text-lg mb-10 max-w-2xl mx-auto">
                We add 4-6 new cities every quarter. Tell us where you need Rohit Tour & Travel and we'll be there within 60 days.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-primary hover:text-white font-black px-7 py-3.5 transition-all duration-300 text-sm uppercase tracking-wider"
                >
                  Request A City
                </Link>
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white text-white font-black text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/10"
                >
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
