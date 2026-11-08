import { type ReactNode, type CSSProperties } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enables 3D tilt via CSS perspective on hover (JS enhancement in tilt wrapper) */
  tilt?: boolean;
  id?: string;
  style?: CSSProperties;
}

/**
 * Card — white, 1px c-line border, 22px radius, card shadow.
 * The optional tilt prop marks it for JS tilt enhancement (max 8deg).
 */
export default function Card({ children, className = "", tilt, id, style }: CardProps) {
  const computedStyle = tilt
    ? { transformStyle: "preserve-3d" as const, perspective: "900px", ...style }
    : style;

  return (
    <div
      id={id}
      data-tilt={tilt ? "true" : undefined}
      className={clsx("card w-full min-w-0 max-w-full overflow-hidden", className)}
      style={computedStyle}
    >
      {children}
    </div>
  );
}
