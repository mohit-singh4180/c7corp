import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Compass, ArrowRight, ExternalLink, Dumbbell, GraduationCap, CalendarCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";

export const metadata: Metadata = {
  title: "Book Around You (BAY)",
  description:
    "Book Around You (BAY) — online discovery and booking platform to find and book local activities, health services, and educational facilities with real-time availability.",
  openGraph: {
    title: "Book Around You (BAY) | C7 Corp",
    description: "Find and book local gyms, health services, coaching centres, and activities with real-time slot availability.",
    url: "https://c7corp.com/products/book-around-you",
  },
};

const FEATURES = [
  {
    icon: <Dumbbell className="w-5 h-5" />,
    title: "Fitness & Wellness",
    description: "Discover and book local gyms, fitness studios, and health spaces near your neighborhood.",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Education & Skills",
    description:
      "Find and enroll in coaching centres, study libraries, dance, music, and specialized classes for children.",
  },
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    title: "Real-Time Booking",
    description: "Check live slot availability and reserve appointments or class passes instantly.",
  },
];

export default function BookAroundYouPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book Around You"
        title="Discover & Book Local Spaces"
        highlight="Local Spaces"
        subtitle="Find and book local gyms, health services, coaching centres, and activities with real-time slot availability."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="Book Around You product details"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero card */}
            <FadeIn>
              <Card className="p-8 md:p-12 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
                    aria-hidden="true"
                  >
                    <Image
                      src="/bay.svg"
                      alt="Book Around You (BAY) Logo"
                      width={56}
                      height={56}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  </span>
                  <div>
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: "var(--c-night)" }}
                    >
                      Book Around You (BAY)
                    </h2>
                    <p className="text-sm" style={{ color: "var(--c-coral)" }}>
                      Live Discovery &amp; Booking Platform
                    </p>
                  </div>
                </div>

                {/* Mock booking items */}
                <div className="space-y-3 mb-6">
                  {[
                    { tag: "FITNESS",    title: "Anytime Fitness & Wellness Spaces",     badge: "Live" },
                    { tag: "EDUCATION",  title: "City Central Library & Study Spaces",   badge: "Available" },
                    { tag: "ACTIVITIES", title: "Rhythm Dance & Music Academy — Weekend", badge: "Instant" },
                  ].map((item) => (
                    <div
                      key={item.tag}
                      className="p-4 rounded-xl flex items-center justify-between gap-3"
                      style={{
                        background: "var(--c-cream)",
                        border: "1px solid var(--c-line)",
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-500"
                        />
                        <span
                          className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{
                            background:
                              item.tag === "FITNESS"
                                ? "rgba(255,122,89,0.12)"
                                : item.tag === "EDUCATION"
                                ? "rgba(123,63,160,0.12)"
                                : "rgba(255,210,122,0.25)",
                            color:
                              item.tag === "FITNESS"
                                ? "var(--c-coral)"
                                : item.tag === "EDUCATION"
                                ? "var(--c-violet)"
                                : "#a07820",
                          }}
                        >
                          {item.tag}
                        </span>
                        <span className="text-sm truncate" style={{ color: "var(--c-ink)" }}>
                          {item.title}
                        </span>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-md border flex-shrink-0"
                        style={{
                          color: "var(--c-violet)",
                          background: "rgba(123,63,160,0.08)",
                          borderColor: "var(--c-line)",
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://bookaroundyou.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit BAY Website
                  </a>
                  <a
                    href="https://bookaroundyou.com/explore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost inline-flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4" />
                    Explore Tool
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
              title="What BAY Offers"
              highlight="BAY"
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
