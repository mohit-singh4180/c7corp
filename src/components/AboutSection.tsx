import { Target, Users, Lightbulb } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            About Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-gradient">C7 Corp</span>
          </h2>
        </div>

        {/* Mission Statement Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-card border border-border overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 blur-2xl" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-gradient-primary">
                <Target className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold pt-2">
                Our Mission
              </h3>
            </div>
            
            <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6">
              "Empowering the next generation through cutting-edge technology. At C7 Corp, we believe in creating accessible, intelligent, and transformative digital experiences that connect people, simplify complexity, and drive innovation for a better tomorrow."
            </blockquote>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            C7 Corp is a forward-thinking technology company dedicated to building innovative web and mobile applications for modern businesses. We combine creativity with cutting-edge technology to deliver solutions that resonate with the digital-native generation.
          </p>
        </div>

        {/* Stats/Values */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-foreground" />
            </div>
            <h4 className="font-display font-semibold text-lg mb-2">Innovation First</h4>
            <p className="text-sm text-muted-foreground">
              Pioneering solutions that push technological boundaries
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <Users className="w-6 h-6 text-foreground" />
            </div>
            <h4 className="font-display font-semibold text-lg mb-2">Gen Z & Alpha</h4>
            <p className="text-sm text-muted-foreground">
              Designed for the digital-native generation
            </p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-muted/30 border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <Target className="w-6 h-6 text-foreground" />
            </div>
            <h4 className="font-display font-semibold text-lg mb-2">Global Reach</h4>
            <p className="text-sm text-muted-foreground">
              Serving businesses across Dubai & India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}