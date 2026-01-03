"use client";

import { cn } from "@/lib/utils";

interface GlowingBlobsProps {
  className?: string;
  variant?: "hero" | "subtle";
}

export function GlowingBlobs({ className, variant = "hero" }: GlowingBlobsProps) {
  const isHero = variant === "hero";

  return (
    <>
      {/* Top-left blob */}
      <div
        className={cn(
          "absolute -left-20 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-30 animate-pulse",
          isHero ? "top-1/4 blur-[120px] md:blur-[160px] bg-primary/70" : "top-0 blur-[100px] bg-primary/50",
          className
        )}
      />

      {/* Bottom-right blob */}
      <div
        className={cn(
          "absolute -right-20 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-30 animate-pulse",
          isHero ? "bottom-1/4 blur-[120px] md:blur-[160px] bg-secondary/70" : "bottom-0 blur-[100px] bg-secondary/50",
          className
        )}
        style={{ animationDelay: "700ms" }}
      />
    </>
  );
}
