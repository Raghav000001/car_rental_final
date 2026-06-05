"use client";

import { cn } from "@/lib/utils";
import { Search, CalendarClock, Zap } from "lucide-react";
import type React from "react";

type HowItWorksProps = React.HTMLAttributes<HTMLElement>;

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 lg:p-8 transition-all duration-500",
      "hover:scale-[1.03] hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.25)]"
    )}
  >
    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
      {icon}
    </div>

    <h3 className="mb-3 text-xl lg:text-2xl font-black text-white italic tracking-tight pr-1">
      {title}
    </h3>
    <p className="mb-6 text-body/70 text-sm leading-relaxed">
      {description}
    </p>

    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 mt-0.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-body text-sm leading-relaxed">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Choose Your Vehicle",
      description:
        "Browse our premium fleet of self-drive cars, airport taxis, and local rental packages with detailed specs and transparent pricing.",
      benefits: [
        "Smart filters by type, seating & budget",
        "Real-time availability & transparent pricing",
        "Compare vehicles side-by-side",
      ],
    },
    {
      icon: <CalendarClock className="h-6 w-6" />,
      title: "Select Your Plan",
      description:
        "Pick your rental duration, pickup location, and any add-ons you need for a perfect journey.",
      benefits: [
        "Flexible hourly, daily & weekly plans",
        "Self-drive or chauffeur-driven options",
        "Free cancellation up to 24 hours",
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Book & Drive",
      description:
        "Complete your booking in seconds and hit the road with 24/7 support throughout your journey.",
      benefits: [
        "Instant confirmation & secure payment",
        "Vehicle delivery at your doorstep",
        "24/7 roadside assistance included",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn("w-full bg-bg-dark py-20 lg:py-24 relative overflow-hidden", className)}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
            Get on the Road in{" "}
            <span className="text-gradient-primary">3 Simple Steps</span>
          </h2>
          <p className="mt-4 text-body text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            From browsing our fleet to driving your dream car — we&apos;ve made
            the entire process effortless.
          </p>
        </div>

        <div className="relative mx-auto mb-10 w-full max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-px w-[66.6667%] -translate-y-1/2 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"
          />
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-10 w-10 items-center justify-center justify-self-center rounded-full bg-primary/10 border border-primary/30 font-black text-primary text-sm ring-4 ring-bg-dark"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
