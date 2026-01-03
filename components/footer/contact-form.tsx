"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DefaultProps } from "@/lib/default-props";

export function ContactForm({ dictionary, lang }: DefaultProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call when table is ready
    alert(lang === "ar" ? "شكراً لتواصلك! سنرد عليك قريباً." : "Thank you for reaching out! We'll get back to you soon.");
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground">
            {dictionary.footer.yourName}
          </Label>
          <Input
            type="text"
            placeholder={dictionary.footer.yourName}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-secondary border-none rounded-xl px-4 py-3 focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase text-muted-foreground">
            {dictionary.footer.emailAddress}
          </Label>
          <Input
            type="email"
            placeholder={dictionary.footer.emailPlaceholder}
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-secondary border-none rounded-xl px-4 py-3 focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase text-muted-foreground">
          {dictionary.footer.tellUs}
        </Label>
        <Textarea
          rows={4}
          placeholder={dictionary.footer.messagePlaceholder}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-secondary border-none rounded-xl px-4 py-3 resize-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      <Button
        type="submit"
        variant="outline"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 rounded-xl transition-all transform"
      >
        {dictionary.footer.sendInquiry}
      </Button>
    </form>
  );
}
