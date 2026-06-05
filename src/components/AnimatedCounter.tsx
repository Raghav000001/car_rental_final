"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  /** Target number to count up to */
  to: number;
  /** Duration in seconds (default: 2) */
  duration?: number;
  /** CSS classes for the number */
  className?: string;
  /** Optional prefix (e.g. "+", "$") */
  prefix?: string;
  /** Optional suffix (e.g. "+", "K", "%") */
  suffix?: string;
}

/**
 * Counts up from 0 to `to` when scrolled into view.
 * Falls back to showing the target number immediately
 * when user prefers reduced motion.
 */
export default function AnimatedCounter({
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null!);
  const isInView = useInView(ref, { margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(() => (prefersReducedMotion ? to : 0));
  const rafRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView) {
      startedRef.current = false;
      return;
    }
    if (startedRef.current || prefersReducedMotion) return;
    startedRef.current = true;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, to, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
