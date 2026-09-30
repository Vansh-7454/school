"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface JourneyStage {
  id: string;
  tabLabel: string;
  title: string;
  gradeSpan: string;
  framework: string;
  overview: string;
  subjects: string[];
  highlights: string[];
}

const STAGES: JourneyStage[] = [
  {
    id: "pre-primary",
    tabLabel: "Pre-Primary",
    title: "Early Years Foundation Stage (EYFS)",
    gradeSpan: "Ages 3 – 5 • Nursery & Reception",
    framework: "Reggio-Inspired British EYFS Framework",
    overview:
      "Igniting foundational curiosity, multilingual auditory fluency, and spatial reasoning in child-centred garden ateliers.",
    subjects: ["Sensory Mathematics", "Early Phonics & Storytelling", "French / Mandarin Immersion", "Creative Expressive Arts", "Gross Motor Movement"],
    highlights: [
      "Dedicated 1:5 educator-to-child pastoral ratio",
      "Outdoor sensory discovery in the historic orchard",
      "Montessori-calibrated manipulatives and loose parts ateliers",
      "Confidence-building through song and collaborative play",
    ],
  },
  {
    id: "primary",
    tabLabel: "Primary",
    title: "Cambridge Primary Education",
    gradeSpan: "Ages 5 – 11 • Years 1 – 6",
    framework: "Cambridge International Primary Curriculum",
    overview:
      "Establishing unwavering numeracy, eloquent spoken and written rhetoric, scientific inquiry, and empathetic global awareness.",
    subjects: ["Core English & Literature", "Cambridge Mathematics", "Primary Sciences", "World History & Geography", "Visual & Performing Arts", "Physical Education & Aquatics"],
    highlights: [
      "Rigorous Cambridge Primary progression tests and diagnostic feedback",
      "Hands-on scientific inquiry and introductory coding in MakerSpaces",
      "Orchestral instrument discovery program for every pupil",
      "House competitions in speech, cross-country, and spelling",
    ],
  },
  {
    id: "middle",
    tabLabel: "Middle School",
    title: "Cambridge Lower Secondary",
    gradeSpan: "Ages 11 – 14 • Years 7 – 9",
    framework: "Cambridge Lower Secondary & Interdisciplinary Inquiry",
    overview:
      "Bridging foundational knowledge with adolescent analytical discipline, empirical inquiry, and constructive debate.",
    subjects: ["Advanced Literature", "Pure & Applied Mathematics", "Separate Sciences (Bio, Chem, Phys)", "Computer Science & Robotics", "Global Perspectives", "Modern Foreign Languages"],
    highlights: [
      "Competitive Model United Nations and British Parliamentary debating",
      "Laboratory-certified experiments in the Cavendish Science Centre",
      "1:7 faculty mentorship cohort guiding academic study habits",
      "Expeditionary outdoor education and Duke of Edinburgh Junior Award",
    ],
  },
  {
    id: "senior",
    tabLabel: "Senior Secondary",
    title: "Cambridge IGCSE & IB Diploma",
    gradeSpan: "Ages 14 – 18 • Years 10 – 13",
    framework: "Cambridge IGCSE & International Baccalaureate (IB) Diploma",
    overview:
      "The pinnacle of pre-university scholarship, demanding rigorous research, ethical philosophical inquiry, and creative courage.",
    subjects: ["IB Theory of Knowledge (TOK)", "Extended Essay & CAS", "Higher Level Sciences & Maths", "Economics & International Relations", "Classical & Modern Languages", "Studio Art & Theatre"],
    highlights: [
      "Dual Cambridge IGCSE (Years 10-11) and IB Diploma (Years 12-13)",
      "100% university acceptance rate at top-tier global institutions",
      "Dedicated full-time Oxbridge and Ivy League university counsellors",
      "Independent 4,000-word academic thesis mentored by university fellows",
    ],
  },
];

export function LearningJourneySection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = STAGES[activeTab];

  return (
    <Section id="learning-journey" tone="cream">
      {/* Unified Section Header */}
      <SectionHeader
        eyebrow="Curricular Continuum"
        title="The Learning Journey"
        description="An unbroken pathway of academic distinction and character development from age 3 to university matriculation."
        align="center"
      />

      {/* Stage Selector Tabs */}
      <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
        <div className="inline-flex p-1.5 rounded-full bg-white border border-[#C9A24B]/35 shadow-sm gap-1 sm:gap-2">
          {STAGES.map((s, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer",
                  isActive
                    ? "text-[#0B1B3A] shadow-sm"
                    : "text-[#0B1B3A]/70 hover:text-[#0B1B3A] hover:bg-[#FBF6EA]/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="journeyActiveTab"
                    className="absolute inset-0 rounded-full gold-gradient-bg shadow-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panel with Animated Transitions */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card variant="light" className="p-8 sm:p-12 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Overview Column */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[#C9A24B]/15 text-[#916C28] border border-[#C9A24B]/30">
                      <Sparkles strokeWidth={1.75} className="w-3 h-3 text-[#916C28]" />
                      {current.framework}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B1B3A] pt-2">
                      {current.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#916C28] uppercase tracking-wider">
                      {current.gradeSpan}
                    </p>
                  </div>

                  <p className="text-base text-[#0B1B3A]/75 leading-relaxed font-normal">
                    {current.overview}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0B1B3A] block mb-2.5">
                      Sample Discipline Modules
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {current.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1 rounded-[10px] bg-[#FBF6EA] border border-[#C9A24B]/25 text-[#0B1B3A] text-xs font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Highlights Column */}
                <div className="lg:col-span-6 bg-[#FBF6EA]/70 border border-[#C9A24B]/20 rounded-[20px] p-6 sm:p-8 space-y-4">
                  <h4 className="font-serif text-lg font-medium text-[#0B1B3A] border-b border-[#C9A24B]/15 pb-3">
                    Pedagogical Highlights
                  </h4>
                  <ul className="space-y-3.5">
                    {current.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0B1B3A]/80 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#C9A24B]/20 text-[#916C28] flex items-center justify-center shrink-0 mt-0.5">
                          <Check strokeWidth={2.5} className="w-3 h-3" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

export default LearningJourneySection;
