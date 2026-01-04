import { Metadata } from "next";
import { Locale } from "@/lib/i18n/dictionaries";
import { siteConfig, OG_IMAGE_DIMENSIONS } from "@/lib/config/site";

interface GenerateMetadataParams {
  title: string;
  description: string;
  slug: string;
  lang: Locale;
  imageUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  type?: "article" | "website";
}

export function generatePageMetadata({
  title,
  description,
  slug,
  lang,
  imageUrl,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  type = "article",
}: GenerateMetadataParams): Metadata {
  const url = `${siteConfig.url}/${lang}/blog/${slug}`;
  const siteName = lang === "ar" ? siteConfig.nameAr : siteConfig.name;
  const locale = lang === "ar" ? "ar_AR" : "en_US";
  const alternateLocale = lang === "ar" ? "en_US" : "ar_AR";

  // Use provided image or fallback to default
  const ogImage = imageUrl || `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: `${title} | ${siteName}`,
    description,

    // Canonical URL
    alternates: {
      canonical: url,
      languages: {
        ar: `${siteConfig.url}/ar/blog/${slug}`,
        en: `${siteConfig.url}/en/blog/${slug}`,
        "x-default": `${siteConfig.url}/ar/blog/${slug}`, // Arabic as default
      },
    },

    // Open Graph
    openGraph: {
      type,
      locale,
      alternateLocale,
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: ogImage,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: title,
        },
      ],
      ...(type === "article" &&
        publishedTime && {
          publishedTime,
          modifiedTime: modifiedTime || publishedTime,
          authors: authors || [siteName],
          tags: tags || [],
        }),
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    // Additional meta tags
    other: {
      ...(type === "article" && {
        "article:published_time": publishedTime,
        "article:modified_time": modifiedTime || publishedTime,
        "article:author": authors?.[0] || siteName,
        "article:section": tags?.[0] || "Blog",
      }),
    },
  };
}
