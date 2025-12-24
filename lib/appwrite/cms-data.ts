import { Client, Databases, Storage, Query, ID } from "appwrite";
import appwriteConfig from "@/appwrite.config.json";

// Client-side Appwrite client for CMS operations
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1")
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);
const storage = new Storage(client);

// Database and collection IDs
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "dama_db";

export const COLLECTIONS = {
  POSTS: "posts",
  SERVICES: "services",
  TAGS: "tags",
  FONTS: "fonts",
} as const;

export const BUCKETS = {
  IMAGES: "images",
  MEDIA: "media",
  FONTS: "fonts",
} as const;

// Types
export interface Post {
  $id: string;
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
  status: "draft" | "published";
  keywords?: string[];
  tags?: string[];
  $createdAt: string;
  $updatedAt: string;
}

export type PostFormData = Omit<Post, "$id" | "$createdAt" | "$updatedAt">;

export interface Service {
  $id: string;
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
  $createdAt: string;
  $updatedAt: string;
}

export type ServiceFormData = Omit<Service, "$id" | "$createdAt" | "$updatedAt">;

export interface Tag {
  $id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface Font {
  $id: string;
  name: string;
  file_id: string;
  family: string;
  weight: string;
  style: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface MediaFile {
  $id: string;
  name: string;
  mimeType: string;
  sizeOriginal: number;
  $createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalServices: number;
  totalTags: number;
  totalMedia: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [posts, services, tags, media] = await Promise.all([
      databases.listDocuments(DATABASE_ID, COLLECTIONS.POSTS, [Query.limit(1000)]),
      databases.listDocuments(DATABASE_ID, COLLECTIONS.SERVICES, [Query.limit(1000)]),
      databases.listDocuments(DATABASE_ID, COLLECTIONS.TAGS, [Query.limit(1000)]),
      storage.listFiles(BUCKETS.MEDIA, [Query.limit(1000)]),
    ]);

    const publishedPosts = posts.documents.filter((p) => p.is_published).length;

    return {
      totalPosts: posts.total,
      publishedPosts,
      draftPosts: posts.total - publishedPosts,
      totalServices: services.total,
      totalTags: tags.total,
      totalMedia: media.total,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      totalServices: 0,
      totalTags: 0,
      totalMedia: 0,
    };
  }
}

// Posts CRUD
export async function listPosts(options?: {
  status?: "draft" | "published";
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ documents: Post[]; total: number }> {
  const queries: string[] = [
    Query.orderDesc("$createdAt"),
    Query.limit(options?.limit || 25),
  ];

  if (options?.offset) {
    queries.push(Query.offset(options.offset));
  }

  if (options?.status === "published") {
    queries.push(Query.equal("is_published", true));
  } else if (options?.status === "draft") {
    queries.push(Query.equal("is_published", false));
  }

  if (options?.search) {
    queries.push(Query.search("title_en", options.search));
  }

  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.POSTS, queries);
  return {
    documents: response.documents as unknown as Post[],
    total: response.total,
  };
}

export async function getPost(id: string): Promise<Post> {
  const response = await databases.getDocument(DATABASE_ID, COLLECTIONS.POSTS, id);
  return response as unknown as Post;
}

export async function createPost(data: Omit<Post, "$id" | "$createdAt" | "$updatedAt">): Promise<Post> {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.POSTS,
    ID.unique(),
    data
  );
  return response as unknown as Post;
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post> {
  const response = await databases.updateDocument(DATABASE_ID, COLLECTIONS.POSTS, id, data);
  return response as unknown as Post;
}

export async function deletePost(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.POSTS, id);
}

// Services CRUD
export async function listServices(): Promise<{ documents: Service[]; total: number }> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.SERVICES, [
    Query.orderAsc("order"),
    Query.limit(100),
  ]);
  return {
    documents: response.documents as unknown as Service[],
    total: response.total,
  };
}

export async function getService(id: string): Promise<Service> {
  const response = await databases.getDocument(DATABASE_ID, COLLECTIONS.SERVICES, id);
  return response as unknown as Service;
}

export async function createService(data: Omit<Service, "$id" | "$createdAt" | "$updatedAt">): Promise<Service> {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.SERVICES,
    ID.unique(),
    data
  );
  return response as unknown as Service;
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service> {
  const response = await databases.updateDocument(DATABASE_ID, COLLECTIONS.SERVICES, id, data);
  return response as unknown as Service;
}

export async function deleteService(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.SERVICES, id);
}

// Tags CRUD
export async function listTags(): Promise<{ documents: Tag[]; total: number }> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.TAGS, [
    Query.orderAsc("name_en"),
    Query.limit(100),
  ]);
  return {
    documents: response.documents as unknown as Tag[],
    total: response.total,
  };
}

export async function createTag(data: Omit<Tag, "$id" | "$createdAt" | "$updatedAt">): Promise<Tag> {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.TAGS,
    ID.unique(),
    data
  );
  return response as unknown as Tag;
}

export async function updateTag(id: string, data: Partial<Tag>): Promise<Tag> {
  const response = await databases.updateDocument(DATABASE_ID, COLLECTIONS.TAGS, id, data);
  return response as unknown as Tag;
}

export async function deleteTag(id: string): Promise<void> {
  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.TAGS, id);
}

// Fonts CRUD
export async function listFonts(): Promise<{ documents: Font[]; total: number }> {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.FONTS, [
    Query.orderAsc("name"),
    Query.limit(100),
  ]);
  return {
    documents: response.documents as unknown as Font[],
    total: response.total,
  };
}

export async function createFont(data: Omit<Font, "$id" | "$createdAt" | "$updatedAt">): Promise<Font> {
  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTIONS.FONTS,
    ID.unique(),
    data
  );
  return response as unknown as Font;
}

export async function deleteFont(id: string, fileId: string): Promise<void> {
  await Promise.all([
    databases.deleteDocument(DATABASE_ID, COLLECTIONS.FONTS, id),
    storage.deleteFile(BUCKETS.FONTS, fileId),
  ]);
}

// Media/Storage
export async function listMedia(): Promise<MediaFile[]> {
  const response = await storage.listFiles(BUCKETS.MEDIA, [
    Query.orderDesc("$createdAt"),
    Query.limit(100),
  ]);
  return response.files as unknown as MediaFile[];
}

export async function uploadMedia(file: File): Promise<MediaFile> {
  const response = await storage.createFile(BUCKETS.MEDIA, ID.unique(), file);
  return response as unknown as MediaFile;
}

export async function deleteMedia(fileId: string): Promise<void> {
  await storage.deleteFile(BUCKETS.MEDIA, fileId);
}

export async function uploadFont(file: File): Promise<MediaFile> {
  const response = await storage.createFile(BUCKETS.FONTS, ID.unique(), file);
  return response as unknown as MediaFile;
}

export function getMediaUrl(fileId: string): string {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1";
  return `${endpoint}/storage/buckets/${BUCKETS.MEDIA}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
}

export function getFontUrl(fileId: string): string {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1";
  return `${endpoint}/storage/buckets/${BUCKETS.FONTS}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
}

export { databases, storage, DATABASE_ID, ID };

