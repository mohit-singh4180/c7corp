import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GradientButton from "@/components/GradientButton";

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    subject: "General Question",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = "Name is required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      e.email = "Valid email is required";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const formPayload = {
        access_key: "08889a57-37d9-4155-9b6a-025e3fbb296a",
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          company: "",
          subject: "General Question",
          message: "",
        });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      console.error("Web3Forms error:", err);
      alert(err.message || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "var(--gradient-subtle)" }}
      aria-label="Contact us"
    >
      <div className="container mx-auto">
        <SectionHeading
          label="Contact"
          title="Get In Touch"
          highlight="Touch"
          description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="lg:col-span-3 glass-card p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full py-12 text-center"
                role="status"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-sm">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <h3 className="font-display font-semibold mb-6">
                  Send us a message
                </h3>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-medium text-muted-foreground mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className={inputClass}
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && (
                      <p className="text-destructive text-xs mt-1" role="alert">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-muted-foreground mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputClass}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs mt-1" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="company"
                    className="block text-xs font-medium text-muted-foreground mb-1.5"
                  >
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    className={inputClass}
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium text-muted-foreground mb-1.5"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    className={inputClass}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  >
                    <option>Product Demo Request</option>
                    <option>Sales Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership Opportunity</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-muted-foreground mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={inputClass}
                    placeholder="How can we help you? Share details about your needs..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    aria-required="true"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
                <GradientButton
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </GradientButton>
              </form>
            )}
          </motion.div>

          <motion.aside
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:support@c7corp.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@c7corp.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />{" "}
                  Dubai, UAE | Delhi, India
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-display font-semibold mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/company/c7corp/",
                    target: "_blank",
                  },
                  // {
                  //   icon: <Twitter className="w-5 h-5" />,
                  //   label: "Twitter",
                  //   href: "#",
                  //   target: "_self"
                  // },
                  {
                    icon: <Instagram className="w-5 h-5" />,
                    label: "Instagram",
                    href: "#",
                    target: "_self",
                  },
                  // {
                  //   icon: <Github className="w-5 h-5" />,
                  //   label: "GitHub",
                  //   href: "#",
                  //   target: "_self"
                  // },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.target}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:shadow-sm transition-all text-sm"
                    aria-label={`Follow us on ${s.label}`}
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
