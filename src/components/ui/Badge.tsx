import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "light" | "dark" | "gold";
  className?: string;
  children: React.ReactNode;
}

/**
 * Standardized pill badge/tag component for categories, status, and terms.
 */
export function Badge({
  variant = "light",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    light: "bg-[#C9A24B]/15 text-[#0B1B3A] border border-[#C9A24B]/35",
    dark: "bg-white/10 text-[#FAF6ED] border border-[#C9A24B]/30",
    gold: "bg-gradient-to-r from-[#DFBE72]/20 to-[#C9A24B]/20 text-[#916C28] border border-[#C9A24B]/50",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-sans select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
