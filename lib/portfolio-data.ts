import { createClient } from "@/lib/supabase/server";

export type PreviewRatio =
  | "wide"
  | "standard"
  | "tall"
  | "banner";

export type CmsPortfolioCategory = {
  id: string;
  slug: string;
  title: string;

  subtitle: string;
  description: string;
  services: string[];

  color: string;
  previewRatio: PreviewRatio;

  displayOrder: number;
  number: string;
  href: string;
};

export type CmsPortfolioProject = {
  id: string;
  slug: string;
  title: string;

  category: string;
  categoryTitle: string;
  categoryPreviewRatio: PreviewRatio;
  subtitle: string;

  client: string;
  year: string;
  location: string;
  industry: string;

  services: string[];

  summary: string;
  overviewTitle: string;
  overview: string;

  challenge?: string;
  solution?: string;
  result?: string;

  thumbnail: string;
  images: string[];

  featured: boolean;
  displayOrder: number;

  seoTitle?: string;
  seoDescription?: string;
};

type ProjectImageRow = {
  public_url: string;
  sort_order: number | null;
  is_thumbnail: boolean | null;
};

type ProjectCategoryItem = {
  name: string;
  slug: string;
  preview_ratio: PreviewRatio | null;
};

type ProjectCategoryRelation =
  | ProjectCategoryItem
  | ProjectCategoryItem[]
  | null;

type PortfolioCategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  preview_ratio: PreviewRatio | null;
  display_order: number | null;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;

  client: string | null;
  year: string | null;
  location: string | null;
  industry: string | null;

  services: string[] | null;

  summary: string | null;
  overview_title: string | null;
  overview: string | null;

  challenge: string | null;
  solution: string | null;
  result: string | null;

  thumbnail_url: string | null;

  featured: boolean | null;
  display_order: number | null;

  seo_title: string | null;
  seo_description: string | null;

  categories: ProjectCategoryRelation;
  project_images: ProjectImageRow[] | null;
};

function normalizeCategory(
  relation: ProjectCategoryRelation,
): ProjectCategoryItem | null {
  if (Array.isArray(relation)) {
    return relation[0] ?? null;
  }

  return relation;
}

function normalizePreviewRatio(
  value: string | null | undefined,
): PreviewRatio {
  if (
    value === "wide" ||
    value === "standard" ||
    value === "tall" ||
    value === "banner"
  ) {
    return value;
  }

  return "wide";
}

function normalizeProject(
  project: ProjectRow,
): CmsPortfolioProject {
  const category = normalizeCategory(
    project.categories,
  );

  const sortedImages = [
    ...(project.project_images ?? []),
  ].sort(
    (a, b) =>
      (a.sort_order ?? 0) -
      (b.sort_order ?? 0),
  );

  const thumbnailImage = sortedImages.find(
    (image) => image.is_thumbnail,
  );

  const thumbnail =
    project.thumbnail_url ||
    thumbnailImage?.public_url ||
    sortedImages[0]?.public_url ||
    "";

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,

    category: category?.slug ?? "",
    categoryTitle: category?.name ?? "",

    categoryPreviewRatio:
      normalizePreviewRatio(
        category?.preview_ratio,
      ),

    subtitle: project.subtitle ?? "",

    client: project.client ?? "",
    year: project.year ?? "",
    location: project.location ?? "",
    industry: project.industry ?? "",

    services: project.services ?? [],

    summary: project.summary ?? "",

    overviewTitle:
      project.overview_title ?? "",

    overview: project.overview ?? "",

    challenge:
      project.challenge ?? undefined,

    solution:
      project.solution ?? undefined,

    result:
      project.result ?? undefined,

    thumbnail,

    images: sortedImages.map(
      (image) => image.public_url,
    ),

    featured:
      project.featured ?? false,

    displayOrder:
      project.display_order ?? 0,

    seoTitle:
      project.seo_title ?? undefined,

    seoDescription:
      project.seo_description ??
      undefined,
  };
}

export async function getCmsCategories(): Promise<
  CmsPortfolioCategory[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      description,
      color,
      preview_ratio,
      display_order
    `)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "홈페이지 카테고리 조회 실패:",
      error,
    );

    return [];
  }

  return (
    (data ?? []) as PortfolioCategoryRow[]
  ).map((category, index) => ({
    id: category.id,
    slug: category.slug,
    title: category.name,

    subtitle: "PORTFOLIO CATEGORY",

    description:
      category.description ?? "",

    services: [],

    color:
      category.color ?? "#94b63f",

    previewRatio:
      normalizePreviewRatio(
        category.preview_ratio,
      ),

    displayOrder:
      category.display_order ??
      index + 1,

    number: String(index + 1).padStart(
      2,
      "0",
    ),

    href: `/portfolio/category/${category.slug}`,
  }));
}

export async function getCmsProjects(): Promise<
  CmsPortfolioProject[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      slug,
      title,
      subtitle,
      client,
      year,
      location,
      industry,
      services,
      summary,
      overview_title,
      overview,
      challenge,
      solution,
      result,
      thumbnail_url,
      featured,
      display_order,
      seo_title,
      seo_description,

      categories (
        name,
        slug,
        preview_ratio
      ),

      project_images (
        public_url,
        sort_order,
        is_thumbnail
      )
    `)
    .eq("status", "published")
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "홈페이지 프로젝트 조회 실패:",
      error,
    );

    return [];
  }

  return (data ?? []).map((project) =>
    normalizeProject(
      project as ProjectRow,
    ),
  );
}

export async function getCmsFeaturedProjects(): Promise<
  CmsPortfolioProject[]
> {
  const projects =
    await getCmsProjects();

  return projects.filter(
    (project) => project.featured,
  );
}

export async function getCmsProjectsByCategory(
  categorySlug: string,
): Promise<CmsPortfolioProject[]> {
  const projects =
    await getCmsProjects();

  return projects.filter(
    (project) =>
      project.category ===
      categorySlug,
  );
}

export async function getCmsProjectBySlug(
  slug: string,
): Promise<CmsPortfolioProject | null> {
  const projects =
    await getCmsProjects();

  return (
    projects.find(
      (project) =>
        project.slug === slug,
    ) ?? null
  );
}

/**
 * 기존 페이지들이 이전 함수명을 사용하고 있어도
 * 깨지지 않도록 호환용으로 유지합니다.
 */
export async function getProjectsByCategory(
  categorySlug: string,
): Promise<CmsPortfolioProject[]> {
  return getCmsProjectsByCategory(
    categorySlug,
  );
}

export async function getProjectBySlug(
  slug: string,
): Promise<CmsPortfolioProject | null> {
  return getCmsProjectBySlug(slug);
}