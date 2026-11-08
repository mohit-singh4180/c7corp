import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import NavigationProgress from "@/components/layout/NavigationProgress";
import RoutePrefetcher from "@/components/layout/RoutePrefetcher";

/* ── Poppins via next/font (no FOUT, no layout shift) ── */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/* ── Playfair Display for editorial headlines (matches design mockup) ── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

/* ── Global metadata ── */
export const metadata: Metadata = {
  metadataBase: new URL("https://c7corp.com"),
  title: {
    default: "C7 Corp — Innovative Solutions for Modern Businesses",
    template: "%s | C7 Corp",
  },
  description:
    "C7 Corp builds AI-powered web and mobile applications for the next generation of businesses. Headquartered in Dubai with engineering in Delhi.",
  authors: [{ name: "C7 Corp" }],
  keywords: ["AI", "Dubai", "Delhi", "SaaS", "enterprise software", "C7 Corp"],
  alternates: {
    canonical: "https://c7corp.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://c7corp.com",
    siteName: "C7 Corp",
    title: "C7 Corp — Innovative Solutions for Modern Businesses",
    description:
      "AI-first company building apps for modern businesses and the Gen Z & Alpha generation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "C7 Corp — Innovative Solutions for Modern Businesses",
    description:
      "AI-first company building apps for modern businesses and the Gen Z & Alpha generation.",
  },
  robots: { index: true, follow: true },
};

/* ── Organization JSON-LD with two hub locations ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "C7 Corp",
  url: "https://c7corp.com",
  description: "Innovative AI-powered solutions for modern businesses.",
  foundingDate: "2024",
  founders: [
    { "@type": "Person", name: "Mohit Singh", jobTitle: "Co-Founder & CEO" },
    { "@type": "Person", name: "Ajay Singh", jobTitle: "Co-Founder & CTO" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@c7corp.com",
    contactType: "customer support",
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
      description: "Business Hub",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
      description: "Engineering Hub",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`relative ${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-c-ink font-sans relative">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <RoutePrefetcher />

        {/* Skip to content — accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <SmoothScroll>
          <Navbar />

          <main id="main-content" className="flex-1 relative">
            {children}
          </main>

          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
