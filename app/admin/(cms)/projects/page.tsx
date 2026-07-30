import Link from "next/link";

import {
  createClient,
} from "@/lib/supabase/server";
import ProjectSortableList from "./ProjectSortableList";
import type {
  AdminProject,
} from "./SortableProjectRow";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const {
    data: projects,
    error,
  } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      status,
      featured,
      thumbnail_url,
      updated_at,
      display_order,
      categories (
        name
      )
    `)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "프로젝트 목록 불러오기 실패:",
      error,
    );

    return (
      <main className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">
          Projects
        </h1>

        <p className="mt-6 rounded-xl bg-red-50 p-5 text-sm text-red-700">
          프로젝트 목록을 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  const normalizedProjects: AdminProject[] =
    (projects ?? []).map((project) => {
      const category = Array.isArray(
        project.categories,
      )
        ? project.categories[0]
        : project.categories;

      return {
        id: project.id,
        title: project.title,
        slug: project.slug,
        status: project.status,
        featured: project.featured,
        thumbnail_url:
          project.thumbnail_url ?? null,
        updated_at: project.updated_at,
        display_order:
          project.display_order ?? 0,
        categoryName:
          category?.name ?? "카테고리 없음",
      };
    });

  return (
    <main className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            DesignSmoothie CMS
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
            Projects
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            프로젝트를 등록하고 노출 순서를 관리합니다.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          새 프로젝트
        </Link>
      </div>

      {normalizedProjects.length === 0 ? (
        <section className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-2xl bg-white px-6 text-center shadow-sm">
          <p className="text-lg font-semibold">
            등록된 프로젝트가 없습니다.
          </p>

          <Link
            href="/admin/projects/new"
            className="mt-6 rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold"
          >
            첫 프로젝트 등록하기
          </Link>
        </section>
      ) : (
        <ProjectSortableList
          initialProjects={
            normalizedProjects
          }
        />
      )}
    </main>
  );
}