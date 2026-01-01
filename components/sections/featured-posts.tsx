import { BlogCard } from "@/components/blog-card";
import { getPosts } from "@/lib/appwrite/posts";
import { DefaultProps } from "@/lib/default-props";
import { HeaderComponent } from "./header-component";
import sectionTheme from "@/lib/appwrite/default-font";

export async function FeaturedPostsSection({ dictionary, lang }: DefaultProps) {
  // Fetch featured posts
  const posts = await getPosts({ lang, limit: 3 });

  return (
    <section className={`${sectionTheme}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <HeaderComponent dictionary={dictionary} lang={lang} title={dictionary.blog?.title} subtitle={dictionary.blog?.subtitle}
          target="blog"
        />

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-lg">
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

