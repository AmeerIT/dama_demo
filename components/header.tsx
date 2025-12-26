// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { Button } from "@base-ui/react";
// import { Dictionary, Locale } from "@/lib/i18n/dictionaries";
// import { LanguageSwitcher } from "./language-switcher";
// import { ModeToggle } from "./mode-toggle";
// import { ANIMATION } from "@/lib/animation-constants";

// interface ZestyHeaderProps {
//   lang: Locale;
//   dictionary: Dictionary;
// }


// export default function ZestyHeader({ lang, dictionary }: ZestyHeaderProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const navItems = [
//     { href: `/${lang}`, label: dictionary.common.home },
//     { href: `/${lang}/insights`, label: dictionary.common.insights },
//     { href: `/${lang}/blog`, label: dictionary.common.blog },
//     { href: `/${lang}/services`, label: dictionary.common.services },
//   ];

//   return (
//     <>
//       {!isOpen &&
//         <motion.div
//           initial={{ height: 0, y: -20, opacity: 0 }}
//           animate={{ height: "auto", y: 0, opacity: 1 }}
//           exit={{ height: 0, y: -20, opacity: 0 }}
//           transition={{
//             duration: 1.6,
//             ease: "easeInOut", height: { delay: 0.2 }
//           }}
//         >
//           <div className="fixed top-0 left-0 right-0 h-30 bg-linear-to-b from-background to-transparent pointer-events-none z-50" />
//         </motion.div>
//       }
//       <header className="fixed w-screen z-50 p-6 pt-4 flex pointer-events-none">
//         {!isOpen &&
//           <motion.div
//             initial={{ height: 0, y: -200 }}
//             animate={{ height: "auto", y: 0, }}
//             exit={{ height: 0, y: -200 }}
//             transition={{ duration: 0.7, ease: "easeInOut", height: { delay: 0.2 } }}
//             className="flex flex-row-reverse w-full justify-between items-center gap-4 pointer-events-auto ">
//             <div>
//               <LanguageSwitcher lang={lang} />
//               <ModeToggle />
//             </div>

//             <Button
//               onClick={() => setIsOpen(!isOpen)}
//               className="w-12 h-12 bg-primary text-white rounded-full flex flex-col items-center justify-center gap-1.5"
//             >
//               <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="w-6 bg-white" />
//               <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-6 bg-white" />
//               <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="w-6 bg-white" />
//             </Button>
//           </motion.div>

//         }
//       </header>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{
//               clipPath: "circle(0% at 50% -100%)",
//             }}
//             animate={{
//               clipPath: "circle(150% at 50% 0%)",
//             }}
//             exit={{
//               clipPath: "circle(0% at 50% -100%)",
//             }}
//             transition={{
//               duration: 0.9,
//               ease: [0.76, 0, 0.24, 1]
//             }}
//             className="fixed inset-0 bg-primary z-40 flex items-center justify-center overflow-hidden"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl px-10 items-center">
//               <p className="text-amber-500 text-6xl md:text-8xl font-bold underline-offset-8 decoration-2">DAMA</p>
//               <nav className="flex flex-col gap-9">
//                 {navItems.map((item, i) => (
//                   <NavigationItem
//                     href={item.href}
//                     label={item.label}
//                     key={item.href}
//                     index={i}
//                     onClose={() => setIsOpen(false)}
//                   />
//                 ))}
//               </nav>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// function NavigationItem({
//   href,
//   label,
//   index,
//   onClose
// }: {
//   href: string;
//   label: string;
//   index: number;
//   lang?: string;
//   onClose: () => void;
// }) {
//   return (
//     <motion.div
//       custom={index}
//       initial={{ y: 20, opacity: 0, scale: 0.95 }}
//       animate={{ y: 0, opacity: 1, scale: 1, transition: { delay: index * 0.1, duration: 0.6 }, }}
//     >
//       <Link
//         key={href}
//         onClick={onClose}
//         className="text-white text-6xl hover:rounded-0 hover:bg-transparent md:text-8xl font-bold underline-offset-8 decoration-2 hover:text-yellow-500 transition-all hover:no-underline hover:underline-offset-2"
//         href={href}>
//         {label}

//       </Link>
//     </motion.div>
//   )

// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@base-ui/react";
import { ModeToggle } from "./mode-toggle";
import { LanguageSwitcher } from "./language-switcher";

export default function Header({ lang, dictionary }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { href: `/${lang}`, label: dictionary.common.home, subtitle: undefined },
    { href: `/${lang}/insights`, label: dictionary.common.insights, subtitle: dictionary.Insights.subtitle },
    { href: `/${lang}/blog`, label: dictionary.common.blog, subtitle: dictionary.blog.subtitle },
    { href: `/${lang}/services`, label: dictionary.common.services, subtitle: dictionary.services.subtitle },
  ];

  return (
    /* We use 'relative' or 'sticky' here so it stays in the document flow
       and physically pushes the body content down when it grows */
    <header className={`z-50 w-full  text-foreground sticky top-0`}>
      <div className="mx-auto max-w-7xl px-6">
        {/* 1. THE TOP BAR (Always Transparent) */}
        <div className="flex h-20 items-center justify-between ">
          <Link href="/" className="transition-opacity backdrop-blur-3xl text-7xl p-5 rounded-full">
            <img src="/logo-dama.svg" alt="Logo" className="h-10" />
          </Link>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-4 group uppercase font-black italic text-7xl  p-5 rounded-full "
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0, y: isExpanded ? 1 : -4 }}
                className="absolute w-full h-0.5 bg-foreground transition-all"
              />
              <motion.div
                animate={{ rotate: isExpanded ? -45 : 0, y: isExpanded ? 1 : 4 }}
                className="absolute w-full h-0.5 bg-foreground transition-all"
              />
            </div>
          </Button>
        </div>

        {/* 2. THE DROP (Accordion Content) */}
        <AnimatePresence key="HEADER">
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 1 }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="bg-background/60 backdrop-blur-lg shadow-2xs rounded-3xl mb-8 overflow-hidden p-10"
            >
              <nav className="">
                <div className="flex flex-row w-full justify-center my-5 scale-350 ">
                  <ModeToggle />
                  <LanguageSwitcher lang={lang} />
                </div>
                <div className="relative grid grid-cols-2 overflow-hidden">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsExpanded(false)}
                      className=
                      {`text-center m-6 py-6
                        rounded-4xl
                      font-black uppercase transition-all text-primary hover:text-background hover:bg-primary
                        duration-300 ${item.subtitle ?? 'items-center '}`}>
                      <span className={`z-10 text-4xl md:text-5xl`}>
                        {item.label}
                      </span>
                      {item.subtitle &&
                        (<p className="mt-8 text-sm md:text-base text-foreground/muted-foreground font-normal">
                          {item.subtitle ?? "NOTHING"}
                        </p>)
                      }
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </header >
  );
}
