"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { createPodcast, } from "@/lib/appwrite/cms-data";
import { useAuth } from "@/lib/appwrite/auth-context";
import { PodcastFormData } from "@/lib/appwrite/types";
import { PodcastEditorForm } from "../podcast-editor-form";

export default function NewPodcastPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const { user } = useAuth();

    const handleSave = async (data: PodcastFormData) => {
        setIsSaving(true);
        try {
            const podcast = await createPodcast(data, user!.$id);
            router.push(`/cms/podcast/${podcast.$id}`);
        } catch (error) {
            console.error("Failed to create podcast:", error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <CMSHeader title="New Podcast" />
            <div className="flex-1 p-6">
                <PodcastEditorForm onSave={handleSave} isSaving={isSaving} />
            </div>
        </div>
    );
}
