import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Escalade - Autonomous content infrastructure",
  description:
    "Autonomous AI infrastructure that turns live internet signals and raw footage into publish-ready content for X and YouTube Shorts, with decisions powered by 0G Compute.",
  keywords: [
    "Escalade",
    "agent network",
    "autonomous agents",
    "AI content",
    "0G Compute",
    "0G Storage",
    "verifiable AI",
    "content automation",
  ],
  authors: [{ name: "Escalade" }],
  openGraph: {
    title: "Escalade",
    description: "Autonomous content infrastructure powered by 0G.",
    siteName: "Escalade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escalade",
    description: "Autonomous content infrastructure powered by 0G.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-paper text-primary">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
