import type { Vehicle, LocalRentalPackage } from "./types";

// All image URLs verified to return HTTP 200
const images = {
  swift:
    "https://images.unsplash.com/photo-1663852397535-18292e115327?w=800&q=80",
  baleno:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view_02.jpg/960px-2022_Maruti_Suzuki_Baleno_Alpha_%28India%29_front_view_02.jpg",
  scorpio:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mahindra_Scorpio_GLX_2.6_m-Hawk_2011_%2836756517492%29.jpg/960px-Mahindra_Scorpio_GLX_2.6_m-Hawk_2011_%2836756517492%29.jpg",
  thar:
    "https://images.unsplash.com/photo-1710225427267-d21102737ad1?w=800&q=80",
  dzire:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG/960px-Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG",
  ertiga:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2022_Suzuki_Ertiga_GL.jpg/960px-2022_Suzuki_Ertiga_GL.jpg",
  carens:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/2017_Kia_Carens_1_ISG_1.6_Front.jpg/960px-2017_Kia_Carens_1_ISG_1.6_Front.jpg",
  innova:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_Z_front_right.jpg/960px-Toyota_Innova_Crysta_2.4_Z_front_right.jpg",
};

export const vehicles: Vehicle[] = [
  // ── Self Drive Cars ──
  {
    id: "swift",
    name: "Maruti Swift",
    serviceType: "self-drive",
    image: images.swift,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "268L",
    price: 1500,
    priceLabel: "Per Day",
    rating: 4.4,
    reviewCount: 3102,
    description:
      "India's favourite hatchback. Nimble, fuel-efficient, and perfect for self-drive adventures in and around Rohtak.",
  },
  {
    id: "baleno",
    name: "Maruti Baleno",
    serviceType: "self-drive",
    image: images.baleno,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "318L",
    price: 1500,
    priceLabel: "Per Day",
    rating: 4.5,
    reviewCount: 1956,
    description:
      "Premium hatchback with a bold design and spacious cabin. Ideal for self-drive trips with family or friends.",
  },
  {
    id: "scorpio",
    name: "Mahindra Scorpio",
    serviceType: "self-drive",
    image: images.scorpio,
    seating: 7,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "520L",
    price: 3500,
    priceLabel: "Per Day",
    rating: 4.5,
    reviewCount: 2789,
    description:
      "The legendary Mahindra Scorpio — built for tough roads and long drives. Commanding presence, powerful engine, comfortable 7-seater cabin.",
  },
  {
    id: "thar",
    name: "Mahindra Thar",
    serviceType: "self-drive",
    image: images.thar,
    seating: 4,
    fuel: "diesel",
    transmission: "manual",
    ac: "ac",
    luggage: "150L",
    price: 3500,
    priceLabel: "Per Day",
    rating: 4.6,
    reviewCount: 2104,
    description:
      "Conquer every terrain with the Mahindra Thar. Rugged, stylish, and ready for off-road adventures in and beyond Rohtak.",
  },

  // ── Airport Drop Service ──
  {
    id: "dzire",
    name: "Maruti Dzire",
    serviceType: "airport-drop",
    image: images.dzire,
    seating: 5,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "378L",
    price: 2000,
    priceLabel: "Airport Drop",
    rating: 4.4,
    reviewCount: 2678,
    description:
      "India's best-selling sedan. Comfortable, fuel-efficient, and perfect for airport transfers with generous boot space.",
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    serviceType: "airport-drop",
    image: images.ertiga,
    seating: 7,
    fuel: "petrol",
    transmission: "manual",
    ac: "ac",
    luggage: "209L",
    price: 2500,
    priceLabel: "Airport Drop",
    rating: 4.3,
    reviewCount: 3210,
    description:
      "India's favourite family MUV. Seats 7 comfortably — the ideal choice for group airport transfers.",
  },
  {
    id: "carens",
    name: "Kia Carens",
    serviceType: "airport-drop",
    image: images.carens,
    seating: 7,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "256L",
    price: 2500,
    priceLabel: "Airport Drop",
    rating: 4.5,
    reviewCount: 1587,
    description:
      "Kia's stylish 7-seater with premium features and a refined automatic transmission. Travel to the airport in comfort and style.",
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    serviceType: "airport-drop",
    image: images.innova,
    seating: 7,
    fuel: "diesel",
    transmission: "automatic",
    ac: "ac",
    luggage: "480L",
    price: 4000,
    priceLabel: "Airport Drop",
    rating: 4.7,
    reviewCount: 2345,
    description:
      "The king of MPVs. The Innova Crysta offers unmatched comfort, reliability, and legroom — the ultimate airport transfer vehicle.",
  },
];

export const localRentalPackages: LocalRentalPackage[] = [
  {
    id: "package-4hr",
    name: "Package 1",
    duration: "4 Hours",
    distance: "40 KM",
    price: 1000,
    features: [
      "Ideal for local errands",
      "Fuel included",
      "Driver included",
      "AC comfort",
    ],
  },
  {
    id: "package-8hr",
    name: "Package 2",
    duration: "8 Hours",
    distance: "80 KM",
    price: 1500,
    features: [
      "Perfect for shopping & outings",
      "Fuel included",
      "Driver included",
      "AC comfort",
    ],
  },
  {
    id: "package-12hr",
    name: "Package 3",
    duration: "12 Hours",
    distance: "120 KM",
    price: 2500,
    features: [
      "Full day coverage",
      "Fuel included",
      "Driver included",
      "AC comfort",
    ],
  },
];

export const serviceTypeLabels: Record<string, string> = {
  "self-drive": "Self Drive",
  "airport-drop": "Airport Drop",
  "local-rental": "Local Rental",
};

export const fuelLabels: Record<string, string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  cng: "CNG",
  ev: "EV",
};

// Legacy aliases for backward compatibility
export const categoryLabels = serviceTypeLabels;

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
    .filter((v) => v.id !== slug && v.serviceType === vehicle.serviceType)
    .slice(0, count);
}
