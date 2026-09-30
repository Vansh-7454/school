"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

/**
 * FirstLoadIntro: Plays a luxury brand intro only once per browser session,
 * strictly on the home page root path ("/").
 * Inner pages and subsequent reloads in the session bypass the intro immediately.
 */
export function FirstLoadIntro() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Only run on client, home page, and if reduced motion is not preferred
    if (pathname !== "/" || shouldReduceMotion) {
      return;
    }

    try {
      const hasSeen = sessionStorage.getItem("aurelia_intro_shown");
      if (!hasSeen) {
        sessionStorage.setItem("aurelia_intro_shown", "true");

        const showTimer = setTimeout(() => {
          setShowIntro(true);
        }, 0);

        // Automatically dismiss after a brief, elegant reveal
        const hideTimer = setTimeout(() => {
          setShowIntro(false);
        }, 1400);

        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch {
      // sessionStorage unavailable (e.g., privacy mode or restricted iframe)
    }
  }, [pathname, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="first-load-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060F22] pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#C9A24B]/10 blur-[100px] pointer-events-none" />

          {/* Logo Crest with Scale & Fade */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center p-6"
          >
            <Logo size="xl" variant="light" showText={true} />
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 140, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent mt-5"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FirstLoadIntro;
