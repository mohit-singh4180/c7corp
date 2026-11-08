import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      colors: {
        /* Sunset Skyline palette — mirrors tokens.css */
        "c-night":  "#14123a",
        "c-indigo": "#1d1b4b",
        "c-violet": "#7b3fa0",
        "c-coral":  "#ff7a59",
        "c-gold":   "#ffd27a",
        "c-cream":  "#fff7ef",
        "c-line":   "#f1e2d3",
        "c-ink":    "#14123a",
        "c-muted":  "#5a5578",
      },
      borderRadius: {
        card: "22px",
        pill: "999px",
        chip: "14px",
      },
      maxWidth: {
        site: "1280px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(123,63,160,0.08)",
        glow: "0 0 40px rgba(255,122,89,0.15)",
        btn:  "0 4px 20px rgba(20,18,58,0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        countup: {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.7s cubic-bezier(0.215,0.61,0.355,1) forwards",
        float:        "float 5s ease-in-out infinite",
        shimmer:      "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        marquee:      "marquee 25s linear infinite",
        countup:      "countup 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
