"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LexKitEditor } from "@/components/cms/lexkit-editor";
import { MediaPicker } from "@/components/cms/media-picker";
import { type Service, type ServiceFormData, getMediaUrl } from "@/lib/appwrite/cms-data";
import {
  Loader2,
  Save,
  Image as ImageIcon,
  X,
  ArrowLeft,
  Stethoscope,
  GraduationCap,
  Megaphone,
  Mic2,
  BookOpen,
  Briefcase,
} from "lucide-react";

interface ServiceEditorFormProps {
  service?: Service;
  onSave: (data: ServiceFormData) => Promise<void>;
  isSaving: boolean;
}

const iconOptions = [
  { value: "stethoscope", label: "Stethoscope (Medical)", icon: Stethoscope },
  { value: "graduation", label: "Graduation (Courses)", icon: GraduationCap },
  { value: "megaphone", label: "Megaphone (Marketing)", icon: Megaphone },
  { value: "microphone", label: "Microphone (Podcast)", icon: Mic2 },
  { value: "book", label: "Book (Blog)", icon: BookOpen },
  { value: "briefcase", label: "Briefcase (Business)", icon: Briefcase },
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function ServiceEditorForm({ service, onSave, isSaving }: ServiceEditorFormProps) {
  const [activeTab, setActiveTab] = useState<"en" | "ar">("en");
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [titleEn, setTitleEn] = useState(service?.title_en || "");
  const [titleAr, setTitleAr] = useState(service?.title_ar || "");
  const [slugEn, setSlugEn] = useState(service?.slug_en || "");
  const [slugAr, setSlugAr] = useState(service?.slug_ar || "");
  const [descriptionEn, setDescriptionEn] = useState(service?.description_en || "");
  const [descriptionAr, setDescriptionAr] = useState(service?.description_ar || "");
  const [contentEn, setContentEn] = useState(service?.content_en || "");
  const [contentAr, setContentAr] = useState(service?.content_ar || "");
  const [icon, setIcon] = useState(service?.icon || "briefcase");
  const [image, setImage] = useState(service?.image || "");
  const [isActive, setIsActive] = useState(service?.is_active ?? true);

  const handleTitleEnChange = (value: string) => {
    setTitleEn(value);
    if (!service) {
      setSlugEn(generateSlug(value));
    }
  };

  const handleTitleArChange = (value: string) => {
    setTitleAr(value);
    if (!service) {
      setSlugAr(generateSlug(value));
    }
  };

  const handleImageSelect = (url: string, fileId: string) => {
    setImage(fileId);
  };

  const handleSave = async () => {
    setError(null);

    if (!titleEn && !titleAr) {
      setError("Please enter a title in at least one language");
      return;
    }

    if (!descriptionEn && !descriptionAr) {
      setError("Please enter a description in at least one language");
      return;
    }

    try {
      const data: ServiceFormData = {
        title_en: titleEn,
        title_ar: titleAr,
        slug_en: slugEn || generateSlug(titleEn),
        slug_ar: slugAr || generateSlug(titleAr),
        description_en: descriptionEn,
        description_ar: descriptionAr,
        content_en: contentEn || "",
        content_ar: contentAr || "",
        icon,
        image: image || "",
        is_active: isActive,
        order: service?.order || 0,
      };

      await onSave(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save service");
    }
  };

  const SelectedIcon = iconOptions.find((o) => o.value === icon)?.icon || Briefcase;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/cms/services">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Service
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant={activeTab === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("en")}
                >
                  English
                </Button>
                <Button
                  type="button"
                  variant={activeTab === "ar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab("ar")}
                >
                  العربية
                </Button>
              </div>

              {/* English Content */}
              <div className={activeTab === "en" ? "block" : "hidden"}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title-en">Title (English)</Label>
                    <Input
                      id="title-en"
                      value={titleEn}
                      onChange={(e) => handleTitleEnChange(e.target.value)}
                      placeholder="Enter service title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug-en">Slug (English)</Label>
                    <Input
                      id="slug-en"
                      value={slugEn}
                      onChange={(e) => setSlugEn(e.target.value)}
                      placeholder="service-url-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description-en">Short Description (English)</Label>
                    <Textarea
                      id="description-en"
                      value={descriptionEn}
                      onChange={(e) => setDescriptionEn(e.target.value)}
                      placeholder="Brief description..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Full Content (English)</Label>
                    <LexKitEditor
                      initialContent={contentEn}
                      onChange={setContentEn}
                      onInsertImage={() => setMediaPickerOpen(true)}
                      placeholder="Full service description..."
                    />
                  </div>
                </div>
              </div>

              {/* Arabic Content */}
              <div className={activeTab === "ar" ? "block" : "hidden"} dir="rtl">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title-ar">العنوان (عربي)</Label>
                    <Input
                      id="title-ar"
                      value={titleAr}
                      onChange={(e) => handleTitleArChange(e.target.value)}
                      placeholder="أدخل عنوان الخدمة..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug-ar">الرابط (عربي)</Label>
                    <Input
                      id="slug-ar"
                      value={slugAr}
                      onChange={(e) => setSlugAr(e.target.value)}
                      placeholder="رابط-الخدمة"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description-ar">الوصف المختصر (عربي)</Label>
                    <Textarea
                      id="description-ar"
                      value={descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                      placeholder="وصف مختصر..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>المحتوى الكامل (عربي)</Label>
                    <LexKitEditor
                      initialContent={contentAr}
                      onChange={setContentAr}
                      onInsertImage={() => setMediaPickerOpen(true)}
                      placeholder="وصف الخدمة الكامل..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active</span>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Icon */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Icon</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <SelectedIcon className="h-4 w-4" />
                      <span>{iconOptions.find((o) => o.value === icon)?.label}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Service Image</CardTitle>
            </CardHeader>
            <CardContent>
              {image ? (
                <div className="relative">
                  <img
                    src={getMediaUrl(image)}
                    alt="Service"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-32 flex flex-col gap-2"
                  onClick={() => setMediaPickerOpen(true)}
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm">Select Image</span>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Picker Dialog */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={handleImageSelect}
      />
    </div>
  );
}

