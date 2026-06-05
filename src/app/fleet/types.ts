export type ServiceType = "self-drive" | "airport-drop" | "local-rental";

export type Transmission = "manual" | "automatic";

export type FuelType = "petrol" | "diesel" | "cng" | "ev";

export type SeatingCapacity = 4 | 5 | 6 | 7 | 8 | 9 | 12 | 17;

export type AcType = "ac" | "non-ac";

export interface Vehicle {
  id: string;
  name: string;
  serviceType: ServiceType;
  image: string;
  seating: SeatingCapacity;
  fuel: FuelType;
  transmission: Transmission;
  ac: AcType;
  luggage: string;
  /** Display price — daily rate for self-drive, flat price for airport-drop */
  price: number;
  /** Label shown next to price (e.g. "Per Day", "Airport Drop") */
  priceLabel: string;
  rating: number;
  reviewCount: number;
  description: string;
}

export interface LocalRentalPackage {
  id: string;
  name: string;
  duration: string;
  distance: string;
  price: number;
  features: string[];
}

export interface FilterState {
  types: ServiceType[];
  search: string;
}

export type SortOption = "popular" | "price-low" | "price-high" | "rating";

export interface CompareVehicle {
  id: string;
  name: string;
  image: string;
  serviceType: ServiceType;
  seating: SeatingCapacity;
  fuel: FuelType;
  transmission: Transmission;
  ac: AcType;
  luggage: string;
  price: number;
  priceLabel: string;
  rating: number;
}
