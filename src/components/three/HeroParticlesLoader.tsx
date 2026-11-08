"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loads the enhanced Three.js Hero particles on the client only.
 * ssr: false prevents server-rendering of WebGL code.
 */
const HeroParticles = dynamic(
  () => import("@/components/three/HeroParticles"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function HeroParticlesLoader() {
  return <HeroParticles />;
}
