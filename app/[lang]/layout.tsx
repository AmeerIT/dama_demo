import { notFound } from "next/navigation";
import { getDictionary, getDirection, isValidLocale, locales, type Locale } from "@/lib/i18n/dictionaries";
import StickyFooter from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import Header from "@/components/header";
import { Effra } from "./localFonts";
import { cn } from "@/lib/utils";

import { LayoutProps } from "@/lib/default-props";


export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const direction = getDirection(lang as Locale);
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} dir={direction} className={cn(`${Effra.className}-400`)}>
      <head>
      </head>
      <body >
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange>
            <div className="top-0 sticky z-100 py-2">
              <Header lang={lang as Locale} dictionary={dictionary} />
            </div>
            <main className="relative min-h-screen z-10" style={{ background: "var(--background)" }}>
              {children}
            </main>
            <StickyFooter lang={lang as Locale} dictionary={dictionary} />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html >
  );
}
