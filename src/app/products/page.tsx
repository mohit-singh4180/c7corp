import type { Metadata } from "next";
import { ArrowRight, Brain, MessagesSquare, BarChart3, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Discover C7 Corp's suite of innovative products: Book Around You, AI Pulse, C7 Connect, C7 Analytics, and C7 Workspace.",
};

const ICON_MAP: Record<string, React.ReactNode> = {
  "ai-pulse": <Brain className="w-6 h-6" />,
  "c7-connect": <MessagesSquare className="w-6 h-6" />,
  "c7-analytics": <BarChart3 className="w-6 h-6" />,
  "c7-workspace": <ShieldCheck className="w-6 h-6" />,
};

/* Small visual previews */
function TickerPreview() {
  return (
    <div className="space-y-2">
      {[
        { tag: "BREAKING", text: "New AI model surpasses benchmarks" },
        { tag: "RESEARCH", text: "Efficient transformers, explained" },
        { tag: "TREND", text: "Edge AI adoption rising" },
      ].map((item) => (
        <div
          key={item.tag}
          className="flex items-start gap-2 p-3 rounded-xl"
          style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
        >
          <span
            className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded mt-0.5"
            style={{
              background:
                item.tag === "BREAKING" ? "rgba(255,122,89,0.12)"
                  : item.tag === "RESEARCH" ? "rgba(123,63,160,0.12)"
                    : "rgba(255,210,122,0.2)",
              color:
                item.tag === "BREAKING" ? "var(--c-coral)"
                  : item.tag === "RESEARCH" ? "var(--c-violet)"
                    : "#a07820",
            }}
          >
            {item.tag}
          </span>
          <span className="text-xs leading-snug" style={{ color: "var(--c-ink)" }}>
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChatPreview() {
  return (
    <div className="space-y-2 p-4">
      {[
        { side: "left", msg: "Dashboard looks great! 🎉" },
        { side: "right", msg: "Deploying now." },
        { side: "left", msg: "Perfect, let's review." },
      ].map((m, i) => (
        <div key={i} className={`flex ${m.side === "right" ? "justify-end" : ""}`}>
          <div
            className="px-3 py-2 rounded-xl text-xs max-w-[75%]"
            style={{
              background: m.side === "right" ? "var(--c-night)" : "var(--c-cream)",
              color: m.side === "right" ? "var(--c-white)" : "var(--c-ink)",
              border: m.side === "right" ? "none" : "1px solid var(--c-line)",
            }}
          >
            {m.msg}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartPreview() {
  const bars = [35, 55, 40, 70, 50, 80, 60, 90];
  return (
    <div className="flex items-end gap-1.5 h-24 px-4 pb-4">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${h}%`,
            background: i >= 6 ? "var(--g-accent)" : "rgba(123,63,160,0.2)",
          }}
        />
      ))}
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div className="opacity-50 space-y-3 p-4">
      {[["80%", "40%"], ["60%", "70%"], ["50%", "30%"]].map(([a, b], i) => (
        <div key={i} className="flex gap-2">
          <div className="h-3 rounded" style={{ width: a, background: "var(--c-line)" }} />
          <div className="h-3 rounded" style={{ width: b, background: "var(--c-line)" }} />
        </div>
      ))}
      <div
        className="mt-3 text-center text-xs font-semibold py-2 rounded-lg"
        style={{ color: "var(--c-muted)", border: "1px dashed var(--c-line)" }}
      >
        COMING SOON
      </div>
    </div>
  );
}

function BookingPreview() {
  const items = [
    { category: "FITNESS", name: "Anytime Fitness & Health Spaces", status: "Slots Available Now", time: "Instant" },
    { category: "EDUCATION", name: "City Study Hub & Coaching Centres", status: "Real-Time Booking", time: "Available" },
    { category: "ACTIVITIES", name: "Rhythm Dance & Music Classes", status: "Weekend Batches Open", time: "Reserve" },
    { category: "BUSINESS", name: "Manage Your Venue & Customers", status: "Onboard in Minutes", time: "List Now" },
  ];

  return (
    <div className="space-y-2 p-2 sm:p-3 w-full min-w-0">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl gap-2 w-full min-w-0 overflow-hidden"
          style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
            <span
              className="text-[9px] sm:text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded flex-shrink-0"
              style={{
                background:
                  item.category === "FITNESS"
                    ? "rgba(255,122,89,0.12)"
                    : item.category === "EDUCATION"
                      ? "rgba(123,63,160,0.12)"
                      : "rgba(255,210,122,0.25)",
                color:
                  item.category === "FITNESS"
                    ? "var(--c-coral)"
                    : item.category === "EDUCATION"
                      ? "var(--c-violet)"
                      : "#a07820",
              }}
            >
              {item.category}
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate" style={{ color: "var(--c-night)" }}>
                {item.name}
              </p>
              <p className="text-[10px] sm:text-[11px] truncate flex items-center gap-1.5" style={{ color: "var(--c-muted)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" />
                {item.status}
              </p>
            </div>
          </div>
          <span
            className="text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-md flex-shrink-0 ml-1.5 sm:ml-2"
            style={{
              background: "var(--c-white)",
              color: "var(--c-violet)",
              border: "1px solid var(--c-line)",
            }}
          >
            {item.time}
          </span>
        </div>
      ))}
    </div>
  );
}

const PREVIEWS: Record<string, React.FC> = {
  booking: BookingPreview,
  ticker: TickerPreview,
  chat: ChatPreview,
  chart: ChartPreview,
  workspace: WorkspacePreview,
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Building the Future"
        highlight="Future"
        subtitle="A suite of AI-first apps designed to transform how modern businesses operate."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="All products"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <div className="space-y-8 max-w-5xl mx-auto">
            {PRODUCTS.map((product, i) => {
              const Preview = PREVIEWS[product.visual];
              const isEven = i % 2 === 0;

              return (
                <FadeIn key={product.id} delay={i * 0.08} className="w-full min-w-0">
                  <Card
                    className={`p-5 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center w-full min-w-0 overflow-hidden ${product.comingSoon ? "opacity-80" : ""}`}
                  >
                    {/* Text */}
                    <div className={`min-w-0 w-full ${isEven ? "" : "md:order-2"}`}>
                      <div className="flex items-center gap-3 mb-4">
                        {product.id === "book-around-you" ? (
                          <span
                            className="w-[46px] h-[46px] flex items-center justify-center flex-shrink-0 rounded-[14px] overflow-hidden shadow-sm"
                            aria-hidden="true"
                          >
                            <Image
                              src="/bay.svg"
                              alt="Book Around You (BAY) Logo"
                              width={46}
                              height={46}
                              unoptimized
                              className="w-full h-full object-contain"
                            />
                          </span>
                        ) : (
                          <IconChip>
                            {ICON_MAP[product.id as keyof typeof ICON_MAP]}
                          </IconChip>
                        )}
                        <div>
                          <h2
                            className="text-xl font-semibold"
                            style={{ fontSize: "1.25rem", color: "var(--c-night)" }}
                          >
                            {"external" in product && product.external ? (
                              <a
                                href={product.external}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline transition-all"
                              >
                                {product.title}
                              </a>
                            ) : (
                              product.title
                            )}
                          </h2>
                          {product.comingSoon && (
                            <span
                              className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-pill"
                              style={{
                                background: "rgba(255,122,89,0.12)",
                                color: "var(--c-coral)",
                                border: "1px solid rgba(255,122,89,0.2)",
                              }}
                            >
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--c-muted)" }}>
                        {product.description}
                      </p>

                      <ul className="space-y-1.5 mb-6">
                        {product.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-xs"
                            style={{ color: "var(--c-muted)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "var(--c-coral)" }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {product.comingSoon ? (
                        <Link href="/contact" className="btn btn-ghost text-sm px-5 py-2.5">
                          Join Waitlist
                        </Link>
                      ) : "external" in product && product.external ? (
                        <a
                          href={product.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2"
                        >
                          Explore Product
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link
                          href={product.href}
                          className="btn btn-primary text-sm px-6 py-2.5 inline-flex items-center gap-2"
                        >
                          Explore Product
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    {/* Preview */}
                    <div
                      className={`rounded-xl overflow-hidden p-2 sm:p-4 w-full min-w-0 max-w-full ${isEven ? "" : "md:order-1"}`}
                      style={{
                        background: "var(--c-cream)",
                        border: "1px solid var(--c-line)",
                        minHeight: 140,
                      }}
                    >
                      <Preview />
                    </div>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <WaitlistBanner />
    </>
  );
}
