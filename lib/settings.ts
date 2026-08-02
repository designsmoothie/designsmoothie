import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/settings";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "사이트 설정을 불러오는 중 오류가 발생했습니다.",
      error,
    );

    return null;
  }

  return data as SiteSettings | null;
}