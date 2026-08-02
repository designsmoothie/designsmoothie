"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type SeoActionState = {
  success: boolean;
  message: string;
};

function getTextValue(
  formData: FormData,
  key: string,
): string | null {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0
    ? trimmedValue
    : null;
}

export async function updateSeoSettings(
  _previousState: SeoActionState,
  formData: FormData,
): Promise<SeoActionState> {
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

  const id = getTextValue(formData, "id");

  if (!id) {
    return {
      success: false,
      message: "SEO 설정 정보를 찾을 수 없습니다.",
    };
  }

  const seoSettings = {
    site_title: getTextValue(formData, "site_title"),
    site_description: getTextValue(
      formData,
      "site_description",
    ),
    site_keywords: getTextValue(
      formData,
      "site_keywords",
    ),
    canonical_url: getTextValue(
      formData,
      "canonical_url",
    ),

    google_verification: getTextValue(
      formData,
      "google_verification",
    ),
    naver_verification: getTextValue(
      formData,
      "naver_verification",
    ),
    bing_verification: getTextValue(
      formData,
      "bing_verification",
    ),

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("site_settings")
    .update(seoSettings)
    .eq("id", id);

  if (error) {
    console.error(
      "SEO 설정 저장 중 오류가 발생했습니다.",
      error,
    );

    return {
      success: false,
      message: `저장에 실패했습니다: ${error.message}`,
    };
  }

  revalidatePath("/admin/seo");
  revalidatePath("/", "layout");

  return {
    success: true,
    message: "SEO 설정이 저장되었습니다.",
  };
}