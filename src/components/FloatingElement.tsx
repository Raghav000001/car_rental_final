"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface FloatingElementProps {
  children?: ReactNode;
  className?: string;
  /** Float distance in pixels (default: 15) */
  distance?: number;
  /** Duration of one full float cycle in seconds (default: 4) */
  duration?: number;
  /** Delay before starting (seconds) */
  delay?: number;
}

/**
 * A decorative element that gently floats up and down continuously.
 * Automatically disabled when user prefers reduced motion.
 */
export default function FloatingElement({
  children,
  className,
  distance = 15,
  duration = 4,
  delay = 0,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
