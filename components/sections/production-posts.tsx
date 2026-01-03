import { getPosts } from "@/lib/appwrite/posts";
import { DefaultProps } from "@/lib/default-props";
import Image from "next/image";
import Link from "next/link";

export async function ProductionPostsSection({ dictionary, lang }: DefaultProps) {
  // Fetch 3 posts for the production showcase
  // In the future, this can be filtered by a "production" tag
  const posts = await getPosts({ lang, limit: 3 });

  if (posts.length === 0) {
    return null; // Don't render if no posts
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          {dictionary.production.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => {
            const title = lang === "ar" ? post.title_ar : post.title_en;

            return (
              <Link
                key={post.id}
                href={`/${lang}/blog/${post.slug}`}
                className="text-center group cursor-pointer"
              >
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-50 group-hover:shadow-lg transition-all">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
