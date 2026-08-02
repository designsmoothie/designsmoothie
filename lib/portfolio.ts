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
  categoryId: string;

  slug: string;
  title: string;
  subtitle: string;

  category: string;
  categoryTitle: string;

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

  categoryPreviewRatio: PreviewRatio;

  seoTitle?: string;
  seoDescription?: string;
};

type ProjectImageRow = {
  public_url: string;
  sort_order: number | null;
  is_thumbnail: boolean | null;
};

type CategoryRow = {
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
  category_id: string;

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

  status: string;
  featured: boolean | null;

  thumbnail_url: string | null;
  display_order: number | null;

  seo_title: string | null;
  seo_description: string | null;

  categories:
    | CategoryRow
    | CategoryRow[]
    | null;

  project_images:
    | ProjectImageRow[]
    | null;
};

function normalizeCategory(
  category: ProjectRow["categories"],
): CategoryRow | null {
  if (Array.isArray(category)) {
    return category[0] ?? null;
  }

  return category;
}

function normalizePreviewRatio(
  value:
    | PreviewRatio
    | null
    | undefined,
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

function mapProject(
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

  const thumbnailImage =
    sortedImages.find(
      (image) => image.is_thumbnail,
    );

  return {
    id: project.id,
    categoryId: project.category_id,

    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle ?? "",

    category: category?.slug ?? "",
    categoryTitle:
      category?.name ?? "",

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

    thumbnail:
      project.thumbnail_url ??
      thumbnailImage?.public_url ??
      sortedImages[0]?.public_url ??
      "",

    images: sortedImages.map(
      (image) => image.public_url,
    ),

    featured:
      project.featured ?? false,

    displayOrder:
      project.display_order ?? 0,

    categoryPreviewRatio:
      normalizePreviewRatio(
        category?.preview_ratio,
      ),

    seoTitle:
      project.seo_title ?? undefined,

    seoDescription:
      project.seo_description ??
      undefined,
  };
}

const projectSelect = `
  id,
  category_id,
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

  status,
  featured,

  thumbnail_url,
  display_order,

  seo_title,
  seo_description,

  categories!inner (
    id,
    name,
    slug,
    description,
    color,
    preview_ratio,
    display_order
  ),

  project_images (
    public_url,
    sort_order,
    is_thumbnail
  )
`;

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
      "CMS 카테고리 조회 실패:",
      error,
    );

    return [];
  }

  return (
    (data ?? []) as CategoryRow[]
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
      category.display_order ?? index,

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
    .select(projectSelect)
    .eq("status", "published")
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "CMS 프로젝트 조회 실패:",
      error,
    );

    return [];
  }

  return ((data ?? []) as ProjectRow[]).map(
    mapProject,
  );
}

export async function getProjectsByCategory(
  categorySlug: string,
): Promise<CmsPortfolioProject[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("status", "published")
    .eq(
      "categories.slug",
      categorySlug,
    )
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "카테고리 프로젝트 조회 실패:",
      error,
    );

    return [];
  }

  return ((data ?? []) as ProjectRow[]).map(
    mapProject,
  );
}

export async function getProjectBySlug(
  projectSlug: string,
): Promise<CmsPortfolioProject | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("slug", projectSlug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    if (error?.code !== "PGRST116") {
      console.error(
        "프로젝트 상세 조회 실패:",
        error,
      );
    }

    return null;
  }

  return mapProject(
    data as ProjectRow,
  );
}