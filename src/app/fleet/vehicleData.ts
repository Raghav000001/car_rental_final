import type { Vehicle } from "./types";

// All image URLs verified to return HTTP 200 on 2026-06-03
const images = {
  wagonr:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
  swift:
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  baleno:
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
  dzire:
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80",
  amaze:
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
  aura:
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
  creta:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
  seltos:
    "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&q=80",
  xuv700:
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
  harrier:
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80",
  ertiga:
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
  rumion:
    "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80",
  carens:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
  fortuner:
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
  bmw:
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80",
  mercedes:
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
  tempo12:
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&q=80",
  tempo17:
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
  maharaja:
    "https://images.unsplash.com/photo-1718173402850-c20bb4ba3e2e?w=600&q=80",
};

export const vehicles: Vehicle[] = [
  // ── Hatchbacks ──
  {
    id: "wagonr",
    name: "Maruti Suzuki WagonR",
    category: "hatchback",
    image: images.wagonr,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "240L",
    pricePerKm: 8,
    startingPrice: 999,
    rating: 4.3,
    reviewCount: 2847,
    popularTags: ["local-rental", "family-trip"],
    isFeatured: true,
    isMostBooked: true,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "India's favourite family hatchback. Spacious, fuel-efficient, and perfect for city commutes with ample boot space.",
  },
  {
    id: "swift",
    name: "Maruti Suzuki Swift",
    category: "hatchback",
    image: images.swift,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "268L",
    pricePerKm: 9,
    startingPrice: 1199,
    rating: 4.4,
    reviewCount: 3102,
    popularTags: ["local-rental", "outstation"],
    isFeatured: false,
    isMostBooked: true,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "The iconic Swift delivers sporty looks with peppy performance. A fun drive for daily commutes and weekend getaways.",
  },
  {
    id: "baleno",
    name: "Maruti Suzuki Baleno",
    category: "hatchback",
    image: images.baleno,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "318L",
    pricePerKm: 10,
    startingPrice: 1299,
    rating: 4.5,
    reviewCount: 1956,
    popularTags: ["local-rental", "family-trip"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: false,
    description:
      "Premium hatchback with a bold design and a spacious cabin. The Baleno offers a refined ride with class-leading features.",
  },

  // ── Sedans ──
  {
    id: "dzire",
    name: "Maruti Suzuki Dzire",
    category: "sedan",
    image: images.dzire,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "378L",
    pricePerKm: 12,
    startingPrice: 1499,
    rating: 4.4,
    reviewCount: 2678,
    popularTags: ["outstation", "corporate"],
    isFeatured: false,
    isMostBooked: true,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "India's best-selling sedan. The Dzire combines elegance with exceptional fuel economy — ideal for long highway drives.",
  },
  {
    id: "amaze",
    name: "Honda Amaze",
    category: "sedan",
    image: images.amaze,
    seating: 5,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "420L",
    pricePerKm: 14,
    startingPrice: 1699,
    rating: 4.5,
    reviewCount: 1834,
    popularTags: ["outstation", "family-trip"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: false,
    description:
      "Honda's compact sedan with a refined diesel engine. Known for its smooth ride, premium interiors, and impressive mileage.",
  },
  {
    id: "aura",
    name: "Hyundai Aura",
    category: "sedan",
    image: images.aura,
    seating: 5,
    fuel: "petrol",
    transmission: "automatic",
    ac: "ac",
    luggage: "402L",
    pricePerKm: 13,
    startingPrice: 1599,
    rating: 4.3,
    reviewCount: 1423,
    popularTags: ["corporate", "local-rental"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "Hyundai's stylish sedan with an automatic transmission option. Perfect for effortless city driving and executive commutes.",
  },

  // ── SUVs ──
  {
    id: "creta",
    name: "Hyundai Creta",
    category: "suv",
    image: images.creta,
    seating: 5,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "433L",
    pricePerKm: 18,
    startingPrice: 2499,
    rating: 4.6,
    reviewCount: 4521,
    popularTags: ["outstation", "family-trip", "airport-transfer"],
    isFeatured: true,
    isMostBooked: true,
    isBestRated: true,
    isPremiumChoice: false,
    description:
      "The king of Indian SUVs. The Creta offers commanding road presence, a plush cabin, and stellar ride comfort for all terrains.",
  },
  {
    id: "seltos",
    name: "Kia Seltos",
    category: "suv",
    image: images.seltos,
    seating: 5,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "433L",
    pricePerKm: 19,
    startingPrice: 2699,
    rating: 4.5,
    reviewCount: 3890,
    popularTags: ["outstation", "wedding", "corporate"],
    isFeatured: true,
    isMostBooked: false,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "Kia's game-changing SUV with a striking design and segment-first features. A head-turner on every road.",
  },
  {
    id: "xuv700",
    name: "Mahindra XUV700",
    category: "suv",
    image: images.xuv700,
    seating: 7,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "520L",
    pricePerKm: 21,
    startingPrice: 3299,
    rating: 4.7,
    reviewCount: 2104,
    popularTags: ["outstation", "family-trip"],
    isFeatured: true,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: false,
    description:
      "India's most advanced SUV with ADAS technology. Powerful, safe, and incredibly spacious for large families.",
  },
  {
    id: "harrier",
    name: "Tata Harrier",
    category: "suv",
    image: images.harrier,
    seating: 5,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "425L",
    pricePerKm: 20,
    startingPrice: 2999,
    rating: 4.5,
    reviewCount: 1765,
    popularTags: ["outstation", "wedding"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "Tata's bold SUV with a commanding road presence. The Harrier delivers a premium experience with its muscular stance and refined cabin.",
  },

  // ── MUV ──
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    category: "muv",
    image: images.ertiga,
    seating: 7,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "209L",
    pricePerKm: 14,
    startingPrice: 1999,
    rating: 4.3,
    reviewCount: 3210,
    popularTags: ["family-trip", "outstation", "airport-transfer"],
    isFeatured: false,
    isMostBooked: true,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "India's favourite family MUV. The Ertiga seats 7 comfortably with flexible seating and legendary Maruti reliability.",
  },
  {
    id: "rumion",
    name: "Toyota Rumion",
    category: "muv",
    image: images.rumion,
    seating: 7,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "214L",
    pricePerKm: 15,
    startingPrice: 2199,
    rating: 4.4,
    reviewCount: 1120,
    popularTags: ["family-trip", "outstation"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: false,
    description:
      "Toyota's trusted MUV with a spacious 7-seater cabin. Built for Indian roads with Toyota's legendary dependability.",
  },
  {
    id: "carens",
    name: "Kia Carens",
    category: "muv",
    image: images.carens,
    seating: 7,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "256L",
    pricePerKm: 16,
    startingPrice: 2399,
    rating: 4.5,
    reviewCount: 1587,
    popularTags: ["family-trip", "wedding"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: false,
    isPremiumChoice: true,
    description:
      "Kia's stylish 7-seater with premium features and a refined diesel automatic. The perfect blend of space and luxury.",
  },

  // ── Luxury ──
  {
    id: "fortuner",
    name: "Toyota Fortuner",
    category: "luxury",
    image: images.fortuner,
    seating: 7,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "480L",
    pricePerKm: 35,
    startingPrice: 7999,
    rating: 4.7,
    reviewCount: 2345,
    popularTags: ["wedding", "outstation", "airport-transfer"],
    isFeatured: true,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: true,
    description:
      "The undisputed king of Indian roads. The Fortuner commands respect with its imposing stance, bulletproof reliability, and unmatched road presence.",
  },
  {
    id: "bmw-5",
    name: "BMW 5 Series",
    category: "luxury",
    image: images.bmw,
    seating: 5,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "530L",
    pricePerKm: 40,
    startingPrice: 11999,
    rating: 4.8,
    reviewCount: 876,
    popularTags: ["corporate", "wedding", "airport-transfer"],
    isFeatured: true,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: true,
    description:
      "Experience the ultimate driving machine. The BMW 5 Series offers unparalleled luxury, performance, and prestige for discerning travellers.",
  },
  {
    id: "mercedes-e",
    name: "Mercedes E Class",
    category: "luxury",
    image: images.mercedes,
    seating: 5,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "540L",
    pricePerKm: 42,
    startingPrice: 12999,
    rating: 4.8,
    reviewCount: 654,
    popularTags: ["corporate", "wedding", "airport-transfer"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: true,
    description:
      "The epitome of automotive luxury. The Mercedes E-Class wraps you in handcrafted elegance with every journey feeling first-class.",
  },

  // ── Tempo Traveller ──
  {
    id: "tempo-12",
    name: "Force Tempo Traveller 12 Seater",
    category: "tempo-traveller",
    image: images.tempo12,
    seating: 12,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "800L",
    pricePerKm: 22,
    startingPrice: 3999,
    rating: 4.2,
    reviewCount: 1234,
    popularTags: ["outstation", "family-trip"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "Perfect for group outings and family trips. The 12-seater offers comfortable seating with generous luggage space for long journeys.",
  },
  {
    id: "tempo-17",
    name: "Force Tempo Traveller 17 Seater",
    category: "tempo-traveller",
    image: images.tempo17,
    seating: 17,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "1200L",
    pricePerKm: 25,
    startingPrice: 4999,
    rating: 4.1,
    reviewCount: 987,
    popularTags: ["outstation", "family-trip"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: false,
    isPremiumChoice: false,
    description:
      "Ideal for large groups and corporate outings. The 17-seater provides ample room for everyone with reliable performance on all roads.",
  },
  {
    id: "maharaja-tempo",
    name: "Maharaja Tempo Traveller",
    category: "tempo-traveller",
    image: images.maharaja,
    seating: 12,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "900L",
    pricePerKm: 28,
    startingPrice: 5499,
    rating: 4.3,
    reviewCount: 756,
    popularTags: ["wedding", "outstation"],
    isFeatured: false,
    isMostBooked: false,
    isBestRated: true,
    isPremiumChoice: false,
    description:
      "The premium tempo traveller with superior comfort and elegant interiors. Popular for weddings and special occasions.",
  },
];

export const categoryLabels: Record<string, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  suv: "SUV",
  muv: "MUV",
  luxury: "Luxury",
  "tempo-traveller": "Tempo Traveller",
};

export const categoryIcons: Record<string, string> = {
  hatchback: "🚗",
  sedan: "🚙",
  suv: "🚘",
  muv: "🚐",
  luxury: "🏎️",
  "tempo-traveller": "🚌",
};

export const fuelLabels: Record<string, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  cng: "CNG",
  ev: "EV",
};

export const tagLabels: Record<string, string> = {
  "airport-transfer": "Airport Transfer",
  outstation: "Outstation",
  "local-rental": "Local Rental",
  wedding: "Wedding",
  corporate: "Corporate",
  "family-trip": "Family Trip",
};

export const allTags: Array<{ id: string; label: string }> = [
  { id: "airport-transfer", label: "Airport Transfer" },
  { id: "outstation", label: "Outstation" },
  { id: "local-rental", label: "Local Rental" },
  { id: "wedding", label: "Wedding" },
  { id: "corporate", label: "Corporate" },
  { id: "family-trip", label: "Family Trip" },
];

export const PRICE_RANGE: [number, number] = [5, 50];

export const ITEMS_PER_PAGE = 6;

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === slug);
}

export function getRelatedVehicles(
  slug: string,
  count: number = 3
): Vehicle[] {
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return [];
  return vehicles
    .filter((v) => v.id !== slug && v.category === vehicle.category)
    .slice(0, count);
}
