import type { Metadata } from "next";
import Link from "next/link";
import { Brain, ArrowRight, ExternalLink, Rss, TrendingUp, BookOpen } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";

export const metadata: Metadata = {
  title: "AI Pulse",
  description:
    "AI Pulse — your global source for machine learning news, research trends, and AI developments from around the world.",
  openGraph: {
    title: "AI Pulse | C7 Corp",
    description: "Your global source for machine learning news, research trends, and AI developments.",
    url: "https://c7corp.com/products/ai-pulse",
  },
};

const FEATURES = [
  {
    icon: <Rss className="w-5 h-5" />,
    title: "Curated News Feed",
    description: "Stay updated with the latest AI and ML news, filtered for quality and relevance.",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Research Summaries",
    description: "Get accessible summaries of the latest research papers from top conferences.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Trend Analysis",
    description: "Understand emerging trends and their potential impact on your industry.",
  },
];

export default function AiPulsePage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Pulse"
        title="Your Global AI News Source"
        highlight="AI News Source"
        subtitle="Machine learning news, research trends, and AI developments — all in one place."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="AI Pulse product details"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero card */}
            <FadeIn>
              <Card className="p-8 md:p-12 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <IconChip size={56}>
                    <Brain className="w-7 h-7" />
                  </IconChip>
                  <div>
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: "var(--c-night)" }}
                    >
                      AI Pulse
                    </h2>
                    <p className="text-sm" style={{ color: "var(--c-coral)" }}>
                      Live &amp; Active
                    </p>
                  </div>
                </div>

                {/* Mock ticker headlines */}
                <div className="space-y-3 mb-6">
                  {[
                    "GPT-5 Research Preview Released — What It Means for Developers",
                    "Google DeepMind Achieves Breakthrough in Protein Folding",
                    "New Open-Source LLM Challenges Proprietary Models",
                  ].map((headline, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl flex items-center gap-3"
                      style={{
                        background: "var(--c-cream)",
                        border: "1px solid var(--c-line)",
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--c-coral)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--c-ink)" }}>
                        {headline}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://aipulse.c7corp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit AI Pulse
                  </a>
                  <Link href="/products" className="btn btn-ghost">
                    All Products
                  </Link>
                </div>
              </Card>
            </FadeIn>

            {/* Features */}
            <SectionHeader
              eyebrow="Features"
              title="What AI Pulse Offers"
              highlight="AI Pulse"
            />
            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.1}>
                  <Card className="p-6 text-center h-full flex flex-col items-center">
                    <IconChip className="mx-auto mb-4">{f.icon}</IconChip>
                    <h3
                      className="text-base font-semibold mb-2"
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
            <FadeIn delay={0.2}>
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
