"use client"
import { motion, Variants } from 'motion/react'
import { ReactNode } from 'react'

interface FramerWrapperProps {
  children: ReactNode;
  variants: Variants;
}

export const FramerWrapper = ({ children, variants }: FramerWrapperProps) => (
    <motion.div initial="initial" animate="animate" variants={variants}>
        {children}
    </motion.div>
)
