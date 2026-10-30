import type { MetadataRoute } from "next";
import { franchiseCategories } from "@/lib/franchise/config";
import { createClient } from "@/lib/supabase/server";

// Always reflect the current CMS, including removals and unpublished work.
export const dynamic = "force-dynamic";

const baseUrl = "https://designsmoothie.kr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: categories, error: categoryError } = await supabase
    .from("categories")
    .select("slug")
    .order("slug");

  // A CMS outage must not look like a successful, empty sitemap.
  if (categoryError) throw categoryError;

  const projectPages: MetadataRoute.Sitemap = [];
  const pageSize = 1000;

  for (let offset = 0; ; offset += pageSize) {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("id")
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    for (const project of projects ?? []) {
      if (!project.slug) continue;
      const modified = project.updated_at
        ? new Date(project.updated_at)
        : undefined;

      projectPages.push({
        url: `${baseUrl}/portfolio/project/${encodeURIComponent(project.slug)}`,
        ...(modified && !Number.isNaN(modified.getTime())
          ? { lastModified: modified }
          : {}),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    if ((projects?.length ?? 0) < pageSize) break;
  }

  for (let offset = 0; ; offset += pageSize) {
    const { data: works, error } = await supabase.from("franchise_works")
      .select("id, updated_at").eq("status", "published").order("id").range(offset, offset + pageSize - 1);
    if (error) {
      // Keep the original sitemap available before the new table is installed.
      if (error.code === "42P01" || error.code === "PGRST205") break;
      throw error;
    }
    for (const work of works ?? []) {
      const modified = new Date(work.updated_at);
      projectPages.push({ url: `${baseUrl}/franchise/work/${work.id}`, ...(Number.isNaN(modified.getTime()) ? {} : { lastModified: modified }), changeFrequency: "monthly", priority: 0.7 });
    }
    if ((works?.length ?? 0) < pageSize) break;
  }

  // Omit lastmod where no reliable content modification timestamp exists.
  const pages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
    ...(categories ?? [])
      .filter((category) => Boolean(category.slug))
      .map((category) => ({
        url: `${baseUrl}/portfolio/${encodeURIComponent(category.slug)}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...projectPages,
    { url: `${baseUrl}/franchise`, changeFrequency: "weekly", priority: 0.8 },
    ...franchiseCategories.map((category) => ({ url: `${baseUrl}/franchise/${category.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/guide`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return Array.from(new Map(pages.map((page) => [page.url, page])).values());
}
