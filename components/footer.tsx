import Link from "next/link";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function StickyFooter({ lang, dictionary }: FooterProps) {
  const { footer } = dictionary;

  return (
    <footer className="relative z-0 w-full bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href={`/${lang}`}>
              <h2 className="text-3xl font-bold text-primary">Dama</h2>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              {dictionary.hero.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{dictionary.common.services}</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href={`/${lang}/services`} className="hover:text-primary transition-colors">
                  {dictionary.services.damaDoctors}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-primary transition-colors">
                  {dictionary.services.damaCourses}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-primary transition-colors">
                  {dictionary.services.advertising}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/blog`} className="hover:text-primary transition-colors">
                  {dictionary.common.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{footer.subscribeTitle}</h3>
            <p className="text-sm text-background/70">{footer.subscribeDesc}</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={footer.emailPlaceholder}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                {footer.subscribeButton}
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-background/10 text-sm text-background/60">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-1">
              <p>{footer.address}</p>
              <p>{footer.email}: info@damaproductions.com</p>
              <p>{footer.phone}: +964 782 200 0641</p>
            </div>
            <p className="text-background/40">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
