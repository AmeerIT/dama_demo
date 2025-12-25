"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${lang}`, label: dictionary.common.home },
    { href: `/${lang}/insights`, label: dictionary.common.insights },
    { href: `/${lang}/blog`, label: dictionary.common.blog },
    { href: `/${lang}/services`, label: dictionary.common.services },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === `/${lang}` || pathname === `/${lang}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-screen px-10">
      <div className="mx-auto flex h-16 items-center justify-between  ">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <img
            src="/logo-dama.svg"
            alt="Dama Productions"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-150 ${isActive(item.href)
                ? "text-primary"
                : "text-foreground/70 hover:text-primary hover:bg-primary/10 rounded-md py-1 px-2"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Language Switcher + Mobile Menu */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} variant="button" />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-primary"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

