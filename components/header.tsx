// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
// import { Button } from "@/components/ui/button";
// import { LanguageSwitcher } from "@/components/language-switcher";
// import { Menu, X } from "lucide-react";
// import { useState } from "react";

// interface HeaderProps {
//   lang: Locale;
//   dictionary: Dictionary;
// }

// export default function Header({ lang, dictionary }: HeaderProps) {
//   const pathname = usePathname();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navItems = [
//     { href: `/${lang}`, label: dictionary.common.home },
//     { href: `/${lang}/insights`, label: dictionary.common.insights },
//     { href: `/${lang}/blog`, label: dictionary.common.blog },
//     { href: `/${lang}/services`, label: dictionary.common.services },
//   ];

//   const isActive = (href: string) => {
//     if (href === `/${lang}`) {
//       return pathname === `/${lang}` || pathname === `/${lang}/`;
//     }
//     return pathname.startsWith(href);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-screen px-10">
//       <div className="mx-auto flex h-16 items-center justify-between  ">
//         {/* Logo */}
//         <Link href={`/${lang}`} className="flex items-center gap-2">
//           <img
//             src="/logo-dama.svg"
//             alt="Dama Productions"
//             className="h-10 w-auto"
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`text-sm font-medium transition-all duration-150 ${isActive(item.href)
//                 ? "text-primary"
//                 : "text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-md py-1 px-2"
//                 }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Right Side: Language Switcher + Mobile Menu */}
//         <div className="flex items-center gap-2">
//           <LanguageSwitcher lang={lang} variant="button" />

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {mobileMenuOpen && (
//         <nav className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
//           <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
//                   ? "bg-primary/10 text-primary"
//                   : "text-foreground/70 hover:bg-muted hover:text-primary"
//                   }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </nav>
//       )}
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@base-ui/react";
import { Dictionary, Locale } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { ANIMATION } from "@/lib/animation-constants";

interface ZestyHeaderProps {
  lang: Locale;
  dictionary: Dictionary;
}


export default function ZestyHeader({ lang, dictionary }: ZestyHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { href: `/${lang}`, label: dictionary.common.home },
    { href: `/${lang}/insights`, label: dictionary.common.insights },
    { href: `/${lang}/blog`, label: dictionary.common.blog },
    { href: `/${lang}/services`, label: dictionary.common.services },
  ];

  return (
    <>
      <header className="fixed w-full z-100 p-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <LanguageSwitcher lang={lang} variant="button" />
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 bg-primary text-white rounded-full flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} className="w-6 h-0.5 bg-white" />
            <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="w-6 h-0.5 bg-white" />
            <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }} className="w-6 h-0.5 bg-white" />
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              clipPath: "circle(0% at 50% -100%)",
            }}
            animate={{
              clipPath: "circle(150% at 50% 0%)",
            }}
            exit={{
              clipPath: "circle(0% at 50% -100%)",
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1] // High-velocity easing
            }}
            className="fixed inset-0 bg-primary z-90 flex items-center justify-center overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl px-10 items-center">
              {/* RIGHT SIDE: Huge Navigation Links */}
              <p className="text-amber-500 text-6xl md:text-8xl font-bold underline-offset-8 decoration-2">DAMA</p>
              <nav className="flex flex-col gap-9">
                {
                  navItems.map((item, i) => (
                    <NavigationItem
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

function NavigationItem({
  href,
  label,
  index,
  onClose
}: {
  href: string;
  label: string;
  index: number;
  lang?: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      custom={index}
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1, transition: { delay: index * 0.1, duration: 0.6 }, }}
    >
      <Link
        key={href}
        onClick={onClose}
        className="text-white text-6xl hover:rounded-0 hover:bg-transparent md:text-8xl font-bold underline-offset-8 decoration-2 hover:text-yellow-500 transition-all hover:no-underline hover:underline-offset-2"
        href={href}>
        {label}

      </Link>
    </motion.div>
  )

}
