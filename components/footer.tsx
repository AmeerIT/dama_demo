import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import TopologicalPattern from "./topological-pattern";
interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function StickyFooter({ lang, dictionary }: FooterProps) {
  const { footer, common } = dictionary;

  return (
    <footer className="bg-primary h-screen w-screen container-type-inline-size">
      <TopologicalPattern />

      <p className="text-white select-none pointer-events-none max-w-2xl text-start pt-20 px-2"
        style={{
          fontSize: "clamp(10vw, 12vw, 13vw)",
        }}>
        {footer.title}
      </p>
    </footer>
  );
}
