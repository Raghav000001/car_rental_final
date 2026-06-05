import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  Users,
  Fuel,
  Thermometer,
  Luggage,
  Star,
  Gauge,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import ScrollReveal from "@/components/ScrollReveal";
import {
  vehicles,
  serviceTypeLabels,
  fuelLabels,
  getVehicleBySlug,
  getRelatedVehicles,
} from "@/app/fleet/vehicleData";
import type { Vehicle } from "@/app/fleet/types";
import { formatPrice } from "@/lib/utils";
import BookVehicleButton from "@/components/BookVehicleButton";

export async function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found - Rohit Tour & Travel" };

  return {
    title: `${vehicle.name} - Rohit Tour & Travel Fleet`,
    description: vehicle.description,
  };
}

const specsConfig: Array<{
  label: string;
  getValue: (v: Vehicle) => string;
  icon: React.ReactNode;
}> = [
  {
    label: "Seating",
    getValue: (v) => `${v.seating} Seats`,
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Fuel",
    getValue: (v) => fuelLabels[v.fuel] || v.fuel,
    icon: <Fuel className="w-4 h-4" />,
  },
  {
    label: "Transmission",
    getValue: (v) =>
      v.transmission === "automatic" ? "Automatic" : "Manual",
    icon: <Gauge className="w-4 h-4" />,
  },
  {
    label: "AC",
    getValue: (v) => (v.ac === "ac" ? "Available" : "Not Available"),
    icon: <Thermometer className="w-4 h-4" />,
  },
  {
    label: "Luggage",
    getValue: (v) => v.luggage,
    icon: <Luggage className="w-4 h-4" />,
  },
  {
    label: "Rating",
    getValue: (v) => `${v.rating} / 5.0`,
    icon: <Star className="w-4 h-4" />,
  },
];

