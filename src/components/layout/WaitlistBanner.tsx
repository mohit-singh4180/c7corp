"use client";

import WaitlistForm from "@/components/WaitlistForm";
import HeroParticlesLoader from "@/components/three/HeroParticlesLoader";

/**
 * WaitlistBanner — common theme realistic skyline banner with 3D celestial
 * animations in the sky, merging seamlessly into the navy footer.
 */
export default function WaitlistBanner() {
  return (
    <section
      className="relative overflow-hidden flex flex-col justify-between bg-skyline-theme"
      style={{
        minHeight: "480px",
      }}
      aria-label="Join the waitlist"
    >
      {/* 3D Particle constellation & orbital rings (Three.js) in the sky */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <HeroParticlesLoader />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 text-center"
        style={{ maxWidth: "var(--maxw)" }}
      >
        <h2
          className="font-bold mb-3"
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            color: "var(--c-white)",
            letterSpacing: "-0.01em",
          }}
        >
          Be First to Try{" "}
          <span style={{ color: "var(--c-gold)" }}>C7</span>
        </h2>
        <p
          className="text-base md:text-lg mb-8 max-w-md mx-auto"
          style={{ color: "rgba(255,247,239,0.85)" }}
        >
          Join the waitlist and be among the first to experience our
          AI-powered business tools.
        </p>
        <WaitlistForm dark />
      </div>
    </section>
  );
}
