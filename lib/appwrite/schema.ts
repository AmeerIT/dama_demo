/**
 * Appwrite Database Schema Documentation
 *
 * This file documents the required database tables (Appwrite collections) and storage buckets
 * for the Dama Productions website.
 *
 * Database ID: dama_db
 *
 * Note: Appwrite uses "collections" internally, but we refer to them as "tables" in documentation
 * for clarity and consistency with traditional database terminology.
 */

/**
 * TABLE: posts
 * Purpose: Store blog posts with dual-language support
 *
 * Attributes:
 * - slug (string, 255, required, unique) - URL slug (unified for both languages)
 * - title_ar (string, 500, required) - Arabic title
 * - title_en (string, 500, required) - English title
 * - excerpt_ar (string, 1000, optional) - Arabic excerpt/summary
 * - excerpt_en (string, 1000, optional) - English excerpt/summary
 * - body_ar (string, 100000, required) - Arabic body content (Lexical JSON)
 * - body_en (string, 100000, required) - English body content (Lexical JSON)
 * - featured_image (string, 255, optional) - File ID from `images` bucket
 * - published_at (datetime, required) - Publication timestamp
 * - is_published (boolean, required, default: false) - Publication status
 * - status (string, 20, required, default: "draft") - Status: "draft" | "published"
 * - keywords (string[], optional) - SEO keywords array
 * - tags (string[], optional) - Array of tag IDs (references `tags` table)
 * - author_id (string, 255, optional) - User ID of author
 *
 * Indexes:
 * - slug (unique)
 * - is_published (key)
 * - published_at (key, descending)
 * - status (key)
 *
 * Permissions:
 * - Read: `any` (public access)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

/**
 * TABLE: services
 * Purpose: Store service pages with dual-language support
 *
 * Attributes:
 * - slug (string, 255, required, unique) - URL slug (unified for both languages)
 * - title_ar (string, 500, required) - Arabic title
 * - title_en (string, 500, required) - English title
 * - description_ar (string, 2000, required) - Arabic short description
 * - description_en (string, 2000, required) - English short description
 * - content_ar (string, 100000, optional) - Arabic full content (Lexical JSON)
 * - content_en (string, 100000, optional) - English full content (Lexical JSON)
 * - icon (string, 50, required) - Lucide icon identifier
 * - image (string, 255, optional) - File ID from `images` bucket
 * - order (integer, required, default: 0) - Display order for sorting
 * - is_active (boolean, required, default: true) - Active status
 *
 * Indexes:
 * - slug (unique)
 * - is_active (key)
 * - order (key, ascending)
 *
 * Permissions:
 * - Read: `any` (public access)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

/**
 * TABLE: tags
 * Purpose: Store tags for blog post categorization
 *
 * Attributes:
 * - name_ar (string, 100, required) - Arabic tag name
 * - name_en (string, 100, required) - English tag name
 * - slug (string, 100, required, unique) - URL-safe slug (same for both languages)
 *
 * Indexes:
 * - slug (unique)
 * - name_en (key, for sorting)
 *
 * Permissions:
 * - Read: `any` (public access)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

/**
 * TABLE: fonts
 * Purpose: Store custom font metadata
 *
 * Attributes:
 * - name (string, 200, required) - Font display name
 * - file_id (string, 255, required) - File ID from `fonts` bucket
 * - family (string, 100, required) - CSS font-family name
 * - weight (string, 50, required) - Font weight (e.g., "400", "700", "normal", "bold")
 * - style (string, 50, required) - Font style (e.g., "normal", "italic")
 *
 * Indexes:
 * - family (key)
 * - name (key)
 *
 * Permissions:
 * - Read: `any` (public access for font loading)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

/**
 * STORAGE BUCKET: images
 * Purpose: Store featured images for posts and services
 *
 * Settings:
 * - Name: `images`
 * - Maximum File Size: 10MB (10,485,760 bytes)
 * - Allowed Extensions: jpg, jpeg, png, gif, webp, svg
 * - Compression: none (preserve quality)
 * - Encryption: true (at rest)
 * - Antivirus: true (scan uploads)
 * - File Security: false (public read access)
 *
 * Permissions:
 * - Read: `any` (public access for images)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

/**
 * STORAGE BUCKET: media
 * Purpose: Store uploaded media files from CMS (separate from featured images for better organization)
 *
 * Settings:
 * - Name: `media`
 * - Maximum File Size: 50MB (52,428,800 bytes)
 * - Allowed Extensions: jpg, jpeg, png, gif, webp, svg, pdf, mp4, mov, mp3
 * - Compression: none (preserve quality)
 * - Encryption: true (at rest)
 * - Antivirus: true (scan uploads)
 * - File Security: false (public read access)
 *
 * Permissions:
 * - Read: `any` (public access)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

/**
 * STORAGE BUCKET: fonts
 * Purpose: Store custom font files (.ttf, .woff, .woff2, .otf)
 *
 * Settings:
 * - Name: `fonts`
 * - Maximum File Size: 300MB (314,572,800 bytes)
 * - Allowed Extensions: ttf, woff, woff2, otf
 * - Compression: none
 * - Encryption: true (at rest)
 * - Antivirus: true (scan uploads)
 * - File Security: false (public read access for font loading)
 *
 * Permissions:
 * - Read: `any` (public access for font loading)
 * - Create/Update/Delete: `users` (authenticated CMS users)
 */

export const SCHEMA_VERSION = "1.0.0";

