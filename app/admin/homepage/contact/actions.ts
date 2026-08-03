"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ContactContentActionState = {
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

export async function updateContactContent(
  _previousState: ContactContentActionState,
  formData: FormData,
): Promise<ContactContentActionState> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "로그인이 만료되었습니다. 다시 로그인해 주세요.",
    };
  }

  const content = {
    eyebrow: getText(
      formData,
      "eyebrow",
      "START A PROJECT",
    ),
    english_title: getText(
      formData,
      "english_title",
      "Let's make it memorable.",
    ),
    title_line_1: getText(
      formData,
      "title_line_1",
      "당신의 브랜드는",
    ),
    title_line_2: getText(
      formData,
      "title_line_2",
      "어떤 기억으로 남고 있나요?",
    ),
    description_1: getText(
      formData,
      "description_1",
    ),
    description_2: getText(
      formData,
      "description_2",
    ),

    kakao_label: getText(
      formData,
      "kakao_label",
      "KAKAO CHANNEL",
    ),
    kakao_title: getText(
      formData,
      "kakao_title",
      "카카오채널로 상담하기",
    ),
    kakao_description: getText(
      formData,
      "kakao_description",
    ),

    inquiry_label: getText(
      formData,
      "inquiry_label",
      "PROJECT INQUIRY",
    ),
    inquiry_title: getText(
      formData,
      "inquiry_title",
      "프로젝트 문의 남기기",
    ),
    inquiry_description: getText(
      formData,
      "inquiry_description",
    ),

    bottom_label: getText(
      formData,
      "bottom_label",
      "LET'S WORK TOGETHER",
    ),
    bottom_title_line_1: getText(
      formData,
      "bottom_title_line_1",
      "함께 만들 이야기가",
    ),
    bottom_title_line_2: getText(
      formData,
      "bottom_title_line_2",
      "있다면, 들려주세요.",
    ),
  };

  const { error } = await supabase
    .from("homepage_sections")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("section_key", "contact");

  if (error) {
    console.error("문의 콘텐츠 저장 오류:", error);

    return {
      success: false,
      message: `저장에 실패했습니다: ${error.message}`,
    };
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/admin/homepage/contact");
  revalidatePath("/");
  revalidatePath("/contact");

  return {
    success: true,
    message: "문의 영역 콘텐츠가 저장되었습니다.",
  };
}