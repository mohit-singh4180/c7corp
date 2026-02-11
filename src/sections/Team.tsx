import { motion } from "framer-motion";
import { User, Linkedin } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const TEAM = [
  {
    name: "Mohit Singh",
    role: "Co-Founder & CEO",
    bio: "Product leader with 15+ years of experience in building and scaling innovative digital products and technology-driven businesses.",
    linkedin: "#",
  },
  {
    name: "Ajay Singh",
    role: "Co-Founder & CTO",
    bio: "Technology leader with 7+ years of experience architecting and leading engineering for scalable, high-performance systems.",
    linkedin: "#",
  }
];

const Team = () => (
  <section id="team" className="section-padding" aria-label="Our team">
    <div className="container mx-auto">
      <SectionHeading
        label="Our Team"
        title="Meet Our Team"
        highlight="Team"
        description="A passionate team dedicated to building the future of technology."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
        {TEAM.map((m, i) => (
          <motion.div
            key={m.name}
            className="glass-card p-8 text-center group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary text-muted-foreground mb-4">
              <User className="w-8 h-8" />
            </span>
            <h3 className="font-display font-semibold">{m.name}</h3>
            <p className="text-primary text-sm mb-2">{m.role}</p>
            <p className="text-muted-foreground text-sm leading-[1.7] mb-3">
              {m.bio}
            </p>
            {/* <a
              href={m.linkedin}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${m.name} on LinkedIn`}
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a> */}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
