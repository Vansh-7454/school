"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Standardized Luxury Card component with hover elevation and cursor glow.
 */
export function Card({
  variant = "light",
  interactive = true,
  className,
  children,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const isLight = variant === "light";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-[24px] p-5 sm:p-7 md:p-8 transition-all duration-300 flex flex-col h-full overflow-hidden",
        isLight
          ? "bg-white text-[#0B1B3A] border border-[#C9A24B]/20 shadow-[0_4px_20px_-4px_rgba(11,27,58,0.06),0_12px_32px_-8px_rgba(11,27,58,0.08)]"
          : "bg-[#122347]/90 text-[#FAF6ED] border border-[#FAF6ED]/10 shadow-[0_10px_35px_-10px_rgba(6,15,34,0.4)]",
        interactive &&
          "hover:-translate-y-1.5 hover:border-[#C9A24B]/60 hover:shadow-[0_20px_45px_-12px_rgba(201,162,75,0.18)]",
        className
      )}
      {...props}
    >
      {/* Interactive Cursor Tracking Radial Glow - only on fine pointer devices */}
      {interactive && mousePos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[24px] opacity-100 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 162, 75, ${
              isLight ? 0.08 : 0.14
            }), transparent 70%)`,
          }}
        />
      )}

      {/* Card Content with proper z-index */}
      <div className="relative z-10 flex flex-col flex-1">{children}</div>
    </div>
  );
}

export default Card;
