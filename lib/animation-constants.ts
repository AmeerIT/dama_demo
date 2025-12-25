export const ANIMATION = {
    // Easing curves
    ease: {
        default: [0.65, 0.05, 0, 1] as const,  // landonorris.com cubic-bezier
        smooth: [0.43, 0.13, 0.23, 0.96] as const,
        bounce: [0.68, -0.55, 0.27, 1.55] as const
    },

    // Duration
    duration: {
        fast: 0.3,
        default: 0.75,  // landonorris.com standard
        slow: 1.2
    },

    // Common variants
    variants: {
        fadeInUp: {
            initial: { opacity: 0, y: 20 },
            animate: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.65, 0.05, 0, 1] }
            }
        },
        clipReveal: {
            initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },

            animate: {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',

                transition: { duration: 0.75, ease: [0.65, 0.05, 0, 1] }
            }
        }
    }
}
