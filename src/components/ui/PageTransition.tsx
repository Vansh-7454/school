"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/layout/SmoothScrollProvider";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { lenis } = useSmoothScroll();

  // Scroll to top on route change (Lenis aware, immediate to avoid scroll jumps)
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  // If user prefers reduced motion, render without motion animations
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const isPortal = pathname?.startsWith("/portal");

  // Portal routes use a faster, lighter transition
  if (isPortal) {
    return (
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Public editorial pages use a refined fade + subtle slide
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
