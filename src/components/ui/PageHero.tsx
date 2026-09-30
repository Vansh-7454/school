"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { CurveDivider } from "./Dividers";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  breadcrumb?: string;
  decorationType: "about" | "academics" | "admissions" | "contact" | "gallery" | "news-events";
  nextTone?: "cream" | "white";
}

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  breadcrumbs,
  breadcrumb,
  decorationType,
  nextTone = "cream",
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const resolvedBreadcrumbs: BreadcrumbItem[] =
    breadcrumbs || (breadcrumb ? [{ label: breadcrumb }] : []);

  return (
    <section className="relative min-h-[55svh] sm:min-h-[60svh] flex flex-col justify-between bg-[#0B1B3A] text-cream-100 bg-grain overflow-hidden pt-28 border-b-0">
      {/* Decorative Gold Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Page-Specific SVG Vector Animation Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-40 sm:opacity-50 overflow-hidden">
        {/* ABOUT: Slowly rotating gold rings with rising sun & book */}
        {decorationType === "about" && (
          <div className="absolute -right-20 sm:right-10 top-1/2 -translate-y-1/2 w-[420px] h-[420px]">
            <motion.svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="200" cy="200" r="180" stroke="#C9A24B" strokeWidth="1" strokeDasharray="6 4" fill="none" />
              <circle cx="200" cy="200" r="140" stroke="#DFBE72" strokeWidth="1.5" fill="none" />
              <circle cx="200" cy="200" r="90" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            </motion.svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-32 h-32" fill="none">
                <circle cx="50" cy="40" r="16" fill="#DFBE72" opacity="0.6" />
                <path d="M 50 50 L 50 78 M 50 54 C 42 50 32 49 20 53 L 20 75 C 32 71 42 71 50 76 M 50 54 C 58 50 68 49 80 53 L 80 75 C 68 71 58 71 50 76" stroke="#C9A24B" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
          </div>
        )}

        {/* ACADEMICS: Floating geometric shapes (atoms, equations, planets) */}
        {decorationType === "academics" && (
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 1440 600" className="w-full h-full" fill="none">
              {/* Atom Orbit 1 */}
              <g className="animate-spin-slow origin-center" style={{ transformOrigin: "85% 50%" }}>
                <ellipse cx="1200" cy="300" rx="160" ry="60" stroke="#C9A24B" strokeWidth="1" transform="rotate(-30 1200 300)" opacity="0.5" />
                <ellipse cx="1200" cy="300" rx="160" ry="60" stroke="#DFBE72" strokeWidth="1" transform="rotate(30 1200 300)" opacity="0.5" />
                <ellipse cx="1200" cy="300" rx="160" ry="60" stroke="#E6D6AA" strokeWidth="1" transform="rotate(90 1200 300)" opacity="0.5" />
                <circle cx="1200" cy="300" r="14" fill="#C9A24B" opacity="0.7" />
              </g>
              {/* Drifting Geometry */}
              <polygon points="200,120 230,170 170,170" stroke="#DFBE72" strokeWidth="1" fill="none" opacity="0.3" className="animate-bounce" style={{ animationDuration: "8s" }} />
              <circle cx="340" cy="420" r="28" stroke="#C9A24B" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.4" />
              <rect x="150" y="380" width="30" height="30" stroke="#DFBE72" strokeWidth="1" transform="rotate(45 165 395)" fill="none" opacity="0.3" />
            </svg>
          </div>
        )}

        {/* ADMISSIONS: Winding SVG path that draws itself with 3 milestone dots */}
        {decorationType === "admissions" && (
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 1440 600" className="w-full h-full" fill="none">
              <motion.path
                d="M 100 480 Q 400 320 700 420 T 1340 220"
                stroke="#C9A24B"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              {/* 3 Milestone Dots */}
              <circle cx="340" cy="380" r="7" fill="#DFBE72" stroke="#0B1B3A" strokeWidth="2" />
              <circle cx="700" cy="420" r="9" fill="#C9A24B" stroke="#0B1B3A" strokeWidth="2.5" />
              <circle cx="1120" cy="285" r="8" fill="#FFF4D0" stroke="#0B1B3A" strokeWidth="2" />
            </svg>
          </div>
        )}

        {/* CONTACT: Animated envelope and paper planes flying across */}
        {decorationType === "contact" && (
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 1440 600" className="w-full h-full" fill="none">
              {/* Paper Plane 1 */}
              <motion.g
                animate={shouldReduceMotion ? {} : { x: [0, 80, 0], y: [0, -30, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                transform="translate(1080, 220)"
              >
                <polygon points="0,0 60,-25 45,35 25,10" fill="#DFBE72" opacity="0.75" />
                <line x1="0" y1="0" x2="45" y2="35" stroke="#0B1B3A" strokeWidth="1" />
                <path d="M -80 40 Q -40 20 0 0" stroke="#C9A24B" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
              </motion.g>
              {/* Envelope Outline */}
              <g transform="translate(180, 280) scale(0.9)" opacity="0.45">
                <rect x="0" y="0" width="80" height="54" rx="4" stroke="#DFBE72" strokeWidth="1.5" fill="none" />
                <path d="M 0 0 L 40 32 L 80 0" stroke="#DFBE72" strokeWidth="1.5" fill="none" />
              </g>
            </svg>
          </div>
        )}

        {/* GALLERY: Floating Polaroid-style frames drifting slowly */}
        {decorationType === "gallery" && (
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 1440 600" className="w-full h-full" fill="none">
              {/* Frame 1: Left floating frame */}
              <motion.g
                animate={shouldReduceMotion ? {} : { y: [0, -18, 0], rotate: [-4, -1, -4] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                transform="translate(140, 160)"
              >
                {/* Polaroid border */}
                <rect x="0" y="0" width="130" height="155" rx="6" fill="#FBF6EA" opacity="0.18" stroke="#C9A24B" strokeWidth="1.5" />
                {/* Inner image area */}
                <rect x="12" y="12" width="106" height="106" rx="3" fill="#C9A24B" fillOpacity="0.12" stroke="#DFBE72" strokeWidth="1" />
                {/* Decorative photo motif (sun & mountain) */}
                <circle cx="85" cy="45" r="10" fill="#DFBE72" opacity="0.5" />
                <path d="M 22 105 L 55 60 L 85 92 L 108 75 L 118 105 Z" fill="#C9A24B" opacity="0.4" />
                {/* Caption line */}
                <line x1="24" y1="134" x2="80" y2="134" stroke="#DFBE72" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              </motion.g>

              {/* Frame 2: Right floating frame */}
              <motion.g
                animate={shouldReduceMotion ? {} : { y: [0, 22, 0], rotate: [5, 8, 5] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                transform="translate(1180, 180)"
              >
                <rect x="0" y="0" width="140" height="165" rx="6" fill="#FBF6EA" opacity="0.15" stroke="#C9A24B" strokeWidth="1.5" />
                <rect x="14" y="14" width="112" height="112" rx="3" fill="#C9A24B" fillOpacity="0.1" stroke="#DFBE72" strokeWidth="1" />
                <circle cx="50" cy="50" r="14" stroke="#DFBE72" strokeWidth="1.5" fill="none" opacity="0.5" />
                <circle cx="50" cy="50" r="22" stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4" />
                <line x1="28" y1="144" x2="90" y2="144" stroke="#DFBE72" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              </motion.g>

              {/* Frame 3: Center-left smaller accent frame */}
              <motion.g
                animate={shouldReduceMotion ? {} : { y: [0, -12, 0], rotate: [2, -2, 2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                transform="translate(320, 360)"
              >
                <rect x="0" y="0" width="90" height="110" rx="4" fill="#FBF6EA" opacity="0.12" stroke="#DFBE72" strokeWidth="1" />
                <rect x="8" y="8" width="74" height="74" rx="2" fill="#C9A24B" fillOpacity="0.08" />
                <line x1="16" y1="94" x2="55" y2="94" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
              </motion.g>
            </svg>
          </div>
        )}

        {/* NEWS & EVENTS: Animated bulletin board / pinned notes with a gently swinging bell */}
        {decorationType === "news-events" && (
          <div className="absolute inset-0 w-full h-full">
            <svg viewBox="0 0 1440 600" className="w-full h-full" fill="none">
              {/* Gently swinging golden school bell on the right */}
              <motion.g
                animate={shouldReduceMotion ? {} : { rotate: [-10, 10, -10] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "1240px 140px" }}
              >
                {/* Mount bracket */}
                <line x1="1240" y1="110" x2="1240" y2="140" stroke="#C9A24B" strokeWidth="3" />
                <circle cx="1240" cy="140" r="5" fill="#DFBE72" />
                {/* Bell cup */}
                <path
                  d="M 1240 145 C 1225 155, 1220 190, 1205 205 L 1275 205 C 1260 190, 1255 155, 1240 145 Z"
                  fill="#C9A24B"
                  fillOpacity="0.5"
                  stroke="#DFBE72"
                  strokeWidth="2"
                />
                {/* Rim */}
                <ellipse cx="1240" cy="205" rx="35" ry="6" fill="#C9A24B" stroke="#FFF4D0" strokeWidth="1.5" opacity="0.8" />
                {/* Clapper */}
                <line x1="1240" y1="205" x2="1240" y2="220" stroke="#C9A24B" strokeWidth="2.5" />
                <circle cx="1240" cy="223" r="5" fill="#FFF4D0" />
                {/* Sound waves */}
                <path d="M 1285 185 C 1295 195, 1295 210, 1285 220" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <path d="M 1195 185 C 1185 195, 1185 210, 1195 220" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </motion.g>

              {/* Pinned Note 1: Left bulletin board note */}
              <motion.g
                animate={shouldReduceMotion ? {} : { y: [0, -6, 0], rotate: [-2, 1, -2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                transform="translate(180, 200)"
              >
                <rect x="0" y="0" width="130" height="110" rx="4" fill="#FBF6EA" opacity="0.14" stroke="#C9A24B" strokeWidth="1.5" />
                {/* Thumbtack pin */}
                <circle cx="65" cy="0" r="5" fill="#DFBE72" stroke="#0B1B3A" strokeWidth="1.5" />
                <circle cx="65" cy="0" r="2" fill="#FFF4D0" />
                {/* Note text lines */}
                <line x1="18" y1="26" x2="110" y2="26" stroke="#DFBE72" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                <line x1="18" y1="46" x2="95" y2="46" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                <line x1="18" y1="64" x2="105" y2="64" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                <line x1="18" y1="82" x2="70" y2="82" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </motion.g>

              {/* Pinned Note 2: Right bulletin note */}
              <motion.g
                animate={shouldReduceMotion ? {} : { y: [0, 8, 0], rotate: [3, 0, 3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                transform="translate(1040, 320)"
              >
                <rect x="0" y="0" width="115" height="95" rx="4" fill="#FBF6EA" opacity="0.12" stroke="#DFBE72" strokeWidth="1" />
                <circle cx="58" cy="0" r="4.5" fill="#C9A24B" stroke="#0B1B3A" strokeWidth="1.5" />
                <line x1="16" y1="22" x2="98" y2="22" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                <line x1="16" y1="40" x2="85" y2="40" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                <line x1="16" y1="58" x2="90" y2="58" stroke="#DFBE72" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
              </motion.g>
            </svg>
          </div>
        )}
      </div>

      {/* Main Foreground Content */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 sm:space-y-5">
        {/* Breadcrumb Navigation */}
        <ScrollReveal direction="up" delay={0.05}>
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-xs text-cream-100/70 mb-1 flex-wrap justify-center">
            <Link href="/" className="hover:text-gold-300 transition-colors inline-flex items-center gap-1 py-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            {resolvedBreadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-gold-400/60" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold-300 transition-colors py-1">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gold-300 font-semibold py-1">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </ScrollReveal>

        {/* Small Eyebrow */}
        <ScrollReveal direction="up" delay={0.1}>
          <span className="font-sans text-xs font-bold tracking-[0.3em] text-gold-400 uppercase block">
            {eyebrow}
          </span>
        </ScrollReveal>

        {/* Big Serif Page Title */}
        <ScrollReveal direction="up" delay={0.15}>
          <h1 className="font-serif text-[clamp(2rem,6vw,3.75rem)] font-extrabold tracking-tight text-cream-50 leading-[1.15]">
            {title}{" "}
            {titleAccent && (
              <span className="gold-gradient-text block sm:inline">{titleAccent}</span>
            )}
          </h1>
        </ScrollReveal>

        {/* One-Line Description */}
        <ScrollReveal direction="up" delay={0.2}>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-cream-100/80 font-normal leading-relaxed">
            {description}
          </p>
        </ScrollReveal>
      </div>

      {/* Bottom curved transition divider flowing into next section */}
      <CurveDivider toTone={nextTone} position="bottom" />

      <style jsx>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 90s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default PageHero;
