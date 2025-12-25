"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { PostEditorForm } from "@/components/cms/post-editor-form";
import { createPost, type PostFormData } from "@/lib/appwrite/cms-data";
import { useAuth } from "@/lib/appwrite/auth-context";

export default function NewPostPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useAuth();

  const handleSave = async (data: PostFormData) => {
    setIsSaving(true);
    try {
      const post = await createPost(data, user!.$id);
      router.push(`/cms/posts/${post.id}`);
    } catch (error) {
      console.error("Failed to create post:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="New Post" />
      <div className="flex-1 p-6">
        <PostEditorForm onSave={handleSave} isSaving={isSaving} />
      </div>
    </div>
  );
}

