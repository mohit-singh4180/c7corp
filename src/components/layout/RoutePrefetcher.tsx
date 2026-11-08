"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PRELOAD = [
  "/products",
  "/products/book-around-you",
  "/products/ai-pulse",
  "/products/c7-connect",
  "/products/c7-analytics",
  "/products/c7-workspace",
  "/features",
  "/team",
  "/about",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/cookies",
  "/gdpr",
];

/**
 * RoutePrefetcher — pre-warms Next.js routes during browser idle time.
 *
 * Paces prefetch calls so the dev server/browser compiles and caches
 * routes before the user clicks, turning 2-5s cold navigations into
 * instantaneous (<50ms) transitions.
 */
export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // Wait until initial page load has settled
    const timer = setTimeout(() => {
      let index = 0;

      const prefetchNext = () => {
        if (index >= ROUTES_TO_PRELOAD.length) return;
        const route = ROUTES_TO_PRELOAD[index++];
        try {
          router.prefetch(route);
        } catch {
          // ignore
        }
        // Pace prefetching by 120ms for fast pre-warming
        setTimeout(prefetchNext, 120);
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => prefetchNext());
      } else {
        prefetchNext();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}
