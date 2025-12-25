import Link from "next/link";
import { type Locale } from "@/lib/i18n/dictionaries";
import { type Service } from "@/lib/appwrite/services";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Stethoscope, GraduationCap, Megaphone, Mic2, BookOpen } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  lang: Locale;
}

// Map service icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  stethoscope: Stethoscope,
  graduation: GraduationCap,
  megaphone: Megaphone,
  microphone: Mic2,
  book: BookOpen,
};

export function ServiceCard({ service, lang }: ServiceCardProps) {
  const title = lang === "ar" ? service.title_ar : service.title_en;
  const description = lang === "ar" ? service.description_ar : service.description_en;
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const IconComponent = iconMap[service.icon] || BookOpen;

  return (
    <Link href={`/${lang}/services/${service.slug}`}>
      <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <IconComponent className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
          )}

          <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
            <span>{lang === "ar" ? "اقرأ المزيد" : "Learn more"}</span>
            <ArrowIcon className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

