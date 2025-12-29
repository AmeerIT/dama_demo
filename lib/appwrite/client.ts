import { Client, Storage, Account, TablesDB } from "node-appwrite";
import appwriteConfig from "@/appwrite.config.json";

// Server-side Appwrite client
const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1")
    .setProject(appwriteConfig.projectId);

  // Set API key for server-side operations (optional, for admin operations)
  if (process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
  }

  return {
    get account() {
      return new Account(client);
    },
    get TablesDB() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

// Public client for read-only operations
const createPublicClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1")
    .setProject(appwriteConfig.projectId);

  return {
    get tablesDb() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

export const adminClient = createAdminClient();
export const publicClient = createPublicClient();

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "dama_db";
export const TABLES = {
  POSTS: "posts",
  SERVICES: "services",
  TAGS: "tags",
  FONTS: "fonts",
  PODCASTS: "podcasts",
  GUESTS: "guests",
} as const;


// Storage bucket IDs
export const BUCKETS = {
  MEDIA: "media",
  FONTS: "694c1573001db670c6e6",
} as const;

// Helper to get image URL
export const getImageUrl = (fileId: string, width?: number, height?: number): string => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1";
  const projectId = appwriteConfig.projectId;

  let url = `${endpoint}/storage/buckets/${BUCKETS.MEDIA}/files/${fileId}/view?project=${projectId}`;

  if (width) url += `&width=${width}`;
  if (height) url += `&height=${height}`;

  return url;
};

// Helper to get media URL
export const getMediaUrl = (fileId: string): string => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1";
  const projectId = appwriteConfig.projectId;
  return `${endpoint}/storage/buckets/${BUCKETS.MEDIA}/files/${fileId}/view?project=${projectId}`;
};

// Helper to get font URL
export const getFontUrl = (fileId: string): string => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://api.center-phone.com/v1";
  const projectId = appwriteConfig.projectId;
  return `${endpoint}/storage/buckets/${BUCKETS.FONTS}/files/${fileId}/view?project=${projectId}`;
};

