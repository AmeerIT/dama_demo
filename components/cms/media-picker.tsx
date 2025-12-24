"use client";

import { useEffect, useState, useCallback } from "react";
import { listMedia, uploadMedia, getMediaUrl, type MediaFile } from "@/lib/appwrite/cms-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Image as ImageIcon, Check, X } from "lucide-react";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string, fileId: string) => void;
}

export function MediaPicker({ open, onOpenChange, onSelect }: MediaPickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const mediaFiles = await listMedia();
      setFiles(mediaFiles);
    } catch (error) {
      console.error("Failed to load media:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      loadMedia();
      setSelectedFile(null);
    }
  }, [open, loadMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploaded = await uploadMedia(file);
      await loadMedia();
      setSelectedFile(uploaded.$id);
    } catch (error) {
      console.error("Failed to upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      const url = getMediaUrl(selectedFile);
      onSelect(url, selectedFile);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>

        {/* Upload Section */}
        <div className="flex items-center gap-4 p-4 border border-dashed border-border rounded-lg">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
            id="media-upload"
          />
          <Label
            htmlFor="media-upload"
            className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload new image
              </>
            )}
          </Label>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {files.map((file) => (
                <button
                  key={file.$id}
                  type="button"
                  onClick={() => setSelectedFile(file.$id)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedFile === file.$id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={getMediaUrl(file.$id)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedFile === file.$id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No images uploaded yet</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!selectedFile}>
            Select Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

