import type { MetadataRoute } from "next";
import { getArticles, getEvents, STATIC_ARTICLES, STATIC_EVENTS } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aurelia-international.edu";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/academics`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/admissions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/news-events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Retrieve dynamic news articles
  let articleSlugs: string[] = [];
  try {
    const res = await getArticles({ limit: 100 });
    const items = res?.articles || [];
    articleSlugs = items.map((a: { slug: string }) => a.slug);
  } catch {
    articleSlugs = STATIC_ARTICLES.map((a) => a.slug);
  }

  const newsRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${siteUrl}/news-events/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Retrieve dynamic events
  let eventSlugs: string[] = [];
  try {
    const res = await getEvents({ limit: 100 });
    const items = res?.events || [];
    eventSlugs = items.map((e: { slug: string }) => e.slug);
  } catch {
    eventSlugs = STATIC_EVENTS.map((e) => e.slug);
  }

  const eventRoutes: MetadataRoute.Sitemap = eventSlugs.map((slug) => ({
    url: `${siteUrl}/news-events/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}
