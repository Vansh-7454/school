import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide" | "full";
}

/**
 * Single source of truth for page container boundaries across Aurelia International School.
 * Standardizes: max-w-7xl, px-5 sm:px-8 lg:px-12
 */
export function Container({
  as: Component = "div",
  className,
  children,
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        "w-full mx-auto px-5 sm:px-8 lg:px-12",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
