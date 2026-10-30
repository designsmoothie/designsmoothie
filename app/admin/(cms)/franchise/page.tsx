import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { FranchiseWork } from "@/lib/franchise/config";
import FranchiseManager from "./FranchiseManager";
export const metadata: Metadata = { title: "프랜차이즈 제작물 관리", robots: { index: false, follow: false } };
export default async function FranchiseAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const access = await supabase.rpc("is_franchise_admin");
  if (access.error || access.data !== true) return <div className="mx-auto max-w-3xl p-8"><h1 className="text-2xl font-semibold">프랜차이즈 제작물 설정이 필요합니다.</h1><p className="mt-4">제공된 SQL 파일의 관리자 이메일을 현재 CMS 로그인 이메일로 바꾼 후 Supabase SQL Editor에서 실행해 주세요. 이미 설정했다면 등록된 관리자 계정으로 로그인해 주세요.</p></div>;
  const { data, error } = await supabase.from("franchise_works").select("*").order("display_order").order("id");
  if (error) return <div className="p-8" role="alert">작업 목록을 불러오지 못했습니다. SQL 설정과 연결 상태를 확인한 후 새로고침해 주세요.</div>;
  return <FranchiseManager initialWorks={(data ?? []) as FranchiseWork[]} />;
}
