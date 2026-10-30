import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { type FranchiseWork, UUID_PATTERN } from "./config";

// Explicit public filtering remains in place even for a signed-in administrator.
export const getFranchiseWorks = cache(async (): Promise<FranchiseWork[]> => {
  const supabase = await createClient();
  const works: FranchiseWork[] = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await supabase.from("franchise_works").select("*")
      .eq("status", "published").order("display_order").order("id").range(offset, offset + pageSize - 1);
    if (error) {
      // The home page continues to work before the one-time SQL setup is run.
      console.error("프랜차이즈 작업 조회 실패:", error.code);
      return [];
    }
    works.push(...(data ?? []) as FranchiseWork[]);
    if ((data?.length ?? 0) < pageSize) break;
  }
  return works;
});

export const getFranchiseWork = cache(async (id: string): Promise<FranchiseWork | null> => {
  if (!UUID_PATTERN.test(id)) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("franchise_works").select("*").eq("id", id).eq("status", "published").maybeSingle();
  if (error) throw new Error("작업 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
  return data as FranchiseWork | null;
});
