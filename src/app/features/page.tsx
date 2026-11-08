import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import WaitlistBanner from "@/components/layout/WaitlistBanner";
import WhyChoose from "@/components/sections/WhyChoose";
import HowItWorks from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore C7 Corp's core features: AI innovation, reliability, seamless integration, and UX excellence.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="Why Choose C7 Corp?"
        highlight="C7 Corp?"
        subtitle="We combine innovation with reliability to deliver exceptional digital experiences."
      />

      <WhyChoose />
      <HowItWorks />
      <WaitlistBanner />
    </>
  );
}
