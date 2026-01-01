"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import { DefaultProps } from "@/lib/default-props";
import { cn } from "@/lib/utils";
import { Effra } from "@/app/[lang]/localFonts";
import { Button } from "@base-ui/react";

export default function ZestyHeader({ lang, dictionary }: DefaultProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Handle scroll for header transparency
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${lang}/`, label: dictionary.common.home },
    { href: `/${lang}/cast`, label: dictionary.common.cast },
    { href: `/${lang}/courses`, label: dictionary.common.courses },
    { href: `/${lang}/blog`, label: dictionary.common.blog },
    { href: `/${lang}/services`, label: dictionary.common.services },
  ];

  return (
    <div lang={lang} className={cn(Effra.className)}>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300 px-6 md:px-10 py-4",
          scrolled
            ? "bg-transparent"
            : "bg-transparent"
        )}
      >
        <div className="flex justify-end items-center w-full">
          {/* Logo/Brand */}
          {/* <Link href={`/${lang}`} className="text-2xl font-black tracking-tighter text-foreground hover:text-primary transition-all block backdrop-blur-2xl px-3 py-1 rounded-4xl shadow-2xl">
            {dictionary.common.dama}
          </Link> */}

          {/* Right Side: Language + Theme + Menu */}
          <div className="flex items-center gap-4  backdrop-blur-3xl px-4 py-2 rounded-4xl ">
            {mounted && (
              <>
                <LanguageSwitcher lang={lang} />
                <ModeToggle />
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              <motion.div
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0, width: isOpen ? "32px" : "32px" }}
                className="h-0.5 bg-foreground rounded-full transition-all"
              />
              {/* <motion.div
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-8 h-0.5 bg-foreground rounded-full"
              /> */}
              <motion.div
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0, width: isOpen ? "32px" : "20px" }}
                className="h-0.5 bg-foreground rounded-full ml-auto transition-all"
              />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 0%)" }}
            animate={{ clipPath: "circle(150% at 50% 0%)" }}
            exit={{ clipPath: "circle(0% at 50% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.3, staggerChildren: 0.1 }}
            className="fixed top-0 left-0 right-0 gap-10 w-screen h-full z-110 bg-primary"
          >
            {/* Header inside Menu */}
            <div className="flex justify-between items-center mb-10">
              <div className="text-2xl font-black tracking-tighter">
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:rotate-90 transition-transform duration-300"
                aria-label="Close Menu"
              >
                <svg className="w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="gap-10  w-screen h-screen px-10 flex flex-col text-white">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl md:text-6xl font-black hover:text-amber-500 transition-all block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Footer Section in Menu */}
            <div className="mt-auto flex justify-between items-end">
              <div className="text-xs font-bold uppercase tracking-widest opacity-50">
                © Dama {new Date().getFullYear()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { Button } from "@base-ui/react";
// import { ModeToggle } from "./mode-toggle";
// import { LanguageSwitcher } from "./language-switcher";

// export default function Header({ lang, dictionary }: any) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const navItems = [
//     { href: `/${lang}`, label: dictionary.common.home, subtitle: undefined },
//     { href: `/${lang}/insights`, label: dictionary.common.insights, subtitle: dictionary.Insights.subtitle },
//     { href: `/${lang}/blog`, label: dictionary.common.blog, subtitle: dictionary.blog.subtitle },
//     { href: `/${lang}/services`, label: dictionary.common.services, subtitle: dictionary.services.subtitle },
//   ];

//   return (
//     /* We use 'relative' or 'sticky' here so it stays in the document flow
//        and physically pushes the body content down when it grows */
//     <header className={`z-50 w-full  text-foreground sticky top-0`}>
//       <div className="mx-auto max-w-7xl px-6">
//         {/* 1. THE TOP BAR (Always Transparent) */}
//         <div className="flex h-20 items-center justify-between ">
//           <Link href="/" className="transition-opacity backdrop-blur-3xl text-7xl p-5 rounded-full">
//             <img src="/logo-dama.svg" alt="Logo" className="h-10" />
//           </Link>

//           <Button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="flex items-center gap-4 group uppercase font-black italic text-7xl  p-5 rounded-full "
//           >
//             <div className="relative w-6 h-6 flex items-center justify-center">
//               <motion.div
//                 animate={{ rotate: isExpanded ? 45 : 0, y: isExpanded ? 1 : -4 }}
//                 className="absolute w-full h-0.5 bg-foreground transition-all"
//               />
//               <motion.div
//                 animate={{ rotate: isExpanded ? -45 : 0, y: isExpanded ? 1 : 4 }}
//                 className="absolute w-full h-0.5 bg-foreground transition-all"
//               />
//             </div>
//           </Button>
//         </div>

//         {/* 2. THE DROP (Accordion Content) */}
//         <AnimatePresence key="HEADER">
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 1 }}
//               animate={{
//                 height: "auto",
//                 opacity: 1,
//               }}
//               exit={{
//                 height: 0,
//                 opacity: 0,
//               }}
//               className="bg-background/60 backdrop-blur-lg shadow-2xs rounded-3xl mb-8 overflow-hidden p-10"
//             >
//               <nav className="">
//                 <div className="flex flex-row w-full justify-center my-5 scale-250 ">
//                   <ModeToggle />
//                   <LanguageSwitcher lang={lang} />
//                 </div>
//                 <div className="relative grid grid-cols-2 overflow-hidden">
//                   {navItems.map((item) => (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       onClick={() => setIsExpanded(false)}
//                       className=
//                       {`text-center m-6 py-6
//                         rounded-4xl
//                       font-black uppercase transition-all
//                       container-type-inline-size
//                       text-primary hover:text-background hover:bg-primary
//                         duration-300 ${item.subtitle ?? 'items-center '}`}>
//                       <span className="text-6xl md:text-8xl">
//                         {item.label}
//                       </span>
//                       {item.subtitle &&
//                         (<p className="mt-8 text-sm md:text-base text-foreground/muted-foreground font-normal"
//                           style={{
//                             fontSize: "clamp(1vw, 3vw, 4vw)",
//                           }}
//                         >
//                           {item.subtitle ?? "NOTHING"}
//                         </p>)
//                       }
//                     </Link>
//                   ))}
//                 </div>
//               </nav>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div >
//     </header >
//   );
// }
