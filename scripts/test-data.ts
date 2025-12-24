/**
 * Test Data Script
 *
 * This script creates sample posts and services in the Appwrite database
 * for testing purposes.
 *
 * Prerequisites:
 * - Database and tables must be set up (run setup-appwrite.ts first)
 * - APPWRITE_API_KEY environment variable must be set
 * - NEXT_PUBLIC_APPWRITE_ENDPOINT environment variable must be set
 *
 * Usage:
 *   npm run test:data
 *   or
 *   npx tsx scripts/test-data.ts
 */

import { Client, Databases, ID } from "node-appwrite";
import appwriteConfig from "../appwrite.config.json";
import { readFileSync } from "fs";
import { join } from "path";

// Try to load .env.local if it exists
try {
  const envPath = join(process.cwd(), ".env.local");
  const envFile = readFileSync(envPath, "utf-8");
  envFile.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
} catch {
  // .env.local doesn't exist, that's okay
}

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const PROJECT_ID = appwriteConfig.projectId;
const API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "dama_db";

if (!API_KEY) {
  console.error("❌ Error: APPWRITE_API_KEY environment variable is required");
  console.error("\nPlease set it in one of the following ways:");
  console.error("  1. Create a .env.local file with: APPWRITE_API_KEY=your-key-here");
  console.error("  2. Export it in your terminal: export APPWRITE_API_KEY=your-key-here");
  console.error("  3. Run with inline env: APPWRITE_API_KEY=your-key npm run test:data");
  console.error("\nTo get your API key:");
  console.error("  - Go to Appwrite Console → Settings → API Keys");
  console.error("  - Create a new key with 'Databases' scope");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);

// Sample Lexical JSON content (minimal structure)
const sampleLexicalContent = JSON.stringify({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "This is a sample blog post content. It demonstrates how the Lexical editor stores content.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

// Sample posts data
const samplePosts = [
  {
    slug_ar: "مقال-تجريبي-1",
    slug_en: "sample-post-1",
    title_ar: "مقال تجريبي رقم 1",
    title_en: "Sample Post 1",
    excerpt_ar: "هذا مقال تجريبي لاختبار النظام",
    excerpt_en: "This is a sample post to test the system",
    body_ar: sampleLexicalContent,
    body_en: sampleLexicalContent,
    published_at: new Date().toISOString(),
    is_published: true,
    status: "published",
    keywords: ["test", "sample", "blog"],
    tags: [],
    author_id: undefined,
  },
  {
    slug_ar: "مقال-تجريبي-2",
    slug_en: "sample-post-2",
    title_ar: "مقال تجريبي رقم 2",
    title_en: "Sample Post 2",
    excerpt_ar: "مقال آخر للاختبار",
    excerpt_en: "Another test post",
    body_ar: sampleLexicalContent,
    body_en: sampleLexicalContent,
    published_at: new Date().toISOString(),
    is_published: true,
    status: "published",
    keywords: ["testing", "demo"],
    tags: [],
    author_id: undefined,
  },
  {
    slug_ar: "مسودة-مقال",
    slug_en: "draft-post",
    title_ar: "مسودة مقال",
    title_en: "Draft Post",
    excerpt_ar: "هذا مقال في حالة المسودة",
    excerpt_en: "This is a draft post",
    body_ar: sampleLexicalContent,
    body_en: sampleLexicalContent,
    published_at: new Date().toISOString(),
    is_published: false,
    status: "draft",
    keywords: ["draft"],
    tags: [],
    author_id: undefined,
  },
];

// Sample services data
const sampleServices = [
  {
    slug_ar: "خدمة-داما-دكتور",
    slug_en: "dama-doctor",
    title_ar: "داما دكتور",
    title_en: "Dama Doctor",
    description_ar: "خدمة متكاملة لإدارة العيادات الطبية",
    description_en: "Comprehensive service for managing medical clinics",
    content_ar: sampleLexicalContent,
    content_en: sampleLexicalContent,
    icon: "Stethoscope",
    image: undefined,
    order: 1,
    is_active: true,
  },
  {
    slug_ar: "خدمة-داما-كورسيز",
    slug_en: "dama-courses",
    title_ar: "داما كورسيز",
    title_en: "Dama Courses",
    description_ar: "منصة تعليمية متكاملة للدورات التدريبية",
    description_en: "Comprehensive educational platform for training courses",
    content_ar: sampleLexicalContent,
    content_en: sampleLexicalContent,
    icon: "GraduationCap",
    image: undefined,
    order: 2,
    is_active: true,
  },
  {
    slug_ar: "خدمة-الاعلان-والترويج",
    slug_en: "advertising-promotion",
    title_ar: "الإعلان والترويج",
    title_en: "Advertising & Promotion",
    description_ar: "حلول إعلانية متكاملة لتعزيز حضورك الرقمي",
    description_en: "Comprehensive advertising solutions to enhance your digital presence",
    content_ar: sampleLexicalContent,
    content_en: sampleLexicalContent,
    icon: "Megaphone",
    image: undefined,
    order: 3,
    is_active: true,
  },
];

// Create a test post
async function createTestPost(postData: typeof samplePosts[0]) {
  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      "posts",
      ID.unique(),
      postData
    );
    console.log(`  ✓ Created post: ${postData.title_en} (ID: ${result.$id})`);
    return result;
  } catch (error: any) {
    console.error(`  ✗ Failed to create post '${postData.title_en}':`, error.message);
    throw error;
  }
}

