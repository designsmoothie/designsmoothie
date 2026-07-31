"use server";

import {
  revalidatePath,
} from "next/cache";
import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/server";

const previewRatioValues = [
  "wide",
  "standard",
  "tall",
  "banner",
] as const;

type PreviewRatio =
  (typeof previewRatioValues)[number];

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getPreviewRatio(
  formData: FormData,
): PreviewRatio {
  const value = String(
    formData.get("previewRatio") ?? "wide",
  ).trim();

  if (
    previewRatioValues.includes(
      value as PreviewRatio,
    )
  ) {
    return value as PreviewRatio;
  }

  return "wide";
}

function revalidateCategoryPages() {
  revalidatePath("/");

  revalidatePath(
    "/admin/categories",
  );

  revalidatePath(
    "/admin/dashboard",
  );

  revalidatePath(
    "/portfolio",
  );

  revalidatePath(
    "/portfolio/category",
    "layout",
  );
}

export async function createCategory(
  formData: FormData,
) {
  const supabase = await createClient();

  const name = String(
    formData.get("name") ?? "",
  ).trim();

  const inputSlug = String(
    formData.get("slug") ?? "",
  ).trim();

  const description = String(
    formData.get("description") ?? "",
  ).trim();

  const color = String(
    formData.get("color") ?? "#94b63f",
  ).trim();

  const previewRatio =
    getPreviewRatio(formData);

  if (!name) {
    redirect(
      "/admin/categories?error=name-required",
    );
  }

  const slug =
    createSlug(inputSlug || name);

  if (!slug) {
    redirect(
      "/admin/categories?error=slug-required",
    );
  }

  const {
    data: lastCategory,
    error: orderError,
  } = await supabase
    .from("categories")
    .select("display_order")
    .order("display_order", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (orderError) {
    console.error(
      "카테고리 순서 조회 오류:",
      orderError,
    );

    redirect(
      `/admin/categories?error=${encodeURIComponent(
        orderError.message,
      )}`,
    );
  }

  const nextDisplayOrder =
    (lastCategory?.display_order ?? 0) +
    1;

  const {
    error,
  } = await supabase
    .from("categories")
    .insert({
      name,
      slug,

      description:
        description || null,

      color:
        color || "#94b63f",

      preview_ratio:
        previewRatio,

      display_order:
        nextDisplayOrder,
    });

  if (error) {
    console.error(
      "카테고리 등록 오류:",
      error,
    );

    redirect(
      `/admin/categories?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidateCategoryPages();

  redirect(
    "/admin/categories?success=created",
  );
}

export async function updateCategory(
  categoryId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const name = String(
    formData.get("name") ?? "",
  ).trim();

  const inputSlug = String(
    formData.get("slug") ?? "",
  ).trim();

  const description = String(
    formData.get("description") ?? "",
  ).trim();

  const color = String(
    formData.get("color") ?? "#94b63f",
  ).trim();

  const previewRatio =
    getPreviewRatio(formData);

  if (!categoryId) {
    redirect(
      "/admin/categories?error=category-id-required",
    );
  }

  if (!name) {
    redirect(
      "/admin/categories?error=name-required",
    );
  }

  const slug =
    createSlug(inputSlug || name);

  if (!slug) {
    redirect(
      "/admin/categories?error=slug-required",
    );
  }

  const {
    error,
  } = await supabase
    .from("categories")
    .update({
      name,
      slug,

      description:
        description || null,

      color:
        color || "#94b63f",

      preview_ratio:
        previewRatio,
    })
    .eq("id", categoryId);

  if (error) {
    console.error(
      "카테고리 수정 오류:",
      error,
    );

    redirect(
      `/admin/categories?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidateCategoryPages();

  redirect(
    "/admin/categories?success=updated",
  );
}

export async function updateCategoryOrder(
  categories: {
    id: string;
    display_order: number;
  }[],
) {
  const supabase = await createClient();

  if (!categories.length) {
    return;
  }

  const results = await Promise.all(
    categories.map((category) =>
      supabase
        .from("categories")
        .update({
          display_order:
            category.display_order,
        })
        .eq("id", category.id),
    ),
  );

  const failedResult = results.find(
    (result) => result.error,
  );

  if (failedResult?.error) {
    throw new Error(
      failedResult.error.message,
    );
  }

  revalidateCategoryPages();
}

export async function deleteCategory(
  categoryId: string,
) {
  const supabase = await createClient();

  if (!categoryId) {
    redirect(
      "/admin/categories?error=category-id-required",
    );
  }

  const {
    count: connectedProjectCount,
    error: projectCountError,
  } = await supabase
    .from("projects")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("category_id", categoryId);

  if (projectCountError) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        projectCountError.message,
      )}`,
    );
  }

  if (
    (connectedProjectCount ?? 0) > 0
  ) {
    redirect(
      "/admin/categories?error=category-in-use",
    );
  }

  const {
    error: deleteError,
  } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (deleteError) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        deleteError.message,
      )}`,
    );
  }

  revalidateCategoryPages();

  redirect(
    "/admin/categories?success=deleted",
  );
}