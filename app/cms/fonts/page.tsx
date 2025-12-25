"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { CMSHeader } from "@/components/cms/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { listFonts, createFont, deleteFont, uploadFont, getFontUrl, type CMSFont } from "@/lib/appwrite/cms-data";
import { Upload, Loader2, Type, Trash2, Copy, Check, Plus, Eye } from "lucide-react";
import { useAuth } from "@/lib/appwrite/auth-context";
import { Font } from "@/lib/appwrite";

export default function FontsManagementPage() {
  const [fonts, setFonts] = useState<CMSFont[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewFont, setPreviewFont] = useState<CMSFont | null>(null);

  // Upload form state
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [fontName, setFontName] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontStyle, setFontStyle] = useState("normal");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const loadFonts = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await listFonts();
      setFonts(result.documents);
    } catch (error) {
      console.error("Failed to load fonts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      // Auto-fill font name from file name
      const name = file.name.replace(/\.(ttf|otf|woff|woff2)$/i, "");
      setFontName(name);
      setFontFamily(name.replace(/[^a-zA-Z0-9]/g, ""));
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !fontName || !fontFamily) return;

    setIsUploading(true);
    try {
      // Upload font file
      const uploaded = await uploadFont(uploadFile, user!.$id);

      // Create font record
      await createFont({
        name: fontName,
        file_id: uploaded.$id,
        family: fontFamily,
        weight: fontWeight,
        style: fontStyle,
      }, user!.$id);

      // Reset form
      setUploadFile(null);
      setFontName("");
      setFontFamily("");
      setFontWeight("400");
      setFontStyle("normal");
      setShowUploadForm(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await loadFonts();
    } catch (error) {
      console.error("Failed to upload font:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId || !deleteFileId) return;

    setIsDeleting(true);
    try {
      await deleteFont(deleteId, deleteFileId);
      await loadFonts();
    } catch (error) {
      console.error("Failed to delete font:", error);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
      setDeleteFileId(null);
    }
  };

  const generateCSS = (font: CMSFont): string => {
    const url = getFontUrl(font.file_id);
    return `@font-face {
  font-family: '${font.family}';
  src: url('${url}') format('woff2');
  font-weight: ${font.weight};
  font-style: ${font.style};
  font-display: swap;
}`;
  };

  const handleCopyCSS = async (font: CMSFont) => {
    const css = generateCSS(font);
    await navigator.clipboard.writeText(css);
    setCopiedId(font.$id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const weightOptions = [
    { value: "100", label: "100 - Thin" },
    { value: "200", label: "200 - Extra Light" },
    { value: "300", label: "300 - Light" },
    { value: "400", label: "400 - Regular" },
    { value: "500", label: "500 - Medium" },
    { value: "600", label: "600 - Semi Bold" },
    { value: "700", label: "700 - Bold" },
    { value: "800", label: "800 - Extra Bold" },
    { value: "900", label: "900 - Black" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="Fonts" />

      <div className="flex-1 p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Manage custom fonts for blog posts
          </p>
          <Button onClick={() => setShowUploadForm(true)} disabled={showUploadForm}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Font
          </Button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Upload New Font</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4 bg-accent/50 rounded-md p-4">
                <div className="space-y-2">
                  <Label>Font File (.ttf, .woff, .woff2, .otf)</Label>
                  <Input
                    type="file"
                    accept=".ttf,.otf,.woff,.woff2"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                  />
                </div>
                <div className="space-y-2 ">
                  <Label>Font Name</Label>
                  <Input
                    placeholder="e.g., Cairo Bold"
                    value={fontName}
                    onChange={(e) => setFontName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Font Family (CSS)</Label>
                  <Input
                    placeholder="e.g., Cairo"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <Select value={fontWeight} onValueChange={setFontWeight}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weightOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Select value={fontStyle} onValueChange={setFontStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="italic">Italic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading || !uploadFile || !fontName || !fontFamily}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fonts List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">
              {fonts.length} font{fonts.length !== 1 ? "s" : ""} uploaded
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : fonts.length > 0 ? (
              <div className="divide-y divide-border">
                {fonts.map((font) => (
                  <div
                    key={font.$id}
                    className="flex items-center justify-between py-4 gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{font.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>Family: {font.family}</span>
                        <span>Weight: {font.weight}</span>
                        <span>Style: {font.style}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewFont(font)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyCSS(font)}
                      >
                        {copiedId === font.$id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy CSS
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeleteId(font.$id);
                          setDeleteFileId(font.file_id);
                        }}
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
                <Type className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No fonts uploaded yet</p>
                <Button
                  variant="link"
                  onClick={() => setShowUploadForm(true)}
                  className="mt-2"
                >
                  Upload your first font
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
            <AlertDialogTitle>Delete Font</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this font? Content using this font may not display correctly.
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

      {/* Font Preview Dialog */}
      <Dialog open={!!previewFont} onOpenChange={() => setPreviewFont(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Font Preview: {previewFont?.name}</DialogTitle>
          </DialogHeader>
          {previewFont && (
            <div className="space-y-4">
              <style
                dangerouslySetInnerHTML={{
                  __html: generateCSS(previewFont),
                }}
              />
              <div
                style={{ fontFamily: `'${previewFont.family}', sans-serif` }}
                className="space-y-4 p-4 border rounded-lg"
              >
                <p className="text-4xl">
                  The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-2xl">
                  الحروف العربية: أبجد هوز حطي كلمن
                </p>
                <p className="text-lg">
                  1234567890 !@#$%^&*()
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-xs font-mono mb-2">CSS:</p>
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                  {generateCSS(previewFont)}
                </pre>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setPreviewFont(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

