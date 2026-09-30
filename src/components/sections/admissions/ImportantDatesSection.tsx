"use client";

import React from "react";
import { BellRing } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface KeyDate {
  date: string;
  month: string;
  year: string;
  title: string;
  status: "Open" | "Upcoming" | "Final Call";
  desc: string;
  audience: string;
}

const DATES: KeyDate[] = [
  {
    date: "01",
    month: "SEP",
    year: "2026",
    title: "Admissions Applications Open",
    status: "Open",
    desc: "Digital application portal opens for all grade levels for the 2027/28 academic intake year.",
    audience: "Pre-Primary to Grade 11",
  },
  {
    date: "15",
    month: "NOV",
    year: "2026",
    title: "Priority Early-Action Deadline",
    status: "Upcoming",
    desc: "Recommended deadline for scholarship applicants and families requesting sibling preference.",
    audience: "All Applicants",
  },
  {
    date: "07-12",
    month: "DEC",
    year: "2026",
    title: "Assessment & Scholar Discovery Week",
    status: "Upcoming",
    desc: "Cognitive CAT4 diagnostic sessions, classroom trial visits, and dean interviews conducted on campus.",
    audience: "Shortlisted Candidates",
  },
  {
    date: "18",
    month: "JAN",
    year: "2027",
    title: "First Round Offers & Results Issuance",
    status: "Upcoming",
    desc: "Official formal letters of admission and scholarship awards dispatched via digital portal.",
    audience: "Early-Action Cohort",
  },
  {
    date: "28",
    month: "FEB",
    year: "2027",
    title: "Final Enrolment Confirmation Date",
    status: "Final Call",
    desc: "Seat acceptance deadline and deposit submission to guarantee enrolled placement.",
    audience: "Admitted Students",
  },
];

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function ImportantDatesSection() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeader
          eyebrow="Admissions Calendar"
          title="Key Dates & Milestones (2026 / 2027)"
          description="Keep track of key submission milestones, assessment windows, and notification deadlines to guarantee priority review of your child's application."
          align="center"
        />

        {/* Compact Calendar List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {DATES.map((item, idx) => {
            return (
              <ScrollReveal key={item.title} delay={idx * 0.06}>
                <Card
                  variant="light"
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                >
                  {/* Left: Date Badge & Event Details */}
                  <div className="flex items-start sm:items-center gap-5 w-full sm:w-auto">
                    {/* Calendar Badge */}
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-[18px] bg-[#0B1B3A] text-white flex flex-col items-center justify-center border border-[#C9A24B]/30 group-hover:bg-[#C9A24B] group-hover:text-[#0B1B3A] transition-colors duration-300 shadow-sm">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80">
                        {item.month}
                      </span>
                      <span className="text-xl sm:text-2xl font-serif font-bold leading-none">
                        {item.date}
                      </span>
                      <span className="text-[9px] font-sans opacity-70 mt-0.5">
                        {item.year}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                            item.status === "Open"
                              ? "bg-emerald-100 text-emerald-800"
                              : item.status === "Final Call"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-[#0B1B3A]/10 text-[#0B1B3A]"
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-xs text-[#0B1B3A]/50 font-sans">
                          {item.audience}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0B1B3A] group-hover:text-[#916C28] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#0B1B3A]/70 font-sans mt-1 leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Button / Action Indicator */}
                  <div className="sm:self-center w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#0B1B3A]/10 text-right">
                    <a
                      href="#enquiry-form"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1B3A] hover:text-[#916C28] transition-colors"
                    >
                      <BellRing className="w-3.5 h-3.5 text-[#C9A24B] stroke-[1.75]" />
                      <span>Set Reminder</span>
                    </a>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
