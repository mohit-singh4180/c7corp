"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  viewportMargin?: string;
  className?: string;
}

/**
 * FadeIn — fade-in-up animation triggered on viewport entry.
 * Respects prefers-reduced-motion via Framer Motion.
 */
export default function FadeIn({
  children,
  delay = 0,
  yOffset = 24,
  viewportMargin = "-60px",
  className = "",
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
