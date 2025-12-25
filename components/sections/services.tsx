"use client";

import Link from "next/link";
import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Stethoscope, GraduationCap, Megaphone, Mic2, BookOpen } from "lucide-react";
import { type Service } from "@/lib/appwrite/services";
import StackingCards, { StackingCardItem } from "@/components/fancy/blocks/stacking-cards";

interface ServicesSectionProps {
  dictionary: Dictionary;
  lang: Locale;
  services: Service[];
}

// Map service icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  megaphone: Megaphone,
  microphone: Mic2,
  book: BookOpen,
};

export function ServicesSection({ dictionary, lang, services }: ServicesSectionProps) {
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Limit to first 3 services for stacking effect
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30 h-screen">
      <div className="max-w-5xl mx-auto">
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

        {/* Stacking Cards */}
        {featuredServices.length > 0 ? (
          featuredServices.map((service, index) => {
            const title = lang === "ar" ? service.title_ar : service.title_en;
            const description = lang === "ar" ? service.description_ar : service.description_en;
            const IconComponent = iconMap[service.icon] || BookOpen;

            return (
              <StackingCardItem key={service.id} index={index}>
                <Link href={`/${lang}/services/${service.slug}`}>
                  <Card className="group h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl bg-background/95 backdrop-blur">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {title}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {description && (
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      )}

                      <div className="flex items-center text-base font-medium text-primary group-hover:underline pt-4">
                        <span>{lang === "ar" ? "اقرأ المزيد" : "Learn more"}</span>
                        <ArrowIcon className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StackingCardItem>
            );
          })
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {dictionary.services.noServicesFound}
          </div>
        )}
      </div>
    </section>
  );
}

