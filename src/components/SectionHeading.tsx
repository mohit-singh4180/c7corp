import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
}

/** Reusable section heading with gradient highlight word. */
const SectionHeading = ({ label, title, highlight, description, className }: SectionHeadingProps) => (
  <div className={cn("text-center max-w-2xl mx-auto mb-12 md:mb-16", className)}>
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">
      {label}
    </span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
      {highlight ? (
        <>
          {title.split(highlight)[0]}
          <span className="gradient-text">{highlight}</span>
          {title.split(highlight)[1]}
        </>
      ) : title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionHeading;
