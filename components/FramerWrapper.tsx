"use client"
import { motion } from 'motion/react'

export const FramerWrapper = ({ children, variants }: any) => (
    <motion.div initial="initial" animate="animate" variants={variants}>
        {children}
    </motion.div>
)
