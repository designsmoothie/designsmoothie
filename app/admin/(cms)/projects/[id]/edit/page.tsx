import DeleteProjectButton from "./DeleteProjectButton";
import ProjectImageUploader from "./ProjectImageUploader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  deleteProject,
  updateProject,
} from "../../actions";
import ProjectAiAssistant from "./ProjectAiAssistant";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const [
    { data: project, error: projectError },
    { data: categories, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single(),

    supabase
      .from("categories")
      .select("id, name")
      .eq("is_active", true)
      .order("sort_order", {
        ascending: true,
      }),
  ]);

  if (projectError || !project) {
    notFound();
  }

  if (categoriesError) {
    console.error(
      "카테고리 불러오기 실패:",
      categoriesError,
    );
  }

  const updateProjectWithId =
    updateProject.bind(null, id);

  const deleteProjectWithId =
    deleteProject.bind(null, id);

  const inputClass =
    "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#94b63f] focus:ring-4 focus:ring-[#94b63f]/10";

  const labelClass =
    "block text-sm font-semibold text-neutral-700";

  return (
    <main className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            Projects
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
            프로젝트 수정
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            {project.title}
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-sm font-medium text-neutral-500 hover:text-black"
        >
          ← 목록으로
        </Link>
      </div>

      <form
        action={updateProjectWithId}
        className="mt-8 space-y-6"
      >
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Basic information
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            기본 정보
          </h2>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <label className={labelClass}>
              프로젝트명 *
              <input
                name="title"
                required
                defaultValue={project.title}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              슬러그 *
              <input
                name="slug"
                required
                pattern="[a-z0-9-]+"
                defaultValue={project.slug}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              카테고리 *
              <select
                name="categoryId"
                required
                defaultValue={project.category_id}
                className={inputClass}
              >
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className={labelClass}>
              부제목
              <input
                name="subtitle"
                defaultValue={project.subtitle}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              클라이언트
              <input
                name="client"
                defaultValue={project.client}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              연도
              <input
                name="year"
                defaultValue={project.year}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              지역
              <input
                name="location"
                defaultValue={project.location}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              업종
              <input
                name="industry"
                defaultValue={project.industry}
                className={inputClass}
              />
            </label>

            <div className="grid gap-6 md:grid-cols-2">
  <label className={labelClass}>
    프로젝트 유형
    <select
      name="projectType"
      defaultValue={
        project.project_type ??
        "design"
      }
      className={inputClass}
    >
      <option value="design">
        디자인 프로젝트
      </option>

      <option value="website">
        웹사이트 프로젝트
      </option>
    </select>
  </label>

  <label className={labelClass}>
    미리보기 방식
    <select
      name="previewType"
      defaultValue={
        project.preview_type ??
        "image"
      }
      className={inputClass}
    >
      <option value="image">
        이미지
      </option>

      <option value="live">
        라이브 웹사이트
      </option>
    </select>
  </label>

  <label className="md:col-span-2">
    <span className={labelClass}>
      웹사이트 주소
    </span>

    <input
      name="liveUrl"
      defaultValue={
        project.live_url ?? ""
      }
      placeholder="https://example.com"
      className={inputClass}
    />
  </label>

  <label className="md:col-span-2">
    <span className={labelClass}>
      라이브 미리보기 실패 시 이미지
    </span>

    <input
      name="previewFallbackUrl"
      defaultValue={
        project.preview_fallback_url ??
        ""
      }
      className={inputClass}
    />
  </label>
</div>
          </div>
        </section>
        <ProjectImageUploader projectId={id} />
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Project story
          </p>

          <ProjectAiAssistant
  projectType={project.project_type}
  liveUrl={project.live_url}
/>

          <h2 className="mt-2 text-xl font-semibold">
            프로젝트 내용
          </h2>

          <div className="mt-7 space-y-6">
            <label className={labelClass}>
              제공 서비스
              <textarea
                name="services"
                rows={5}
                defaultValue={
                  project.services?.join("\n") ?? ""
                }
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              요약
              <textarea
                name="summary"
                rows={4}
                defaultValue={project.summary}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Overview 제목
              <input
                name="overviewTitle"
                defaultValue={project.overview_title}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Overview 내용
              <textarea
                name="overview"
                rows={6}
                defaultValue={project.overview}
                className={inputClass}
              />
            </label>

            <div className="grid gap-6 md:grid-cols-3">
              <label className={labelClass}>
                Challenge
                <textarea
                  name="challenge"
                  rows={7}
                  defaultValue={project.challenge ?? ""}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Solution
                <textarea
                  name="solution"
                  rows={7}
                  defaultValue={project.solution ?? ""}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Result
                <textarea
                  name="result"
                  rows={7}
                  defaultValue={project.result ?? ""}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Search engine
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            SEO
          </h2>

          <div className="mt-7 space-y-6">
            <label className={labelClass}>
              SEO 제목
              <input
                name="seoTitle"
                defaultValue={project.seo_title ?? ""}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              SEO 설명
              <textarea
                name="seoDescription"
                rows={4}
                defaultValue={
                  project.seo_description ?? ""
                }
                className={inputClass}
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold">
            공개 설정
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              상태
              <select
                name="status"
                defaultValue={project.status}
                className={inputClass}
              >
                <option value="draft">
                  작성 중
                </option>

                <option value="published">
                  공개
                </option>

                <option value="private">
                  비공개
                </option>

                <option value="archived">
                  보관
                </option>
              </select>
            </label>

            <label className="flex items-center gap-3 self-end rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-3">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project.featured}
                className="size-4 accent-[#94b63f]"
              />

              <span className="text-sm font-semibold">
                홈페이지 Featured 프로젝트
              </span>
            </label>
          </div>
        </section>

        <div className="flex flex-col-reverse justify-between gap-4 pb-10 sm:flex-row">
         <DeleteProjectButton action={deleteProjectWithId} />

          <div className="flex justify-end gap-3">
            <Link
              href="/admin/projects"
              className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold"
            >
              취소
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white"
            >
              변경사항 저장
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}