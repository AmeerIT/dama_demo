"use client"

import { ANIMATION } from '@/lib/animation-constants'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait"
            presenceAffectsLayout={true}
            onExitComplete={() => {
                window.scrollTo(0, 0);
            }}
            propagate={true}
        >
            <div className="fixed inset-0 pointer-events-none z-100 flex flex-col">

                {/* TOP BLADE */}
                <motion.div
                    initial={{ scaleY: 1, opacity: 0 }}
                    animate={{ scaleY: 0, opacity: 1 }}
                    exit={{ scaleY: 1 }}
                    style={{ originY: 0 }} // Scales from the top
                    transition={{
                        duration: 0.8,
                        ease: [0.76, 0, 0.24, 1], // The high-speed "Expo" ease
                    }}
                    className="flex-1 w-full bg-secondary"
                />

                {/* BOTTOM BLADE */}
                <motion.div
                    initial={{ scaleY: 1, opacity: 0 }}
                    animate={{ scaleY: 0, opacity: 1 }}
                    exit={{ scaleY: 1 }}
                    style={{ originY: 1 }} // Scales from the bottom
                    transition={{
                        duration: 0.8,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    className="flex-1 w-full bg-secondary"
                />
            </div>

            {/* THE PRIMARY "FLASH" (Optional: Adds a kick of color) */}
            <motion.div
                initial={{ scaleY: 1, opacity: 0 }}
                animate={{ scaleY: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="fixed inset-0 z-99 bg-primary pointer-events-none"
            />

            {/* CONTENT REVEAL */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: "easeOut"
                }}
                className="relative z-10"
            >
                {children}
            </motion.div>
        </AnimatePresence >
    )
}
