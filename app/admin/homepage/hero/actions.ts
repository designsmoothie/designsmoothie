"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type HeroContentActionState = {
  success: boolean;
  message: string;
};

function getText(
  formData: FormData,
  key: string,
  fallback = "",
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim();
}

export async function updateHeroContent(
  _previousState: HeroContentActionState,
  formData: FormData,
): Promise<HeroContentActionState> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message:
        "로그인이 만료되었습니다. 다시 로그인해 주세요.",
    };
  }

  const content = {
    eyebrow: getText(
      formData,
      "eyebrow",
      "DESIGN SMOOTHIE",
    ),

    service_label: getText(
      formData,
      "service_label",
      "BRANDING · SIGNAGE · SPACE GRAPHIC",
    ),

    title_line_1: getText(
      formData,
      "title_line_1",
      "Design that stays.",
    ),

    title_line_2: getText(
      formData,
      "title_line_2",
      "Not just looks.",
    ),

    lead_text: getText(
      formData,
      "lead_text",
      `브랜딩부터 간판까지,
오래 기억되는 브랜드 경험을 만듭니다.`,
    ),

    description: getText(
      formData,
      "description",
      `로고와 그래픽에 머무르지 않고,
브랜드가 실제 공간에서 어떻게 보이고
기억되는지까지 설계합니다.`,
    ),

    primary_button_label: getText(
      formData,
      "primary_button_label",
      "포트폴리오 보기",
    ),

    primary_button_url: getText(
      formData,
      "primary_button_url",
      "/portfolio",
    ),

    secondary_button_label: getText(
      formData,
      "secondary_button_label",
      "프로젝트 문의",
    ),

    secondary_button_url: getText(
      formData,
      "secondary_button_url",
      "/contact",
    ),

    image_url: getText(
      formData,
      "image_url",
      "/images/hero/signage.jpg",
    ),

    image_alt: getText(
      formData,
      "image_alt",
      "디자인스무디 사이니지 프로젝트",
    ),

    project_label: getText(
      formData,
      "project_label",
      "SELECTED PROJECT",
    ),

    project_title: getText(
      formData,
      "project_title",
      "Signage & Brand Experience",
    ),

    project_location: getText(
      formData,
      "project_location",
      "BUSAN · KOREA",
    ),
  };

  const { error } = await supabase
    .from("homepage_sections")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("section_key", "hero");

  if (error) {
    console.error(
      "Hero 콘텐츠 저장 오류:",
      error,
    );

    return {
      success: false,
      message: `저장에 실패했습니다: ${error.message}`,
    };
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/");

  return {
    success: true,
    message:
      "Hero 영역 콘텐츠가 저장되었습니다.",
  };
}