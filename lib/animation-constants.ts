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
        dropInVars: {
            initial: { y: -50, opacity: 0, scale: 1.1 },
            animate: (i: number) => ({
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    delay: 0.3 + (i * 0.1),
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1] // Cubic Out for a "settling" feel
                }
            })
        },
        clipReveal: {
            initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
            animate: {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',

                transition: { duration: 0.75, ease: [0.65, 0.05, 0, 1] }
            }
        },
        woosh: {
            initial: {
                x: '-110%',
                skewX: '-15deg'
            },
            animate: {
                x: '110%',
                skewX: '-15deg',
                transition: {
                    duration: 0.8,
                    ease: [0.65, 0.05, 0, 1]
                }
            }
        }
    }
}
