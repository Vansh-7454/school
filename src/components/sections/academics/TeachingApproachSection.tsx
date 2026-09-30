"use client";

import React from "react";
import Link from "next/link";
import {
  Lightbulb,
  Workflow,
  Sparkles,
  GraduationCap,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Step {
  step: string;
  name: string;
  tagline: string;
  desc: string;
  icon: React.ElementType;
  points: string[];
}

const STEPS: Step[] = [
  {
    step: "01",
    name: "Learn",
    tagline: "Foundational Inquiry & Socratic Dialogue",
    desc: "Students build mastery of foundational concepts through rigorous inquiry, small-group seminars, and primary source interrogation rather than passive lecture absorption.",
    icon: Lightbulb,
    points: [
      "Small-cohort seminar pedagogy (max 18 students)",
      "Cross-disciplinary contextual reading",
      "Concept mapping & mathematical derivation",
    ],
  },
  {
    step: "02",
    name: "Apply",
    tagline: "Empirical Testing & Creative Synthesis",
    desc: "Theory transforms into tangible work inside advanced wet-labs, fabrication makerspaces, design ateliers, and collaborative field expeditions across regional ecosystems.",
    icon: Workflow,
    points: [
      "Laboratory testing with automated sensors",
      "Prototyping, robotics coding & studio sculpture",
      "Real-world case studies and community field surveys",
    ],
  },
  {
    step: "03",
    name: "Reflect",
    tagline: "Metacognitive Critique & Portfolio Defence",
    desc: "True intellectual ownership solidifies through structured reflection, peer review, and capstone portfolio presentations defending original hypotheses before faculty juries.",
    icon: Sparkles,
    points: [
      "Formative feedback loops & self-assessment rubrics",
      "Annual Capstone Research Symposium defense",
      "Longitudinal digital academic portfolio tracking",
    ],
  },
];

export function TeachingApproachSection() {
  return (
    <Section id="teaching-approach" tone="navy">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#162A56] rounded-full blur-3xl pointer-events-none" />

      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Pedagogical Framework"
        title="The Tripartite Learning Cycle"
        description="Our continuous loop of inquiry, execution, and metacognition prepares scholars not merely to pass examinations, but to think with original clarity."
        align="center"
        tone="navy"
      />

      {/* 3-Step Process Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative mb-20 md:mb-24">
        {STEPS.map((s, index) => {
          const Icon = s.icon;
          return (
            <ScrollReveal key={s.step} delay={index * 0.15} className="h-full">
              <Card variant="dark" className="h-full p-7 sm:p-8 justify-between group relative">
                <div>
                  {/* Top row: step number + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-[#C9A24B]/40 group-hover:text-[#DFBE72] transition-colors duration-300">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#DFBE72] transition-colors duration-300">
                      <Icon strokeWidth={1.75} className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-normal text-[#FBF6EA] mb-2">
                    {s.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#DFBE72] mb-4">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-[#FBF6EA]/75 leading-relaxed font-sans mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-6 border-t border-[#FBF6EA]/10 space-y-2.5 mt-auto">
                  {s.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#FBF6EA]/80 font-sans">
                      <CheckCircle2 strokeWidth={1.75} className="w-4 h-4 text-[#DFBE72] flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Unified Admissions CTA Banner */}
      <ScrollReveal delay={0.2}>
        <div className="bg-gradient-to-r from-[#07122A]/95 via-[#0B1B3A]/90 to-[#07122A]/95 rounded-[24px] p-8 sm:p-12 md:p-16 border border-[#C9A24B]/35 relative overflow-hidden shadow-2xl">
          {/* Ambient decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 text-[#DFBE72] text-xs font-semibold tracking-wider uppercase mb-5">
              <GraduationCap strokeWidth={1.75} className="w-3.5 h-3.5" />
              <span>Admissions 2026 / 2027</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#FBF6EA] tracking-tight mb-4">
              Experience Intellectual Distinction in Action
            </h3>

            <p className="text-base sm:text-lg text-[#FBF6EA]/75 font-sans leading-relaxed mb-8">
              Tour our state-of-the-art laboratories, observe live seminar discussions, and converse with academic deans on an individual campus tour.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/admissions">
                <Button variant="primary" size="lg" showArrow>
                  Explore Admissions &amp; Apply
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  <CalendarCheck strokeWidth={1.75} className="w-4 h-4 text-[#DFBE72]" />
                  <span>Request Prospectus</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
