import { DefaultProps } from "@/lib/default-props";
import { HeaderComponent } from "./header-component";
import sectionTheme from "@/lib/appwrite/default-font";

export async function CoursesPostsSection({ dictionary, lang }: DefaultProps) {
    return (
        <section className={`${sectionTheme}`}>
            <div className="max-w-7xl mx-auto">
                <HeaderComponent dictionary={dictionary}
                    lang={lang} title={dictionary.courses?.title}
                    subtitle={dictionary.courses?.subtitle} target="courses" />
            </div>
        </section>
    )
}
