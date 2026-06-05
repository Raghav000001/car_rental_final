"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const destinations = [
  { city: "Gurugram", details: "Cyber Hub, Leisure Valley, Kingdom of Dreams", tours: 50 },
  { city: "Faridabad", details: "Surajkund, Badkhal Lake, Nahar Singh Stadium", tours: 30 },
  { city: "Panchkula", details: "Morni Hills, Pinjore Gardens, Cactus Garden", tours: 25 },
  { city: "Ambala", details: "Cloth Market, Rani Ka Talab, Holy Redeemer Church", tours: 20 },
  { city: "Karnal", details: "Karna Lake, Cantonment Church Tower", tours: 15 },
  { city: "Rohtak", details: "Tilyar Lake, Banni Khera Farm", tours: 18 },
  { city: "Panipat", details: "Panipat Battlefield, Hemu's Samadhi Sthal", tours: 12 },
  { city: "Kurukshetra", details: "Brahma Sarovar, Jyotisar, Sheikh Chilli's Tomb", tours: 40 },
  { city: "Hisar", details: "Asoka Pillar, Firoz Shah Palace", tours: 10 },
  { city: "Sonipat", details: "Khwaja Khizir Tomb, Murthal", tours: 22 },
];

export default function SearchBar() {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState("Gurugram");
  const [startDate, setStartDate] = useState("2026-06-02");
  const [endDate, setEndDate] = useState("2026-06-20");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showDestination, setShowDestination] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const destRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestination(false);
      }
      if (peopleRef.current && !peopleRef.current.contains(e.target as Node)) {
        setShowPeople(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDestinations = destinations.filter(d => 
    d.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative z-30 pt-20 lg:pt-32 px-4 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[2px] bg-primary/60" />
          <span className="text-primary text-xs font-black uppercase tracking-[0.3em]">
            Book Your Ride
          </span>
          <span className="w-8 h-[2px] bg-primary/60" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic">
          Find Your <span className="text-gradient-primary">Perfect</span> Car
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative bg-bg-dark border border-white/5 rounded-2xl shadow-2xl p-2">
          <div className="flex flex-col lg:flex-row items-center divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            
            {/* Destination */}
            <div className="relative flex-1 w-full p-4 lg:p-6" ref={destRef}>
              <div className="flex items-center gap-4">
                <div className="flex-none w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="flex-1 cursor-pointer" onClick={() => setShowDestination(!showDestination)}>
                  <span className="block text-[11px] font-bold text-body/60 uppercase tracking-widest mb-1">Your Destination</span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-black">{selectedDestination}</span>
                    <svg className={`w-4 h-4 text-white/40 transition-transform ${showDestination ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {showDestination && (
                <div className="absolute top-full left-0 sm:left-4 w-[calc(100vw-2rem)] sm:w-80 mt-2 bg-white rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input 
                        type="text" 
                        placeholder="Type Your Destination"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {filteredDestinations.map((dest) => (
                      <button
                        key={dest.city}
                        onClick={() => {
                          setSelectedDestination(dest.city);
                          setShowDestination(false);
                        }}
                        className="w-full text-left px-5 py-4 hover:bg-gray-50 flex items-center justify-between group transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="flex flex-col">
                          <span className="font-black text-gray-900 text-[15px] group-hover:text-primary transition-colors italic">
                            {dest.city}
                          </span>
                          <span className="text-[11px] text-gray-500 font-bold mt-0.5 uppercase tracking-tighter">{dest.details}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary flex flex-col items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
                          <span className="text-[14px] font-black leading-none">{dest.tours}</span>
                          <span className="text-[7px] font-black uppercase tracking-tighter leading-none">Tour</span>
                        </div>
                      </button>
                    ))}
                    {filteredDestinations.length === 0 && (
                      <div className="p-8 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                        No locations found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Start Date */}
            <div className="relative flex-1 w-full p-4 lg:p-6">
              <div className="flex items-center gap-4">
                <div className="flex-none w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] font-bold text-body/60 uppercase tracking-widest mb-1">When to Start</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full font-black text-white bg-transparent cursor-pointer scheme-dark focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Finish Date */}
            <div className="relative flex-1 w-full p-4 lg:p-6">
              <div className="flex items-center gap-4">
                <div className="flex-none w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] font-bold text-body/60 uppercase tracking-widest mb-1">When to Finish</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full font-black text-white bg-transparent cursor-pointer scheme-dark focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* People */}
            <div className="relative flex-1 w-full p-4 lg:p-6" ref={peopleRef}>
              <div className="flex items-center gap-4">
                <div className="flex-none w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1 cursor-pointer" onClick={() => setShowPeople(!showPeople)}>
                  <span className="block text-[11px] font-bold text-body/60 uppercase tracking-widest mb-1">People</span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-black">{adults} Adults, {children} Child</span>
                    <svg className={`w-4 h-4 text-white/40 transition-transform ${showPeople ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {showPeople && (
                <div className="absolute top-full right-0 sm:right-4 w-[calc(100vw-2rem)] sm:w-64 mt-2 bg-white rounded-xl shadow-2xl z-50 p-5 animate-fadeIn">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-gray-900 text-sm">Adults</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">–</button>
                        <span className="font-black text-gray-900 min-w-[20px] text-center">{adults}</span>
                        <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-gray-900 text-sm">Children</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">–</button>
                        <span className="font-black text-gray-900 min-w-[20px] text-center">{children}</span>
                        <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="flex-none p-3 lg:p-4">
              <button
                onClick={() => router.push("/fleet")}
                className="w-full lg:w-44 h-14 bg-primary hover:bg-primary-dark text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer text-lg"
              >
                Search
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
