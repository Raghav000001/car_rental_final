"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** How much slower the background moves. 0 = same speed, positive = slower, negative = faster. Default 0.3 */
  speed?: number;
  /** Offset to anchor the parallax effect (pixels) */
  offset?: number;
}

/**
 * Wraps content with a parallax-shifted inner layer.
 * The inner content moves at a different rate than the scroll,
 * creating a depth effect. Falls back to no transform when
 * user prefers reduced motion.
 */
export default function ParallaxSection({
  children,
  className,
  speed = 0.3,
  offset = 200,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [offset, -offset * speed],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
