import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://c7corp.com";
  // Stable dates ensure search engines accurately track content updates
  const siteUpdated = new Date("2026-11-08");
  const legalUpdated = new Date("2026-01-15");

  return [
    { url: baseUrl, lastModified: siteUpdated, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/products`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/book-around-you`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/ai-pulse`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/c7-connect`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/c7-analytics`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/c7-workspace`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/gdpr`,
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
