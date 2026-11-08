"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingOrbsProps {
  /** Color theme: 'violet' | 'coral' | 'gold' */
  theme?: "violet" | "coral" | "gold";
  /** Number of orbs (default: 3) */
  count?: number;
  className?: string;
}

const THEMES = {
  violet: [
    "rgba(123, 63, 160, 0.08)",
    "rgba(123, 63, 160, 0.05)",
    "rgba(158, 78, 140, 0.06)",
  ],
  coral: [
    "rgba(255, 122, 89, 0.07)",
    "rgba(255, 122, 89, 0.04)",
    "rgba(237, 113, 97, 0.06)",
  ],
  gold: [
    "rgba(254, 208, 120, 0.1)",
    "rgba(255, 179, 71, 0.06)",
    "rgba(254, 208, 120, 0.07)",
  ],
};

const ORB_CONFIGS = [
  { size: "280px", x: "10%", y: "15%", duration: 18, delay: 0 },
  { size: "200px", x: "70%", y: "60%", duration: 22, delay: 2 },
  { size: "150px", x: "85%", y: "10%", duration: 15, delay: 4 },
  { size: "180px", x: "30%", y: "75%", duration: 20, delay: 1 },
  { size: "120px", x: "55%", y: "30%", duration: 16, delay: 3 },
];

/**
 * FloatingOrbs — Decorative animated gradient orbs for section backgrounds.
 * CSS-based animations with Framer Motion for smooth, GPU-accelerated motion.
 */
export default function FloatingOrbs({
  theme = "violet",
  count = 3,
  className = "",
}: FloatingOrbsProps) {
  const shouldReduceMotion = useReducedMotion();
  const colors = THEMES[theme];
  const orbCount = Math.min(count, ORB_CONFIGS.length);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: orbCount }).map((_, i) => {
        const config = ORB_CONFIGS[i];
        const color = colors[i % colors.length];

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: config.size,
              height: config.size,
              left: config.x,
              top: config.y,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, 30, -20, 10, 0],
                    y: [0, -20, 15, -10, 0],
                    scale: [1, 1.15, 0.95, 1.1, 1],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: config.duration,
                    delay: config.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        );
      })}
    </div>
  );
}
