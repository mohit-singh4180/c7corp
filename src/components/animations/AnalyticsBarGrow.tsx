"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PREMIUM_EASING, TIMINGS, VIEWPORT_CONFIG } from "@/lib/animations";

interface AnalyticsBarGrowProps {
  heightPercent: number;
  index: number;
  isAccent: boolean;
}

export default function AnalyticsBarGrow({
  heightPercent,
  index,
  isAccent,
}: AnalyticsBarGrowProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className="flex-1 rounded-t-sm"
        style={{
          height: `${heightPercent}%`,
          background: isAccent ? "var(--g-accent)" : "rgba(123,63,160,0.2)",
        }}
      />
    );
  }

  return (
    <div className="flex-1 h-full flex items-end">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{
          duration: TIMINGS.barGrow,
          delay: index * 0.07 + 0.1,
          ease: PREMIUM_EASING,
        }}
        className="w-full rounded-t-sm origin-bottom"
        style={{
          height: `${heightPercent}%`,
          background: isAccent ? "var(--g-accent)" : "rgba(123,63,160,0.2)",
        }}
      />
    </div>
  );
}

