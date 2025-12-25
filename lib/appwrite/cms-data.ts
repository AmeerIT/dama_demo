import { Client, TablesDB, Storage, Query, ID, Permission, Role } from "appwrite";
import appwriteConfig from "@/appwrite.config.json";
import { BUCKETS, TABLES } from "./client";
import type {
  CMSPost,
  CMSService,
  CMSTag,
  CMSFont,
  PostFormData,
  ServiceFormData,
  MediaFile,
  DashboardStats,
  Post,
} from "./types";

// Re-export for backward compatibility
export type {
  CMSPost,
  CMSService,
  CMSTag,
  CMSFont,
  PostFormData,
  ServiceFormData,
  MediaFile,
  DashboardStats,
} from "./types";

// Client-side Appwrite client for CMS operations
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1")
  .setProject(appwriteConfig.projectId);

const tablesDb = new TablesDB(client);
const storage = new Storage(client);

// Database and collection IDs
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "dama_db";

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [posts, services, tags, media] = await Promise.all([
      tablesDb.listRows(DATABASE_ID, TABLES.POSTS, [Query.limit(1000)]),
      tablesDb.listRows(DATABASE_ID, TABLES.SERVICES, [Query.limit(1000)]),
      tablesDb.listRows(DATABASE_ID, TABLES.TAGS, [Query.limit(1000)]),
      storage.listFiles(BUCKETS.MEDIA, [Query.limit(1000)]),
    ]);

    const publishedPosts = posts.rows.filter((p) => p.is_published).length;

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
}): Promise<{ documents: CMSPost[]; total: number }> {
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

  const response = await tablesDb.listRows(DATABASE_ID, TABLES.POSTS, queries);
  return {
    documents: response.rows as unknown as CMSPost[],
    total: response.total,
  };
}

export async function getPost(id: string): Promise<CMSPost> {
  const response = await tablesDb.getRow(DATABASE_ID, TABLES.POSTS, id);
  return response as unknown as CMSPost;
}

export async function createPost(data: Omit<CMSPost, "$id" | "$createdAt" | "$updatedAt">, userId: string): Promise<Post> {
  const response = await tablesDb.createRow(
    DATABASE_ID,
    TABLES.POSTS,
    ID.unique(),
    data,
    defaultPermissions(userId)
  );
  return response as unknown as Post;
}

export async function updatePost(id: string, data: Partial<CMSPost>): Promise<CMSPost> {
  const response = await tablesDb.updateRow(DATABASE_ID, TABLES.POSTS, id, data);
  return response as unknown as CMSPost;
}

export async function deletePost(id: string): Promise<void> {
  await tablesDb.deleteRow(DATABASE_ID, TABLES.POSTS, id);
}

// Services CRUD
export async function listServices(): Promise<{ documents: CMSService[]; total: number }> {
  const response = await tablesDb.listRows(DATABASE_ID, TABLES.SERVICES, [
    Query.orderAsc("order"),
    Query.limit(100),
  ]);
  return {
    documents: response.rows as unknown as CMSService[],
    total: response.total,
  };
}

export async function getService(id: string): Promise<CMSService> {
  const response = await tablesDb.getRow(DATABASE_ID, TABLES.SERVICES, id);
  return response as unknown as CMSService;
}

export async function createService(data: Omit<CMSService, "$id" | "$createdAt" | "$updatedAt">, userId: string): Promise<CMSService> {
  const response = await tablesDb.createRow(
    DATABASE_ID,
    TABLES.SERVICES,
    ID.unique(),
    data,
    defaultPermissions(userId)
  );
  return response as unknown as CMSService;
}

export async function updateService(id: string, data: Partial<CMSService>): Promise<CMSService> {
  const response = await tablesDb.updateRow(DATABASE_ID, TABLES.SERVICES, id, data);
  return response as unknown as CMSService;
}

export async function deleteService(id: string): Promise<void> {
  await tablesDb.deleteRow(DATABASE_ID, TABLES.SERVICES, id);
}

// Tags CRUD
export async function listTags(): Promise<{ documents: CMSTag[]; total: number }> {
  const response = await tablesDb.listRows(DATABASE_ID, TABLES.TAGS, [
    Query.orderAsc("name_en"),
    Query.limit(100),
  ]);
  return {
    documents: response.rows as unknown as CMSTag[],
    total: response.total,
  };
}

export async function createTag(data: Omit<CMSTag, "$id" | "$createdAt" | "$updatedAt">, userId: string): Promise<CMSTag> {
  const response = await tablesDb.createRow(
    DATABASE_ID,
    TABLES.TAGS,
    ID.unique(),
    data,
    defaultPermissions(userId)
  );
  return response as unknown as CMSTag;
}

export async function updateTag(id: string, data: Partial<CMSTag>): Promise<CMSTag> {
  const response = await tablesDb.updateRow(DATABASE_ID, TABLES.TAGS, id, data);
  return response as unknown as CMSTag;
}

export async function deleteTag(id: string): Promise<void> {
  await tablesDb.deleteRow(DATABASE_ID, TABLES.TAGS, id);
}

// Fonts CRUD
export async function listFonts(): Promise<{ documents: CMSFont[]; total: number }> {
  const response = await tablesDb.listRows(DATABASE_ID, TABLES.FONTS, [
    Query.orderAsc("name"),
    Query.limit(100),
  ]);
  return {
    documents: response.rows as unknown as CMSFont[],
    total: response.total,
  };
}

export async function createFont(data: Omit<CMSFont, "$id" | "$createdAt" | "$updatedAt">, userId: string): Promise<CMSFont> {
  const response = await tablesDb.createRow(
    DATABASE_ID,
    TABLES.FONTS,
    ID.unique(),
    data,
    defaultPermissions(userId)
  );
  return response as unknown as CMSFont;
}

export async function deleteFont(id: string, fileId: string): Promise<void> {
  await Promise.all([
    tablesDb.deleteRow(DATABASE_ID, TABLES.FONTS, id),
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

export async function deleteMedia(fileId: string): Promise<void> {
  await storage.deleteFile(BUCKETS.MEDIA, fileId);
}

export async function uploadMedia(file: File, userId: string): Promise<MediaFile> {
  const response = await storage.createFile(
    BUCKETS.MEDIA,
    ID.unique(),
    file,
    defaultPermissions(userId),
  );
  return response as unknown as MediaFile;
}

export const defaultPermissions = (userId: string) => [
  Permission.read(Role.any()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
  Permission.update(Role.users()),
  Permission.write(Role.user(userId))
]


export async function uploadFont(file: File, userId: string): Promise<MediaFile> {
  const response = await storage.createFile(
    BUCKETS.FONTS,
    ID.unique(),
    file,
    defaultPermissions(userId),
  );
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

export { tablesDb, storage, DATABASE_ID, ID };

