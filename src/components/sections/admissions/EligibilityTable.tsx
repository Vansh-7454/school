"use client";

import React from "react";
import { AlertCircle, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface GradeEligibility {
  level: string;
  stage: string;
  age: string;
  prerequisites: string;
  assessments: string;
  seats: string;
}

const CRITERIA: GradeEligibility[] = [
  {
    level: "Early Years Foundation",
    stage: "Pre-Nursery to KG",
    age: "3 – 5 Years",
    prerequisites: "Developmental readiness, curiosity, toilet-trained",
    assessments: "Play-based observational session & parental dialogue",
    seats: "Limited to 16/class",
  },
  {
    level: "Lower Primary",
    stage: "Grades 1 – 3",
    age: "6 – 8 Years",
    prerequisites: "Foundational phonics, basic numeracy, social collaboration",
    assessments: "Informal literacy & numeracy games, classroom trial morning",
    seats: "20 per section",
  },
  {
    level: "Upper Primary",
    stage: "Grades 4 – 5",
    age: "9 – 10 Years",
    prerequisites: "Independent reading, arithmetic fluency, previous school reports",
    assessments: "Reading comprehension, quantitative reasoning & creative writing",
    seats: "20 per section",
  },
  {
    level: "Middle Secondary",
    stage: "Grades 6 – 8",
    age: "11 – 13 Years",
    prerequisites: "Successful completion of prior grade with B+ average or equivalent",
    assessments: "Standardized CAT4 cognitive diagnostic & student interview",
    seats: "Waitlist open",
  },
  {
    level: "Cambridge IGCSE",
    stage: "Grades 9 – 10",
    age: "14 – 15 Years",
    prerequisites: "Strong academic record across sciences, math, and humanities",
    assessments: "Subject placement papers (Math, Science, English) & academic essay",
    seats: "Selective cohort",
  },
  {
    level: "IB Diploma Programme",
    stage: "Grades 11 – 12",
    age: "16 – 18 Years",
    prerequisites: "Minimum 5 IGCSE passes at Grade B/6 or international equivalent",
    assessments: "HL subject diagnostic, written motivation statement & Dean's interview",
    seats: "Scholarships available",
  },
];

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function EligibilityTable() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeader
          eyebrow="Entry Guidelines"
          title="Eligibility & Age Criteria"
          description="All candidates are evaluated against developmental age guidelines as of 1st September of the matriculating academic year."
          align="center"
        />

        {/* Desktop / Tablet Table View (hidden on mobile) */}
        <div className="hidden md:block">
          <ScrollReveal>
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#0B1B3A]/10 overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#0B1B3A] text-white text-xs font-semibold uppercase tracking-wider">
                    <th className="py-5 px-6 font-serif">Academic Level</th>
                    <th className="py-5 px-6 font-serif">Grades Covered</th>
                    <th className="py-5 px-6 font-serif">Required Age</th>
                    <th className="py-5 px-6 font-serif">Prerequisites</th>
                    <th className="py-5 px-6 font-serif">Assessment Method</th>
                    <th className="py-5 px-6 font-serif text-right">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1B3A]/10 text-sm font-sans">
                  {CRITERIA.map((row, idx) => (
                    <tr
                      key={row.level}
                      className={`hover:bg-white/80 transition-colors ${
                        idx % 2 === 0 ? "bg-[#FAF8F5]" : "bg-white/50"
                      }`}
                    >
                      <td className="py-5 px-6 font-serif font-bold text-[#0B1B3A]">
                        {row.level}
                      </td>
                      <td className="py-5 px-6 font-medium text-[#0B1B3A]/80">
                        {row.stage}
                      </td>
                      <td className="py-5 px-6 text-[#C9A24B] font-semibold whitespace-nowrap">
                        {row.age}
                      </td>
                      <td className="py-5 px-6 text-[#0B1B3A]/70 text-xs leading-relaxed max-w-xs">
                        {row.prerequisites}
                      </td>
                      <td className="py-5 px-6 text-[#0B1B3A]/70 text-xs leading-relaxed max-w-xs">
                        {row.assessments}
                      </td>
                      <td className="py-5 px-6 text-right font-medium text-xs text-[#0B1B3A]/60">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#0B1B3A]/5 text-[#0B1B3A] text-[11px] font-semibold">
                          {row.seats}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Card View (< 768px) */}
        <div className="md:hidden space-y-4">
          {CRITERIA.map((row, idx) => (
            <ScrollReveal key={row.level} delay={idx * 0.05}>
              <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-6 border border-[#0B1B3A]/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
                    {row.stage}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0B1B3A]/10 text-[#0B1B3A] text-[10px] font-semibold">
                    {row.seats}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#0B1B3A]">
                  {row.level}
                </h3>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1B3A]">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Age: {row.age}</span>
                </div>

                <div className="pt-2 border-t border-[#0B1B3A]/10 text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block mb-0.5">
                      Prerequisites:
                    </span>
                    <span className="text-[#0B1B3A]/70">{row.prerequisites}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B1B3A] block mb-0.5">
                      Assessment:
                    </span>
                    <span className="text-[#0B1B3A]/70">{row.assessments}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footnote callout */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 p-5 rounded-2xl bg-[#0B1B3A]/5 border border-[#0B1B3A]/10 flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#0B1B3A]/70 leading-relaxed font-sans">
              <strong className="text-[#0B1B3A] font-semibold">Important Consideration:</strong> Mid-term
              transfers and relocating diplomatic families with differing school calendar alignments are evaluated on a
              case-by-case basis. Please indicate transition timing on your enquiry form.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
