"use client"

import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Service } from "@/lib/appwrite/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { ServiceCard } from "../service-card";
import { DefaultProps } from "@/lib/default-props";
import { HeaderComponent } from "./header-component";
import sectionTheme from "@/lib/appwrite/default-font";

interface ServicesSectionProps extends DefaultProps {
  services: Service[];
}

export function ServicesSection({ dictionary, lang, services }: ServicesSectionProps) {

  return (
    <section className={`${sectionTheme}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <HeaderComponent dictionary={dictionary}
          lang={lang} title={dictionary.services?.title} subtitle={dictionary.services?.subtitle} target="services" />
        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
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

