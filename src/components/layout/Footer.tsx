"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Features", href: "/features" },
  { label: "Team", href: "/team" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Data Protection", href: "/gdpr" },
];

const SOCIALS = [
  {
    icon: <Linkedin className="w-4 h-4" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/c7corp/",
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    label: "Instagram",
    href: "#",
  },
];

/**
 * Footer — navy, four columns, CSS-only hover (no JS event handlers).
 * Hover states live in globals.css as .footer-link and .footer-social.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const router = useRouter();

  const handlePrefetch = (href: string) => {
    try {
      router.prefetch(href);
    } catch {
      // ignore
    }
  };

  return (
    <footer
      style={{ background: "var(--c-night)", color: "var(--c-white)" }}
      role="contentinfo"
    >
      <div
        className="mx-auto px-4 sm:px-6 pt-16 pb-8"
        style={{ maxWidth: "var(--maxw)" }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              prefetch={true}
              className="flex items-center gap-2.5 font-bold text-lg mb-4 text-white group"
              aria-label="C7 Corp home"
            >
              <Image
                src="/favicon.ico"
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 rounded-md object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="tracking-tight text-xl font-bold">Corp</span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5 max-w-xs"
              style={{ color: "rgba(255,247,239,0.65)" }}
            >
              Innovative solutions for modern businesses. AI-first company
              building the future from Dubai and Delhi.
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => {
                const isExternal = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : { onClick: (e: React.MouseEvent) => e.preventDefault() })}
                    className="footer-social flex items-center justify-center w-9 h-9 rounded-lg border cursor-pointer"
                    aria-label={`Follow us on ${s.label}`}
                  >
                    {s.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h4
              className="font-semibold text-sm mb-4"
              style={{ color: "var(--c-gold)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    prefetch={true}
                    onMouseEnter={() => handlePrefetch(l.href)}
                    onTouchStart={() => handlePrefetch(l.href)}
                    className="footer-link text-sm cursor-pointer"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal & Compliance */}
          <nav aria-label="Legal links">
            <h4
              className="font-semibold text-sm mb-4"
              style={{ color: "var(--c-gold)" }}
            >
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    prefetch={true}
                    onMouseEnter={() => handlePrefetch(l.href)}
                    onTouchStart={() => handlePrefetch(l.href)}
                    className="footer-link text-sm cursor-pointer"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold text-sm mb-4"
              style={{ color: "var(--c-gold)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,247,239,0.65)" }}>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-coral)" }} />
                <a
                  href="mailto:support@c7corp.com"
                  className="footer-link"
                >
                  support@c7corp.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-coral)" }} />
                Dubai, UAE
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-gold)" }} />
                Delhi, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-sm" style={{ color: "rgba(255,247,239,0.45)" }}>
            &copy; {year} C7 Corp. All rights reserved.
          </p>
          <p
            className="text-xs leading-relaxed max-w-xl"
            style={{ color: "rgba(255,247,239,0.35)" }}
          >
            <strong className="font-semibold" style={{ color: "rgba(255,247,239,0.5)" }}>
              Disclaimer:
            </strong>{" "}
            The information on this site is for general informational purposes
            only. C7 Corp makes no warranties about the completeness or
            accuracy of this information.
          </p>
        </div>
      </div>
    </footer>
  );
}
