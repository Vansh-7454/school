import React from "react";
import { cn } from "@/lib/utils";

export type DividerTone = "cream" | "white" | "navy" | "navyDeep";

const TONE_HEX: Record<DividerTone, string> = {
  cream: "#FBF6EA",
  white: "#FFFFFF",
  navy: "#0B1B3A",
  navyDeep: "#07122A",
};

interface CurveDividerProps {
  fromTone?: DividerTone;
  toTone?: DividerTone;
  position?: "top" | "bottom";
  className?: string;
  inverted?: boolean;
}

/**
 * Curved SVG Divider bridging section transitions seamlessly without harsh horizontal lines.
 */
export function CurveDivider({
  toTone = "white",
  position = "bottom",
  className,
  inverted = false,
}: CurveDividerProps) {
  const fillColor = TONE_HEX[toTone];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full overflow-hidden leading-none select-none pointer-events-none relative z-10",
        position === "top" ? "-mb-px rotate-180" : "-mt-px",
        inverted && "scale-x-[-1]",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 lg:h-16 block"
      >
        <path
          d="M0,0 C320,54 720,64 1080,42 C1260,30 1380,10 1440,0 L1440,64 L0,64 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/**
 * Gradient Fade Divider: 120px subtle vertical transitional blend.
 */
export function GradientFadeDivider({
  fromTone = "navy",
  toTone = "cream",
  className,
}: {
  fromTone?: DividerTone;
  toTone?: DividerTone;
  className?: string;
}) {
  const fromHex = TONE_HEX[fromTone];
  const toHex = TONE_HEX[toTone];

  return (
    <div
      aria-hidden="true"
      className={cn("w-full h-16 sm:h-24 pointer-events-none select-none relative z-10", className)}
      style={{
        background: `linear-gradient(to bottom, ${fromHex} 0%, ${toHex} 100%)`,
      }}
    />
  );
}

/**
 * Thin Gold Architectural Line Divider with center diamond accent.
 */
export function GoldLineDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("w-full flex items-center justify-center py-4 select-none pointer-events-none", className)}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/35 to-[#C9A24B]/60" />
      <div className="w-2.5 h-2.5 rotate-45 border border-[#C9A24B] bg-[#0B1B3A] mx-3 shrink-0" />
      <div className="h-px flex-1 bg-gradient-to-r from-[#C9A24B]/60 via-[#C9A24B]/35 to-transparent" />
    </div>
  );
}
