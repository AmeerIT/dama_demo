import { getPosts } from "@/lib/appwrite/posts";
import { DefaultProps } from "@/lib/default-props";
import Image from "next/image";
import Link from "next/link";

export async function FeaturedPostsSection({ dictionary, lang }: DefaultProps) {
  const posts = await getPosts({ lang, limit: 4 });

  if (posts.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-gray-500">
            {dictionary.blog.noPostsFound}
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === "ar" ? "ar" : "en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{dictionary.blog.latestNews}</h2>
          <Link href={`/${lang}/blog`} className="text-blue-600 font-semibold hover:underline">
            {dictionary.common.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => {
            const title = lang === "ar" ? post.title_ar : post.title_en;
            const excerpt = lang === "ar" ? post.excerpt_ar : post.excerpt_en;

            return (
              <Link
                key={post.id}
                href={`/${lang}/blog/${post.slug}`}
                className="flex bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-1/3 min-w-[140px]">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6 w-2/3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                  {excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>
                  )}
                  <button className="text-[#e91e63] font-bold text-sm hover:underline">
                    {dictionary.common.learnMore}
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
