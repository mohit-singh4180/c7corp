import { Zap, Linkedin, Twitter, Instagram, Github } from "lucide-react";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Features", href: "#features" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
  { label: "Careers", href: "#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "GDPR Compliance", href: "#" },
];

const SOCIALS = [
  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href:"https://www.linkedin.com/company/c7corp/" },
  // { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
  { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
  // { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border section-padding py-14 bg-secondary/30"
      role="contentinfo"
    >
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <a
              href="#home"
              className="flex items-center gap-2 font-display font-bold text-lg"
              aria-label="C7 Corp home"
            >
              <img
                src="/favicon.ico"
                alt="C7 Corp logo"
                className="w-7 h-7 rounded-md object-cover"
              />
              <span className="font-bold text-foreground tracking-tight">Corp</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Innovative solutions for modern businesses.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-sm transition-all"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h4 className="font-display font-semibold text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h4 className="font-display font-semibold text-sm mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>support@c7corp.com</li>
              <li>Dubai, UAE</li>
              <li>Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} C7 Corp. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
            <strong>Disclaimer:</strong> The information on this site is for
            general informational purposes only. C7 Corp makes no warranties
            about the completeness or accuracy of this information.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
