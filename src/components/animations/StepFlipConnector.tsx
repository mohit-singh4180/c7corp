"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { PREMIUM_EASING, TIMINGS, VIEWPORT_CONFIG } from "@/lib/animations";

export function StepConnectorLine({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`w-full h-full animated-gradient-line ${className}`}
        style={{
          background: "linear-gradient(90deg, var(--c-coral), var(--c-violet), var(--c-gold))",
          borderRadius: 2,
          opacity: 0.4,
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.45 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 1.1,
        delay: 0.2,
        ease: PREMIUM_EASING,
      }}
      className={`w-full h-full origin-left animated-gradient-line ${className}`}
      style={{
        background: "linear-gradient(90deg, var(--c-coral), var(--c-violet), var(--c-gold))",
        borderRadius: 2,
      }}
    />
  );
}

export function StepCircleFlip({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: "600px" }} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          rotateY: 65,
          scale: 0.82,
        }}
        whileInView={{
          opacity: 1,
          rotateY: 0,
          scale: 1,
        }}
        viewport={VIEWPORT_CONFIG}
        transition={{
          duration: TIMINGS.stepFlip,
          delay: index * 0.16 + 0.1,
          ease: PREMIUM_EASING,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

