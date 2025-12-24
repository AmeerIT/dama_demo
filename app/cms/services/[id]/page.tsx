"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { ServiceEditorForm } from "@/components/cms/service-editor-form";
import { getService, updateService, type Service, type ServiceFormData } from "@/lib/appwrite/cms-data";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const serviceData = await getService(id);
        setService(serviceData);
      } catch (error) {
        console.error("Failed to load service:", error);
        router.push("/cms/services");
      } finally {
        setIsLoading(false);
      }
    }
    loadService();
  }, [id, router]);

  const handleSave = async (data: ServiceFormData) => {
    setIsSaving(true);
    try {
      await updateService(id, data);
      const updated = await getService(id);
      setService(updated);
    } catch (error) {
      console.error("Failed to update service:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <CMSHeader title="Edit Service" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen">
        <CMSHeader title="Service Not Found" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Service not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="Edit Service" />
      <div className="flex-1 p-6">
        <ServiceEditorForm service={service} onSave={handleSave} isSaving={isSaving} />
      </div>
    </div>
  );
}

