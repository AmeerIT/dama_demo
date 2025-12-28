import type { Metadata } from "next";
import "./globals.css";
import { getDictionary, Locale } from "@/lib/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Dama Productions | داما للإنتاج",
  description: "نجاحك الرقمي مع داما - Your Digital Success with Dama",
};


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return <>
    {children}
  </>
}
