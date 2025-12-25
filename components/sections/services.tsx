import Link from "next/link";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Service } from "@/lib/appwrite/types";

interface ServicesSectionProps {
  dictionary: Dictionary;
  lang: Locale;
  services: Service[];
}

export function ServicesSection({ dictionary, lang, services }: ServicesSectionProps) {
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Limit to first 3 services for homepage
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {dictionary.services.title}
            </h2>
            <p className="text-muted-foreground mt-2">
              {dictionary.services.subtitle}
            </p>
          </div>
          <Link href={`/${lang}/services`}>
            <Button variant="outline" className="group">
              {dictionary.common.viewAll}
              <ArrowIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        {featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {dictionary.services.noServicesFound}
          </div>
        )}
      </div>
    </section>
  );
}
