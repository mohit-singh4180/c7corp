import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles, FileText, Workflow } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";

export const metadata: Metadata = {
  title: "C7 Workspace — Coming Soon",
  description:
    "C7 Workspace — AI-powered productivity suite for distributed teams and modern enterprises. Join the waitlist for early access.",
  openGraph: {
    title: "C7 Workspace — Coming Soon | C7 Corp",
    description: "AI-powered productivity suite for distributed teams. Join the waitlist.",
    url: "https://c7corp.com/products/c7-workspace",
  },
};

const FEATURES = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Task Automation",
    description: "Let AI handle repetitive tasks so your team can focus on what matters.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Smart Documents",
    description: "Collaborative documents with AI-powered suggestions and formatting.",
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Workflow Builder",
    description: "Visual workflow builder that automates complex business processes.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and role-based access.",
  },
];

export default function C7WorkspacePage() {
  return (
    <>
      <PageHeader
        eyebrow="Coming Soon"
        title="C7 Workspace"
        highlight="Workspace"
        subtitle="AI-powered productivity suite designed for distributed teams and modern enterprises."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="C7 Workspace product details"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Coming Soon hero */}
            <FadeIn>
              <Card className="p-8 md:p-12 text-center">
                <IconChip size={80} className="mx-auto mb-6">
                  <ShieldCheck className="w-9 h-9" />
                </IconChip>

                <span
                  className="inline-block px-4 py-1.5 rounded-pill text-xs font-semibold tracking-wider uppercase mb-4"
                  style={{
                    background: "rgba(255,122,89,0.1)",
                    color: "var(--c-coral)",
                    border: "1px solid rgba(255,122,89,0.2)",
                  }}
                >
                  Coming Soon
                </span>

                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ color: "var(--c-night)" }}
                >
                  Be the First to Try C7 Workspace
                </h2>

                <p
                  className="text-base leading-relaxed max-w-lg mx-auto mb-8"
                  style={{ color: "var(--c-muted)" }}
                >
                  We&apos;re building something special. Join the waitlist to get early access and
                  help shape the future of team productivity.
                </p>

                {/* Inline waitlist CTA */}
                <Link href="/contact" className="btn btn-primary">
                  Join Waitlist
                </Link>
              </Card>
            </FadeIn>

            {/* Features preview */}
            <SectionHeader
              eyebrow="Upcoming Features"
              title="What to Expect"
              highlight="Expect"
              subtitle="A sneak peek at what we're building for distributed teams."
            />
            <div className="grid sm:grid-cols-2 gap-6 opacity-80">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.1}>
                  <Card className="p-6 h-full">
                    <IconChip className="mb-4">{f.icon}</IconChip>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--c-night)" }}
                    >
                      {f.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--c-muted)" }}
                    >
                      {f.description}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* Back CTA */}
            <FadeIn delay={0.3}>
              <div className="text-center">
                <Link
                  href="/products"
                  className="btn btn-ghost inline-flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  View All Products
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <WaitlistBanner />
    </>
  );
}
