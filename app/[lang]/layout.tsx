import { notFound } from "next/navigation";
import { getDictionary, getDirection, isValidLocale, locales, type Locale } from "@/lib/i18n/dictionaries";
import StickyFooter from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
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
        <link rel="stylesheet" href="https://api.center-phone.com/v1/storage/buckets/694c1573001db670c6e6/files/694db3a1003327ebc2ad/view?project=694beec300098b09a52c" />
        <link rel="stylesheet" href="https://api.center-phone.com/v1/storage/buckets/694c1573001db670c6e6/files/694db3a1003327ebc2ad/view?project=694beec300098b09a52c" />
      </head>
      <body >
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange>
            <Header lang={lang as Locale} dictionary={dictionary} />
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

