"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PREMIUM_EASING } from "@/lib/animations";

interface FounderAvatar3DProps {
  children: ReactNode;
  className?: string;
}

export default function FounderAvatar3D({
  children,
  className = "",
}: FounderAvatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setTilt({
      rx: -normY * 12,
      ry: normX * 12,
    });
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
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
      className={`relative inline-block cursor-pointer ${className}`}
      style={{ perspective: "600px" }}
    >
      {/* Glowing ring on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.14 : 1,
        }}
        transition={{ duration: 0.35, ease: PREMIUM_EASING }}
        className="absolute inset-[-6px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(234, 176, 74, 0.45) 0%, rgba(123, 63, 160, 0.3) 60%, transparent 80%)",
          filter: "blur(4px)",
        }}
        aria-hidden="true"
      />

      <motion.div
        animate={
          isHovered
            ? {
                rotateX: tilt.rx,
                rotateY: tilt.ry,
                scale: 1.05,
                transition: { duration: 0.12, ease: "easeOut" },
              }
            : {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                transition: { duration: 0.5, ease: PREMIUM_EASING },
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

