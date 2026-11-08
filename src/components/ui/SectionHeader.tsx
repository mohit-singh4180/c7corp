"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** The word(s) to highlight with the accent gradient */
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  /** Use gold highlight color (for dark backgrounds) */
  darkBg?: boolean;
}

/**
 * SectionHeader — eyebrow, H2 with optional gradient highlight word,
 * and optional subtitle. Centred by default.
 * Animated on scroll-in: label, heading, subtitle fade in and slide up 40px.
 */
export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
  darkBg = false,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!highlight) return <>{title}</>;
    const idx = title.indexOf(highlight);
    if (idx === -1) return <>{title}</>;
    const before = title.slice(0, idx);
    const after = title.slice(idx + highlight.length);
    return (
      <>
        {before}
        <span className={darkBg ? "text-gold" : "text-accent"}>{highlight}</span>
        {after}
      </>
    );
  };

  const centred = align === "center";

  return (
    <div className={`mb-12 md:mb-16 ${centred ? "text-center" : ""} ${className}`}>
      <ScrollReveal delay={0}>
        <p className="eyebrow">{eyebrow}</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{ color: darkBg ? "var(--c-white)" : "var(--c-night)" }}>
          {renderTitle()}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p
            className={`mt-4 text-base md:text-lg leading-relaxed ${centred ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
            style={{ color: darkBg ? "rgba(255,247,239,0.8)" : "var(--c-muted)" }}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
