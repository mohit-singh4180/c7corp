"use client";

import { Mail, MapPin, Linkedin, Instagram } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import ContactForm from "@/components/ContactForm";
import Card3DTilt from "@/components/animations/Card3DTilt";

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

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "var(--sec-y) max(1.5rem, calc((100vw - var(--maxw)) / 2 + 1.5rem))",
        background: "var(--c-white)",
      }}
      aria-label="Contact us"
    >
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Contact"
          title="Get In Touch"
          highlight="Touch"
          subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <Card3DTilt delay={0} className="h-full">
              <Card className="p-6 md:p-8 h-full !overflow-visible">
                <ContactForm />
              </Card>
            </Card3DTilt>
          </div>

          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {INFO_CARDS.map((card, i) => (
              <Card3DTilt key={card.title} delay={0.12 + i * 0.12}>
                <Card className="p-5 flex items-center gap-4">
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
              </Card3DTilt>
            ))}

            {/* Follow Us card */}
            <Card3DTilt delay={0.12 + INFO_CARDS.length * 0.12}>
              <Card className="p-5">
                <p className="font-semibold text-sm mb-3" style={{ color: "var(--c-night)" }}>
                  Follow Us
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.linkedin.com/company/c7corp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all hover:border-[var(--c-coral)]"
                    style={{ borderColor: "var(--c-line)", color: "var(--c-night)" }}
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all hover:border-[var(--c-coral)]"
                    style={{ borderColor: "var(--c-line)", color: "var(--c-night)" }}
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-4 h-4 text-[#e4405f]" /> Instagram
                  </a>
                </div>
              </Card>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
