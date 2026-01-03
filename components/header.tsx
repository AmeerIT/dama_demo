"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { DefaultProps } from "@/lib/default-props";
import { cn } from "@/lib/utils";
import { Effra } from "@/app/[lang]/localFonts";

export default function Header({ lang, dictionary }: DefaultProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: `/${lang}`, label: dictionary.common.home },
    { href: `/${lang}/blog`, label: dictionary.common.news },
    { href: `/${lang}/courses`, label: dictionary.common.courses },
    { href: `/${lang}/services`, label: dictionary.common.doctors },
    { href: `/${lang}/contact`, label: dictionary.common.mail },
  ];

  return (
    <nav className={cn("sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100", Effra.className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Navigation Links */}
          <div className="flex items-center space-x-reverse space-x-8">
            <Link href={`/${lang}`} className="flex-shrink-0 flex items-center">
              <div className="text-blue-600 font-bold text-2xl flex items-center">
                <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
                <span>DAMA</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-reverse space-x-6 text-gray-700 font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-reverse space-x-3">
            <LanguageSwitcher lang={lang} />
            <button className="bg-[#e91e63] text-white px-6 py-2 rounded-md hover:bg-[#d81b60] transition-all font-medium">
              {dictionary.common.subscribeCTA}
            </button>
            <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition-all font-medium border border-gray-200">
              {dictionary.common.contact}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-reverse space-x-3">
            <LanguageSwitcher lang={lang} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
          <button className="w-full bg-[#e91e63] text-white px-6 py-2 rounded-md font-medium mt-4">
            {dictionary.common.subscribeCTA}
          </button>
        </div>
      )}
    </nav>
  );
}
