"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Car,
  Map,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
}

const defaultEntries: TimeLine_01Entry[] = [
  {
    icon: Car,
    title: "Founded in Rohtak",
    subtitle: "2012 • The Beginning",
    description:
      "Rohit Tour & Travel started as a humble two-car operation in Sector 14, Rohtak. A single vehicle, a bold dream, and an unwavering commitment to honest service — that's all it took to set the wheels in motion.",
    items: [
      "Began operations with 2 premium sedans",
      "Served the Rohtak local commute market",
      "Built first 50 loyal customer relationships",
      "Introduced transparent pricing with no hidden charges",
      "100% on-time delivery guarantee established",
    ],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    button: {
      url: "/about",
      text: "Read Our Story",
    },
  },
  {
    icon: Map,
    title: "Haryana Expansion",
    subtitle: "2016 • Regional Growth",
    description:
      "Word spread quickly. Within four years, Rohit Tour & Travel expanded across Haryana, opening branches in Gurugram, Panchkula, and Karnal — becoming the region's most trusted car rental brand.",
    items: [
      "Expanded fleet to 150+ vehicles across 4 branches",
      "Opened operations in Gurugram, Panchkula, and Karnal",
      "Introduced chauffeur-driven premium service",
      "Partnerships with 20+ corporate clients",
      "Launched 24/7 customer support helpline",
    ],
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
  },
  {
    icon: Award,
    title: "Premium Fleet Upgrade",
    subtitle: "2020 • Fleet Modernization",
    description:
      "We made a bold investment in our fleet — upgrading to over 800+ premium vehicles. From luxury sedans to high-performance SUVs, every car now maintained to factory-fresh standards in our own service center.",
    items: [
      "Fleet expanded to 800+ premium vehicles",
      "Added luxury sedans, SUVs, and MUVs to inventory",
      "In-house service center with certified mechanics",
      "Contactless pickup and return process launched",
      "COVID-safe sanitization protocols implemented",
    ],
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
  },
  {
    icon: TrendingUp,
    title: "32+ Cities & Beyond",
    subtitle: "2025 • Pan-North India Leader",
    description:
      "Today, Rohit Tour & Travel serves 32+ cities across North India with 850+ vehicles. From self-drive to chauffeur-driven, we lead the premium car rental market with unmatched service quality.",
    items: [
      "Operations across 32+ cities in North India",
      "850+ vehicles in active rotation",
      "90%+ customer repeat rate",
      "Featured as Top Car Rental in Haryana 2024",
      "Planning expansion into Rajasthan & Uttarakhand",
    ],
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80",
    button: {
      url: "/fleet",
      text: "Explore Our Fleet",
    },
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function TimeLine_01({
  title = "Our Journey",
  description = "From a two-car garage in Rohtak to North India's most trusted premium car rental brand — driven by passion, built on trust.",
  entries = defaultEntries,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/30 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our Journey
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[0.95] pr-1">
            {title}
          </h1>
          <p className="text-body text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => {
            const Icon = entry.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                aria-current={isActive ? "true" : "false"}
              >
                <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-white/[0.04] text-body"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-heading">
                        {entry.title}
                      </span>
                      <span className="text-xs text-body">
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                <article
                  className={`flex flex-col rounded-2xl border p-3 transition-all duration-300 ${
                    isActive
                      ? "border-primary/40 bg-bg-dark shadow-glow-red"
                      : "border-white/10 bg-bg-dark"
                  }`}
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title}`}
                      className="mb-4 w-full h-72 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h2
                        className={`text-md font-medium leading-tight tracking-tight md:text-lg transition-colors duration-200 pr-1 ${
                          isActive ? "text-heading" : "text-heading/70"
                        }`}
                      >
                        {entry.title}
                      </h2>

                      <p
                        className={`text-xs leading-relaxed md:text-sm transition-all duration-300 ${
                          isActive
                            ? "text-body line-clamp-none"
                            : "text-body/80 line-clamp-2"
                        }`}
                      >
                        {entry.description}
                      </p>
                    </div>

                    <div
                      aria-hidden={!isActive}
                      className={`grid transition-all duration-500 ease-out ${
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-lg border border-white/10 bg-secondary p-4">
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2 text-sm text-body"
                                  >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                                    <span className="leading-relaxed">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                size="sm"
                                className="group font-normal transition-all duration-200"
                                asChild
                              >
                                <a
                                  href={entry.button.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {entry.button.text}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
