"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type SettingsActionState = {
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

export async function updateSiteSettings(
  _previousState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const supabase = await createClient();

  const {
    data: {
      user,
    },
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
      message: "사이트 설정 정보를 찾을 수 없습니다.",
    };
  }

  const settings = {
    brand_name: getTextValue(formData, "brand_name"),
    slogan: getTextValue(formData, "slogan"),

    ceo_name: getTextValue(formData, "ceo_name"),
    business_number: getTextValue(
      formData,
      "business_number",
    ),

    phone: getTextValue(formData, "phone"),
    email: getTextValue(formData, "email"),
    address: getTextValue(formData, "address"),

    kakao_url: getTextValue(formData, "kakao_url"),
    instagram_url: getTextValue(
      formData,
      "instagram_url",
    ),
    blog_url: getTextValue(formData, "blog_url"),

    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("site_settings")
    .update(settings)
    .eq("id", id);

  if (error) {
    console.error(
      "사이트 설정 저장 중 오류가 발생했습니다.",
      error,
    );

    return {
      success: false,
      message: `저장에 실패했습니다: ${error.message}`,
    };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/contact");

  return {
    success: true,
    message: "사이트 설정이 저장되었습니다.",
  };
}