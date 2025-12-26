import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import TopologicalPattern from "./topological-pattern";
interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function StickyFooter({ lang, dictionary }: FooterProps) {
  const { footer, common } = dictionary;

  return (
    <footer className=" left-0 w-full bg-primary justify-center flex h-screen" >
      <p className="text-foreground text-9xl sticky top-0 EffraBold-700 w-screen text-center select-none pointer-events-none pt-20 inline-block">
        {footer.title}
      </p>
    </footer>
  );
}
