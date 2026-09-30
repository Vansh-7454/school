"use client";

import React from "react";
import {
  Globe2,
  Binary,
  Atom,
  BookOpen,
  Cpu,
  Palette,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface HighlightCard {
  title: string;
  focus: string;
  desc: string;
  icon: React.ElementType;
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    title: "Languages & Linguistics",
    focus: "English, French, Spanish, Mandarin & Latin",
    desc: "Developing bilingual and trilingual fluency, classical etymology, and persuasive rhetoric for global diplomatic engagement.",
    icon: Globe2,
  },
  {
    title: "Pure & Applied Mathematics",
    focus: "Calculus, Statistics, Discrete Modelling & Proofs",
    desc: "Rigorous analytical training moving beyond rote calculation into elegant problem-solving, mathematical Olympiads, and logic.",
    icon: Binary,
  },
  {
    title: "Experimental Sciences",
    focus: "Biology, Chemistry, Physics & Environmental Systems",
    desc: "Empirical inquiry conducted in university-specification labs with automated sensor arrays, spectrometers, and organic hoods.",
    icon: Atom,
  },
  {
    title: "Humanities & Social Sciences",
    focus: "History, Philosophy, Economics & Global Politics",
    desc: "Interrogating historical archives, geopolitical dynamics, and philosophical ethics to cultivate informed, compassionate world citizens.",
    icon: BookOpen,
  },
  {
    title: "Computer Science & Artificial Intelligence",
    focus: "Algorithms, Robotics, Neural Networks & Cybersecurity",
    desc: "Hands-on software architecture, machine learning model fine-tuning, and algorithmic ethics in our dedicated STEM pavilion.",
    icon: Cpu,
  },
  {
    title: "Visual & Performing Arts",
    focus: "Chamber Music, Theatre, Sculpture, Film & Oil Atelier",
    desc: "Daily creative immersion led by visiting artists and conservatory musicians in our 400-seat acoustic Great Hall.",
    icon: Palette,
  },
];

export function CurriculumHighlightsSection() {
  return (
    <Section id="curriculum-highlights" tone="white">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Core Disciplines"
        title="Curriculum Highlights"
        description="Six pillars of scholarly investigation preparing students for mastery across diverse academic horizons."
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {HIGHLIGHTS.map((item, idx) => {
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
                      {item.focus}
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

export default CurriculumHighlightsSection;
