import { notFound } from "next/navigation";
import { getDictionary, getDirection, isValidLocale, locales, type Locale } from "@/lib/i18n/dictionaries";
import StickyFooter from "@/components/footer";
import Header from "@/components/header";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const direction = getDirection(lang as Locale);
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} dir={direction}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Header lang={lang as Locale} dictionary={dictionary} />
        <main className="relative min-h-screen z-10" style={{ background: "var(--background)" }}>
          <div className="relative min-h-screen max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        <StickyFooter lang={lang as Locale} dictionary={dictionary} />
      </body>
    </html>
  );
}

