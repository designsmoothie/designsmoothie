"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/* ─────────────────────────────────────
   공통
───────────────────────────────────── */

function getFormText(
  formData: FormData,
  name: string,
) {
  const value = formData.get(name);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function getProjectType(formData: FormData) {
  const value = getFormText(
    formData,
    "projectType",
  );

  return value === "website"
    ? "website"
    : "design";
}

function getPreviewType(formData: FormData) {
  const value = getFormText(
    formData,
    "previewType",
  );

  return value === "live"
    ? "live"
    : "image";
}

/* ─────────────────────────────────────
   프로젝트 생성
───────────────────────────────────── */

export async function createProject(
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const title = getFormText(
    formData,
    "title",
  );

  const slug = getFormText(
    formData,
    "slug",
  );

  const categoryId = getFormText(
    formData,
    "categoryId",
  );

  const status =
    getFormText(formData, "status") ||
    "draft";

  const projectType =
    getProjectType(formData);

  const previewType =
    getPreviewType(formData);

  const liveUrl =
    getFormText(
      formData,
      "liveUrl",
    ) || null;

  const previewFallbackUrl =
    getFormText(
      formData,
      "previewFallbackUrl",
    ) || null;

  if (!title || !slug || !categoryId) {
    throw new Error(
      "프로젝트명, 슬러그, 카테고리는 필수입니다.",
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(
      "슬러그는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.",
    );
  }

  if (
    projectType === "website" &&
    previewType === "live" &&
    !liveUrl
  ) {
    throw new Error(
      "라이브 웹사이트 미리보기를 사용하려면 웹사이트 주소가 필요합니다.",
    );
  }

  /*
   * 현재 가장 마지막 프로젝트의
   * display_order를 확인해서
   * 새 프로젝트를 목록 마지막에 배치합니다.
   */
  const {
    data: lastProject,
    error: orderError,
  } = await supabase
    .from("projects")
    .select("display_order")
    .order("display_order", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (orderError) {
    console.error(
      "프로젝트 순서 조회 실패:",
      orderError,
    );

    throw new Error(
      "프로젝트 순서를 계산하지 못했습니다.",
    );
  }

  const nextDisplayOrder =
    (lastProject?.display_order ?? -1) +
    1;

  const services = getFormText(
    formData,
    "services",
  )
    .split("\n")
    .map((service) => service.trim())
    .filter(Boolean);

  const {
    data: createdProject,
    error,
  } = await supabase
    .from("projects")
    .insert({
      category_id: categoryId,

      title,
      slug,

      subtitle: getFormText(
        formData,
        "subtitle",
      ),

      client: getFormText(
        formData,
        "client",
      ),

      year: getFormText(
        formData,
        "year",
      ),

      location: getFormText(
        formData,
        "location",
      ),

      industry: getFormText(
        formData,
        "industry",
      ),

      /*
       * 웹 포트폴리오
       */
      project_type: projectType,

      preview_type:
        projectType === "website"
          ? previewType
          : "image",

      live_url:
        projectType === "website"
          ? liveUrl
          : null,

      preview_fallback_url:
        previewFallbackUrl,

      services,

      summary: getFormText(
        formData,
        "summary",
      ),

      overview_title:
        getFormText(
          formData,
          "overviewTitle",
        ) || "작업 배경",

      overview: getFormText(
        formData,
        "overview",
      ),

      challenge:
        getFormText(
          formData,
          "challenge",
        ) || null,

      solution:
        getFormText(
          formData,
          "solution",
        ) || null,

      result:
        getFormText(
          formData,
          "result",
        ) || null,

      status,

      featured:
        formData.get("featured") ===
        "on",

      display_order:
        nextDisplayOrder,

      published_at:
        status === "published"
          ? new Date().toISOString()
          : null,

      seo_title:
        getFormText(
          formData,
          "seoTitle",
        ) || null,

      seo_description:
        getFormText(
          formData,
          "seoDescription",
        ) || null,
    })
    .select("id")
    .single();

  if (error || !createdProject) {
    console.error(
      "프로젝트 등록 실패 상세:",
      error,
    );

    if (error?.code === "23505") {
      throw new Error(
        "이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.",
      );
    }

    throw new Error(
      `프로젝트를 저장하지 못했습니다${
        error?.message
          ? `: ${error.message}`
          : "."
      }`,
    );
  }

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath("/");

  /*
   * 프로젝트 ID가 만들어졌으므로
   * 수정 화면으로 이동합니다.
   */
  redirect(
    `/admin/projects/${createdProject.id}/edit`,
  );
}

/* ─────────────────────────────────────
   프로젝트 수정
───────────────────────────────────── */

export async function updateProject(
  projectId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const title = getFormText(
    formData,
    "title",
  );

  const slug = getFormText(
    formData,
    "slug",
  );

  const categoryId = getFormText(
    formData,
    "categoryId",
  );

  const status =
    getFormText(formData, "status") ||
    "draft";

  const projectType =
    getProjectType(formData);

  const previewType =
    getPreviewType(formData);

  const liveUrl =
    getFormText(
      formData,
      "liveUrl",
    ) || null;

  const previewFallbackUrl =
    getFormText(
      formData,
      "previewFallbackUrl",
    ) || null;

  if (
    !projectId ||
    !title ||
    !slug ||
    !categoryId
  ) {
    throw new Error(
      "프로젝트명, 슬러그, 카테고리는 필수입니다.",
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(
      "슬러그는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.",
    );
  }

  if (
    projectType === "website" &&
    previewType === "live" &&
    !liveUrl
  ) {
    throw new Error(
      "라이브 웹사이트 미리보기를 사용하려면 웹사이트 주소가 필요합니다.",
    );
  }

  /*
   * 현재 공개일을 조회합니다.
   * 이미 공개된 글을 다시 저장할 때
   * 공개일이 계속 바뀌는 것을 막습니다.
   */
  const {
    data: currentProject,
    error: currentProjectError,
  } = await supabase
    .from("projects")
    .select("published_at")
    .eq("id", projectId)
    .single();

  if (
    currentProjectError ||
    !currentProject
  ) {
    console.error(
      "기존 프로젝트 조회 실패:",
      currentProjectError,
    );

    throw new Error(
      "수정할 프로젝트를 확인하지 못했습니다.",
    );
  }

  const publishedAt =
    status === "published"
      ? currentProject.published_at ??
        new Date().toISOString()
      : null;

  const services = getFormText(
    formData,
    "services",
  )
    .split("\n")
    .map((service) => service.trim())
    .filter(Boolean);

  /*
   * 수정 기능이므로 insert가 아닌
   * update를 사용합니다.
   * display_order는 유지합니다.
   */
  const { error } = await supabase
    .from("projects")
    .update({
      category_id: categoryId,

      title,
      slug,

      subtitle: getFormText(
        formData,
        "subtitle",
      ),

      client: getFormText(
        formData,
        "client",
      ),

      year: getFormText(
        formData,
        "year",
      ),

      location: getFormText(
        formData,
        "location",
      ),

      industry: getFormText(
        formData,
        "industry",
      ),

      /*
       * 웹 포트폴리오
       */
      project_type: projectType,

      preview_type:
        projectType === "website"
          ? previewType
          : "image",

      live_url:
        projectType === "website"
          ? liveUrl
          : null,

      preview_fallback_url:
        previewFallbackUrl,

      services,

      summary: getFormText(
        formData,
        "summary",
      ),

      overview_title:
        getFormText(
          formData,
          "overviewTitle",
        ) || "작업 배경",

      overview: getFormText(
        formData,
        "overview",
      ),

      challenge:
        getFormText(
          formData,
          "challenge",
        ) || null,

      solution:
        getFormText(
          formData,
          "solution",
        ) || null,

      result:
        getFormText(
          formData,
          "result",
        ) || null,

      status,

      featured:
        formData.get("featured") ===
        "on",

      published_at: publishedAt,

      seo_title:
        getFormText(
          formData,
          "seoTitle",
        ) || null,

      seo_description:
        getFormText(
          formData,
          "seoDescription",
        ) || null,

      updated_at:
        new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    console.error(
      "프로젝트 수정 실패 상세:",
      {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
    );

    if (error.code === "23505") {
      throw new Error(
        "이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.",
      );
    }

    throw new Error(
      `프로젝트를 수정하지 못했습니다: ${error.message}`,
    );
  }

  /*
   * 관리자 + 실제 홈페이지 모두 갱신
   */
  revalidatePath(
    "/admin/projects",
  );

  revalidatePath(
    `/admin/projects/${projectId}/edit`,
  );

  revalidatePath("/");
  revalidatePath("/portfolio");

  revalidatePath(
    `/portfolio/${slug}`,
  );

  revalidatePath(
    `/portfolio/project/${slug}`,
  );

  redirect("/admin/projects");
}

/* ─────────────────────────────────────
   프로젝트 삭제
───────────────────────────────────── */

export async function deleteProject(
  projectId: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!projectId) {
    throw new Error(
      "삭제할 프로젝트가 없습니다.",
    );
  }

  /*
   * 연결된 Storage 파일 경로 조회
   */
  const {
    data: projectImages,
    error: imagesError,
  } = await supabase
    .from("project_images")
    .select("storage_path")
    .eq("project_id", projectId);

  if (imagesError) {
    console.error(
      "프로젝트 이미지 조회 실패:",
      imagesError,
    );

    throw new Error(
      "프로젝트 이미지를 확인하지 못했습니다.",
    );
  }

  const storagePaths =
    (projectImages ?? [])
      .map(
        (image) =>
          image.storage_path,
      )
      .filter(
        (path): path is string =>
          typeof path === "string" &&
          path.length > 0,
      );

  /*
   * Storage 실제 파일 삭제
   */
  if (storagePaths.length > 0) {
    const { error: storageError } =
      await supabase.storage
        .from("projects")
        .remove(storagePaths);

    if (storageError) {
      console.error(
        "프로젝트 Storage 삭제 실패:",
        storageError,
      );

      throw new Error(
        "프로젝트 이미지 파일을 삭제하지 못했습니다.",
      );
    }
  }

  /*
   * project_images는 ON DELETE CASCADE를
   * 사용하므로 프로젝트 행 삭제 시 함께 삭제됩니다.
   */
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    console.error(
      "프로젝트 삭제 실패:",
      error,
    );

    throw new Error(
      "프로젝트를 삭제하지 못했습니다.",
    );
  }

  revalidatePath(
    "/admin/projects",
  );

  revalidatePath("/");
  revalidatePath("/portfolio");

  redirect("/admin/projects");
}

/* ─────────────────────────────────────
   대표 이미지 지정
───────────────────────────────────── */

export async function setThumbnail(
  projectId: string,
  imageId: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!projectId || !imageId) {
    throw new Error(
      "대표 이미지 정보가 없습니다.",
    );
  }

  /*
   * 선택한 이미지가 해당 프로젝트의
   * 이미지인지 확인합니다.
   */
  const {
    data: selectedImage,
    error: selectedImageError,
  } = await supabase
    .from("project_images")
    .select("id, public_url")
    .eq("id", imageId)
    .eq("project_id", projectId)
    .single();

  if (
    selectedImageError ||
    !selectedImage
  ) {
    console.error(
      "대표 이미지 조회 실패:",
      selectedImageError,
    );

    throw new Error(
      "선택한 이미지를 확인하지 못했습니다.",
    );
  }

  /*
   * 기존 대표 이미지 표시 모두 해제
   */
  const { error: resetError } =
    await supabase
      .from("project_images")
      .update({
        is_thumbnail: false,
      })
      .eq("project_id", projectId);

  if (resetError) {
    console.error(
      "기존 대표 이미지 해제 실패:",
      resetError,
    );

    throw new Error(
      "기존 대표 이미지 설정을 해제하지 못했습니다.",
    );
  }

  /*
   * 선택한 이미지를 대표 이미지로 지정
   */
  const { error: thumbnailError } =
    await supabase
      .from("project_images")
      .update({
        is_thumbnail: true,
      })
      .eq("id", imageId)
      .eq("project_id", projectId);

  if (thumbnailError) {
    console.error(
      "대표 이미지 지정 실패:",
      thumbnailError,
    );

    throw new Error(
      "대표 이미지를 지정하지 못했습니다.",
    );
  }

  /*
   * projects.thumbnail_url도 함께 갱신
   */
  const { error: projectError } =
    await supabase
      .from("projects")
      .update({
        thumbnail_url:
          selectedImage.public_url,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", projectId);

  if (projectError) {
    console.error(
      "프로젝트 썸네일 URL 저장 실패:",
      projectError,
    );

    throw new Error(
      "대표 이미지 URL을 프로젝트에 저장하지 못했습니다.",
    );
  }

  revalidatePath(
    "/admin/projects",
  );

  revalidatePath(
    `/admin/projects/${projectId}/edit`,
  );

  revalidatePath("/");
  revalidatePath("/portfolio");
}

/* ─────────────────────────────────────
   프로젝트 노출 순서 변경
───────────────────────────────────── */

export async function updateProjectOrder(
  orders: {
    id: string;
    display_order: number;
  }[],
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!Array.isArray(orders)) {
    throw new Error(
      "프로젝트 순서 정보가 올바르지 않습니다.",
    );
  }

  for (const item of orders) {
    const { error } = await supabase
      .from("projects")
      .update({
        display_order:
          item.display_order,
      })
      .eq("id", item.id);

    if (error) {
      console.error(
        "프로젝트 순서 저장 실패:",
        error,
      );

      throw new Error(
        "프로젝트 순서를 저장하지 못했습니다.",
      );
    }
  }

  revalidatePath(
    "/admin/projects",
  );

  revalidatePath("/");
  revalidatePath("/portfolio");
}

/* ─────────────────────────────────────
   프로젝트 이미지 순서 변경
───────────────────────────────────── */

export async function updateProjectImageOrder(
  projectId: string,
  orders: {
    id: string;
    sort_order: number;
  }[],
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (
    !projectId ||
    !Array.isArray(orders)
  ) {
    throw new Error(
      "이미지 순서 정보가 올바르지 않습니다.",
    );
  }

  for (const item of orders) {
    const { error } = await supabase
      .from("project_images")
      .update({
        sort_order:
          item.sort_order,
      })
      .eq("id", item.id)
      .eq(
        "project_id",
        projectId,
      );

    if (error) {
      console.error(
        "이미지 순서 저장 실패:",
        error,
      );

      throw new Error(
        "이미지 순서를 저장하지 못했습니다.",
      );
    }
  }

  revalidatePath(
    `/admin/projects/${projectId}/edit`,
  );

  revalidatePath("/");
  revalidatePath("/portfolio");
}

/* ─────────────────────────────────────
   카테고리 순서 변경
───────────────────────────────────── */

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

  const results =
    await Promise.all(
      categories.map(
        (category) =>
          supabase
            .from("categories")
            .update({
              display_order:
                category.display_order,
            })
            .eq(
              "id",
              category.id,
            ),
      ),
    );

  const failedResult =
    results.find(
      (result) =>
        result.error,
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

  revalidatePath("/");

  revalidatePath(
    "/portfolio",
  );

  revalidatePath(
    "/portfolio/category",
    "layout",
  );
}