import React from "react";
import { Compass, FileText, PhoneCall } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { CurveDivider } from "./Dividers";

export interface InstitutionalCtaSectionProps {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  showTopCurve?: boolean;
  fromTone?: "cream" | "white";
}

/**
 * Standardized institutional final CTA section used across all inner pages.
 * Displays rich navy gradient, ambient gold lighting, grain texture, and unified actions.
 */
export function InstitutionalCtaSection({
  eyebrow = "Admissions 2026/27",
  title = "Begin Your Child’s Journey of",
  titleAccent = "Intellectual Discovery",
  description = "Join our international collegiate community in London. Book a private tour of our 45-acre heritage estate or consult with our admissions secretariat.",
  primaryAction = {
    label: "Begin Admissions Enquiry",
    href: "/admissions",
  },
  secondaryAction = {
    label: "Schedule Campus Visit",
    href: "/contact",
  },
  showTopCurve = true,
  fromTone = "white",
}: InstitutionalCtaSectionProps) {
  return (
    <section
      style={{ backgroundColor: "#0B1B3A" }}
      className="relative w-full bg-[#0B1B3A] text-[#FAF6ED] bg-grain overflow-hidden"
    >
      {/* Curved top transition divider from preceding section */}
      {showTopCurve && (
        <CurveDivider toTone={fromTone} position="top" />
      )}

      {/* Ambient background illumination */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#C9A24B]/15 blur-[130px] pointer-events-none"
      />

      <div className="relative z-10 py-20 md:py-28">
        <Container size="narrow" className="text-center">
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-[#FAF6ED] mb-6 drop-shadow-xs">
            {title}{" "}
            <span className="italic text-[#C9A24B] drop-shadow-sm">
              {titleAccent}
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#FAF6ED]/85 leading-relaxed max-w-2xl mx-auto mb-10">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryAction && (
              <Button href={primaryAction.href} variant="primary" size="lg" showArrow>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="secondary" size="lg">
                {secondaryAction.label}
              </Button>
            )}
          </div>

          {/* Direct admissions helpline footer strip */}
          <div className="mt-12 pt-8 border-t border-[#C9A24B]/20 flex flex-wrap items-center justify-center gap-6 text-xs text-[#FAF6ED]/75 font-sans">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Admissions Desk: +44 20 7946 0912</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Kensington, London W8 4QP</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Digital Prospectus Available</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default InstitutionalCtaSection;
