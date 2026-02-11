import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";

// Lazy load below-fold sections
const About = lazy(() => import("@/sections/About"));
const Products = lazy(() => import("@/sections/Products"));
const WhyChooseUs = lazy(() => import("@/sections/WhyChooseUs"));
const TrustSignals = lazy(() => import("@/sections/TrustSignals"));
const Team = lazy(() => import("@/sections/Team"));
const Contact = lazy(() => import("@/sections/Contact"));
const Footer = lazy(() => import("@/sections/Footer"));

/** JSON-LD structured data for Organization + Website schema */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "C7 Corp",
      url: "https://c7corp.com",
      description: "Innovative AI-powered solutions for modern businesses.",
      foundingDate: "2024",
    },
    {
      "@type": "WebSite",
      name: "C7 Corp",
      url: "https://c7corp.com",
    },
  ],
};

const SectionFallback = () => (
  <div className="flex items-center justify-center py-20" aria-hidden="true">
    <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const Index = () => (
  <>
    <SEOHead
      title="C7 Corp — Innovative Solutions for Modern Businesses"
      description="C7 Corp builds AI-powered web and mobile applications for the next generation of businesses. Get started with our cutting-edge products."
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

    {/* Skip to content link for accessibility */}
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>

    <Navbar />

    <main id="main-content">
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Products />
        <WhyChooseUs />
        {/* <TrustSignals /> */}
        <Team />
        <Contact />
      </Suspense>
    </main>

    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

export default Index;
