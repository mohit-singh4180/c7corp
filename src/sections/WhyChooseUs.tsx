import { motion } from "framer-motion";
import { Lightbulb, Server, Layers, Paintbrush } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const FEATURES = [
  { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation First", description: "Cutting-edge technology built with the latest AI and cloud innovations to keep you ahead of the competition." },
  { icon: <Server className="w-6 h-6" />, title: "Reliable & Scalable", description: "Enterprise-grade infrastructure that grows with your business. From startup to enterprise, we scale seamlessly." },
  { icon: <Layers className="w-6 h-6" />, title: "Seamless Integration", description: "Connect with your existing tools effortlessly. Our APIs and integrations work with the platforms you already use." },
  { icon: <Paintbrush className="w-6 h-6" />, title: "UX Excellence", description: "Beautifully designed interfaces that your team will love. Intuitive, fast, and built for productivity." },
];

const WhyChooseUs = () => (
  <section id="features" className="section-padding" style={{ background: "var(--gradient-subtle)" }} aria-label="Why choose C7 Corp">
    <div className="container mx-auto">
      <SectionHeading
        label="Why Choose Us"
        title="Why Choose C7 Corp?"
        highlight="C7 Corp?"
        description="We combine innovation with reliability to deliver exceptional digital experiences."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            className="text-center p-8 rounded-xl border border-border bg-card hover:border-primary/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 text-primary mb-4">
              {f.icon}
            </span>
            <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-[1.7]">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
