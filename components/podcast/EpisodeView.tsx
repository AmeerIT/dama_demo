// "use client";

// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import {
//     motion,
//     useScroll,
//     useTransform,
//     useInView,
//     AnimatePresence,
// } from "motion/react";
// import {
//     Play,
//     Pause,
//     Clock,
//     Calendar,
//     ChevronLeft,
//     ChevronRight,
//     X,
//     Headphones,
//     Video,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ANIMATION } from "@/lib/animation-constants";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import type { Episode } from "@/lib/appwrite/types";
// import type { Locale } from "@/lib/i18n/dictionaries";
// import type { Dictionary } from "@/lib/i18n/dictionaries";

// // ============================================================================
// // TYPES
// // ============================================================================

// interface EpisodeViewProps {
//     episode: Episode;
//     allEpisodes?: Episode[];
//     variant?: "modern" | "immersive";
//     lang: Locale;
//     dictionary: Dictionary;
// }

// // ============================================================================
// // UTILITY FUNCTIONS
// // ============================================================================

// function formatDuration(seconds: number): string {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
// }

// function getLocalizedField<T extends Record<string, unknown>>(
//     obj: T,
//     field: string,
//     lang: Locale
// ): string {
//     const key = `${field}_${lang}` as keyof T;
//     const fallbackKey = `${field}_en` as keyof T;
//     return (obj[key] as string) || (obj[fallbackKey] as string) || "";
// }

// // ============================================================================
// // HERO SECTION
// // ============================================================================

// interface HeroSectionProps {
//     episode: Episode;
//     variant: "modern" | "immersive";
//     lang: Locale;
//     dictionary: Dictionary;
// }

// function HeroSection({ episode, variant, lang, dictionary }: HeroSectionProps) {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const isRTL = lang === "ar";

//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start start", "end start"],
//     });

//     // Parallax scale effect for hero image
//     const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
//     const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//     const title = getLocalizedField(episode, "title", lang);

//     // Directional clip-path animation based on reading direction
//     const clipPathVariants = isRTL
//         ? ANIMATION.variants.clipRevealRTL
//         : ANIMATION.variants.clipRevealLTR;

//     return (
//         <section
//             ref={containerRef}
//             className={cn(
//                 "relative w-full overflow-hidden",
//                 variant === "immersive" ? "h-screen" : "h-[50vh] min-h-[400px]"
//             )}
//         >
//             {/* Hero Image with Parallax */}
//             <motion.div
//                 className="absolute inset-0"
//                 style={{ scale }}
//             >
//                 {episode.cover_image ? (
//                     <Image
//                         src={episode.cover_image}
//                         alt={title}
//                         fill
//                         priority
//                         className="object-cover"
//                         sizes="100vw"
//                     />
//                 ) : (
//                     <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
//                 )}

//                 {/* Gradient Overlays */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent rtl:bg-gradient-to-l" />
//             </motion.div>

//             {/* Content Overlay */}
//             <motion.div
//                 className="absolute inset-0 flex items-end"
//                 style={{ opacity }}
//             >
//                 <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
//                     {/* Episode Badge */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.2 }}
//                         className="mb-4"
//                     >
//                         <Badge variant="secondary" className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
//                             <Headphones className="size-3 me-1.5" />
//                             {dictionary.podcast?.episode || "Episode"} {episode.episode_number}
//                             {episode.season && ` • ${dictionary.podcast?.season || "S"}${episode.season}`}
//                         </Badge>
//                     </motion.div>

//                     {/* Title with Directional Clip-Path Reveal */}
//                     <motion.h1
//                         variants={clipPathVariants}
//                         initial="initial"
//                         animate="animate"
//                         className={cn(
//                             "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground",
//                             "max-w-4xl leading-tight tracking-tight"
//                         )}
//                     >
//                         {title}
//                     </motion.h1>

//                     {/* Meta Information */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.6 }}
//                         className="flex flex-wrap items-center gap-4 mt-6 text-muted-foreground"
//                     >
//                         <span className="flex items-center gap-1.5">
//                             <Clock className="size-4 text-primary" />
//                             {formatDuration(episode.duration)} {dictionary.podcast?.minutes || "min"}
//                         </span>
//                         <span className="flex items-center gap-1.5">
//                             <Calendar className="size-4 text-primary" />
//                             {new Date(episode.published_at).toLocaleDateString(
//                                 lang === "ar" ? "ar-EG" : "en-US",
//                                 { year: "numeric", month: "long", day: "numeric" }
//                             )}
//                         </span>
//                     </motion.div>

