"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/mapcn-map-arc";

const CARDIFF_CENTER: [number, number] = [-3.1791, 51.4816];

export default function ContactMapSection() {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <section className="relative overflow-hidden pb-20 lg:pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-strong" />
              Visit Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">
              Find Us on the{" "}
              <span className="text-gradient-primary">Map</span>
            </h2>
            <p className="text-body text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Stop by our office or get in touch — we&apos;re always happy to
              discuss your travel needs in person.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[480px] bento-card bento-card-featured p-0 group">
            <div className="relative h-[400px] lg:h-[480px]">
              <Map
                center={CARDIFF_CENTER}
                zoom={13}
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
                  longitude={CARDIFF_CENTER[0]}
                  latitude={CARDIFF_CENTER[1]}
                >
                  <MarkerContent>
                    <button
                      type="button"
                      onClick={() => setPopupOpen((v) => !v)}
                      aria-label="Toggle office details"
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
                    longitude={CARDIFF_CENTER[0]}
                    latitude={CARDIFF_CENTER[1]}
                    offset={28}
                    closeOnClick={false}
                  >
                    <div className="bg-secondary border border-primary/40 shadow-premium p-4 min-w-[220px] font-sans">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                          Our Office
                        </p>
                      </div>
                      <h4 className="text-white text-base font-black uppercase tracking-tighter mb-1">
                        Rohit Tour & Travel
                      </h4>
                      <p className="text-xs text-body font-medium leading-relaxed">
                        57 Heol Insaf, Station Road
                        <br />
                        Cardiff, United Kingdom
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-body">Mon–Fri 8AM–6PM</span>
                        <a
                          href="https://www.openstreetmap.org/?mlat=51.4816&mlon=-3.1791#map=15/51.4816/-3.1791"
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
                  Our Location
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
