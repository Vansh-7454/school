"use client";

import React from "react";
import {
  Compass,
  ShieldCheck,
  HeartHandshake,
  Flame,
  Palette,
  HandHelping,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface ValueItem {
  title: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
}

const VALUES: ValueItem[] = [
  {
    title: "Curiosity",
    tagline: "The Catalyst of Intellect",
    desc: "We encourage persistent inquiry, independent research, and the humility to challenge assumptions.",
    icon: Compass,
  },
  {
    title: "Integrity",
    tagline: "The Anchor of Character",
    desc: "Unwavering ethical accountability, academic honesty, and moral courage in words and actions.",
    icon: ShieldCheck,
  },
  {
    title: "Respect",
    tagline: "The Fabric of Community",
    desc: "Deep appreciation for individual dignity, cultural diversity, and international harmony.",
    icon: HeartHandshake,
  },
  {
    title: "Courage",
    tagline: "The Engine of Growth",
    desc: "The bravery to step into unknown disciplines, voice constructive dissent, and learn from setbacks.",
    icon: Flame,
  },
  {
    title: "Creativity",
    tagline: "The Language of Innovation",
    desc: "Unfettered artistic flair, cross-disciplinary experimentation, and novel problem-solving.",
    icon: Palette,
  },
  {
    title: "Service",
    tagline: "The Purpose of Privilege",
    desc: "Commitment to local civic initiatives, environmental stewardship, and global humanitarian aid.",
    icon: HandHelping,
  },
];

export function CoreValuesSection() {
  return (
    <Section id="core-values" tone="cream">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Ethical Pillars"
        title="Our Core Values"
        description="Six foundational virtues woven throughout our house competitions, seminar discussions, and pastoral care."
        align="center"
      />

      {/* 3x2 Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {VALUES.map((item, idx) => {
          const Icon = item.icon;

          return (
            <ScrollReveal key={idx} direction="up" delay={0.1 + idx * 0.08} className="h-full">
              <Card variant="light" className="h-full p-8 justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B1B3A] text-[#DFBE72] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-[#C9A24B]/30">
                    <Icon strokeWidth={1.75} className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#916C28] block mb-1">
                      {item.tagline}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#0B1B3A] group-hover:text-[#916C28] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#0B1B3A]/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}

export default CoreValuesSection;
