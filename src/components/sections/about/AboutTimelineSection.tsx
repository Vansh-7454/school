"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  tag: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "1998",
    title: "Founding in Historic Kensington",
    desc: "Aurelia International School was founded with an inaugural cohort of thirty scholars and an unyielding commitment to humanist inquiry.",
    tag: "Foundational Origin",
  },
  {
    year: "2005",
    title: "45-Acre Heritage Campus & Great Hall",
    desc: "Relocation to our expansive estate in Kensington parklands; restoration of the historic manor house and erection of the central clock tower.",
    tag: "Estate Expansion",
  },
  {
    year: "2012",
    title: "Cavendish STEM & Robotics Laboratories",
    desc: "Unveiling of cutting-edge physical sciences suites, quantum simulation workbenches, and automated electronics maker spaces.",
    tag: "Scientific Innovation",
  },
  {
    year: "2018",
    title: "Lord Mountbatten Olympic Sports Complex",
    desc: "Construction of the 8-lane heated Olympic competition pool, all-weather FIFA astro-turf arena, and professional squash studios.",
    tag: "Athletic Distinction",
  },
  {
    year: "2022",
    title: "Global Hybrid Classrooms & AI Ateliers",
    desc: "Deployment of circadian-spectrum acoustic classrooms, intercontinental lecture streaming, and student artificial intelligence fellowships.",
    tag: "Digital Pedagogy",
  },
  {
    year: "2026",
    title: "Today: A World-Standard Bastion of Learning",
    desc: "Celebrating 28 years of academic distinction, guiding 2,500 scholars from 68 nations toward Ivy League, Oxbridge, and global leadership.",
    tag: "Present Horizon",
  },
];

export function AboutTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="about-timeline" tone="white" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Historical Milestones"
          title="A Journey of Enduring Ambition"
          description="How a visionary academy in Kensington evolved into an international benchmark of scholarship and character."
          align="center"
        />

        {/* Central Vertical Timeline */}
        <div className="relative">
          {/* Static Background Guide Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[#C9A24B]/20" />

          {/* Animated Gold Fill Line that Draws on Scroll */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 gold-gradient-bg origin-top z-10"
          />

          <div className="space-y-12 sm:space-y-16">
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Year Milestone Marker on the line */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-[#07122A] border-2 border-[#C9A24B] text-[#DFBE72] font-serif text-xs font-semibold flex items-center justify-center shadow-gold">
                    {item.year.slice(2)}
                  </div>

                  {/* Content Card (Flanking left or right on desktop, right on mobile) */}
                  <div className="pl-16 md:pl-0 w-full md:w-1/2 md:px-8">
                    <ScrollReveal
                      direction={isEven ? "left" : "right"}
                      delay={0.1}
                    >
                      <Card variant="light" className="p-6 sm:p-8">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-serif text-2xl font-bold gold-gradient-text">
                            {item.year}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#916C28] px-2.5 py-0.5 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30">
                            {item.tag}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-medium text-[#0B1B3A] mb-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-sm text-[#0B1B3A]/75 leading-relaxed">
                          {item.desc}
                        </p>
                      </Card>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default AboutTimelineSection;
