import Link from "next/link";
import { DefaultProps } from "@/lib/default-props";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FooterTabs } from "./footer-tabs";
import { ContactForm } from "./contact-form";
import { Newsletter } from "./newsletter";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export function MegaFooter({ lang, dictionary }: DefaultProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "YouTube", href: "#", icon: Youtube },
  ];

  return (
    <footer className="bg-background text-foreground min-h-screen pt-20 pb-10 px-6 md:px-12 flex flex-col justify-between" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
        {/* Left Column: Brand & Interactive Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 text-primary">
              DAMA
            </h2>
            <p className="text-muted-foreground text-xl font-medium max-w-md">
              {dictionary.footer.tagline}
            </p>
          </div>

          {/* Tabs Section */}
          <FooterTabs lang={lang} dictionary={dictionary} />

          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 gap-8 py-8 border-y border-border">
            <div>
              <h4 className="text-muted-foreground text-sm font-bold uppercase  mb-4">
                {dictionary.footer.contactInfo}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:admin@dama.com"
                    className="text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    admin@dama.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+964123456789"
                    className="text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    +964 123 456 789
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-muted-foreground text-sm font-bold uppercase  mb-4">
                {dictionary.footer.mainStudio}
              </h4>
              <p className="text-foreground leading-relaxed">
                الدورة <br />
                Dubai, <br />
                حي الصحة 12345 <br />
                شمال ابو دشير
              </p>
            </div>
          </div>

          {/* Quick Links - Desktop Only */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-muted-foreground text-sm font-bold uppercase  mb-4">
                {dictionary.footer.quickLinks}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lang}/services`} className="hover:text-primary transition-colors">
                    {dictionary.common.services}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/blog`} className="hover:text-primary transition-colors">
                    {dictionary.common.blog}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/cast`} className="hover:text-primary transition-colors">
                    {dictionary.common.cast}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-muted-foreground text-sm font-bold uppercase  mb-4">
                {dictionary.footer.more}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lang}/courses`} className="hover:text-primary transition-colors">
                    {dictionary.common.courses}
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form & Newsletter */}
        <Card className="bg-card p-8 md:p-12 rounded-3xl border border-border h-fit">
          <h3 className="text-3xl font-bold mb-8">{dictionary.footer.startConversation}</h3>
          <ContactForm lang={lang} dictionary={dictionary} />

          <Separator className="my-12" />

          <Newsletter lang={lang} dictionary={dictionary} />

          <div className="mt-12 flex flex-wrap gap-6 text-sm font-bold uppercase  text-muted-foreground">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-primary transition-colors flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon size={16} />
                {link.name}
              </a>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-foreground text-sm font-medium">
          &copy; {currentYear} {dictionary.footer.copyright}
        </p>
        <div className="flex gap-8 text-xs font-semibold uppercase text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            {dictionary.footer.privacyPolicy}
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            {dictionary.footer.termsOfService}
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            {dictionary.footer.cookies}
          </a>
        </div>
      </div>
    </footer>
  );
}
