import HeroParticlesLoader from "@/components/three/HeroParticlesLoader";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** Word to highlight in gold */
  highlight?: string;
  subtitle?: string;
}

/**
 * PageHeader — common theme realistic skyline header with 3D celestial animations.
 * Title at 50px with gold highlight word.
 */
export default function PageHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
}: PageHeaderProps) {
  const renderTitle = () => {
    if (!highlight) return <>{title}</>;
    const idx = title.indexOf(highlight);
    if (idx === -1) return <>{title}</>;
    const before = title.slice(0, idx);
    const after = title.slice(idx + highlight.length);
    return (
      <>
        {before}
        <span style={{ color: "var(--c-gold)" }}>{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <div
      className="relative flex flex-col justify-between overflow-hidden bg-skyline-theme"
      style={{
        paddingTop: "calc(var(--nav-h) + 32px)",
        minHeight: "420px",
      }}
      aria-label={`${title} page header`}
    >
      {/* 3D Particle constellation & orbital rings (Three.js) in the sky */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <HeroParticlesLoader />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 pt-4 pb-14 max-w-4xl mx-auto w-full text-center">
        <p
          className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: "rgba(255,247,239,0.7)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-bold mb-3"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.15,
            color: "var(--c-white)",
            letterSpacing: "-0.02em",
          }}
        >
          {renderTitle()}
        </h1>
        {subtitle && (
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,247,239,0.8)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
