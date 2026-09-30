"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ContactCardData {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  lines: string[];
  copyValue: string;
  copyLabel: string;
}

const CARDS: ContactCardData[] = [
  {
    id: "address",
    icon: MapPin,
    title: "Campus Location",
    tagline: "Historic Kensington Estate",
    lines: [
      "Aurelia International School",
      "14 St. Jude's Quadrangle",
      "Kensington, London W8 5EP",
      "United Kingdom",
    ],
    copyValue: "14 St. Jude's Quadrangle, Kensington, London W8 5EP, United Kingdom",
    copyLabel: "Copy Address",
  },
  {
    id: "phone",
    icon: Phone,
    title: "Direct Telephony",
    tagline: "Admissions & Switchboard",
    lines: [
      "Admissions: +44 (0)20 7946 0912",
      "Reception: +44 (0)20 7946 0913",
      "Bursar Office: +44 (0)20 7946 0915",
    ],
    copyValue: "+44 (0)20 7946 0912",
    copyLabel: "Copy Main Phone",
  },
  {
    id: "email",
    icon: Mail,
    title: "Electronic Enquiries",
    tagline: "Dedicated Department Desks",
    lines: [
      "admissions@aurelia.edu",
      "reception@aurelia.edu",
      "principal@aurelia.edu",
    ],
    copyValue: "admissions@aurelia.edu",
    copyLabel: "Copy Admissions Email",
  },
];

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { IconBox } from "@/components/ui/IconBox";

export function ContactCardsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <Section tone="cream">
      <Container>
        {/* Section Header */}
        <SectionHeader
          eyebrow="Direct Contact"
          title="We Welcome Your Inquiries"
          description="Whether arranging an individualized admissions tour, inquiring about academic syllabi, or speaking with our leadership team, our staff is delighted to assist."
          align="center"
        />

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isCopied = copiedId === card.id;

            return (
              <ScrollReveal key={card.id} delay={idx * 0.08}>
                <Card variant="light" className="p-5 sm:p-8 flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <IconBox icon={Icon} tone="gold" size="md" />
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#0B1B3A]/40 group-hover:text-[#916C28] transition-colors">
                        AIS Desk
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#0B1B3A] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#916C28] uppercase tracking-wider mb-4">
                      {card.tagline}
                    </p>

                    <div className="space-y-1.5 text-sm text-[#0B1B3A]/80 font-sans">
                      {card.lines.map((line, i) => (
                        <p key={i} className="leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <div className="pt-6 mt-6 border-t border-[#0B1B3A]/10">
                    <button
                      type="button"
                      onClick={() => handleCopy(card.copyValue, card.id)}
                      className={`w-full h-11 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-[#0B1B3A]/5 hover:bg-[#0B1B3A] text-[#0B1B3A] hover:text-white"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 stroke-[1.75]" />
                          <span>{card.copyLabel}</span>
                        </>
                      )}
                    </button>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Working Hours Strip */}
        <ScrollReveal delay={0.2}>
          <Card variant="light" className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <IconBox icon={Clock} tone="gold" size="md" />
              <div>
                <h4 className="font-serif font-bold text-lg text-[#0B1B3A]">
                  School Office & Admissions Hours
                </h4>
                <p className="text-xs sm:text-sm text-[#0B1B3A]/70 font-sans">
                  Term-time and holiday opening schedules
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[#0B1B3A]/80 w-full md:w-auto">
              <div className="bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#0B1B3A]/5">
                <span className="font-bold text-[#0B1B3A] block">Monday – Friday:</span>
                <span>08:00 – 17:30 (Term Time)</span>
              </div>
              <div className="bg-[#FAF8F5] px-4 py-2.5 rounded-xl border border-[#0B1B3A]/5">
                <span className="font-bold text-[#0B1B3A] block">Saturday:</span>
                <span>09:00 – 13:00 (Pre-booked Tours)</span>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
