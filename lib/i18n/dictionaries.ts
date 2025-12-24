import "server-only";

export type Locale = "ar" | "en";

export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

const dictionaries = {
  ar: () => import("./ar.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale | string) => {
  // Validate locale and fallback to default if invalid
  const validLocale = isValidLocale(locale) ? locale : defaultLocale;
  return dictionaries[validLocale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

export const getDirection = (locale: Locale): "rtl" | "ltr" => {
  return locale === "ar" ? "rtl" : "ltr";
};

