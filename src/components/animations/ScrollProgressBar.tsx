"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #ff7a59 0%, #f7ce7a 50%, #eab04a 100%)",
        boxShadow: "0 0 10px rgba(247, 206, 122, 0.7), 0 0 4px rgba(234, 176, 74, 0.9)",
      }}
      aria-hidden="true"
    />
  );
}

