import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { getPodcasts } from "@/lib/appwrite/podcasts";
import { getTags } from "@/lib/appwrite/tags";
import { PodcastCard } from "@/components/podcast-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import CastHero from "./hero";

// Revalidate every 5 minutes (ISR) - Balance between freshness and server load
export const revalidate = 300;

// Enable dynamic rendering only for tag filter parameter
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tag?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return {
    title: `Podcasts | Dama Productions`,
    description: "Listen to our latest podcasts and episodes",
  };
}

export default async function CastPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { tag } = await searchParams;

  const [podcasts, tags] = await Promise.all([
    getPodcasts({ lang: lang as Locale, tagSlug: tag }),
    getTags(),
  ]);

  return (
    <div>
      <div className="px-4 sm:px-6 py-16">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            {lang === "ar" ? "البودكاست" : "Podcasts"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {lang === "ar"
              ? "استمع إلى أحدث حلقات البودكاست لدينا"
              : "Listen to our latest podcast episodes"}
          </p>
        </div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-wrap gap-2">
              <Link href={`/${lang}/cast`}>
                <Badge
                  variant={!tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90">
                  {lang === "ar" ? "الكل" : "All"}
                </Badge>
              </Link>
              {tags.map((t) => (
                <Link key={t.id} href={`/${lang}/cast?tag=${t.slug}`}>
                  <Badge
                    variant={tag === t.slug ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90"
                  >
                    {lang === "ar" ? t.name_ar : t.name_en}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Podcasts Grid */}
        <div className="max-w-7xl mx-auto">
          {podcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} lang={lang as Locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                {lang === "ar" ? "لا توجد حلقات بودكاست" : "No podcasts found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
