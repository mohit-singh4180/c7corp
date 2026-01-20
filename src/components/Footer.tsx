import { siteConfig } from "@/config/site.config";

export function Footer() {
  return (
    <footer className="py-16 bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="font-display font-bold text-lg text-primary-foreground">{siteConfig.company.shortName}</span>
              </div>
              <span className="font-display font-semibold text-lg text-foreground">
                {siteConfig.company.name.replace(siteConfig.company.shortName, '').trim()}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">{siteConfig.company.tagline}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.copyright}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {siteConfig.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Legal & Compliance</h4>
            <ul className="space-y-3">
              {siteConfig.legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="pt-8 border-t border-border">
          <h5 className="font-display font-semibold text-sm mb-4 text-foreground">Disclaimers & Legal Notices</h5>
          
          <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">General Disclaimer:</strong> The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
            
            <p>
              <strong className="text-foreground">No Professional Advice:</strong> The content on this website does not constitute professional, legal, financial, or technical advice. Users should consult with appropriate professionals before making business decisions.
            </p>
            
            <p>
              <strong className="text-foreground">Product Availability:</strong> Products marked as "Coming Soon" are in development. Features, pricing, and availability are subject to change without notice.
            </p>
            
            <p>
              <strong className="text-foreground">Intellectual Property:</strong> All content, logos, designs, and materials on this website are the intellectual property of {siteConfig.company.name} and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <p>
              <strong className="text-foreground">Privacy & Data Protection:</strong> {siteConfig.company.name} is committed to protecting your privacy in compliance with applicable data protection laws.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}