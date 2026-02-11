import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  variant?: "primary" | "outline";
  size?: "default" | "lg";
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type Props = ButtonProps | AnchorProps;

const GradientButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ variant = "primary", size = "default", className, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "text-primary-foreground hover:brightness-110 hover:shadow-lg",
      outline: "border border-border text-foreground hover:border-primary hover:text-primary bg-background hover:shadow-sm",
    };

    const sizes = {
      default: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    };

    const gradientStyle = variant === "primary"
      ? { background: "var(--gradient-primary)", boxShadow: "var(--glow-primary)" }
      : undefined;

    const classes = cn(base, variants[variant], sizes[size], className);

    if (props.as === "a") {
      const { as: _, ...rest } = props as AnchorProps;
      return <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} style={gradientStyle} {...rest} />;
    }

    const { as: _, ...rest } = props as ButtonProps;
    return <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} style={gradientStyle} {...rest} />;
  }
);

GradientButton.displayName = "GradientButton";
export default GradientButton;