// Create a test service
async function createTestService(serviceData: typeof sampleServices[0]) {
  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      "services",
      ID.unique(),
      serviceData
    );
    console.log(`  ✓ Created service: ${serviceData.title_en} (ID: ${result.$id})`);
    return result;
  } catch (error: any) {
    console.error(`  ✗ Failed to create service '${serviceData.title_en}':`, error.message);
    throw error;
  }
}

// Verify posts exist
async function verifyPosts() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, "posts", []);
    console.log(`\n📊 Posts in database: ${response.total}`);
    response.documents.forEach((doc: any) => {
      console.log(`  - ${doc.title_en || doc.title_ar} (${doc.is_published ? "Published" : "Draft"})`);
    });
    return response.total;
  } catch (error: any) {
    console.error("✗ Failed to verify posts:", error.message);
    return 0;
  }
}

// Verify services exist
async function verifyServices() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, "services", []);
    console.log(`\n📊 Services in database: ${response.total}`);
    response.documents.forEach((doc: any) => {
      console.log(`  - ${doc.title_en || doc.title_ar} (${doc.is_active ? "Active" : "Inactive"})`);
    });
    return response.total;
  } catch (error: any) {
    console.error("✗ Failed to verify services:", error.message);
    return 0;
  }
}

// Main function
async function runTests() {
  console.log("🧪 Starting test data creation...\n");
  console.log(`Project ID: ${PROJECT_ID}`);
  console.log(`Database ID: ${DATABASE_ID}\n`);

  try {
    // Check if database exists
    try {
      await databases.get(DATABASE_ID);
      console.log("✓ Database exists\n");
    } catch (error: any) {
      if (error.code === 404) {
        console.error("✗ Database not found. Please run 'npm run setup:appwrite' first.");
        process.exit(1);
      }
      throw error;
    }

    // Create test posts
    console.log("📝 Creating test posts...");
    const createdPosts = [];
    for (const post of samplePosts) {
      try {
        const result = await createTestPost(post);
        createdPosts.push(result);
      } catch (error) {
        // Continue with other posts even if one fails
        console.error(`  ⚠ Skipping post due to error`);
      }
    }
    console.log(`✓ Created ${createdPosts.length}/${samplePosts.length} posts\n`);

    // Create test services
    console.log("🛠️  Creating test services...");
    const createdServices = [];
    for (const service of sampleServices) {
      try {
        const result = await createTestService(service);
        createdServices.push(result);
      } catch (error) {
        // Continue with other services even if one fails
        console.error(`  ⚠ Skipping service due to error`);
      }
    }
    console.log(`✓ Created ${createdServices.length}/${sampleServices.length} services\n`);

    // Verify results
    console.log("🔍 Verifying created data...");
    const totalPosts = await verifyPosts();
    const totalServices = await verifyServices();

    console.log("\n✅ Test data creation completed!");
    console.log(`\nSummary:`);
    console.log(`  - Posts created: ${createdPosts.length}`);
    console.log(`  - Services created: ${createdServices.length}`);
    console.log(`  - Total posts in database: ${totalPosts}`);
    console.log(`  - Total services in database: ${totalServices}`);

    if (createdPosts.length > 0 || createdServices.length > 0) {
      console.log("\n🌐 You can now view the data in:");
      console.log(`  - CMS: http://localhost:3000/cms/posts`);
      console.log(`  - CMS: http://localhost:3000/cms/services`);
      console.log(`  - Public: http://localhost:3000/ar/blog`);
      console.log(`  - Public: http://localhost:3000/en/blog`);
    }
  } catch (error: any) {
    console.error("\n❌ Test failed:", error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  }
}

// Run tests
runTests();

