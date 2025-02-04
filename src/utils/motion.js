// Event Card Animations
export const eventCardFadeIn = {
  initial: {
    scale: 0.95,
    opacity: 0,
  },
  animate: (delay) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: delay * 0.05,
    },
  }),
  exit: {
    scale: 0.2,
    opacity: 0,
    transition: {
      duration: 1.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// Filters Component Animations

export const filtersButtonVert = {
  initial: {
    x: "-50%",
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    x: "-50%",
    rotate: -180,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
export const filtersButtonHor = {
  initial: {
    y: "-50%",
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    y: "-50%",
    rotate: -270,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const showFiltersAnim = {
  initial: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    height: "auto",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    height: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
// Landing page animations
export const landingSlideUp = (delay) => ({
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: delay,
    },
  },
});