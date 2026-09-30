"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

export function LoginIllustration() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-[#0B1B3A] text-white">
      {/* Background Subtle Gradient & Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#C9A24B]/15 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Floating Gold Dust Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#C9A24B]"
          style={{
            top: `${(i * 19) % 85 + 5}%`,
            left: `${(i * 23) % 90 + 5}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i * 0.3) % 2,
          }}
        />
      ))}

      {/* Top Eyebrow */}
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C9A24B]/40 text-[#C9A24B] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted School Gateway</span>
        </div>
      </div>

      {/* Centerpiece: Rising Sun over School Silhouette */}
      <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center text-center">
        <div className="relative w-64 h-48 sm:w-80 sm:h-60 mx-auto">
          {/* Animated Rising Sun / Aureole */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-gradient-to-t from-[#C9A24B] via-[#E8D196] to-transparent blur-xl opacity-40"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <svg
            viewBox="0 0 400 300"
            className="w-full h-full drop-shadow-2xl overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="sunGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFF4D0" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#08142B" />
                <stop offset="100%" stopColor="#050C1B" />
              </linearGradient>
            </defs>

            {/* Radiant Sun Disc Rising Behind Spire */}
            <motion.circle
              cx="200"
              cy="160"
              r="60"
              fill="url(#sunGrad)"
              animate={{ cy: [170, 150, 170] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Sun Rays */}
            {[0, 30, 60, 90, 120, 150, 180].map((deg) => (
              <line
                key={deg}
                x1="200"
                y1="160"
                x2={200 + 95 * Math.cos((deg * Math.PI) / 180)}
                y2={160 - 95 * Math.sin((deg * Math.PI) / 180)}
                stroke="#C9A24B"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            ))}

            {/* School Building Silhouette (Georgian Neo-Classical facade with Clock Spire) */}
            {/* Main Hall */}
            <rect x="40" y="190" width="320" height="90" fill="url(#buildingGrad)" />
            {/* Classical Columns */}
            {[70, 100, 130, 270, 300, 330].map((x) => (
              <rect key={x} x={x} y="195" width="10" height="85" fill="#0E2248" />
            ))}
            {/* Center Pediment Portico */}
            <polygon points="160,190 200,140 240,190" fill="url(#buildingGrad)" stroke="#C9A24B" strokeWidth="1" />
            {/* Clock Tower Center Spire */}
            <rect x="186" y="90" width="28" height="50" fill="url(#buildingGrad)" />
            <polygon points="186,90 200,45 214,90" fill="#C9A24B" />
            {/* Golden Clock Eye */}
            <circle cx="200" cy="115" r="9" fill="#FFF4D0" stroke="#C9A24B" strokeWidth="2" />
            {/* Ground Lawn */}
            <rect x="20" y="275" width="360" height="15" rx="4" fill="#C9A24B" opacity="0.3" />
          </svg>
        </div>

        <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-cream-100">
          Aurelia International School
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#C9A24B] font-medium tracking-wide">
          Veritas, Virtus, Excellentia
        </p>
      </div>

      {/* Bottom Welcome Line */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-cream-100/70">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>Academic Portal Session</span>
        </span>
        <span className="font-mono text-[11px] text-[#C9A24B]">v2.6 Secure</span>
      </div>
    </div>
  );
}
