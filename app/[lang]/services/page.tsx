import { getDictionary, type Locale, locales } from "@/lib/i18n/dictionaries";
import { getServices } from "@/lib/appwrite/services";
import { ServiceCard } from "@/components/service-card";
import sectionTheme from "@/lib/appwrite/default-font";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return {
    title: `${dictionary.services.title} | Dama Productions`,
    description: dictionary.services.subtitle,
  }; 1
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const services = await getServices({ lang: lang as Locale });

  return (

    <div className={sectionTheme}>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
          {dictionary.services.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {dictionary.services.subtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} lang={lang as Locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {dictionary.services.noServicesFound}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

