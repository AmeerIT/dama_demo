"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DefaultProps } from "@/lib/default-props";

export function FooterTabs({ dictionary, lang }: DefaultProps) {
  const servicesData = [
    { name: dictionary.services.title, desc: lang === "ar" ? "سرد سينمائي على نطاق واسع" : "Cinematic storytelling at scale" },
    { name: dictionary.common.blog, desc: lang === "ar" ? "رؤى ومشاركة المعرفة" : "Insights and knowledge sharing" },
    { name: dictionary.common.courses, desc: lang === "ar" ? "محتوى تعليمي وتدريبي" : "Educational content and training" },
  ];

  const studiosData = [
    { name: dictionary.footer.dubai, addr: dictionary.footer.businessBay },
    { name: dictionary.footer.riyadh, addr: dictionary.footer.kafd },
  ];

  const awardsData = [
    { name: lang === "ar" ? "التميز الإبداعي 2024" : "Creative Excellence 2024", desc: lang === "ar" ? "إنتاج فيديو متميز" : "Outstanding Video Production" },
    { name: lang === "ar" ? "الابتكار الرقمي" : "Digital Innovation", desc: lang === "ar" ? "أفضل تصميم UX/UI" : "Best UX/UI Design" },
  ];

  return (
    <Tabs defaultValue="services" className="w-full" dir={lang === "ar" ? "rtl" : "ltr"}>
      <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0 space-x-6">
        <TabsTrigger
          value="services"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3 text-sm font-bold uppercase "
        >
          {dictionary.common.services}
        </TabsTrigger>
        <TabsTrigger
          value="studios"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3 text-sm font-bold uppercase "
        >
          {dictionary.footer.studios}
        </TabsTrigger>
        <TabsTrigger
          value="awards"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent px-6 py-3 text-sm font-bold uppercase "
        >
          {dictionary.footer.awards}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="services" className="mt-6 min-h-[160px]">
        <div className="space-y-3">
          {servicesData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col py-3 border-b border-border last:border-none group hover:border-primary transition-colors"
            >
              <span className="text-lg font-bold group-hover:text-primary transition-colors">
                {item.name}
              </span>
              <span className="text-muted-foreground text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="studios" className="mt-6 min-h-[160px]">
        <div className="space-y-3">
          {studiosData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col py-3 border-b border-border last:border-none group hover:border-primary transition-colors"
            >
              <span className="text-lg font-bold group-hover:text-primary transition-colors">
                {item.name}
              </span>
              <span className="text-muted-foreground text-sm">{item.addr}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="awards" className="mt-6 min-h-[160px]">
        <div className="space-y-3">
          {awardsData.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col py-3 border-b border-border last:border-none group hover:border-primary transition-colors"
            >
              <span className="text-lg font-bold group-hover:text-primary transition-colors">
                {item.name}
              </span>
              <span className="text-muted-foreground text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
