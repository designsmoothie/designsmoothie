import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createProject } from "../actions";
import ProjectSlugFields from "./ProjectSlugFields";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("카테고리 불러오기 실패:", error);
  }

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
            새 프로젝트
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            프로젝트의 기본 내용을 먼저 등록합니다.
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-sm font-medium text-neutral-500 hover:text-black"
        >
          ← 목록으로
        </Link>
      </div>

      <form action={createProject} className="mt-8 space-y-6">
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
              Basic information
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              기본 정보
            </h2>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
           <ProjectSlugFields
  inputClass={inputClass}
  labelClass={labelClass}
/>

            <label className={labelClass}>
              카테고리 *
              <select
                name="categoryId"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  카테고리 선택
                </option>

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
                placeholder="예: Japanese Restaurant Identity"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              클라이언트
              <input
                name="client"
                placeholder="예: Kyuzen"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              연도
              <input
                name="year"
                placeholder="예: 2026"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              지역
              <input
                name="location"
                placeholder="예: Busan"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              업종
              <input
                name="industry"
                placeholder="예: Restaurant"
                className={inputClass}
              />
            </label>
          </div>
        </section>

<section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
    Project images
  </p>

  <h2 className="mt-2 text-xl font-semibold">
    프로젝트 이미지
  </h2>

  <p className="mt-2 text-sm text-neutral-500">
    기본 정보를 저장하면 이미지 업로드 화면으로
    자동 이동합니다.
  </p>

  <div className="mt-6 flex min-h-52 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-[#f8f6f1] px-6 text-center">
    <p className="text-base font-semibold text-neutral-500">
      먼저 프로젝트 기본 정보를 저장해주세요.
    </p>

    <p className="mt-2 text-sm text-neutral-400">
      저장 후 이미지 여러 장을 업로드하고 순서를
      변경할 수 있습니다.
    </p>
  </div>
</section>

        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Project story
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            프로젝트 내용
          </h2>

          <div className="mt-7 space-y-6">
            <label className={labelClass}>
              제공 서비스
              <textarea
                name="services"
                rows={5}
                placeholder={"Logo Design\nBrand Identity\nSignage Design"}
                className={inputClass}
              />
              <span className="mt-2 block text-xs font-normal text-neutral-400">
                서비스 하나당 한 줄씩 입력
              </span>
            </label>

            <label className={labelClass}>
              요약
              <textarea
                name="summary"
                rows={4}
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Overview 제목
              <input
                name="overviewTitle"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Overview 내용
              <textarea
                name="overview"
                rows={6}
                className={inputClass}
              />
            </label>

            <div className="grid gap-6 md:grid-cols-3">
              <label className={labelClass}>
                Challenge
                <textarea
                  name="challenge"
                  rows={7}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Solution
                <textarea
                  name="solution"
                  rows={7}
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                Result
                <textarea
                  name="result"
                  rows={7}
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
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              SEO 설명
              <textarea
                name="seoDescription"
                rows={4}
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
                defaultValue="draft"
                className={inputClass}
              >
                <option value="draft">작성 중</option>
                <option value="published">공개</option>
                <option value="private">비공개</option>
                <option value="archived">보관</option>
              </select>
            </label>

            <label className="flex items-center gap-3 self-end rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-3">
              <input
                type="checkbox"
                name="featured"
                className="size-4 accent-[#94b63f]"
              />

              <span className="text-sm font-semibold">
                홈페이지 Featured 프로젝트
              </span>
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3 pb-10">
          <Link
            href="/admin/projects"
            className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold"
          >
            취소
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            저장하고 이미지 등록
          </button>
        </div>
      </form>
    </main>
  );
}