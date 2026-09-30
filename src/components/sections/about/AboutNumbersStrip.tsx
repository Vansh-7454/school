"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const STATS = [
  { value: "28", label: "Years of Distinction", sub: "Founded in 1998" },
  { value: "68", label: "Represented Nations", sub: "Global multilingual cohort" },
  { value: "100%", label: "University Placement", sub: "Oxbridge & Ivy League" },
  { value: "1 : 7", label: "Faculty-to-Scholar Ratio", sub: "Personalised mentoring" },
];

export function AboutNumbersStrip() {
  return (
    <Section id="about-stats" tone="navy">
      <ScrollReveal direction="up" delay={0.1}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-[#C9A24B]/20 text-center">
          {STATS.map((s, i) => (
            <div key={i} className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold gold-gradient-text">
                {s.value}
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FBF6EA] block mt-2">
                {s.label}
              </span>
              <span className="text-[11px] text-[#FBF6EA]/60 block">
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Small Bottom CTA */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="pt-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DFBE72] inline-flex items-center gap-1.5">
              <Sparkles strokeWidth={1.75} className="w-3.5 h-3.5" />
              Join Our Legacy
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#FBF6EA]">
              Are you ready to discover your potential at Aurelia?
            </h3>
          </div>
          <Link href="/admissions">
            <Button variant="primary" className="shrink-0">
              <span>Explore Admissions</span>
              <ArrowRight strokeWidth={1.75} className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </ScrollReveal>
    </Section>
  );
}

export default AboutNumbersStrip;
