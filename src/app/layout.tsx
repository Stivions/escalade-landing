import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: reemplazar por el dominio real cuando exista
  metadataBase: new URL("https://escalade.example"),
  title: "Escalade — Infraestructura Autónoma de Creación de Contenido",
  description:
    "Plataforma autónoma de agentes de IA que transforma señales de internet y videos sin procesar en contenido listo para publicar en X y YouTube Shorts. Impulsada por 0G Compute y 0G Storage.",
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
    description: "Infraestructura Autónoma de Creación de Contenido Impulsada por 0G.",
    siteName: "Escalade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escalade",
    description: "Infraestructura Autónoma de Creación de Contenido Impulsada por 0G.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-paper text-primary`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