const categoryBadgeColor: Record<string, string> = {
  "self-drive": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "airport-drop": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "local-rental": "bg-green-500/20 text-green-400 border-green-500/30",
};

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = getRelatedVehicles(slug, 3);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-36 pb-12 lg:pt-44 lg:pb-16 overflow-hidden bg-secondary">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-bg-dark" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 text-body hover:text-primary text-sm font-bold transition-colors duration-300 mb-8"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Fleet
              </Link>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <ScrollReveal>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-premium">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                        categoryBadgeColor[vehicle.serviceType] ||
                        "bg-white/10 text-white border-white/20"
                      }`}
                    >
                      {serviceTypeLabels[vehicle.serviceType] || vehicle.serviceType}
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                    {vehicle.name}
                  </h1>
                </ScrollReveal>

                <ScrollReveal>
                  <p className="text-body text-base md:text-lg leading-relaxed max-w-xl">
                    {vehicle.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="flex flex-wrap items-end gap-6">
                    <div>
                      <p className="text-[10px] text-body/60 font-bold uppercase tracking-[0.15em] mb-1">
                        {vehicle.serviceType === "self-drive" ? "Rent for" : "Flat Rate"}
                      </p>
                      <p className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                        {formatPrice(vehicle.price)}
                      </p>
                    </div>
                    <div className="pb-1">
                      <p className="text-[10px] text-body/60 font-bold uppercase tracking-[0.15em] mb-0.5">
                        {vehicle.priceLabel}
                      </p>
                      <p className="text-2xl md:text-3xl font-black text-primary italic">
                        {vehicle.serviceType === "self-drive" ? "Self Drive" : "With Driver"}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(vehicle.rating)
                              ? "text-star fill-star"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-bold text-sm">
                      {vehicle.rating}
                    </span>
                    <span className="text-body/50 text-xs">
                      ({vehicle.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <BookVehicleButton vehicleId={vehicle.id} />
                    <a
                      href="https://wa.me/918708765123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/20 hover:border-primary text-body hover:text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Inquiry
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="relative -mt-10 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <ScrollReveal>
              <div className="glass rounded-2xl p-6 md:p-8">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                  {specsConfig.map((spec) => {
                    const value = spec.getValue(vehicle);
                    return (
                      <div
                        key={spec.label}
                        className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          {spec.icon}
                        </div>
                        <div>
                          <p className="text-[9px] text-body/50 font-bold uppercase tracking-[0.12em] mb-0.5">
                            {spec.label}
                          </p>
                          <p className="text-sm text-white font-bold">
                            {value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative pb-16 lg:pb-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="lg:col-span-2 space-y-8">
                <ScrollReveal>
                  <div className="glass rounded-3xl p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-8">
                      Pricing{" "}
                      <span className="text-gradient-primary">Details</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <PricingCard
                        label={vehicle.serviceType === "self-drive" ? "Daily Rate" : "Flat Price"}
                        value={formatPrice(vehicle.price)}
                        note={vehicle.priceLabel}
                      />
                      <PricingCard
                        label={vehicle.serviceType === "self-drive" ? "Rental Type" : "Service Type"}
                        value={vehicle.serviceType === "self-drive" ? "Self Drive" : "With Driver"}
                        note={vehicle.serviceType === "self-drive" ? "No driver needed" : "Professional driver included"}
                      />
                      <PricingCard
                        label="Seating Capacity"
                        value={`${vehicle.seating} Persons`}
                        note="Comfortable seating"
                      />
                      <PricingCard
                        label="Luggage Space"
                        value={vehicle.luggage}
                        note="Sufficient for luggage"
                      />
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-[11px] text-body/60 font-bold uppercase tracking-[0.12em] mb-1">
                        What&apos;s Included
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          "Clean & sanitized vehicle",
                          vehicle.serviceType !== "self-drive" ? "Professional driver" : "Self-drive pickup",
                          vehicle.serviceType === "self-drive" ? "Fuel not included" : "Fuel charges included",
                          "24/7 roadside assistance",
                          "GST included",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-body"
                          >
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className="space-y-6">
                <ScrollReveal>
                  <div className="glass rounded-3xl p-6 md:p-8 sticky top-28">
                    <h3 className="text-lg font-black text-white tracking-tight mb-6">
                      Quick Summary
                    </h3>
                    <div className="space-y-4">
                      {specsConfig.map((spec) => {
                        const value = spec.getValue(vehicle);
                        return (
                          <div
                            key={spec.label}
                            className="flex items-center justify-between pb-3 border-b border-white/5 last:border-0 last:pb-0"
                          >
                            <span className="flex items-center gap-2 text-xs text-body/60 font-bold uppercase tracking-wider">
                              {spec.icon}
                              {spec.label}
                            </span>
                            <span className="text-sm text-white font-bold">
                              {value}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <BookVehicleButton vehicleId={vehicle.id} />
                      <p className="text-center text-[10px] text-body/40 mt-2 font-bold uppercase tracking-wider">
                        Or call{" "}
                        <span className="text-primary">+91 87087 65123</span>
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="relative pb-16 lg:pb-24">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      Similar{" "}
                      <span className="text-gradient-primary">Vehicles</span>
                    </h2>
                    <p className="text-body text-sm mt-1">
                      More{" "}
                      {serviceTypeLabels[vehicle.serviceType] || vehicle.serviceType}{" "}
                      options
                    </p>
                  </div>
                  <Link
                    href="/fleet"
                    className="hidden sm:inline-flex items-center gap-2 text-primary text-sm font-bold hover:text-white transition-colors duration-300"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {related.map((rel, i) => (
                  <Link href={`/fleet/${rel.id}`} key={rel.id}>
                    <ScrollReveal delay={i * 0.1}>
                      <article className="group glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={rel.image}
                            alt={rel.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                            <div>
                              <p className="text-white font-black text-lg leading-tight">
                                {rel.name}
                              </p>
                              <p className="text-[10px] text-body/70 font-bold uppercase tracking-wider mt-0.5">
                                {serviceTypeLabels[rel.serviceType]}
                              </p>
                            </div>
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-[9px] font-bold uppercase tracking-wider">
                              <Star className="w-3 h-3 text-star" />
                              {rel.rating}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs text-body/60 font-bold uppercase tracking-wider">
                              {rel.serviceType === "self-drive" ? "Rent for" : "Flat Rate"}
                            </p>
                            <p className="text-lg font-black text-primary italic">
                              {formatPrice(rel.price)}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 mt-auto">
                            <MiniSpec label="Seats" value={`${rel.seating}`} />
                            <MiniSpec
                              label="Fuel"
                              value={
                                fuelLabels[rel.fuel] || rel.fuel
                              }
                            />
                            <MiniSpec
                              label="Gear"
                              value={
                                rel.transmission === "automatic"
                                  ? "Auto"
                                  : "Manual"
                              }
                            />
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Newsletter
          title="Special Fleet Offers"
          subtitle="Subscribe to receive exclusive deals on our premium vehicles and special discounts on long-term rentals."
          benefitLabel="Fleet Deals"
        />
      </main>
      <Footer />
    </>
  );
}

function PricingCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
      <p className="text-[10px] text-body/50 font-bold uppercase tracking-[0.12em] mb-1">
        {label}
      </p>
      <p className="text-xl md:text-2xl font-black text-white tracking-tight">
        {value}
      </p>
      <p className="text-[11px] text-body/40 mt-1">{note}</p>
    </div>
  );
}

function MiniSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-1.5 text-center">
      <p className="text-[8px] text-body/50 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-[11px] text-white font-bold">{value}</p>
    </div>
  );
}
