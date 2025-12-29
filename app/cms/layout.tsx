"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/appwrite/auth-context";
import { CMSSidebar } from "@/components/cms/sidebar";
import { Loader2 } from "lucide-react";

function CMSLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  const isLoginPage = pathname === "/cms/login";

  useEffect(() => {
    if (!isLoading) {
      if (!user && !isLoginPage) {
        router.push("/cms/login");
      } else if (user && isLoginPage) {
        router.push("/cms");
      }
    }
  }, [user, isLoading, isLoginPage, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page - no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Not authenticated - will redirect
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Authenticated - show CMS layout
  return (
    <div className="flex max-h-screen bg-background overflow-y-scroll">
      <CMSSidebar />
      <main className="flex-1 ">
        {children}
      </main>
    </div>
  );
}

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body >
        <AuthProvider>
          <CMSLayoutContent>{children}</CMSLayoutContent>
        </AuthProvider>
      </body>
    </html>

  );
}

