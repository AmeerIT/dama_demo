import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedPostsSection } from "@/components/sections/featured-posts";
import { ServicesSection } from "@/components/sections/services";
import { getServices } from "@/lib/appwrite/services";
import { PodcastPostsSection } from "@/components/sections/podcast-posts";
import { ProductionPostsSection } from "@/components/sections/production-posts";
import { CoursesPostsSection } from "@/components/sections/courses-posts";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export const revalidate = 300;

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const services = await getServices({ lang: lang as Locale });

  return (
    <div className="flex flex-col">
      <HeroSection dictionary={dictionary} lang={lang as Locale} />
      <div className="flex flex-col pt-50">
        <FeaturedPostsSection dictionary={dictionary} lang={lang as Locale} />
        <PodcastPostsSection dictionary={dictionary} lang={lang as Locale} />
        <ProductionPostsSection dictionary={dictionary} lang={lang as Locale} />
        <ServicesSection dictionary={dictionary} lang={lang as Locale} services={services} />
        <CoursesPostsSection dictionary={dictionary} lang={lang as Locale} />
      </div>
    </div>
  );
}

