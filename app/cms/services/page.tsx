"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CMSHeader } from "@/components/cms/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { listServices, deleteService, updateService, type CMSService } from "@/lib/appwrite/cms-data";
import {
  Plus,
  Loader2,
  Briefcase,
  Edit,
  Trash2,
  GripVertical,
  Eye,
} from "lucide-react";

export default function ServicesListPage() {
  const router = useRouter();
  const [services, setServices] = useState<CMSService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await listServices();
      setServices(result.documents);
    } catch (error) {
      console.error("Failed to load services:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deleteService(deleteId);
      await loadServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleToggleActive = async (service: CMSService) => {
    try {
      await updateService(service.$id, { is_active: !service.is_active });
      await loadServices();
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newServices = [...services];
    const [movedService] = newServices.splice(fromIndex, 1);
    newServices.splice(toIndex, 0, movedService);

    // Update order for all affected services
    setServices(newServices);

    try {
      await Promise.all(
        newServices.map((service, index) =>
          updateService(service.$id, { order: index })
        )
      );
    } catch (error) {
      console.error("Failed to reorder services:", error);
      await loadServices(); // Reload on error
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="Services" />

      <div className="flex-1 p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Manage your services. Drag to reorder.
          </p>
          <Button asChild>
            <Link href="/cms/services/new">
              <Plus className="mr-2 h-4 w-4" />
              New Service
            </Link>
          </Button>
        </div>

        {/* Services List */}
        <Card>
          <CardHeader className="pb-3">
            <div className="text-sm text-muted-foreground">
              {services.length} service{services.length !== 1 ? "s" : ""}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : services.length > 0 ? (
              <div className="divide-y divide-border">
                {services.map((service, index) => (
                  <div
                    key={service.$id}
                    className="flex items-center justify-between py-4 gap-4"
                  >
                    {/* Drag Handle */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="cursor-grab text-muted-foreground hover:text-foreground"
                        title="Drag to reorder"
                      >
                        <GripVertical className="h-5 w-5" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-6">
                            #{index + 1}
                          </span>
                          <div>
                            <h3 className="font-medium">
                              {service.title_en || service.title_ar || "Untitled"}
                            </h3>
                            {service.title_ar && service.title_en && (
                              <p className="text-sm text-muted-foreground">
                                {service.title_ar}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Active Toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {service.is_active ? "Active" : "Inactive"}
                        </span>
                        <input
                          type="checkbox"
                          checked={service.is_active}
                          onChange={() => handleToggleActive(service)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {service.is_active && (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="View service"
                          >
                            <a
                              href={`/en/services/${service.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/cms/services/${service.$id}`)}
                          title="Edit service"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(service.$id)}
                          title="Delete service"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No services yet</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/cms/services/new">Create your first service</Link>
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
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
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

