import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChoose from "@/components/sections/WhyChoose";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import WaitlistBanner from "@/components/layout/WaitlistBanner";
import SectionTransition from "@/components/animations/SectionTransition";

export const metadata: Metadata = {
  title: "C7 Corp — Innovative Solutions for Modern Businesses",
  description:
    "C7 Corp builds AI-powered web and mobile applications for the next generation of businesses. Get started with our cutting-edge products.",
};

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 1. Hero with integrated Skyline & Stats Bar */}
      <Hero />

      {/* 2. Products */}
      <SectionTransition>
        <Products />
      </SectionTransition>

      {/* 3. How It Works */}
      <SectionTransition>
        <HowItWorks />
      </SectionTransition>

      {/* 4. Why Choose C7 Corp (Features) */}
      <SectionTransition>
        <WhyChoose />
      </SectionTransition>

      {/* 5. Team */}
      <SectionTransition>
        <Team />
      </SectionTransition>

      {/* 6. About */}
      <SectionTransition>
        <About />
      </SectionTransition>

      {/* 7. Contact (inline on home page) */}
      <SectionTransition>
        <Contact />
      </SectionTransition>

      {/* 8. Waitlist Banner */}
      <SectionTransition>
        <WaitlistBanner />
      </SectionTransition>
    </div>
  );
}
