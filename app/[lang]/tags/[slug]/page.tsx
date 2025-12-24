import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getPosts } from "@/lib/appwrite/posts";
import { getTagBySlug, getAllTagSlugs } from "@/lib/appwrite/tags";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Tag } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ lang: locale, slug });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return { title: "Tag Not Found" };
  }

  const tagName = lang === "ar" ? tag.name_ar : tag.name_en;

  return {
    title: `${dictionary.tags.postsTagged} "${tagName}" | Dama Productions`,
  };
}

export default async function TagPostsPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const posts = await getPosts({ lang: lang as Locale, tagSlug: slug });
  const tagName = lang === "ar" ? tag.name_ar : tag.name_en;
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href={`/${lang}/blog`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {dictionary.common.blog}
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
              <Tag className="h-5 w-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {tagName}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            {dictionary.tags.postsTagged} &quot;{tagName}&quot;
          </p>
        </div>

        {/* Posts Grid */}
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

