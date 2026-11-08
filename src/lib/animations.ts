/**
 * Central Animation Configuration for C7 Corp Website
 *
 * All easing curves, durations, stagger timings, and 3D parameters
 * are centralized here for easy tuning.
 */

// Easing: calm and premium, no bounce
export const PREMIUM_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Timing durations (seconds)
export const TIMINGS = {
  scrollReveal: 0.8,
  stagger: 0.12,
  cardTiltScroll: 0.85,
  bobDuration: 5.5,
  stepFlip: 0.75,
  barGrow: 0.7,
  navTransition: 0.3,
  glareDuration: 0.3,
};

// Viewport trigger settings
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
};

// 3D Tilt parameters (pure CSS transforms, subtle & professional)
export const TILT_CONFIG = {
  maxAngle: 7, // max tilt angle in degrees (6-8deg as requested)
  perspective: 1000, // perspective in px
  scaleOnHover: 1.015,
  scrollInRotateX: 12, // starts at 12deg and rotates to 0deg on scroll-in
};

// Framer Motion Variants

// Section label / heading / subtitle / content scroll-in
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMINGS.scrollReveal,
      delay: customDelay,
      ease: PREMIUM_EASING,
    },
  }),
};

// Stagger container
export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: TIMINGS.stagger,
    },
  },
};

// 3D Card Scroll-in (rotateX from 12deg to 0deg, slide up 40px)
export const card3DScrollVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: TILT_CONFIG.scrollInRotateX,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: TIMINGS.cardTiltScroll,
      delay: customDelay,
      ease: PREMIUM_EASING,
    },
  }),
};

// Step circle 3D flip (rotateY)
export const stepCircleVariants = {
  hidden: {
    opacity: 0,
    rotateY: 65,
    scale: 0.85,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: TIMINGS.stepFlip,
      delay: customDelay,
      ease: PREMIUM_EASING,
    },
  }),
};

