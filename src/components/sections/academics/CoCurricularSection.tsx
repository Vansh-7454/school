"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Palette,
  HeartHandshake,
  Compass,
  Sailboat,
  Sword,
  Music,
  Drama,
  Bot,
  Terminal,
  Plane,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { CurveDivider } from "@/components/ui/Dividers";

type Category = "All" | "Sports" | "Arts" | "Tech" | "Community";

interface ClubItem {
  id: string;
  name: string;
  category: "Sports" | "Arts" | "Tech" | "Community";
  icon: React.ElementType;
  badge: string;
  desc: string;
  schedule: string;
  highlight: string;
}

const CLUBS: ClubItem[] = [
  // Sports
  {
    id: "sports-1",
    name: "Regatta & Rowing Society",
    category: "Sports",
    icon: Sailboat,
    badge: "Varsity & Novice",
    desc: "Training on the Serpentine Lake with Olympic-grade carbon sculls, cardiovascular conditioning, and regatta competitions.",
    schedule: "Tue & Thu 6:30 AM",
    highlight: "National Schools Regatta Gold 2025",
  },
  {
    id: "sports-2",
    name: "Fencing Academy (Épée & Foil)",
    category: "Sports",
    icon: Sword,
    badge: "Competitive",
    desc: "Mastering tactical footwork, blade precision, and chivalric discipline under master fencing instructors.",
    schedule: "Mon & Wed 4:15 PM",
    highlight: "FIE Junior Circuit Finalists",
  },
  {
    id: "sports-3",
    name: "Championship Basketball",
    category: "Sports",
    icon: Trophy,
    badge: "All Divisions",
    desc: "High-tempo fast-break strategy, biometric jump training, and competitive inter-school leagues in our Olympic gym.",
    schedule: "Mon, Wed & Fri 4:30 PM",
    highlight: "Regional Conference Champions",
  },
  // Arts
  {
    id: "arts-1",
    name: "Symphony Orchestra",
    category: "Arts",
    icon: Music,
    badge: "Auditioned",
    desc: "An 80-member ensemble performing classical masterworks from Beethoven to Stravinsky in the acoustic Great Hall.",
    schedule: "Wed 4:00 PM & Sat 10:00 AM",
    highlight: "Annual Symphony Tour to Vienna",
  },
  {
    id: "arts-2",
    name: "Shakespeare & Drama Guild",
    category: "Arts",
    icon: Drama,
    badge: "Stage & Tech",
    desc: "Classical elocution, period stagecraft, improvisational theater, and full-scale West End quality annual productions.",
    schedule: "Tue & Thu 4:30 PM",
    highlight: "Spring Production: Hamlet (Sold Out)",
  },
  {
    id: "arts-3",
    name: "Oil Painting & Atelier",
    category: "Arts",
    icon: Palette,
    badge: "Studio Guild",
    desc: "Mastery of Flemish oil layering, anatomical drawing from cast sculpture, and contemporary abstract expressionism.",
    schedule: "Mon & Fri 3:45 PM",
    highlight: "Student Exhibition at City Gallery",
  },
  // Tech
  {
    id: "tech-1",
    name: "FIRST Robotics & Mechatronics",
    category: "Tech",
    icon: Bot,
    badge: "Engineering",
    desc: "CAD drafting, CNC milling, pneumatic control systems, and Java-based autonomous robotics competitions.",
    schedule: "Tue & Thu 4:00 PM",
    highlight: "World Championship Division Finalist",
  },
  {
    id: "tech-2",
    name: "Competitive Cybersecurity & AI",
    category: "Tech",
    icon: Terminal,
    badge: "Research & CTF",
    desc: "White-hat penetration testing, cryptography puzzles, neural network tuning, and ethical AI safety debates.",
    schedule: "Fri 4:15 PM",
    highlight: "Top 5 Global High School CTF Team",
  },
  {
    id: "tech-3",
    name: "Aeronautics & Drone Lab",
    category: "Tech",
    icon: Plane,
    badge: "Flight Science",
    desc: "Aerodynamic wind tunnel testing, custom FPV drone soldering, telemetry logging, and autonomous flight pathing.",
    schedule: "Wed 4:15 PM",
    highlight: "Youth Drone Grand Prix Winner",
  },
  // Community
  {
    id: "community-1",
    name: "Model United Nations (AureliaMUN)",
    category: "Community",
    icon: Globe,
    badge: "Diplomacy",
    desc: "Parliamentary debate, resolution drafting, and geopolitical crisis simulation holding consultative status with youth NGO forums.",
    schedule: "Thu 4:15 PM",
    highlight: "Hosted 450 Delegates at Annual MUN",
  },
  {
    id: "community-2",
    name: "Global Eco-Restoration Forum",
    category: "Community",
    icon: Compass,
    badge: "Sustainability",
    desc: "Urban rewilding on campus grounds, regenerative permaculture plots, solar water monitoring, and climate advocacy.",
    schedule: "Tue 3:45 PM",
    highlight: "Net-Zero Campus Composting Initiative",
  },
  {
    id: "community-3",
    name: "Youth Philanthropy & Literacy",
    category: "Community",
    icon: HeartHandshake,
    badge: "Service",
    desc: "Mentoring children in regional community libraries, organising textbook drives, and supporting local hospice care.",
    schedule: "Every Saturday Morning",
    highlight: "Over 4,200 Service Hours Annually",
  },
];

