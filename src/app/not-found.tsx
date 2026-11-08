import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-skyline-theme"
    >
      {/* Content */}
      <div className="relative z-10 px-4 py-16" style={{ paddingTop: "calc(var(--nav-h) + 48px)" }}>
        {/* 404 Number (decorative visual) */}
        <p
          aria-hidden="true"
          className="font-bold leading-none mb-4"
          style={{
            fontSize: "clamp(80px, 15vw, 160px)",
            color: "var(--c-gold)",
            opacity: 0.9,
          }}
        >
          404
        </p>

        <h1
          className="font-bold mb-4"
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            color: "var(--c-white)",
          }}
        >
          Page Not Found
        </h1>
        <p
          className="text-base max-w-md mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,247,239,0.8)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn btn-gold px-8 py-3.5 text-base">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline-light px-8 py-3.5 text-base">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