//                     {/* CTA Buttons */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.8 }}
//                         className="flex flex-wrap gap-3 mt-8"
//                     >
//                         {episode.audio_url && (
//                             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
//                                 <Play className="size-5 me-2 fill-current" />
//                                 {dictionary.podcast?.listen || "Listen Now"}
//                             </Button>
//                         )}
//                         {episode.video_url && (
//                             <Button size="lg" variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10">
//                                 <Video className="size-5 me-2" />
//                                 {dictionary.podcast?.watchVideo || "Watch Video"}
//                             </Button>
//                         )}
//                     </motion.div>
//                 </div>
//             </motion.div>
//         </section>
//     );
// }

// // ============================================================================
// // BLUR REVEAL TEXT COMPONENT
// // ============================================================================

// interface BlurRevealTextProps {
//     children: React.ReactNode;
//     className?: string;
//     delay?: number;
// }

// function BlurRevealText({ children, className, delay = 0 }: BlurRevealTextProps) {
//     const ref = useRef<HTMLDivElement>(null);
//     const isInView = useInView(ref, { once: true, margin: "-100px" });

//     return (
//         <motion.div
//             ref={ref}
//             initial={{ opacity: 0, filter: "blur(8px)" }}
//             animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
//             transition={{
//                 duration: 0.8,
//                 delay,
//                 ease: ANIMATION.ease.default,
//             }}
//             className={className}
//         >
//             {children}
//         </motion.div>
//     );
// }

// // ============================================================================
// // CONTENT CARD
// // ============================================================================

// interface ContentCardProps {
//     episode: Episode;
//     variant: "modern" | "immersive";
//     lang: Locale;
//     dictionary: Dictionary;
// }

// function ContentCard({ episode, variant, lang, dictionary }: ContentCardProps) {
//     const description = getLocalizedField(episode, "description", lang);
//     const body = getLocalizedField(episode, "body", lang);

//     // Split body into paragraphs for staggered reveal
//     const paragraphs = body
//         ? body.split(/\n\n+/).filter((p) => p.trim())
//         : [];

//     return (
//         <div
//             className={cn(
//                 "relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
//                 variant === "immersive" ? "-mt-32 z-10" : "mt-12"
//             )}
//         >
//             <Card
//                 className={cn(
//                     "overflow-hidden",
//                     variant === "immersive" &&
//                     "bg-card/80 backdrop-blur-xl ring-1 ring-white/10 shadow-2xl"
//                 )}
//             >
//                 <CardContent className="p-6 sm:p-8 lg:p-12">
//                     {/* Description */}
//                     {description && (
//                         <BlurRevealText className="mb-8">
//                             <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
//                                 {description}
//                             </p>
//                         </BlurRevealText>
//                     )}

//                     {/* Video Embed Placeholder */}
//                     {episode.video_url && (
//                         <BlurRevealText delay={0.1} className="mb-10">
//                             <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted ring-1 ring-border">
//                                 <iframe
//                                     src={episode.video_url}
//                                     title={getLocalizedField(episode, "title", lang)}
//                                     className="absolute inset-0 w-full h-full"
//                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                     allowFullScreen
//                                 />
//                             </div>
//                         </BlurRevealText>
//                     )}

//                     {/* Body Content with Staggered Blur Reveal */}
//                     {paragraphs.length > 0 && (
//                         <div className="prose prose-lg dark:prose-invert max-w-none">
//                             {paragraphs.map((paragraph, index) => (
//                                 <BlurRevealText
//                                     key={index}
//                                     delay={0.15 + index * 0.1}
//                                     className="mb-6"
//                                 >
//                                     <p className="text-foreground/90 leading-relaxed">
//                                         {paragraph}
//                                     </p>
//                                 </BlurRevealText>
//                             ))}
//                         </div>
//                     )}

