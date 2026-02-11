import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import GradientButton from "@/components/GradientButton";

const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden"
    style={{ background: "var(--gradient-hero)" }}
    aria-label="Hero"
  >
    {/* Subtle gradient orbs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]" style={{ background: "hsl(var(--primary))" }} />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px]" style={{ background: "hsl(258 78% 58%)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.35]" style={{
        backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />
    </div>

    <div className="relative z-10 text-center max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold font-display leading-[1.1] mb-6 text-foreground">
          Innovative Solutions for{" "}
          <span className="gradient-text">Modern Businesses</span>
        </h1>

        <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-[1.7]">
          Empowering businesses with next-generation apps that transform how you connect, work, and grow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GradientButton as="a" href="#contact" size="lg">
            Get Early Access
            <ArrowRight className="w-4 h-4 ml-2" />
          </GradientButton>
          <GradientButton as="a" href="#about" variant="outline" size="lg">
            Learn More            
          </GradientButton>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
