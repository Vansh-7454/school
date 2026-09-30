"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MOTION } from "@/lib/motion";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "center" | "left";
  variant?: "dark" | "light" | "auto";
  tone?: "cream" | "white" | "navy" | "navyDeep" | string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  variant = "auto",
  tone,
  className,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const isCenter = align === "center";
  const isDark = variant === "dark" || tone === "navy" || tone === "navyDeep";
  const effectiveVariant = variant !== "auto" ? variant : (isDark ? "dark" : (tone ? "light" : "auto"));

  return (
    <div
      className={cn(
        "mb-14 md:mb-16",
        isCenter ? "text-center mx-auto" : "text-left",
        "max-w-3xl",
        className
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: MOTION.base, ease: MOTION.ease }}
          className="mb-3"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A24B]">
            {eyebrow}
          </span>
        </motion.div>
      )}

      {/* Main Heading */}
      <motion.h2
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: MOTION.base, delay: 0.1, ease: MOTION.ease }}
        className={cn(
          "font-serif font-normal tracking-tight text-[clamp(1.75rem,5vw,3rem)] leading-[1.15]",
          effectiveVariant === "dark"
            ? "text-[#FAF6ED]"
            : effectiveVariant === "light"
            ? "text-[#0B1B3A]"
            : "text-inherit"
        )}
      >
        {title}{" "}
        {titleAccent && (
          <span className="italic font-normal text-[#C9A24B] drop-shadow-sm">
            {titleAccent}
          </span>
        )}
      </motion.h2>

      {/* Subtle gold line accent under heading */}
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.25, ease: MOTION.ease }}
        className={cn(
          "h-0.5 w-16 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent my-4",
          isCenter ? "mx-auto" : "ml-0"
        )}
      />

      {/* Description */}
      {description && (
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: MOTION.base, delay: 0.2, ease: MOTION.ease }}
          className={cn(
            "text-base sm:text-lg leading-relaxed font-sans max-w-2xl",
            isCenter && "mx-auto",
            effectiveVariant === "dark"
              ? "text-white/70"
              : effectiveVariant === "light"
              ? "text-[#0B1B3A]/70"
              : "opacity-75"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export default SectionHeader;
