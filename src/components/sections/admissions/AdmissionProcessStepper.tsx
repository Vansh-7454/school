"use client";

import React from "react";
import {
  FileText,
  MapPin,
  ClipboardCheck,
  Award,
  Clock,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ElementType;
  description: string;
  details: string[];
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Enquiry & Prospectus",
    subtitle: "Digital Expression of Interest",
    duration: "10 Minutes",
    icon: FileText,
    description:
      "Submit an initial online application with your child's recent academic transcripts and personal details.",
    details: [
      "Submit online enquiry form",
      "Receive detailed curriculum prospectus",
      "Assigned a dedicated Admissions Officer",
    ],
  },
  {
    number: "02",
    title: "Campus Discovery",
    subtitle: "Guided Tour & Dean's Welcome",
    duration: "1.5 Hours",
    icon: MapPin,
    description:
      "Join us on campus to explore science pavilions, arts ateliers, athletics arenas, and meet faculty leadership.",
    details: [
      "Personalized architectural walkthrough",
      "Interactive classroom observation",
      "Informal parent Q&A with Senior Leadership",
    ],
  },
  {
    number: "03",
    title: "Scholar Assessment",
    subtitle: "Diagnostic Review & Interview",
    duration: "Half-Day Experience",
    icon: ClipboardCheck,
    description:
      "Age-tailored diagnostic exploration assessing linguistic nuance, numeracy problem-solving, and intellectual curiosity.",
    details: [
      "Diagnostic literacy and numeracy evaluation",
      "Collaborative group project task",
      "Student dialogue with Head of Section",
    ],
  },
  {
    number: "04",
    title: "Offer & Enrolment",
    subtitle: "Formal Welcome to Aurelia",
    duration: "Within 5 Working Days",
    icon: Award,
    description:
      "Successful candidates receive a formal letter of admission, bursary decisions, and orientation schedule.",
    details: [
      "Formal admission dossier issuance",
      "Fee payment & student contract signing",
      "House allocation & uniform fitting kit",
    ],
  },
];

export function AdmissionProcessStepper() {
  return (
    <Section tone="cream">
      <Container>
        <SectionHeader
          eyebrow="Your Pathway To Admission"
          title="A Thoughtful, Transparent Journey"
          description="Our admissions process is designed to celebrate each child’s unique individuality, intellectual promise, and alignment with Aurelia’s community values."
          align="center"
        />

        {/* Stepper Grid with Horizontal Progress Line on Desktop */}
        <div className="relative">
          {/* Subtle line across desktop cards */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#C9A24B]/20 via-[#C9A24B] to-[#C9A24B]/20 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.number} delay={idx * 0.08}>
                  <Card variant="light" className="h-full flex flex-col justify-between group p-6 md:p-8">
                    {/* Top row: Icon bubble + Step Number */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <IconBox icon={Icon} tone="gold" size="md" />
                        <span className="text-3xl font-serif font-bold text-[#0B1B3A]/20 group-hover:text-[#C9A24B] transition-colors duration-300">
                          {step.number}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#916C28] mb-2">
                        <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
                        <span>{step.duration}</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#0B1B3A] mb-1.5 group-hover:text-[#916C28] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs font-semibold text-[#0B1B3A]/50 uppercase tracking-wider mb-3">
                        {step.subtitle}
                      </p>

                      <p className="text-sm text-[#0B1B3A]/70 leading-relaxed font-sans mb-6">
                        {step.description}
                      </p>
                    </div>

                    {/* Step details checklist */}
                    <div className="pt-4 border-t border-[#0B1B3A]/5 space-y-2 mt-auto">
                      {step.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-[#0B1B3A]/70 font-sans"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-1.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
