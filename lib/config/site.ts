export const siteConfig = {
  name: "Dama Productions",
  nameAr: "داما للإنتاج",
  description: {
    en: "Professional media production and content creation services",
    ar: "خدمات الإنتاج الإعلامي وإنشاء المحتوى الاحترافي",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  ogImage: "/og-default.svg", // Fallback OG image
  authors: [
    {
      name: "Dama Productions",
      nameAr: "داما للإنتاج",
    },
  ],
} as const;

export const OG_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

export const TWITTER_IMAGE_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;
