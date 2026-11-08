"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { PREMIUM_EASING, VIEWPORT_CONFIG } from "@/lib/animations";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * SectionTransition — softly fades in and smooths the transition between sections
 * on scroll without changing backgrounds or layout heights.
 */
export default function SectionTransition({
  children,
  className = "",
  id,
}: SectionTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0.88, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 0.85,
        ease: PREMIUM_EASING,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

