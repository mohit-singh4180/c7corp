import { ArrowRight, ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-subtle opacity-60" />
        <img
          src={heroBg}
          alt="Abstract tech background"
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-background/80 shadow-card animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-primary"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {siteConfig.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-in-up text-foreground" 
            style={{ animationDelay: "0.1s" }}
          >
            {siteConfig.hero.headline.split(' ').slice(0, -2).join(' ')}{" "}
            <span className="text-gradient">{siteConfig.hero.headline.split(' ').slice(-2).join(' ')}</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed" 
            style={{ animationDelay: "0.2s" }}
          >
            {siteConfig.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" 
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-primary text-lg font-semibold text-primary-foreground shadow-glow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {siteConfig.hero.primaryCta}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-border text-lg font-semibold text-foreground hover:bg-muted hover:border-primary/20 transition-all duration-300"
            >
              {siteConfig.hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs font-medium">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}