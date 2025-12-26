"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";

interface LanguageSwitcherProps {
  lang: Locale;
  variant?: "button" | "dropdown";
}

const languages = [
  { code: "ar" as const, name: "العربية", nativeName: "Arabic" },
  { code: "en" as const, name: "English", nativeName: "English" },
];

export function LanguageSwitcher({ lang, variant = "button" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Get the path without the language prefix
  const pathWithoutLang = pathname.replace(/^\/(ar|en)/, "") || "/";

  const getLanguagePath = (targetLang: Locale) => {
    return `/${targetLang}${pathWithoutLang}`;
  };

  if (variant === "button") {
    const otherLang = lang === "ar" ? "en" : "ar";
    const otherLangLabel = lang === "ar" ? "EN" : "ع";

    return (
      <Link href={getLanguagePath(otherLang)}>
        <Button variant="ghost" >
          <span>{otherLangLabel}</span>
        </Button>
      </Link>
    );
  }

  // Dropdown variant
  const currentLang = languages.find((l) => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button >
          <span>{currentLang?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" >
        {languages.map((language) => (
          <DropdownMenuItem key={language.code} asChild>
            <Link
              href={getLanguagePath(language.code)}
              className="flex items-center justify-between w-full"
            >
              <span>{language.name}</span>
              {lang === language.code}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

