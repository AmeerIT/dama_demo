"use client"

import { type Service } from "@/lib/appwrite/types";
import Link from "next/link";
import { DefaultProps } from "@/lib/default-props";
import { Stethoscope, GraduationCap, Megaphone, Mic2, BookOpen } from "lucide-react";
import Image from "next/image";

interface ServicesSectionProps extends DefaultProps {
  services: Service[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  megaphone: Megaphone,
  microphone: Mic2,
  book: BookOpen,
};

export function ServicesSection({ dictionary, lang, services }: ServicesSectionProps) {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Split Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
              {dictionary.services.title}
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold leading-tight">
              {dictionary.services.subtitle.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-muted-foreground">
                {dictionary.services.subtitle.split(' ').slice(2).join(' ')}
              </span>
            </h3>
          </div>
          <p className="text-muted-foreground max-w-sm mb-2">
            {dictionary.footer.tagline}
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const title = lang === "ar" ? service.title_ar : service.title_en;
              const description = lang === "ar" ? service.description_ar : service.description_en;
              const IconComponent = iconMap[service.icon] || BookOpen;

              return (
                <Link key={service.id} href={`/${lang}/services/${service.slug}`}>
                  <div className="group relative h-112.5 rounded-4xl overflow-hidden border border-border/50 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
                    {/* Background Image Overlay */}
                    <div className="absolute inset-0 z-0">
                      {service.image && (
                        <>
                          <Image
                            src={service.image}
                            alt={title}
                            fill
                            className="object-cover opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-t from-background via-background/40 to-transparent"></div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                      <div className="mb-4 p-3 w-fit rounded-2xl bg-background/5 border border-border/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-foreground group-hover:text-primary-foreground" />
                      </div>
                      <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">
                        {dictionary.common.services}
                      </span>
                      <h4 className="text-2xl font-bold mb-3 group-hover:text-foreground transition-colors">
                        {title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transform">
                        {description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
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
