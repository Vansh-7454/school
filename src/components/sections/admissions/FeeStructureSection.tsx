"use client";

import React from "react";
import { Check, Info, Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface PlanTier {
  id: string;
  name: string;
  stage: string;
  grades: string;
  annualFee: string;
  termFee: string;
  popular?: boolean;
  tagline: string;
  inclusions: string[];
}

const TIERS: PlanTier[] = [
  {
    id: "pre-primary",
    name: "Early Years Foundation",
    stage: "Pre-Primary",
    grades: "Nursery, LKG & UKG",
    annualFee: "£14,800",
    termFee: "£4,933 / Term (3 Terms)",
    tagline: "Nurturing sensory discovery, social play, and foundational inquiry.",
    inclusions: [
      "All learning manipulatives & art media",
      "Organic morning snack & hot chef lunch",
      "Specialist music & foreign language discovery",
      "Access to bespoke sensory outdoor courtyard",
      "Daily digital portfolio updates for parents",
    ],
  },
  {
    id: "primary-middle",
    name: "Cambridge Lower & Middle",
    stage: "Primary & Middle School",
    grades: "Grades 1 through 8",
    annualFee: "£18,600",
    termFee: "£6,200 / Term (3 Terms)",
    popular: true,
    tagline: "Building analytical acumen, scientific inquiry, and global literacy.",
    inclusions: [
      "Full academic tuition & laboratory apparatus",
      "All textbooks, digital licenses & iPad suite",
      "Daily co-curricular clubs & athletic leagues",
      "Nutritious hot lunch & afternoon tea",
      "Curriculum day field trips & museum entry",
      "Comprehensive pastoral care & tutoring",
    ],
  },
  {
    id: "senior-secondary",
    name: "IGCSE & IB Diploma",
    stage: "Senior Secondary",
    grades: "Grades 9 through 12",
    annualFee: "£22,400",
    termFee: "£7,466 / Term (3 Terms)",
    tagline: "Pre-university mastery, empirical research, and leadership honours.",
    inclusions: [
      "Advanced wet-lab consumables & high-spec laptop",
      "Cambridge IGCSE & IB examination registration fees",
      "Dedicated 1-on-1 Ivy League/Oxbridge counseling",
      "Extended Essay & CAS expedition bursary",
      "Great Hall performances & regatta rowing squad",
      "Global alumni network mentorship access",
    ],
  },
];

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function FeeStructureSection() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeader
          eyebrow="Investment In Excellence"
          title="Transparent Tuition & Inclusions"
          description="Our fee structure is all-inclusive, ensuring scholars have full access to our world-class pedagogy, cutting-edge technology, and nutritious dining without hidden surprise fees."
          align="center"
        />

        {/* 3 Fee Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-12">
          {TIERS.map((tier, idx) => (
            <ScrollReveal key={tier.id} delay={idx * 0.08}>
              <Card
                variant={tier.popular ? "dark" : "light"}
                className={`p-5 sm:p-8 md:p-9 flex flex-col justify-between h-full relative ${
                  tier.popular ? "border-2 border-[#C9A24B] shadow-2xl" : ""
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C9A24B] to-[#DFBA6B] text-[#0B1B3A] text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Comprehensive</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        tier.popular ? "text-[#C9A24B]" : "text-[#C9A24B]"
                      }`}
                    >
                      {tier.stage}
                    </span>
                    <h3
                      className={`text-2xl font-serif font-bold mt-1 ${
                        tier.popular ? "text-white" : "text-[#0B1B3A]"
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 ${
                        tier.popular ? "text-white/60" : "text-[#0B1B3A]/50"
                      }`}
                    >
                      {tier.grades}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-6 border-y border-current/10 my-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">
                        {tier.annualFee}
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          tier.popular ? "text-white/60" : "text-[#0B1B3A]/60"
                        }`}
                      >
                        / Per Annum
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-1 font-sans ${
                        tier.popular ? "text-[#C9A24B]" : "text-[#0B1B3A]/70"
                      }`}
                    >
                      {tier.termFee}
                    </p>
                  </div>

                  <p
                    className={`text-xs leading-relaxed mb-6 font-sans ${
                      tier.popular ? "text-white/80" : "text-[#0B1B3A]/70"
                    }`}
                  >
                    {tier.tagline}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-8">
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        tier.popular ? "text-white/60" : "text-[#0B1B3A]/50"
                      }`}
                    >
                      What is included:
                    </p>
                    {tier.inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-sans">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            tier.popular
                              ? "bg-[#C9A24B] text-[#0B1B3A]"
                              : "bg-[#0B1B3A]/10 text-[#0B1B3A]"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span
                          className={tier.popular ? "text-white/90" : "text-[#0B1B3A]/80"}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#enquiry-form"
                  className={`w-full h-12 rounded-full font-semibold text-xs tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#C9A24B] to-[#DFBA6B] text-[#0B1B3A] hover:brightness-105 shadow-md shadow-[#C9A24B]/20"
                      : "bg-[#0B1B3A] text-[#FBF6EA] hover:bg-[#162A56]"
                  }`}
                >
                  <span>Enquire For This Level</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Demo Disclaimer Box */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 rounded-[24px] bg-[#C9A24B]/10 border border-[#C9A24B]/30 flex items-start gap-4">
            <Info className="w-5 h-5 text-[#C9A24B] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#0B1B3A]/80 leading-relaxed font-sans">
              <strong className="text-[#0B1B3A] font-semibold">
                Illustrative Demonstration Disclaimer:
              </strong>{" "}
              All monetary figures shown above are sample figures provided strictly for website demonstration and planning purposes. Official bespoke fee schedules, sibling fee concessions, and merit-based bursary criteria are available upon request through the Admissions Registrar.
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
