import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getServices } from "@/lib/appwrite/services";
import { ServiceCard } from "@/components/service-card";
import sectionTheme from "@/lib/appwrite/default-font";
// Revalidate every 5 minutes (ISR) - Balance between freshness and server load
export const revalidate = 300;

interface PageProps {
    params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as Locale);

    return {
        title: `${dictionary.Insights.title} | Dama Productions`,
        description: dictionary.Insights.subtitle,
    };
}

export default async function ServicesPage({ params }: PageProps) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as Locale);
    return (
        <div className={sectionTheme}>
            COMING SOON
        </div>
    );
}
