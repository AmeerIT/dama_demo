import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/appwrite/services";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LexicalRenderer } from "@/components/lexical-renderer";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";

// Revalidate every 5 minutes (ISR) - Balance between freshness and server load
export const revalidate = 300;

// Generate pages for existing services, new ones will be generated on-demand
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({
        lang: locale,
        slug: slug,
      });
    }
  }

  return params;
}

// Enable fallback for services not pre-rendered
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang, slug } = await params;
  const service = await getServiceBySlug(slug, lang as Locale);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = lang === "ar" ? service.title_ar : service.title_en;
  const description = lang === "ar" ? service.description_ar : service.description_en;

  return {
    title: `${title} | Dama Productions`,
    description,
    openGraph: {
      title,
      description,
      images: service.image ? [service.image] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;

  // Handle placeholder slug from generateStaticParams
  if (slug === '__no_services_placeholder__') {
    notFound();
  }

  const dictionary = await getDictionary(lang as Locale);
  const service = await getServiceBySlug(slug, lang as Locale);

  if (!service) {
    notFound();
  }

  const title = lang === "ar" ? service.title_ar : service.title_en;
  const description = lang === "ar" ? service.description_ar : service.description_en;
  const content = lang === "ar" ? service.content_ar : service.content_en;
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  // Get the alternate language for language switcher (same slug, different language)
  const alternateLang = lang === "ar" ? "en" : "ar";

  return (
    <div className="px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href={`/${lang}/services`}>
          <Button variant="ghost" className="mb-6 group">
            <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {dictionary.common.services}
          </Button>
        </Link>

        {/* Service Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Language Switch for this service */}
          <div className="mt-4">
            <Link
              href={`/${alternateLang}/services/${service.slug}`}
              className="text-sm text-muted-foreground hover:rounded-3xl transition-all"
            >
              <UnderlineToBackground targetTextColor="var(--color-primary)" >
                {lang === "ar" ? "View in English" : "عرض بالعربية"}
              </UnderlineToBackground>
            </Link>
          </div>
        </header>

        {/* Service Image */}
        {service.image && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={service.image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Service Content */}
        {content && (
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary">
            <LexicalRenderer content={content} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Link href={`/${lang}/services`}>
            <Button variant="outline" className="group">
              <ArrowIcon className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {lang === "ar" ? "العودة للخدمات" : "Back to Services"}
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}

