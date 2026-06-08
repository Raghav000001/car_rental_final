import Image from "next/image";
import Link from "next/link";
import { StaggerItem } from "@/components/ScrollReveal";

const carTypes = [
  { label: "Sedan", image: "https://images.unsplash.com/photo-1665206220348-0f5d49b5b8b5?w=400&q=80", count: 32 },
  { label: "Hatchback", image: "https://images.unsplash.com/photo-1647242008102-81d25ba13aba?w=400&q=80", count: 24 },
  { label: "SUV", image: "https://images.unsplash.com/photo-1670054953044-2605dbd0d747?w=400&q=80", count: 28 },
  { label: "MPV", image: "https://images.unsplash.com/photo-1748215210950-536c6621629a?w=400&q=80", count: 15 },
  { label: "Compact SUV", image: "https://images.unsplash.com/photo-1708589413831-8c24638bc0db?w=400&q=80", count: 20 },
  { label: "Electric", image: "https://images.unsplash.com/photo-1748215041497-fdf9c4727681?w=400&q=80", count: 12 },
];

export default function CarTypes() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-linear-to-b from-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary text-sm font-black uppercase tracking-[0.3em]">
                Categories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
              Explore Car <span className="text-gradient-primary">Types</span>
            </h2>
            <p className="text-body mt-4 max-w-md font-medium">
              Choose from our diverse fleet, tailored to fit every journey and lifestyle.
            </p>
          </div>
          <Link
            href="/fleet"
            className="group inline-flex items-center gap-2 font-black text-white hover:text-primary transition-colors uppercase tracking-widest text-sm self-start md:self-end"
          >
            <span>View All Types</span>
            <span className="w-10 h-10 rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg]">
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-6 lg:gap-8">
          {carTypes.map((type) => (
            <StaggerItem key={type.label} direction="scale">
              {/* 
                KEY FIX: Do NOT use flex on the card wrapper — it breaks aspect-square.
                text-center handles label alignment. The circle is block-level and fills
                the grid cell width naturally via w-full on the relative container.
              */}
              <div className="group cursor-pointer text-center">

                {/* Circle wrapper — explicit w-full so aspect-square has a reference width */}
                <div className="relative w-full mb-3 sm:mb-5">
                  {/* Glow — desktop only to save mobile GPU */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />

                  {/* The circle itself */}
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-white/10 md:transition-all md:duration-500 md:group-hover:border-primary md:group-hover:rotate-6 md:group-hover:shadow-glow-red shadow-lg">
                    <Image
                      src={type.image}
                      alt={type.label}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 160px"
                      className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-transparent opacity-60 md:group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Count badge — always visible on mobile, hover-only on md+ */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary text-white flex flex-col items-center justify-center shadow-lg z-10 border border-white/20 sm:border-2 scale-100 md:scale-0 md:group-hover:scale-100 transition-transform duration-500">
                      <span className="text-[10px] sm:text-[13px] font-black leading-none">{type.count}</span>
                      <span className="text-[5px] sm:text-[6px] font-black uppercase tracking-tighter leading-none mt-0.5">Models</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-full ring-1 ring-primary/0 md:group-hover:ring-primary/30 md:group-hover:ring-4 transition-all duration-500" />
                </div>

                {/* Label — no tracking on mobile so "Compact SUV" stays 1 line */}
                <h3 className="text-[11px] sm:text-[13px] lg:text-[15px] font-black text-white uppercase tracking-tight sm:tracking-[0.15em] lg:tracking-[0.25em] md:group-hover:text-primary transition-all duration-300 leading-tight whitespace-nowrap">
                  {type.label}
                </h3>

                {/* Vehicle count — always visible on mobile, animated on md+ */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-3 overflow-hidden">
                  <span className="w-4 h-0.5 bg-primary md:w-0 md:group-hover:w-6 transition-all duration-500" />
                  <p className="text-[9px] sm:text-[11px] font-black text-body uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                    {type.count} Vehicles
                  </p>
                  <span className="w-4 h-0.5 bg-primary md:w-0 md:group-hover:w-6 transition-all duration-500" />
                </div>

              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}