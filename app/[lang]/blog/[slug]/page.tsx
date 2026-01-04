import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPostBySlug, getAllPostSlugs } from "@/lib/appwrite/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ArrowRight, User } from "lucide-react";
import { LexicalRenderer } from "@/components/lexical-renderer";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { FormattedDate } from "@/components/formatted-date";
import { extractYouTubeId } from "@/lib/utils/youtube";
import { BlogBookmark } from "@/components/blog-bookmark";
import { ScrollProgress } from "@/components/scroll-progress";
import { Effra } from "@/app/[lang]/localFonts";
import { generatePageMetadata } from "@/lib/utils/metadata";
import { siteConfig } from "@/lib/config/site";
import { Metadata } from "next";

// Revalidate every 5 minutes (ISR) - Balance between freshness and server load
export const revalidate = 300;

// Generate pages for existing posts, new ones will be generated on-demand
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
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

// Enable fallback for posts not pre-rendered
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug, lang as Locale);

  if (!post) {
    return {
      title: "Post Not Found | Dama Productions",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = lang === "ar" ? post.title_ar : post.title_en;
  const excerpt = lang === "ar" ? post.excerpt_ar : post.excerpt_en;

  // Extract tag names for metadata
  const tagNames =
    post.tags?.map((tag) => (lang === "ar" ? tag.name_ar : tag.name_en)) || [];

  return generatePageMetadata({
    title,
    description: excerpt || title,
    slug,
    lang: lang as Locale,
    imageUrl: post.featured_image, // Already converted to full URL in getPostBySlug
    publishedTime: post.published_at,
    modifiedTime: post.published_at, // Use published_at as fallback if no updated_at
    authors: ["Dama Productions"],
    tags: tagNames,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;

  // Handle placeholder slug from generateStaticParams
  if (slug === '__no_posts_placeholder__') {
    notFound();
  }

  const dictionary = await getDictionary(lang as Locale);
  const post = await getPostBySlug(slug, lang as Locale);

  if (!post) {
    notFound();
  }

  const title = lang === "ar" ? post.title_ar : post.title_en;
  const excerpt = lang === "ar" ? post.excerpt_ar : post.excerpt_en;
  const body = lang === "ar" ? post.body_ar : post.body_en;
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Get the alternate language for language switcher (same slug, different language)
  const alternateLang = lang === "ar" ? "en" : "ar";

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt || title,
    image: post.featured_image || `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Organization",
      name: "Dama Productions",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Dama Productions",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${lang}/blog/${slug}`,
    },
    ...(post.tags &&
      post.tags.length > 0 && {
      keywords: post.tags
        .map((tag) => (lang === "ar" ? tag.name_ar : tag.name_en))
        .join(", "),
    }),
    inLanguage: lang === "ar" ? "ar" : "en",
  };

  return (
    <div className={`${Effra.className}`}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ARTICLE CONTENT */}
      <article className="relative bg-background py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link href={`/${lang}/blog`}>
            <Button variant="ghost" className="mb-6 group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {dictionary.common.blog}
            </Button>
          </Link>

          {/* Featured Image - Contained with rounded borders */}
          {post.featured_image && (
            <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10 shadow-xl">
              <Image
                src={post.featured_image}
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
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-3 text-primary font-bold tracking-widest uppercase text-xs">
                <span className="w-8 h-0.5 bg-primary rounded-full" />
                {lang === "ar" ? post.tags[0].name_ar : post.tags[0].name_en}
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
                <span>Dama Productions</span>
              </div>

              <span className="text-muted-foreground/30">•</span>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar size={14} className="opacity-60" />
                <time dateTime={post.published_at}>
                  <FormattedDate date={post.published_at} locale={lang} />
                </time>
              </div>

              <span className="text-muted-foreground/30">•</span>

              {/* Language Switch */}
              <Link
                href={`/${alternateLang}/blog/${post.slug}`}
                className="hover:text-primary transition-colors"
              >
                <UnderlineToBackground targetTextColor="var(--color-primary)">
                  {lang === "ar" ? "Read in English" : "اقرأ بالعربية"}
                </UnderlineToBackground>
              </Link>

              {/* Bookmark Button */}
              <div className="ml-auto">
                <BlogBookmark postSlug={post.slug} />
              </div>
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
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/${lang}/blog?tag=${tag.slug}`}>
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

          {/* Featured Video */}
          {post.video_url &&
            (() => {
              const videoId = extractYouTubeId(post.video_url);
              if (videoId) {
                return (
                  <div
                    className="relative w-full mb-10 md:mb-12 rounded-xl overflow-hidden"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={title}
                    />
                  </div>
                );
              }
              return null;
            })()}

          {/* Article Body */}
          <div className="max-w-full overflow-hidden">
            <LexicalRenderer content={body} key={post.id} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 md:mt-20 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Hashtag Tags */}
              <div className="flex flex-wrap gap-3">
                {post.tags &&
                  post.tags.map((tag) => (
                    <Link key={tag.id} href={`/${lang}/blog?tag=${tag.slug}`}>
                      <span className="text-xs font-semibold text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                        #{lang === "ar" ? tag.name_ar : tag.name_en}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Back Button */}
            <Link href={`/${lang}/blog`}>
              <Button variant="outline" className="group">
                <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                {lang === "ar" ? "انسايتس" : "Insights"}
              </Button>
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}
