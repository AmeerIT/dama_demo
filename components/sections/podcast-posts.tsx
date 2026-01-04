import { getPodcasts } from "@/lib/appwrite/podcasts";
import { DefaultProps } from "@/lib/default-props";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export async function PodcastPostsSection({ dictionary, lang }: DefaultProps) {
  const podcasts = await getPodcasts({ lang, limit: 3 });

  if (podcasts.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 text-gray-500">
            {dictionary.podcast?.episodes || "No episodes found"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">{dictionary.podcast.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((podcast) => {
            const title = lang === "ar" ? podcast.title_ar : podcast.title_en;

            return (
              <Link key={podcast.id} href={`/${lang}/cast/${podcast.slug}`} className="group cursor-pointer">
                <div className="aspect-auto bg-blue-100 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow relative">
                  {podcast.cover_image && (
                    <Image
                      src={podcast.cover_image}
                      alt={title}
                      width={700}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <button className="bg-[#e91e63] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#d81b60] transition-colors">
                  {dictionary.common.learnMore}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