const CATEGORIES: Category[] = ["All", "Sports", "Arts", "Tech", "Community"];

export function CoCurricularSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredClubs =
    activeCategory === "All"
      ? CLUBS
      : CLUBS.filter((club) => club.category === activeCategory);

  return (
    <Section id="co-curricular" tone="white">
      {/* Section Header */}
      <SectionHeader
        eyebrow="Beyond The Classroom"
        title="Co-Curricular Life & Societies"
        description="More than forty student-led societies ignite passions, test grit, and forge lifelong bonds beyond academic rigor."
        align="center"
      />

      {/* Filter Chips */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? "bg-[#0B1B3A] text-white shadow-md shadow-[#0B1B3A]/20"
                    : "bg-white text-[#0B1B3A]/70 border border-[#C9A24B]/30 hover:border-[#C9A24B] hover:text-[#0B1B3A]"
                }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 rounded-full border-2 border-[#C9A24B] pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Filtered Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence>
          {filteredClubs.map((club) => {
            const IconComponent = club.icon;
            return (
              <motion.div
                key={club.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card variant="light" className="h-full p-6 sm:p-7 justify-between group">
                  <div>
                    {/* Header line: Icon & Category pill */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#0B1B3A] text-[#DFBE72] border border-[#C9A24B]/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                        <IconComponent strokeWidth={1.75} className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-[#C9A24B]/15 text-[#916C28] border border-[#C9A24B]/30">
                        {club.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-normal text-[#0B1B3A] mb-2 group-hover:text-[#916C28] transition-colors duration-200">
                      {club.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#0B1B3A]/75 leading-relaxed font-sans mb-4">
                      {club.desc}
                    </p>
                  </div>

                  {/* Card Footer: Highlight & Schedule */}
                  <div className="pt-4 border-t border-[#C9A24B]/15 space-y-2 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#916C28]">
                      <Sparkles strokeWidth={1.75} className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{club.highlight}</span>
                    </div>
                    <div className="text-[11px] text-[#0B1B3A]/50 font-sans tracking-wide">
                      Meeting: {club.schedule}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Small Bottom Link */}
      <ScrollReveal delay={0.2}>
        <div className="mt-14 text-center">
          <p className="text-sm text-[#0B1B3A]/70 font-sans">
            Have an idea for a new club?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#0B1B3A] hover:text-[#916C28] underline decoration-[#C9A24B] underline-offset-4 transition-colors"
            >
              Students can charter societies annually with faculty mentorship
            </Link>
          </p>
        </div>
      </ScrollReveal>

      {/* Bottom curve transitioning seamlessly to TeachingApproachSection (navy) */}
      <CurveDivider toTone="navy" fromTone="white" position="bottom" />
    </Section>
  );
}
