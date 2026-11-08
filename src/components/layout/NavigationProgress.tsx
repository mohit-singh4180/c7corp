"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * NavigationProgress — zero-dependency instant top progress bar for Next.js App Router.
 *
 * Provides immediate (<10ms) visual reflection when clicking any internal link (like Blog,
 * Careers, About, etc.), completely eliminating perceived navigation latency.
 */
export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeUrlRef = useRef<string>("");
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  /* Intercept all internal link clicks for instant 0ms visual feedback */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, or hash-only links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if navigating to the same URL
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl || href === currentUrl + "#") {
        return;
      }

      // Start progress immediately!
      activeUrlRef.current = href;
      setVisible(true);
      setProgress(25);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 85;
          }
          // Incrementally slow down as it approaches 85%
          const step = Math.max(1, (85 - prev) * 0.15);
          return Math.min(85, prev + step);
        });
      }, 100);
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  /* Complete progress bar when route transition finishes */
  useEffect(() => {
    if (visibleRef.current) {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);

      const hideTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);

      return () => clearTimeout(hideTimer);
    }
  }, [pathname, searchParams]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{
        zIndex: 999999,
        height: "3px",
      }}
    >
      <div
        className="h-full transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #ff7a59 0%, #fed078 50%, #7b3fa0 100%)",
          boxShadow: "0 0 10px rgba(254, 208, 120, 0.7), 0 0 5px rgba(255, 122, 89, 0.5)",
          opacity: visible ? 1 : 0,
          transition: progress === 100 ? "width 0.15s ease-out, opacity 0.25s ease-out" : "width 0.2s ease-out",
        }}
      />
    </div>
  );
}
