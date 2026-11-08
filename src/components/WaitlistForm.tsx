"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, Check, AlertCircle } from "lucide-react";

interface WaitlistFormProps {
  /** Dark mode — used inside sunset/navy banners */
  dark?: boolean;
}

/**
 * Inline email waitlist form.
 * Submits to Web3Forms with a "Waitlist Signup" subject.
 */
export default function WaitlistForm({ dark = false }: WaitlistFormProps) {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setError("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "08889a57-37d9-4155-9b6a-025e3fbb296a",
          email,
          subject: "Waitlist Signup",
          message: `New waitlist signup: ${email}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="flex items-center justify-center gap-2 text-sm py-3 font-medium"
        style={{ color: dark ? "var(--c-gold)" : "var(--c-violet)" }}
        role="status"
      >
        <Check className="w-5 h-5" />
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
        noValidate
        aria-label="Email waitlist signup"
      >
        <div className="flex-1">
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            className={`w-full h-full rounded-pill px-5 py-3 text-sm outline-none transition-all placeholder:text-white/80 placeholder:font-normal ${
              dark
                ? "text-white focus:ring-2 focus:ring-amber-300/40"
                : "text-slate-900 focus:ring-2 focus:ring-amber-400/50"
            }`}
            style={{
              background: dark ? "rgba(15, 20, 42, 0.88)" : "var(--c-white)",
              border: error
                ? "1.5px solid #ef4444"
                : dark
                ? "1.5px solid rgba(255, 255, 255, 0.35)"
                : "1.5px solid var(--c-line)",
              backdropFilter: dark ? "blur(12px)" : undefined,
              WebkitBackdropFilter: dark ? "blur(12px)" : undefined,
              boxShadow: error
                ? "0 0 16px rgba(239, 68, 68, 0.4), 0 4px 20px rgba(0, 0, 0, 0.5)"
                : dark
                ? "0 4px 20px rgba(0, 0, 0, 0.45)"
                : undefined,
              minHeight: 48,
            }}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? "waitlist-error" : undefined}
          />
        </div>
        <button
          type="submit"
          className={`whitespace-nowrap inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm px-6 py-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cta-glow cursor-pointer ${
            dark ? "gold-glow-pulse" : ""
          }`}
          disabled={loading}
          style={{
            minWidth: 140,
            minHeight: 48,
            background: "linear-gradient(180deg, #f7ce7a 0%, #eab04a 100%)",
            color: "#181008",
            boxShadow:
              "0 4px 18px rgba(234, 176, 74, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35)",
          }}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          {loading ? "Joining…" : "Join Waitlist"}
        </button>
      </form>
      {error && (
        <div className="flex justify-center mt-3.5">
          <div
            id="waitlist-error"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide"
            style={{
              background: dark ? "rgba(15, 20, 42, 0.94)" : "#fef2f2",
              border: dark
                ? "1px solid rgba(239, 68, 68, 0.75)"
                : "1px solid #f87171",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: dark ? "#fecaca" : "#b91c1c",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.55)",
              textShadow: dark ? "0 1px 3px rgba(0, 0, 0, 0.9)" : undefined,
            }}
            role="alert"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
