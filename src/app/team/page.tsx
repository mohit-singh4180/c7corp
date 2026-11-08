import type { Metadata } from "next";
import { Linkedin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/layout/PageHeader";
import HubsStrip from "@/components/layout/HubsStrip";
import WaitlistBanner from "@/components/layout/WaitlistBanner";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the founders of C7 Corp — Mohit Singh (Co-Founder & CEO) and Ajay Singh (Co-Founder & CTO).",
};

const FOUNDERS = [
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

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Meet the Founders"
        highlight="Founders"
        subtitle="A passionate team dedicated to building the future of technology."
      />

      {/* Founders */}
      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="Meet the founders"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Leadership"
            title="Meet the Founders"
            highlight="Founders"
            subtitle="The visionaries driving C7 Corp's mission."
          />

          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-10">
            {FOUNDERS.map((f, i) => (
              <FadeIn key={f.name} delay={i * 0.1}>
                <Card className="p-8 text-center group hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center">
                  {/* Avatar */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-5 text-white text-2xl font-bold flex-shrink-0"
                    style={{
                      background: "var(--g-accent)",
                      border: "3px solid var(--c-line)",
                    }}
                  >
                    {f.initials}
                  </div>

                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ color: "var(--c-night)" }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-4"
                    style={{ color: "var(--c-coral)" }}
                  >
                    {f.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-6 flex-1"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {f.bio}
                  </p>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link inline-flex items-center gap-1.5 text-sm font-semibold"
                    aria-label={`${f.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* HubsStrip */}
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
