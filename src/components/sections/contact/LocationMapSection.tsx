"use client";

import React from "react";
import {
  Navigation,
  Train,
  Bus,
  Car,
  Plane,
  ExternalLink,
  Compass,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

export function LocationMapSection() {
  return (
    <Section tone="white">
      <Container>
        {/* Section Header */}
        <SectionHeader
          eyebrow="Campus Topography"
          title="Finding Aurelia International School"
          description="Nestled within the historic St. Jude’s Quadrangle in Kensington, our 18-acre secure campus provides an oasis of focused scholarship in the heart of London."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Stylised Vector SVG Map (No Google Maps Embed) */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <Card variant="light" className="relative p-4 sm:p-6 overflow-hidden">
                {/* Map Viewport Container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#eef1e6] border border-[#0B1B3A]/10">
                  {/* Detailed Stylised Vector Map SVG */}
                  <svg
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full object-cover"
                  >
                    {/* Definitions */}
                    <defs>
                      <pattern
                        id="map-grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="#0B1B3A"
                          strokeWidth="0.5"
                          strokeOpacity="0.04"
                        />
                      </pattern>
                      <radialGradient id="schoolGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Background Grid */}
                    <rect width="800" height="600" fill="#eef2ea" />
                    <rect width="800" height="600" fill="url(#map-grid)" />

                    {/* Green Parks / Gardens */}
                    {/* Kensington Gardens West Area */}
                    <path
                      d="M 0 0 L 280 0 L 240 180 L 80 220 L 0 200 Z"
                      fill="#d8e8d2"
                      stroke="#c3ddbc"
                      strokeWidth="2"
                    />
                    <text
                      x="90"
                      y="90"
                      fill="#4a7c4f"
                      fontSize="13"
                      fontFamily="serif"
                      fontWeight="bold"
                      letterSpacing="2"
                    >
                      KENSINGTON MEADOWS
                    </text>

                    {/* Holland Park Boundary South */}
                    <path
                      d="M 520 420 L 800 360 L 800 600 L 460 600 L 490 480 Z"
                      fill="#d8e8d2"
                      stroke="#c3ddbc"
                      strokeWidth="2"
                    />
                    <text
                      x="600"
                      y="520"
                      fill="#4a7c4f"
                      fontSize="13"
                      fontFamily="serif"
                      fontWeight="bold"
                      letterSpacing="2"
                    >
                      ROYAL BOTANIC PARK
                    </text>

                    {/* Water Feature / Serpentine arm */}
                    <path
                      d="M -20 380 C 120 360, 220 440, 360 410 C 440 390, 500 320, 600 310 C 700 300, 780 340, 820 330"
                      stroke="#a6c8e0"
                      strokeWidth="32"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M -20 380 C 120 360, 220 440, 360 410 C 440 390, 500 320, 600 310 C 700 300, 780 340, 820 330"
                      stroke="#8ebbd9"
                      strokeWidth="20"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <text
                      x="180"
                      y="405"
                      fill="#467c9c"
                      fontSize="11"
                      fontFamily="sans-serif"
                      fontWeight="600"
                      letterSpacing="3"
                    >
                      SERPENTINE WATERWAY
                    </text>

                    {/* Major Streets & Boulevards */}
                    {/* Cromwell High Road */}
                    <path
                      d="M 0 320 L 800 240"
                      stroke="#ffffff"
                      strokeWidth="26"
                      strokeLinecap="square"
                    />
                    <path
                      d="M 0 320 L 800 240"
                      stroke="#d1d8e0"
                      strokeWidth="2"
                      strokeDasharray="8 8"
                    />
                    <text
                      x="30"
                      y="335"
                      fill="#0B1B3A"
                      opacity="0.6"
                      fontSize="10"
                      fontWeight="700"
                      letterSpacing="1"
                    >
                      HIGH STREET KENSINGTON (A315)
                    </text>

                    {/* St. Jude's Avenue (Vertical cross) */}
                    <path
                      d="M 380 0 L 440 600"
                      stroke="#ffffff"
                      strokeWidth="22"
                    />
                    <text
                      x="395"
                      y="80"
                      fill="#0B1B3A"
                      opacity="0.6"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="1"
                      transform="rotate(78 395 80)"
                    >
                      ST. JUDE’S AVENUE
                    </text>

                    {/* Queens Gate Connector */}
                    <path
                      d="M 120 0 L 220 600"
                      stroke="#ffffff"
                      strokeWidth="16"
                    />
                    {/* Palace Gate diagonal */}
                    <path
                      d="M 580 0 L 680 600"
                      stroke="#ffffff"
                      strokeWidth="16"
                    />
                    {/* Secondary Cross Street */}
                    <path
                      d="M 0 160 L 800 130"
                      stroke="#ffffff"
                      strokeWidth="14"
                    />

                    {/* Building Blocks */}
                    <rect x="250" y="40" width="80" height="90" rx="6" fill="#dedede" stroke="#c8c8c8" strokeWidth="1" />
                    <rect x="470" y="60" width="90" height="60" rx="6" fill="#dedede" stroke="#c8c8c8" strokeWidth="1" />
                    <rect x="260" y="190" width="90" height="70" rx="6" fill="#dedede" stroke="#c8c8c8" strokeWidth="1" />
                    <rect x="520" y="170" width="100" height="90" rx="6" fill="#dedede" stroke="#c8c8c8" strokeWidth="1" />
                    <rect x="220" y="460" width="110" height="80" rx="6" fill="#dedede" stroke="#c8c8c8" strokeWidth="1" />

                    {/* Metro Stations */}
                    {/* High St Kensington Station */}
                    <g transform="translate(140, 310)">
                      <circle r="12" fill="#d9381e" />
                      <circle r="7" fill="#ffffff" />
                      <rect x="-14" y="-3" width="28" height="6" rx="2" fill="#0019a8" />
                      <text x="18" y="4" fill="#0B1B3A" fontSize="10" fontWeight="bold">
                        Underground: High St Ken
                      </text>
                    </g>

                    {/* School Campus Footprint (The Quadrangle) */}
                    <g transform="translate(420, 260)">
                      {/* Campus Grounds Outline */}
                      <rect
                        x="-70"
                        y="-60"
                        width="140"
                        height="120"
                        rx="14"
                        fill="#0B1B3A"
                        fillOpacity="0.08"
                        stroke="#C9A24B"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                      {/* Inner Courtyard Lawns */}
                      <rect
                        x="-45"
                        y="-40"
                        width="90"
                        height="80"
                        rx="8"
                        fill="#c7e0be"
                        stroke="#9fc992"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="-48"
                        textAnchor="middle"
                        fill="#0B1B3A"
                        fontSize="10"
                        fontFamily="serif"
                        fontWeight="bold"
                        letterSpacing="1"
                      >
                        THE QUADRANGLE
                      </text>

                      {/* Pulsing Concentric Rings */}
                      <circle
                        r="38"
                        fill="none"
                        stroke="#C9A24B"
                        strokeWidth="2"
                        opacity="0.3"
                        className="animate-ping"
                      />
                      <circle
                        r="26"
                        fill="none"
                        stroke="#C9A24B"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                      <circle
                        r="18"
                        fill="#C9A24B"
                        fillOpacity="0.3"
                      />

                      {/* Central Golden Marker Pin */}
                      <circle r="10" fill="#0B1B3A" stroke="#C9A24B" strokeWidth="2.5" />
                      <circle r="4" fill="#C9A24B" />

                      {/* Label Badge */}
                      <g transform="translate(0, -78)">
                        <rect
                          x="-85"
                          y="0"
                          width="170"
                          height="24"
                          rx="12"
                          fill="#0B1B3A"
                          stroke="#C9A24B"
                          strokeWidth="1.5"
                        />
                        <text
                          x="0"
                          y="15"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9.5"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                          letterSpacing="0.5"
                        >
                          AURELIA INTERNATIONAL
                        </text>
                      </g>
                    </g>
                  </svg>

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#0B1B3A]/10 text-xs font-semibold text-[#0B1B3A] flex items-center gap-2 shadow-sm">
                    <Compass className="w-4 h-4 text-[#C9A24B]" />
                    <span>Royal Borough of Kensington & Chelsea</span>
                  </div>

                  {/* Pulsing Live Marker Pill */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#0B1B3A] text-white text-xs font-semibold flex items-center gap-2 shadow-md border border-[#C9A24B]/40">
                    <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
                    <span>Main Entrance: West Gate</span>
                  </div>
                </div>

                {/* Map Caption */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#0B1B3A]/60 font-sans">
                  <span>Cartography: St. Jude’s Quadrangle Academic Campus Precinct</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kensington+London+UK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#0B1B3A] hover:text-[#C9A24B] transition-colors"
                  >
                    <span>Open in External Mapping Service</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right: Directions & Transit Info */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
                  Access & Transit
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B3A]">
                  Effortless City Connections
                </h3>
                <p className="text-sm text-[#0B1B3A]/70 leading-relaxed font-sans">
                  Aurelia is easily accessible via public transportation, private school coaches,
                  and designated visitor drop-off gates.
                </p>
              </div>
            </ScrollReveal>

            {/* Transport Cards */}
            <div className="space-y-3.5">
              {/* Underground */}
              <ScrollReveal delay={0.2}>
                <Card variant="light" className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                    <Train className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#0B1B3A]">
                      By London Underground
                    </h4>
                    <p className="text-xs text-[#0B1B3A]/70 font-sans mt-0.5 leading-relaxed">
                      High Street Kensington (Circle & District lines) is a 6-minute stroll.
                      Earl’s Court (Piccadilly line) is 10 minutes away.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Bus */}
              <ScrollReveal delay={0.25}>
                <Card variant="light" className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                    <Bus className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#0B1B3A]">
                      By Bus & School Coach
                    </h4>
                    <p className="text-xs text-[#0B1B3A]/70 font-sans mt-0.5 leading-relaxed">
                      TfL Routes 9, 23, 27, 49, and 52 stop outside Quadrangle Gate. Aurelia private
                      shuttles serve 28 residential pick-up routes.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Car & Parking */}
              <ScrollReveal delay={0.3}>
                <Card variant="light" className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                    <Car className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#0B1B3A]">
                      By Car & Visitor Parking
                    </h4>
                    <p className="text-xs text-[#0B1B3A]/70 font-sans mt-0.5 leading-relaxed">
                      Visitor vehicles enter through West Gate Kiosk (Sat Nav: W8 5EP).
                      Underground secure bays with rapid EV chargers provided.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* International Airports */}
              <ScrollReveal delay={0.35}>
                <Card variant="light" className="p-4 sm:p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[12px] bg-[#0B1B3A] text-[#C9A24B] flex items-center justify-center flex-shrink-0">
                    <Plane className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#0B1B3A]">
                      International Airport Access
                    </h4>
                    <p className="text-xs text-[#0B1B3A]/70 font-sans mt-0.5 leading-relaxed">
                      London Heathrow (LHR) is 35 minutes via Elizabeth Line or M4 corridor.
                      Gatwick (LGW) is 45 minutes via Victoria express link.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Action CTA */}
            <ScrollReveal delay={0.4}>
              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kensington+London+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#0B1B3A] text-[#FBF6EA] hover:bg-[#162A56] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group"
                >
                  <Navigation className="w-4 h-4 text-[#C9A24B] stroke-[1.75]" />
                  <span>Get Turn-by-Turn Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70 stroke-[1.75]" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
