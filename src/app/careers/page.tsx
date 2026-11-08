import type { Metadata } from "next";
import { Mail, Zap, Globe, TrendingUp } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join C7 Corp — explore open roles and help us build the future of AI-powered business technology.",
};

const VALUES = [
  {
    icon:  <Zap className="w-5 h-5" />,
    title: "Build What's Next",
    desc:  "Work on cutting-edge AI and machine learning technologies that shape the future of business software.",
  },
  {
    icon:  <Globe className="w-5 h-5" />,
    title: "Two Hubs, One Team",
    desc:  "Join our distributed team across Dubai and Delhi, working collaboratively across time zones.",
  },
  {
    icon:  <TrendingUp className="w-5 h-5" />,
    title: "Grow Fast",
    desc:  "Accelerate your career with competitive compensation, equity participation, an annual learning budget, flexible remote-first work, and fast-track leadership opportunities.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Join Our Team"
        highlight="Team"
        subtitle="Help us build the future of AI-powered business technology."
      />

      {/* Value cards */}
      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-cream)",
        }}
        aria-label="Why join C7 Corp"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Why Join Us"
            title="Why C7 Corp?"
            highlight="C7 Corp?"
            subtitle="We're building the future of AI-powered business technology."
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1} className="h-full flex flex-col">
                <Card className="p-8 h-full flex-1 flex flex-col">
                  <IconChip className="mb-5">{v.icon}</IconChip>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: "var(--c-night)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {v.desc}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="Open positions"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Open Roles"
            title="Open Positions"
            highlight="Positions"
            subtitle="We don't have open positions right now, but we're always interested in hearing from talented people."
          />

          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <Card className="p-8">
                {/* Empty state with send-resume option */}
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(123,63,160,0.1)" }}
                  >
                    <Mail className="w-7 h-7" style={{ color: "var(--c-violet)" }} />
                  </div>
                  <h3
                    className="font-semibold text-lg mb-2"
                    style={{ color: "var(--c-night)" }}
                  >
                    No Open Roles Right Now
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-sm mx-auto mb-6"
                    style={{ color: "var(--c-muted)" }}
                  >
                    We&apos;re always interested in exceptional talent. Send us your
                    resume and we&apos;ll keep it on file for future openings.
                  </p>
                  <a
                    href="mailto:support@c7corp.com?subject=Career Inquiry — General Application"
                    className="btn btn-primary"
                  >
                    <Mail className="w-4 h-4" />
                    Send Your Resume
                  </a>
                </div>

                {/* Upcoming roles teaser */}
                <div
                  className="mt-8 pt-8"
                  style={{ borderTop: "1px solid var(--c-line)" }}
                >
                  <p
                    className="text-xs font-semibold tracking-wider uppercase mb-4"
                    style={{ color: "var(--c-coral)" }}
                  >
                    Roles Opening Soon
                  </p>
                  {[
                    { title: "Full-Stack Engineer", location: "Delhi, India", dept: "Engineering" },
                    { title: "Product Manager", location: "Dubai, UAE", dept: "Product" },
                    { title: "AI/ML Engineer", location: "Delhi, India · Remote", dept: "AI & Research" },
                  ].map((role) => (
                    <div
                      key={role.title}
                      className="flex items-center justify-between py-4"
                      style={{ borderBottom: "1px solid var(--c-line)" }}
                    >
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--c-night)" }}
                        >
                          {role.title} — {role.location}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--c-muted)" }}>
                          {role.dept} · Full-time
                        </p>
                      </div>
                      <button
                        className="btn btn-ghost text-sm px-4 py-2 opacity-50 cursor-not-allowed"
                        disabled
                        aria-label="Applications opening soon"
                      >
                        Coming Soon
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <WaitlistBanner />
    </>
  );
}
