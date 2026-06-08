"use client";

import Image from "next/image";

const stats = [
  { value: "12+", label: "Years of Service" },
  { value: "32+", label: "Cities Covered" },
  { value: "850+", label: "Premium Vehicles" },
  { value: "10K+", label: "Happy Customers" },
];

export default function OwnerSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/[0.08] rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 sm:w-80 sm:h-[22rem] lg:w-96 lg:h-[26rem]">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 -z-10" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/20 -z-20" />
              <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl opacity-60" />

              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/owner.jpeg"
                  alt="Rohit — Founder & CEO, Rohit Tour & Travel"
                  fill
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-contain object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary/50 -translate-y-2 translate-x-2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary/50 translate-y-2 -translate-x-2" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 glass-light px-5 py-2.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-black uppercase tracking-[0.3em]">
                Meet the Owner
              </span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>

            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-heading tracking-tighter">
                Rohit{" "}
                {/* <span className="text-gradient-primary">Sharma</span> */}
              </h2>
              <p className="text-primary font-bold text-base sm:text-lg tracking-wider uppercase">
                Founder &amp; CEO, Rohit Tour &amp; Travel
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-body text-base leading-relaxed">
                What started as a dream with just two cars in 2012 has grown into North India&apos;s most trusted premium car rental brand. Rohit Sharma founded Rohit Tour &amp; Travel with a single belief — that every journey deserves to be extraordinary.
              </p>
              <p className="text-body text-base leading-relaxed">
                Under his leadership, the company has expanded to 32+ cities with a fleet of 850+ handpicked vehicles, from economy hatchbacks to luxury SUVs. His hands-on approach and relentless focus on customer satisfaction have made Rohit Tour &amp; Travel the go-to choice for travelers across North India.
              </p>
              <p className="text-body text-base leading-relaxed">
                &ldquo;We don&apos;t just rent cars — we create experiences. Every vehicle is a promise of safety, reliability, and comfort.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-black text-primary italic">
                    {stat.value}
                  </p>
                  <p className="text-body text-xs font-semibold uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
