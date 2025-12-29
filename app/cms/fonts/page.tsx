"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { CMSHeader } from "@/components/cms/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
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
import { Upload, Loader2, Type, Trash2, Copy, Check, Plus, Expand } from "lucide-react";
import { useAuth } from "@/lib/appwrite/auth-context";

// FontCard component for individual font display
function FontCard({
  font,
  onDelete,
  onCopyCSS,
  onExpand,
  isCopied,
  testString,
}: {
  font: CMSFont;
  onDelete: () => void;
  onCopyCSS: () => void;
  onExpand: () => void;
  isCopied: boolean;
  testString: string;
}) {
  return (
    <Card className="group relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium line-clamp-1">{font.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-3">
        <div
          style={{ fontFamily: `'${font.family}', sans-serif` }}
          className="flex flex-col min-h-50 items-center justify-center p-3 bg-muted/80 rounded-md border-2 border-dashed group-hover:border-primary transition-all space-y-5"
        >
          <p className="text-2xl leading-tight truncate">Aa Bb Cc</p>
          <p className="text-lg leading-tight truncate">أبجد هوز حطي كلمن</p>
          <p className="text-lg leading-tight truncate">1234567890</p>
          <p className="text-xs text-muted-foreground mt-2 truncate font-sans text-wrap">
            The quick brown fox
          </p>
          <p className="text-md text-muted-foreground mt-1 px-2 text-center break-all">
            {testString}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground line-clamp-1">
            {font.family} · {font.weight} · {font.style}
          </p>
          <div className="flex gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onExpand}
              title="Expand preview"
            >
              <Expand className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onCopyCSS}
              title="Copy CSS"
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={onDelete}
              title="Delete font"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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

  const [testString, setTestString] = useState("");

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

  // Generate all font-face rules for inline previews
  const allFontStyles = fonts.map((font) => generateCSS(font)).join("\n\n");

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

      {/* Inject all font-face styles for live previews */}
      {fonts.length > 0 && (
        <style dangerouslySetInnerHTML={{ __html: allFontStyles }} />
      )}

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

        {/* Fonts Grid */}
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground space-y-1.5">
              {fonts.length} font{fonts.length !== 1 ? "s" : ""} uploaded
              <Input
                className="mt-2 text-2xl"
                placeholder="Type here to test fonts..."
                value={testString} onChange={(e) => setTestString(e.target.value)} />
            </div>

          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : fonts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {fonts.map((font) => (
                  <FontCard
                    key={font.$id}
                    font={font}
                    onDelete={() => {
                      setDeleteId(font.$id);
                      setDeleteFileId(font.file_id);
                    }}
                    testString={testString}
                    onCopyCSS={() => handleCopyCSS(font)}
                    onExpand={() => setPreviewFont(font)}
                    isCopied={copiedId === font.$id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground col-span-full">
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

      {/* Expanded Font Preview Dialog */}
      <Dialog open={!!previewFont} onOpenChange={() => setPreviewFont(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Font Preview: {previewFont?.name}</DialogTitle>
          </DialogHeader>
          {previewFont && (
            <div className="space-y-4">
              <div
                style={{ fontFamily: `'${previewFont.family}', sans-serif` }}
                className="flex flex-col space-y-4 p-4 border rounded-lg"
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

