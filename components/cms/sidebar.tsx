"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Tags,
  Image,
  Type,
  ChevronLeft,
  ChevronRight,
  MicVocal,
  BookCopy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cms/posts", label: "Posts", icon: FileText },
  { href: "/cms/services", label: "Services", icon: Briefcase },
  { href: "/cms/tags", label: "Tags", icon: Tags },
  { href: "/cms/media", label: "Media", icon: Image },
  { href: "/cms/fonts", label: "Fonts", icon: Type },
  { href: "/cms/podcast", label: "Podcast", icon: MicVocal },
  { href: "/cms/courses", label: "Courses", icon: BookCopy },
];

export function CMSSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/cms") {
      return pathname === "/cms";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "sticky top-0 flex flex-col min-h-screen h-screen max-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4">
        {!collapsed && (
          <Link href="/cms" className="flex items-center gap-2">
            <img src="/logo-dama.svg" alt="Dama" className="h-8 w-auto invert" />
            <span className="font-bold text-lg">ADMIN CMS</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-primary hover:text-background hover:py-5 hover:rounded-none duration-100 ",
                    active
                      ? "bg-secondary text-foreground font-bold"
                      : "text-sidebar-foreground/70 hover:bg-foreground hover:text-background"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="text-sm text-sidebar-foreground hover:text-sidebar-primary transition-all"
          >
            ← Back to website
          </Link>
        </div>
      )}
    </aside>
  );
}

