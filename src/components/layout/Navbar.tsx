"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import ScrollProgressBar from "@/components/animations/ScrollProgressBar";

interface NavItemDef {
  label: string;
  href: string;
  targetId: string;
}

const NAV_ITEMS: readonly NavItemDef[] = [
  { label: "Home",     href: "/",        targetId: "hero" },
  { label: "Products", href: "/#products", targetId: "products" },
  { label: "Features", href: "/#features", targetId: "features" },
  { label: "Team",     href: "/#team",    targetId: "team" },
  { label: "About",    href: "/#about",   targetId: "about" },
  { label: "Contact",  href: "/#contact", targetId: "contact" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname                = usePathname();

  const toggle = useCallback(() => setOpen((s) => !s), []);
  const close  = useCallback(() => setOpen(false), []);

  const isHome = pathname === "/";

  /* Lock body scroll when mobile drawer is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Scroll spy for active section highlight on the homepage */
  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Only run section detection if user has scrolled at all
      if (y < 10) {
        setActiveSection("hero");
        return;
      }

      const sectionIds = ["contact", "about", "team", "features", "products", "hero"];
      const scrollPos = y + 140;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once after a short delay so layout has settled
    const t = setTimeout(onScroll, 50);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [isHome]);

  /* Handle hash scroll on mount or hash change */
  useEffect(() => {
    if (!isHome || typeof window === "undefined") return;

    const scrollToHash = () => {
      if (!window.location.hash) return;
      const hashId = window.location.hash.replace("#", "");
      const elem = document.getElementById(hashId);
      if (elem) {
        const lenis = (window as typeof window & { _lenis?: { scrollTo: (target: HTMLElement | number, opts?: { offset?: number; duration?: number }) => void } })._lenis;
        if (lenis) {
          lenis.scrollTo(elem, { offset: -70, duration: 0.8 });
        } else {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", scrollToHash);

    // Initial check on mount
    if (window.location.hash) {
      setTimeout(scrollToHash, 80);
    }

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [isHome]);

  useEffect(() => { close(); }, [pathname, close]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  /* Unified smooth scroll click handler */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId?: string) => {
      if (isHome) {
        e.preventDefault();
        if (!targetId || targetId === "hero") {
          const lenis = (window as typeof window & { _lenis?: { scrollTo: (val: number, opts?: { duration?: number }) => void } })._lenis;
          if (lenis) {
            lenis.scrollTo(0, { duration: 1 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          setActiveSection("hero");
          close();
          return;
        }

        const elem = document.getElementById(targetId);
        if (elem) {
          const lenis = (window as typeof window & { _lenis?: { scrollTo: (el: HTMLElement, opts?: { offset?: number; duration?: number }) => void } })._lenis;
          if (lenis) {
            lenis.scrollTo(elem, { offset: -70, duration: 1.2 });
          } else {
            elem.scrollIntoView({ behavior: "smooth" });
          }
          setActiveSection(targetId);
        }
        close();
      } else {
        close();
      }
    },
    [isHome, close]
  );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 w-full max-w-full z-50 transition-all duration-300",
        open
          ? "bg-[#13123a] border-b border-white/10"
          : scrolled
          ? "nav-glass"
          : isHome
          ? "bg-transparent"
          : "bg-c-night/90 backdrop-blur-sm"
      )}
      style={{ height: "var(--nav-h)" }}
    >
      {/* Thin gold scroll-progress bar at the very top */}
      <ScrollProgressBar />

      <nav
        className="relative mx-auto flex items-center justify-between w-full h-full px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20"
        style={{ maxWidth: "var(--maxw)" }}
        aria-label="Main navigation"
      >
        {/* Logo with favicon icon */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "hero")}
          className="relative z-10 flex items-center gap-2.5 font-bold text-lg text-white group cursor-pointer"
          aria-label="C7 Corp home"
        >
          <Image
            src="/favicon.ico"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-md object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-white tracking-tight text-xl font-bold">Corp</span>
        </Link>

        {/* Desktop nav links — centred with smooth sliding underline */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = isHome
              ? activeSection === item.targetId
              : (() => {
                  const path = pathname ?? "";
                  const target = item.href.replace("/#", "/");
                  // Exact match for root "/", prefix match for all other routes
                  return target === "/" ? path === "/" : path.startsWith(target);
                })();

            return (
              <li key={item.label} className="relative">
                <Link
                  href={item.href}
                  prefetch={true}
                  onClick={(e) => handleNavClick(e, item.targetId)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm transition-colors duration-200 relative group cursor-pointer block",
                    isActive
                      ? "text-white font-bold"
                      : "text-white/80 hover:text-white font-medium"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: "var(--c-gold)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {!isActive && (
                    <span
                      className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100 transition-all duration-200 origin-center"
                      style={{ background: "var(--c-gold)" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA matching center Hero CTA styling */}
        <div className="relative z-10 hidden lg:block">
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="group inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer cta-glow"
            style={{
              background: "linear-gradient(180deg, #f7ce7a 0%, #eab04a 100%)",
              color: "#181008",
              boxShadow:
                "0 4px 18px rgba(234, 176, 74, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35)",
            }}
            id="nav-cta"
          >
            <span>Work with Us</span>
            <ArrowRight className="w-3.5 h-3.5 inline-block shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="relative z-10 lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        className={clsx(
          "lg:hidden fixed inset-x-0 w-full max-w-full bottom-0 top-[var(--nav-h)] transition-all duration-300 ease-out flex flex-col justify-between overflow-y-auto",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        style={{
          background: "linear-gradient(180deg, #13123a 0%, #0d0c27 100%)",
          zIndex: 49,
        }}
      >
        <div className="flex flex-col px-5 pt-4 pb-2">
          <ul className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = isHome
                ? activeSection === item.targetId
                : (() => {
                    const path = pathname ?? "";
                    const target = item.href.replace("/#", "/");
                    return target === "/" ? path === "/" : path.startsWith(target);
                  })();

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={clsx(
                      "block py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-200 active:scale-[0.98]",
                      isActive
                        ? "text-[var(--c-gold)] bg-white/[0.08] shadow-sm font-bold"
                        : "text-white/80 hover:text-white hover:bg-white/[0.04]"
                    )}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-5 pt-3 border-t border-white/10 mt-auto bg-[#13123a]/50">
          <Link
            href="/#contact"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-300 active:scale-[0.98] cta-glow"
            style={{
              background: "linear-gradient(180deg, #f7ce7a 0%, #eab04a 100%)",
              color: "#181008",
              boxShadow:
                "0 4px 18px rgba(234, 176, 74, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35)",
            }}
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Work with Us
            <ArrowRight className="w-4 h-4 ml-0.5 inline-block" />
          </Link>
          <div className="flex items-center justify-between text-[11px] text-white/50 pt-3 px-1">
            <span>Dubai &amp; Delhi Hubs</span>
            <span>AI-first company</span>
          </div>
        </div>
      </div>
    </header>
  );
}
