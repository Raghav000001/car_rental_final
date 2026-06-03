"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CompareVehicle } from "@/app/fleet/types";
import { categoryLabels, fuelLabels } from "@/app/fleet/vehicleData";

interface VehicleComparisonModalProps {
  vehicles: CompareVehicle[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

function SpecRow({
  label,
  getValue,
  vehicles,
  onRemove,
}: {
  label: string;
  getValue: (v: CompareVehicle) => string | number;
  vehicles: CompareVehicle[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-[120px_repeat(auto-fill,minmax(0,1fr))] gap-3 border-b border-white/5 py-3 last:border-0">
      <div className="text-[10px] text-body/60 font-black uppercase tracking-wider self-center">
        {label}
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          {vehicles[i] ? (
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-white font-bold">{getValue(vehicles[i])}</span>
              {i === 0 && (
                <button
                  onClick={() => onRemove(vehicles[0].id)}
                  className="text-primary hover:text-primary-dark transition-colors cursor-pointer shrink-0"
                  aria-label={`Remove ${vehicles[0].name}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <span className="text-body/30 text-xs italic">—</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function VehicleComparisonModal({
  vehicles,
  onClose,
  onRemove,
}: VehicleComparisonModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-bg-dark to-secondary border border-white/10 rounded-2xl shadow-premium"
          role="dialog"
          aria-modal="true"
          aria-label="Vehicle comparison"
        >
          <div className="sticky top-0 z-10 bg-gradient-to-b from-bg-dark to-bg-dark/90 backdrop-blur-md border-b border-white/5 p-5 lg:p-6 flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-black text-white italic tracking-tighter">
              Compare <span className="text-gradient-primary">Vehicles</span>
              <span className="text-body text-xs font-bold ml-2 not-italic">({vehicles.length} selected)</span>
            </h2>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/20 hover:bg-primary hover:border-primary flex items-center justify-center text-body hover:text-white transition-all duration-300 cursor-pointer"
              aria-label="Close comparison"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {vehicles.length > 0 && (
            <div className="grid grid-cols-[120px_repeat(auto-fill,minmax(0,1fr))] gap-3 p-5 lg:p-6 pb-0">
              <div />
              {vehicles.map((v) => (
                <div key={v.id} className="text-center">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5 mb-3">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-white font-black text-sm leading-tight">{v.name}</h3>
                  <span className="text-[9px] text-primary font-black uppercase tracking-wider">
                    {categoryLabels[v.category]}
                  </span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - vehicles.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="text-center">
                  <div className="aspect-[4/3] rounded-xl bg-white/[0.02] border border-dashed border-white/10 flex items-center justify-center mb-3">
                    <span className="text-body/20 text-xs font-bold uppercase tracking-wider">Select vehicle</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-5 lg:p-6 pt-4">
            {vehicles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-body text-sm font-bold">
                  Click the <span className="text-primary">compare icon</span> on any vehicle card to add it here.
                </p>
                <p className="text-body/50 text-xs mt-2">Compare up to 3 vehicles side by side.</p>
              </div>
            ) : (
              <div>
                <SpecRow label="Category" getValue={(v) => categoryLabels[v.category]} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Seating" getValue={(v) => `${v.seating} Seater`} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Fuel" getValue={(v) => fuelLabels[v.fuel]} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="AC" getValue={(v) => (v.ac === "ac" ? "Available" : "Not Available")} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Transmission" getValue={(v) => v.transmission === "automatic" ? "Automatic" : "Manual"} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Luggage" getValue={(v) => v.luggage} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Price/km" getValue={(v) => `₹${v.pricePerKm}`} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Starting Price" getValue={(v) => `₹${v.startingPrice.toLocaleString()}`} vehicles={vehicles} onRemove={onRemove} />
                <SpecRow label="Rating" getValue={(v) => `${v.rating} ★`} vehicles={vehicles} onRemove={onRemove} />
              </div>
            )}
          </div>

          <div className="p-5 lg:p-6 pt-0 flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-primary text-white font-black text-xs uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 shadow-glow-red cursor-pointer"
            >
              Close Comparison
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
