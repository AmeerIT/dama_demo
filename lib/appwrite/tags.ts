import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, COLLECTIONS } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";

// Types
export interface Tag {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
}

// Fetch all tags
export async function getTags(): Promise<Tag[]> {
  try {
    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TAGS,
      [
        Query.orderAsc("name_en"),
        Query.limit(100),
      ]
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      name_ar: doc.name_ar,
      name_en: doc.name_en,
      slug: doc.slug,
    }));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

// Fetch single tag by slug
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  try {
    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TAGS,
      [
        Query.equal("slug", slug),
        Query.limit(1),
      ]
    );

    if (response.documents.length === 0) {
      return null;
    }

    const doc = response.documents[0];

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
    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.TAGS,
      [
        Query.select(["slug"]),
        Query.limit(100),
      ]
    );

    return response.documents.map((doc) => doc.slug);
  } catch (error) {
    console.error("Error fetching tag slugs:", error);
    return [];
  }
}

