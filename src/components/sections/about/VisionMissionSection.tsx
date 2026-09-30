"use client";

import React from "react";
import { Compass, Eye, Sparkles, Target } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function VisionMissionSection() {
  return (
    <Section id="vision-mission" tone="white">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Guiding Principles"
        title="Our Vision & Mission"
        description="The dual pillars that shape our institutional decisions, curriculum design, and pastoral sanctuary."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Vision Card */}
        <ScrollReveal direction="up" delay={0.15}>
          <Card variant="light" className="h-full p-8 sm:p-12 justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#0B1B3A] text-[#DFBE72] flex items-center justify-center mb-6 shadow-md border border-[#C9A24B]/30">
                <Eye strokeWidth={1.75} className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#916C28] block mb-2">
                The Aspiration
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B1B3A] mb-4">
                Our Vision
              </h3>
              <p className="text-base text-[#0B1B3A]/75 leading-relaxed">
                To be the world’s pre-eminent humanist international school, empowering generations of scholars
                who navigate global complexity with moral clarity, artistic sensibility, and transformative
                scientific intellect.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9A24B]/15 flex items-center gap-2 text-xs font-medium text-[#0B1B3A]/70">
              <Sparkles strokeWidth={1.75} className="w-4 h-4 text-[#916C28]" />
              <span>Illuminating pathways to global leadership</span>
            </div>
          </Card>
        </ScrollReveal>

        {/* Mission Card */}
        <ScrollReveal direction="up" delay={0.25}>
          <Card variant="light" className="h-full p-8 sm:p-12 justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#0B1B3A] text-[#DFBE72] flex items-center justify-center mb-6 shadow-md border border-[#C9A24B]/30">
                <Target strokeWidth={1.75} className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-[#916C28] block mb-2">
                The Commitment
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B1B3A] mb-4">
                Our Mission
              </h3>
              <p className="text-base text-[#0B1B3A]/75 leading-relaxed">
                To provide an intellectually rigorous, bilingual, and inclusive British-international education.
                Through personalised 1:7 mentorship, world-standard laboratories, and vibrant arts conservatories,
                we nurture curious minds, courageous hearts, and compassionate citizens.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#C9A24B]/15 flex items-center gap-2 text-xs font-medium text-[#0B1B3A]/70">
              <Compass strokeWidth={1.75} className="w-4 h-4 text-[#916C28]" />
              <span>Nurturing minds, inspiring excellence, shaping tomorrow</span>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </Section>
  );
}

export default VisionMissionSection;
