import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dama Productions | داما للإنتاج",
  description: "نجاحك الرقمي مع داما - Your Digital Success with Dama",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    {children}
  </>;
}
