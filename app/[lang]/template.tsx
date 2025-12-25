"use client"

import { ANIMATION } from '@/lib/animation-constants'
import { motion } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            {/* 1. THE COLOR PANEL (The "Curtain") */}
            <motion.div
                className="fixed inset-0 z-50 bg-red-600 pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{
                    duration: ANIMATION.duration.default,
                    ease: ANIMATION.ease.default
                }}
                style={{ originY: 0 }} // Animates upward
            />

            {/* 2. THE CONTENT (Revealing underneath) */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.2, // Wait a bit for the red curtain to start moving
                    duration: ANIMATION.duration.default,
                    ease: ANIMATION.ease.default
                }}
            >
                {children}
            </motion.main>
        </div>
    )
}
