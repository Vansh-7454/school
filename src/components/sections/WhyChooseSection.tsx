"use client";

import React from "react";
import {
  Cpu,
  Tv,
  Trophy,
  Palette,
  ShieldCheck,
  Compass,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface BentoItem {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  spanClass: string;
  patternType: "grid" | "orbits" | "waves" | "dots";
}

const BENTO_FEATURES: BentoItem[] = [
  {
    title: "Robotics & Quantum STEM Pavilions",
    subtitle: "Next-Generation Discovery",
    description:
      "A 12,000 sq ft research pavilion equipped with dual-head 3D fabrication printers, algorithmic simulation pods, and micro-robotics workbenches.",
    icon: Cpu,
    spanClass: "md:col-span-2 lg:col-span-2",
    patternType: "orbits",
  },
  {
    title: "Smart Ergonomic Classrooms",
    subtitle: "Acoustic Intelligence",
    description:
      "Engineered with circadian-rhythm spectrum lighting, acoustic architectural timber, and 4K interactive collaborative presentation canvases.",
    icon: Tv,
    spanClass: "md:col-span-1 lg:col-span-1",
    patternType: "grid",
  },
  {
    title: "Olympic Sports Academy",
    subtitle: "Athletic Excellence",
    description:
      "Featuring the newly refurbished Lord Mountbatten Aquatic Centre, 8-lane all-weather tartan athletics tracks, and indoor tennis arenas.",
    icon: Trophy,
    spanClass: "md:col-span-1 lg:col-span-1",
    patternType: "dots",
  },
  {
    title: "Conservatory Arts & Orchestral Studio",
    subtitle: "Creative Distinction",
    description:
      "A 400-seat acoustic auditorium with Steinway Model D concert pianos, digital recording studios, and an open-air sculpture courtyard.",
    icon: Palette,
    spanClass: "md:col-span-2 lg:col-span-2",
    patternType: "waves",
  },
  {
    title: "Safe & Caring Heritage Campus",
    subtitle: "Sanctuary of Wellbeing",
    description:
      "24/7 access-controlled gates, full-time paediatric nurses, pastoral house system, and mature parklands offering an idyllic environment.",
    icon: ShieldCheck,
    spanClass: "md:col-span-1 lg:col-span-1",
    patternType: "grid",
  },
  {
    title: "Personal Mentoring & Oxbridge Gateway",
    subtitle: "1:7 Advisor Cohort",
    description:
      "Bespoke university advisory providing continuous diagnostic feedback, mock admissions interviews, and bespoke scholarship preparation.",
    icon: Compass,
    spanClass: "md:col-span-2 lg:col-span-2",
    patternType: "orbits",
  },
];

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CurveDivider } from "@/components/ui/Dividers";

export function WhyChooseSection() {
  return (
    <Section id="why-choose-us" tone="white">
      {/* Section Header */}
      <SectionHeader
        eyebrow="The Aurelia Edge"
        title="Why Choose Aurelia"
        description="State-of-the-art facilities crafted to unleash every student’s intellectual, artistic, and athletic capabilities."
        align="center"
      />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {BENTO_FEATURES.map((tile, idx) => {
          const Icon = tile.icon;

          return (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={0.1 + idx * 0.08}
              className={tile.spanClass}
            >
              <Card variant="light" className="group justify-between">
                {/* Subtle Background Pattern */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
                  aria-hidden="true"
                >
                  {tile.patternType === "orbits" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="85%" cy="20%" r="90" stroke="#C9A24B" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                      <circle cx="85%" cy="20%" r="140" stroke="#C9A24B" strokeWidth="0.8" fill="none" />
                    </svg>
                  )}
                  {tile.patternType === "grid" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-bento-${idx}`} width="24" height="24" patternUnits="userSpaceOnUse">
                          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#0B1B3A" strokeWidth="0.5" strokeOpacity="0.25" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-bento-${idx})`} />
                    </svg>
                  )}
                  {tile.patternType === "waves" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0 60 Q 90 20 180 60 T 360 60 T 540 60" stroke="#C9A24B" strokeWidth="1.2" fill="none" opacity="0.6" />
                      <path d="M 0 90 Q 90 50 180 90 T 360 90 T 540 90" stroke="#C9A24B" strokeWidth="1" fill="none" opacity="0.4" />
                    </svg>
                  )}
                  {tile.patternType === "dots" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`dots-bento-${idx}`} width="18" height="18" patternUnits="userSpaceOnUse">
                          <circle cx="2" cy="2" r="1.5" fill="#C9A24B" opacity="0.4" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#dots-bento-${idx})`} />
                    </svg>
                  )}
                </div>

                {/* Icon & Title */}
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B1B3A] text-[#C9A24B] border border-[#C9A24B]/20 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Icon strokeWidth={1.75} className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#916C28] block mb-1">
                      {tile.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors">
                      {tile.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#0B1B3A]/75 leading-relaxed max-w-xl">
                    {tile.description}
                  </p>
                </div>

                {/* Bottom Hairline Highlight */}
                <div className="relative z-10 pt-6 mt-6 border-t border-[#C9A24B]/20 flex items-center justify-between text-xs font-semibold text-[#0B1B3A]/70">
                  <span className="tracking-wide uppercase text-[11px]">Aurelia Standard</span>
                  <Sparkles strokeWidth={1.75} className="w-3.5 h-3.5 text-[#C9A24B] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Bottom curve transitioning seamlessly to DayTimelineSection (navy) */}
      <CurveDivider toTone="navy" fromTone="white" position="bottom" />
    </Section>
  );
}

export default WhyChooseSection;
