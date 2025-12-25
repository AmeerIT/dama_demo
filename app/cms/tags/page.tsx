"use client";

import { useEffect, useState, useCallback } from "react";
import { CMSHeader } from "@/components/cms/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { listTags, createTag, updateTag, deleteTag, type CMSTag } from "@/lib/appwrite/cms-data";
import { Plus, Loader2, Tags, Edit, Trash2, Check, X } from "lucide-react";
import { useAuth } from "@/lib/appwrite/auth-context";

export default function TagsManagementPage() {
    const [tags, setTags] = useState<CMSTag[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // New tag form
    const [showNewForm, setShowNewForm] = useState(false);
    const [newNameEn, setNewNameEn] = useState("");
    const [newNameAr, setNewNameAr] = useState("");
    const [newSlug, setNewSlug] = useState("");

    // Editing state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editNameEn, setEditNameEn] = useState("");
    const [editNameAr, setEditNameAr] = useState("");
    const [editSlug, setEditSlug] = useState("");

    const { user } = useAuth();

    const loadTags = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await listTags();
            setTags(result.documents);
        } catch (error) {
            console.error("Failed to load tags:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTags();
    }, [loadTags]);

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim();
    };

    const handleNewNameEnChange = (value: string) => {
        setNewNameEn(value);
        setNewSlug(generateSlug(value));
    };

    const handleCreateTag = async () => {
        if (!newNameEn || !newSlug) return;

        setIsSaving(true);
        try {
            await createTag({
                name_en: newNameEn,
                name_ar: newNameAr || newNameEn,
                slug: newSlug,
            }, user!.$id);

            setNewNameEn("");
            setNewNameAr("");
            setNewSlug("");
            setShowNewForm(false);
            await loadTags();
        } catch (error) {
            console.error("Failed to create tag:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const startEditing = (tag: CMSTag) => {
        setEditingId(tag.$id);
        setEditNameEn(tag.name_en);
        setEditNameAr(tag.name_ar);
        setEditSlug(tag.slug);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditNameEn("");
        setEditNameAr("");
        setEditSlug("");
    };

    const handleUpdateTag = async () => {
        if (!editingId || !editNameEn || !editSlug) return;

        setIsSaving(true);
        try {
            await updateTag(editingId, {
                name_en: editNameEn,
                name_ar: editNameAr || editNameEn,
                slug: editSlug,
            });
            cancelEditing();
            await loadTags();
        } catch (error) {
            console.error("Failed to update tag:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            await deleteTag(deleteId);
            await loadTags();
        } catch (error) {
            console.error("Failed to delete tag:", error);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <CMSHeader title="Tags" />

            <div className="flex-1 p-6 space-y-6">
                {/* Actions Bar */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Manage content tags for blog posts
                    </p>
                    <Button onClick={() => setShowNewForm(true)} disabled={showNewForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Tag
                    </Button>
                </div>

                {/* New Tag Form */}
                {showNewForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Create New Tag</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <Input
                                        placeholder="Name (English)"
                                        value={newNameEn}
                                        onChange={(e) => handleNewNameEnChange(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Input
                                        placeholder="الاسم (عربي)"
                                        value={newNameAr}
                                        onChange={(e) => setNewNameAr(e.target.value)}
                                        dir="rtl"
                                    />
                                </div>
                                <div>
                                    <Input
                                        placeholder="Slug"
                                        value={newSlug}
                                        onChange={(e) => setNewSlug(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={handleCreateTag} disabled={isSaving || !newNameEn}>
                                        {isSaving ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowNewForm(false)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tags List */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="text-sm text-muted-foreground">
                            {tags.length} tag{tags.length !== 1 ? "s" : ""}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : tags.length > 0 ? (
                            <div className="divide-y divide-border">
                                {tags.map((tag) => (
                                    <div key={tag.$id} className="py-4">
                                        {editingId === tag.$id ? (
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div>
                                                    <Input
                                                        placeholder="Name (English)"
                                                        value={editNameEn}
                                                        onChange={(e) => setEditNameEn(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        placeholder="الاسم (عربي)"
                                                        value={editNameAr}
                                                        onChange={(e) => setEditNameAr(e.target.value)}
                                                        dir="rtl"
                                                    />
                                                </div>
                                                <div>
                                                    <Input
                                                        placeholder="Slug"
                                                        value={editSlug}
                                                        onChange={(e) => setEditSlug(e.target.value)}
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button onClick={handleUpdateTag} disabled={isSaving || !editNameEn}>
                                                        {isSaving ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Check className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Button variant="outline" onClick={cancelEditing}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <span className="font-medium">{tag.name_en}</span>
                                                        <span className="text-muted-foreground mx-2">•</span>
                                                        <span className="text-muted-foreground">{tag.name_ar}</span>
                                                    </div>
                                                    <span className="text-xs bg-muted px-2 py-1 rounded">
                                                        {tag.slug}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => startEditing(tag)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setDeleteId(tag.$id)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Tags className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No tags yet</p>
                                <Button
                                    variant="link"
                                    onClick={() => setShowNewForm(true)}
                                    className="mt-2"
                                >
                                    Create your first tag
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
                        <AlertDialogTitle>Delete Tag</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this tag? Posts using this tag will no longer be associated with it.
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

