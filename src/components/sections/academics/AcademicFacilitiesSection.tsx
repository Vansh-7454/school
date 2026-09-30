"use client";

import React from "react";
import {
  Atom,
  Cpu,
  BookOpen,
  Trophy,
  Palette,
  Tv,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface FacilityItem {
  title: string;
  category: string;
  desc: string;
  icon: React.ElementType;
  spanClass: string;
}

const FACILITIES: FacilityItem[] = [
  {
    title: "Cavendish Science Laboratories",
    category: "Experimental Science",
    desc: "Six university-specification chemistry, biology, and physics laboratories equipped with precision fume hoods, gas chromatographs, and digital sensor probes.",
    icon: Atom,
    spanClass: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Robotics & AI MakerSpace",
    category: "Engineering & Code",
    desc: "Equipped with automated PCB laser cutters, dual-nozzle 3D resin printers, and autonomous drone testing arenas.",
    icon: Cpu,
    spanClass: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "The Great Mezzanine Library",
    category: "Archival Research",
    desc: "Over 35,000 print volumes, rare manuscripts archive, and digital subscriptions to JSTOR, Oxford Academic, and Nature.",
    icon: BookOpen,
    spanClass: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Lord Mountbatten Sports Complex",
    category: "Athletics & Swimming",
    desc: "Featuring an 8-lane heated competition pool, 4 championship squash courts, strength training suites, and FIFA astroturf.",
    icon: Trophy,
    spanClass: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Conservatory Music & Fine Arts Studio",
    category: "Performing & Visual Arts",
    desc: "Soundproof rehearsal suites with Steinway pianos, digital MIDI recording consoles, printmaking presses, and ceramics kilns.",
    icon: Palette,
    spanClass: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Circadian Smart Classrooms",
    category: "Acoustic Intelligence",
    desc: "Classrooms calibrated with anti-fatigue lighting spectrums, fresh-air displacement systems, and interactive 4K OLED canvases.",
    icon: Tv,
    spanClass: "md:col-span-2 lg:col-span-2",
  },
];

export function AcademicFacilitiesSection() {
  return (
    <Section id="academic-facilities" tone="cream">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Architectural Excellence"
        title="World-Class Learning Facilities"
        description="Purpose-built spaces uniting historic aesthetic splendour with 21st-century technological power."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FACILITIES.map((item, idx) => {
          const Icon = item.icon;

          return (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={0.1 + idx * 0.08}
              className={item.spanClass}
            >
              <Card variant="light" className="h-full p-8 justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B1B3A] text-[#DFBE72] flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-[#C9A24B]/30">
                      <Icon strokeWidth={1.75} className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#916C28] px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#0B1B3A] group-hover:text-[#916C28] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#0B1B3A]/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#C9A24B]/15 flex items-center justify-between text-xs font-medium text-[#0B1B3A]/60">
                  <span>Aurelia Campus Asset</span>
                  <Sparkles strokeWidth={1.75} className="w-3.5 h-3.5 text-[#C9A24B]" />
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}

export default AcademicFacilitiesSection;
