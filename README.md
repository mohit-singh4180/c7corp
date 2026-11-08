# C7 Corp — Neural Dark + Constellation

> AI-first company building innovative solutions for modern businesses.
> Dubai, UAE | Delhi, India

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS 3
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod + Web3Forms
- **Icons:** Lucide React
- **Deploy target:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx            # Home page (hero + all sections)
│   ├── not-found.tsx       # Custom 404
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt
│   ├── about/              # About page
│   ├── careers/            # Careers + open roles
│   ├── contact/            # Contact form
│   ├── products/           # Products hub + individual pages
│   │   ├── ai-pulse/
│   │   ├── c7-connect/
│   │   ├── c7-analytics/
│   │   └── c7-workspace/   # Coming soon + waitlist
│   ├── privacy/            # Legal template pages
│   ├── terms/
│   ├── cookies/
│   └── gdpr/
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Home page sections
│   │   ├── HeroContent.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyC7.tsx
│   │   ├── FoundersSection.tsx
│   │   └── FinalCTA.tsx
│   ├── three/              # 3D components
│   │   ├── ConstellationCanvas.tsx
│   │   └── ConstellationLoader.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── SectionHeading.tsx
│   │   └── FadeIn.tsx
│   ├── ContactForm.tsx
│   └── WaitlistForm.tsx
└── app/globals.css         # Design system (Neural Dark tokens)
```

## Design System: Neural Dark + Constellation

- **Background:** `#05060F` (base), `#0B0D1C` (surface), `#11142A` (elevated)
- **Brand gradient:** Indigo `#4F46E5` → Violet `#7C3AED` → Magenta `#A855F7`
- **Accent:** Cyan `#22D3EE` (highlights & data)
- **Text:** `#F5F6FF` (primary), `#A9AECB` (secondary), `#6B7194` (muted)
- **Fonts:** Space Grotesk (display), Inter (body)
- **Glass cards:** `rgba(255,255,255,0.04)` + backdrop-blur

## Manual Tasks

Before going live, you must:

1. **Real founder photos** — Add photos at:
   - `/public/team/mohit-singh.jpg`
   - `/public/team/ajay-singh.jpg`

2. **LinkedIn URLs** — Update LinkedIn links in:
   - `src/components/home/FoundersSection.tsx`
   - `src/app/about/page.tsx`

3. **Legal review** — All legal pages (`/privacy`, `/terms`, `/cookies`, `/gdpr`) contain template text marked `[LEGAL TEXT TO BE REVIEWED]`. Have a lawyer review before publication.

4. **Booking URL** — Replace the placeholder in `src/app/contact/page.tsx` with a real booking link (e.g., Calendly).

5. **Instagram URL** — Update the Instagram link in `src/components/layout/Footer.tsx` (currently `#`).

6. **Environment variables** — If switching from Web3Forms, update the API key in `ContactForm.tsx` and `WaitlistForm.tsx`.

7. **Real metrics** — The Trust Strip only uses verified facts. Add real metrics/logos when available.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repo to Vercel for automatic deployments.