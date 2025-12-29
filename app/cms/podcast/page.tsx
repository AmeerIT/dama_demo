
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Plus,
    Search,
    Loader2,
    MicVocal,
    Edit,
    Trash2,
    Clock,
    Eye,
    Headphones,
    Video,
    Users,
} from "lucide-react";
import { CMSPodcast } from "@/lib/appwrite/types";
import { deletePodcast, listPodcasts } from "@/lib/appwrite/cms-data";

// Helper to format duration from seconds to HH:MM:SS or MM:SS
const formatDuration = (seconds?: number) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default function PodcastsListPage() {
    const router = useRouter();
    const [podcasts, setPodcasts] = useState<CMSPodcast[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadPodcasts = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await listPodcasts({
                status: statusFilter === "all" ? undefined : statusFilter,
                search: searchQuery || undefined,
            });
            setPodcasts(result.documents);
            setTotal(result.total);
        } catch (error) {
            console.error("Failed to load podcasts:", error);
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter, searchQuery]);

    useEffect(() => {
        loadPodcasts();
    }, [loadPodcasts]);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            await deletePodcast(deleteId);
            await loadPodcasts();
        } catch (error) {
            console.error("Failed to delete podcast:", error);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <CMSHeader title="Podcasts" />

            <div className="flex-1 p-6 space-y-6">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex flex-1 gap-3">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search podcasts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button asChild>
                        <Link href="/cms/podcast/new">
                            <Plus className="mr-2 h-4 w-4" />
                            New Podcast
                        </Link>
                    </Button>
                </div>

                {/* Podcasts Table */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="text-sm text-muted-foreground">
                            {total} podcast{total !== 1 ? "s" : ""} found
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : podcasts.length > 0 ? (
                            <div className="divide-y divide-border">
                                {podcasts.map((podcast) => (
                                    <div
                                        key={podcast.$id}
                                        className="flex items-center justify-between py-4 gap-4"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium truncate">
                                                        {podcast.title_en || podcast.title_ar || "Untitled"}
                                                    </h3>
                                                    {podcast.title_ar && podcast.title_en && (
                                                        <p className="text-sm text-muted-foreground truncate mt-0.5">
                                                            {podcast.title_ar}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                        <span>by {podcast.author_en || podcast.author_ar}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                        <span
                                                            className={`text-xs px-2 py-0.5 rounded-full ${podcast.is_published
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                }`}
                                                        >
                                                            {podcast.is_published ? "Published" : "Draft"}
                                                        </span>
                                                        {podcast.duration && (
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {formatDuration(podcast.duration)}
                                                            </span>
                                                        )}
                                                        {podcast.audio_url && (
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Headphones className="h-3 w-3" />
                                                                Audio
                                                            </span>
                                                        )}
                                                        {podcast.video_url && (
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Video className="h-3 w-3" />
                                                                Video
                                                            </span>
                                                        )}
                                                        {podcast.guest_ids && podcast.guest_ids.length > 0 && (
                                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Users className="h-3 w-3" />
                                                                {podcast.guest_ids.length} guest{podcast.guest_ids.length !== 1 ? 's' : ''}
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(podcast.$createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            {podcast.is_published && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    title="View podcast"
                                                >
                                                    <a
                                                        href={`/en/podcast/${podcast.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => router.push(`/cms/podcast/${podcast.$id}`)}
                                                title="Edit podcast"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setDeleteId(podcast.$id)}
                                                title="Delete podcast"
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <MicVocal className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No podcasts found</p>
                                <Button variant="link" asChild className="mt-2">
                                    <Link href="/cms/podcast/new">Create your first podcast</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Podcast</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this podcast? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
