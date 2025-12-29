"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LexKitEditor } from "@/components/cms/lexkit-editor";
import { MediaPicker } from "@/components/cms/media-picker";
import { TagsInput } from "@/components/cms/tags-input";
import {
    getMediaUrl,
    listGuests,
} from "@/lib/appwrite/cms-data";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CMSGuest, CMSPodcast, PodcastFormData } from "@/lib/appwrite/types";

interface PodcastEditorFormProps {
    podcast?: CMSPodcast;
    onSave: (data: PodcastFormData) => Promise<void>;
    isSaving: boolean;
}

function generateSlug(text: string): string {
    return slugify(text, {
        lower: true,
        strict: true,
        trim: true,
    });
}

// Helper to convert HH:MM:SS or MM:SS to seconds
function durationToSeconds(duration: string): number {
    const parts = duration.split(':').map(p => parseInt(p, 10));
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }
    return 0;
}

// Helper to convert seconds to HH:MM:SS or MM:SS
function secondsToDuration(seconds?: number): string {
    if (!seconds) return "";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function PodcastEditorForm({ podcast, onSave, isSaving }: PodcastEditorFormProps) {
    const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
    const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [guests, setGuests] = useState<CMSGuest[]>([]);

    // Form state
    const [titleEn, setTitleEn] = useState(podcast?.title_en || "");
    const [titleAr, setTitleAr] = useState(podcast?.title_ar || "");
    const [authorEn, setAuthorEn] = useState(podcast?.author_en || "");
    const [authorAr, setAuthorAr] = useState(podcast?.author_ar || "");
    const [slug, setSlug] = useState(podcast?.slug || "");
    const [excerptEn, setExcerptEn] = useState(podcast?.excerpt_en || "");
    const [excerptAr, setExcerptAr] = useState(podcast?.excerpt_ar || "");
    const [bodyEn, setBodyEn] = useState(podcast?.body_en || "");
    const [bodyAr, setBodyAr] = useState(podcast?.body_ar || "");
    const [coverImage, setCoverImage] = useState(podcast?.cover_image || "");
    const [audioUrl, setAudioUrl] = useState(podcast?.audio_url || "");
    const [videoUrl, setVideoUrl] = useState(podcast?.video_url || "");
    const [durationInput, setDurationInput] = useState(secondsToDuration(podcast?.duration));
    const [tags, setTags] = useState<string[]>(podcast?.tags || []);
    const [guestIds, setGuestIds] = useState<string[]>(podcast?.guest_ids || []);

    // Load guests
    useEffect(() => {
        async function loadGuests() {
            try {
                const result = await listGuests({ active: true });
                setGuests(result.documents);
            } catch (error) {
                console.error("Failed to load guests:", error);
            }
        }
        loadGuests();
    }, []);

    const handleTitleEnChange = (value: string) => {
        setTitleEn(value);
        if (!podcast && !slug) {
            setSlug(generateSlug(value));
        }
    };

    const handleTitleArChange = (value: string) => {
        setTitleAr(value);
        if (!podcast && !slug && !titleEn) {
            setSlug(generateSlug(value));
        }
    };

    const handleGenerateSlug = () => {
        const title = titleEn || titleAr;
        if (title) {
            setSlug(generateSlug(title));
        }
    };

    const handleImageSelect = (url: string, fileId: string) => {
        setCoverImage(fileId);
    };

    const toggleGuest = (guestId: string) => {
        setGuestIds(prev =>
            prev.includes(guestId)
                ? prev.filter(id => id !== guestId)
                : [...prev, guestId]
        );
    };

    const handleSave = async (publish: boolean) => {
        setError(null);

        if (!titleEn && !titleAr) {
            setError("Please enter a title in at least one language");
            return;
        }

        if (!authorEn && !authorAr) {
            setError("Please enter an author in at least one language");
            return;
        }

        try {
            const data: PodcastFormData = {
                title_en: titleEn,
                title_ar: titleAr,
                author_en: authorEn,
                author_ar: authorAr,
                slug: slug || generateSlug(titleEn || titleAr),
                excerpt_en: excerptEn || "",
                excerpt_ar: excerptAr || "",
                body_en: bodyEn,
                body_ar: bodyAr,
                cover_image: coverImage,
                audio_url: audioUrl || undefined,
                video_url: videoUrl || undefined,
                duration: durationInput ? durationToSeconds(durationInput) : undefined,
                tags,
                guest_ids: guestIds,
                is_published: publish,
                published_at: publish ? new Date().toISOString() : (podcast?.published_at || new Date().toISOString()),
            };

            await onSave(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save podcast");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link href="/cms/podcast">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Podcasts
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
                                    placeholder="podcast-url-slug"
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
                                            placeholder="Enter podcast title..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="author-en">Author (English)</Label>
                                        <Input
                                            id="author-en"
                                            value={authorEn}
                                            onChange={(e) => setAuthorEn(e.target.value)}
                                            placeholder="Enter author name..."
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
                                            placeholder="Start writing your podcast description..."
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
                                            placeholder="أدخل عنوان البودكاست..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="author-ar">المؤلف (عربي)</Label>
                                        <Input
                                            id="author-ar"
                                            value={authorAr}
                                            onChange={(e) => setAuthorAr(e.target.value)}
                                            placeholder="أدخل اسم المؤلف..."
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

                    {/* Media URLs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="audio-url">Audio URL</Label>
                                <Input
                                    id="audio-url"
                                    type="url"
                                    value={audioUrl}
                                    onChange={(e) => setAudioUrl(e.target.value)}
                                    placeholder="https://example.com/audio.mp3"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video-url">Video URL</Label>
                                <Input
                                    id="video-url"
                                    type="url"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    placeholder="https://example.com/video.mp4"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    value={durationInput}
                                    onChange={(e) => setDurationInput(e.target.value)}
                                    placeholder="MM:SS or HH:MM:SS"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Format: MM:SS or HH:MM:SS (e.g., 45:30 or 1:30:45)
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    {podcast && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${podcast.is_published
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}
                                >
                                    {podcast.is_published ? "Published" : "Draft"}
                                </div>
                                {podcast.published_at && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Published: {new Date(podcast.published_at).toLocaleDateString()}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Cover Image */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Cover Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {coverImage ? (
                                <div className="relative">
                                    <img
                                        src={getMediaUrl(coverImage)}
                                        alt="Cover"
                                        className="w-full aspect-square object-cover rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8"
                                        onClick={() => setCoverImage("")}
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

                    {/* Guests */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Guests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {guests.length > 0 ? (
                                    guests.map((guest) => (
                                        <label
                                            key={guest.$id}
                                            className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={guestIds.includes(guest.$id)}
                                                onChange={() => toggleGuest(guest.$id)}
                                                className="rounded"
                                            />
                                            <span className="text-sm">
                                                {guest.name_en || guest.name_ar}
                                            </span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        No guests available.{" "}
                                        <Link href="/cms/guests/new" className="text-primary hover:underline">
                                            Add a guest
                                        </Link>
                                    </p>
                                )}
                            </div>
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
