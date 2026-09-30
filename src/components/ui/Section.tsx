import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { CurveDivider, GradientFadeDivider, type DividerTone } from "./Dividers";

export type SectionTone = "cream" | "white" | "navy" | "navyDeep";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  tone?: SectionTone;
  containerSize?: "default" | "narrow" | "wide" | "full";
  noContainer?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  topDivider?: "curve" | "fade" | "none";
  bottomDivider?: "curve" | "fade" | "none";
  previousTone?: DividerTone;
  nextTone?: DividerTone;
}

const TONE_STYLES: Record<
  SectionTone,
  {
    bgClass: string;
    textClass: string;
    isDark: boolean;
  }
> = {
  cream: {
    bgClass: "bg-[#FBF6EA]",
    textClass: "text-[#0B1B3A]",
    isDark: false,
  },
  white: {
    bgClass: "bg-white",
    textClass: "text-[#0B1B3A]",
    isDark: false,
  },
  navy: {
    bgClass: "bg-[#0B1B3A] bg-grain",
    textClass: "text-[#FAF6ED]",
    isDark: true,
  },
  navyDeep: {
    bgClass: "bg-[#07122A] bg-grain",
    textClass: "text-[#FAF6ED]",
    isDark: true,
  },
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  {
    id,
    tone = "cream",
    containerSize = "default",
    noContainer = false,
    className,
    containerClassName,
    children,
    topDivider = "none",
    bottomDivider = "none",
    previousTone,
    nextTone,
    ...props
  },
  ref
) {
  const currentTone = TONE_STYLES[tone];

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-200",
        currentTone.bgClass,
        currentTone.textClass,
        className
      )}
      {...props}
    >
      {/* Top transition divider if requested */}
      {topDivider === "curve" && previousTone && (
        <CurveDivider toTone={previousTone} position="top" />
      )}
      {topDivider === "fade" && previousTone && (
        <GradientFadeDivider fromTone={previousTone} toTone={tone} />
      )}

      {/* Ambient background decoration for dark sections */}
      {currentTone.isDark && (
        <>
          <div
            aria-hidden="true"
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#C9A24B]/5 blur-[120px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 -right-32 w-[450px] h-[450px] rounded-full bg-[#3162A5]/10 blur-[140px] pointer-events-none"
          />
        </>
      )}

      {/* Ambient decorative subtle warm tone for light sections */}
      {!currentTone.isDark && (
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C9A24B]/[0.035] blur-[100px] pointer-events-none"
        />
      )}

      {/* Main Section Inner Content */}
      <div className="relative z-10 py-20 md:py-28 lg:py-32">
        {noContainer ? (
          children
        ) : (
          <Container size={containerSize} className={containerClassName}>
            {children}
          </Container>
        )}
      </div>

      {/* Bottom transition divider if requested */}
      {bottomDivider === "curve" && nextTone && (
        <CurveDivider toTone={nextTone} fromTone={tone} position="bottom" />
      )}
      {bottomDivider === "fade" && nextTone && (
        <GradientFadeDivider fromTone={tone} toTone={nextTone} />
      )}
    </section>
  );
});

export default Section;
