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

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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
  } = await supabase
    .from("categories")
    .select("display_order")
    .order("display_order", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  const nextDisplayOrder =
    (lastCategory?.display_order ?? 0) + 1;

  const {
    error,
  } = await supabase
    .from("categories")
    .insert({
      name,
      slug,
      description:
        description || null,
      color: color || "#94b63f",
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

  revalidatePath(
    "/admin/categories",
  );

  revalidatePath(
    "/portfolio",
  );

  revalidatePath(
    "/portfolio/category",
    "layout",
  );

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
    })
    .eq("id", categoryId);

  if (error) {
    redirect(
      `/admin/categories?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

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

  if ((connectedProjectCount ?? 0) > 0) {
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

  redirect(
    "/admin/categories?success=deleted",
  );
}