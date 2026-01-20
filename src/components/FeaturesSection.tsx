import { Rocket, Target, Shield, Smartphone, Zap, Globe, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Target,
  Shield,
  Smartphone,
  Zap,
  Globe,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Why Choose <span className="text-gradient">{siteConfig.company.name}?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine innovation with reliability to deliver exceptional digital experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {siteConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Rocket;
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-gradient-card border border-border shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-2xl bg-gradient-primary shrink-0 shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}