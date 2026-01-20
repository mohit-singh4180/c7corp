import { Rocket, Target, Shield, Smartphone, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "Cutting-edge technology built for tomorrow",
  },
  {
    icon: Target,
    title: "Gen Z Focused",
    description: "Designed for digital natives",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security standards",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Seamless experience across web and mobile",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance that scales",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving businesses worldwide",
  },
];

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
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient">C7 Corp?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine innovation with reliability to deliver exceptional digital experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-muted/30 border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary shrink-0 group-hover:glow transition-shadow">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}