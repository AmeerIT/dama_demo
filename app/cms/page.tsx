"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CMSHeader } from "@/components/cms/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboardStats, listPosts, type DashboardStats, type CMSPost } from "@/lib/appwrite/cms-data";
import {
  FileText,
  Briefcase,
  Tags,
  Image,
  Plus,
  ArrowRight,
  Loader2,
  Clock,
} from "lucide-react";

export default function CMSDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<CMSPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, postsData] = await Promise.all([
          getDashboardStats(),
          listPosts({ limit: 5 }),
        ]);
        setStats(statsData);
        setRecentPosts(postsData.documents);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const statCards = [
    {
      title: "Total Posts",
      value: stats?.totalPosts || 0,
      description: `${stats?.publishedPosts || 0} published, ${stats?.draftPosts || 0} drafts`,
      icon: FileText,
      href: "/cms/posts",
      color: "text-primary",
    },
    {
      title: "Services",
      value: stats?.totalServices || 0,
      description: "Active services",
      icon: Briefcase,
      href: "/cms/services",
      color: "text-green-500",
    },
    {
      title: "Tags",
      value: stats?.totalTags || 0,
      description: "Content tags",
      icon: Tags,
      href: "/cms/tags",
      color: "text-purple-500",
    },
    {
      title: "Media Files",
      value: stats?.totalMedia || 0,
      description: "Uploaded images",
      icon: Image,
      href: "/cms/media",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <CMSHeader title="Dashboard" />

      <div className="flex-1 p-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/cms/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cms/services/new">
              <Plus className="mr-2 h-4 w-4" />
              New Service
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.title} href={stat.href}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Latest blog posts</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cms/posts">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : recentPosts.length > 0 ? (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <Link
                    key={post.$id}
                    href={`/cms/posts/${post.$id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.title_en || post.title_ar}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${post.is_published
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                        >
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(post.$createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No posts yet</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/cms/posts/new">Create your first post</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

