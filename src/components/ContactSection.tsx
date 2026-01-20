import { useState } from "react";
import { Mail, MapPin, Send, Linkedin, Twitter, Instagram, Github, LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site.config";

const socialIconMap: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  "Twitter/X": Twitter,
  Instagram: Instagram,
  GitHub: Github,
};

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: siteConfig.contactSubjects[0],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out! We'll get back to you within 24-48 hours.",
    });

    setFormData({
      name: "",
      email: "",
      company: "",
      subject: siteConfig.contactSubjects[0],
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-card border border-border shadow-card">
            <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground"
                >
                  {siteConfig.contactSubjects.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none text-foreground"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-primary font-semibold text-primary-foreground shadow-glow hover:shadow-lg transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5"
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
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card">
              <h3 className="font-display text-lg font-semibold mb-6 text-foreground">Contact Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-primary shrink-0 shadow-glow">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${siteConfig.company.email}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {siteConfig.company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-primary shrink-0 shadow-glow">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Office Locations</p>
                    {siteConfig.company.locations.map((location) => (
                      <p key={location} className="font-medium text-foreground">{location}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-8 rounded-2xl bg-gradient-card border border-border shadow-card">
              <h3 className="font-display text-lg font-semibold mb-6 text-foreground">Follow Us</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {siteConfig.socialLinks.map((social) => {
                  const Icon = socialIconMap[social.name] || Linkedin;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      className="group p-5 rounded-xl bg-background border border-border text-center transition-all duration-300 hover:border-primary/20 hover:shadow-card hover:-translate-y-1"
                    >
                      <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-primary group-hover:shadow-glow">
                        <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <p className="text-sm font-medium text-foreground">{social.name}</p>
                      <p className="text-xs text-muted-foreground">Coming Soon</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}