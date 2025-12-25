import Link from "next/link";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  dictionary: Dictionary;
  lang: Locale;
}

export function HeroSection({ dictionary, lang }: HeroSectionProps) {
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      <link href="https://api.center-phone.com/v1/storage/buckets/694c1573001db670c6e6/files/694db3a1003327ebc2ad/view?project=694beec300098b09a52c" rel="stylesheet" />
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden EffraRegular-400">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0486e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6">
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight EffraBold-700">
              <span className="text-foreground">{dictionary.hero.title}</span>
              <br />
              <span className="text-primary">{dictionary.hero.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {dictionary.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={`/${lang}/services`}>
                <Button size="lg" className="group text-base px-8">
                  {dictionary.common.services}
                  <ArrowIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Button>
              </Link>
              <Link href={`/${lang}/blog`}>
                <Button variant="outline" size="lg" className="text-base px-8">
                  {dictionary.common.blog}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
    </>
  );
}

