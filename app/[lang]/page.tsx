import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedPostsSection } from "@/components/sections/featured-posts";
import { ServicesSection } from "@/components/sections/services";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col">
      <HeroSection dictionary={dictionary} lang={lang as Locale} />
      <FeaturedPostsSection dictionary={dictionary} lang={lang as Locale} />
      <ServicesSection dictionary={dictionary} lang={lang as Locale} />
    </div>
  );
}

