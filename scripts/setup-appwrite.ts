/**
 * Appwrite Database Setup Script
 *
 * This script automatically creates the database, tables (collections), and storage buckets
 * for the Dama Productions CMS.
 *
 * Prerequisites:
 * - Appwrite project must exist
 * - APPWRITE_API_KEY environment variable must be set
 * - NEXT_PUBLIC_APPWRITE_ENDPOINT environment variable must be set
 * - NEXT_PUBLIC_APPWRITE_DATABASE_ID environment variable (optional, defaults to "dama_db")
 *
 * Usage:
 *   npx tsx scripts/setup-appwrite.ts
 *
 * Or with ts-node:
 *   ts-node scripts/setup-appwrite.ts
 */

import { Client, Databases, Storage, ID, Permission, Role } from "node-appwrite";
import appwriteConfig from "../appwrite.config.json";

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const PROJECT_ID = appwriteConfig.projectId;
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "dama_db";

if (!API_KEY) {
  console.error("❌ Error: APPWRITE_API_KEY environment variable is required");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

// Helper function to wait for attribute to be ready
async function waitForAttribute(collectionId: string, attributeId: string, maxAttempts: number = 30) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      const attr = await databases.getAttribute(DATABASE_ID, collectionId, attributeId);
      if (attr.status === "available") {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
  }
  return false;
}

// Helper function to create string attribute
async function createStringAttribute(
  collectionId: string,
  attributeId: string,
  size: number,
  required: boolean,
  array: boolean = false
) {
  try {
    await databases.getAttribute(DATABASE_ID, collectionId, attributeId);
    console.log(`  ✓ Attribute '${attributeId}' already exists`);
    return;
  } catch (error: any) {
    if (error.code !== 404) throw error;
  }

  try {
    if (array) {
      await databases.createStringAttribute(DATABASE_ID, collectionId, attributeId, size, required, undefined, true);
    } else {
      await databases.createStringAttribute(DATABASE_ID, collectionId, attributeId, size, required);
    }
    console.log(`  ✓ Created attribute '${attributeId}'`);
    await waitForAttribute(collectionId, attributeId);
  } catch (createError: any) {
    console.error(`  ✗ Failed to create attribute '${attributeId}':`, createError.message);
    throw createError;
  }
}

// Helper function to create integer attribute
async function createIntegerAttribute(
  collectionId: string,
  attributeId: string,
  required: boolean,
  defaultValue?: number
) {
  try {
    await databases.getAttribute(DATABASE_ID, collectionId, attributeId);
    console.log(`  ✓ Attribute '${attributeId}' already exists`);
    return;
  } catch (error: any) {
    if (error.code !== 404) throw error;
  }

  try {
    await databases.createIntegerAttribute(DATABASE_ID, collectionId, attributeId, required, defaultValue);
    console.log(`  ✓ Created attribute '${attributeId}'`);
    await waitForAttribute(collectionId, attributeId);
  } catch (createError: any) {
    console.error(`  ✗ Failed to create attribute '${attributeId}':`, createError.message);
    throw createError;
  }
}

// Helper function to create boolean attribute
async function createBooleanAttribute(
  collectionId: string,
  attributeId: string,
  required: boolean,
  defaultValue?: boolean
) {
  try {
    await databases.getAttribute(DATABASE_ID, collectionId, attributeId);
    console.log(`  ✓ Attribute '${attributeId}' already exists`);
    return;
  } catch (error: any) {
    if (error.code !== 404) throw error;
  }

  try {
    await databases.createBooleanAttribute(DATABASE_ID, collectionId, attributeId, required, defaultValue);
    console.log(`  ✓ Created attribute '${attributeId}'`);
    await waitForAttribute(collectionId, attributeId);
  } catch (createError: any) {
    console.error(`  ✗ Failed to create attribute '${attributeId}':`, createError.message);
    throw createError;
  }
}

// Helper function to create datetime attribute
async function createDateTimeAttribute(
  collectionId: string,
  attributeId: string,
  required: boolean
) {
  try {
    await databases.getAttribute(DATABASE_ID, collectionId, attributeId);
    console.log(`  ✓ Attribute '${attributeId}' already exists`);
    return;
  } catch (error: any) {
    if (error.code !== 404) throw error;
  }

  try {
    await databases.createDatetimeAttribute(DATABASE_ID, collectionId, attributeId, required);
    console.log(`  ✓ Created attribute '${attributeId}'`);
    await waitForAttribute(collectionId, attributeId);
  } catch (createError: any) {
    console.error(`  ✗ Failed to create attribute '${attributeId}':`, createError.message);
    throw createError;
  }
}

