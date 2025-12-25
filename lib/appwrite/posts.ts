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

    const [response, allTags] = await Promise.all([
      publicClient.tablesDb.listRows(DATABASE_ID, TABLES.POSTS, queries),
      getTags(),
    ]);

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

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return empty array instead of throwing to handle gracefully during SSG
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string, lang: Locale): Promise<Post | null> {
  try {
    const [response, allTags] = await Promise.all([
      publicClient.tablesDb.listRows(
        DATABASE_ID,
        TABLES.POSTS,
        [
          Query.equal("slug", slug),
          Query.equal("is_published", true),
          Query.limit(1),
        ]
      ),
      getTags(),
    ]);

    if (response.rows.length === 0) {
      return null;
    }

    const doc = response.rows[0];

    // Create a map of tag IDs to tag objects for quick lookup
    const tagMap = new Map(allTags.map((tag) => [tag.id, tag]));

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
      featured_image: doc.featured_image ? getImageUrl(doc.featured_image, 1200, 630) : undefined,
      published_at: doc.published_at,
      is_published: doc.is_published,
      author_id: doc.author_id,
      tags: postTags,
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await publicClient.tablesDb.listRows(
      DATABASE_ID,
      TABLES.POSTS,
      [
        Query.equal("is_published", true),
        Query.select(["slug"]),
        Query.limit(1000), // Adjust based on expected content volume
      ]
    );

    return response.rows.map((doc) => doc.slug);
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

