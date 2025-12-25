"use client"

import { ANIMATION } from '@/lib/animation-constants'
import { motion, AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <div key={pathname} className="relative w-full min-h-screen overflow-hidden">
                <motion.div
                    className="fixed inset-0 z-50 bg-secondary pointer-events-none"
                    style={{ width: '120vw', left: '-10%' }}
                    initial={{ x: '-110%', skewX: '-15deg' }}
                    animate={{ x: '150%', skewX: '-15deg' }}
                    transition={{ duration: 1, ease: ANIMATION.ease.default }}

                >

                </motion.div>

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
                >
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.45,
                        ease: "anticipate"
                    }}

                >
                    {children}
                </motion.div>
            </div>
        </AnimatePresence >
    )
}
