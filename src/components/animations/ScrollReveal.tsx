"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { fadeUpVariants, VIEWPORT_CONFIG } from "@/lib/animations";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * ScrollReveal — fades in and slides up (default 40px) once when 20%
 * enters the viewport. Respects prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  ...props
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={fadeUpVariants}
      custom={delay}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

