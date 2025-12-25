import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, TABLES } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";
import type { Tag } from "./types";

// Re-export for backward compatibility
export type { Tag } from "./types";

// Fetch all tags
export async function getTags(): Promise<Tag[]> {
  try {
    console.log("[TAGS] Fetching all tags");
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.TAGS,
      [
        Query.orderAsc("name_en"),
        Query.limit(100),
      ]
    );

    console.log(`[TAGS] Successfully fetched ${response.rows.length} tags`);
    return response.rows.map((doc) => ({
      id: doc.$id,
      name_ar: doc.name_ar,
      name_en: doc.name_en,
      slug: doc.slug,
    }));
  } catch (error) {
    console.error("[TAGS] ERROR fetching tags:", error);
    console.error("[TAGS] Error details:", JSON.stringify(error, null, 2));
    // Return empty array for tags - they're not critical, posts can work without them
    console.warn("[TAGS] Continuing without tags - posts will display without tag badges");
    return [];
  }
}

// Fetch single tag by slug
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.TAGS,
      [
        Query.equal("slug", slug),
        Query.limit(1),
      ]
    );

    if (response.rows.length === 0) {
      return null;
    }

    const doc = response.rows[0];

    return {
      id: doc.$id,
      name_ar: doc.name_ar,
      name_en: doc.name_en,
      slug: doc.slug,
    };
  } catch (error) {
    console.error("Error fetching tag by slug:", error);
    return null;
  }
}

// Get all tag slugs for static generation
export async function getAllTagSlugs(): Promise<string[]> {
  try {
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.TAGS,
      [
        Query.select(["slug"]),
        Query.limit(100),
      ]
    );

    return response.rows.map((doc) => doc.slug);
  } catch (error) {
    console.error("Error fetching tag slugs:", error);
    return [];
  }
}

