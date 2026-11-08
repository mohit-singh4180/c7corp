import Link from "next/link";
import { type ReactNode } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";

interface LegalLayoutProps {
  title: string;
  highlight: string;
  subtitle: string;
  activeHref: string;
  children: ReactNode;
}

const LEGAL_DOCS = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy",    href: "/cookies" },
  { label: "Data Protection",  href: "/gdpr" },
];

/**
 * Shared template for all legal pages.
 * Left: sticky sidebar navigation between the four documents.
 * Right: content card.
 */
export default function LegalLayout({
  title,
  highlight,
  subtitle,
  activeHref,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        highlight={highlight}
        subtitle={subtitle}
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-cream)",
        }}
      >
        <div
          className="grid lg:grid-cols-4 gap-8"
          style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}
        >
          {/* Sticky sidebar nav */}
          <nav
            aria-label="Legal documents navigation"
            className="lg:col-span-1"
          >
            <div
              className="lg:sticky space-y-1"
              style={{ top: "calc(var(--nav-h) + 24px)" }}
            >
              <p
                className="text-xs font-semibold tracking-wider uppercase mb-3 px-3"
                style={{ color: "var(--c-coral)" }}
              >
                Documents
              </p>
              {LEGAL_DOCS.map((doc) => {
                const isActive = doc.href === activeHref;
                return (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive ? "var(--c-night)" : "transparent",
                      color: isActive ? "var(--c-white)" : "var(--c-muted)",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {doc.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card className="p-8 md:p-10">
              <div className="prose-sunset">
                {children}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
