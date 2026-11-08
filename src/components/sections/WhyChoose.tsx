import { Lightbulb, Server, Layers, Paintbrush } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import Card3DTilt from "@/components/animations/Card3DTilt";

const FEATURES = [
  {
    icon:  <Lightbulb className="w-6 h-6" />,
    title: "Innovation First",
    desc:  "Cutting-edge technology built with the latest AI and cloud innovations to keep you ahead of the competition.",
    size:  "large",
  },
  {
    icon:  <Server className="w-6 h-6" />,
    title: "Reliable & Scalable",
    desc:  "Enterprise-grade infrastructure that grows with your business. From startup to enterprise, we scale seamlessly.",
    size:  "normal",
    dark:  true,
  },
  {
    icon:  <Layers className="w-6 h-6" />,
    title: "Seamless Integration",
    desc:  "Connect with your existing tools effortlessly. Our APIs and integrations work with the platforms you already use.",
    size:  "normal",
  },
  {
    icon:  <Paintbrush className="w-6 h-6" />,
    title: "UX Excellence",
    desc:  "Beautifully designed interfaces that your team will love. Intuitive, fast, and built for productivity.",
    size:  "normal",
  },
];

export default function WhyChoose() {
  return (
    <section
      id="features"
      className="relative overflow-hidden"
      style={{
        padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
        background: "var(--c-cream)",
      }}
      aria-label="Why choose C7 Corp"
    >
      {/* Decorative floating orbs */}
      <FloatingOrbs theme="coral" count={4} />

      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }} className="relative z-10">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Why Choose C7 Corp?"
          highlight="C7 Corp?"
          subtitle="We combine innovation with execution to deliver exceptional digital experiences."
        />

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Bento row 1 — large + normal */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Large card — Innovation */}
            <div className="md:col-span-2">
              <Card3DTilt delay={0} className="h-full">
                <Card
                  className="p-8 h-full relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #f8f0ff 0%, #fff7ef 100%)",
                  } as React.CSSProperties}
                >
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none transition-all duration-700 group-hover:w-64 group-hover:h-64 group-hover:opacity-[0.1]"
                    style={{
                      background: "var(--c-violet)",
                      opacity: 0.06,
                      filter: "blur(60px)",
                      transform: "translate(40%, -40%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <IconChip className="group-hover:animate-pulse-glow">{FEATURES[0].icon}</IconChip>
                    <h3 style={{ color: "var(--c-night)" }}>{FEATURES[0].title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    {FEATURES[0].desc}
                  </p>
                </Card>
              </Card3DTilt>
            </div>

            {/* Dark card — Reliable */}
            <div>
              <Card3DTilt delay={0.12} className="h-full">
                <div
                  className="p-8 h-full rounded-card group relative overflow-hidden"
                  style={{
                    background: "var(--c-night)",
                    borderRadius: "var(--r-card)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {/* Subtle animated glow in dark card */}
                  <div
                    className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none transition-all duration-700 group-hover:w-40 group-hover:h-40"
                    style={{
                      background: "var(--c-coral)",
                      opacity: 0.06,
                      filter: "blur(50px)",
                      transform: "translate(-30%, 30%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <IconChip className="opacity-80">{FEATURES[1].icon}</IconChip>
                    <h3 style={{ color: "var(--c-white)" }}>{FEATURES[1].title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,247,239,0.65)" }}>
                    {FEATURES[1].desc}
                  </p>
                </div>
              </Card3DTilt>
            </div>
          </div>

          {/* Bento row 2 — two normal cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.slice(2).map((f, i) => (
              <Card3DTilt key={f.title} delay={0.24 + i * 0.12} className="h-full">
                <Card className="p-8 h-full group">
                  <div className="flex items-center gap-3 mb-4">
                    <IconChip className="group-hover:animate-pulse-glow">{f.icon}</IconChip>
                    <h3 style={{ color: "var(--c-night)" }}>{f.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    {f.desc}
                  </p>
                </Card>
              </Card3DTilt>
            ))}
          </div>

          {/* Pull-quote */}
          <FadeIn delay={0.2}>
            <div className="relative text-center py-10 px-8">
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-20 h-1 rounded-full shimmer-line"
                style={{ background: "var(--g-accent)" }}
              />
              <blockquote className="mt-6">
                <p
                  className="text-xl md:text-2xl font-semibold leading-relaxed max-w-3xl mx-auto"
                  style={{ color: "var(--c-night)", fontStyle: "italic" }}
                >
                  &ldquo;We build intelligent, scalable solutions that solve real
                  business challenges, combining{" "}
                  <span className="text-accent">AI innovation</span> with
                  intuitive design.&rdquo;
                </p>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
