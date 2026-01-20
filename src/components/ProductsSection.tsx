import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import productConnect from "@/assets/product-connect.jpg";
import productWorkspace from "@/assets/product-workspace.jpg";

const productImages = [productConnect, productWorkspace];

export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[150px]" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Our Products
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Building the <span className="text-gradient">Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our upcoming suite of innovative applications designed to transform how modern businesses operate.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {siteConfig.products.map((product, index) => (
            <div
              key={product.name}
              className="group relative rounded-3xl bg-background border border-border overflow-hidden shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2"
            >
              {/* Badge */}
              <div className="absolute top-5 right-5 z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-primary text-primary-foreground shadow-glow">
                  {product.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-subtle">
                <img
                  src={productImages[index]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {product.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-primary group-hover:shadow-glow">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>{product.subscriptionNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}