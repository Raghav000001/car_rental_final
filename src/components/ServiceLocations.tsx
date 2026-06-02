"use client";

import { useState } from "react";
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/components/ui/mapcn-map-arc";

const locations = [
  "New York",
  "Los Angeles",
  "London",
  "Dubai",
  "Singapore",
  "Tokyo",
  "Paris",
  "Sydney",
];

const ROHTAK_CENTER: [number, number] = [76.6066, 28.8955];

export default function ServiceLocations() {
  const [popupOpen, setPopupOpen] = useState(true);

  return (
    <section className="py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mb-64 blur-3xl" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mt-48 blur-3xl" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">
                Global Network
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
              Our Service <span className="text-gradient-primary">Areas</span>
            </h2>
            <p className="text-body mt-4 max-w-md font-medium">
              With 32+ strategic locations worldwide, we bring premium car rental to your doorstep.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-3 glass border border-white/10 hover:border-primary hover:bg-primary px-6 py-3.5 transition-all duration-300 cursor-pointer self-start md:self-end"
          >
            <svg
              className="w-4 h-4 text-primary group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
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
            <span className="text-white font-black text-sm uppercase tracking-widest">
              Find Location
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="group relative bg-bg-light p-8 lg:p-10 shadow-premium border-l-4 border-primary overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative flex items-start gap-6">
                <div className="w-16 h-16 bg-black border-2 border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:rotate-6 transition-all duration-500">
                  <svg
                    className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
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
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter italic">
                    Main <span className="text-primary">Office</span>
                  </h3>
                  <p className="text-sm text-body leading-relaxed font-medium">
                    With a robust network spanning 32 strategic locations worldwide, we
                    provide seamless car rental services across continents.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full border-2 border-white bg-gray-700 overflow-hidden ring-2 ring-primary/20 hover:ring-primary transition-all"
                        >
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">
                        Join 50K+ Happy
                      </p>
                      <p className="text-[10px] font-bold text-body uppercase tracking-widest">
                        Customers Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-secondary p-6 lg:p-8 text-center cursor-pointer overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative">
                  <span className="block text-4xl lg:text-5xl font-black text-primary group-hover:text-secondary mb-2 transition-colors duration-500">
                    32+
                  </span>
                  <span className="text-[10px] font-black text-white group-hover:text-secondary uppercase tracking-widest transition-colors duration-500">
                    Global Cities
                  </span>
                </div>
              </div>
              <div className="group relative bg-bg-light p-6 lg:p-8 text-center cursor-pointer overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500">
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative">
                  <span className="block text-4xl lg:text-5xl font-black text-white group-hover:text-primary mb-2 transition-colors duration-500">
                    24/7
                  </span>
                  <span className="text-[10px] font-black text-body group-hover:text-white uppercase tracking-widest transition-colors duration-500">
                    Full Support
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all duration-500 shadow-premium h-[420px] lg:h-[520px]">
              <Map
                center={ROHTAK_CENTER}
                zoom={11}
                theme="dark"
                className="w-full h-full"
                onLoad={(map) => { map.getCanvas().tabIndex = -1; }}
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
                    closeButton={false}
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
                <p className="text-xl font-black text-white">32+</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 lg:gap-4">
          {locations.map((loc, i) => (
            <span
              key={i}
              className="group glass border border-white/10 hover:border-primary hover:bg-primary/10 px-5 py-2.5 text-xs font-black text-body hover:text-white uppercase tracking-widest transition-all duration-300 cursor-pointer"
            >
              {loc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
