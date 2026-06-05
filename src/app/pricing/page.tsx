import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Outstation Taxi Pricing - Rohit Tour & Travel",
  description:
    "Check outstation taxi rates for Rohtak. Dzire ₹11/km, Ertiga ₹13/km, Kia Carens ₹14/km, Innova Crysta ₹19/km. Toll & state taxes extra.",
};

const outstationRates = [
  {
    name: "Maruti Dzire",
    rate: 11,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG/960px-Maruti_Suzuki_Dzire_VXi_VVT_-_Subcompact_Car_-_Kolkata_2018-01-17_7574.JPG",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    ac: true,
    luggage: "378L",
    desc: "Affordable sedan for outstation trips. Great fuel efficiency and comfortable ride.",
  },
  {
    name: "Maruti Ertiga",
    rate: 13,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2022_Suzuki_Ertiga_GL.jpg/960px-2022_Suzuki_Ertiga_GL.jpg",
    seats: 7,
    fuel: "Petrol",
    transmission: "Manual",
    ac: true,
    luggage: "209L",
    desc: "Spacious 7-seater MUV ideal for family outstation travel.",
  },
  {
    name: "Kia Carens",
    rate: 14,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/2017_Kia_Carens_1_ISG_1.6_Front.jpg/960px-2017_Kia_Carens_1_ISG_1.6_Front.jpg",
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    ac: true,
    luggage: "256L",
    desc: "Premium 7-seater with automatic transmission for a luxurious outstation experience.",
  },
  {
    name: "Toyota Innova Crysta",
    rate: 19,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Toyota_Innova_Crysta_2.4_Z_front_right.jpg/960px-Toyota_Innova_Crysta_2.4_Z_front_right.jpg",
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    ac: true,
    luggage: "480L",
    desc: "The ultimate outstation vehicle. Unmatched comfort, legroom, and reliability.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ───────── Hero ───────── */}
        <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-28 overflow-hidden bg-secondary">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary/30 to-secondary/60" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-bold mb-8">
              <Link href="/" className="text-body hover:text-primary transition-colors">Home</Link>
              <span className="text-primary/60">/</span>
              <span className="text-white">Pricing</span>
            </nav>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic leading-[0.9] mb-6 pr-1">
              Transparent{" "}
              <span className="text-gradient-primary">Pricing</span>{" "}
              for Every Trip
            </h1>

            <p className="text-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              No hidden charges. No surprises. Pay only what you see — clear
              outstation rates for every vehicle in our fleet.
            </p>
          </div>
        </section>

        {/* ───────── Outstation Taxi Pricing ───────── */}
        <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Outstation Taxi Pricing
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mt-3 pr-1">
                  Outstation{" "}
                  <span className="text-gradient-primary">Taxi</span> Rates
                </h2>
                <p className="text-body text-base md:text-lg mt-4 max-w-2xl mx-auto">
                  Best outstation taxi fares starting from Rohtak. Per kilometre
                  rates with professional drivers.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {outstationRates.map((vehicle, i) => (
                <ScrollReveal key={vehicle.name} delay={i * 0.1}>
                  <div className="group relative bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.25)] shine-effect h-full flex flex-col">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                    </div>

                    <div className="p-5 lg:p-6 flex flex-col flex-1">
                      <h3 className="text-white font-black text-lg leading-tight mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-body/70 text-xs leading-relaxed mb-4 line-clamp-2">
                        {vehicle.desc}
                      </p>

                      <div className="flex items-baseline gap-1 mb-5">
                        <span className="text-5xl lg:text-6xl font-black text-primary italic tracking-tighter">
                          {formatPrice(vehicle.rate)}
                        </span>
                        <span className="text-body text-sm font-bold">/km</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-5">
                        <MiniSpec label="Seats" value={`${vehicle.seats}`} />
                        <MiniSpec label="Fuel" value={vehicle.fuel === "Diesel" ? "Diesel" : "Petrol"} />
                        <MiniSpec label="Gear" value={vehicle.transmission === "Automatic" ? "Auto" : "Manual"} />
                        <MiniSpec label="AC" value={vehicle.ac ? "Available" : "No"} />
                        <MiniSpec label="Luggage" value={vehicle.luggage} />
                        <MiniSpec label="Driver" value="Included" />
                      </div>

                      <div className="mt-auto">
                        <Link
                          href="/contact"
                          className="block w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl text-center transition-all duration-300 shadow-glow-red hover:shadow-glow-red-strong"
                        >
                          Book {vehicle.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* ───────── Important Note ───────── */}
            <ScrollReveal>
              <div className="mt-12 max-w-2xl mx-auto">
                <div className="relative bg-gradient-to-b from-primary/[0.08] to-primary/[0.03] border border-primary/30 rounded-2xl p-6 lg:p-8 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,transparent_60%)]" />
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-white font-black text-lg lg:text-xl mb-2">
                      Please Note
                    </p>
                    <p className="text-body text-sm lg:text-base leading-relaxed">
                      Toll charges and State Taxes are extra and will be charged
                      separately.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────── Why Go With Us ───────── */}
        <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute inset-0 dot-pattern opacity-20" />
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
                  Why Choose{" "}
                  <span className="text-gradient-primary">Outstation</span>{" "}
                  With Us
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Experienced Drivers",
                  desc: "Professional, courteous drivers who know the routes and ensure a safe, comfortable journey.",
                },
                {
                  title: "Well Maintained Cars",
                  desc: "Every vehicle is serviced regularly and sanitised before each trip for your safety.",
                },
                {
                  title: "24/7 Support",
                  desc: "Round-the-clock customer support for any assistance during your outstation trip.",
                },
                {
                  title: "GPS Tracking",
                  desc: "Real-time vehicle tracking so your family and friends can follow your journey.",
                },
                {
                  title: "No Hidden Charges",
                  desc: "What you see is what you pay. Transparent per-kilometre pricing with no surprises.",
                },
                {
                  title: "Flexible Booking",
                  desc: "Book one-way or round trips. Customise your outstation itinerary as needed.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <div className="group relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-primary/40 rounded-2xl p-6 lg:p-8 transition-all duration-500 h-full">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-5">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-black text-base lg:text-lg mb-3">{item.title}</h3>
                    <p className="text-body/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function MiniSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-lg p-2 text-center">
      <p className="text-[9px] text-body/50 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-xs text-white font-bold mt-0.5">{value}</p>
    </div>
  );
}
