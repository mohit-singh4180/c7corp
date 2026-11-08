"use client";

import { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  TILT_CONFIG,
  PREMIUM_EASING,
  TIMINGS,
  VIEWPORT_CONFIG,
} from "@/lib/animations";

interface Card3DTiltProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  enableHoverTilt?: boolean;
}

export default function Card3DTilt({
  children,
  delay = 0,
  className = "",
  style,
  enableHoverTilt = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Detect touch devices
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          window.innerWidth < 768
      );
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isTouchDevice || !enableHoverTilt || !cardRef.current) return;
    if (rafRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const normX = (x / rect.width - 0.5) * 2; // -1 to 1
      const normY = (y / rect.height - 0.5) * 2; // -1 to 1

      const rx = -normY * TILT_CONFIG.maxAngle;
      const ry = normX * TILT_CONFIG.maxAngle;

      setTilt({ rx, ry });
      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.14,
      });
    });
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion || isTouchDevice || !enableHoverTilt) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || isTouchDevice || !enableHoverTilt) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        perspective: `${TILT_CONFIG.perspective}px`,
        transformStyle: "preserve-3d",
      }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        initial={{
          opacity: 0,
          y: 40,
          rotateX: TILT_CONFIG.scrollInRotateX,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
        }}
        viewport={VIEWPORT_CONFIG}
        transition={{
          duration: TIMINGS.cardTiltScroll,
          delay,
          ease: PREMIUM_EASING,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative ${className}`}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale3d(${TILT_CONFIG.scaleOnHover}, ${TILT_CONFIG.scaleOnHover}, 1)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.25s ease-out"
            : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: isHovered
            ? `${-tilt.ry * 1.5}px ${tilt.rx * 1.5 + 16}px 32px rgba(16, 20, 42, 0.12), 0 4px 12px rgba(16, 20, 42, 0.06)`
            : undefined,
          ...style,
        }}
      >
        {children}

        {/* Pure CSS glare highlight overlay on hover */}
        {!isTouchDevice && enableHoverTilt && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-20"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
}

