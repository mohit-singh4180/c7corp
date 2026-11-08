"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Loader2, Check, ChevronDown } from "lucide-react";

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECT_OPTIONS = [
  "Custom Software Development",
  "AI / Automation Solutions",
  "Mobile or Web App Development",
  "Product Demo Request",
  "Join Early Access / Waitlist",
  "Partnership Opportunity",
  "Sales Inquiry",
  "Technical Support",
  "Careers / Join Our Team",
  "General Question",
] as const;

/**
 * Contact form with validation, honeypot spam protection,
 * and Web3Forms submission matching the exact fields from original design:
 * - Full Name *
 * - Email Address *
 * - Company Name
 * - Subject (select dropdown)
 * - Message *
 */
export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    _honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      const next = !prev;
      if (next) {
        const curIdx = SUBJECT_OPTIONS.findIndex((o) => o === formData.subject);
        setFocusedIndex(curIdx >= 0 ? curIdx : 0);
      }
      return next;
    });
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (!dropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setDropdownOpen(true);
        const curIdx = SUBJECT_OPTIONS.findIndex((o) => o === formData.subject);
        setFocusedIndex(curIdx >= 0 ? curIdx : 0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < SUBJECT_OPTIONS.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : SUBJECT_OPTIONS.length - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < SUBJECT_OPTIONS.length) {
        handleChange("subject", SUBJECT_OPTIONS[focusedIndex]);
        setDropdownOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDropdownOpen(false);
    } else if (e.key === "Tab") {
      setDropdownOpen(false);
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (dropdownOpen && focusedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[focusedIndex] as HTMLElement;
      if (el) {
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }, [dropdownOpen, focusedIndex]);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Isolate mouse wheel scrolling inside dropdown list from parent page & Lenis
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation();
      const delta = e.deltaY;
      const { scrollTop, scrollHeight, clientHeight } = listEl;
      const canScrollDown = delta > 0 && scrollTop + clientHeight < scrollHeight;
      const canScrollUp = delta < 0 && scrollTop > 0;

      if (canScrollDown || canScrollUp) {
        listEl.scrollTop += delta;
        e.preventDefault();
      }
    };

    listEl.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      listEl.removeEventListener("wheel", onWheel);
    };
  }, [dropdownOpen]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = "Name is required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      e.email = "Valid email is required";
    if (!formData.subject.trim())
      e.subject = "Please select a subject";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setErrorMsg("");
    if (formData._honeypot) return; // spam
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "08889a57-37d9-4155-9b6a-025e3fbb296a",
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          subject: "",
          message: "",
          _honeypot: "",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Try again!";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" role="status">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ background: "rgba(123,63,160,0.1)" }}
        >
          <Check className="w-6 h-6" style={{ color: "var(--c-violet)" }} />
        </div>
        <h3 className="font-semibold text-xl mb-2" style={{ color: "var(--c-night)" }}>
          Message Sent!
        </h3>
        <p className="text-sm" style={{ color: "var(--c-muted)" }}>
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          className="btn btn-ghost mt-6 text-sm"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <h3 className="font-semibold text-lg mb-6" style={{ color: "var(--c-night)" }}>
        Send us a message
      </h3>

      {/* Honeypot */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <input
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={formData._honeypot}
          onChange={(e) => handleChange("_honeypot", e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {/* Full Name & Email Address in 2 columns */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "var(--c-night)" }}
            >
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              className={`input ${errors.fullName ? "input-error" : ""}`}
              placeholder="Your Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "name-error" : undefined}
            />
            {errors.fullName && (
              <p id="name-error" className="text-xs mt-1 text-red-500" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "var(--c-night)" }}
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              className={`input ${errors.email ? "input-error" : ""}`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs mt-1 text-red-500" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="company"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "var(--c-night)" }}
          >
            Company Name
          </label>
          <input
            id="company"
            type="text"
            className="input"
            placeholder="Your Company"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>

        {/* Subject dropdown (Custom, accessible, mandatory with placeholder) */}
        <div>
          <label
            htmlFor="subject-btn"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "var(--c-night)" }}
          >
            Subject *
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              id="subject-btn"
              role="combobox"
              aria-controls="subject-listbox"
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              aria-activedescendant={dropdownOpen && focusedIndex >= 0 ? `subject-opt-${focusedIndex}` : undefined}
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              onClick={toggleDropdown}
              onKeyDown={handleDropdownKeyDown}
              className={`input flex items-center justify-between text-left cursor-pointer transition-all ${
                errors.subject ? "input-error" : ""
              } ${dropdownOpen ? "border-[var(--c-coral)] ring-2 ring-[rgba(255,122,89,0.18)]" : ""}`}
            >
              <span
                className={
                  formData.subject
                    ? "text-[var(--c-night)] font-medium truncate"
                    : "text-[var(--c-muted)] opacity-70 font-normal"
                }
              >
                {formData.subject || "Select a subject..."}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--c-muted)] transition-transform duration-200 shrink-0 ml-2 ${
                  dropdownOpen ? "rotate-180 text-[var(--c-coral)]" : ""
                }`}
              />
            </button>

            {/* Custom elevated dropdown menu matching design */}
            {dropdownOpen && (
              <div
                id="subject-listbox"
                ref={listRef}
                role="listbox"
                aria-label="Subject options"
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-[var(--c-line)] shadow-2xl py-1.5 max-h-56 overflow-y-auto overscroll-contain dropdown-scroll"
                style={{
                  boxShadow:
                    "0 14px 38px rgba(16, 20, 42, 0.16), 0 2px 8px rgba(0, 0, 0, 0.04)",
                  overscrollBehavior: "contain",
                }}
              >
                {SUBJECT_OPTIONS.map((opt, idx) => {
                  const isSelected = formData.subject === opt;
                  const isFocused = focusedIndex === idx;
                  return (
                    <button
                      key={opt}
                      id={`subject-opt-${idx}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        handleChange("subject", opt);
                        setDropdownOpen(false);
                      }}
                      onMouseEnter={() => setFocusedIndex(idx)}
                      className={`w-full px-4 py-2.5 text-xs sm:text-sm text-left cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-[rgba(255,122,89,0.08)] text-[var(--c-coral)] font-semibold"
                          : isFocused
                          ? "bg-[var(--c-cream)] text-[var(--c-coral)] font-medium"
                          : "text-[var(--c-night)] hover:bg-[var(--c-cream)] hover:text-[var(--c-coral)] font-medium"
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[var(--c-coral)] shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <input type="hidden" name="subject" value={formData.subject} />
          </div>
          {errors.subject && (
            <p id="subject-error" className="text-xs mt-1 text-red-500" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: "var(--c-night)" }}
          >
            Message *
          </label>
          <textarea
            id="message"
            rows={4}
            className={`input resize-y ${errors.message ? "input-error" : ""}`}
            placeholder="How can we help you? Share details about your needs..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-xs mt-1 text-red-500" role="alert">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {errorMsg && (
        <p
          className="text-sm mt-4 p-3 rounded-xl"
          style={{
            color: "#ef4444",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
        disabled={loading}
        id="contact-submit"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
