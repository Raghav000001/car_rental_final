"use client";

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CompareVehicle } from "@/app/fleet/types";
import { vehicles as allFleetVehicles, serviceTypeLabels, fuelLabels } from "@/app/fleet/vehicleData";
import { formatPrice } from "@/lib/utils";

interface Props {
  vehicles: CompareVehicle[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAdd: (id: string) => void;
}

const MAX_VEHICLES = 4;

const vehicleCategory: Record<string, string> = {
  swift: "Hatchback",
  baleno: "Hatchback",
  dzire: "Sedan",
  ertiga: "MUV",
  carens: "MUV",
  innova: "MUV",
  scorpio: "SUV",
  thar: "SUV",
};

interface SpecRow {
  label: string;
  category: string;
  getValue: (v: CompareVehicle) => string;
}

const SPEC_ROWS: SpecRow[] = [
  { category: "General", label: "Vehicle Name", getValue: (v) => v.name },
  { category: "General", label: "Service Type", getValue: (v) => serviceTypeLabels[v.serviceType] },

  { category: "Pricing", label: "Daily Price", getValue: (v) => v.serviceType === "self-drive" ? `${formatPrice(v.price)}/${v.priceLabel.replace("Per ", "").toLowerCase()}` : "\u2014" },
  { category: "Pricing", label: "Airport Drop Price", getValue: (v) => v.serviceType === "airport-drop" ? formatPrice(v.price) : "\u2014" },
  { category: "Pricing", label: "Local Rental Price", getValue: (v) => v.serviceType === "local-rental" ? formatPrice(v.price) : "\u2014" },

  { category: "Capacity", label: "Seats", getValue: (v) => `${v.seating}` },
  { category: "Capacity", label: "Luggage", getValue: (v) => v.luggage },

  { category: "Features", label: "AC", getValue: (v) => v.ac === "ac" ? "Available" : "Not Available" },
  { category: "Features", label: "Music System", getValue: () => "\u2014" },
  { category: "Features", label: "Power Steering", getValue: () => "\u2014" },
  { category: "Features", label: "GPS", getValue: () => "\u2014" },
  { category: "Features", label: "Charging Port", getValue: () => "\u2014" },

  { category: "Vehicle Info", label: "Fuel Type", getValue: (v) => fuelLabels[v.fuel] },
  { category: "Vehicle Info", label: "Transmission", getValue: (v) => v.transmission === "automatic" ? "Automatic" : "Manual" },
  { category: "Vehicle Info", label: "Category", getValue: (v) => vehicleCategory[v.id] || "\u2014" },
];

const CATEGORIES = Array.from(new Set(SPEC_ROWS.map((r) => r.category)));

const glassCard = "bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl shadow-premium";

function AddVehicleSelector({
  selectedIds,
  onSelect,
  onClose,
}: {
  selectedIds: string[];
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");

  const available = useMemo(
    () =>
      allFleetVehicles.filter(
        (v) => !selectedIds.includes(v.id) && (search === "" || v.name.toLowerCase().includes(search.toLowerCase())),
      ),
    [selectedIds, search],
  );

  const grouped = useMemo(() => {
    const map: Record<string, typeof allFleetVehicles> = {};
    for (const v of available) {
      const key = serviceTypeLabels[v.serviceType];
      if (!map[key]) map[key] = [];
      map[key].push(v);
    }
    return map;
  }, [available]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[70vh] flex flex-col bg-gradient-to-b from-bg-dark to-secondary border border-white/10 rounded-2xl shadow-premium overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="text-white font-black text-sm uppercase tracking-wider">
            Add Vehicle
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-white/20 hover:bg-primary hover:border-primary flex items-center justify-center text-body hover:text-white transition-all duration-300 cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close selector"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 px-5 py-3 border-b border-white/5">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vehicles..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-body/30 font-bold outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {available.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-body/50 text-sm font-bold">
                {search ? "No vehicles match your search." : "All vehicles are already selected."}
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([group, groupVehicles]) => (
              <div key={group}>
                <h4 className="text-[10px] text-primary font-black uppercase tracking-wider mb-2">
                  {group}
                </h4>
                <div className="space-y-1.5">
                  {groupVehicles.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        onSelect(v.id);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-primary/30 transition-all duration-200 cursor-pointer text-left group"
                    >
                      <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        <Image src={v.image} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{v.name}</p>
                        <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">{formatPrice(v.price)}</p>
                      </div>
                      <svg className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="shrink-0 flex justify-center px-5 py-3 border-t border-white/5">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/5 text-body text-[10px] font-black uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ComparisonTable({ vehicles }: { vehicles: CompareVehicle[] }) {
  const colCount = vehicles.length;
  const colWidth = "minmax(200px, 1fr)";

  const diffCache = useMemo(() => {
    const cache: Record<string, boolean[]> = {};
    for (const row of SPEC_ROWS) {
      const values = vehicles.map((v) => row.getValue(v));
      const allSame = values.every((v) => v === values[0]);
      cache[row.label] = vehicles.map(() => !allSame);
    }
    return cache;
  }, [vehicles]);

  return (
    <div className="overflow-auto rounded-2xl border border-white/10">
      <div
        className="grid bg-white/[0.02]"
        style={{
          gridTemplateColumns: `180px repeat(${colCount}, ${colWidth})`,
          minWidth: `${180 + colCount * 200}px`,
        }}
      >
        <div className="sticky top-0 left-0 z-20 bg-bg-dark/95 backdrop-blur-md px-4 py-3.5 border-b border-white/5 flex items-center">
          <span className="text-[10px] text-body/40 font-black uppercase tracking-wider">
            Feature
          </span>
        </div>
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="sticky top-0 z-10 bg-bg-dark/95 backdrop-blur-md px-4 py-3.5 border-b border-white/5 flex items-center"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-6 rounded overflow-hidden bg-white/5 shrink-0">
                <Image src={v.image} alt="" fill sizes="32px" className="object-cover" />
              </div>
              <span className="text-white font-black text-xs leading-tight truncate">
                {v.name}
              </span>
            </div>
          </div>
        ))}

        {CATEGORIES.map((cat) => {
          const catRows = SPEC_ROWS.filter((r) => r.category === cat);
          return (
            <CategorySection
              key={cat}
              label={cat}
              rows={catRows}
              vehicles={vehicles}
              colCount={colCount}
              diffCache={diffCache}
            />
          );
        })}
      </div>
    </div>
  );
}

function CategorySection({
  label,
  rows,
  vehicles,
  colCount,
  diffCache,
}: {
  label: string;
  rows: SpecRow[];
  vehicles: CompareVehicle[];
  colCount: number;
  diffCache: Record<string, boolean[]>;
}) {
  return (
    <>
      <div className="col-span-full grid grid-cols-subgrid bg-white/[0.02] border-t border-white/10">
        <div className="sticky left-0 z-10 bg-bg-dark px-4 py-2.5">
          <span className="text-[10px] text-primary font-black uppercase tracking-wider">
            {label}
          </span>
        </div>
        {Array.from({ length: colCount }).map((_, i) => (
          <div key={i} className="h-px bg-white/10 my-auto mx-4" />
        ))}
      </div>

      {rows.map((row, rowIdx) => {
        const diffs = diffCache[row.label] || [];
        return (
          <div
            key={row.label}
            className={`col-span-full grid grid-cols-subgrid items-center transition-colors hover:bg-white/[0.02] ${
              rowIdx % 2 === 1 ? "bg-white/[0.01]" : ""
            }`}
          >
            <div className="sticky left-0 z-10 bg-bg-dark px-4 py-3">
              <span className="text-[10px] text-body/60 font-black uppercase tracking-wider">
                {row.label}
              </span>
            </div>
            {vehicles.map((v, i) => {
              const value = row.getValue(v);
              const isDiff = diffs[i] && value !== "\u2014";
              return (
                <div
                  key={v.id}
                  className={`px-4 py-3 border-l border-white/5 first:border-l-0 ${
                    isDiff ? "bg-red-500/5" : ""
                  }`}
                >
                  <span
                    className={`text-sm font-bold ${
                      isDiff ? "text-red-400" : "text-white"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

function MobileStackedCards({ vehicles }: { vehicles: CompareVehicle[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (activeIdx >= vehicles.length) {
      setActiveIdx(Math.max(0, vehicles.length - 1));
    }
  }, [vehicles.length, activeIdx]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIdx < vehicles.length - 1) {
        setActiveIdx((i) => i + 1);
      } else if (diff < 0 && activeIdx > 0) {
        setActiveIdx((i) => i - 1);
      }
    }
  }, [activeIdx, vehicles.length]);

  const diffsForVehicle = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const row of SPEC_ROWS) {
      const values = vehicles.map((v) => row.getValue(v));
      const allSame = values.every((v) => v === values[0]);
      map[row.label] = !allSame;
    }
    return map;
  }, [vehicles]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {vehicles.length > 1 && (
        <div className="flex gap-1.5 px-4 pt-4 pb-2 overflow-x-auto scrollbar-hide shrink-0">
          {vehicles.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                i === activeIdx
                  ? "bg-primary text-white shadow-glow-red"
                  : "bg-white/5 text-body/60 hover:text-white"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      )}

      <div
        className="flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {vehicles.map((v) => (
            <div key={v.id} className="min-w-full h-full overflow-y-auto px-4 pb-4 space-y-3">
              <div className={`${glassCard} p-4 mt-2`}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 mb-3">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white font-black text-base">{v.name}</h3>
                    <span className="text-[10px] text-primary font-black uppercase tracking-wider">
                      {serviceTypeLabels[v.serviceType]}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-white font-black text-lg">{formatPrice(v.price)}</span>
                  </div>
                </div>
              </div>

              {CATEGORIES.map((cat) => {
                const catRows = SPEC_ROWS.filter((r) => r.category === cat);
                return (
                  <div key={cat}>
                    <h4 className="text-[10px] text-primary font-black uppercase tracking-wider mb-1.5 px-1">
                      {cat}
                    </h4>
                    <div className={`${glassCard} divide-y divide-white/5`}>
                      {catRows.map((row) => {
                        const value = row.getValue(v);
                        const isDiff = diffsForVehicle[row.label] && value !== "\u2014";
                        return (
                          <div
                            key={row.label}
                            className={`flex items-center justify-between px-4 py-2.5 ${
                              isDiff ? "bg-red-500/5" : ""
                            }`}
                          >
                            <span className="text-[10px] text-body/60 font-black uppercase tracking-wider">
                              {row.label}
                            </span>
                            <span
                              className={`text-sm font-bold text-right ${
                                isDiff ? "text-red-400" : "text-white"
                              }`}
                            >
                              {value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VehicleComparisonModal({
  vehicles,
  onClose,
  onRemove,
  onAdd,
}: Props) {
  const [showSelector, setShowSelector] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showSelector) {
          setShowSelector(false);
        } else {
          onClose();
        }
      }
    },
    [onClose, showSelector],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const hasMinVehicles = vehicles.length >= 2;
  const canAddMore = vehicles.length < MAX_VEHICLES;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[1400px] w-[95vw] max-h-[90vh] flex flex-col bg-gradient-to-b from-bg-dark to-secondary border border-white/10 rounded-2xl shadow-premium overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Vehicle comparison"
        >
          {showSelector && (
            <AddVehicleSelector
              selectedIds={vehicles.map((v) => v.id)}
              onSelect={onAdd}
              onClose={() => setShowSelector(false)}
            />
          )}

          <div className="shrink-0 flex items-center justify-between px-5 lg:px-8 py-4 lg:py-5 border-b border-white/5 bg-bg-dark/80 backdrop-blur-md">
            <div>
              <h2 className="text-lg lg:text-xl font-black text-white italic tracking-tighter">
                Compare <span className="text-gradient-primary">Vehicles</span>
              </h2>
              <p className="text-[10px] text-body/50 font-bold uppercase tracking-wider mt-0.5">
                {vehicles.length} of {MAX_VEHICLES} selected
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/20 hover:bg-primary hover:border-primary flex items-center justify-center text-body hover:text-white transition-all duration-300 cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close comparison"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="shrink-0 px-5 lg:px-8 py-4 border-b border-white/5 bg-bg-dark/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: MAX_VEHICLES }).map((_, i) => {
                const vehicle = vehicles[i];
                if (vehicle) {
                  return (
                    <div
                      key={vehicle.id}
                      className="relative flex flex-col rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 overflow-hidden group"
                    >
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5">
                        <Image
                          src={vehicle.image}
                          alt={vehicle.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                          <span className="text-white font-black text-[11px]">
                            {formatPrice(vehicle.price)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-1 px-3 py-2">
                        <span className="text-white font-black text-[11px] leading-tight truncate">
                          {vehicle.name}
                        </span>
                        <button
                          onClick={() => onRemove(vehicle.id)}
                          className="w-5 h-5 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label={`Remove ${vehicle.name}`}
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <button
                    key={`empty-${i}`}
                    onClick={() => {
                      if (canAddMore) setShowSelector(true);
                    }}
                    disabled={!canAddMore}
                    className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/40 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed min-h-[130px] group"
                  >
                    <svg className="w-6 h-6 text-body/30 group-hover:text-primary/60 transition-colors mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-[9px] text-body/30 font-bold uppercase tracking-wider group-hover:text-body/50 transition-colors">
                      Add vehicle
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {!hasMinVehicles ? (
              <div className="flex items-center justify-center py-16 px-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <p className="text-body text-sm font-bold">
                    Select at least <span className="text-amber-400">2 vehicles</span> to compare.
                  </p>
                  <p className="text-body/50 text-xs mt-2">
                    Add more vehicles using the cards above.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 lg:p-6">
                <div className="hidden sm:block">
                  <ComparisonTable vehicles={vehicles} />
                </div>
                <div className="sm:hidden">
                  <MobileStackedCards vehicles={vehicles} />
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 flex justify-center px-5 lg:px-8 py-4 border-t border-white/5 bg-bg-dark/50">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Close Comparison
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
