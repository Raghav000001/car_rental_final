"use client"

import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"

const JOURNEY_MILESTONES = [
  {
    year: "2012",
    title: "Founded in Rohtak",
    subtitle: "The Beginning",
    description:
      "Rohit Tour & Travel started as a humble two-car operation in Sector 14, Rohtak. A single vehicle, a bold dream, and an unwavering commitment to honest service — that's all it took to set the wheels in motion.",
  },
  {
    year: "2016",
    title: "Haryana Expansion",
    subtitle: "Regional Growth",
    description:
      "Word spread quickly. Within four years, Rohit Tour & Travel expanded across Haryana, opening branches in Gurugram, Panchkula, and Karnal — becoming the region's most trusted car rental brand.",
  },
  {
    year: "2020",
    title: "Premium Fleet Upgrade",
    subtitle: "Fleet Modernization",
    description:
      "We made a bold investment in our fleet — upgrading to over 800+ premium vehicles. From luxury sedans to high-performance SUVs, every car now maintained to factory-fresh standards in our own service center.",
  },
  {
    year: "2025",
    title: "32+ Cities & Beyond",
    subtitle: "Pan-North India Leader",
    description:
      "Today, Rohit Tour & Travel serves 32+ cities across North India with 850+ vehicles. From self-drive to chauffeur-driven, we lead the premium car rental market with unmatched service quality.",
  },
];

export default function JourneySection() {
  return (
    <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12">
          {/* Left column — sticky intro */}
          <div className="left-0 top-0 md:sticky md:h-svh md:py-12 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-5 w-fit">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] mb-6">
              From{" "}
              <span className="text-gradient-primary">Two Cars</span>{" "}
              to North India&apos;s Finest Fleet
            </h2>
            <p className="text-body text-sm md:text-base leading-relaxed max-w-prose">
              From a two-car garage in Rohtak to North India&apos;s most trusted premium car rental brand — driven by passion, built on trust.
            </p>
          </div>

          {/* Right column — sticky cards */}
          <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
            {JOURNEY_MILESTONES.map((milestone, index) => (
              <CardSticky
                key={milestone.year}
                index={index + 2}
                incrementY={24}
                incrementZ={8}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 lg:p-8 shadow-md backdrop-blur-md hover:border-primary/40 transition-colors duration-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.15em] uppercase text-primary/80 bg-primary/10 border border-primary/20 mb-3">
                      {milestone.year} &middot; {milestone.subtitle}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tighter italic leading-[0.95]">
                      {milestone.title}
                    </h3>
                  </div>
                  <span className="text-5xl lg:text-6xl font-black italic text-primary/20 tracking-tighter leading-none shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-body/80 text-sm leading-relaxed mt-5">
                  {milestone.description}
                </p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
