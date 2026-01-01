"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  lang: Locale;
  variant?: "button";
}

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
        <Button variant="ghost">
          <div className="justify-center-safe content-center-safe">
            {
              otherLangLabel
            }
          </div>
        </Button>
      </Link>
    );
  }
}

