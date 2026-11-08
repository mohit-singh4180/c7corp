"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PREMIUM_EASING, TIMINGS } from "@/lib/animations";

interface ProductMockupFloatProps {
  children: ReactNode;
  className?: string;
}

export default function ProductMockupFloat({
  children,
  className = "",
}: ProductMockupFloatProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          window.innerWidth < 768
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // Deeper tilt on hover for mockups (approx 9-10deg)
    setTilt({
      rx: -normY * 9,
      ry: normX * 9,
    });
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion || isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouch) return;
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={
          isHovered
            ? {
                y: -6,
                rotateX: tilt.rx,
                rotateY: tilt.ry,
                scale: 1.025,
                transition: { duration: 0.15, ease: "easeOut" },
              }
            : {
                y: [-3, 3, -3],
                rotateZ: [-0.35, 0.35, -0.35],
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                transition: {
                  y: {
                    repeat: Infinity,
                    duration: TIMINGS.bobDuration,
                    ease: "easeInOut",
                  },
                  rotateZ: {
                    repeat: Infinity,
                    duration: TIMINGS.bobDuration * 1.2,
                    ease: "easeInOut",
                  },
                  scale: { duration: 0.5, ease: PREMIUM_EASING },
                  rotateX: { duration: 0.5, ease: PREMIUM_EASING },
                  rotateY: { duration: 0.5, ease: PREMIUM_EASING },
                },
              }
        }
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

