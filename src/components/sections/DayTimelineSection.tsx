"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CurveDivider } from "@/components/ui/Dividers";

interface TimelineStep {
  time: string;
  title: string;
  tagline: string;
  iconSvg: React.ReactNode;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: "08:30 AM",
    title: "Morning Assembly",
    tagline: "Gathering in the Great Hall for choral prelude, contemplative mindfulness, and school notices.",
    iconSvg: (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="70" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2" />
        {/* Hall & Bell Tower */}
        <polygon points="40,110 80,60 120,110" fill="#1A315E" stroke="#DFBE72" strokeWidth="1.5" />
        <rect x="70" y="35" width="20" height="40" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="1.5" />
        <polygon points="65,35 80,18 95,35" fill="#DFBE72" />
        <circle cx="80" cy="55" r="5" fill="#FBF6EA" />
        <rect x="65" y="85" width="30" height="25" fill="#FBF6EA" opacity="0.9" />
      </svg>
    ),
  },
  {
    time: "09:15 AM",
    title: "Academic Classes",
    tagline: "Engaged seminar discussions, chemistry experiments, and advanced mathematics in smart studios.",
    iconSvg: (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="70" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2" />
        {/* Chemistry Flask & Atomic Ring */}
        <path d="M 72 45 L 88 45 L 88 65 L 110 105 A 10 10 0 0 1 101 115 L 59 115 A 10 10 0 0 1 50 105 L 72 65 Z" fill="#1A315E" stroke="#DFBE72" strokeWidth="2" />
        <path d="M 58 100 Q 80 90 102 100 L 98 110 L 62 110 Z" fill="#C9A24B" opacity="0.8" />
        <ellipse cx="80" cy="80" rx="45" ry="18" transform="rotate(-30 80 80)" stroke="#DFBE72" strokeWidth="1.5" strokeDasharray="4 2" />
      </svg>
    ),
  },
  {
    time: "12:45 PM",
    title: "Lunch & Play",
    tagline: "Nutritious seasonal dining in the refectory, followed by fellowship on the sunlit quadrangle.",
    iconSvg: (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="70" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2" />
        {/* Sun & Tree on Quadrangle */}
        <circle cx="110" cy="50" r="16" fill="#DFBE72" />
        <path d="M 80 115 L 80 75" stroke="#8F6410" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="80" cy="65" rx="28" ry="32" fill="#2E6B4B" stroke="#DFBE72" strokeWidth="1.5" />
        <path d="M 30 115 Q 80 105 130 115" stroke="#DFBE72" strokeWidth="2" />
      </svg>
    ),
  },
  {
    time: "03:30 PM",
    title: "Clubs & Sports",
    tagline: "Competitive aquatic fixtures, robotics tournaments, chamber orchestra, and fine arts masterclasses.",
    iconSvg: (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="70" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2" />
        {/* Athletic Torch & Ribbon */}
        <polygon points="80,35 90,65 70,65" fill="#DFBE72" />
        <rect x="75" y="65" width="10" height="50" fill="#1A315E" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M 50 85 Q 80 70 110 85 Q 80 100 50 85" stroke="#DFBE72" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    time: "05:45 PM",
    title: "Evening Reflection",
    tagline: "Supervised prep in the historic library, boarding house family dinner, and quiet reading under starlight.",
    iconSvg: (
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="70" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2" />
        {/* Crescent Moon & Reading Lamp */}
        <path d="M 115 35 A 18 18 0 1 0 115 65 A 14 14 0 1 1 115 35 Z" fill="#FFFCEB" />
        <path d="M 50 115 L 110 115" stroke="#DFBE72" strokeWidth="2" strokeLinecap="round" />
        {/* Desk Lamp */}
        <path d="M 65 115 L 75 75 L 90 70" stroke="#DFBE72" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <polygon points="82,65 105,75 95,85 75,75" fill="#C9A24B" />
        <circle cx="95" cy="80" r="14" fill="#FFDE6A" opacity="0.35" />
      </svg>
    ),
  },
];

export function DayTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialise desktop pinning on wide screens (> 1024px) without reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Total horizontal scroll amount
    const scrollAmount = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="day-timeline"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 bg-[#0B1B3A] text-[#FBF6EA] bg-grain overflow-hidden"
    >
      {/* Ambient Lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A24B]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 mb-12 sm:mb-16">
        <SectionHeader
          eyebrow="Daily Rhythm"
          title="A Day in the Life at Aurelia"
          description="A purposefully orchestrated day balancing academic rigour, physical vibrancy, and reflective repose."
          align="center"
          tone="navy"
        />
      </Container>

      {/* Desktop Horizontal Scroll-Track (Pinned with GSAP) */}
      <div className="hidden lg:block w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 pl-12 pr-24 w-max items-center"
        >
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="w-[360px] shrink-0 rounded-[24px] bg-[#07122A]/85 border border-[#FBF6EA]/10 p-8 backdrop-blur-md shadow-2xl hover:border-[#C9A24B] transition-all duration-300 flex flex-col justify-between h-[440px]"
            >
              <div>
                {/* Time Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 text-[#DFBE72] text-xs font-semibold tracking-widest uppercase mb-6">
                  <Clock strokeWidth={1.75} className="w-3.5 h-3.5" />
                  <span>{step.time}</span>
                </div>

                {/* SVG Illustration Container */}
                <div className="w-32 h-32 mx-auto my-2">
                  {step.iconSvg}
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-2xl font-normal text-[#FBF6EA] mt-4 text-center">
                  {step.title}
                </h3>
              </div>

              {/* Tagline */}
              <p className="text-sm text-[#FBF6EA]/75 leading-relaxed text-center mt-3">
                {step.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / Tablet Vertical Stack (< 1024px) */}
      <div className="block lg:hidden max-w-2xl mx-auto px-5 sm:px-8 relative">
        {/* Vertical Connecting Gold Line */}
        <div className="absolute top-4 bottom-4 left-9 sm:left-11 w-0.5 bg-gradient-to-b from-[#C9A24B] via-[#DFBE72] to-[#C9A24B]/30" />

        <div className="space-y-8">
          {TIMELINE_STEPS.map((step, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
              <div className="relative pl-14 sm:pl-16">
                {/* Timeline Dot */}
                <div className="absolute left-7 sm:left-9 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-[#07122A] border-2 border-[#C9A24B] flex items-center justify-center shadow-gold">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#DFBE72]" />
                </div>

                <div className="rounded-[24px] bg-[#07122A]/85 border border-[#FBF6EA]/10 p-6 md:p-8 backdrop-blur-md shadow-card">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A24B]/15 border border-[#C9A24B]/30 text-[#DFBE72] text-xs font-semibold tracking-wider uppercase mb-3">
                    <Clock strokeWidth={1.75} className="w-3 h-3" />
                    <span>{step.time}</span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#FBF6EA]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#FBF6EA]/75 leading-relaxed mt-2">
                    {step.tagline}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Bottom curve transitioning seamlessly to TestimonialsSection (cream) */}
      <CurveDivider toTone="cream" fromTone="navy" position="bottom" />
    </section>
  );
}

export default DayTimelineSection;
