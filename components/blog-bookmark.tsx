"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogBookmarkProps {
  postSlug: string;
}

export function BlogBookmark({ postSlug }: BlogBookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Read from cookie
    const bookmarks = getBookmarks();
    setIsBookmarked(bookmarks.includes(postSlug));
  }, [postSlug]);

  const getBookmarks = (): string[] => {
    if (typeof window === "undefined") return [];
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("bookmarks="));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    } catch {
      return [];
    }
  };

  const saveBookmarks = (bookmarks: string[]) => {
    // Save to cookie (expires in 1 year)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `bookmarks=${encodeURIComponent(JSON.stringify(bookmarks))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  };

  const toggleBookmark = () => {
    const bookmarks = getBookmarks();

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((slug) => slug !== postSlug);
      saveBookmarks(updated);
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const updated = [...bookmarks, postSlug];
      saveBookmarks(updated);
      setIsBookmarked(true);
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400"
        disabled
      >
        <Bookmark size={20} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleBookmark}
      className={`transition-colors ${
        isBookmarked
          ? "text-blue-600 hover:text-blue-700"
          : "text-slate-400 hover:text-blue-600"
      }`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        size={20}
        fill={isBookmarked ? "currentColor" : "none"}
        className="transition-all"
      />
    </Button>
  );
}
