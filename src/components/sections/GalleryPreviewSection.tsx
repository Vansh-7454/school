"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Section } from "@/components/ui/Section";
import { CurveDivider } from "@/components/ui/Dividers";
import { Button } from "@/components/ui/Button";

interface GalleryTile {
  title: string;
  category: string;
  gradientClass: string;
  spanClass: string;
  iconSvg: React.ReactNode;
}

const GALLERY_TILES: GalleryTile[] = [
  {
    title: "Inter-House Sports Gala & Regatta",
    category: "Athletics",
    gradientClass: "from-blue-900 via-indigo-900 to-navy-950",
    spanClass: "md:col-span-2 md:row-span-2",
    iconSvg: (
      <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 opacity-80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 30 80 Q 60 40 90 80" stroke="#DFBE72" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="40" r="10" fill="#DFBE72" />
        <path d="M 45 85 L 75 85" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Annual Cambridge STEM & Science Fair",
    category: "Innovation",
    gradientClass: "from-teal-900 via-emerald-950 to-navy-950",
    spanClass: "md:col-span-1 md:row-span-1",
    iconSvg: (
      <svg viewBox="0 0 120 120" fill="none" className="w-20 h-20 opacity-80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="60" rx="40" ry="16" transform="rotate(-30 60 60)" stroke="#C9A24B" strokeWidth="1.5" />
        <ellipse cx="60" cy="60" rx="40" ry="16" transform="rotate(30 60 60)" stroke="#DFBE72" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="6" fill="#FBF6EA" />
      </svg>
    ),
  },
  {
    title: "Michaelmas Symphony & Choral Gala",
    category: "Performing Arts",
    gradientClass: "from-amber-900 via-purple-950 to-navy-950",
    spanClass: "md:col-span-1 md:row-span-1",
    iconSvg: (
      <svg viewBox="0 0 120 120" fill="none" className="w-20 h-20 opacity-80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="40" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M 45 70 C 45 50, 75 50, 75 70" stroke="#DFBE72" strokeWidth="2" fill="none" />
        <line x1="60" y1="30" x2="60" y2="75" stroke="#DFBE72" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="72" r="5" fill="#DFBE72" />
        <circle cx="70" cy="72" r="5" fill="#DFBE72" />
      </svg>
    ),
  },
  {
    title: "Fine Art & Ceramics Conservatory",
    category: "Visual Arts",
    gradientClass: "from-rose-950 via-slate-900 to-navy-950",
    spanClass: "md:col-span-1 md:row-span-1",
    iconSvg: (
      <svg viewBox="0 0 120 120" fill="none" className="w-20 h-20 opacity-80" xmlns="http://www.w3.org/2000/svg">
        <path d="M 40 85 C 35 60, 50 40, 60 40 C 70 40, 85 60, 80 85 Z" fill="none" stroke="#DFBE72" strokeWidth="2" />
        <ellipse cx="60" cy="40" rx="14" ry="4" stroke="#C9A24B" strokeWidth="1.5" />
        <ellipse cx="60" cy="85" rx="20" ry="6" fill="#C9A24B" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Cavendish Innovation & Robotics Lab",
    category: "Engineering",
    gradientClass: "from-cyan-950 via-sky-950 to-navy-950",
    spanClass: "md:col-span-1 md:row-span-1",
    iconSvg: (
      <svg viewBox="0 0 120 120" fill="none" className="w-20 h-20 opacity-80" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="40" width="40" height="40" rx="8" stroke="#C9A24B" strokeWidth="2" fill="none" />
        <circle cx="50" cy="55" r="4" fill="#DFBE72" />
        <circle cx="70" cy="55" r="4" fill="#DFBE72" />
        <line x1="50" y1="70" x2="70" y2="70" stroke="#DFBE72" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="40" x2="60" y2="30" stroke="#C9A24B" strokeWidth="2" />
        <circle cx="60" cy="27" r="3" fill="#DFBE72" />
      </svg>
    ),
  },
  {
    title: "The Great Library & Rare Archives",
    category: "Scholarship",
    gradientClass: "from-amber-950 via-yellow-950 to-navy-950",
    spanClass: "md:col-span-1 md:row-span-1",
    iconSvg: (
      <svg viewBox="0 0 120 120" fill="none" className="w-20 h-20 opacity-80" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60 70 L 35 55 L 35 85 L 60 100 Z" fill="#1A315E" stroke="#DFBE72" strokeWidth="1.5" />
        <path d="M 60 70 L 85 55 L 85 85 L 60 100 Z" fill="#1A315E" stroke="#DFBE72" strokeWidth="1.5" />
        <polygon points="60,35 90,50 60,65 30,50" fill="#DFBE72" stroke="#C9A24B" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function GalleryPreviewSection() {
  return (
    <Section id="gallery-preview" tone="cream">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-3 max-w-2xl">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#916C28] uppercase block">
              Visual Chronicle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#0B1B3A] leading-tight">
              Moments of Excellence
            </h2>
            <p className="text-base sm:text-lg text-[#0B1B3A]/75 font-normal">
              A photographic and artistic window into academic triumph, athletic grit, and community fellowship.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <Link href="/gallery">
            <Button variant="secondary" className="shrink-0">
              <span>View Full Gallery</span>
              <ArrowRight strokeWidth={1.75} className="w-4 h-4" />
            </Button>
          </Link>
        </ScrollReveal>
      </div>

      {/* Masonry / Bento Grid of 6 Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
        {GALLERY_TILES.map((tile, idx) => (
          <ScrollReveal
            key={idx}
            direction="up"
            delay={0.1 + idx * 0.07}
            className={tile.spanClass}
          >
            <div
              className={`group relative w-full h-full rounded-[24px] bg-gradient-to-br ${tile.gradientClass} border border-[#C9A24B]/30 overflow-hidden shadow-subtle hover:shadow-2xl hover:border-[#C9A24B] transition-all duration-300 flex items-center justify-center`}
            >
              {/* Visual Icon Illustration */}
              <div className="transform group-hover:scale-110 transition-transform duration-500">
                {tile.iconSvg}
              </div>

              {/* Always visible base category tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#07122A]/80 border border-[#C9A24B]/30 text-[#DFBE72] text-[10px] font-semibold tracking-widest uppercase backdrop-blur-sm">
                  <Sparkles strokeWidth={1.75} className="w-2.5 h-2.5" />
                  <span>{tile.category}</span>
                </span>
              </div>

              {/* Permanent subtle bottom caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <h4 className="font-serif text-lg font-medium text-[#FBF6EA] truncate">
                  {tile.title}
                </h4>
              </div>

              {/* Rich Gold Overlay on Hover with Caption and Link */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#07122A]/95 via-[#0B1B3A]/85 to-[#07122A]/40 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DFBE72] mb-1">
                  {tile.category}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#FBF6EA] leading-tight mb-3">
                  {tile.title}
                </h4>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#DFBE72] hover:text-[#FBF6EA] transition-colors"
                >
                  <span>View in gallery</span>
                  <ArrowRight strokeWidth={1.75} className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom curve transitioning seamlessly to AdmissionCtaSection (navy) */}
      <CurveDivider toTone="navy" fromTone="cream" position="bottom" />
    </Section>
  );
}

export default GalleryPreviewSection;
