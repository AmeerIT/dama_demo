"use client";

import { motion } from "motion/react";

export default function ServiceDetailTemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
            }}
        >
            {children}
        </motion.div>
    );
}
