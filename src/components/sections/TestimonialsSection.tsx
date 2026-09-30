"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Aurelia has not only prepared our daughter for Oxford; it has given her an indelible moral compass and an unquenchable joy in inquiry that astonishes us every day.",
    name: "Victoria Sterling-Hayes",
    role: "Parent of Year 13 IB Diploma Scholar",
    initials: "VS",
    highlight: "Academic & Personal Flourishing",
  },
  {
    quote:
      "The robotics pavilions and personal mentorship gave me the confidence to present my machine learning thesis at the European Youth Science forum in Geneva.",
    name: "Marcus Thorne",
    role: "Head Prefect & Year 13 Senior Candidate",
    initials: "MT",
    highlight: "Research & International Leadership",
  },
  {
    quote:
      "The pastoral care is truly world-class. From the moment our family relocated from Singapore, the faculty enveloped our son in warmth, intellectual challenge, and true belonging.",
    name: "Dr. Ananya Sen",
    role: "Parent of Year 8 Cambridge Lower Secondary Scholar",
    initials: "AS",
    highlight: "Pastoral Warmth & Global Fluency",
  },
  {
    quote:
      "Here, you never have to sacrifice competitive rowing for chamber music. The faculty and bespoke timetables empower you to excel on the water and the concert stage.",
    name: "Charlotte Dubois",
    role: "Year 11 IGCSE Scholar & Concertmaster",
    initials: "CD",
    highlight: "Holistic Arts & Athletic Distinction",
  },
  {
    quote:
      "The standard of academic excellence is matched only by the school’s dedication to cultivating kind, empathetic, and culturally literate citizens ready for tomorrow.",
    name: "Lord Edward Cavendish",
    role: "Parent of Year 10 IGCSE Scholar",
    initials: "EC",
    highlight: "Character & Ethical Integrity",
  },
];

export function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Auto-play interval
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <Section
      id="testimonials"
      tone="cream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Unified Section Header */}
        <SectionHeader
          eyebrow="Voices of Aurelia"
          title="What Our Community Says"
          description="Reflections from families and scholars whose journeys exemplify the Aurelia ethos."
          align="center"
        />

        {/* Carousel Frame with Touch Swipe */}
        <div
          className="relative touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Card variant="light" className="p-5 sm:p-10 md:p-16 min-h-[340px] sm:min-h-[320px] flex flex-col justify-between">
            {/* Top Quote Icon */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FBF6EA] border border-[#C9A24B]/30 flex items-center justify-center text-[#916C28] shadow-sm">
                <Quote strokeWidth={1.75} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} strokeWidth={1.75} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A24B] fill-current" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote Animated Slide */}
            <div className="overflow-hidden my-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 sm:space-y-6"
                >
                  <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl text-[#0B1B3A] leading-relaxed font-normal italic">
                    “{current.quote}”
                  </blockquote>

                  {/* Profile Strip */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-[#C9A24B]/15">
                    {/* Initials Avatar in Gold Circle */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#0B1B3A] via-[#12274A] to-[#0B1B3A] border-2 border-[#C9A24B] flex items-center justify-center text-[#DFBE72] font-serif font-medium text-sm sm:text-base shrink-0 shadow-md">
                      {current.initials}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-serif text-base sm:text-lg font-medium text-[#0B1B3A] leading-tight truncate">
                        {current.name}
                      </h4>
                      <p className="font-sans text-[11px] sm:text-xs text-[#0B1B3A]/70 font-medium mt-0.5 truncate">
                        {current.role}
                      </p>
                      <span className="inline-block text-[10px] sm:text-[11px] font-semibold text-[#916C28] tracking-wider uppercase mt-0.5">
                        {current.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>

          {/* Controls: Arrows & Pagination Dots */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 px-1 sm:px-2">
            {/* Left & Right Arrow Buttons - 44px touch target */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#C9A24B]/30 bg-white text-[#0B1B3A] hover:bg-[#C9A24B] hover:text-[#0B1B3A] hover:border-[#C9A24B] transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft strokeWidth={1.75} className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#C9A24B]/30 bg-white text-[#0B1B3A] hover:bg-[#C9A24B] hover:text-[#0B1B3A] hover:border-[#C9A24B] transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight strokeWidth={1.75} className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots with 44px min tap area */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className="min-h-[44px] min-w-[32px] sm:min-w-[36px] flex items-center justify-center cursor-pointer p-1"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={cn(
                      "rounded-full transition-all duration-300 block",
                      activeIdx === idx
                        ? "w-6 sm:w-8 h-2 bg-[#C9A24B]"
                        : "w-2 h-2 bg-[#0B1B3A]/20 hover:bg-[#0B1B3A]/40"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default TestimonialsSection;
