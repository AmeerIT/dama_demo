"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { ServiceEditorForm } from "@/components/cms/service-editor-form";
import { createService, listServices, type ServiceFormData } from "@/lib/appwrite/cms-data";
import { useAuth } from "@/lib/appwrite/auth-context";

export default function NewServicePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const handleSave = async (data: ServiceFormData) => {
    setIsSaving(true);
    try {
      // Get current services count for order
      const existing = await listServices();
      const order = existing.total;

      const service = await createService({ ...data, order }, user!.$id);
      router.push(`/cms/services/${service.$id}`);
    } catch (error) {
      console.error("Failed to create service:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="New Service" />
      <div className="flex-1 p-6">
        <ServiceEditorForm onSave={handleSave} isSaving={isSaving} />
      </div>
    </div>
  );
}

