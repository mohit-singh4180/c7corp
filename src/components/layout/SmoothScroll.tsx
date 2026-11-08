"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScroll — Lenis smooth scroll provider.
 * Wires GSAP ScrollTrigger to the Lenis tick so all GSAP scrub
 * animations advance with the smooth-scrolled value.
 *
 * Respects prefers-reduced-motion: if the user prefers reduced motion,
 * Lenis is initialised with lerp:1 (instant) so no smooth scroll occurs.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  /* Reset scroll to top on pathname changes (unless URL has hash) */
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      const lenis = (window as typeof window & { _lenis?: { scrollTo: (val: number, opts?: { immediate?: boolean }) => void } })._lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    let lenisCleanup: (() => void) | undefined;

    const init = async () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /* Dynamic import keeps Lenis out of the SSR bundle */
      const { default: Lenis } = await import("lenis");

      const lenis = new Lenis({
        lerp: prefersReduced ? 1 : 0.1,
        smoothWheel: !prefersReduced,
      });

      /* Wire GSAP ScrollTrigger to Lenis */
      const wireGsap = async () => {
        try {
          const { gsap } = await import("gsap");
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          gsap.registerPlugin(ScrollTrigger);

          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add((t) => lenis.raf(t * 1000));
          gsap.ticker.lagSmoothing(0);
        } catch {
          /* GSAP not available on this page — Lenis still runs standalone */
        }
      };

      wireGsap();

      /* Expose lenis on window for any component that needs to call lenis.scrollTo */
      (window as typeof window & { _lenis?: typeof lenis })._lenis = lenis;

      lenisCleanup = () => {
        lenis.destroy();
        delete (window as typeof window & { _lenis?: typeof lenis })._lenis;
      };
    };

    init();

    return () => lenisCleanup?.();
  }, []);

  return <>{children}</>;
}
