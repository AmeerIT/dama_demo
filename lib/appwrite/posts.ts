import { Query } from "node-appwrite";
import { publicClient, DATABASE_ID, COLLECTIONS, getImageUrl } from "./client";
import { type Locale } from "@/lib/i18n/dictionaries";

// Types
export interface Tag {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
}

export interface Post {
  id: string;
  slug_ar: string;
  slug_en: string;
  title_ar: string;
  title_en: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  body_ar: string;
  body_en: string;
  featured_image?: string;
  published_at: string;
  is_published: boolean;
  author_id?: string;
  tags?: Tag[];
}

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

    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.POSTS,
      queries
    );

    // Transform documents to Post type
    const posts: Post[] = response.documents.map((doc) => ({
      id: doc.$id,
      slug_ar: doc.slug_ar,
      slug_en: doc.slug_en,
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
      tags: doc.tags || [],
    }));

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
    const slugField = lang === "ar" ? "slug_ar" : "slug_en";

    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.POSTS,
      [
        Query.equal(slugField, slug),
        Query.equal("is_published", true),
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
      excerpt_ar: doc.excerpt_ar,
      excerpt_en: doc.excerpt_en,
      body_ar: doc.body_ar,
      body_en: doc.body_en,
      featured_image: doc.featured_image ? getImageUrl(doc.featured_image, 1200, 630) : undefined,
      published_at: doc.published_at,
      is_published: doc.is_published,
      author_id: doc.author_id,
      tags: doc.tags || [],
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs(): Promise<{ slug_ar: string; slug_en: string }[]> {
  try {
    const response = await publicClient.databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.POSTS,
      [
        Query.equal("is_published", true),
        Query.select(["slug_ar", "slug_en"]),
        Query.limit(1000), // Adjust based on expected content volume
      ]
    );

    return response.documents.map((doc) => ({
      slug_ar: doc.slug_ar,
      slug_en: doc.slug_en,
    }));
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

