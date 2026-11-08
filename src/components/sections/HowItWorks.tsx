import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import { StepCircleFlip, StepConnectorLine } from "@/components/animations/StepFlipConnector";

const STEPS = [
  {
    num:   "01",
    label: "Connect",
    title: "Connect",
    desc:  "Integrate your existing tools and data sources in minutes, not weeks.",
  },
  {
    num:   "02",
    label: "Analyse",
    title: "Analyse",
    desc:  "Our AI processes your data to surface patterns, trends, and actionable insights automatically.",
  },
  {
    num:   "03",
    label: "Grow",
    title: "Grow",
    desc:  "Make informed decisions faster. Scale operations and accelerate growth with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden"
      style={{
        padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
        background: "var(--c-white)",
      }}
      aria-label="How it works"
    >
      {/* Decorative floating orbs */}
      <FloatingOrbs theme="gold" count={2} />

      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }} className="relative z-10">
        <SectionHeader
          eyebrow="How It Works"
          title="Three Simple Steps"
          highlight="Steps"
          subtitle="Getting started with C7 Corp is straightforward."
        />

        {/* Steps with connecting path */}
        <div className="relative max-w-4xl mx-auto">
          {/* SVG connector — animated gradient line with drawing entrance */}
          <div
            className="absolute hidden md:block"
            aria-hidden="true"
            style={{
              top: "36px",
              left: "calc(16.67% + 24px)",
              right: "calc(16.67% + 24px)",
              height: "2px",
            }}
          >
            <StepConnectorLine />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="flex flex-col items-center text-center group">
                  {/* Step node with 3D flip entrance and animated ring */}
                  <StepCircleFlip index={i}>
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center mb-6 font-bold text-sm z-10 step-node-pulse"
                      style={{
                        background: "var(--g-accent)",
                        color: "var(--c-white)",
                        boxShadow: "0 8px 24px rgba(123,63,160,0.25)",
                      }}
                    >
                      {step.num}
                      {/* Animated ring around step node */}
                      <div
                        className="absolute inset-[-6px] rounded-full border-2 border-dashed opacity-20 step-ring-spin"
                        style={{ borderColor: "var(--c-coral)" }}
                        aria-hidden="true"
                      />
                    </div>
                  </StepCircleFlip>

                  {/* Step eyebrow */}
                  <p
                    className="text-xs font-semibold tracking-[0.18em] uppercase mb-2"
                    style={{ color: "var(--c-coral)" }}
                  >
                    Step {step.num}
                  </p>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--c-night)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
