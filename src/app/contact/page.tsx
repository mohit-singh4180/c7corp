import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import PageHeader from "@/components/layout/PageHeader";
import HubsStrip from "@/components/layout/HubsStrip";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with C7 Corp. Reach out to our Dubai business hub or Delhi engineering hub.",
};

const INFO_CARDS = [
  {
    icon:  <Mail className="w-5 h-5" />,
    title: "Email",
    value: "support@c7corp.com",
    href:  "mailto:support@c7corp.com",
  },
  {
    icon:  <MapPin className="w-5 h-5" />,
    title: "Dubai, UAE",
    value: "Business Hub",
    href:  undefined,
  },
  {
    icon:  <MapPin className="w-5 h-5" />,
    title: "Delhi, India",
    value: "Engineering Hub",
    href:  undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Get In Touch"
        highlight="Touch"
        subtitle="We'd love to hear from you. Send us a message and we'll respond within 24 hours."
      />

      <section
        style={{
          padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
          background: "var(--c-white)",
        }}
        aria-label="Contact form and info"
      >
        <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
          <SectionHeader
            eyebrow="Contact"
            title="Get In Touch"
            highlight="Touch"
            subtitle="Have questions? We'd love to hear from you."
          />

          <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto mb-12">
            {/* Form */}
            <FadeIn className="lg:col-span-3">
              <Card className="p-6 md:p-8 !overflow-visible">
                <ContactForm />
              </Card>
            </FadeIn>

            {/* Info cards */}
            <FadeIn delay={0.15} className="lg:col-span-2 space-y-4">
              {INFO_CARDS.map((card) => (
                <Card key={card.title} className="p-5 flex items-center gap-4">
                  <IconChip size={42}>{card.icon}</IconChip>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--c-night)" }}>
                      {card.title}
                    </p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="text-xs transition-colors"
                        style={{ color: "var(--c-coral)" }}
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-xs" style={{ color: "var(--c-muted)" }}>
                        {card.value}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </FadeIn>
          </div>

          {/* HubsStrip */}
          <FadeIn delay={0.25}>
            <Card className="overflow-hidden max-w-3xl mx-auto">
              <HubsStrip />
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
