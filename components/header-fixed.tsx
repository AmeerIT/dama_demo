"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ZestyHeader({ lang, dictionary }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: `/${lang}`, label: dictionary.common.home },
    { href: `/${lang}/insights`, label: dictionary.common.insights },
    { href: `/${lang}/blog`, label: dictionary.common.blog },
    { href: `/${lang}/services`, label: dictionary.common.services },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] p-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <img src="/logo-dama.svg" alt="Logo" className="h-8 invert" />
        </Link>

        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="w-6 h-0.5 bg-black" />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-6 h-0.5 bg-black" />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="w-6 h-0.5 bg-black" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "ellipse(0% 0% at 50% 0%)" }}
            animate={{ clipPath: "ellipse(150% 150% at 50% 0%)" }}
            exit={{ clipPath: "ellipse(0% 0% at 50% 0%)" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 bg-black text-white z-90 flex items-center justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl px-10 items-center">
              {/* RIGHT SIDE: Huge Navigation Links */}
              <nav className="flex flex-col gap-4 space-5">
                {navItems.map((item, i) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    index={i}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENTS ---

function NavLink({
  href,
  label,
  index,
  onClose
}: {
  href: string;
  label: string;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
      className="group"
    >
      <Link
        onClick={onClose}
        href={href}
        className="text-6xl md:text-8xl font-black italic uppercase hover:text-primary transition-colors inline-block leading-none"
      >
        {label}
      </Link>
    </motion.div>
  );
}
