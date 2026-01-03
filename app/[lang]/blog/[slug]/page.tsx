import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPostBySlug, getAllPostSlugs } from "@/lib/appwrite/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ArrowRight, User, Sparkles, ChevronDown } from "lucide-react";
import { LexicalRenderer } from "@/components/lexical-renderer";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";
import { FormattedDate } from "@/components/formatted-date";
import { extractYouTubeId } from "@/lib/utils/youtube";
import { BlogBookmark } from "@/components/blog-bookmark";
import { Effra } from "@/app/[lang]/localFonts";

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

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug, lang as Locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = lang === "ar" ? post.title_ar : post.title_en;
  const excerpt = lang === "ar" ? post.excerpt_ar : post.excerpt_en;

  return {
    title: `${title} | Dama Productions`,
    description: excerpt || title,
    openGraph: {
      title,
      description: excerpt || title,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
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

  return (
    <div className={`relative ${Effra.className}`}>

      {/* HERO SECTION - Dramatic Full Screen (only if featured_image exists) */}
      {post.featured_image && (

        <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Parallax Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.featured_image}
              alt={title}
              fill
              className="object-cover scale-105"
              priority
            />
          </div>

          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-linear-to-b from-transparent to-background" /> */}
          {/* <div className="absolute inset-0 bg-linear-to-b from-background to-transparent top-0" /> */}

          {/* Hero Content */}
          <div className="relative top-0 z-10 text-center px-6 max-w-5xl space-y-8">
            {/* Editorial Label */}
            <div className="flex items-center justify-center gap-3 text-primary font-bold uppercase text-xs bg-background/70 backdrop-blur-md px-4 py-2 w-fit rounded-full mx-auto">
              <Sparkles size={16} />
              <span>{dictionary.blog.title}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-8xl font-bold text-balance text-white  leading-[1.1] bg-primary/75 backdrop-blur-3xl mt-20 pt-20 p-10 rounded-4xl" dir={isRTL ? "rtl" : "ltr"}>
              {title}
            </h1>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-xl md:text-2xl text-foreground font-light max-w-3xl mx-auto leading-relaxed italic">
                &ldquo;{excerpt}&rdquo;
              </p>
            )}

            {/* Scroll Indicator */}
            {/* <div className="animate-bounce scroll-smooth bg-primary rounded-full w-10 h-10 text-white mx-auto">
              <a href="#article-content">
                <ChevronDown className="mx-auto" size={32} />
              </a>
            </div> */}
          </div>
        </section>
      )}
      {/* ARTICLE CONTENT */}
      <article
        id="article-content"
        className="relative bg-transparent py-16 md:py-24 duration-200 scroll-smooth"
        style={{
          backgroundImage: post.featured_image ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, var(--color-background) 10%)' : 'none',
        }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-24">
          {/* Back Button */}
          <Link href={`/${lang}/blog`}>
            <Button variant="ghost" className="mb-8 group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {dictionary.common.blog}
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-12 md:mb-16 space-y-6 md:space-y-8">
            {/* Category/Tag Label with Decorative Line */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-3 text-primary font-bold tracking-widest uppercase text-xs">
                <span className="w-8 h-0.5 bg-secondary rounded-full" />
                {lang === "ar" ? post.tags[0].name_ar : post.tags[0].name_en}
              </div>
            )}

            {/* Title (if no featured image/hero) */}
            {!post.featured_image && (
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
                <span className="text-foreground">Dama Productions</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar size={16} className="opacity-50" />
                <time dateTime={post.published_at}>
                  <FormattedDate date={post.published_at} locale={lang} />
                </time>
              </div>

              {/* Language Switch */}
              <Link
                href={`/${alternateLang}/blog/${post.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
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

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag.id} href={`/${lang}/blog?tag=${tag.slug}`}>
                    <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                      {lang === "ar" ? tag.name_ar : tag.name_en}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Featured Video */}
          {post.video_url && (() => {
            const videoId = extractYouTubeId(post.video_url);
            if (videoId) {
              return (
                <div className="relative w-full mb-10 md:mb-12" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title}
                  />
                </div>
              );
            }
            return null;
          })()}

          {/* Article Body with Enhanced Typography */}
          <div className="max-w-full break-all overflow-hidden">
            <LexicalRenderer content={body} key={post.id} />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 md:mt-24 pt-8 md:pt-12 border-t ">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-3 md:gap-4">
                {post.tags && post.tags.map((tag) => (
                  <Link key={tag.id} href={`/${lang}/blog?tag=${tag.slug}`}>
                    <span className="text-xs font-bold cursor-pointer transition-all">
                      #{lang === "ar" ? tag.name_ar : tag.name_en}
                    </span>
                  </Link>
                ))}
              </div>

              {/* End Marker */}
              <div className="text-xs font-bold uppercase tracking-widest">
                {lang === "ar" ? "نهاية المقال" : "End of Article"}
              </div>
            </div>

            {/* Back Button */}
            <Link href={`/${lang}/blog`}>
              <Button variant="outline" className="group">
                <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
                {lang === "ar" ? "العودة للمدونة" : "Back to Blog"}
              </Button>
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}
