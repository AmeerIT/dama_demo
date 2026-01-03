"use client";

import { type Service } from "@/lib/appwrite/types";
import Link from "next/link";
import { DefaultProps } from "@/lib/default-props";
import { Stethoscope, GraduationCap, Megaphone, Mic2, BookOpen } from "lucide-react";

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

// Rotating color schemes for icons
const colorSchemes = [
  { bg: "bg-blue-50", text: "text-blue-600" },
  { bg: "bg-pink-50", text: "text-[#e91e63]" },
  { bg: "bg-green-50", text: "text-green-600" },
];

export function ServicesSection({ dictionary, lang, services }: ServicesSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-16">{dictionary.services.title}</h2>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const title = lang === "ar" ? service.title_ar : service.title_en;
              const description = lang === "ar" ? service.description_ar : service.description_en;
              const IconComponent = iconMap[service.icon] || BookOpen;
              const colors = colorSchemes[index % colorSchemes.length];

              return (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center hover:-translate-y-2 transition-transform"
                >
                  <div className={`w-16 h-16 ${colors.bg} ${colors.text} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{title}</h3>
                  <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                    {description}
                  </p>
                  <Link href={`/${lang}/services/${service.slug}`} className="mt-auto">
                    <button className="bg-[#e91e63] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#d81b60] transition-colors">
                      {dictionary.common.learnMore}
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {dictionary.services.noServicesFound}
          </div>
        )}
      </div>
    </section>
  );
}
