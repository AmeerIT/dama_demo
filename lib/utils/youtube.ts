/**
 * YouTube URL parser utility
 * Extracts video ID from various YouTube URL formats
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 *
 * @param url - YouTube URL or video ID
 * @returns Video ID or null if invalid
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // If it's already just an ID (11 characters, alphanumeric with dash/underscore)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  // Remove whitespace
  url = url.trim();

  // Patterns to match different YouTube URL formats
  const patterns = [
    // Standard watch URLs
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([a-zA-Z0-9_-]{11})/,
    // Shortened youtu.be URLs
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URLs
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // Shorts URLs
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    // Mobile URLs
    /m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Check if a URL is a valid YouTube URL
 * @param url - URL to check
 * @returns true if valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

/**
 * Get YouTube embed URL from video ID or URL
 * @param urlOrId - YouTube URL or video ID
 * @returns Embed URL or null if invalid
 */
export function getYouTubeEmbedUrl(urlOrId: string): string | null {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Get YouTube thumbnail URL
 * @param urlOrId - YouTube URL or video ID
 * @param quality - Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
 * @returns Thumbnail URL or null if invalid
 */
export function getYouTubeThumbnail(
  urlOrId: string,
  quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'
): string | null {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Get YouTube watch URL from video ID
 * @param videoId - YouTube video ID
 * @returns Watch URL
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
