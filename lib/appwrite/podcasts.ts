import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, TABLES, getImageUrl } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";
import type { Podcast, Tag, Guest } from "./types";
import { getTags } from "./tags";

// Re-export for backward compatibility
export type { Podcast, Tag } from "./types";

interface GetPodcastsOptions {
  lang: Locale;
  limit?: number;
  offset?: number;
  tagSlug?: string;
}

// Fetch all podcasts with optional filtering
export async function getPodcasts(options: GetPodcastsOptions): Promise<Podcast[]> {
  const { limit = 12, offset = 0, tagSlug } = options;

  try {
    const queries = [
      Query.equal("is_published", true),
      Query.orderDesc("published_at"),
      Query.limit(limit),
      Query.offset(offset),
    ];

    // Fetch podcasts first
    const response = await publicClient.tablesDb.listRows(DATABASE_ID, TABLES.PODCASTS, queries);

    // Fetch tags separately to avoid connection issues
    let allTags: Tag[] = [];
    try {
      allTags = await getTags();
    } catch (tagError) {
      console.error("[PODCASTS] Failed to fetch tags, continuing without tag data:", tagError);
    }

    // Create a map of tag IDs to tag objects for quick lookup
    const tagMap = new Map(allTags.map((tag) => [tag.id, tag]));

    // Transform documents to Podcast type
    const podcasts: Podcast[] = response.rows.map((doc) => {
      // Map tag IDs to tag objects
      const tagIds = doc.tags || [];
      const podcastTags = tagIds
        .map((tagId: string) => tagMap.get(tagId))
        .filter((tag: Tag | undefined): tag is Tag => tag !== undefined);

      return {
        id: doc.$id,
        slug: doc.slug,
        title_ar: doc.title_ar,
        title_en: doc.title_en,
        author_ar: doc.author_ar,
        author_en: doc.author_en,
        excerpt_ar: doc.excerpt_ar,
        excerpt_en: doc.excerpt_en,
        body_ar: doc.body_ar,
        body_en: doc.body_en,
        cover_image: doc.cover_image ? getImageUrl(doc.cover_image, 800, 800) : "",
        audio_url: doc.audio_url,
        video_url: doc.video_url,
        duration: doc.duration,
        published_at: doc.published_at,
        is_published: doc.is_published,
        guest_ids: doc.guest_ids,
        tags: podcastTags,
      };
    });

    // Filter by tag if specified
    if (tagSlug) {
      return podcasts.filter((podcast) =>
        podcast.tags?.some((tag) => tag.slug === tagSlug)
      );
    }

    console.log(`[PODCASTS] Successfully fetched ${podcasts.length} podcasts`);
    return podcasts;
  } catch (error) {
    console.error("[PODCASTS] CRITICAL ERROR fetching podcasts:", error);
    console.error("[PODCASTS] Error details:", JSON.stringify(error, null, 2));
    throw new Error(`Failed to fetch podcasts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch single podcast by slug
export async function getPodcastBySlug(slug: string, lang: Locale): Promise<Podcast | null> {
  try {
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.PODCASTS,
      [
        Query.equal("slug", slug),
        Query.equal("is_published", true),
        Query.limit(1),
      ]
    );

    if (response.rows.length === 0) {
      console.log(`[PODCAST] Podcast not found with slug: ${slug}`);
      return null;
    }

    const doc = response.rows[0];

    // Fetch tags separately to avoid connection issues
    let allTags: Tag[] = [];
    try {
      allTags = await getTags();
    } catch (tagError) {
      console.error(`[PODCAST] Failed to fetch tags for podcast ${slug}, continuing without tag data:`, tagError);
    }

    // Create a map of tag IDs to tag objects for quick lookup
    const tagMap = new Map(allTags.map((tag) => [tag.id, tag]));

    // Map tag IDs to tag objects
    const tagIds = doc.tags || [];
    const podcastTags = tagIds
      .map((tagId: string) => tagMap.get(tagId))
      .filter((tag: Tag | undefined): tag is Tag => tag !== undefined);

    console.log(`[PODCAST] Successfully fetched podcast: ${slug}`);
    return {
      id: doc.$id,
      slug: doc.slug,
      title_ar: doc.title_ar,
      title_en: doc.title_en,
      author_ar: doc.author_ar,
      author_en: doc.author_en,
      excerpt_ar: doc.excerpt_ar,
      excerpt_en: doc.excerpt_en,
      body_ar: doc.body_ar,
      body_en: doc.body_en,
      cover_image: doc.cover_image ? getImageUrl(doc.cover_image, 1200, 1200) : "",
      audio_url: doc.audio_url,
      video_url: doc.video_url,
      duration: doc.duration,
      published_at: doc.published_at,
      is_published: doc.is_published,
      guest_ids: doc.guest_ids,
      tags: podcastTags,
    };
  } catch (error) {
    console.error(`[PODCAST] CRITICAL ERROR fetching podcast ${slug}:`, error);
    console.error(`[PODCAST] Error details:`, JSON.stringify(error, null, 2));
    throw new Error(`Failed to fetch podcast "${slug}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get all podcast slugs for static generation
export async function getAllPodcastSlugs(): Promise<string[]> {
  try {
    console.log("[PODCAST_SLUGS] Fetching all podcast slugs for static generation");
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.PODCASTS,
      [
        Query.equal("is_published", true),
        Query.select(["slug"]),
        Query.limit(1000),
      ]
    );

    const slugs = response.rows.map((doc) => doc.slug).filter(Boolean);
    console.log(`[PODCAST_SLUGS] Found ${slugs.length} podcast slugs`);

    // Prevent Next.js 15.2.1+ build failure with empty arrays
    if (slugs.length === 0) {
      console.warn("[PODCAST_SLUGS] No podcasts found - returning placeholder to prevent build failure");
      return ["__no_podcasts_placeholder__"];
    }

    return slugs;
  } catch (error) {
    console.error("[PODCAST_SLUGS] CRITICAL: Build will fail - cannot fetch podcast slugs:", error);
    throw new Error(`Build failed: Cannot fetch podcast slugs - ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
