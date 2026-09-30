"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Container } from "@/components/ui/Container";
import { CurveDivider } from "@/components/ui/Dividers";

interface StatItem {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    target: 2500,
    suffix: "+",
    label: "Scholars",
    sublabel: "Across 68 Nationalities",
  },
  {
    target: 150,
    suffix: "+",
    label: "Master Educators",
    sublabel: "1:7 Faculty Mentorship",
  },
  {
    target: 98,
    suffix: "%",
    label: "Board Results",
    sublabel: "IB & Cambridge Top 10%",
  },
  {
    target: 40,
    suffix: "+",
    label: "Clubs & Societies",
    sublabel: "Arts, Robotics & Athletics",
  },
];

export function StatsBand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const [counts, setCounts] = useState<number[]>(() =>
    shouldReduceMotion ? [2500, 150, 98, 40] : [0, 0, 0, 0]
  );

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const duration = 2000; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Quintic ease out for majestic slowdown
      const ease = 1 - Math.pow(1 - progress, 5);

      setCounts([
        Math.floor(ease * 2500),
        Math.floor(ease * 150),
        Math.floor(ease * 98),
        Math.floor(ease * 40),
      ]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView, shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#0B1B3A] via-[#12274A] to-[#0B1B3A] text-cream-100 bg-grain overflow-hidden"
    >
      {/* Decorative Gold Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A24B]/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {STATS.map((stat, idx) => {
              const displayVal = counts[idx].toLocaleString() + (stat.suffix || "");

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center text-center px-4 lg:px-6 ${
                    idx < STATS.length - 1
                      ? "lg:border-r lg:border-[#C9A24B]/25 sm:border-b lg:border-b-0 pb-8 sm:pb-8 lg:pb-0"
                      : ""
                  }`}
                >
                  {/* Big Number */}
                  <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal gold-gradient-text tracking-tight block">
                    {displayVal}
                  </span>

                  {/* Label */}
                  <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-cream-50 mt-2.5 block">
                    {stat.label}
                  </span>

                  {/* Sublabel */}
                  <span className="text-xs text-cream-100/60 font-light mt-1 block">
                    {stat.sublabel}
                  </span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>

      {/* Bottom curve transitioning seamlessly to ProgramsSection (cream) */}
      <CurveDivider toTone="cream" fromTone="navy" position="bottom" />
    </section>
  );
}

export default StatsBand;
