import type { MetadataRoute } from "next";
import { caseStudySlugs, siteConfig } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  const homePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/fr`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: { fr: `${baseUrl}/fr`, en: `${baseUrl}/en` },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: { fr: `${baseUrl}/fr`, en: `${baseUrl}/en` },
      },
    },
  ];

  const caseStudies: MetadataRoute.Sitemap = caseStudySlugs.flatMap((slug) => {
    const frenchUrl = `${baseUrl}/fr/projects/${slug}`;
    const englishUrl = `${baseUrl}/en/projects/${slug}`;
    const languages = { fr: frenchUrl, en: englishUrl };

    return [
      {
        url: frenchUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
        alternates: { languages },
      },
      {
        url: englishUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages },
      },
    ];
  });

  return [...homePages, ...caseStudies];
}
