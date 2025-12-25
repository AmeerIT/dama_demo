import Link from "next/link";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/appwrite/posts";

interface FeaturedPostsSectionProps {
  dictionary: Dictionary;
  lang: Locale;
}

export async function FeaturedPostsSection({ dictionary, lang }: FeaturedPostsSectionProps) {
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Fetch featured posts
  const posts = await getPosts({ lang, limit: 3 });

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {dictionary.blog.title}
            </h2>
            <p className="text-muted-foreground mt-2">
              {dictionary.blog.subtitle}
            </p>
          </div>
          <Link href={`/${lang}/blog`}>
            <Button variant="outline" className="group">
              {dictionary.common.viewAll}
              <ArrowIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {dictionary.blog.noPostsFound}
          </div>
        )}
      </div>
    </section>
  );
}

