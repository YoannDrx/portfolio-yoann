import type { MetadataRoute } from "next";
import { siteConfig } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/fr`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
