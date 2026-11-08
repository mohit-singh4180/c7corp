import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ArrowRight, PieChart, TrendingUp, Zap } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";

export const metadata: Metadata = {
  title: "C7 Analytics",
  description:
    "C7 Analytics — transform raw data into actionable insights with powerful visualizations and predictive dashboards.",
  openGraph: {
    title: "C7 Analytics | C7 Corp",
    description: "Transform raw data into actionable insights with powerful visualization tools.",
    url: "https://c7corp.com/products/c7-analytics",
  },
};

const FEATURES = [
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Interactive Visualizations",
    description: "Build beautiful, interactive charts and graphs from any data source.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Predictive Analytics",
    description: "AI-powered forecasting to anticipate trends before they happen.",
  },
  {
    icon: <PieChart className="w-5 h-5" />,
    title: "Dashboard Builder",
    description: "Drag-and-drop dashboard creation with real-time data updates.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Real-Time Processing",
    description: "Stream and process data in real-time for instant decision-making.",
  },
];

export default function C7AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="C7 Analytics"
        title="Data-Driven Decisions"
        highlight="Data-Driven"
        subtitle="Transform raw data into actionable insights with powerful visualization tools and predictive dashboards."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="C7 Analytics product details"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero card — analytics dashboard mockup */}
            <FadeIn>
              <Card className="p-6 md:p-8">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Total Users",  value: "12,847", change: "+12.5%" },
                    { label: "Revenue",      value: "$84.2K",  change: "+8.3%"  },
                    { label: "Conversion",   value: "3.24%",   change: "+0.4%"  },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl p-3"
                      style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-wider mb-1"
                        style={{ color: "var(--c-muted)" }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "var(--c-night)" }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs text-emerald-600">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* CSS bar chart */}
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
                >
                  <p
                    className="text-xs mb-3"
                    style={{ color: "var(--c-muted)" }}
                  >
                    Monthly Revenue
                  </p>
                  <div className="flex items-end gap-2 h-24">
                    {[40, 55, 45, 65, 50, 75, 60, 85, 70, 90, 80, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          background:
                            i >= 10
                              ? "var(--g-accent)"
                              : "rgba(123,63,160,0.2)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px]" style={{ color: "var(--c-muted)" }}>Jan</span>
                    <span className="text-[9px]" style={{ color: "var(--c-muted)" }}>Dec</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-primary">
                    Request Demo
                  </Link>
                  <Link href="/products" className="btn btn-ghost">
                    All Products
                  </Link>
                </div>
              </Card>
            </FadeIn>

            {/* Features */}
            <SectionHeader
              eyebrow="Features"
              title="What C7 Analytics Offers"
              highlight="C7 Analytics"
            />
            <div className="grid sm:grid-cols-2 gap-6">
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
