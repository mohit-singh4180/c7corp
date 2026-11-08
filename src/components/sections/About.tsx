"use client";

import { Lightbulb, Users2, Globe, Target } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import Card3DTilt from "@/components/animations/Card3DTilt";

const VALUES = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Innovation First",
    desc: "Pioneering solutions that push technological boundaries.",
  },
  {
    icon: <Users2 className="w-5 h-5" />,
    title: "Gen Z & Alpha",
    desc: "Designed for the digital-native generation.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global Reach",
    desc: "Serving businesses across Dubai & India.",
  },
];

export default function About() {
  return (
    <section
      className="bg-cream relative overflow-hidden"
      style={{ padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))" }}
      id="about"
      aria-label="About C7 Corp"
    >
      {/* Decorative floating orbs */}
      <FloatingOrbs theme="violet" count={3} />

      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }} className="relative z-10">
        <SectionHeader
          eyebrow="About Us"
          title="About C7 Corp"
          highlight="C7 Corp"
        />

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Mission card with 3D tilt */}
          <Card3DTilt delay={0}>
            <Card className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <IconChip>
                  <Target className="w-5 h-5" />
                </IconChip>
                <h3>Our Mission</h3>
              </div>
              <p className="leading-relaxed mb-4" style={{ color: "var(--c-muted)" }}>
                At C7 Corp, we build intelligent, scalable solutions that solve
                real business challenges. Our cutting-edge technology empowers
                modern businesses to automate workflows, enhance customer
                experiences, and make data-driven decisions.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--c-muted)" }}>
                We combine AI innovation with intuitive design to deliver
                products that teams actually want to use. From intelligent
                assistants to advanced analytics, we&apos;re building the
                future of business technology.
              </p>
            </Card>
          </Card3DTilt>

          {/* Value cards with 3D tilt and 0.12s stagger */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Card3DTilt key={v.title} delay={0.12 + i * 0.12} className="h-full flex flex-col">
                <Card className="p-6 text-center group h-full flex-1 flex flex-col items-center">
                  <IconChip className="mx-auto mb-4 group-hover:animate-pulse-glow">
                    {v.icon}
                  </IconChip>
                  <h3 className="text-base font-semibold mb-2" style={{ color: "var(--c-night)" }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                    {v.desc}
                  </p>
                </Card>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
