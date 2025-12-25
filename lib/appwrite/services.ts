import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, TABLES, getImageUrl } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";
import type { Service } from "./types";

// Re-export for backward compatibility
export type { Service } from "./types";

interface GetServicesOptions {
  lang: Locale;
  limit?: number;
}

// Fetch all services
export async function getServices(options: GetServicesOptions): Promise<Service[]> {
  const { limit = 100 } = options;

  try {
    console.log(`[SERVICES] Fetching services with limit: ${limit}`);
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.SERVICES,
      [
        Query.equal("is_active", true),
        Query.orderAsc("order"),
        Query.limit(limit),
      ]
    );

    console.log(`[SERVICES] Successfully fetched ${response.rows.length} services`);
    return response.rows.map((doc) => ({
      id: doc.$id,
      slug: doc.slug,
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
    console.error("[SERVICES] Critical error fetching services:", error);
    console.error("[SERVICES] Error details:", JSON.stringify(error, null, 2));
    return [];
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string, lang: Locale): Promise<Service | null> {
  try {
    console.log(`[SERVICE] Fetching service with slug: ${slug}`);
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.SERVICES,
      [
        Query.equal("slug", slug),
        Query.equal("is_active", true),
        Query.limit(1),
      ]
    );

    if (response.rows.length === 0) {
      console.log(`[SERVICE] Service not found with slug: ${slug}`);
      return null;
    }

    const doc = response.rows[0];

    console.log(`[SERVICE] Successfully fetched service: ${slug}`);
    return {
      id: doc.$id,
      slug: doc.slug,
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
    console.error(`[SERVICE] Critical error fetching service by slug ${slug}:`, error);
    console.error(`[SERVICE] Error details:`, JSON.stringify(error, null, 2));
    return null;
  }
}

// Get all service slugs for static generation
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.SERVICES,
      [
        Query.equal("is_active", true),
        Query.select(["slug"]),
        Query.limit(100),
      ]
    );

    return response.rows.map((doc) => doc.slug);
  } catch (error) {
    console.error("Error fetching service slugs:", error);
    return [];
  }
}

