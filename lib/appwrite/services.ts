import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, COLLECTIONS, getImageUrl } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";

// Types
export interface Service {
  id: string;
  slug_ar: string;
  slug_en: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  content_ar?: string;
  content_en?: string;
  icon: string;
  image?: string;
  order: number;
  is_active: boolean;
}

interface GetServicesOptions {
  lang: Locale;
  limit?: number;
}

// Fetch all services
export async function getServices(options: GetServicesOptions): Promise<Service[]> {
  const { limit = 100 } = options;

  try {
    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      [
        Query.equal("is_active", true),
        Query.orderAsc("order"),
        Query.limit(limit),
      ]
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      slug_ar: doc.slug_ar,
      slug_en: doc.slug_en,
      title_ar: doc.title_ar,
      title_en: doc.title_en,
      description_ar: doc.description_ar,
      description_en: doc.description_en,
      content_ar: doc.content_ar,
      content_en: doc.content_en,
      icon: doc.icon,
      image: doc.image ? getImageUrl(doc.image, 800, 500) : undefined,
      order: doc.order,
      is_active: doc.is_active,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string, lang: Locale): Promise<Service | null> {
  try {
    const slugField = lang === "ar" ? "slug_ar" : "slug_en";

    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      [
        Query.equal(slugField, slug),
        Query.equal("is_active", true),
        Query.limit(1),
      ]
    );

    if (response.documents.length === 0) {
      return null;
    }

    const doc = response.documents[0];

    return {
      id: doc.$id,
      slug_ar: doc.slug_ar,
      slug_en: doc.slug_en,
      title_ar: doc.title_ar,
      title_en: doc.title_en,
      description_ar: doc.description_ar,
      description_en: doc.description_en,
      content_ar: doc.content_ar,
      content_en: doc.content_en,
      icon: doc.icon,
      image: doc.image ? getImageUrl(doc.image, 1200, 630) : undefined,
      order: doc.order,
      is_active: doc.is_active,
    };
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}

// Get all service slugs for static generation
export async function getAllServiceSlugs(): Promise<{ slug_ar: string; slug_en: string }[]> {
  try {
    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.SERVICES,
      [
        Query.equal("is_active", true),
        Query.select(["slug_ar", "slug_en"]),
        Query.limit(100),
      ]
    );

    return response.documents.map((doc) => ({
      slug_ar: doc.slug_ar,
      slug_en: doc.slug_en,
    }));
  } catch (error) {
    console.error("Error fetching service slugs:", error);
    return [];
  }
}

