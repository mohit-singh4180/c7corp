"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * AnimatedCounter — Smooth count-up animation with Framer Motion.
 * Triggers on viewport entry and counts from 0 to target.
 * Respects prefers-reduced-motion.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    /* Respect reduced-motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(target);
      return;
    }

    let startTime: number | null = null;
    const durationMs = duration * 1000;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / durationMs, 1);
      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}
