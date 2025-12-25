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
      {/* 1. COMPACT NAV BAR (Closed State) */}
      <header className="fixed top-0 left-0 w-full z-[100] p-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <img src="/logo-dama.svg" alt="Logo" className="h-8 invert" />
        </Link>

        {/* The Store Button + Hamburger from your HTML */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/store" className="hidden md:flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-full font-black italic uppercase text-xs hover:scale-105 transition-transform">
            <StoreIcon />
            Store
          </Link>

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

      {/* 2. BIG REVEAL MENU (Open State) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "ellipse(0% 0% at 90% 10%)" }}
            animate={{ clipPath: "ellipse(150% 150% at 90% 10%)" }}
            exit={{ clipPath: "ellipse(0% 0% at 90% 10%)" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 bg-black text-white z-[90] flex items-center justify-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl px-10 items-center">

              {/* LEFT SIDE: The Image Grid (as seen in Lando's site) */}
              <div className="hidden md:flex gap-4 h-[60vh] overflow-hidden">
                <VerticalImageColumn images={['/img1.jpg', '/img2.jpg']} speed={-20} />
                <VerticalImageColumn images={['/img3.jpg', '/img4.jpg']} speed={20} />
              </div>

              {/* RIGHT SIDE: Huge Navigation Links */}
              <nav className="flex flex-col gap-4">
                {
                  navItems.map((item, i) => (
                    <NavLink key={item.href} label={item.label} index={i} />
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

function NavLink({ label, index }: { label: string, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
      className="group"
    >
      <Link href={`/${label.toLowerCase()}`} className="text-6xl md:text-8xl font-black italic uppercase hover:text-primary transition-colors inline-block leading-none">
        {label}
      </Link>
    </motion.div>
  );
}

function VerticalImageColumn({ images, speed }: { images: string[], speed: number }) {
  return (
    <motion.div
      animate={{ y: [0, speed] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      className="flex flex-col gap-4 w-1/2"
    >
      {images.map((src, i) => (
        <div key={i} className="aspect-[3/4] bg-neutral-800 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all">
          {/* Replace with real images */}
          <div className="w-full h-full bg-primary/20" />
        </div>
      ))}
    </motion.div>
  );
}

function StoreIcon() {
  return (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" className="w-4 h-4">
      <path d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199" stroke="currentColor" strokeWidth="1.949" />
    </svg>
  );
}
