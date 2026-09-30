"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProgramItem {
  stage: string;
  ageRange: string;
  description: string;
  highlights: string[];
  iconSvg: React.ReactNode;
}

const PROGRAMS: ProgramItem[] = [
  {
    stage: "Pre-Primary",
    ageRange: "Ages 3 – 5 • Nursery & Reception",
    description: "Cultivating wonder, motor dexterity, and foundational social confidence in joyful, nature-rich studios.",
    highlights: [
      "Play-based inquiry & sensory ateliers",
      "Multilingual immersion (English & French/Mandarin)",
      "Dedicated pastoral care & small ratios (1:5)",
    ],
    iconSvg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FBF6EA" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M 32 46 L 32 28 M 32 28 C 24 24 20 18 20 18 C 20 18 28 18 32 28 Z M 32 28 C 40 24 44 18 44 18 C 44 18 36 18 32 28 Z" stroke="#0B1B3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#DFBE72" />
        <circle cx="32" cy="18" r="4" fill="#C9A24B" />
        <path d="M 22 46 C 28 44 36 44 42 46" stroke="#0B1B3A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    stage: "Primary School",
    ageRange: "Ages 5 – 11 • Years 1 – 6",
    description: "Developing robust intellectual curiosity, mathematical fluency, and expressive written and artistic command.",
    highlights: [
      "Cambridge Primary Curriculum framework",
      "Hands-on scientific inquiry & MakerSpaces",
      "Chamber music, choral arts & swimming academy",
    ],
    iconSvg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FBF6EA" stroke="#C9A24B" strokeWidth="1.5" />
        {/* Compass & Star */}
        <polygon points="32,16 36,28 48,32 36,36 32,48 28,36 16,32 28,28" fill="#DFBE72" stroke="#0B1B3A" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="3" fill="#0B1B3A" />
      </svg>
    ),
  },
  {
    stage: "Middle School",
    ageRange: "Ages 11 – 14 • Years 7 – 9",
    description: "Fostering analytical discipline, ethical awareness, and creative self-expression during pivotal adolescent growth.",
    highlights: [
      "Cambridge Lower Secondary & interdisciplinary labs",
      "Competitive Model UN & parliamentary debate",
      "Robotics, algorithmic thinking & physical sciences",
    ],
    iconSvg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FBF6EA" stroke="#C9A24B" strokeWidth="1.5" />
        {/* Astrolabe / Orbit */}
        <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(-30 32 32)" stroke="#C9A24B" strokeWidth="1.5" />
        <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(30 32 32)" stroke="#0B1B3A" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="5" fill="#DFBE72" stroke="#0B1B3A" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    stage: "Senior Secondary",
    ageRange: "Ages 14 – 18 • Years 10 – 13",
    description: "Preparing tomorrow’s global pioneers for distinction through Cambridge IGCSE and the International Baccalaureate (IB).",
    highlights: [
      "Dual Cambridge IGCSE & IB Diploma pathways",
      "1-on-1 Ivy League & Oxbridge university admissions",
      "Global alumni network & international fellowships",
    ],
    iconSvg: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#FBF6EA" stroke="#C9A24B" strokeWidth="1.5" />
        {/* Graduation Torch & Laurel */}
        <path d="M 28 46 L 36 46 L 35 30 L 29 30 Z" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M 32 16 Q 24 22 28 30 Q 32 24 36 30 Q 40 22 32 16 Z" fill="#DFBE72" stroke="#0B1B3A" strokeWidth="1" />
        <circle cx="32" cy="24" r="2" fill="#FFFFFF" />
      </svg>
    ),
  },
];

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function ProgramsSection() {
  return (
    <Section id="programs" tone="cream">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Curricular Continuum"
        title="Learning for Every Stage"
        description="A seamless, world-standard continuum nurturing character, intellect, and creative ambition from early childhood to university entrance."
        align="center"
      />

      {/* 4 Premium Standardized Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {PROGRAMS.map((item, idx) => (
          <ScrollReveal key={idx} direction="up" delay={0.1 + idx * 0.08} className="h-full">
            <Card variant="light" className="h-full justify-between group">
              <div>
                {/* SVG Icon with 48px rounded-2xl Container */}
                <div className="w-14 h-14 rounded-2xl bg-[#FBF6EA] border border-[#C9A24B]/30 flex items-center justify-center p-1.5 mb-6 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300 shadow-sm">
                  {item.iconSvg}
                </div>

                {/* Stage Title & Grade Range */}
                <h3 className="font-serif text-2xl font-normal text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors">
                  {item.stage}
                </h3>
                <span className="font-sans text-xs font-semibold text-[#916C28] uppercase tracking-wider block mt-1">
                  {item.ageRange}
                </span>

                {/* Description */}
                <p className="text-sm text-[#0B1B3A]/75 leading-relaxed mt-3.5 mb-6">
                  {item.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2.5 mb-8 border-t border-[#C9A24B]/15 pt-4">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#0B1B3A]/85 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#C9A24B]/15 text-[#916C28] flex items-center justify-center shrink-0 mt-0.5">
                        <Check strokeWidth={2.5} className="w-2.5 h-2.5" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link at Bottom */}
              <div className="pt-4 border-t border-[#C9A24B]/15 mt-auto">
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B1B3A] group-hover:text-[#C9A24B] transition-colors"
                >
                  <span>Explore curriculum</span>
                  <ArrowRight strokeWidth={1.75} className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

export default ProgramsSection;
