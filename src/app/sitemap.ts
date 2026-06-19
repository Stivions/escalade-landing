import type { MetadataRoute } from "next";

// TODO: reemplazar por el dominio real cuando exista
const baseUrl = "https://escalade.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
