"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "When should we submit our application for the upcoming academic year?",
    answer:
      "Applications for the Autumn intake open on 1st September. While we operate rolling admissions for select grades where seats permit, we strongly encourage families to complete the digital application prior to the Priority Early-Action deadline (15th November) to guarantee consideration for optimal house placement and scholarship consideration.",
  },
  {
    question: "What are the primary criteria evaluated during the scholar assessment?",
    answer:
      "Our assessment seeks to understand the whole child. For Early Years, our educators observe sensory curiosity and collaborative play. From Grade 3 onward, candidates complete CAT4 cognitive ability evaluations (measuring verbal, non-verbal, quantitative, and spatial reasoning), alongside a creative writing prompt and an informal dialogue with our Section Head.",
  },
  {
    question: "Does Aurelia offer merit scholarships or means-tested financial bursaries?",
    answer:
      "Yes. Aurelia is dedicated to admitting scholars of exceptional promise regardless of financial background. We award competitive Academic Excellence, STEM Innovation, and Music/Arts Conservatoire scholarships (covering up to 50% of annual tuition). Means-tested bursaries are also reviewed confidentially by our Board of Governors.",
  },
  {
    question: "How do you support non-native English speakers entering the school (EAL)?",
    answer:
      "Our dedicated English as an Additional Language (EAL) department provides targeted tier-1 and tier-2 linguistic immersion. Students receive small-cohort language coaching and in-class co-teaching support until they achieve academic proficiency to thrive in Cambridge IGCSE and IB Diploma literature courses.",
  },
  {
    question: "What is the average teacher-to-student ratio across classrooms?",
    answer:
      "We maintain an overall student-to-faculty ratio of 8:1 across the school. Pre-Primary classes are capped at 16 students with a lead educator and certified teaching assistant. Primary and Middle school classes are limited to 20 students, and IB Diploma higher-level seminars rarely exceed 12 to 14 scholars.",
  },
  {
    question: "Can international students transfer mid-year from another curriculum?",
    answer:
      "Yes. We frequently welcome students relocating mid-year from American, French Baccalaureate, CBSE, or national curricula. Our academic dean reviews past transcripts to construct a personalized bridge program ensuring seamless credit transfer and subject alignment.",
  },
  {
    question: "Is school transport and dedicated bus routing provided across the city?",
    answer:
      "Aurelia operates a fleet of air-conditioned, GPS-tracked modern coaches serving over 28 designated routes across the metropolitan area. Each vehicle features seatbelt sensors, an experienced driver, and an onboard pupil supervisor ensuring child safety at all times.",
  },
  {
    question: "What co-curricular and athletic commitments are expected of students?",
    answer:
      "Every Aurelia student participates in at least two co-curricular societies or athletic activities per term. Our timetable reserves designated afternoon periods for sports, orchestra, robotics, and community service, ensuring a harmonious balance between intellectual rigor and personal passions.",
  },
];

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CurveDivider } from "@/components/ui/Dividers";

export function AdmissionsFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section tone="cream" className="relative pb-24 md:pb-32">
      <Container size="narrow">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Everything You Need To Know"
          description="Have questions regarding admissions standards, campus life, or fee arrangements? Explore answers to our most frequent inquiries below."
          align="center"
        />

        {/* 8-Item Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div
                  className={`rounded-[20px] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#C9A24B] shadow-md shadow-[#0B1B3A]/5"
                      : "bg-white/80 border-[#0B1B3A]/10 hover:border-[#C9A24B]/50"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full py-4 sm:py-5 px-4 sm:px-7 text-left flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] cursor-pointer min-h-[44px]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#0B1B3A]">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#C9A24B] text-[#0B1B3A]"
                          : "bg-[#0B1B3A]/5 text-[#0B1B3A]/60"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-4 sm:px-7 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#0B1B3A]/70 leading-relaxed font-sans border-t border-[#0B1B3A]/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Small Note */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 text-center">
            <p className="text-xs sm:text-sm text-[#0B1B3A]/60 font-sans">
              Have a specific question not covered here?{" "}
              <a
                href="#enquiry-form"
                className="font-semibold text-[#0B1B3A] hover:text-[#916C28] underline decoration-[#C9A24B] underline-offset-4"
              >
                Send our Admissions Office an enquiry below
              </a>
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* Transition to Navy FullEnquiryForm */}
      <CurveDivider toTone="navy" fromTone="cream" position="bottom" />
    </Section>
  );
}
