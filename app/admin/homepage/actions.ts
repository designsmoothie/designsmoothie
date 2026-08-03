"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type HomepageActionState = {
  success: boolean;
  message: string;
};

export async function toggleHomepageSection(
  sectionId: string,
  nextActiveState: boolean,
): Promise<HomepageActionState> {
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

  const { error } = await supabase
    .from("homepage_sections")
    .update({
      is_active: nextActiveState,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sectionId);

  if (error) {
    console.error(
      "홈페이지 섹션 상태 변경 오류:",
      error,
    );

    return {
      success: false,
      message: `상태 변경에 실패했습니다: ${error.message}`,
    };
  }

  revalidatePath("/admin/homepage");
  revalidatePath("/");

  return {
    success: true,
    message: nextActiveState
      ? "섹션이 홈페이지에 표시됩니다."
      : "섹션이 홈페이지에서 숨겨졌습니다.",
  };
}