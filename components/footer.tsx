import Link from "next/link";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function StickyFooter({ lang, dictionary }: FooterProps) {
  const { footer, common } = dictionary;

  return (
    <footer className="sticky z-0 bottom-0 left-0 w-full h-80 bg-black/90">
      <div className="relative overflow-hidden w-full h-full flex justify-end px-6 sm:px-12 text-right items-start py-8 sm:py-12">
        {/* Navigation Links */}
        <div className="flex flex-row space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-24 text-sm sm:text-base md:text-lg lg:text-xl z-10">
          {/* Internal Links */}
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <Link href={`/${lang}`} className="text-primary hover:underline cursor-pointer transition-all">
                {common.home}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/services`} className="text-primary hover:underline cursor-pointer transition-all">
                {common.services}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/blog`} className="text-primary hover:underline cursor-pointer transition-all">
                {common.blog}
              </Link>
            </li>
          </ul>

          {/* Social Links */}
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer transition-all">
                Github
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer transition-all">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline cursor-pointer transition-all">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>

        {/* Large Decorative Text */}
        <h2
          className="absolute bottom-0 left-0 translate-y-1/3 text-[80px] sm:text-[120px] md:text-[160px] lg:text-[192px] text-primary leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-hidden="true"
        >
          Dama
        </h2>

        {/* Bottom Contact Bar */}
        <div className="absolute bottom-2 right-0 px-6 sm:px-12 text-xs sm:text-sm text-white z-10">
          <div className="flex flex-row sm:flex-row justify-between gap-2 sm:gap-4">
            <div className="flex flex-row sm:flex-row sm:gap-4">
              <span>{footer.email}: info@damaproductions.com</span>
              <span className="hidden sm:inline">|</span>
              <span>{footer.phone}: +964 782 200 0641</span>
            </div>
            <span className="text-foreground/40">{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
