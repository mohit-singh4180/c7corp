"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { PREMIUM_EASING, VIEWPORT_CONFIG } from "@/lib/animations";

interface PreviewListItemProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export function PreviewListItem({
  children,
  index,
  className = "",
}: PreviewListItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{
        duration: 0.65,
        delay: index * 0.12 + 0.1,
        ease: PREMIUM_EASING,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

