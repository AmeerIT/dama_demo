import { getPosts } from "@/lib/appwrite/posts";
import { DefaultProps } from "@/lib/default-props";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function FeaturedPostsSection({ dictionary, lang }: DefaultProps) {
  const posts = await getPosts({ lang, limit: 4 });

  if (posts.length === 0) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-start py-12 text-muted-foreground">
            {dictionary.blog.noPostsFound}
          </div>
        </div>
      </section>
    );
  }

  const featuredPost = posts[0];
  const sidebarPosts = posts.slice(1, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === "ar" ? "ar" : "en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Center Header */}
        <div className="flex flex-col mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 w-fit">
            {dictionary.blog.title.split(' ')[0]} <span className="text-muted-foreground italic">{dictionary.blog.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-muted-foreground w-fit  self-end-safe">{dictionary.blog.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Post - Left Column */}
          <Link href={`/${lang}/blog/${featuredPost.slug}`} className="lg:col-span-7 group cursor-pointer">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-16/10 mb-8">
              {featuredPost.featured_image && (
                <Image
                  src={featuredPost.featured_image}
                  alt={lang === "ar" ? featuredPost.title_ar : featuredPost.title_en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              {featuredPost.tags && featuredPost.tags.length > 0 && (
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-foreground text-background font-bold text-xs uppercase tracking-wider">
                  {lang === "ar" ? featuredPost.tags[0].name_ar : featuredPost.tags[0].name_en}
                </div>
              )}
            </div>
            <div className="px-2">
              <div className="flex items-start gap-4 text-xs text-muted-foreground mb-4 font-bold tracking-widest uppercase">
                <span>{formatDate(featuredPost.published_at)}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                {lang === "ar" ? featuredPost.title_ar : featuredPost.title_en}
              </h3>
              {(featuredPost.excerpt_ar || featuredPost.excerpt_en) && (
                <p className="text-muted-foreground text-lg max-w-2xl">
                  {lang === "ar" ? featuredPost.excerpt_ar : featuredPost.excerpt_en}
                </p>
              )}
            </div>
          </Link>

          {/* Sidebar Posts - Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {sidebarPosts.map((post) => (
              <Link key={post.id} href={`/${lang}/blog/${post.slug}`} className="group cursor-pointer flex gap-6 items-start">
                <div className="w-32 md:w-48 aspect-square flex-shrink-0 rounded-2xl overflow-hidden">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={lang === "ar" ? post.title_ar : post.title_en}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  {post.tags && post.tags.length > 0 && (
                    <div className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">
                      {lang === "ar" ? post.tags[0].name_ar : post.tags[0].name_en}
                    </div>
                  )}
                  <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {lang === "ar" ? post.title_ar : post.title_en}
                  </h4>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground font-medium">
                    {formatDate(post.published_at)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}

            {/* View All Button */}
            <div className="mt-auto pt-6">
              <Link href={`/${lang}/blog`}>
                <Button
                  variant="outline"
                  className="w-full py-4 border-border hover:border-border/50 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest"
                >
                  {dictionary.common.viewAll}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
