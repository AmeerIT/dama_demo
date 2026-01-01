import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/dictionaries";
import { type Post } from "@/lib/appwrite/types";
import AnimatedGradient from "./fancy/background/animated-gradient-with-svg";

interface BlogCardProps {
  post: Post;
  lang: Locale;
}

export function BlogCard({ post, lang }: BlogCardProps) {
  const title = lang === "ar" ? post.title_ar : post.title_en;
  const excerpt = lang === "ar" ? post.excerpt_ar : post.excerpt_en;

  return (
    <Link href={`/${lang}/blog/${post.slug}`}>
      <div className="relative group overflow-hidden rounded-3xl aspect-square w-full shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:primary">
        {post.featured_image && <Image
          src={post.featured_image}
          width={750}
          height={750}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />}
        <div className="absolute inset-0 bg-linear-to-t from-primary via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className="absolute top-5 left-5 flex flex-wrap gap-2 z-10">
          {
            post.tags &&
            post.tags.map((tag) => (
              <span key={tag.id} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground bg-background backdrop-blur-md rounded-full">
                {lang === "ar" ? tag.name_ar : tag.name_en}
              </span>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end min-h-[50%] z-20">
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end min-h-[50%] z-20">

            <h2 className="relative text-2xl md:text-3xl text-white group-hover:py-3 group-hover:px-6
            group-hover:rounded-3xl line-clamp-2
            group-hover:line-clamp-none group-hover:shadow-xl
            leading-tight group-hover:bg-primary/40 group-hover:backdrop-blur-2xl
            group-hover:font-bold transition-all duration-300 overflow-hidden">

              {/* --- MOVING BLURRY GRADIENT BLOBS --- */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <AnimatedGradient colors={["#ff6ec4f0", "#7873f50f", "#4ade8000", "#22d3ee00"]} speed={Math.random()} blur="heavy" />
              </div>

              <span className="relative z-10 ease-in" style={{
                textShadow: '0 0 5px rgba(0,0,0,0.3), 0 0 10px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.1)'
              }}>{title}</span>
            </h2>

            <div className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 group-hover:mt-4">
              <p className="text-sm text-white bg-primary/20 backdrop-blur-md group-hover:p-4 group-hover:rounded-2xl leading-relaxed line-clamp-3 border border-white/10">
                {excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

