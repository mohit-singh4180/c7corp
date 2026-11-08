import type { Metadata } from "next";
import Link from "next/link";
import { MessagesSquare, ArrowRight, Share2, FolderKanban, Globe } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";

export const metadata: Metadata = {
  title: "C7 Connect",
  description:
    "C7 Connect — real-time collaboration platform for teams. Share files, manage projects, and communicate seamlessly across departments and time zones.",
  openGraph: {
    title: "C7 Connect | C7 Corp",
    description: "Real-time collaboration platform that brings your team together.",
    url: "https://c7corp.com/products/c7-connect",
  },
};

const FEATURES = [
  {
    icon: <MessagesSquare className="w-5 h-5" />,
    title: "Real-Time Messaging",
    description: "Instant communication with channels, threads, and direct messages.",
  },
  {
    icon: <Share2 className="w-5 h-5" />,
    title: "File Sharing",
    description: "Share and collaborate on files with built-in preview and version tracking.",
  },
  {
    icon: <FolderKanban className="w-5 h-5" />,
    title: "Project Management",
    description: "Kanban boards, task lists, and timelines to keep projects on track.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Cross-Timezone",
    description: "Smart scheduling and async communication for distributed teams.",
  },
];

export default function C7ConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="C7 Connect"
        title="Collaboration, Reimagined"
        highlight="Reimagined"
        subtitle="Real-time collaboration platform that brings your team together across departments and time zones."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="C7 Connect product details"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero card — chat & file panels mockup */}
            <FadeIn>
              <Card className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Chat panel */}
                  <div
                    className="rounded-xl p-4 space-y-3"
                    style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
                  >
                    <div
                      className="flex items-center gap-2 pb-3"
                      style={{ borderBottom: "1px solid var(--c-line)" }}
                    >
                      <MessagesSquare className="w-4 h-4" style={{ color: "var(--c-violet)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--c-night)" }}>
                        #product-team
                      </span>
                    </div>
                    {[
                      { name: "Mohit", msg: "The new dashboard looks great! 🎉", time: "10:32 AM" },
                      { name: "Ajay",  msg: "Deploying the update now.",          time: "10:35 AM" },
                      { name: "Mohit", msg: "Perfect. Let's review after lunch.", time: "10:36 AM" },
                    ].map((m, i) => (
                      <div key={i} className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--g-accent)" }}
                        >
                          {m.name[0]}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span
                              className="text-xs font-medium"
                              style={{ color: "var(--c-night)" }}
                            >
                              {m.name}
                            </span>
                            <span className="text-[10px]" style={{ color: "var(--c-muted)" }}>
                              {m.time}
                            </span>
                          </div>
                          <p className="text-xs" style={{ color: "var(--c-muted)" }}>
                            {m.msg}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Files panel */}
                  <div
                    className="rounded-xl p-4"
                    style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
                  >
                    <div
                      className="flex items-center gap-2 pb-3 mb-3"
                      style={{ borderBottom: "1px solid var(--c-line)" }}
                    >
                      <Share2 className="w-4 h-4" style={{ color: "var(--c-violet)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--c-night)" }}>
                        Shared Files
                      </span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Q4-Report.pdf",         size: "2.4 MB" },
                        { name: "Design-System-v2.fig",  size: "18 MB" },
                        { name: "API-Spec.md",           size: "45 KB" },
                      ].map((f) => (
                        <div
                          key={f.name}
                          className="flex items-center justify-between p-2 rounded-lg"
                        >
                          <span className="text-xs" style={{ color: "var(--c-muted)" }}>
                            {f.name}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--c-muted)" }}>
                            {f.size}
                          </span>
                        </div>
                      ))}
                    </div>
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
              title="What C7 Connect Offers"
              highlight="C7 Connect"
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
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>
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
