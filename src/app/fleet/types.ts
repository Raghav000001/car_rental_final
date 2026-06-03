export type VehicleType =
  | "hatchback"
  | "sedan"
  | "suv"
  | "muv"
  | "luxury"
  | "tempo-traveller";

export type Transmission = "manual" | "automatic";

export type FuelType = "petrol" | "diesel" | "cng" | "ev";

export type SeatingCapacity = 4 | 5 | 6 | 7 | 8 | 9 | 12 | 17;

export type AcType = "ac" | "non-ac";

export type PopularTag =
  | "airport-transfer"
  | "outstation"
  | "local-rental"
  | "wedding"
  | "corporate"
  | "family-trip";

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleType;
  image: string;
  seating: SeatingCapacity;
  fuel: FuelType;
  transmission: Transmission;
  ac: AcType;
  luggage: string;
  pricePerKm: number;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  popularTags: PopularTag[];
  isFeatured: boolean;
  isMostBooked: boolean;
  isBestRated: boolean;
  isPremiumChoice: boolean;
  description: string;
}

export interface FilterState {
  types: VehicleType[];
  seating: SeatingCapacity[];
  transmission: Transmission[];
  fuel: FuelType[];
  ac: AcType[];
  tags: PopularTag[];
  priceRange: [number, number];
  search: string;
}

export type SortOption = "popular" | "price-low" | "price-high" | "rating";

export interface CompareVehicle {
  id: string;
  name: string;
  image: string;
  category: VehicleType;
  seating: SeatingCapacity;
  fuel: FuelType;
  transmission: Transmission;
  ac: AcType;
  luggage: string;
  pricePerKm: number;
  startingPrice: number;
  rating: number;
}
