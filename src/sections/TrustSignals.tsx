import { motion } from "framer-motion";
import { Building2, Globe, Award } from "lucide-react";

const TrustSignals = () => (
  <section className="section-padding bg-secondary/30" aria-label="Trust signals">
    <div className="container mx-auto text-center max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
          Trusted by <span className="gradient-text">Innovative Companies</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-[1.7] mb-10">
          Join innovative companies transforming their businesses with C7 Corp solutions.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {[
          { icon: <Building2 className="w-6 h-6" />, value: "1,000+", label: "Businesses Worldwide" },
          { icon: <Globe className="w-6 h-6" />, value: "30+", label: "Countries Served" },
          { icon: <Award className="w-6 h-6" />, value: "4.9/5", label: "Customer Rating" },
        ].map((item) => (
          <div key={item.label} className="glass-card p-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 text-primary mb-3">
              {item.icon}
            </span>
            <p className="text-2xl md:text-3xl font-bold font-display text-foreground">{item.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustSignals;
