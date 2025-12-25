/**
 * Centralized exports for all Appwrite functionality
 * Import everything you need from '@/lib/appwrite'
 */

// ============================================================================
// Types
// ============================================================================
export type {
    // Public-facing types (no $ fields)
    Post,
    Service,
    Tag,
    Font,

    // CMS types (with $ metadata fields)
    CMSPost,
    CMSService,
    CMSTag,
    CMSFont,

    // Form data types
    PostFormData,
    ServiceFormData,

    // Utility types
    MediaFile,
    DashboardStats,
} from "./types";

// ============================================================================
// Client & Constants
// ============================================================================
export { publicClient, DATABASE_ID, TABLES, BUCKETS, getImageUrl } from "./client";

// ============================================================================
// Public API Functions (Frontend)
// ============================================================================
export { getPosts, getPostBySlug, getAllPostSlugs } from "./posts";
export { getServices, getServiceBySlug, getAllServiceSlugs } from "./services";
export { getTags, getTagBySlug, getAllTagSlugs } from "./tags";

// ============================================================================
// CMS Functions (Admin Panel)
// ============================================================================
export {
    // Dashboard
    getDashboardStats,

    // Posts
    listPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,

    // Services
    listServices,
    getService,
    createService,
    updateService,
    deleteService,

    // Tags
    listTags,
    createTag,
    updateTag,
    deleteTag,

    // Fonts
    listFonts,
    createFont,
    deleteFont,
    uploadFont,
    getFontUrl,

    // Media
    listMedia,
    uploadMedia,
    deleteMedia,
    getMediaUrl,
} from "./cms-data";

// ============================================================================
// Auth
// ============================================================================
export { login, logout, getCurrentUser } from "./auth";
