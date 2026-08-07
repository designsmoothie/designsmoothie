import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

function getFormText(
  formData: FormData,
  name: string,
) {
  const value = formData.get(name);

  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(
  request: Request,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "로그인이 필요합니다.",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const formData =
      await request.formData();

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
      getFormText(
        formData,
        "projectType",
      ) || "design";

    const previewType =
      getFormText(
        formData,
        "previewType",
      ) || "image";

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
      return NextResponse.json(
        {
          message:
            "프로젝트명, 슬러그, 카테고리는 필수입니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        {
          message:
            "슬러그는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      projectType !== "design" &&
      projectType !== "website"
    ) {
      return NextResponse.json(
        {
          message:
            "프로젝트 유형이 올바르지 않습니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      previewType !== "image" &&
      previewType !== "live"
    ) {
      return NextResponse.json(
        {
          message:
            "미리보기 방식이 올바르지 않습니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      projectType === "website" &&
      previewType === "live" &&
      !liveUrl
    ) {
      return NextResponse.json(
        {
          message:
            "라이브 사이트 주소를 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    if (liveUrl) {
      try {
        const parsedUrl =
          new URL(liveUrl);

        if (
          parsedUrl.protocol !== "http:" &&
          parsedUrl.protocol !== "https:"
        ) {
          throw new Error(
            "지원하지 않는 주소 형식입니다.",
          );
        }
      } catch {
        return NextResponse.json(
          {
            message:
              "라이브 사이트 주소 형식이 올바르지 않습니다.",
          },
          {
            status: 400,
          },
        );
      }
    }

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

      return NextResponse.json(
        {
          message:
            "프로젝트 순서를 계산하지 못했습니다.",
        },
        {
          status: 500,
        },
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
      error: createError,
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

        project_type:
          projectType,

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

    if (
      createError ||
      !createdProject
    ) {
      console.error(
        "프로젝트 생성 실패:",
        createError,
      );

      if (
        createError?.code === "23505"
      ) {
        return NextResponse.json(
          {
            message:
              "이미 사용 중인 슬러그입니다. 다른 슬러그를 입력해주세요.",
          },
          {
            status: 409,
          },
        );
      }

      return NextResponse.json(
        {
          message:
            createError?.message ??
            "프로젝트를 생성하지 못했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      projectId: createdProject.id,
    });
  } catch (error) {
    console.error(
      "새 프로젝트 API 오류:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "프로젝트 생성 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}