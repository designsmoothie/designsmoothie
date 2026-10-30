"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { findFranchiseCategory, FRANCHISE_BUCKET, UUID_PATTERN, type FranchiseWork, type FranchiseMedia } from "@/lib/franchise/config";

async function adminClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 만료되었습니다. 다시 로그인해 주세요.");
  const { data, error } = await supabase.rpc("is_franchise_admin");
  if (error || data !== true) throw new Error("프랜차이즈 관리 권한이 없습니다. SQL 설정과 관리자 이메일을 확인해 주세요.");
  return supabase;
}
function refresh() {
  revalidatePath("/");
  revalidatePath("/franchise", "layout");
  revalidatePath("/admin/franchise");
  revalidatePath("/sitemap.xml");
}
function validate(input: FranchiseWork): FranchiseMedia[] {
  if (!UUID_PATTERN.test(input.id) || !findFranchiseCategory(input.category)) throw new Error("품목 정보가 올바르지 않습니다.");
  if (typeof input.title !== "string" || !input.title.trim() || input.title.length > 150) throw new Error("작업 제목은 1~150자로 입력해 주세요.");
  if (typeof input.client !== "string" || input.client.length > 150 || typeof input.description !== "string" || input.description.length > 5000) throw new Error("업체명 또는 설명이 너무 깁니다.");
  if (!["draft", "published"].includes(input.status) || typeof input.featured !== "boolean" || !Number.isInteger(input.display_order) || input.display_order < 0 || input.display_order > 1000000) throw new Error("공개 상태 또는 노출 순서를 확인해 주세요.");
  if (!Array.isArray(input.media) || input.media.length > 50) throw new Error("파일은 작업당 최대 50개까지 등록할 수 있습니다.");
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, "")}/storage/v1/object/public/${FRANCHISE_BUCKET}/`;
  const ids = new Set<string>();
  const paths = new Set<string>();
  const media = input.media.map((item) => {
    if (!item || !UUID_PATTERN.test(item.id) || ids.has(item.id) || paths.has(item.path) || !["image", "video"].includes(item.type) || typeof item.path !== "string") throw new Error("파일 정보가 올바르지 않습니다.");
    const extension = item.type === "video" ? "(mp4|webm)" : "(jpg|png|webp)";
    const pattern = new RegExp(`^${input.id}/${item.id}\\.${extension}$`, "i");
    if (!pattern.test(item.path) || item.url !== `${base}${item.path}` || typeof item.alt !== "string" || item.alt.length > 200) throw new Error("업로드한 파일만 등록할 수 있습니다. 파일 설명은 200자 이내로 입력해 주세요.");
    ids.add(item.id); paths.add(item.path);
    return { id: item.id, type: item.type, path: item.path, url: item.url, alt: item.alt.trim() };
  });
  if (input.thumbnail_id && !media.some((item) => item.id === input.thumbnail_id && item.type === "image")) throw new Error("대표 이미지를 다시 지정해 주세요.");
  if (input.status === "published") {
    if (!media.length || !input.thumbnail_id) throw new Error("공개하려면 파일과 대표 이미지가 필요합니다.");
    if (input.category === "digital-menu" && !media.some((item) => item.type === "video")) throw new Error("디지털 메뉴판을 공개하려면 영상을 등록해 주세요.");
  }
  return media;
}
export async function saveFranchiseWork(input: FranchiseWork, isNew: boolean) {
  try {
    const supabase = await adminClient();
    const media = validate(input);
    const { data: previous, error: readError } = await supabase.from("franchise_works").select("*").eq("id", input.id).maybeSingle();
    if (readError) throw readError;
    if (isNew && previous) throw new Error("이미 생성된 작업입니다. 목록을 새로고침해 주세요.");
    if (!isNew && !previous) throw new Error("작업이 삭제되었거나 찾을 수 없습니다.");
    const payload = { id: input.id, title: input.title.trim(), category: input.category, client: input.client.trim(), description: input.description.trim(), media, thumbnail_id: input.thumbnail_id || null, status: input.status, featured: input.featured, display_order: input.display_order };
    const query = isNew ? supabase.from("franchise_works").insert(payload) : supabase.from("franchise_works").update(payload).eq("id", input.id).eq("updated_at", input.updated_at);
    const { data, error } = await query.select("*").single();
    if (error || !data) throw new Error(error?.code === "PGRST116" ? "다른 화면에서 수정되었습니다. 새로고침 후 다시 수정해 주세요." : `저장하지 못했습니다: ${error?.message ?? "응답 없음"}`);
    const removed = ((previous?.media ?? []) as FranchiseMedia[]).filter((item) => !media.some((next) => next.path === item.path)).map((item) => item.path);
    let warning = "";
    if (removed.length) {
      const result = await supabase.storage.from(FRANCHISE_BUCKET).remove(removed);
      if (result.error) warning = " 작업은 저장됐지만 제외한 원본 파일 정리에 실패했습니다.";
    }
    refresh();
    return { ok: true as const, work: data as FranchiseWork, message: `저장 완료 · ${input.status === "published" ? "공개" : "비공개"} 상태입니다.${warning}` };
  } catch (error) { return { ok: false as const, message: error instanceof Error ? error.message : "저장 중 오류가 발생했습니다." }; }
}
export async function deleteFranchiseWork(id: string, updatedAt: string) {
  try {
    if (!UUID_PATTERN.test(id)) throw new Error("작업 정보가 올바르지 않습니다.");
    const supabase = await adminClient();
    const { data, error } = await supabase.from("franchise_works").delete().eq("id", id).eq("updated_at", updatedAt).select("media").single();
    if (error || !data) throw new Error("삭제하지 못했습니다. 다른 화면에서 변경됐을 수 있으니 새로고침해 주세요.");
    const paths = (data.media as FranchiseMedia[]).map((item) => item.path);
    let warning = "";
    if (paths.length) {
      const result = await supabase.storage.from(FRANCHISE_BUCKET).remove(paths);
      if (result.error) warning = " 원본 파일 정리에 실패했지만 공개 페이지에서는 제거되었습니다.";
    }
    refresh();
    return { ok: true as const, message: `삭제되었습니다.${warning}` };
  } catch (error) { return { ok: false as const, message: error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다." }; }
}
