"use client";

import React from "react";
import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface Leader {
  name: string;
  title: string;
  credentials: string;
  initials: string;
  quote: string;
}

const LEADERS: Leader[] = [
  {
    name: "Dame Margaret Thorne",
    title: "Head of School & Principal",
    credentials: "DBE, MA (Oxon), MEd (Harvard)",
    initials: "MT",
    quote: "True education does not merely impart knowledge; it awakens an unyielding curiosity and instills noble purpose.",
  },
  {
    name: "Dr. Julian Vance",
    title: "Vice Principal & Pastoral Warden",
    credentials: "PhD (Cantab), BA (Hons)",
    initials: "JV",
    quote: "A scholar flourishes only when they feel known, valued, and safe enough to embrace intellectual and creative risks.",
  },
  {
    name: "Dr. Alistair Sterling",
    title: "Head of Academics & Senior Fellow",
    credentials: "DPhil (Oxon), MSc (Imperial)",
    initials: "AS",
    quote: "Rigour without wonder is brittle; imagination without discipline is chaotic. At Aurelia, we harmonize both.",
  },
  {
    name: "Lady Evelyn Montrose",
    title: "Head of Student Life & Co-Curriculars",
    credentials: "MA (St Andrews), FRSA",
    initials: "EM",
    quote: "Character is forged on the playing fields, in the debate chamber, and under the concert hall stage lights.",
  },
];

export function LeadershipSection() {
  return (
    <Section id="leadership" tone="cream" bottomDivider="curve" nextTone="navy">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Governance & Mentorship"
        title="School Leadership"
        description="Seasoned scholars and pastoral directors guiding our educational mission with vision and steadfast care."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {LEADERS.map((leader, idx) => (
          <ScrollReveal key={idx} direction="up" delay={0.12 + idx * 0.08} className="h-full">
            <Card variant="light" className="h-full p-7 justify-between group">
              <div>
                {/* Initials Avatar in Gold Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0B1B3A] via-[#12274A] to-[#0B1B3A] border-2 border-[#C9A24B] flex items-center justify-center text-[#DFBE72] font-serif font-medium text-xl mb-5 shadow-md group-hover:scale-105 transition-transform">
                  {leader.initials}
                </div>

                <h3 className="font-serif text-xl font-medium text-[#0B1B3A] leading-snug group-hover:text-[#916C28] transition-colors">
                  {leader.name}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#916C28] block mt-1">
                  {leader.title}
                </span>
                <span className="text-[11px] text-[#0B1B3A]/60 block mt-0.5 mb-5 font-mono">
                  {leader.credentials}
                </span>

                {/* Pull Quote */}
                <div className="relative pt-4 border-t border-[#C9A24B]/15">
                  <Quote strokeWidth={1.75} className="w-4 h-4 text-[#C9A24B] fill-current opacity-40 mb-1" />
                  <p className="text-xs text-[#0B1B3A]/75 italic leading-relaxed">
                    “{leader.quote}”
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

export default LeadershipSection;
