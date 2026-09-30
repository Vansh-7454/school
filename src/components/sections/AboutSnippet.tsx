"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CurveDivider } from "@/components/ui/Dividers";

export function AboutSnippet() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="our-story" className="relative py-20 md:py-28 lg:py-32 bg-white bg-grain overflow-hidden">
      {/* Decorative Gold Ambient Radial Glow */}
      <div
        className="absolute top-1/2 -left-40 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Story */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-3">
                <span className="font-sans text-xs font-semibold tracking-[0.25em] text-[#C9A24B] uppercase block">
                  Our Story
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-[#0B1B3A] leading-tight">
                  A legacy of curiosity <br className="hidden sm:inline" />
                  <span className="italic text-[#C9A24B]">since 1998</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4 text-base sm:text-lg text-[#0B1B3A]/75 font-normal leading-relaxed max-w-prose">
                <p>
                  Established over a quarter of a century ago on 45 acres of historic Kensington parkland,
                  Aurelia was born from a singular conviction: that academic rigour and creative courage
                  belong together. What began with thirty eager minds has blossomed into a globally recognised
                  bastion of Cambridge and International Baccalaureate learning.
                </p>
                <p>
                  Here, traditional humanist virtues converge with advanced quantum and artificial intelligence
                  laboratories. We foster young scholars who not only master examinations with distinction, but
                  carry the empathy, cultural fluency, and moral clarity required to lead our interconnected world.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="pt-2">
                <Button href="/about" variant="primary" size="md" showArrow>
                  Read our story
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Layered Illustrated Composition with Floating Badge */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <ScrollReveal direction="up" delay={0.25} className="w-full max-w-lg">
              <div className="relative aspect-square w-full flex items-center justify-center p-6">
                {/* Outer Rotating Geometric Gold Frame */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-3xl border border-gold-400/30 border-dashed pointer-events-none"
                />

                {/* Inner Static Geometric Shield */}
                <div className="absolute inset-10 rounded-2xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 shadow-2xl border border-gold-400/40 p-8 flex items-center justify-center overflow-hidden">
                  {/* Background Radial Light Accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.22)_0%,transparent_70%)]" />

                  {/* High Craftsmanship SVG Emblem: Open Book, Laurel Wreath & Rising Sun Rays */}
                  <svg
                    viewBox="0 0 320 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full relative z-10"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="aboutGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF4D0" />
                        <stop offset="40%" stopColor="#DFBE72" />
                        <stop offset="70%" stopColor="#C9A24B" />
                        <stop offset="100%" stopColor="#8F6410" />
                      </linearGradient>
                      <radialGradient id="sunBurstGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFF1B8" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#C9A24B" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Concentric Golden Halo Rings */}
                    <circle cx="160" cy="160" r="135" stroke="url(#aboutGold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                    <circle cx="160" cy="160" r="115" stroke="url(#aboutGold)" strokeWidth="1.5" opacity="0.8" />

                    {/* Sun Burst Glow Behind Book */}
                    <circle cx="160" cy="140" r="70" fill="url(#sunBurstGlow)" />

                    {/* Radiating Sun Beams */}
                    {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, i) => {
                      const rad = (deg * Math.PI) / 180;
                      const x1 = Math.round((160 + Math.cos(rad) * 45) * 100) / 100;
                      const y1 = Math.round((140 + Math.sin(rad) * 45) * 100) / 100;
                      const x2 = Math.round((160 + Math.cos(rad) * 85) * 100) / 100;
                      const y2 = Math.round((140 + Math.sin(rad) * 85) * 100) / 100;
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="url(#aboutGold)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          opacity="0.65"
                        />
                      );
                    })}

                    {/* Classical Laurel Leaves Wreath (Arching on left & right) */}
                    {/* Left Laurel Branch */}
                    <path
                      d="M 80 200 C 65 150 85 95 125 70"
                      stroke="url(#aboutGold)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Left Laurel Leaves */}
                    {[
                      { cx: 80, cy: 185, rot: -30 },
                      { cx: 72, cy: 155, rot: -10 },
                      { cx: 78, cy: 125, rot: 15 },
                      { cx: 96, cy: 98, rot: 40 },
                      { cx: 120, cy: 78, rot: 65 },
                    ].map((leaf, idx) => (
                      <ellipse
                        key={`l-${idx}`}
                        cx={leaf.cx}
                        cy={leaf.cy}
                        rx="12"
                        ry="5.5"
                        transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
                        fill="url(#aboutGold)"
                        opacity="0.85"
                      />
                    ))}

                    {/* Right Laurel Branch */}
                    <path
                      d="M 240 200 C 255 150 235 95 195 70"
                      stroke="url(#aboutGold)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Right Laurel Leaves */}
                    {[
                      { cx: 240, cy: 185, rot: 30 },
                      { cx: 248, cy: 155, rot: 10 },
                      { cx: 242, cy: 125, rot: -15 },
                      { cx: 224, cy: 98, rot: -40 },
                      { cx: 200, cy: 78, rot: -65 },
                    ].map((leaf, idx) => (
                      <ellipse
                        key={`r-${idx}`}
                        cx={leaf.cx}
                        cy={leaf.cy}
                        rx="12"
                        ry="5.5"
                        transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
                        fill="url(#aboutGold)"
                        opacity="0.85"
                      />
                    ))}

                    {/* OPEN BOOK OF KNOWLEDGE (Centred) */}
                    {/* Left Page */}
                    <path
                      d="M 160 180 C 135 168 100 166 75 178 L 75 228 C 100 216 135 218 160 230 Z"
                      fill="#FBF6EA"
                      stroke="url(#aboutGold)"
                      strokeWidth="2"
                    />
                    {/* Right Page */}
                    <path
                      d="M 160 180 C 185 168 220 166 245 178 L 245 228 C 220 216 185 218 160 230 Z"
                      fill="#FBF6EA"
                      stroke="url(#aboutGold)"
                      strokeWidth="2"
                    />
                    {/* Spine Pillar */}
                    <line x1="160" y1="175" x2="160" y2="235" stroke="url(#aboutGold)" strokeWidth="3" strokeLinecap="round" />

                    {/* Page Text Guidelines */}
                    <line x1="90" y1="190" x2="145" y2="186" stroke="#C9A24B" strokeWidth="1.2" opacity="0.6" />
                    <line x1="90" y1="202" x2="145" y2="198" stroke="#C9A24B" strokeWidth="1.2" opacity="0.6" />
                    <line x1="90" y1="214" x2="145" y2="210" stroke="#C9A24B" strokeWidth="1.2" opacity="0.6" />

                    <line x1="175" y1="186" x2="230" y2="190" stroke="#C9A24B" strokeWidth="1.2" opacity="0.6" />
                    <line x1="175" y1="198" x2="230" y2="202" stroke="#C9A24B" strokeWidth="1.2" opacity="0.6" />
                    <line x1="175" y1="210" x2="230" y2="214" stroke="#C9A24B" strokeWidth="1.2" opacity="0.6" />

                    {/* Central Rising Star of Wisdom */}
                    <polygon
                      points="160,115 163,124 172,125 165,131 167,140 160,135 153,140 155,131 148,125 157,124"
                      fill="url(#aboutGold)"
                    />
                  </svg>
                </div>

                {/* Floating "25+ Years" Badge with Subtle Float Animation */}
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-4 z-20 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-4 border border-gold-400/50 shadow-2xl backdrop-blur-md flex items-center gap-3.5"
                >
                  <div className="w-11 h-11 rounded-xl gold-gradient-bg flex items-center justify-center text-navy-950 shrink-0 shadow-gold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-serif text-2xl font-bold gold-gradient-text block leading-none">
                      25+ Years
                    </span>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-cream-100/80">
                      Academic Distinction
                    </span>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>

      {/* Bottom curve transitioning seamlessly to StatsBand (navy) */}
      <CurveDivider toTone="navy" fromTone="white" position="bottom" />
    </section>
  );
}

export default AboutSnippet;
