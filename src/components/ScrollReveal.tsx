"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  distance?: number;
  /** When true, children wrapped in <StaggerItem /> will animate in sequentially */
  stagger?: boolean;
  /** Delay between each staggered child (seconds) */
  staggerDelay?: number;
}

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

/** Wraps a single item inside a staggered ScrollReveal container */
export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 30,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}) {
  const childVariants: Record<Direction, Variants> = {
    up: { hidden: { y: distance, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down: { hidden: { y: -distance, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: -distance, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: distance, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    scale: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div className={className} variants={childVariants[direction]}>
      {children}
    </motion.div>
  );
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 60,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = prefersReducedMotion
    ? { duration: 0, delay: 0 }
    : { duration: 0.7, delay, ease: easeOut };

  const variantMap: Record<Direction, Variants> = {
    up: {
      hidden: { y: distance, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: t },
    },
    down: {
      hidden: { y: -distance, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: t },
    },
    left: {
      hidden: { x: -distance, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: t },
    },
    right: {
      hidden: { x: distance, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: t },
    },
    scale: {
      hidden: { scale: 0.85, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: t },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: t },
    },
  };

  if (stagger) {
    const parentVariant: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          delayChildren: prefersReducedMotion ? 0 : delay,
        },
      },
    };

    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-80px" }}
        variants={parentVariant}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-80px" }}
      variants={variantMap[direction]}
    >
      {children}
    </motion.div>
  );
}
