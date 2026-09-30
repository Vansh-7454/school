/**
 * Aurelia International School - Unified Motion System
 * Single source of truth for motion curves, durations, and animation variants.
 */

export const MOTION = {
  // Cubic Bezier Easing curve
  ease: [0.22, 1, 0.36, 1] as const,
  easeString: "cubic-bezier(0.22, 1, 0.36, 1)",

  // Durations
  fast: 0.25,
  base: 0.6,
  slow: 1.0,

  // Stagger intervals
  stagger: 0.08,
  staggerSlow: 0.12,

  // Reveal distance
  revealDistance: 24,
  revealDistanceSmall: 14,
};

/**
 * Standard Framer Motion transitions
 */
export const transitions = {
  fast: {
    duration: MOTION.fast,
    ease: MOTION.ease,
  },
  base: {
    duration: MOTION.base,
    ease: MOTION.ease,
  },
  slow: {
    duration: MOTION.slow,
    ease: MOTION.ease,
  },
  staggerChildren: (stagger = MOTION.stagger) => ({
    staggerChildren: stagger,
    delayChildren: 0.05,
  }),
};

/**
 * Shared Motion Variants for Framer Motion
 */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: MOTION.revealDistance },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.base,
      delay: customDelay,
      ease: MOTION.ease,
    },
  }),
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    transition: {
      duration: MOTION.base,
      delay: customDelay,
      ease: MOTION.ease,
    },
  }),
};

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION.stagger,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverVariant = {
  rest: { y: 0, transition: { duration: 0.3, ease: MOTION.ease } },
  hover: { y: -6, transition: { duration: 0.3, ease: MOTION.ease } },
};
