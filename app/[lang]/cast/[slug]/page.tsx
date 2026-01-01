import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPodcastBySlug, getAllPodcastSlugs } from "@/lib/appwrite/podcasts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ArrowRight, Clock, Headphones, Video, User, Sparkles, ChevronDown } from "lucide-react";
import { LexicalRenderer } from "@/components/lexical-renderer";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { FormattedDate } from "@/components/formatted-date";
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
    <div className={`relative ${Effra.className}`}>
      {/* HERO SECTION - Dramatic Full Screen (only if cover_image exists) */}
      {podcast.cover_image && (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900">
          {/* Parallax Background Image */}
          <div className="absolute inset-0">
            <Image
              src={podcast.cover_image}
              alt={title}
              fill
              className="object-cover opacity-50 scale-105"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" />
          <div className="absolute inset-0 bg-linear-to-b from-background to-transparent top-0" />

          {/* Hero Content */}
          <div className="relative z-10 text-center px-6 max-w-5xl space-y-8">
            {/* Editorial Label */}
            <div className="flex items-center justify-center gap-3 text-primary font-bold uppercase text-xs">
              <Sparkles size={16} />
              <span>{lang === "ar" ? "البودكاست" : "Podcast"}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-8xl font-bold text-foreground text-balance leading-[1.1]">
              {title}
            </h1>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-xl md:text-2xl text-foreground font-light max-w-3xl mx-auto leading-relaxed italic">
                &ldquo;{excerpt}&rdquo;
              </p>
            )}

            {/* Scroll Indicator */}
            <div className="pt-12 animate-bounce">
              <ChevronDown className="mx-auto" size={32} />
            </div>
          </div>
        </section>
      )}

      {/* ARTICLE CONTENT */}
      <article className="relative bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-24">
          {/* Back Button */}
          <Link href={`/${lang}/cast`}>
            <Button variant="ghost" className="mb-8 group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {lang === "ar" ? "البودكاست" : "Podcasts"}
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-12 md:mb-16 space-y-6 md:space-y-8">
            {/* Category/Tag Label with Decorative Line */}
            {podcast.tags && podcast.tags.length > 0 && (
              <div className="flex items-center gap-3 text-primary font-bold tracking-widest uppercase text-xs">
                <span className="w-8 h-0.5 bg-secondary rounded-full" />
                {lang === "ar" ? podcast.tags[0].name_ar : podcast.tags[0].name_en}
              </div>
            )}

            {/* Title (if no cover_image/hero) */}
            {!podcast.cover_image && (
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] text-balance">
                {title}
              </h1>
            )}

            {/* Excerpt as Bordered Quote */}
            {excerpt && (
              <p className={`text-lg sm:text-xl md:text-2xl text-foreground font-light leading-relaxed
                            border-l-4 border-slate-200 pl-4 sm:pl-6 py-2
                            ${isRTL ? 'border-l-0 border-r-4 pl-0 pr-4 sm:pr-6' : ''}`}>
                {excerpt}
              </p>
            )}

            {/* Rich Metadata */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-foreground font-medium">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                  <User size={14} className="text-foreground" />
                </div>
                <span className="text-foreground">{author}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar size={16} className="opacity-50" />
                <time dateTime={podcast.published_at}>
                  <FormattedDate date={podcast.published_at} locale={lang} />
                </time>
              </div>

              {/* Duration */}
              {podcast.duration && (
                <div className="flex items-center gap-2">
                  <Clock size={16} className="opacity-50" />
                  <span>{formatDuration(podcast.duration)}</span>
                </div>
              )}

              {/* Language Switch */}
              <Link
                href={`/${alternateLang}/cast/${podcast.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <UnderlineToBackground targetTextColor="var(--color-primary)">
                  {lang === "ar" ? "Listen in English" : "استمع بالعربية"}
                </UnderlineToBackground>
              </Link>
            </div>

            {/* Tags */}
            {podcast.tags && podcast.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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

          {/* Audio Player */}
          {podcast.audio_url && (
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-10 md:mb-12">
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
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-10 md:mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">
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

          {/* Article Body with Enhanced Typography */}
          <div className="max-w-full break-all overflow-hidden">
            <LexicalRenderer content={body} key={podcast.id} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 md:mt-24 pt-8 md:pt-12 border-t">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {podcast.tags && podcast.tags.map((tag) => (
                  <Link key={tag.id} href={`/${lang}/cast?tag=${tag.slug}`}>
                    <span className="text-xs font-bold cursor-pointer transition-all">
                      #{lang === "ar" ? tag.name_ar : tag.name_en}
                    </span>
                  </Link>
                ))}
              </div>

              {/* End Marker */}
              <div className="text-xs font-bold uppercase tracking-widest">
                {lang === "ar" ? "نهاية الحلقة" : "End of Episode"}
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
