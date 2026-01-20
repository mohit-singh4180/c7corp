import { User, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Our Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate team dedicated to building the future of technology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {siteConfig.team.map((member, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-background border border-border shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              
              {/* Info */}
              <h4 className="font-display font-semibold text-lg mb-1 text-foreground">
                Team Member
              </h4>
              <p className="text-sm font-medium text-primary mb-3">{member.role}</p>
              <p className="text-xs text-muted-foreground">
                Building the future together
              </p>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-background border border-border shadow-card">
            <p className="text-muted-foreground">Interested in joining our team?</p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-glow hover:shadow-lg transition-all duration-300"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}