//                     {/* Tags */}
//                     {episode.tags && episode.tags.length > 0 && (
//                         <BlurRevealText delay={0.3} className="mt-10 pt-8 border-t border-border">
//                             <div className="flex flex-wrap gap-2">
//                                 {episode.tags.map((tag) => (
//                                     <Badge
//                                         key={tag.id}
//                                         variant="outline"
//                                         className="border-primary/30 text-primary hover:bg-primary/10 transition-colors"
//                                     >
//                                         {getLocalizedField(tag, "name", lang)}
//                                     </Badge>
//                                 ))}
//                             </div>
//                         </BlurRevealText>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// // ============================================================================
// // EPISODE SIDEBAR
// // ============================================================================

// interface EpisodeSidebarProps {
//     episodes: Episode[];
//     currentEpisodeId: string;
//     lang: Locale;
//     dictionary: Dictionary;
//     onEpisodeSelect?: (episode: Episode) => void;
// }

// function EpisodeSidebar({
//     episodes,
//     currentEpisodeId,
//     lang,
//     dictionary,
//     onEpisodeSelect,
// }: EpisodeSidebarProps) {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const isRTL = lang === "ar";

//     // Position sidebar based on language direction
//     const sidebarPosition = isRTL ? "right-0" : "left-0";
//     const expandDirection = isRTL ? { x: 0 } : { x: 0 };
//     const collapseDirection = isRTL ? { x: 320 } : { x: -320 };

//     return (
//         <>
//             {/* Backdrop when expanded */}
//             <AnimatePresence>
//                 {isExpanded && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//                         onClick={() => setIsExpanded(false)}
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Sidebar Container */}
//             <div className={cn("fixed top-1/2 -translate-y-1/2 z-50", sidebarPosition)}>
//                 <AnimatePresence mode="wait">
//                     {!isExpanded ? (
//                         /* Collapsed Toggle Strip */
//                         <motion.button
//                             key="collapsed"
//                             initial={collapseDirection}
//                             animate={{ x: 0 }}
//                             exit={collapseDirection}
//                             transition={ANIMATION.spring.sidebar}
//                             onClick={() => setIsExpanded(true)}
//                             className={cn(
//                                 "group flex items-center justify-center",
//                                 "h-40 w-10 rounded-e-2xl rtl:rounded-e-none rtl:rounded-s-2xl",
//                                 "bg-primary/80 backdrop-blur-xl",
//                                 "border border-white/10 shadow-xl",
//                                 "hover:bg-primary hover:w-12 transition-all duration-300",
//                                 "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
//                             )}
//                             aria-label={dictionary.podcast?.showAll || "Show All"}
//                         >
//                             <span
//                                 className={cn(
//                                     "text-primary-foreground font-semibold text-xs tracking-widest uppercase",
//                                     "whitespace-nowrap"
//                                 )}
//                                 style={{
//                                     writingMode: "vertical-rl",
//                                     textOrientation: "mixed",
//                                     transform: isRTL ? "rotate(180deg)" : undefined,
//                                 }}
//                             >
//                                 {dictionary.podcast?.showAll || "SHOW ALL"}
//                             </span>
//                         </motion.button>
//                     ) : (
//                         /* Expanded Sidebar Panel */
//                         <motion.div
//                             key="expanded"
//                             initial={collapseDirection}
//                             animate={expandDirection}
//                             exit={collapseDirection}
//                             transition={ANIMATION.spring.sidebar}
//                             className={cn(
//                                 "w-80 max-h-[80vh] rounded-2xl overflow-hidden",
//                                 "bg-card/90 backdrop-blur-2xl",
//                                 "border border-white/10 shadow-2xl",
//                                 isRTL ? "me-4" : "ms-4"
//                             )}
//                         >
//                             {/* Header */}
//                             <div className="flex items-center justify-between p-4 border-b border-border/50">
//                                 <h3 className="font-semibold text-foreground">
//                                     {dictionary.podcast?.allEpisodes || "All Episodes"}
//                                 </h3>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={() => setIsExpanded(false)}
//                                     className="size-8 rounded-full hover:bg-primary/10"
//                                 >
//                                     <X className="size-4" />
//                                 </Button>
//                             </div>

