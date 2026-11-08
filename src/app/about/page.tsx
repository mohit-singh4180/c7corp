import type { Metadata } from "next";
import { Lightbulb, Users2, Globe, Target, Linkedin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import HubsStrip from "@/components/layout/HubsStrip";
import WaitlistBanner from "@/components/layout/WaitlistBanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about C7 Corp — our mission, values, team, and the Dubai-Delhi story behind our AI-first company.",
};

const HIGHLIGHTS = [
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

const TEAM = [
  {
    name: "Mohit Singh",
    initials: "MS",
    role: "Co-Founder & CEO",
    bio: "Product leader with 15+ years of experience in building and scaling innovative digital products and technology-driven businesses.",
    linkedin: "#",
  },
  {
    name: "Ajay Singh",
    initials: "AS",
    role: "Co-Founder & CTO",
    bio: "Technology leader with 10+ years of experience architecting and leading engineering for scalable, high-performance systems.",
    linkedin: "#",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="About C7 Corp"
        highlight="C7 Corp"
        subtitle="AI-first company building the future from Dubai and Delhi."
      />

      {/* Mission */}
      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-cream)",
        }}
        aria-label="About C7 Corp"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Our Mission"
            title="Who We Are"
            highlight="Who"
          />

          <div className="max-w-3xl mx-auto space-y-8">
            <FadeIn>
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <IconChip>
                    <Target className="w-5 h-5" />
                  </IconChip>
                  <h3 style={{ color: "var(--c-night)" }}>Our Mission</h3>
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
            </FadeIn>

            {/* Value cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HIGHLIGHTS.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08} className="h-full flex flex-col">
                  <Card className="p-6 text-center hover:scale-[1.02] transition-transform duration-300 group h-full flex-1 flex flex-col items-center">
                    <IconChip className="mx-auto mb-4 group-hover:animate-pulse-glow">{item.icon}</IconChip>
                    <h3
                      className="text-base font-semibold mb-2"
                      style={{ color: "var(--c-night)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
                      {item.desc}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HubsStrip */}
      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Our Team"
            title="Meet the Founders"
            highlight="Founders"
            subtitle="A passionate team dedicated to building the future of technology."
          />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            {TEAM.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <Card className="p-8 text-center group hover:-translate-y-1 transition-all duration-300">
                  <div
                    className="relative mx-auto mb-5 w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-xl"
                    style={{ background: "var(--g-accent)", border: "3px solid var(--c-line)" }}
                  >
                    {m.initials}
                  </div>
                  <h3 className="font-semibold mb-1" style={{ color: "var(--c-night)" }}>
                    {m.name}
                  </h3>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-3"
                    style={{ color: "var(--c-coral)" }}
                  >
                    {m.role}
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--c-muted)" }}>
                    {m.bio}
                  </p>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: "var(--c-violet)" }}
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </Card>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <Card className="overflow-hidden max-w-3xl mx-auto">
              <HubsStrip />
            </Card>
          </FadeIn>
        </div>
      </section>

      <WaitlistBanner />
    </>
  );
}
