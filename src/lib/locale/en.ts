/**
 * en.ts — Centralized English localization / content constants for C7 Corp.
 *
 * All user-visible text should be sourced from this file so that:
 *  1. Copy edits happen in one place.
 *  2. Future i18n support can be added by duplicating this file (e.g. ar.ts, hi.ts).
 *
 * Usage:
 *   import { LOCALE } from "@/lib/locale/en";
 *   <h1>{LOCALE.hero.title}</h1>
 */

export const LOCALE = {
  /* ── Brand ── */
  brand: {
    name: "C7 Corp",
    tagline: "Innovative Solutions for Modern Businesses",
    description:
      "C7 Corp builds AI-powered web and mobile applications for the next generation of businesses. Headquartered in Dubai with engineering in Delhi.",
    shortDescription:
      "AI-first company building the future from Dubai and Delhi.",
    email: "support@c7corp.com",
    linkedIn: "https://www.linkedin.com/company/c7corp/",
    instagram: "#",
    website: "https://c7corp.com",
    foundingYear: "2024",
  },

  /* ── Hubs ── */
  hubs: {
    dubai: { label: "Dubai", role: "Business Hub", flag: "🇦🇪", country: "UAE" },
    delhi: { label: "Delhi", role: "Engineering Hub", flag: "🇮🇳", country: "India" },
  },

  /* ── Navigation ── */
  nav: {
    home: "Home",
    products: "Products",
    features: "Features",
    team: "Team",
    about: "About",
    contact: "Contact",
    getEarlyAccess: "Get Early Access",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipToContent: "Skip to main content",
    dubaiDelhi: "Dubai & Delhi Hubs",
    aiFirst: "AI-first company",
  },

  /* ── Hero ── */
  hero: {
    badge: "AI-first · Dubai & Delhi",
    title: "Innovative Solutions",
    titleHighlight: "Modern Businesses",
    titleFull: "Innovative Solutions for Modern Businesses",
    subtitle:
      "Empowering businesses with next-generation apps that transform how you connect, work, and grow.",
    ctaPrimary: "Get Early Access",
    ctaSecondary: "Learn More",
  },

  /* ── Stats Bar ── */
  stats: [
    { value: 2, suffix: "", label: "hubs", detail: "Dubai & Delhi" },
    { value: 3, suffix: "+", label: "products", detail: "" },
    { value: 100, suffix: "%", label: "AI-first", detail: "company" },
    { value: null, suffix: "", label: "Gen Z & Alpha", detail: "target market" },
  ] as Array<{ value: number | null; suffix: string; label: string; detail: string }>,

  /* ── Products section ── */
  products: {
    eyebrow: "Our Products",
    title: "Building the Future",
    highlight: "Future",
    subtitle:
      "Discover our suite of innovative products designed to transform how modern businesses operate.",
  },

  /* ── How It Works ── */
  howItWorks: {
    eyebrow: "How It Works",
    title: "Three Simple Steps",
    highlight: "Steps",
    subtitle: "Getting started with C7 Corp is straightforward.",
    steps: [
      {
        num: "01",
        title: "Connect",
        desc: "Integrate your existing tools and data sources in minutes, not weeks.",
      },
      {
        num: "02",
        title: "Analyse",
        desc: "Our AI processes your data to surface patterns, trends, and actionable insights automatically.",
      },
      {
        num: "03",
        title: "Grow",
        desc: "Make informed decisions faster. Scale operations and accelerate growth with confidence.",
      },
    ],
  },

  /* ── Why Choose C7 ── */
  whyChoose: {
    eyebrow: "Why Choose Us",
    title: "Why Choose C7 Corp?",
    highlight: "C7 Corp?",
    subtitle:
      "We combine innovation with execution to deliver exceptional digital experiences.",
    pullQuote:
      "We build intelligent, scalable solutions that solve real business challenges, combining AI innovation with intuitive design.",
    features: [
      {
        title: "Innovation First",
        desc: "Cutting-edge technology built with the latest AI and cloud innovations to keep you ahead of the competition.",
      },
      {
        title: "Reliable & Scalable",
        desc: "Enterprise-grade infrastructure that grows with your business. From startup to enterprise, we scale seamlessly.",
      },
      {
        title: "Seamless Integration",
        desc: "Connect with your existing tools effortlessly. Our APIs and integrations work with the platforms you already use.",
      },
      {
        title: "UX Excellence",
        desc: "Beautifully designed interfaces that your team will love. Intuitive, fast, and built for productivity.",
      },
    ],
  },

  /* ── Team ── */
  team: {
    eyebrow: "Our Team",
    title: "Meet the Founders",
    highlight: "Founders",
    subtitle: "A passionate team dedicated to building the future of technology.",
    founders: [
      {
        name: "Mohit Singh",
        initials: "MS",
        role: "Co-Founder & CEO",
        bio: "Product leader with 15+ years of experience in building and scaling innovative digital products and technology-driven businesses.",
        linkedin: "#",
      },
      {
        name: "Ajay Singh",
        initials: "AS",
        role: "Co-Founder & CTO",
        bio: "Technology leader with 10+ years of experience architecting and leading engineering for scalable, high-performance systems.",
        linkedin: "#",
      },
    ],
  },

  /* ── About ── */
  about: {
    eyebrow: "About Us",
    title: "About C7 Corp",
    highlight: "C7 Corp",
    missionTitle: "Our Mission",
    missionP1:
      "At C7 Corp, we build intelligent, scalable solutions that solve real business challenges. Our cutting-edge technology empowers modern businesses to automate workflows, enhance customer experiences, and make data-driven decisions.",
    missionP2:
      "We combine AI innovation with intuitive design to deliver products that teams actually want to use. From intelligent assistants to advanced analytics, we're building the future of business technology.",
    values: [
      {
        title: "Innovation First",
        desc: "Pioneering solutions that push technological boundaries.",
      },
      {
        title: "Gen Z & Alpha",
        desc: "Designed for the digital-native generation.",
      },
      {
        title: "Global Reach",
        desc: "Serving businesses across Dubai & India.",
      },
    ],
  },

  /* ── Contact ── */
  contact: {
    eyebrow: "Contact",
    title: "Get In Touch",
    highlight: "Touch",
    subtitle:
      "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    infoCards: [
      { title: "Email", value: "support@c7corp.com", href: "mailto:support@c7corp.com" as string | undefined },
      { title: "Dubai, UAE", value: "Business Hub", href: undefined as string | undefined },
      { title: "Delhi, India", value: "Engineering Hub", href: undefined as string | undefined },
    ],
    followUs: "Follow Us",
    form: {
      heading: "Send us a message",
      labelName: "Full Name *",
      labelEmail: "Email Address *",
      labelCompany: "Company Name",
      labelSubject: "Subject",
      labelMessage: "Message *",
      placeholderName: "Your Name",
      placeholderEmail: "you@example.com",
      placeholderCompany: "Your Company",
      placeholderMessage: "How can we help you? Share details about your needs...",
      subjects: [
        "Product Demo Request",
        "Sales Inquiry",
        "Technical Support",
        "Partnership Opportunity",
        "General Question",
      ],
      submit: "Send Message",
      submitting: "Sending...",
      successTitle: "Message Sent!",
      successDesc: "We'll get back to you within 24 hours.",
      sendAnother: "Send Another Message",
      errorName: "Name is required",
      errorEmail: "Valid email is required",
      errorMessage: "Message is required",
    },
  },

  /* ── Waitlist ── */
  waitlist: {
    title: "Be First to Try",
    titleHighlight: "C7",
    subtitle:
      "Join the waitlist and be among the first to experience our AI-powered business tools.",
    inputLabel: "Email address",
    inputPlaceholder: "Enter your email",
    cta: "Join Waitlist",
    ctaLoading: "Joining\u2026",
    success: "You're on the list! We'll be in touch.",
    errorInvalid: "Please enter a valid email address.",
    errorFallback: "Something went wrong. Please try again.",
  },

  /* ── Careers ── */
  careers: {
    eyebrow: "Careers",
    title: "Join Our Team",
    highlight: "Team",
    subtitle: "Help us build the future of AI-powered business technology.",
    whyEyebrow: "Why Join Us",
    whyTitle: "Why C7 Corp?",
    whyHighlight: "C7 Corp?",
    whySubtitle: "We're building the future of AI-powered business technology.",
    rolesEyebrow: "Open Roles",
    rolesTitle: "Open Positions",
    rolesHighlight: "Positions",
    rolesSubtitle:
      "We don't have open positions right now, but we're always interested in hearing from talented people.",
    noRolesTitle: "No Open Roles Right Now",
    noRolesDesc:
      "We're always interested in exceptional talent. Send us your resume and we'll keep it on file for future openings.",
    sendResumeCta: "Send Your Resume",
    sendResumeSubject: "Career Inquiry \u2014 [Role Title]",
    values: [
      {
        title: "Build What's Next",
        desc: "Work on cutting-edge AI and machine learning technologies that shape the future of business software.",
      },
      {
        title: "Two Hubs, One Team",
        desc: "Join our distributed team across Dubai and Delhi, working collaboratively across time zones.",
      },
      {
        title: "Grow Fast",
        desc: "Remote-friendly, competitive compensation, learning budget, and equity for exceptional performers.",
      },
    ],
  },

  /* ── Legal pages ── */
  legal: {
    documents: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR Compliance", href: "/gdpr" },
    ],
    sidebarLabel: "Documents",
    templateWarning:
      "[LEGAL TEXT TO BE REVIEWED] \u2014 This policy is a template and must be reviewed by a qualified legal professional before publication.",
    lastUpdated: "October 2026",
  },

  /* ── Footer ── */
  footer: {
    description:
      "Innovative solutions for modern businesses. AI-first company building the future from Dubai and Delhi.",
    quickLinksTitle: "Quick Links",
    legalTitle: "Legal & Compliance",
    contactTitle: "Contact",
    disclaimer:
      "The information on this site is for general informational purposes only. C7 Corp makes no warranties about the completeness or accuracy of this information.",
    quickLinks: [
      { label: "Products", href: "/products" },
      { label: "Features", href: "/features" },
      { label: "Team", href: "/team" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR Compliance", href: "/gdpr" },
    ],
  },

  /* ── 404 ── */
  notFound: {
    number: "404",
    title: "Page Not Found",
    desc: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
    ctaHome: "Back to Home",
    ctaContact: "Contact Us",
  },

  /* ── Loading ── */
  loading: {
    text: "Loading...",
  },
};

export type Locale = typeof LOCALE;
