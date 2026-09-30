"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark"; // 'light' is for dark backgrounds (white/gold text), 'dark' is for light backgrounds (navy text)
  showText?: boolean;
  className?: string;
  href?: string;
}

export function Logo({
  size = "md",
  variant = "light",
  showText = true,
  className,
  href = "/",
}: LogoProps) {
  // Dimension configurations
  const dimensions = {
    sm: { icon: 32, title: "text-base", sub: "text-[8px]" },
    md: { icon: 42, title: "text-xl", sub: "text-[9px]" },
    lg: { icon: 54, title: "text-2xl", sub: "text-[11px]" },
    xl: { icon: 68, title: "text-3xl", sub: "text-[13px]" },
  }[size];

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      {/* Stylised Open Book merged with Rising Sun Emblem */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="aureliaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5ECD1" />
            <stop offset="40%" stopColor="#DFBE72" />
            <stop offset="70%" stopColor="#C9A24B" />
            <stop offset="100%" stopColor="#916C28" />
          </linearGradient>
          <linearGradient id="aureliaNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B3B73" />
            <stop offset="100%" stopColor="#0B1B3A" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#C9A24B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Circular Shield Border */}
        <circle
          cx="50"
          cy="50"
          r="47"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="1.75"
          strokeDasharray="2 1"
          opacity="0.85"
        />
        <circle
          cx="50"
          cy="50"
          r="43.5"
          fill={variant === "light" ? "url(#aureliaNavyGrad)" : "#0B1B3A"}
        />

        {/* Rising Sun Glow */}
        <circle cx="50" cy="42" r="22" fill="url(#sunGlow)" />

        {/* Rising Sun Disc */}
        <circle cx="50" cy="42" r="11" fill="url(#aureliaGoldGrad)" />

        {/* Rising Sun Radiating Beams */}
        {/* Top beam */}
        <path d="M50 18 L50 25" stroke="url(#aureliaGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left 45 beam */}
        <path d="M33 25 L38 30" stroke="url(#aureliaGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right 45 beam */}
        <path d="M67 25 L62 30" stroke="url(#aureliaGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left 25 beam */}
        <path d="M23 37 L29 39" stroke="url(#aureliaGoldGrad)" strokeWidth="2" strokeLinecap="round" />
        {/* Right 25 beam */}
        <path d="M77 37 L71 39" stroke="url(#aureliaGoldGrad)" strokeWidth="2" strokeLinecap="round" />
        {/* Intermediate micro-rays */}
        <path d="M41 20 L44 26" stroke="url(#aureliaGoldGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <path d="M59 20 L56 26" stroke="url(#aureliaGoldGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* Stylised Open Book Pages (Center Spine & Curving Leaves) */}
        {/* Center Spine Pillar */}
        <path
          d="M50 48 L50 78"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Left Main Page */}
        <path
          d="M50 54 C42 50, 32 49, 21 53 C20 62, 21 70, 22 75 C31 71, 41 71, 50 76 Z"
          fill="#FBF6EA"
          opacity="0.95"
        />
        {/* Left Page Gold Accent Edge */}
        <path
          d="M50 54 C42 50, 32 49, 21 53"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 53 C20 62, 21 70, 22 75 C31 71, 41 71, 50 76"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Right Main Page */}
        <path
          d="M50 54 C58 50, 68 49, 79 53 C80 62, 79 70, 78 75 C69 71, 59 71, 50 76 Z"
          fill="#FBF6EA"
          opacity="0.95"
        />
        {/* Right Page Gold Accent Edge */}
        <path
          d="M50 54 C58 50, 68 49, 79 53"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M79 53 C80 62, 79 70, 78 75 C69 71, 59 71, 50 76"
          stroke="url(#aureliaGoldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Elegant Inner Page Lines */}
        <path d="M28 60 C35 57, 43 57, 47 60" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M29 65 C36 62, 43 62, 47 65" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M72 60 C65 57, 57 57, 53 60" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <path d="M71 65 C64 62, 57 62, 53 65" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

        {/* Star of Excellence at base */}
        <polygon
          points="50,79 51.5,82.5 55,83 52.5,85.5 53,89 50,87.2 47,89 47.5,85.5 45,83 48.5,82.5"
          fill="url(#aureliaGoldGrad)"
        />
      </svg>

      {/* School Name & Motto */}
      {showText && (
        <div className="flex flex-col tracking-tight">
          <span
            className={cn(
              "font-serif font-bold tracking-widest leading-none",
              dimensions.title,
              variant === "light" ? "text-cream-100" : "text-navy-900"
            )}
          >
            AURELIA
          </span>
          <span
            className={cn(
              "font-sans font-semibold tracking-[0.28em] uppercase leading-tight mt-0.5 hidden min-[420px]:block",
              dimensions.sub,
              variant === "light" ? "text-gold-300" : "text-gold-600"
            )}
          >
            International School
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Aurelia International School - Home">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
