import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import NewProjectForm from "./NewProjectForm";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "카테고리 불러오기 실패:",
      error,
    );
  }

  return (
    <main className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            Projects
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
            새 프로젝트
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            사진을 먼저 등록하면 AI가 이미지를 분석해
            프로젝트 소개와 SEO 초안을 작성합니다.
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-sm font-medium text-neutral-500 transition hover:text-black"
        >
          ← 목록으로
        </Link>
      </div>

      <NewProjectForm
        categories={categories ?? []}
      />
    </main>
  );
}