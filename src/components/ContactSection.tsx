import { useState } from "react";
import { Mail, MapPin, Send, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin },
  { name: "Twitter/X", icon: Twitter },
  { name: "Instagram", icon: Instagram },
  { name: "GitHub", icon: Github },
];

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out! We'll get back to you within 24-48 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "General Inquiry",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-gradient-card border border-border">
            <h3 className="font-display text-xl font-semibold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option>General Inquiry</option>
                  <option>Product Demo</option>
                  <option>Partnership</option>
                  <option>Support</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-primary font-semibold text-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-display text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-primary shrink-0">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:support@c7corp.com" className="font-medium hover:text-primary transition-colors">
                      support@c7corp.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-primary shrink-0">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office Locations</p>
                    <p className="font-medium">Dubai, UAE</p>
                    <p className="font-medium">Haldwani/Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media QR Codes */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-display text-lg font-semibold mb-4">Follow Us</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <div
                    key={social.name}
                    className="p-4 rounded-lg bg-muted/50 border border-border text-center hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-card border border-border flex items-center justify-center group-hover:glow transition-shadow">
                      <social.icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{social.name}</p>
                    <p className="text-xs text-muted-foreground">Scan QR</p>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Scan to connect with us on social media
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}