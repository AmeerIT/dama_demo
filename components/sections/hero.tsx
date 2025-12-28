"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DefaultProps } from "@/lib/default-props";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import SimpleMarquee from "../fancy/blocks/simple-marquee";

export function HeroSection({ dictionary, lang }: DefaultProps) {
  const isRTL = lang === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const exampleImages = [
    "https://cdn.cosmos.so/4b771c5c-d1eb-4948-b839-255dbeb931ba?format=jpeg",
    "https://cdn.cosmos.so/a8d82afd-2293-43ad-bac3-887683d85b44?format=jpeg",
    "https://cdn.cosmos.so/49206ba5-c174-4cd5-aee8-5b744842e6c2?format=jpeg",
    "https://cdn.cosmos.so/b29bd150-6477-420f-8efb-65ed99694421?format=jpeg",
    "https://cdn.cosmos.so/e1a0313e-7617-431d-b7f1-f1b169e6bcb4?format=jpeg",
    "https://cdn.cosmos.so/ad640c12-69fb-4186-bc3d-b1cc93986a37?format=jpeg",
    "https://cdn.cosmos.so/5cf0c3d2-e785-41a3-b0c8-a073ee2f2862?format=jpeg",
    "https://cdn.cosmos.so/938ab21c-a975-41b3-b303-418290343b09?format=jpeg",
    "https://cdn.cosmos.so/2e14a9bb-27e3-40fd-b940-cfb797a1224c?format=jpeg",
    "https://cdn.cosmos.so/81841d9f-e164-4770-aebc-cfc97d72f3ab?format=jpeg",
    "https://cdn.cosmos.so/49b81db0-37ea-4569-b0d6-04afa5115a10?format=jpeg",
    "https://cdn.cosmos.so/ade1834b-9317-44fb-8dc3-b43d29acd409?format=jpeg",
    "https://cdn.cosmos.so/621c250c-3833-45f9-862a-3f400aaf8f28?format=jpeg",
    "https://cdn.cosmos.so/f9b7eae8-e5a6-4ce6-b6e1-9ef125ba7f8e?format=jpeg",
    "https://cdn.cosmos.so/bd56ed6d-1bbd-44a4-b1a1-79b7199bbebb?format=jpeg",
  ]

  const firstThird = exampleImages.slice(
    0,
    Math.floor(exampleImages.length / 3)
  )
  const secondThird = exampleImages.slice(
    Math.floor(exampleImages.length / 3),
    Math.floor((2 * exampleImages.length) / 3)
  )
  const lastThird = exampleImages.slice(
    Math.floor((2 * exampleImages.length) / 3)
  )

  const container = useRef<HTMLDivElement>(null)


  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent" />
      <section className={cn(`relative min-h-[90vh] flex items-center justify-center overflow-hidden`)}
        style={{
          fontFamily: "Effra, sans-serif",
          fontWeight: 700,
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0486e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >

        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-6">
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight EffraBold-400">
              <span className="text-foreground">{dictionary.hero.title}</span>
              <br />
              <span className="text-primary">{dictionary.hero.subtitle}</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {dictionary.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={`/${lang}/services`}>
                <Button size="lg" className="group text-base px-8">
                  {dictionary.common.services}
                  <ArrowIcon className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Button>
              </Link>
              <Link href={`/${lang}/blog`}>
                <Button variant="outline" size="lg" className="text-base px-8">
                  {dictionary.common.blog}
                </Button>
              </Link>
            </div>
          </div>
          <div dir="ltr" className="mt-16 space-y-8 h-4xl" ref={container}>
            <SimpleMarquee
              className="w-full h-3xl"
              baseVelocity={8}
              repeat={4}
              draggable={true}
              scrollSpringConfig={{ damping: 50, stiffness: 400 }}
              slowDownFactor={0.1}
              slowdownOnHover
              slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
              scrollAwareDirection={true}
              scrollContainer={container}
              useScrollVelocity={true}
              direction="left"
            >
              {firstThird.map((src, i) => (
                <MarqueeItem key={i}>
                  <img
                    src={src}
                    alt={`Image ${i + 1}`}
                    className="h-62.5 w-75 sm:h-24 sm:w-40 md:h-32 md:w-48 object-cover"
                  />
                </MarqueeItem>
              ))}
            </SimpleMarquee>
            <SimpleMarquee
              className="w-full"
              baseVelocity={8}
              repeat={4}
              scrollAwareDirection={true}
              scrollSpringConfig={{ damping: 50, stiffness: 400 }}
              slowdownOnHover
              slowDownFactor={0.1}
              slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
              useScrollVelocity={true}
              scrollContainer={container}
              draggable={false}
              direction="right"
            >
              {secondThird.map((src, i) => (
                <MarqueeItem key={i}>
                  <img
                    src={src}
                    alt={`Image ${i + firstThird.length}`}
                    className="h-20 w-32 sm:h-24 sm:w-40 md:h-32 md:w-48 object-cover"
                  />
                </MarqueeItem>
              ))}
            </SimpleMarquee>
            <SimpleMarquee
              className="w-full"
              baseVelocity={8}
              repeat={4}
              draggable={false}
              scrollSpringConfig={{ damping: 50, stiffness: 400 }}
              slowDownFactor={0.1}
              slowdownOnHover
              slowDownSpringConfig={{ damping: 60, stiffness: 300 }}
              scrollAwareDirection={true}
              scrollContainer={container}
              useScrollVelocity={true}
              direction="left"
            >
              {lastThird.map((src, i) => (
                <MarqueeItem key={i}>
                  <img
                    src={src}
                    alt={`Image ${i + firstThird.length + secondThird.length}`}
                    className="h-20 w-32 sm:h-24 sm:w-40 md:h-32 md:w-48 object-cover"
                  />
                </MarqueeItem>
              ))}
            </SimpleMarquee>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-background to-transparent" />

      </section>
    </>
  );
}


const MarqueeItem = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-2 sm:mx-3 md:mx-4 hover:scale-105 cursor-pointer duration-300 ease-in-out">
    {children}
  </div>
)