//                             {/* Episodes List */}
//                             <div className="overflow-y-auto max-h-[calc(80vh-60px)] p-4 space-y-3">
//                                 {episodes.map((ep, index) => {
//                                     const isActive = ep.id === currentEpisodeId;
//                                     // Alternate between square and circle thumbnails (bento style)
//                                     const isCircle = index % 2 === 1;

//                                     return (
//                                         <motion.button
//                                             key={ep.id}
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             transition={{ delay: index * 0.05 }}
//                                             onClick={() => onEpisodeSelect?.(ep)}
//                                             className={cn(
//                                                 "w-full flex items-center gap-3 p-3 rounded-xl text-start",
//                                                 "transition-all duration-200",
//                                                 isActive
//                                                     ? "bg-primary/15 ring-1 ring-primary/30"
//                                                     : "hover:bg-muted/50"
//                                             )}
//                                         >
//                                             {/* Thumbnail */}
//                                             <div
//                                                 className={cn(
//                                                     "relative flex-shrink-0 overflow-hidden bg-muted",
//                                                     isCircle ? "size-12 rounded-full" : "size-12 rounded-lg"
//                                                 )}
//                                             >
//                                                 {ep.cover_image ? (
//                                                     <Image
//                                                         src={ep.cover_image}
//                                                         alt={getLocalizedField(ep, "title", lang)}
//                                                         fill
//                                                         className="object-cover"
//                                                         sizes="48px"
//                                                     />
//                                                 ) : (
//                                                     <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
//                                                         <Headphones className="size-5 text-primary" />
//                                                     </div>
//                                                 )}
//                                                 {isActive && (
//                                                     <div className="absolute inset-0 flex items-center justify-center bg-primary/60">
//                                                         <Play className="size-4 text-white fill-white" />
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             {/* Info */}
//                                             <div className="flex-1 min-w-0">
//                                                 <p
//                                                     className={cn(
//                                                         "text-sm font-medium truncate",
//                                                         isActive ? "text-primary" : "text-foreground"
//                                                     )}
//                                                 >
//                                                     {getLocalizedField(ep, "title", lang)}
//                                                 </p>
//                                                 <p className="text-xs text-muted-foreground mt-0.5">
//                                                     {dictionary.podcast?.episode || "Ep"} {ep.episode_number} •{" "}
//                                                     {formatDuration(ep.duration)}
//                                                 </p>
//                                             </div>

//                                             {/* Active Indicator */}
//                                             {isActive && (
//                                                 <div className="flex-shrink-0">
//                                                     <span className="relative flex size-2">
//                                                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
//                                                         <span className="relative inline-flex rounded-full size-2 bg-primary" />
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </motion.button>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </>
//     );
// }

// // ============================================================================
// // MAIN EPISODE VIEW COMPONENT
// // ============================================================================

// export function EpisodeView({
//     episode,
//     allEpisodes = [],
//     variant = "modern",
//     lang,
//     dictionary,
// }: EpisodeViewProps) {
//     const [selectedEpisode, setSelectedEpisode] = useState<Episode>(episode);

//     const handleEpisodeSelect = (ep: Episode) => {
//         setSelectedEpisode(ep);
//         // Scroll to top when switching episodes
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     // Ensure we have episodes for the sidebar
//     const sidebarEpisodes = allEpisodes.length > 0 ? allEpisodes : [episode];

//     return (
//         <div className="relative min-h-screen bg-background">
//             {/* Hero Section */}
//             <HeroSection
//                 episode={selectedEpisode}
//                 variant={variant}
//                 lang={lang}
//                 dictionary={dictionary}
//             />

//             {/* Content Card */}
//             <ContentCard
//                 episode={selectedEpisode}
//                 variant={variant}
//                 lang={lang}
//                 dictionary={dictionary}
//             />

//             {/* Spacer for bottom padding */}
//             <div className="h-24" />

//             {/* Episode Sidebar */}
//             {sidebarEpisodes.length > 1 && (
//                 <EpisodeSidebar
//                     episodes={sidebarEpisodes}
//                     currentEpisodeId={selectedEpisode.id}
//                     lang={lang}
//                     dictionary={dictionary}
//                     onEpisodeSelect={handleEpisodeSelect}
//                 />
//             )}
//         </div>
//     );
// }

// export default EpisodeView;
