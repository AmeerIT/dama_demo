"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { getPodcast, updatePodcast } from "@/lib/appwrite/cms-data";
import { Loader2 } from "lucide-react";
import { CMSPodcast, PodcastFormData } from "@/lib/appwrite/types";
import { PodcastEditorForm } from "../podcast-editor-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EditPodcastPage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [podcast, setPodcast] = useState<CMSPodcast | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function loadPodcast() {
            try {
                const podcastData = await getPodcast(id);
                setPodcast(podcastData);
            } catch (error) {
                console.error("Failed to load podcast:", error);
                router.push("/cms/podcast");
            } finally {
                setIsLoading(false);
            }
        }
        loadPodcast();
    }, [id, router]);

    const handleSave = async (data: PodcastFormData) => {
        setIsSaving(true);
        try {
            await updatePodcast(id, data);
            // Refresh podcast data
            const updated = await getPodcast(id);
            setPodcast(updated);
        } catch (error) {
            console.error("Failed to update podcast:", error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <CMSHeader title="Edit Podcast" />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    if (!podcast) {
        return (
            <div className="flex flex-col min-h-screen">
                <CMSHeader title="Podcast Not Found" />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Podcast not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <CMSHeader title="Edit Podcast" />
            <div className="flex-1 p-6">
                <PodcastEditorForm podcast={podcast} onSave={handleSave} isSaving={isSaving} />
            </div>
        </div>
    );
}
