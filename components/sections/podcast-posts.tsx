import { getPodcasts } from "@/lib/appwrite/podcasts";
import { PodcastCard } from "../podcast-card";
import { DefaultProps } from "@/lib/default-props";
import { HeaderComponent } from "./header-component";
import sectionTheme from "@/lib/appwrite/default-font";

export async function PodcastPostsSection({ dictionary, lang }: DefaultProps) {
    const podcasts = await getPodcasts({ lang, limit: 5 });
    return (
        <section className={`${sectionTheme}`}>
            <div className="max-w-7xl mx-auto overflow-y-auto">
                <HeaderComponent
                    dictionary={dictionary}
                    lang={lang} title={dictionary.podcast?.title}
                    subtitle={dictionary.podcast?.subtitle} target="cast" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {podcasts.map((podcast) => (
                        <PodcastCard podcast={podcast} lang={lang} key={
                            podcast.id
                        } />
                    ))}
                </div>
            </div>
        </section>
    );
}
3
