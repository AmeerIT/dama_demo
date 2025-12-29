/**
 * Centralized type definitions for all Appwrite collections
 * This is the single source of truth for data models
 */

// ============================================================================
// BASE TYPES (Public-facing, used in frontend)
// ============================================================================

export interface Post {
    id: string;
    slug: string;
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

export interface Service {
    id: string;
    slug: string;
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
}

export interface Tag {
    id: string;
    name_ar: string;
    name_en: string;
    slug: string;
}

export interface Podcast {
    id: string;
    slug: string;
    title_ar: string;
    title_en: string;
    author_ar: string;
    author_en: string;
    excerpt_ar?: string;
    excerpt_en?: string;
    body_ar: string;
    body_en: string;
    cover_image: string;
    audio_url?: string;
    video_url?: string;
    duration?: number;
    published_at: string;
    is_published: boolean;
    guest_ids?: string[];
    tags?: Tag[];
}

export interface Guest {
    id: string;
    slug: string;
    name_ar: string;
    name_en: string;
    bio_ar?: string;
    bio_en?: string;
    avatar?: string;
    title_ar?: string;
    title_en?: string;
    social_links?: string[];
    is_active: boolean;
}
export interface Episode {
    id: string;
    slug: string;
    title_ar: string;
    title_en: string;
    description_ar?: string;
    description_en?: string;
    body_ar?: string;
    body_en?: string;
    cover_image?: string;
    audio_url?: string;
    video_url?: string;
    duration: number; // in seconds
    episode_number: number;
    season?: number;
    published_at: string;
    is_published: boolean;
    tags?: Tag[];
}

export interface Font {
    id: string;
    name: string;
    file_id: string;
    family: string;
    weight: string;
    style: string;
}

// ============================================================================
// CMS TYPES (Used in admin panel with Appwrite metadata fields)
// ============================================================================

export interface CMSPost {
    $id: string;
    slug: string;
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

export interface CMSService {
    $id: string;
    slug: string;
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

export interface CMSTag {
    $id: string;
    name_ar: string;
    name_en: string;
    slug: string;
    $createdAt: string;
    $updatedAt: string;
}

export interface CMSPodcast {
    $id: string;
    slug: string;
    title_ar: string;
    title_en: string;
    author_ar: string;
    author_en: string;
    excerpt_ar?: string;
    excerpt_en?: string;
    body_ar: string;
    body_en: string;
    cover_image: string;
    audio_url?: string;
    video_url?: string;
    duration?: number;
    published_at: string;
    is_published: boolean;
    guest_ids?: string[];
    tags?: string[];
    $createdAt: string;
    $updatedAt: string;
}

export interface CMSGuest {
    $id: string;
    slug: string;
    name_ar: string;
    name_en: string;
    bio_ar?: string;
    bio_en?: string;
    avatar?: string;
    title_ar?: string;
    title_en?: string;
    social_links?: string[];
    is_active: boolean;
    $createdAt: string;
    $updatedAt: string;
}

export interface CMSEpisode {
    $id: string;
    slug: string;
    title_ar: string;
    title_en: string;
    description_ar?: string;
    description_en?: string;
    body_ar?: string;
    body_en?: string;
    cover_image?: string;
    audio_url?: string;
    video_url?: string;
    duration: number;
    episode_number: number;
    season?: number;
    published_at: string;
    is_published: boolean;
    tags?: string[];
    $createdAt: string;
    $updatedAt: string;
}

export interface CMSFont {
    $id: string;
    name: string;
    file_id: string;
    family: string;
    weight: string;
    style: string;
    $createdAt: string;
    $updatedAt: string;
}


// ============================================================================
// FORM DATA TYPES (For creating/updating in CMS)
// ============================================================================

export type PostFormData = Omit<CMSPost, "$id" | "$createdAt" | "$updatedAt">;
export type ServiceFormData = Omit<CMSService, "$id" | "$createdAt" | "$updatedAt">;

export type PodcastFormData = Omit<CMSPodcast, "$id" | "$createdAt" | "$updatedAt">;
export type GuestFormData = Omit<CMSGuest, "$id" | "$createdAt" | "$updatedAt">;

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface MediaFile {
    $id: string;
    name: string;
    mimeType: string;
    sizeOriginal: number;
    $createdAt: string;
}

export interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalServices: number;
    totalTags: number;
    totalMedia: number;
}
