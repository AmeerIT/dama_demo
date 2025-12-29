import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPodcastBySlug, getAllPodcastSlugs } from "@/lib/appwrite/podcasts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ArrowRight, Clock, Headphones, Video, User } from "lucide-react";
import { LexicalRenderer } from "@/components/lexical-renderer";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { FormattedDate } from "@/components/formatted-date";

// Revalidate every 5 minutes (ISR) - Balance between freshness and server load
export const revalidate = 300;

// Generate pages for existing podcasts, new ones will be generated on-demand
export async function generateStaticParams() {
  const slugs = await getAllPodcastSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({
        lang: locale,
        slug: slug,
      });
    }
  }

  return params;
}

// Enable fallback for podcasts not pre-rendered
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const podcast = await getPodcastBySlug(slug, lang as Locale);

  if (!podcast) {
    return { title: "Podcast Not Found" };
  }

  const title = lang === "ar" ? podcast.title_ar : podcast.title_en;
  const excerpt = lang === "ar" ? podcast.excerpt_ar : podcast.excerpt_en;

  return {
    title: `${title} | Dama Productions`,
    description: excerpt || title,
    openGraph: {
      title,
      description: excerpt || title,
      images: podcast.cover_image ? [podcast.cover_image] : [],
    },
  };
}

// Helper to format duration from seconds to HH:MM:SS or MM:SS
function formatDuration(seconds?: number): string {
  if (!seconds) return "";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export default async function PodcastDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  // Handle placeholder slug from generateStaticParams
  if (slug === '__no_podcasts_placeholder__') {
    notFound();
  }

  const dictionary = await getDictionary(lang as Locale);
  const podcast = await getPodcastBySlug(slug, lang as Locale);

  if (!podcast) {
    notFound();
  }

  const title = lang === "ar" ? podcast.title_ar : podcast.title_en;
  const author = lang === "ar" ? podcast.author_ar : podcast.author_en;
  const excerpt = lang === "ar" ? podcast.excerpt_ar : podcast.excerpt_en;
  const body = lang === "ar" ? podcast.body_ar : podcast.body_en;
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Get the alternate language for language switcher (same slug, different language)
  const alternateLang = lang === "ar" ? "en" : "ar";

  return (
    <article className="py-12 px-4 sm:px-6 max-w-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href={`/${lang}/cast`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {lang === "ar" ? "البودكاست" : "Podcasts"}
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-2 text-xl text-muted-foreground mb-4">
            <User className="h-5 w-5" />
            <span>{author}</span>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={podcast.published_at}>
                <FormattedDate date={podcast.published_at} locale={lang} />
              </time>
            </div>

            {podcast.duration && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(podcast.duration)}</span>
              </div>
            )}

            {/* Language Switch for this podcast */}
            <Link
              href={`/${alternateLang}/cast/${podcast.slug}`}
              className="text-sm text-muted-foreground hover:rounded-3xl transition-all"
            >
              <UnderlineToBackground targetTextColor="var(--color-primary)">
                {lang === "ar" ? "Listen in English" : "استمع بالعربية"}
              </UnderlineToBackground>
            </Link>
          </div>

          {/* Tags */}
          {podcast.tags && podcast.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {podcast.tags.map((tag) => (
                <Link key={tag.id} href={`/${lang}/cast?tag=${tag.slug}`}>
                  <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                    {lang === "ar" ? tag.name_ar : tag.name_en}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {podcast.cover_image && (
          <div className="relative aspect-square rounded-xl overflow-hidden mb-10">
            <Image
              src={podcast.cover_image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          </div>
        )}

        {/* Audio Player */}
        {podcast.audio_url && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">
                {lang === "ar" ? "استمع للحلقة" : "Listen to Episode"}
              </h2>
            </div>
            <audio controls className="w-full" preload="metadata">
              <source src={podcast.audio_url} type="audio/mpeg" />
              {lang === "ar"
                ? "متصفحك لا يدعم تشغيل الصوت"
                : "Your browser does not support the audio element."}
            </audio>
          </div>
        )}

        {/* Video Player */}
        {podcast.video_url && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Video className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">
                {lang === "ar" ? "شاهد الحلقة" : "Watch Episode"}
              </h2>
            </div>
            <video controls className="w-full rounded-lg" preload="metadata">
              <source src={podcast.video_url} type="video/mp4" />
              {lang === "ar"
                ? "متصفحك لا يدعم تشغيل الفيديو"
                : "Your browser does not support the video element."}
            </video>
          </div>
        )}

        {/* Article Body */}
        <div className="max-w-screen wrap-break-word prose prose-lg dark:prose-invert max-w-none mb-12">
          <LexicalRenderer content={body} key={podcast.id} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Link href={`/${lang}/cast`}>
            <Button variant="outline" className="group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {lang === "ar" ? "العودة للبودكاست" : "Back to Podcasts"}
            </Button>
          </Link>
        </footer>
      </div>
    </article>
  );
}
