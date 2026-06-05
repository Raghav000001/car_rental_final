"use client";

import type { FilterState, ServiceType, SortOption } from "@/app/fleet/types";
import { serviceTypeLabels } from "@/app/fleet/vehicleData";

interface FleetFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
}

const serviceTypes: ServiceType[] = ["self-drive", "airport-drop"];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

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
  const toggleType = (type: ServiceType) => {
    const next = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onChange({ ...filters, types: next });
  };

  const hasAnyFilter = filters.types.length > 0;

  const clearAll = () => {
    onChange({
      types: [],
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

      <FilterGroup label="Service Type">
        <div className="flex flex-wrap gap-2">
          {serviceTypes.map((type) => (
            <ToggleChip
              key={type}
              label={serviceTypeLabels[type]}
              active={filters.types.includes(type)}
              onClick={() => toggleType(type)}
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
