"use client";

import { Linkedin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import HubsStrip from "@/components/layout/HubsStrip";
import Card3DTilt from "@/components/animations/Card3DTilt";
import FounderAvatar3D from "@/components/animations/FounderAvatar3D";

const FOUNDERS = [
  {
    name: "Mohit Singh",
    initials: "MS",
    role: "Co-Founder & CEO",
    bio: "Product leader with 15+ years of experience in building and scaling innovative digital products and technology-driven businesses.",
    photo: "/team/mohit-singh.jpg",
    linkedin: "#",
  },
  {
    name: "Ajay Singh",
    initials: "AS",
    role: "Co-Founder & CTO",
    bio: "Technology leader with 10+ years of experience architecting and leading engineering for scalable, high-performance systems.",
    photo: "/team/ajay-singh.jpg",
    linkedin: "#",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      style={{
        padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
        background: "var(--c-white)",
      }}
      aria-label="Meet the founders"
    >
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Our Team"
          title="Meet the Founders"
          highlight="Founders"
          subtitle="A passionate team dedicated to building the future of technology."
        />

        <div className="max-w-3xl mx-auto">
          {/* Founder cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {FOUNDERS.map((f, i) => (
              <Card3DTilt key={f.name} delay={i * 0.12} className="h-full">
                <Card className="p-8 text-center group transition-all duration-300 h-full">
                  {/* Avatar — soft 3D tilt on hover with a glowing ring */}
                  <FounderAvatar3D className="mb-5">
                    <div
                      className="relative mx-auto w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                      style={{
                        background: "var(--g-accent)",
                        border: "3px solid var(--c-line)",
                      }}
                    >
                      {/* Swap this span for <Image> when real photo is available */}
                      <span className="text-xl font-bold text-white">{f.initials}</span>
                    </div>
                  </FounderAvatar3D>

                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: "var(--c-night)" }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-3"
                    style={{ color: "var(--c-coral)" }}
                  >
                    {f.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-5"
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
              </Card3DTilt>
            ))}
          </div>

          {/* HubsStrip */}
          <Card3DTilt delay={0.24}>
            <Card className="overflow-hidden">
              <HubsStrip />
            </Card>
          </Card3DTilt>
        </div>
      </div>
    </section>
  );
}
