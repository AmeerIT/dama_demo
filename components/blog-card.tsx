import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/lib/i18n/dictionaries";
import { type Post } from "@/lib/appwrite/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { FormattedDate } from "@/components/formatted-date";

interface BlogCardProps {
  post: Post;
  lang: Locale;
}

export function BlogCard({ post, lang }: BlogCardProps) {
  const title = lang === "ar" ? post.title_ar : post.title_en;
  const excerpt = lang === "ar" ? post.excerpt_ar : post.excerpt_en;

  return (
    <Link href={`/${lang}/blog/${post.slug}`}>
      <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-16/10 overflow-hidden">
            <Image
              src={post.featured_image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        )}

        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3">
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={tag.id || index} variant="secondary" className="text-xs">
                  {lang === "ar" ? tag.name_ar : tag.name_en}
                </Badge>
              ))}
            </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border/50">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={post.published_at}>
              <FormattedDate date={post.published_at} locale={lang} />
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

