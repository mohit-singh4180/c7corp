import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Abstract tech background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      {/* Animated gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-primary opacity-20 blur-[120px] animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border bg-muted/50 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-gradient-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground">
              Launching Soon
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Innovative Solutions for{" "}
            <span className="text-gradient">Modern Businesses</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Empowering Gen Z & Gen Alpha with next-generation apps that transform how you connect, work, and grow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-primary text-lg font-semibold text-foreground hover:opacity-90 transition-opacity glow"
            >
              Get Early Access
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-lg font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-muted-foreground animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}