// Helper function to create index if it doesn't exist
async function createIndexIfNotExists(
  collectionId: string,
  indexId: string,
  key: string,
  type: string = "key",
  unique: boolean = false
) {
  try {
    await databases.getIndex(DATABASE_ID, collectionId, indexId);
    console.log(`  ✓ Index '${indexId}' already exists`);
  } catch (error: any) {
    if (error.code === 404) {
      try {
        await databases.createIndex(
          DATABASE_ID,
          collectionId,
          indexId,
          type,
          [key],
          [],
          unique ? [key] : []
        );
        console.log(`  ✓ Created index '${indexId}'`);
      } catch (createError: any) {
        console.error(`  ✗ Failed to create index '${indexId}':`, createError.message);
        throw createError;
      }
    } else {
      throw error;
    }
  }
}

// Create database
async function createDatabase() {
  try {
    await databases.get(DATABASE_ID);
    console.log(`✓ Database '${DATABASE_ID}' already exists`);
  } catch (error: any) {
    if (error.code === 404) {
      try {
        await databases.create(DATABASE_ID, "Dama Productions Database");
        console.log(`✓ Created database '${DATABASE_ID}'`);
      } catch (createError: any) {
        console.error(`✗ Failed to create database:`, createError.message);
        throw createError;
      }
    } else {
      throw error;
    }
  }
}

// Create posts table
async function createPostsTable() {
  const collectionId = "posts";

  try {
    await databases.getCollection(DATABASE_ID, collectionId);
    console.log(`✓ Table '${collectionId}' already exists`);
  } catch (error: any) {
    if (error.code === 404) {
      await databases.createCollection(
        DATABASE_ID,
        collectionId,
        "Posts",
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ]
      );
      console.log(`✓ Created table '${collectionId}'`);
    } else {
      throw error;
    }
  }

  // Create attributes
  await createStringAttribute(collectionId, "slug_ar", 255, true);
  await createStringAttribute(collectionId, "slug_en", 255, true);
  await createStringAttribute(collectionId, "title_ar", 500, true);
  await createStringAttribute(collectionId, "title_en", 500, true);
  await createStringAttribute(collectionId, "excerpt_ar", 1000, false);
  await createStringAttribute(collectionId, "excerpt_en", 1000, false);
  await createStringAttribute(collectionId, "body_ar", 100000, true);
  await createStringAttribute(collectionId, "body_en", 100000, true);
  await createStringAttribute(collectionId, "featured_image", 255, false);
  await createDateTimeAttribute(collectionId, "published_at", true);
  await createBooleanAttribute(collectionId, "is_published", true, false);
  await createStringAttribute(collectionId, "status", 20, true);
  await createStringAttribute(collectionId, "keywords", 100, false, true);
  await createStringAttribute(collectionId, "tags", 255, false, true);
  await createStringAttribute(collectionId, "author_id", 255, false);

  // Create indexes
  await createIndexIfNotExists(collectionId, "idx_slug_ar", "slug_ar", "unique", true);
  await createIndexIfNotExists(collectionId, "idx_slug_en", "slug_en", "unique", true);
  await createIndexIfNotExists(collectionId, "idx_is_published", "is_published", "key", false);
  await createIndexIfNotExists(collectionId, "idx_published_at", "published_at", "key", false);
  await createIndexIfNotExists(collectionId, "idx_status", "status", "key", false);
}

// Create services table
async function createServicesTable() {
  const collectionId = "services";

  try {
    await databases.getCollection(DATABASE_ID, collectionId);
    console.log(`✓ Table '${collectionId}' already exists`);
  } catch (error: any) {
    if (error.code === 404) {
      await databases.createCollection(
        DATABASE_ID,
        collectionId,
        "Services",
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ]
      );
      console.log(`✓ Created table '${collectionId}'`);
    } else {
      throw error;
    }
  }

  // Create attributes
  await createStringAttribute(collectionId, "slug_ar", 255, true);
  await createStringAttribute(collectionId, "slug_en", 255, true);
  await createStringAttribute(collectionId, "title_ar", 500, true);
  await createStringAttribute(collectionId, "title_en", 500, true);
  await createStringAttribute(collectionId, "description_ar", 2000, true);
  await createStringAttribute(collectionId, "description_en", 2000, true);
  await createStringAttribute(collectionId, "content_ar", 100000, false);
  await createStringAttribute(collectionId, "content_en", 100000, false);
  await createStringAttribute(collectionId, "icon", 50, true);
  await createStringAttribute(collectionId, "image", 255, false);
  await createIntegerAttribute(collectionId, "order", true, 0);
  await createBooleanAttribute(collectionId, "is_active", true, true);

  // Create indexes
  await createIndexIfNotExists(collectionId, "idx_slug_ar", "slug_ar", "unique", true);
  await createIndexIfNotExists(collectionId, "idx_slug_en", "slug_en", "unique", true);
  await createIndexIfNotExists(collectionId, "idx_is_active", "is_active", "key", false);
  await createIndexIfNotExists(collectionId, "idx_order", "order", "key", false);
}

