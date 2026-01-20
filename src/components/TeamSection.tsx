import { User } from "lucide-react";

const teamMembers = [
  { role: "CEO & Founder" },
  { role: "CTO" },
  { role: "Head of Product" },
  { role: "Lead Designer" },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Our Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate team dedicated to building the future of technology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center group-hover:glow transition-shadow">
                <User className="w-10 h-10 text-foreground" />
              </div>
              
              {/* Info */}
              <h4 className="font-display font-semibold text-lg mb-1">
                Team Member
              </h4>
              <p className="text-sm text-primary mb-3">{member.role}</p>
              <p className="text-xs text-muted-foreground">
                Building the future together
              </p>
            </div>
          ))}
        </div>

        {/* Join note */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Interested in joining our team?</p>
          <a
            href="#contact"
            className="inline-flex items-center text-primary hover:underline"
          >
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  );
}