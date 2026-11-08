import { type ReactNode } from "react";
import { clsx } from "clsx";

interface IconChipProps {
  children: ReactNode;
  className?: string;
  size?: number;
}

/**
 * IconChip — 46px rounded square with coral-to-violet gradient bg,
 * holding a lucide icon in white.
 */
export default function IconChip({ children, className = "", size = 46 }: IconChipProps) {
  return (
    <span
      className={clsx("icon-chip", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
