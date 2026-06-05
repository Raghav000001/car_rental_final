"use client";

import { useState } from "react";
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

export default function ServiceAreasPage() {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <>
      <Navbar />
      <main>
  
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

              <div className="md:col-span-2 lg:col-span-2 bento-card p-0 relative overflow-hidden min-h-[400px]">
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                    src="https://www.youtube.com/embed/Zb8gLk--kJ8?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&playlist=Zb8gLk--kJ8"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
                    style={{ pointerEvents: 'none', aspectRatio: '9/16' }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Virtual Tour of Rohtak"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-[1]" />
                <div className="relative z-[2] p-6 lg:p-8 flex flex-col justify-end h-full min-h-[400px]">
                  <span className="bento-chip mb-4 w-fit">Our Coverage</span>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic leading-[0.95]">
                    Serving{" "}
                    <span className="text-gradient-primary">20+ Cities</span>
                    <br />
                    Across North India
                  </h2>
                  <p className="text-body text-sm leading-relaxed mt-3 max-w-xs">
                    From the heart of Haryana to the mountains of Himachal —
                    reliable rides wherever you need them.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {["Haryana", "Delhi NCR", "Uttarakhand", "Rajasthan", "Punjab", "Himachal"].map(
                      (state) => (
                        <span
                          key={state}
                          className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80"
                        >
                          {state}
                        </span>
                      )
                    )}
                  </div>
                </div>
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
