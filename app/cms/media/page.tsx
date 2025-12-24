"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
import { listMedia, uploadMedia, deleteMedia, getMediaUrl, type MediaFile } from "@/lib/appwrite/cms-data";
import {
    Upload,
    Loader2,
    Image as ImageIcon,
    Trash2,
    Copy,
    Check,
    Search,
    Grid,
    List,
    Calendar,
    FileType,
} from "lucide-react";

export default function MediaLibraryPage() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadMedia = useCallback(async () => {
        setIsLoading(true);
        try {
            const mediaFiles = await listMedia();
            setFiles(mediaFiles);
            setFilteredFiles(mediaFiles);
        } catch (error) {
            console.error("Failed to load media:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredFiles(
                files.filter((file) =>
                    file.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredFiles(files);
        }
    }, [searchQuery, files]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;

        setIsUploading(true);
        try {
            for (const file of selectedFiles) {
                await uploadMedia(file);
            }
            await loadMedia();
        } catch (error) {
            console.error("Failed to upload:", error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            await deleteMedia(deleteId);
            if (selectedFile?.$id === deleteId) {
                setSelectedFile(null);
            }
            await loadMedia();
        } catch (error) {
            console.error("Failed to delete:", error);
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const handleCopyUrl = async (fileId: string) => {
        const url = getMediaUrl(fileId);
        await navigator.clipboard.writeText(url);
        setCopiedId(fileId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <CMSHeader title="Media Library" />

            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Actions Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                            <div className="flex flex-1 gap-3">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search files..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                                <div className="flex items-center gap-1 border rounded-md p-1">
                                    <Button
                                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "secondary" : "ghost"}
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleUpload}
                                    disabled={isUploading}
                                    className="hidden"
                                    ref={fileInputRef}
                                    id="media-upload"
                                />
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload Files
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Files Grid/List */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="text-sm text-muted-foreground">
                                    {filteredFiles.length} file{filteredFiles.length !== 1 ? "s" : ""}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    </div>
                                ) : filteredFiles.length > 0 ? (
                                    viewMode === "grid" ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                            {filteredFiles.map((file) => (
                                                <button
                                                    key={file.$id}
                                                    type="button"
                                                    onClick={() => setSelectedFile(file)}
                                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedFile?.$id === file.$id
                                                            ? "border-primary ring-2 ring-primary/20"
                                                            : "border-transparent hover:border-border"
                                                        }`}
                                                >
                                                    <img
                                                        src={getMediaUrl(file.$id)}
                                                        alt={file.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-border">
                                            {filteredFiles.map((file) => (
                                                <div
                                                    key={file.$id}
                                                    className={`flex items-center gap-4 py-3 px-2 cursor-pointer rounded transition-colors ${selectedFile?.$id === file.$id
                                                            ? "bg-primary/10"
                                                            : "hover:bg-muted"
                                                        }`}
                                                    onClick={() => setSelectedFile(file)}
                                                >
                                                    <img
                                                        src={getMediaUrl(file.$id)}
                                                        alt={file.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium truncate">{file.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {file.mimeType} • {formatFileSize(file.sizeOriginal)}
                                                        </p>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {new Date(file.$createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>No files found</p>
                                        <Button
                                            variant="link"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="mt-2"
                                        >
                                            Upload your first image
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - File Details */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">File Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedFile ? (
                                    <div className="space-y-4">
                                        <img
                                            src={getMediaUrl(selectedFile.$id)}
                                            alt={selectedFile.name}
                                            className="w-full aspect-video object-cover rounded-lg"
                                        />
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Name</p>
                                                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <FileType className="h-3 w-3" /> Type
                                                    </p>
                                                    <p className="text-sm">{selectedFile.mimeType}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Size</p>
                                                    <p className="text-sm">{formatFileSize(selectedFile.sizeOriginal)}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> Uploaded
                                                </p>
                                                <p className="text-sm">
                                                    {new Date(selectedFile.$createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => handleCopyUrl(selectedFile.$id)}
                                            >
                                                {copiedId === selectedFile.$id ? (
                                                    <>
                                                        <Check className="mr-2 h-4 w-4" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="mr-2 h-4 w-4" />
                                                        Copy URL
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => setDeleteId(selectedFile.$id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Select a file to view details</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete File</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this file? This action cannot be undone.
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

