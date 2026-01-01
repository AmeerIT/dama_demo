"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DefaultProps } from "@/lib/default-props";

export function Newsletter({ dictionary, lang }: DefaultProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription API
    alert(lang === "ar" ? "شكراً للاشتراك!" : "Thanks for subscribing!");
    setEmail("");
  };

  return (
    <div className="space-y-4" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h4 className="text-xl font-bold">{dictionary.footer.subscribeTitle}</h4>
      <p className="text-muted-foreground text-sm">
        {dictionary.footer.subscribeDesc}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={dictionary.footer.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-card border border-border rounded-xl px-4 py-3 focus-visible:border-primary transition-colors"
        />
        <Button
          type="submit"
          className="bg-foreground text-background font-bold px-6 py-3 rounded-xl hover:bg-foreground/90 transition-all transform active:scale-95"
        >
          {dictionary.footer.subscribeButton}
        </Button>
      </form>
    </div>
  );
}
