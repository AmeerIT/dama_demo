import { getPodcasts } from "@/lib/appwrite/podcasts";
import { DefaultProps } from "@/lib/default-props";
import Image from "next/image";
import Link from "next/link";
import { Play, Headphones, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function PodcastPostsSection({ dictionary, lang }: DefaultProps) {
  const podcasts = await getPodcasts({ lang, limit: 5 });

  if (podcasts.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center py-12 text-muted-foreground">
            {dictionary.podcast?.episodes || "No episodes found"}
          </div>
        </div>
      </section>
    );
  }

  const featuredPodcast = podcasts[0];
  const episodes = podcasts;

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0 min";
    const mins = Math.floor(seconds / 60);
    return `${mins} ${dictionary.podcast.minutes}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === "ar" ? "ar" : "en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Spotlight Area - Left Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border/50 bg-background/5 text-primary font-bold text-sm mb-6">
                <Headphones className="w-4 h-4" />
                {dictionary.podcast.latestEpisode}
              </div>
              <h2 className="text-5xl font-extrabold mb-8">
                {dictionary.podcast.title.split(' ')[0]} <span className="text-muted-foreground">&</span> {dictionary.podcast.title.split(' ').slice(1).join(' ')}.
              </h2>

              {/* Featured Podcast Card */}
              <div className="p-8 rounded-[2.5rem] group-hover:bg-linear-to-br from-primary/20 to-secondary/20 border border-border/10">
                <Link href={`/${lang}/cast/${featuredPodcast.slug}`}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-8 group">
                    {featuredPodcast.cover_image && (
                      <Image
                        src={featuredPodcast.cover_image}
                        alt={lang === "ar" ? featuredPodcast.title_ar : featuredPodcast.title_en}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-6 bg-foreground rounded-full text-background hover:scale-110 transition-transform">
                        <Play className="fill-current w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </Link>

                <h3 className="text-2xl font-bold mb-2">
                  {lang === "ar" ? featuredPodcast.title_ar : featuredPodcast.title_en}
                </h3>
                {(featuredPodcast.excerpt_ar || featuredPodcast.excerpt_en) && (
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {lang === "ar" ? featuredPodcast.excerpt_ar : featuredPodcast.excerpt_en}
                  </p>
                )}

                {/* Audio Visualizer */}
                <div className="flex items-center justify-between py-4 border-t border-border/10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5 h-4 items-end">
                      {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8].map((v, i) => (
                        <div
                          key={i}
                          className="w-1 bg-primary rounded-full animate-bounce"
                          style={{
                            height: `${v * 100}%`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      {dictionary.podcast.nowPlaying}
                    </span>
                  </div>
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* List Area - Right Column */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-8 px-4">
              <h4 className="text-xl font-bold">{dictionary.podcast.episodes}</h4>
              <Link href={`/${lang}/cast`}>
                <Button variant="ghost" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                  {dictionary.podcast.allEpisodes}
                </Button>
              </Link>
            </div>

            {episodes.map((episode) => (
              <Link key={episode.id} href={`/${lang}/cast/${episode.slug}`}>
                <div className="group p-6 rounded-3xl border border-border/50 hover:border-primary/20 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:bg-background/50">
                  <div className="w-full md:w-24 aspect-square rounded-2xl overflow-hidden flex-shrink-0 relative">
                    {episode.cover_image && (
                      <Image
                        src={episode.cover_image}
                        alt={lang === "ar" ? episode.title_ar : episode.title_en}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                      <span>{formatDate(episode.published_at)}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                      <span>{formatDuration(episode.duration)}</span>
                    </div>
                    <h5 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {lang === "ar" ? episode.title_ar : episode.title_en}
                    </h5>
                    <p className="text-muted-foreground text-sm italic font-medium">
                      {lang === "ar" ? episode.author_ar : episode.author_en}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="p-4 rounded-full border border-border/50 bg-background/5 hover:bg-foreground text-foreground hover:text-background transition-all">
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
