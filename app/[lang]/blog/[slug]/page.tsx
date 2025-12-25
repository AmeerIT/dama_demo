import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPostBySlug, getAllPostSlugs } from "@/lib/appwrite/posts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { LexicalRenderer } from "@/components/lexical-renderer";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";

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
  const dictionary = await getDictionary(lang as Locale);
  const post = await getPostBySlug(slug, lang as Locale);

  if (!post) {
    notFound();
  }

  const title = lang === "ar" ? post.title_ar : post.title_en;
  const body = lang === "ar" ? post.body_ar : post.body_en;
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  const formattedDate = new Intl.DateTimeFormat(lang === "ar" ? "ar-IQ" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.published_at));

  // Get the alternate language for language switcher (same slug, different language)
  const alternateLang = lang === "ar" ? "en" : "ar";

  return (
    <article className="py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href={`/${lang}/blog`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {dictionary.common.blog}
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.published_at}>{formattedDate}</time>
            </div>

            {/* Language Switch for this post */}
            <Link
              href={`/${alternateLang}/blog/${post.slug}`}
              className="text-sm text-muted-foreground hover:rounded-3xl transition-all"
            >
              <UnderlineToBackground targetTextColor="var(--color-primary)" >
                {lang === "ar" ? "Read in English" : "اقرأ بالعربية"}
              </UnderlineToBackground>
            </Link>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags && post.tags.map((tag) => (
                <Link key={tag.id} href={`/${lang}/blog?tag=${tag.slug}`}>
                  <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                    {lang === "ar" ? tag.name_ar : tag.name_en}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={post.featured_image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary">
          <LexicalRenderer content={body} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Link href={`/${lang}/blog`}>
            <Button variant="outline" className="group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {lang === "ar" ? "العودة للمدونة" : "Back to Blog"}
            </Button>
          </Link>
        </footer>
      </div>
    </article>
  );
}

