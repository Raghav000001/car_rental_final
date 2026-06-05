"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categoryLabels } from "@/app/fleet/vehicleData";
import type { Vehicle, VehicleType } from "@/app/fleet/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  onCompare: (id: string) => void;
  compareIds: string[];
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < Math.round(rating) ? "text-star" : "text-white/20"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-[10px] text-body font-bold ml-1">({count})</span>
    </div>
  );
}

const badgeColors: Record<VehicleType, string> = {
  hatchback: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  sedan: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  suv: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  muv: "bg-green-500/20 text-green-400 border-green-500/30",
  luxury: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "tempo-traveller": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export default function VehicleCard({
  vehicle,
  index,
  onCompare,
  compareIds,
}: VehicleCardProps) {
  const isComparing = compareIds.includes(vehicle.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.25)] shine-effect"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />

        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${badgeColors[vehicle.category]}`}
          >
            {categoryLabels[vehicle.category]}
          </span>
        </div>

        <button
          onClick={() => onCompare(vehicle.id)}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
            isComparing
              ? "bg-primary text-white shadow-glow-red"
              : "bg-black/40 text-white/60 hover:bg-primary/80 hover:text-white border border-white/20"
          }`}
          aria-label={isComparing ? "Remove from compare" : "Add to compare"}
          title="Compare"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-body font-bold uppercase tracking-wider">Starting from</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">
              ₹{vehicle.startingPrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-body font-bold uppercase tracking-wider">Per km</p>
            <p className="text-lg font-black text-primary italic">₹{vehicle.pricePerKm}</p>
          </div>
        </div>
      </div>

      <div className="p-5 lg:p-6">
        {/* Name & rating */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-white group-hover:text-primary font-black text-lg leading-tight transition-colors duration-300">{vehicle.name}</h3>
          <StarRating rating={vehicle.rating} count={vehicle.reviewCount} />
        </div>

        <p className="text-body/70 text-xs leading-relaxed mb-4 line-clamp-2">
          {vehicle.description}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          <SpecItem label="Seats" value={`${vehicle.seating}`} />
          <SpecItem label="Fuel" value={vehicle.fuel.charAt(0).toUpperCase() + vehicle.fuel.slice(1)} />
          <SpecItem label="Gear" value={vehicle.transmission === "automatic" ? "Auto" : "Manual"} />
          <SpecItem label="AC" value={vehicle.ac === "ac" ? "Available" : "Not Available"} />
          <SpecItem label="Luggage" value={vehicle.luggage} />
          <SpecItem label="Rating" value={`${vehicle.rating}★`} />
        </div>

        {vehicle.popularTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {vehicle.popularTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-primary/10 text-primary/80 border border-primary/20"
              >
                {tag.replace("-", " ")}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Link
            href="#"
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl text-center transition-all duration-300 shadow-glow-red hover:shadow-glow-red-strong"
          >
            Book Now
          </Link>
          <Link
            href={`/fleet/${vehicle.id}`}
            className="flex-[0.6] border border-white/20 hover:border-primary text-body hover:text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl text-center transition-all duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2 text-center">
      <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-xs text-white font-bold mt-0.5">{value}</p>
    </div>
  );
}
