import { getDictionary, getDirection, isValidLocale, Locale, locales } from "@/lib/i18n/dictionaries";
import { LayoutProps } from "@/lib/default-props";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function CasesLayout({ children, params }: LayoutProps) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const direction = getDirection(lang as Locale);
    const dictionary = await getDictionary(lang as Locale);

    return (
        <html dir={direction} lang={lang}>
            <head />
            <body>
                <div className="px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </body>
        </html>
    );
}
