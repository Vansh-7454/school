import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconType = LucideIcon | React.ElementType<{ className?: string; strokeWidth?: number | string }>;

export interface IconBoxProps {
  icon: IconType;
  variant?: "gold" | "navy" | "cream";
  tone?: "gold" | "navy" | "cream";
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
}

/**
 * Standardized 48px rounded gold-tint icon container ensuring visual alignment across all cards.
 */
export function IconBox({
  icon: Icon,
  variant,
  tone = "gold",
  size = "md",
  className,
  iconClassName,
}: IconBoxProps) {
  const activeVariant = variant || tone;
  const sizeClasses = {
    sm: "w-10 h-10 rounded-xl",
    md: "w-12 h-12 rounded-2xl",
    lg: "w-14 h-14 rounded-2xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantClasses = {
    gold: "bg-[#C9A24B]/15 text-[#C9A24B] border border-[#C9A24B]/30",
    navy: "bg-[#0B1B3A] text-[#C9A24B] border border-[#C9A24B]/20",
    cream: "bg-[#FBF6EA] text-[#0B1B3A] border border-[#0B1B3A]/10",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105",
        sizeClasses[size],
        variantClasses[activeVariant],
        className
      )}
    >
      <Icon strokeWidth={1.75} className={cn(iconSizes[size], iconClassName)} />
    </div>
  );
}

export default IconBox;
