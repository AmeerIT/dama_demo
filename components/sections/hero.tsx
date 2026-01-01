"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DefaultProps } from "@/lib/default-props";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import SimpleMarquee from "../fancy/blocks/simple-marquee";
import { GlowingBlobs } from "../fancy/background/glowing-blobs";

export function HeroSection({ dictionary, lang }: DefaultProps) {
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      <section className={cn(`relative min-h-screen flex items-center justify-center overflow-hidden bg-primary text-background`)}
        style={{
          fontFamily: "Effra, sans-serif",
          fontWeight: 700,
        }}
      >
        {/* Glowing Blobs */}
        <GlowingBlobs variant="hero" />

        {/* Content */}
        <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-6">
          <div className="space-y-8 md:space-y-12">
            {/* Main Title */}
            <h1 className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-black tracking-tighter leading-[0.9] sm:leading-[0.85]">
              {dictionary.hero.title}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-background via-background to-background/70">
                {dictionary.hero.subtitle}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-3xl font-medium opacity-80 max-w-3xl mx-auto leading-snug sm:leading-tight px-4 sm:px-0">
              {dictionary.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
              <Link href={`/${lang}/services`} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"

                  className="w-full sm:w-auto px-10 py-6
                  bg-background
                  text-foreground
                  uppercase
                  sm:text-sm hover:scale-105 transition-all shadow-2xl"
                >
                  {dictionary.common.services}
                </Button>
              </Link>
              <Link href={`/${lang}/blog`} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-10 py-6
                  bg-transparent border-2
                  border-background/30
                  rounded-full
                  font-black uppercase
                  sm:text-sm hover:bg-background/10 transition-all backdrop-blur-sm"
                >
                  {dictionary.common.blog}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-8 md:h-12 bg-linear-to-b from-background to-transparent" />
        </div> */}

      </section>
    </>
  );
}


const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-2 sm:mx-3 md:mx-4 hover:scale-105 cursor-pointer duration-300 ease-in-out">
    {children}
  </div>
)
