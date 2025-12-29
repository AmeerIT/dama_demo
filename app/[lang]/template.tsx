"use client"

import { motion, AnimatePresence } from 'motion/react'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait"
            key={Math.random()}
            initial={true}
            presenceAffectsLayout={true}>
            <div className="fixed inset-0 pointer-events-none z-110 flex flex-col">
                <motion.div
                    key={"TOP_BOTTOM_BARS"}
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

                <motion.div
                    key={"BOTTOM_BARS"}
                    initial={{ scaleY: 1, opacity: 0 }}
                    animate={{ scaleY: 0, opacity: 1 }}
                    exit={{ scaleY: 1 }}
                    style={{ originY: 1 }} // Scales from the bottom

                    className="flex-1 w-full bg-secondary"
                />
            </div>
            <motion.div
                key={"TOP_BARS"}
                initial={{ scaleY: 1, opacity: 0 }}
                animate={{ scaleY: 0, opacity: 1, animationDuration: '8s' }}
                className="fixed inset-0 z-99 bg-primary pointer-events-none"
            >
                <p className='text-white text-9xl'>
                    hello
                </p>
            </motion.div>

            <motion.div
                key={"Content"}
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
