import { Target, Users, Lightbulb, Quote } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            About Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-gradient">{siteConfig.company.name}</span>
          </h2>
        </div>

        {/* Mission Statement Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-card border border-border shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-5 blur-3xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Quote className="w-6 h-6 text-primary-foreground" />
            </div>
            
            <div className="pt-8">
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-6 text-foreground">
                Our Mission
              </h3>
              
              <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                "{siteConfig.mission}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {siteConfig.company.description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Lightbulb, title: "Innovation First", desc: "Pioneering solutions that push technological boundaries" },
            { icon: Users, title: "Gen Z & Alpha", desc: "Designed for the digital-native generation" },
            { icon: Target, title: "Global Reach", desc: `Serving businesses across ${siteConfig.company.locations.join(' & ')}` },
          ].map((item, index) => (
            <div 
              key={item.title}
              className="group text-center p-8 rounded-2xl bg-gradient-card border border-border shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary mx-auto mb-5 flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h4 className="font-display font-semibold text-lg mb-2 text-foreground">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}