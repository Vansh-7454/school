"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface MiniFaq {
  q: string;
  a: string;
}

const FAQS: MiniFaq[] = [
  {
    q: "Can prospective parents book private weekday tours outside open days?",
    a: "Yes. Individual bespoke tours with an Admissions Dean can be scheduled on Tuesday and Thursday mornings during term time. Please submit an inquiry above indicating your preferred dates.",
  },
  {
    q: "Is visitor parking available on the school campus grounds?",
    a: "Yes. Reserved visitor parking bays, including rapid 22kW EV charging stalls, are situated immediately past our West Gate Security Kiosk. Security officers will validate your guest badge upon arrival.",
  },
  {
    q: "How can international families conduct preliminary admissions meetings?",
    a: "Our Admissions Committee regularly hosts secure video consultations and virtual campus orientations via Zoom for families relocating from abroad before their arrival in London.",
  },
];

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CurveDivider } from "@/components/ui/Dividers";

export function ContactFaqStrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <Section tone="cream" className="relative pb-24 md:pb-32">
      <Container size="narrow">
        {/* Header */}
        <SectionHeader
          eyebrow="Visitor Information"
          title="Frequently Asked Visiting Queries"
          description="Everything you need to know about campus access, parking arrangements, and scheduling private meetings."
          align="center"
        />

        {/* Mini FAQ Accordion */}
        <div className="space-y-3 mb-14">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.06}>
                <div
                  className={`rounded-[20px] border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#C9A24B] shadow-sm"
                      : "bg-white/80 border-[#0B1B3A]/10 hover:border-[#C9A24B]/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base font-bold text-[#0B1B3A]">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isOpen ? "bg-[#C9A24B] text-[#0B1B3A]" : "bg-[#0B1B3A]/5 text-[#0B1B3A]/60"
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#0B1B3A]/70 font-sans border-t border-[#0B1B3A]/5">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Admissions Prompt Card */}
        <ScrollReveal delay={0.2}>
          <Card variant="light" className="p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#C9A24B]/30 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#916C28]">
                <GraduationCap className="w-4 h-4 stroke-[1.75]" />
                <span>Ready to take the next step?</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B3A]">
                Admissions for Michaelmas Term 2026/27 Are Open
              </h4>
              <p className="text-xs sm:text-sm text-[#0B1B3A]/70 font-sans max-w-xl">
                Review our comprehensive fee schedule, age criteria, and submit your full candidate portfolio online.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button href="/admissions" variant="primary">
                Proceed to Admissions
              </Button>
            </div>
          </Card>
        </ScrollReveal>
      </Container>

      {/* Transition to Navy ContactFormSection */}
      <CurveDivider toTone="navy" fromTone="cream" position="bottom" />
    </Section>
  );
}
