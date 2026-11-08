"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface StatItemDef {
  value: number | null;
  suffix: string;
  label: string;
  detail: string;
}

const STATS: StatItemDef[] = [
  { value: 2, suffix: "", label: "hubs", detail: "Dubai & Delhi" },
  { value: 4, suffix: "+", label: "products", detail: "Built in-house" },
  { value: null, suffix: "", label: "Idea to launch", detail: "Custom apps for clients" },
  { value: 100, suffix: "%", label: "AI-first", detail: "Built smarter, shipped faster" },
];

export default function StatsBar() {
  return (
    <div
      className="w-full px-4 sm:px-6 md:px-8 pb-3 sm:pb-4 pt-1"
      aria-label="Company statistics"
    >
      <div className="mx-auto max-w-5xl sm:max-w-6xl">
        <div
          className="rounded-2xl backdrop-blur-md bg-slate-950/65 border border-white/15 shadow-2xl p-1.5 sm:p-2.5 transition-all duration-300"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center py-2 sm:py-3.5 px-1.5 sm:px-4 md:px-6 stats-item-enter min-w-0"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div
                  className="font-bold text-white text-xs sm:text-base lg:text-xl tracking-tight leading-snug truncate w-full"
                >
                  {stat.value !== null ? (
                    <>
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        duration={1.2}
                      />
                      {stat.label && ` ${stat.label}`}
                    </>
                  ) : (
                    stat.label
                  )}
                </div>
                {stat.detail ? (
                  <div
                    className="text-[10px] sm:text-xs md:text-sm text-white/80 font-normal mt-0.5 sm:mt-1 truncate w-full"
                  >
                    {stat.detail}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