// Create tags table
async function createTagsTable() {
  const collectionId = "tags";

  try {
    await databases.getCollection(DATABASE_ID, collectionId);
    console.log(`✓ Table '${collectionId}' already exists`);
  } catch (error: any) {
    if (error.code === 404) {
      await databases.createCollection(
        DATABASE_ID,
        collectionId,
        "Tags",
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ]
      );
      console.log(`✓ Created table '${collectionId}'`);
    } else {
      throw error;
    }
  }

  // Create attributes
  await createStringAttribute(collectionId, "name_ar", 100, true);
  await createStringAttribute(collectionId, "name_en", 100, true);
  await createStringAttribute(collectionId, "slug", 100, true);

  // Create indexes
  await createIndexIfNotExists(collectionId, "idx_slug", "slug", "unique", true);
  await createIndexIfNotExists(collectionId, "idx_name_en", "name_en", "key", false);
}

// Create fonts table
async function createFontsTable() {
  const collectionId = "fonts";

  try {
    await databases.getCollection(DATABASE_ID, collectionId);
    console.log(`✓ Table '${collectionId}' already exists`);
  } catch (error: any) {
    if (error.code === 404) {
      await databases.createCollection(
        DATABASE_ID,
        collectionId,
        "Fonts",
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users()),
        ]
      );
      console.log(`✓ Created table '${collectionId}'`);
    } else {
      throw error;
    }
  }

  // Create attributes
  await createStringAttribute(collectionId, "name", 200, true);
  await createStringAttribute(collectionId, "file_id", 255, true);
  await createStringAttribute(collectionId, "family", 100, true);
  await createStringAttribute(collectionId, "weight", 50, true);
  await createStringAttribute(collectionId, "style", 50, true);

  // Create indexes
  await createIndexIfNotExists(collectionId, "idx_family", "family", "key", false);
  await createIndexIfNotExists(collectionId, "idx_name", "name", "key", false);
}

// Create storage buckets
async function createStorageBuckets() {
  const buckets = [
    {
      id: "images",
      name: "images",
      maxSize: 10485760, // 10MB
      allowedExtensions: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
    },
    {
      id: "media",
      name: "media",
      maxSize: 52428800, // 50MB
      allowedExtensions: ["jpg", "jpeg", "png", "gif", "webp", "svg", "pdf", "mp4", "mov", "mp3"],
    },
    {
      id: "fonts",
      name: "fonts",
      maxSize: 314572800, // 300MB
      allowedExtensions: ["ttf", "woff", "woff2", "otf"],
    },
  ];

  for (const bucket of buckets) {
    try {
      await storage.getBucket(bucket.id);
      console.log(`✓ Bucket '${bucket.name}' already exists`);
    } catch (error: any) {
      if (error.code === 404) {
        try {
          await storage.createBucket(
            bucket.id,
            bucket.name,
            [
              Permission.read(Role.any()),
              Permission.create(Role.users()),
              Permission.update(Role.users()),
              Permission.delete(Role.users()),
            ],
            bucket.maxSize,
            false, // fileSecurity
            bucket.allowedExtensions,
            true, // encryption
            true, // antivirus
            "none" // compression
          );
          console.log(`✓ Created bucket '${bucket.name}'`);
        } catch (createError: any) {
          console.error(`✗ Failed to create bucket '${bucket.name}':`, createError.message);
          throw createError;
        }
      } else {
        throw error;
      }
    }
  }
}

// Main setup function
async function setup() {
  console.log("🚀 Starting Appwrite database setup...\n");
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Database ID: ${DATABASE_ID}\n`);

  try {
    // Create database
    console.log("📦 Creating database...");
    await createDatabase();
    console.log();

    // Create tables
    console.log("📋 Creating tables...");
    await createPostsTable();
    console.log();
    await createServicesTable();
    console.log();
    await createTagsTable();
    console.log();
    await createFontsTable();
    console.log();

    // Create storage buckets
    console.log("🗂️  Creating storage buckets...");
    await createStorageBuckets();
    console.log();

    console.log("✅ Setup completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Verify the setup in your Appwrite Console");
    console.log("2. Test the CMS by creating a post or service");
    console.log("3. Upload some media files to test the buckets");
  } catch (error: any) {
    console.error("\n❌ Setup failed:", error.message);
    process.exit(1);
  }
}

// Run setup
setup();

