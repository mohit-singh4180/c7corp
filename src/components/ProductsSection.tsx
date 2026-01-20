import productConnect from "@/assets/product-connect.jpg";
import productWorkspace from "@/assets/product-workspace.jpg";

const products = [
  {
    name: "C7 Connect",
    image: productConnect,
    description:
      "A revolutionary mobile platform connecting businesses with their customers through intelligent automation and seamless experiences.",
    badge: "Coming Soon",
  },
  {
    name: "C7 Workspace",
    image: productWorkspace,
    description:
      "Transform your workflow with our AI-powered productivity suite designed for distributed teams and modern enterprises.",
    badge: "Coming Soon",
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[150px]" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
            Our Products
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Building the <span className="text-gradient">Future</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our upcoming suite of innovative applications designed to transform how modern businesses operate.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group relative rounded-2xl bg-gradient-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-primary text-foreground">
                  {product.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-3">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  <span>Available via subscription</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}