/**
 * products.ts — all product copy in one place.
 * Edit text here; no component files need touching.
 */
export const PRODUCTS = [
  {
    id: "book-around-you",
    title: "Book Around You (BAY)",
    slug: "book-around-you",
    description:
      "A two-sided booking platform where people discover and book nearby gyms, classes, and study spaces, and businesses onboard their venues and manage customers in one place.",
    features: [
      "Fitness & Wellness — Local gyms & health spaces",
      "Education & Skills — Coaching, libraries & creative classes",
      "Real-Time Booking — Dynamic availability & instant reservations",
      "For Businesses — Onboard your venue and manage bookings and users"
    ],
    visual: "booking" as const,
    comingSoon: false,
    href: "/products/book-around-you",
    external: "https://bookaroundyou.com/",
  },
  {
    id: "ai-pulse",
    title: "AI Pulse",
    slug: "ai-pulse",
    description:
      "A global source for machine learning news, covering innovations, research trends, and AI developments from around the world.",
    features: [
      "Curated ML & AI news feed",
      "Research paper summaries",
      "Trend analysis & insights",
    ],
    visual: "ticker" as const,
    comingSoon: false,
    href: "/products/ai-pulse",
    external: "https://aipulse.c7corp.com/",
  },
  {
    id: "c7-connect",
    title: "C7 Connect",
    slug: "c7-connect",
    description:
      "Real-time collaboration platform that brings your team together. Share files, manage projects, and communicate seamlessly across departments and time zones.",
    features: [
      "Real-time messaging & file sharing",
      "Project management boards",
      "Cross-timezone collaboration",
    ],
    visual: "chat" as const,
    comingSoon: false,
    href: "/products/c7-connect",
  },
  {
    id: "c7-analytics",
    title: "C7 Analytics",
    slug: "c7-analytics",
    description:
      "Transform raw data into actionable insights with powerful visualization tools. Make informed decisions faster with real-time dashboards and predictive analytics.",
    features: [
      "Interactive data visualizations",
      "Predictive analytics engine",
      "Real-time dashboard builder",
    ],
    visual: "chart" as const,
    comingSoon: false,
    href: "/products/c7-analytics",
  },
  {
    id: "c7-workspace",
    title: "C7 Workspace",
    slug: "c7-workspace",
    description:
      "Transform your workflow with our AI-powered productivity suite designed for distributed teams and modern enterprises.",
    features: [
      "AI-powered task automation",
      "Smart document collaboration",
      "Intelligent workflow builder",
    ],
    visual: "workspace" as const,
    comingSoon: true,
    href: "/products/c7-workspace",
  },
] as const;

export type ProductId = (typeof PRODUCTS)[number]["id"];
export type Visual = (typeof PRODUCTS)[number]["visual"];
