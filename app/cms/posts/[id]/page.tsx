"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { PostEditorForm } from "@/components/cms/post-editor-form";
import { getPost, updatePost, type Post, type PostFormData } from "@/lib/appwrite/cms-data";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error("Failed to load post:", error);
        router.push("/cms/posts");
      } finally {
        setIsLoading(false);
      }
    }
    loadPost();
  }, [id, router]);

  const handleSave = async (data: PostFormData) => {
    setIsSaving(true);
    try {
      await updatePost(id, data);
      // Refresh post data
      const updated = await getPost(id);
      setPost(updated);
    } catch (error) {
      console.error("Failed to update post:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <CMSHeader title="Edit Post" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <CMSHeader title="Post Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="Edit Post" />
      <div className="flex-1 p-6">
        <PostEditorForm post={post} onSave={handleSave} isSaving={isSaving} />
      </div>
    </div>
  );
}

