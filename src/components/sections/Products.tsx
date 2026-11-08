import { ArrowRight, Brain, MessagesSquare, BarChart3, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import { PRODUCTS } from "@/lib/products";
import type { Visual } from "@/lib/products";
import Card3DTilt from "@/components/animations/Card3DTilt";
import ProductMockupFloat from "@/components/animations/ProductMockupFloat";
import AnalyticsBarGrow from "@/components/animations/AnalyticsBarGrow";
import { PreviewListItem } from "@/components/animations/PreviewListStagger";

const ICON_MAP: Record<string, React.ReactNode> = {
  "ai-pulse": <Brain className="w-6 h-6" />,
  "c7-connect": <MessagesSquare className="w-6 h-6" />,
  "c7-analytics": <BarChart3 className="w-6 h-6" />,
  "c7-workspace": <ShieldCheck className="w-6 h-6" />,
};

/* ── Small visual previews ── */
function TickerVisual() {
  return (
    <div className="space-y-2">
      {[
        { tag: "BREAKING", text: "New AI model surpasses benchmarks" },
        { tag: "RESEARCH", text: "Efficient transformers, explained" },
        { tag: "TREND", text: "Edge AI adoption rising" },
      ].map((item, idx) => (
        <PreviewListItem key={item.tag} index={idx}>
          <div
            className="flex items-start gap-2 p-3 rounded-xl"
            style={{ background: "var(--c-cream)", border: "1px solid var(--c-line)" }}
          >
            <span
              className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded mt-0.5"
              style={{
                background:
                  item.tag === "BREAKING"
                    ? "rgba(255,122,89,0.12)"
                    : item.tag === "RESEARCH"
                      ? "rgba(123,63,160,0.12)"
                      : "rgba(255,210,122,0.2)",
                color:
                  item.tag === "BREAKING"
                    ? "var(--c-coral)"
                    : item.tag === "RESEARCH"
                      ? "var(--c-violet)"
                      : "#a07820",
              }}
            >
              {item.tag}
            </span>
            <span className="text-xs leading-snug" style={{ color: "var(--c-ink)" }}>
              {item.text}
            </span>
          </div>
        </PreviewListItem>
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="space-y-2">
      {[
        { side: "left", msg: "Dashboard looks great! 🎉" },
        { side: "right", msg: "Deploying now." },
        { side: "left", msg: "Perfect, let's review." },
      ].map((m, i) => (
        <PreviewListItem key={i} index={i} className={`flex ${m.side === "right" ? "justify-end" : ""}`}>
          <div
            className="px-3 py-2 rounded-xl text-xs max-w-[75%]"
            style={{
              background:
                m.side === "right"
                  ? "var(--c-night)"
                  : "var(--c-cream)",
              color:
                m.side === "right" ? "var(--c-white)" : "var(--c-ink)",
              border:
                m.side === "right"
                  ? "none"
                  : "1px solid var(--c-line)",
            }}
          >
            {m.msg}
          </div>
        </PreviewListItem>
      ))}
    </div>
  );
}

function ChartVisual() {
  const bars = [35, 55, 40, 70, 50, 80, 60, 90];
  return (
    <div className="flex items-end gap-1.5 h-20">
      {bars.map((h, i) => (
        <AnalyticsBarGrow
          key={i}
          heightPercent={h}
          index={i}
          isAccent={i >= 6}
        />
      ))}
    </div>
  );
}

function WorkspaceVisual() {
  return (
    <div className="opacity-50 space-y-3">
      {[["80%", "40%"], ["60%", "70%"], ["50%", "30%"]].map(([a, b], i) => (
        <div key={i} className="flex gap-2">
          <div
            className="h-3 rounded animate-shimmer"
            style={{
              width: a,
              background: "linear-gradient(90deg, var(--c-line) 25%, var(--c-cream) 50%, var(--c-line) 75%)",
              backgroundSize: "200% 100%",
            }}
          />
          <div
            className="h-3 rounded"
            style={{ width: b, background: "var(--c-line)" }}
          />
        </div>
      ))}
      <div
        className="mt-3 text-center text-xs font-semibold py-2 rounded-lg"
        style={{
          color: "var(--c-muted)",
          border: "1px dashed var(--c-line)",
        }}
      >
        COMING SOON
      </div>
    </div>
  );
}

function BookingVisual() {
  const items = [
    { category: "FITNESS", name: "Anytime Fitness & Health Spaces", status: "Slots Available Now", time: "Instant" },
    { category: "EDUCATION", name: "City Study Hub & Coaching Centres", status: "Real-Time Booking", time: "Available" },
    { category: "ACTIVITIES", name: "Rhythm Dance & Music Classes", status: "Weekend Batches Open", time: "Reserve" },
    { category: "BUSINESS", name: "Manage Your Venue & Customers", status: "Onboard in Minutes", time: "List Now" },
  ];

  return (
    <div className="space-y-2 w-full min-w-0">
      {items.map((item, idx) => (
        <PreviewListItem key={item.name} index={idx}>
          <div
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
        </PreviewListItem>
      ))}
    </div>
  );
}

const VISUALS: Record<Visual, React.FC> = {
  booking: BookingVisual,
  ticker: TickerVisual,
  chat: ChatVisual,
  chart: ChartVisual,
  workspace: WorkspaceVisual,
};

export default function Products() {
  return (
    <section
      id="products"
      style={{
        padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
        background: "var(--c-white)",
      }}
      aria-label="Our products"
    >
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Our Products"
          title="Building the Future"
          highlight="Future"
          subtitle="Discover our suite of innovative products designed to transform how modern businesses operate."
        />

        <div className="space-y-6 max-w-5xl mx-auto">
          {PRODUCTS.map((product, i) => {
            const Visual = VISUALS[product.visual];
            const isEven = i % 2 === 0;

            return (
              <Card3DTilt key={product.id} delay={i * 0.12} enableHoverTilt={!product.comingSoon} className="w-full min-w-0">
                <Card
                  className={`p-5 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center w-full min-w-0 overflow-hidden ${product.comingSoon ? "opacity-80" : ""}`}
                >
                  {/* Text side */}
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
                        <h3 className="text-lg font-semibold" style={{ color: "var(--c-night)" }}>
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
                        </h3>
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

                    <ul className="space-y-1.5 mb-5">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--c-muted)" }}>
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "var(--c-coral)" }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {product.comingSoon ? (
                      <Link href={product.href} className="btn btn-ghost text-sm px-5 py-2.5">
                        Join Waitlist
                      </Link>
                    ) : "external" in product && product.external ? (
                      <a
                        href={product.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
                      >
                        Explore Product
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={product.href}
                        className="btn btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
                      >
                        Explore Product
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {/* Visual side */}
                  <div
                    className={`rounded-xl p-3 sm:p-5 w-full min-w-0 max-w-full overflow-hidden ${isEven ? "" : "md:order-1"}`}
                    style={{
                      background: "var(--c-cream)",
                      border: "1px solid var(--c-line)",
                    }}
                  >
                    <ProductMockupFloat>
                      <Visual />
                    </ProductMockupFloat>
                  </div>
                </Card>
              </Card3DTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
