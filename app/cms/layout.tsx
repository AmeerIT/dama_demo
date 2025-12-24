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
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CMSLayoutContent>{children}</CMSLayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}

