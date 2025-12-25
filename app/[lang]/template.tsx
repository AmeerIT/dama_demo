"use client"

import { ANIMATION } from '@/lib/animation-constants'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        /* mode="wait" ensures the exit animation finishes before the new page enters */
        <AnimatePresence mode="wait">
            <div key={pathname} className="relative w-full min-h-screen overflow-hidden">
                {/* 1. Black Panel (The Chaser) */}
                <motion.div
                    className="fixed inset-0 z-50 bg-secondary pointer-events-none"
                    style={{ width: '120vw', left: '-10%' }}
                    initial={{ x: '-110%', skewX: '-15deg' }}
                    animate={{ x: '150%', skewX: '-15deg' }}
                    transition={{ duration: 1, ease: ANIMATION.ease.default }}
                    exit={{ x: '-110%', skewX: '15deg' }}
                >

                </motion.div>

                {/* 2. Red Panel (The Leader) */}
                <motion.div
                    className="fixed inset-0 z-60 bg-primary pointer-events-none"
                    style={{ width: '120vw', left: '-10%' }}
                    initial={{ x: '-110%', skewX: '-15deg' }}
                    animate={{ x: '150%', skewX: '-15deg' }}
                    transition={{
                        duration: 1,
                        ease: ANIMATION.ease.default,
                        delay: 0.05
                    }}
                    exit={{ x: '-110%', skewX: '15deg' }}
                >
                </motion.div>

                {/* 3. THE CHILDREN (The Reveal) */}
                <motion.div
                    initial={{ opacity: 0, x: -200 }} // Start slightly to the left
                    animate={{ opacity: 1, x: 0 }}    // Move to center
                    transition={{
                        duration: 0.6,
                        delay: 0.45, // <--- CRITICAL: This waits for the panels to be mid-screen
                        ease: "anticipate"
                    }}
                    exit={{ x: '-110%', skewX: '15deg' }}
                >
                    {children}
                </motion.div>
            </div>
        </AnimatePresence >
    )
}
