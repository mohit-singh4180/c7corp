"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import StatsBar from "@/components/layout/StatsBar";
import HeroParticlesLoader from "@/components/three/HeroParticlesLoader";

/**
 * Hero — full viewport unified skyline & 3D celestial atmosphere:
 * 1. Seamless photorealistic skyline background (Dubai waterfront on left, Delhi on right).
 * 2. Dark glass panel overlay on left (backdrop-blur-xl, bg-slate-950/45, border-r border-y border-white/10, shadow-3xl).
 * 3. AI-first pill badge with amber & emerald status indicators + EST. 2026.
 * 4. Editorial Display Serif H1: "Innovative Solutions" / "for Modern Businesses" (radiant gold).
 * 5. Left-aligned subtitle + dual pill CTA buttons.
 * 6. Mobile responsive across all viewports.
 * 7. Inline 4-stat bar integrated into the base.
 * 8. Parallax depth layers on scroll (skyline slowest, headline normal, celestial planets faster).
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers: skyline slowest, planets slightly faster
  const yBg = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "15%"]);
  const yPlanets = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "28%"]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex flex-col w-full"
      style={{ position: "relative" }}
      aria-label="Hero section"
    >
      <div
        className="relative min-h-screen min-h-[100dvh] flex flex-col justify-between overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* Parallax Layer 1: Skyline background (moves slowest) */}
        <motion.div
          className="absolute -inset-y-[8%] inset-x-0 bg-skyline-theme bg-cover bg-bottom pointer-events-none scale-105"
          style={{ y: yBg }}
          aria-hidden="true"
        />

        {/* Parallax Layer 2: 3D Celestial / Planets layer (moves slightly faster) */}
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ y: yPlanets }}
          aria-hidden="true"
        >
          <HeroParticlesLoader />
        </motion.div>

        {/* Hero content area — comfortably centered between navbar and skyline across all screens */}
        <div className="relative z-10 flex-1 flex flex-col justify-center pt-20 sm:pt-24 md:pt-24 pb-2 sm:pb-4">
          <div
            className="w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex flex-col items-start text-left"
            style={{ maxWidth: "var(--maxw)" }}
          >
            <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
              {/* H1 Headline in Editorial Display Serif — dynamically scaling across phone, tablet, and desktop */}
            <h1
              className="mb-3 sm:mb-4 lg:mb-5 font-serif font-bold sm:font-extrabold tracking-tight text-left hero-title-enter"
              style={{
                fontSize: "clamp(2.35rem, 4.2vw + 1.2vh, 4.5rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#fdfbf7",
              }}
            >
              Innovative Solutions
              <br />
              for{" "}
              <span
                style={{
                  color: "#f5be6c",
                }}
              >
                Modern Businesses
              </span>
            </h1>

            {/* Subtitle — proportional and scaling across devices */}
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mb-6 sm:mb-8 md:mb-9 leading-relaxed hero-subtitle-enter font-normal text-left"
              style={{
                color: "rgba(255, 255, 255, 0.92)",
              }}
            >
              Empowering businesses with next-generation apps that transform how you
              connect, work, and grow.
            </p>

            {/* Dual CTAs matching design mockup — uniform identical button widths, scaling across phone, tablet, desktop */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-5 hero-cta-enter w-full max-w-[380px] sm:max-w-none">
              <Link
                href="/#products"
                className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-6 md:px-8 sm:w-[210px] md:w-[230px] lg:w-[240px] h-[48px] sm:h-[52px] md:h-[56px] rounded-full font-bold text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cta-glow text-center"
                style={{
                  background: "linear-gradient(180deg, #f7ce7a 0%, #eab04a 100%)",
                  color: "#181008",
                  boxShadow:
                    "0 4px 22px rgba(234, 176, 74, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35)",
                }}
                id="hero-cta-primary"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 ml-0.5 inline-block shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#contact"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3 sm:px-6 md:px-8 sm:w-[210px] md:w-[230px] lg:w-[240px] h-[48px] sm:h-[52px] md:h-[56px] rounded-full font-semibold text-xs sm:text-sm md:text-base text-white whitespace-nowrap transition-all duration-300 hover:bg-slate-850/90 hover:border-white/50 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] text-center"
                style={{
                  background: "rgba(16, 20, 42, 0.78)",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                }}
                id="hero-cta-secondary"
              >
                Work with Us
              </Link>
            </div>
          </div>
        </div>
      </div>

        {/* Hub city labels above the water reflection — prominent bold typography matching design mockup */}
        <div
          className="relative z-10 w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pb-2 sm:pb-3 flex items-center justify-between select-none pointer-events-none"
          style={{ maxWidth: "var(--maxw)" }}
        >
          {/* Dubai label (aligned with Dubai skyline) */}
          <div className="flex items-center">
            <span
              className="text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.25em] sm:tracking-[0.45em] lg:tracking-[0.55em] uppercase text-white"
            >
              DUBAI
            </span>
          </div>

          {/* Delhi label (aligned with Delhi skyline) */}
          <div className="flex items-center">
            <span
              className="text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.25em] sm:tracking-[0.45em] lg:tracking-[0.55em] uppercase text-white"
            >
              DELHI
            </span>
          </div>
        </div>

        {/* Stats Bar — positioned seamlessly below the skyline banner */}
        <div className="relative w-full z-10">
          <StatsBar />
        </div>
      </div>
    </section>
  );
}
