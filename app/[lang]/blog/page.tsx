import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPosts } from "@/lib/appwrite/posts";
import { getTags } from "@/lib/appwrite/tags";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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
    title: `${dictionary.blog.title} | Dama Productions`,
    description: dictionary.blog.subtitle,
  };
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { tag } = await searchParams;
  const dictionary = await getDictionary(lang as Locale);

  const [posts, tags] = await Promise.all([
    getPosts({ lang: lang as Locale, tagSlug: tag }),
    getTags(),
  ]);

  return (
    <div className="py-12 px-4 sm:px-6">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
          {dictionary.blog.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {dictionary.blog.subtitle}
        </p>
      </div>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            <Link href={`/${lang}/blog`}>
              <Badge
                variant={!tag ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90"
              >
                {lang === "ar" ? "الكل" : "All"}
              </Badge>
            </Link>
            {tags.map((t) => (
              <Link key={t.id} href={`/${lang}/blog?tag=${t.slug}`}>
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

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} lang={lang as Locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {dictionary.blog.noPostsFound}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

