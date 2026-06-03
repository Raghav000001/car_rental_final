"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "I've been using Rohit Tour & Travel for all my Gurugram-Rohtak trips for the past 3 years. The cars are always spotless and the drivers are courteous. Truly the gold standard of car rentals in Haryana.",
    by: "Aakash Mehta, Business Traveler",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "We rented 12 luxury cars for a destination wedding in Jaipur. Rohit Tour & Travel delivered every single one on time, in pristine condition. Absolutely flawless service.",
    by: "Priya Sharma, Wedding Planner",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 2,
    testimonial: "Took a Fortuner for a 5-day Himachal road trip. Car was in perfect mechanical condition and the return process was a breeze. Already planning my next booking!",
    by: "Vikram Singh, Self-Drive Customer",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "Travelled to Manali with my family. Rohit Tour & Travel arranged a spacious Innova with a child seat — they thought of everything.",
    by: "Anita Desai, Family Traveler",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 4,
    testimonial: "Our company has a monthly contract for 8 vehicles. Zero downtime in 18 months. The dedicated account manager is a game-changer.",
    by: "Rajesh Khanna, Corporate Client",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 5,
    testimonial: "I was nervous about self-driving to Leh. Rohit Tour & Travel's team gave me a full briefing and checked in mid-trip. Felt like family.",
    by: "Sneha Kapoor, Solo Traveler",
    imgSrc: "https://i.pravatar.cc/150?img=16"
  },
  {
    tempId: 6,
    testimonial: "Subscribed to the monthly plan for a Swift Dzire. Saves me 40% compared to daily rentals. Brilliant model.",
    by: "Manoj Yadav, Monthly Subscriber",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 7,
    testimonial: "Booked a 4 AM airport transfer. Driver was at my door 10 minutes early, helped with luggage. Premium experience, every time.",
    by: "Harsh Aggarwal, Delhi Traveler",
    imgSrc: "https://i.pravatar.cc/150?img=33"
  },
  {
    tempId: 8,
    testimonial: "As a woman traveling solo, safety is non-negotiable. Their GPS tracking, verified drivers, and 24/7 support make me feel safe and cared for.",
    by: "Divya Reddy, Solo Traveler",
    imgSrc: "https://i.pravatar.cc/150?img=44"
  },
  {
    tempId: 9,
    testimonial: "Took an SUV for a family trip to Manali. The vehicle was pristine, spacious, and the chauffeur was incredibly courteous. Highly recommended!",
    by: "Karan Joshi, Family Vacationer",
    imgSrc: "https://i.pravatar.cc/150?img=60"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-primary text-white border-2 border-primary"
          : "z-0 bg-bg-light/50 text-heading border-2 border-white/10 hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(220,38,38,0.4)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          backgroundColor: isCenter ? '#dc2626' : 'rgba(255,255,255,0.1)'
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{
          boxShadow: isCenter ? "3px 3px 0px rgba(255,255,255,0.3)" : "3px 3px 0px rgba(220,38,38,0.3)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium leading-relaxed",
        isCenter ? "text-white" : "text-heading"
      )}>
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-white/80" : "text-body"
      )}>
        &mdash; {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-bg-dark"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors cursor-pointer",
            "bg-bg-dark border-2 border-white/10 hover:bg-primary hover:text-white hover:border-primary",
            "focus-visible:outline-none"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors cursor-pointer",
            "bg-bg-dark border-2 border-white/10 hover:bg-primary hover:text-white hover:border-primary",
            "focus-visible:outline-none"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
