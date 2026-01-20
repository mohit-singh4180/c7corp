const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Careers", href: "#contact" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
];

const legalLinks = [
  { name: "Business Registration", href: "#" },
  { name: "Contact Support", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="py-16 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="font-display font-bold text-xl text-foreground">C7</span>
              </div>
              <span className="font-display font-semibold text-lg">Corp</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Innovative solutions for modern businesses
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024-2025 C7 Corp. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal & Compliance</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
          <h5 className="font-display font-semibold text-sm mb-4">Disclaimers & Legal Notices</h5>
          
          <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">General Disclaimer:</strong> The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is strictly at your own risk.
            </p>
            
            <p>
              <strong className="text-foreground">No Professional Advice:</strong> The content on this website does not constitute professional, legal, financial, or technical advice. Users should consult with appropriate professionals before making business decisions.
            </p>
            
            <p>
              <strong className="text-foreground">Product Availability:</strong> Products marked as "Coming Soon" are in development. Features, pricing, and availability are subject to change without notice. Subscription details will be provided upon product launch.
            </p>
            
            <p>
              <strong className="text-foreground">Intellectual Property:</strong> All content, logos, designs, and materials on this website are the intellectual property of C7 Corp and are protected by copyright, trademark, and other intellectual property laws in India and internationally. Unauthorized use, reproduction, or distribution is strictly prohibited.
            </p>
            
            <p>
              <strong className="text-foreground">Limitation of Liability:</strong> In no event shall C7 Corp, its directors, employees, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of this website or any products or services offered.
            </p>
            
            <p>
              <strong className="text-foreground">Privacy & Data Protection:</strong> C7 Corp is committed to protecting your privacy in compliance with applicable data protection laws.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}