/**
 * HubsStrip — 2D Dubai ↔ Delhi connection strip with an animated SVG arc.
 * Used in Team, About, and Careers sections.
 * The arc CSS animation draws on mount (respects reduced motion).
 */
export default function HubsStrip() {
  return (
    <div
      className="flex items-center justify-center gap-4 sm:gap-8 py-8 px-6"
      aria-label="Dual headquarters: Dubai and Delhi"
    >
      {/* Dubai */}
      <div className="text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl"
          style={{ background: "rgba(255,122,89,0.1)" }}
        >
          🇦🇪
        </div>
        <p className="font-semibold text-sm" style={{ color: "var(--c-night)" }}>
          Dubai
        </p>
        <p className="text-xs" style={{ color: "var(--c-muted)" }}>
          Business Hub
        </p>
      </div>

      {/* Animated connection arc */}
      <div
        className="flex-1 max-w-[220px] relative"
        style={{ height: 48 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 220 48" className="w-full h-full">
          <defs>
            <linearGradient id="hub-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="var(--c-coral)" />
              <stop offset="50%"  stopColor="var(--c-violet)" />
              <stop offset="100%" stopColor="var(--c-gold)" />
            </linearGradient>
          </defs>
          {/* Dashed arc */}
          <path
            d="M 12 42 Q 110 -8 208 42"
            fill="none"
            stroke="url(#hub-arc-grad)"
            strokeWidth="2.5"
            strokeDasharray="4 5"
            strokeLinecap="round"
            className="hubs-arc-path"
            opacity="0.7"
          />
          {/* Endpoint dots */}
          <circle cx="12"  cy="42" r="4" fill="var(--c-coral)" />
          <circle cx="208" cy="42" r="4" fill="var(--c-gold)" />
        </svg>
      </div>

      {/* Delhi */}
      <div className="text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl"
          style={{ background: "rgba(255,210,122,0.15)" }}
        >
          🇮🇳
        </div>
        <p className="font-semibold text-sm" style={{ color: "var(--c-night)" }}>
          Delhi
        </p>
        <p className="text-xs" style={{ color: "var(--c-muted)" }}>
          Engineering Hub
        </p>
      </div>
    </div>
  );
}
