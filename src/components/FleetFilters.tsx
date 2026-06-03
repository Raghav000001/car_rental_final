"use client";

import { useMemo } from "react";
import type { FilterState, VehicleType, Transmission, FuelType, SeatingCapacity, AcType, PopularTag, SortOption } from "@/app/fleet/types";
import { categoryLabels, fuelLabels, allTags, PRICE_RANGE } from "@/app/fleet/vehicleData";

interface FleetFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
}

const vehicleTypes: VehicleType[] = ["hatchback", "sedan", "suv", "muv", "luxury", "tempo-traveller"];
const seatOptions: SeatingCapacity[] = [4, 5, 6, 7, 9, 12, 17];
const transmissions: Transmission[] = ["manual", "automatic"];
const fuelOptions: FuelType[] = ["petrol", "diesel", "cng", "ev"];
const acOptions: AcType[] = ["ac", "non-ac"];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

type FilterKey = keyof FilterState;

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
        active
          ? "bg-primary text-white shadow-glow-red"
          : "bg-white/[0.04] text-body border border-white/10 hover:border-primary/50 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export default function FleetFilters({
  filters,
  onChange,
  sort,
  onSortChange,
  totalResults,
}: FleetFiltersProps) {
  const toggleMulti = (key: FilterKey, value: string, field: "types" | "seating" | "transmission" | "fuel" | "ac" | "tags") => {
    const arr = filters[field] as string[];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    onChange({ ...filters, [field]: next });
  };

  const setPriceRange = (min: number, max: number) => {
    onChange({ ...filters, priceRange: [min, max] });
  };

  const hasAnyFilter =
    filters.types.length > 0 ||
    filters.seating.length > 0 ||
    filters.transmission.length > 0 ||
    filters.fuel.length > 0 ||
    filters.ac.length > 0 ||
    filters.tags.length > 0 ||
    filters.priceRange[0] > PRICE_RANGE[0] ||
    filters.priceRange[1] < PRICE_RANGE[1];

  const clearAll = () => {
    onChange({
      types: [],
      seating: [],
      transmission: [],
      fuel: [],
      ac: [],
      tags: [],
      priceRange: PRICE_RANGE,
      search: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-body">
          <span className="text-white font-bold">{totalResults}</span> vehicles found
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-body/60 font-bold uppercase tracking-wider">Sort:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-white/[0.05] border border-white/10 text-white text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-bg-dark">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {hasAnyFilter && (
            <button
              onClick={clearAll}
              className="text-[10px] text-primary font-black uppercase tracking-wider hover:text-primary-dark transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <FilterGroup label="Vehicle Type">
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((type) => (
            <ToggleChip
              key={type}
              label={categoryLabels[type]}
              active={filters.types.includes(type)}
              onClick={() => toggleMulti("types", type, "types")}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Seating Capacity">
        <div className="flex flex-wrap gap-2">
          {seatOptions.map((seat) => (
            <ToggleChip
              key={seat}
              label={`${seat} Seater`}
              active={filters.seating.includes(seat)}
              onClick={() => toggleMulti("seating", String(seat), "seating")}
            />
          ))}
        </div>
      </FilterGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FilterGroup label="Transmission">
          <div className="flex flex-wrap gap-2">
            {transmissions.map((t) => (
              <ToggleChip
                key={t}
                label={t.charAt(0).toUpperCase() + t.slice(1)}
                active={filters.transmission.includes(t)}
                onClick={() => toggleMulti("transmission", t, "transmission")}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label="Fuel Type">
          <div className="flex flex-wrap gap-2">
            {fuelOptions.map((f) => (
              <ToggleChip
                key={f}
                label={fuelLabels[f]}
                active={filters.fuel.includes(f)}
                onClick={() => toggleMulti("fuel", f, "fuel")}
              />
            ))}
          </div>
        </FilterGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FilterGroup label="AC Type">
          <div className="flex flex-wrap gap-2">
            {acOptions.map((a) => (
              <ToggleChip
                key={a}
                label={a === "ac" ? "AC" : "Non AC"}
                active={filters.ac.includes(a)}
                onClick={() => toggleMulti("ac", a, "ac")}
              />
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label={`Price per km (₹${filters.priceRange[0]} — ₹${filters.priceRange[1]})`}>
          <div className="px-2">
            <input
              type="range"
              min={PRICE_RANGE[0]}
              max={PRICE_RANGE[1]}
              step={1}
              value={filters.priceRange[0]}
              onChange={(e) => setPriceRange(Number(e.target.value), filters.priceRange[1])}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
              aria-label="Min price per km"
            />
            <input
              type="range"
              min={PRICE_RANGE[0]}
              max={PRICE_RANGE[1]}
              step={1}
              value={filters.priceRange[1]}
              onChange={(e) => setPriceRange(filters.priceRange[0], Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer mt-1"
              aria-label="Max price per km"
            />
            <div className="flex justify-between text-[10px] text-body/50 font-bold mt-1">
              <span>₹{PRICE_RANGE[0]}</span>
              <span>₹{PRICE_RANGE[1]}</span>
            </div>
          </div>
        </FilterGroup>
      </div>

      <FilterGroup label="Popular Uses">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <ToggleChip
              key={tag.id}
              label={tag.label}
              active={filters.tags.includes(tag.id as PopularTag)}
              onClick={() => toggleMulti("tags", tag.id, "tags")}
            />
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-body/60 font-bold uppercase tracking-[0.15em] mb-3">{label}</p>
      {children}
    </div>
  );
}
