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
import { ScrollProgress } from "@/components/scroll-progress";
import { Effra } from "@/app/[lang]/localFonts";

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
    <div className={`${Effra.className}`}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* ARTICLE CONTENT */}
      <article className="relative bg-background py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link href={`/${lang}/cast`}>
            <Button variant="ghost" className="mb-6 group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {lang === "ar" ? "البودكاست" : "Podcasts"}
            </Button>
          </Link>

          {/* Cover Image - Contained with rounded borders */}
          {podcast.cover_image && (
            <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10 shadow-xl">
              <Image
                src={podcast.cover_image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-10 md:mb-14 space-y-6">
            {/* Category/Tag Label with Decorative Line */}
            {podcast.tags && podcast.tags.length > 0 && (
              <div className="flex items-center gap-3 text-primary font-bold tracking-widest uppercase text-xs">
                <span className="w-8 h-0.5 bg-primary rounded-full" />
                {lang === "ar" ? podcast.tags[0].name_ar : podcast.tags[0].name_en}
              </div>
            )}

            {/* Title - Always visible below image */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.15] text-balance"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {title}
            </h1>

            {/* Compact Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={12} className="text-primary" />
                </div>
                <span>{author}</span>
              </div>

              <span className="text-muted-foreground/30">•</span>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar size={14} className="opacity-60" />
                <time dateTime={podcast.published_at}>
                  <FormattedDate date={podcast.published_at} locale={lang} />
                </time>
              </div>

              {/* Duration */}
              {podcast.duration && (
                <>
                  <span className="text-muted-foreground/30">•</span>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="opacity-60" />
                    <span>{formatDuration(podcast.duration)}</span>
                  </div>
                </>
              )}

              <span className="text-muted-foreground/30">•</span>

              {/* Language Switch */}
              <Link
                href={`/${alternateLang}/cast/${podcast.slug}`}
                className="hover:text-primary transition-colors"
              >
                <UnderlineToBackground targetTextColor="var(--color-primary)">
                  {lang === "ar" ? "Listen in English" : "استمع بالعربية"}
                </UnderlineToBackground>
              </Link>
            </div>

            {/* Excerpt as Quote */}
            {excerpt && (
              <blockquote
                className={`text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed italic
                  border-l-4 border-primary pl-5 sm:pl-6 py-1
                  ${isRTL ? "border-l-0 border-r-4 pl-0 pr-5 sm:pr-6" : ""}`}
              >
                &ldquo;{excerpt}&rdquo;
              </blockquote>
            )}

            {/* Tags - Between excerpt and body */}
            {podcast.tags && podcast.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {podcast.tags.map((tag) => (
                  <Link key={tag.id} href={`/${lang}/cast?tag=${tag.slug}`}>
                    <Badge
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                    >
                      {lang === "ar" ? tag.name_ar : tag.name_en}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Audio Player */}
          {podcast.audio_url && (
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-10 md:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">
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
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-10 md:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">
                  {lang === "ar" ? "شاهد الحلقة" : "Watch Episode"}
                </h2>
              </div>
              <video controls className="w-full rounded-xl" preload="metadata">
                <source src={podcast.video_url} type="video/mp4" />
                {lang === "ar"
                  ? "متصفحك لا يدعم تشغيل الفيديو"
                  : "Your browser does not support the video element."}
              </video>
            </div>
          )}

          {/* Article Body */}
          <div className="max-w-full overflow-hidden">
            <LexicalRenderer content={body} key={podcast.id} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 md:mt-20 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Hashtag Tags */}
              <div className="flex flex-wrap gap-3">
                {podcast.tags &&
                  podcast.tags.map((tag) => (
                    <Link key={tag.id} href={`/${lang}/cast?tag=${tag.slug}`}>
                      <span className="text-xs font-semibold text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                        #{lang === "ar" ? tag.name_ar : tag.name_en}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Back Button */}
            <Link href={`/${lang}/cast`}>
              <Button variant="outline" className="group">
                <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                {lang === "ar" ? "العودة للبودكاست" : "Back to Podcasts"}
              </Button>
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}
