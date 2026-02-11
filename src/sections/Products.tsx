import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  MessagesSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { Product } from "@/types";
import React from "react";

const ICON_MAP: Record<string, React.ReactNode> = {
  brain: <Brain className="w-6 h-6" aria-hidden="true" />,
  workspace: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
  connect: <MessagesSquare className="w-6 h-6" aria-hidden="true" />,
  analytics: <BarChart3 className="w-6 h-6" aria-hidden="true" />,
};

const PRODUCTS: Product[] = [
  {
    title: "AI Pulse",
    description:
      "A global source for machine learning news, covering innovations, research trends, and AI developments from around the world.",
    icon: "brain",
    link: "https://aipulse.c7corp.com/",
    target: "_blank"
  },
  {
    title: "C7 Connect",
    description:
      "Real-time collaboration platform that brings your team together. Share files, manage projects, and communicate seamlessly across departments and time zones.",
    icon: "connect",
    link: "#contact",
    target: "_self"
  },
  {
    title: "C7 Analytics",
    description:
      "Transform raw data into actionable insights with powerful visualization tools. Make informed decisions faster with real-time dashboards and predictive analytics.",
    icon: "analytics",
    link: "#contact",
    target: "_self"
  },
  {
    title: "C7 Workspace",
    description:
      "Transform your workflow with our AI-powered productivity suite designed for distributed teams and modern enterprises.",
    icon: "workspace",
    comingSoon: true,
  },
];

const Products = () => (
  <section id="products" className="section-padding" aria-label="Our products">
    <div className="container mx-auto">
      <SectionHeading
        label="Our Products"
        title="Building the Future"
        highlight="Future"
        description="Discover our suite of innovative applications designed to transform how modern businesses operate."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {PRODUCTS.map((product, i) => {
          const isDisabled = product.comingSoon;
          const isClickable = product.link && !isDisabled;
          const CardWrapper = isClickable ? "a" : "div";

          return (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <CardWrapper
                {...(isClickable && {
                  href: product.link,
                  target: product.target,
                  rel: "noopener noreferrer",
                })}
                aria-label={
                  isDisabled
                    ? `${product.title} (Coming soon)`
                    : `Explore ${product.title}`
                }
                aria-disabled={isDisabled || undefined}
                className={`glass-card p-8 flex flex-col items-start gap-4 group transition-all duration-300 h-full ${
                  isClickable
                    ? "hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    : "opacity-70 cursor-not-allowed"
                }`}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors duration-300">
                  {ICON_MAP[product.icon]}
                </span>

                <h3 className="font-display font-semibold text-lg">
                  {product.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-[1.7] flex-1">
                  {product.description}
                </p>

                {isDisabled ? (
                  <span className="text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/20">
                    Coming Soon
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Explore Product <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </CardWrapper>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Products;
