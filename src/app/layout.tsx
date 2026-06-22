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
    "Live AI agent infrastructure that turns internet signals into X and YouTube content with 0G Compute and verifiable publication receipts.",
  keywords: [
    "Escalade",
    "agent network",
    "autonomous agents",
    "AI content",
    "0G Compute",
    "publication proof",
    "verifiable AI",
    "content automation",
  ],
  authors: [{ name: "Escalade" }],
  openGraph: {
    title: "Escalade",
    description:
      "AI agents for creator revenue with 0G Compute and verifiable release receipts.",
    siteName: "Escalade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escalade",
    description:
      "AI agents for creator revenue with 0G Compute and verifiable release receipts.",
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
