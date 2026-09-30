"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function OurStorySection() {
  return (
    <Section id="our-story" tone="cream">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Big Pull-Quote */}
        <div className="lg:col-span-5">
          <ScrollReveal direction="up" delay={0.1}>
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#916C28] uppercase block mb-3">
              Foundational Creed
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0B1B3A] leading-snug italic border-l-2 border-[#C9A24B] pl-6 my-4">
              “We do not merely teach curricula; we cultivate minds capable of shaping our collective future with wisdom, courage, and grace.”
            </blockquote>
            <cite className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0B1B3A]/70 block pl-6 mt-4 not-italic">
              — Dame Margaret Thorne, Head of School
            </cite>
          </ScrollReveal>
        </div>

        {/* Right Column: 3 Paragraphs */}
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#0B1B3A]/75 font-normal leading-relaxed max-w-prose">
          <ScrollReveal direction="up" delay={0.2}>
            <p>
              In the autumn of 1998, a visionary group of Oxford scholars and international educators gathered
              in historic Kensington with a revolutionary aim: to transcend the conventional dichotomy between
              traditional academic rigour and dynamic holistic inquiry. Aurelia was conceived not as a rigid
              academy, but as an intellectual sanctuary.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <p>
              Across subsequent decades, the campus expanded from its historic manor house to embrace 45 acres
              of pristine green spaces, state-of-the-art computational simulation hubs, and Olympic athletic
              complexes. Today, as an accredited Cambridge International and International Baccalaureate (IB)
              World School, our cohort represents 68 sovereign nations united under a shared commitment to
              scholarship and service.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p>
              Our pedagogy remains rooted in classical humanism: empowering young scholars to interrogate
              evidence, celebrate diverse cultural perspectives, and articulate ideas with unwavering precision.
              We measure our success not merely in examination percentiles, but in the compassionate, courageous
              leaders who graduate through our gates.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}

export default OurStorySection;
