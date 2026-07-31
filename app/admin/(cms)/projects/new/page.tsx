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
    "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#94b63f] focus:ring-4 focus:ring-[#94b63f]/10";

  const labelClass =
    "block text-sm font-semibold text-neutral-700";

  return (
    <main className="mx-auto max-w-5xl">
      {/* 페이지 상단 */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">
            Projects
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
            새 프로젝트
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            필요한 내용만 간단히 입력한 뒤 이미지를 등록합니다.
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="text-sm font-medium text-neutral-500 transition hover:text-black"
        >
          ← 목록으로
        </Link>
      </div>

      <form action={createProject} className="mt-8 space-y-6">
        {/* 기본 정보 */}
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Basic information
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            기본 정보
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            프로젝트명과 카테고리는 필수입니다.
          </p>

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
                  카테고리를 선택하세요
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
          </div>

          {/* 선택 정보 */}
          <details className="mt-7 overflow-hidden rounded-2xl border border-black/5 bg-[#f8f6f1]">
            <summary className="cursor-pointer list-none px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-neutral-700">
                    선택 정보
                  </p>

                  <p className="mt-1 text-xs font-normal text-neutral-400">
                    부제목, 클라이언트, 연도, 지역, 업종
                  </p>
                </div>

                <span className="shrink-0 text-xs font-semibold text-neutral-400">
                  펼치기
                </span>
              </div>
            </summary>

            <div className="grid gap-6 border-t border-black/5 bg-white p-5 md:grid-cols-2">
              <label className={labelClass}>
                부제목
                <input
                  name="subtitle"
                  placeholder="예: 간략한 설명을 입력해주세요"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                클라이언트
                <input
                  name="client"
                  placeholder="업체명 기재"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                제작 연도
                <input
                  name="year"
                  placeholder="제작년도 기재"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                지역
                <input
                  name="location"
                  placeholder="의뢰지역"
                  className={inputClass}
                />
              </label>

              <label className={labelClass}>
                업종
                <input
                  name="industry"
                  placeholder="업체 업종 기재"
                  className={inputClass}
                />
              </label>
            </div>
          </details>
        </section>

        {/* 프로젝트 소개 */}
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Project description
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            프로젝트 소개
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            고객이 포트폴리오 상세페이지에서 보게 될 소개글입니다.
          </p>

          <label className={`${labelClass} mt-7`}>
            소개 내용
            <textarea
              name="summary"
              rows={7}
              placeholder={
                "디자인 포인트 설명"
              }
              className={inputClass}
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-neutral-400">
              두세 문장 정도면 충분합니다. 비워둔 상태로도 저장할 수 있습니다.
            </span>
          </label>

          {/* 기존 DB 및 createProject 액션 호환용 */}
          <input type="hidden" name="services" value="" />
          <input type="hidden" name="overviewTitle" value="" />
          <input type="hidden" name="overview" value="" />
          <input type="hidden" name="challenge" value="" />
          <input type="hidden" name="solution" value="" />
          <input type="hidden" name="result" value="" />
        </section>

        {/* 프로젝트 이미지 안내 */}
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            Project images
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            프로젝트 이미지
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            프로젝트를 먼저 저장하면 이미지 등록 화면으로 이동합니다.
          </p>

          <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-[#f8f6f1] px-6 text-center">
            <p className="text-base font-semibold text-neutral-500">
              먼저 프로젝트를 저장해주세요.
            </p>

            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-400">
              저장 후 대표 이미지와 상세 이미지를 여러 장 업로드하고
              노출 순서를 변경할 수 있습니다.
            </p>
          </div>
        </section>

        {/* SEO */}
        <details className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
          <summary className="cursor-pointer list-none p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
              Search engine
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  SEO 설정
                </h2>

                <p className="mt-2 text-sm font-normal text-neutral-500">
                  검색 결과의 제목과 설명을 따로 지정할 때만 입력합니다.
                </p>
              </div>

              <span className="shrink-0 text-xs font-semibold text-neutral-400">
                펼치기
              </span>
            </div>
          </summary>

          <div className="space-y-6 border-t border-black/5 p-6 md:p-8">
            <label className={labelClass}>
              SEO 제목
              <input
                name="seoTitle"
                placeholder="예: 공간메이트 명함 디자인 | 디자인스무디"
                className={inputClass}
              />

              <span className="mt-2 block text-xs font-normal text-neutral-400">
                비워두면 프로젝트 기본 정보로 제목을 표시합니다.
              </span>
            </label>

            <label className={labelClass}>
              SEO 설명
              <textarea
                name="seoDescription"
                rows={4}
                placeholder="예: 공간메이트의 브랜드 컬러와 이미지를 반영한 명함 디자인 프로젝트입니다."
                className={inputClass}
              />

              <span className="mt-2 block text-xs font-normal text-neutral-400">
                검색 결과에서 제목 아래에 표시될 간단한 소개 문장입니다.
              </span>
            </label>
          </div>
        </details>

        {/* 공개 설정 */}
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold">
            공개 설정
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            작성 중으로 저장한 뒤 이미지까지 등록하고 공개할 수 있습니다.
          </p>

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

              <span className="text-sm font-semibold text-neutral-700">
                홈페이지 대표 프로젝트로 표시
              </span>
            </label>
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-3 pb-10">
          <Link
            href="/admin/projects"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
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