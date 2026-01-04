import { notFound } from "next/navigation";
import { getDictionary, getDirection, isValidLocale, locales, type Locale } from "@/lib/i18n/dictionaries";
import { MegaFooter } from "@/components/footer/mega-footer";
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
    <html lang={lang} dir={direction} className={Effra.className}>
      <head>
      </head>
      <body className="font-normal">
        <SmoothScroll>
          <ThemeProvider
            defaultTheme="light"
            disableTransitionOnChange>
            <Header lang={lang as Locale} dictionary={dictionary} />
            <main className="relative min-h-screen z-10" >
              {children}
            </main>
            <MegaFooter lang={lang as Locale} dictionary={dictionary} />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html >
  );
}

