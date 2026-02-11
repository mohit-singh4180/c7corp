🚀 C7 Corp — Modern Business Landing Page

A sleek and professional business landing page built using React, TypeScript, and Vite.
Designed to represent a modern digital company showcasing products, services, team, and contact information in a clean SaaS-style interface.

✨ Features

⚡ Fast setup with Vite + React + TypeScript

🎨 Modern SaaS-style UI

📱 Fully responsive on all devices

🧭 Smooth section-based navigation

♻️ Reusable component structure

📬 Functional contact form integration ready

🌈 Gradient accents and clean typography

🧩 Sections Included

Hero Section

About Company

Products / Services

Features / Why Choose Us

Team Members

Contact Form

Footer

🛠️ Tech Stack

React — UI Library

TypeScript — Type Safety

Vite — Fast Build Tool

Tailwind CSS — Styling

Lucide Icons — Icons

📁 Project Structure
src/
│
├── components/     # Reusable UI components
├── sections/       # Page sections (Hero, About, Contact, etc.)
├── assets/         # Images and static files
├── lib/            # Utility functions
├── types/          # TypeScript types
└── main.tsx        # App entry point

🚀 Getting Started
1️⃣ Clone Repository
git clone https://github.com/your-username/c7-corp-landing.git
cd c7-corp-landing

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


App will run at:

http://localhost:8080

🏗️ Production Build
npm run build


Preview build:

npm run preview

🌍 Deploy to GitHub Pages
Step 1 — Update vite.config.ts
export default defineConfig({
  base: "/your-repo-name/",
})

Step 2 — Install gh-pages
npm install gh-pages --save-dev

Step 3 — Add Scripts in package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}

Step 4 — Deploy
npm run build
npm run deploy

📬 Contact Form

You can integrate:

Web3Forms

EmailJS

Custom backend API

📄 License

MIT License