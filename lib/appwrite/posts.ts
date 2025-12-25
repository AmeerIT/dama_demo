import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, TABLES, getImageUrl } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";
import type { Post, Tag } from "./types";
import { getTags } from "./tags";

// Re-export for backward compatibility
export type { Post, Tag } from "./types";

interface GetPostsOptions {
  lang: Locale;
  limit?: number;
  offset?: number;
  tagSlug?: string;
}

// Fetch all posts with optional filtering
export async function getPosts(options: GetPostsOptions): Promise<Post[]> {
  const { limit = 10, offset = 0, tagSlug } = options;

  try {
    const queries = [
      Query.equal("is_published", true),
      Query.orderDesc("published_at"),
      Query.limit(limit),
      Query.offset(offset),
    ];

    // Fetch posts first
    const response = await publicClient.tablesDb.listRows(DATABASE_ID, TABLES.POSTS, queries);

    // Fetch tags separately to avoid connection issues
    let allTags: Tag[] = [];
    try {
      allTags = await getTags();
    } catch (tagError) {
      console.error("[POSTS] Failed to fetch tags, continuing without tag data:", tagError);
      // Continue without tags rather than failing completely
    }

    // Create a map of tag IDs to tag objects for quick lookup
    const tagMap = new Map(allTags.map((tag) => [tag.id, tag]));

    // Transform documents to Post type
    const posts: Post[] = response.rows.map((doc) => {
      // Map tag IDs to tag objects
      const tagIds = doc.tags || [];
      const postTags = tagIds
        .map((tagId: string) => tagMap.get(tagId))
        .filter((tag: Tag | undefined): tag is Tag => tag !== undefined);

      return {
        id: doc.$id,
        slug: doc.slug,
        title_ar: doc.title_ar,
        title_en: doc.title_en,
        excerpt_ar: doc.excerpt_ar,
        excerpt_en: doc.excerpt_en,
        body_ar: doc.body_ar,
        body_en: doc.body_en,
        featured_image: doc.featured_image ? getImageUrl(doc.featured_image, 800, 500) : undefined,
        published_at: doc.published_at,
        is_published: doc.is_published,
        author_id: doc.author_id,
        tags: postTags,
      };
    });

    // Filter by tag if specified
    if (tagSlug) {
      return posts.filter((post) =>
        post.tags?.some((tag) => tag.slug === tagSlug)
      );
    }

    console.log(`[POSTS] Successfully fetched ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error("[POSTS] CRITICAL ERROR fetching posts:", error);
    console.error("[POSTS] Error details:", JSON.stringify(error, null, 2));
    // Throw error to trigger error boundary - don't silently return empty array
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string, lang: Locale): Promise<Post | null> {
  try {
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.POSTS,
      [
        Query.equal("slug", slug),
        Query.equal("is_published", true),
        Query.limit(1),
      ]
    );

    if (response.rows.length === 0) {
      console.log(`[POST] Post not found with slug: ${slug}`);
      return null;
    }

    const doc = response.rows[0];

    // Fetch tags separately to avoid connection issues
    let allTags: Tag[] = [];
    try {
      allTags = await getTags();
    } catch (tagError) {
      console.error(`[POST] Failed to fetch tags for post ${slug}, continuing without tag data:`, tagError);
      // Continue without tags rather than failing completely
    }

    // Create a map of tag IDs to tag objects for quick lookup
    const tagMap = new Map(allTags.map((tag) => [tag.id, tag]));

    // Map tag IDs to tag objects
    const tagIds = doc.tags || [];
    const postTags = tagIds
      .map((tagId: string) => tagMap.get(tagId))
      .filter((tag: Tag | undefined): tag is Tag => tag !== undefined);

    console.log(`[POST] Successfully fetched post: ${slug}`);
    return {
      id: doc.$id,
      slug: doc.slug,
      title_ar: doc.title_ar,
      title_en: doc.title_en,
      excerpt_ar: doc.excerpt_ar,
      excerpt_en: doc.excerpt_en,
      body_ar: doc.body_ar,
      body_en: doc.body_en,
      featured_image: doc.featured_image ? getImageUrl(doc.featured_image, 1200, 630) : undefined,
      published_at: doc.published_at,
      is_published: doc.is_published,
      author_id: doc.author_id,
      tags: postTags,
    };
  } catch (error) {
    console.error(`[POST] CRITICAL ERROR fetching post ${slug}:`, error);
    console.error(`[POST] Error details:`, JSON.stringify(error, null, 2));
    // Throw error to trigger error boundary
    throw new Error(`Failed to fetch post "${slug}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    console.log("[POST_SLUGS] Fetching all post slugs for static generation");
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.POSTS,
      [
        Query.equal("is_published", true),
        Query.select(["slug"]),
        Query.limit(1000), // Adjust based on expected content volume
      ]
    );

    const slugs = response.rows.map((doc) => doc.slug).filter(Boolean);
    console.log(`[POST_SLUGS] Found ${slugs.length} post slugs`);

    // Prevent Next.js 15.2.1+ build failure with empty arrays
    if (slugs.length === 0) {
      console.warn("[POST_SLUGS] No posts found - returning placeholder to prevent build failure");
      return ["__no_posts_placeholder__"];
    }

    return slugs;
  } catch (error) {
    console.error("[POST_SLUGS] CRITICAL: Build will fail - cannot fetch post slugs:", error);
    // Throw error to fail the build - better than silent failure
    throw new Error(`Build failed: Cannot fetch post slugs - ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

