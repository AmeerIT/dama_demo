"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LexKitEditor } from "@/components/cms/lexkit-editor";
import { MediaPicker } from "@/components/cms/media-picker";
import { TagsInput } from "@/components/cms/tags-input";
import { CMSPost, type PostFormData, getMediaUrl } from "@/lib/appwrite/cms-data";
import {
  Loader2,
  Save,
  Send,
  Image as ImageIcon,
  X,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import slugify from "slugify";

interface PostEditorFormProps {
  post?: CMSPost;
  onSave: (data: PostFormData) => Promise<void>;
  isSaving: boolean;
}

function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function PostEditorForm({ post, onSave, isSaving }: PostEditorFormProps) {
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [titleEn, setTitleEn] = useState(post?.title_en || "");
  const [titleAr, setTitleAr] = useState(post?.title_ar || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerptEn, setExcerptEn] = useState(post?.excerpt_en || "");
  const [excerptAr, setExcerptAr] = useState(post?.excerpt_ar || "");
  const [bodyEn, setBodyEn] = useState(post?.body_en || "");
  const [bodyAr, setBodyAr] = useState(post?.body_ar || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [videoUrl, setVideoUrl] = useState(post?.video_url || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [keywords, setKeywords] = useState<string[]>(post?.keywords || []);
  const [keywordsInput, setKeywordsInput] = useState(post?.keywords?.join(", ") || "");

  const handleTitleEnChange = (value: string) => {
    setTitleEn(value);
    // Auto-generate slug from English title if creating new post and slug is empty
    if (!post && !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleTitleArChange = (value: string) => {
    setTitleAr(value);
    // Auto-generate slug from Arabic title if creating new post, slug is empty, and no English title
    if (!post && !slug && !titleEn) {
      setSlug(generateSlug(value));
    }
  };

  const handleGenerateSlug = () => {
    // Prefer English title, fallback to Arabic
    const title = titleEn || titleAr;
    if (title) {
      setSlug(generateSlug(title));
    }
  };

  const handleKeywordsChange = (value: string) => {
    setKeywordsInput(value);
    setKeywords(value.split(",").map((k) => k.trim()).filter(Boolean));
  };

  const handleImageSelect = (url: string, fileId: string) => {
    setFeaturedImage(fileId);
  };

  const handleSave = async (publish: boolean) => {
    setError(null);

    if (!titleEn && !titleAr) {
      setError("Please enter a title in at least one language");
      return;
    }

    // Slug will be auto-generated if empty, so no need to validate

    try {
      const data: PostFormData = {
        title_en: titleEn,
        title_ar: titleAr,
        slug: slug || generateSlug(titleEn || titleAr),
        excerpt_en: excerptEn || "",
        excerpt_ar: excerptAr || "",
        body_en: bodyEn,
        body_ar: bodyAr,
        featured_image: featuredImage || "",
        video_url: videoUrl || undefined,
        tags,
        keywords,
        is_published: publish,
        status: publish ? "published" : "draft",
        published_at: publish ? new Date().toISOString() : (post?.published_at || new Date().toISOString()),
      };

      await onSave(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/cms/posts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Draft
          </Button>
          <Button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Publish
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* URL Slug */}
          <Card>
            <CardHeader>
              <CardTitle>URL Slug</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateSlug}
                  disabled={!titleEn && !titleAr}
                  title="Generate slug from title"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Auto-generated from title. Click the refresh button to regenerate.
              </p>
            </CardContent>
          </Card>

          {/* Language Tabs */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={activeTab === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("en")}
                >
                  English
                </Button>
                <Button
                  type="button"
                  variant={activeTab === "ar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("ar")}
                >
                  العربية
                </Button>
              </div>

              {/* English Content */}
              <div className={activeTab === "en" ? "block" : "hidden"}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title-en">Title (English)</Label>
                    <Input
                      id="title-en"
                      value={titleEn}
                      onChange={(e) => handleTitleEnChange(e.target.value)}
                      placeholder="Enter post title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt-en">Excerpt (English)</Label>
                    <Textarea
                      id="excerpt-en"
                      value={excerptEn}
                      onChange={(e) => setExcerptEn(e.target.value)}
                      placeholder="Brief description..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content (English)</Label>
                    <LexKitEditor
                      initialContent={bodyEn}
                      onChange={setBodyEn}
                      onInsertImage={() => setMediaPickerOpen(true)}
                      placeholder="Start writing your post..."
                    />
                  </div>
                </div>
              </div>

              {/* Arabic Content */}
              <div className={activeTab === "ar" ? "block" : "hidden"} dir="rtl">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title-ar">العنوان (عربي)</Label>
                    <Input
                      id="title-ar"
                      value={titleAr}
                      onChange={(e) => handleTitleArChange(e.target.value)}
                      placeholder="أدخل عنوان المقال..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt-ar">الوصف المختصر (عربي)</Label>
                    <Textarea
                      id="excerpt-ar"
                      value={excerptAr}
                      onChange={(e) => setExcerptAr(e.target.value)}
                      placeholder="وصف مختصر..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>المحتوى (عربي)</Label>
                    <LexKitEditor
                      initialContent={bodyAr}
                      onChange={setBodyAr}
                      onInsertImage={() => setMediaPickerOpen(true)}
                      placeholder="ابدأ الكتابة..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          {post && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.is_published
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                >
                  {post.is_published ? "Published" : "Draft"}
                </div>
                {post.published_at && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Published: {new Date(post.published_at).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={getMediaUrl(featuredImage)}
                    alt="Featured"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setFeaturedImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-32 flex flex-col gap-2"
                  onClick={() => setMediaPickerOpen(true)}
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm">Select Image</span>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Video URL */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Featured Video</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                YouTube URL (supports regular videos and shorts)
              </p>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <TagsInput value={tags} onChange={setTags} />
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">SEO Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={keywordsInput}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                placeholder="keyword1, keyword2, keyword3..."
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Separate keywords with commas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Picker Dialog */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleImageSelect}
      />
    </div>
  );
}

