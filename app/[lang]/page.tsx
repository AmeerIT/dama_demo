import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedPostsSection } from "@/components/sections/featured-posts";
import { ServicesSection } from "@/components/sections/services";
import { getServices } from "@/lib/appwrite/services";

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  // Fetch services for the stacking cards section
  const services = await getServices({ lang: lang as Locale });

  return (
    <div className="flex flex-col">
      <HeroSection dictionary={dictionary} lang={lang as Locale} />
      <ServicesSection dictionary={dictionary} lang={lang as Locale} services={services} />
      <FeaturedPostsSection dictionary={dictionary} lang={lang as Locale} />
    </div>
  );
}

