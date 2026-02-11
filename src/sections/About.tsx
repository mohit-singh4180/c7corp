import { motion } from "framer-motion";
import { Target, Users, Zap, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Lightbulb, Users2, Globe } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Innovation First",
    description: "Pioneering solutions that push technological boundaries",
  },
  {
    icon: <Users2 className="w-5 h-5" />,
    title: "Gen Z & Alpha",
    description: "Designed for the digital-native generation",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Global Reach",
    description: "Serving businesses across Dubai & India",
  },
];

const About = () => (
  <section
    id="about"
    className="section-padding bg-secondary/30"
    aria-label="About C7 Corp"
  >
    <div className="container mx-auto">
      <SectionHeading
        label="About Us"
        title="About C7 Corp"
        highlight="C7 Corp"
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          className="glass-card p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Target className="w-5 h-5 text-primary-foreground" />
            </span>
            <h3 className="text-lg font-semibold font-display">Our Mission</h3>
          </div>
          <p className="text-muted-foreground leading-[1.7] mb-4">
            At C7 Corp, we build intelligent, scalable solutions that solve real
            business challenges. Our cutting-edge technology empowers modern
            businesses to automate workflows, enhance customer experiences, and
            make data-driven decisions.
          </p>
          <p className="text-muted-foreground leading-[1.7]">
            We combine AI innovation with intuitive design to deliver products
            that teams actually want to use. From intelligent assistants to
            advanced analytics, we're building the future of business
            technology.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="glass-card p-8 text-center hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className="mx-auto mb-5 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                {item.icon}
              </div>

              <h4 className="text-lg font-semibold font-display text-foreground mb-2">
                {item.title}
              </h4>

              <p className="text-muted-foreground leading-[1.6] text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
