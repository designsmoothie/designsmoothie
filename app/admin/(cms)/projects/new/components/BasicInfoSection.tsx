"use client";

import type {
  ChangeEvent,
} from "react";

type Category = {
  id: string;
  name: string;
};

type BasicInfoSectionProps = {
  categories: Category[];

  title: string;
  slug: string;
  industry: string;

  projectType: string;
  previewType: string;
  liveUrl: string;

  inputClass: string;
  labelClass: string;

  onTitleChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;

  onSlugChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;

  onIndustryChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;

  onProjectTypeChange: (
    value: string,
  ) => void;

  onPreviewTypeChange: (
    value: string,
  ) => void;

  onLiveUrlChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
};

export default function BasicInfoSection({
  categories,

  title,
  slug,
  industry,

  projectType,
  previewType,
  liveUrl,

  inputClass,
  labelClass,

  onTitleChange,
  onSlugChange,
  onIndustryChange,

  onProjectTypeChange,
  onPreviewTypeChange,
  onLiveUrlChange,
}: BasicInfoSectionProps) {
  const isWebsite =
    projectType === "website";

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        Basic information
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        기본 정보
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        프로젝트명과 카테고리를 먼저 입력해주세요.
      </p>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          프로젝트명 *
          <input
            name="title"
            required
            value={title}
            onChange={onTitleChange}
            placeholder="프로젝트명 기재"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          슬러그 *
          <input
            name="slug"
            required
            value={slug}
            onChange={onSlugChange}
            placeholder="홈페이지 주소 영문기재"
            pattern="[a-z0-9-]+"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          카테고리 *
          <select
            name="categoryId"
            required
            defaultValue=""
            className={inputClass}
            onChange={(event) => {
              const option =
                event.currentTarget
                  .selectedOptions[0];

              const hiddenInput =
                event.currentTarget
                  .form?.elements.namedItem(
                    "categoryName",
                  );

              if (
                hiddenInput instanceof
                HTMLInputElement
              ) {
                hiddenInput.value =
                  option?.textContent?.trim() ??
                  "";
              }
            }}
          >
            <option
              value=""
              disabled
            >
              카테고리를 선택하세요
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ),
            )}
          </select>
        </label>

        <input
          type="hidden"
          name="categoryName"
          defaultValue=""
        />

        <label className={labelClass}>
          업종
          <input
            name="industry"
            value={industry}
            onChange={onIndustryChange}
            placeholder="사진 분석 후 자동 입력됩니다."
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-7 rounded-2xl border border-black/5 bg-[#f8f6f1] p-5">
        <div>
          <p className="text-sm font-semibold text-neutral-800">
            프로젝트 유형
          </p>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            웹사이트 프로젝트를 선택하면 실제 사이트 주소를
            포트폴리오 미리보기에 사용할 수 있습니다.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <label
            className={`cursor-pointer rounded-2xl border p-4 transition ${
              projectType === "design"
                ? "border-[#94b63f] bg-white shadow-sm"
                : "border-black/5 bg-white/60 hover:bg-white"
            }`}
          >
            <input
              type="radio"
              name="projectType"
              value="design"
              checked={
                projectType === "design"
              }
              onChange={() => {
                onProjectTypeChange(
                  "design",
                );

                onPreviewTypeChange(
                  "image",
                );
              }}
              className="sr-only"
            />

            <span className="block text-sm font-semibold text-neutral-900">
              디자인 프로젝트
            </span>

            <span className="mt-1 block text-xs leading-5 text-neutral-500">
              브랜딩, 간판, 인쇄물, 공간 디자인 등
              이미지 중심 프로젝트
            </span>
          </label>

          <label
            className={`cursor-pointer rounded-2xl border p-4 transition ${
              projectType === "website"
                ? "border-[#94b63f] bg-white shadow-sm"
                : "border-black/5 bg-white/60 hover:bg-white"
            }`}
          >
            <input
              type="radio"
              name="projectType"
              value="website"
              checked={
                projectType === "website"
              }
              onChange={() =>
                onProjectTypeChange(
                  "website",
                )
              }
              className="sr-only"
            />

            <span className="block text-sm font-semibold text-neutral-900">
              웹사이트 프로젝트
            </span>

            <span className="mt-1 block text-xs leading-5 text-neutral-500">
              실제 웹사이트 주소와 라이브 미리보기를
              사용하는 프로젝트
            </span>
          </label>
        </div>
      </div>

      {isWebsite && (
        <div className="mt-6 rounded-2xl border border-[#94b63f]/20 bg-[#f7faef] p-5">
          <div>
            <p className="text-sm font-semibold text-neutral-800">
              웹사이트 미리보기 설정
            </p>

            <p className="mt-1 text-xs leading-5 text-neutral-500">
              실제 사이트가 불러와지지 않는 경우에는 기존 대표
              이미지가 대신 표시됩니다.
            </p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              미리보기 방식
              <select
                name="previewType"
                value={previewType}
                onChange={(event) =>
                  onPreviewTypeChange(
                    event.target.value,
                  )
                }
                className={inputClass}
              >
                <option value="image">
                  대표 이미지
                </option>

                <option value="live">
                  실제 웹사이트
                </option>
              </select>
            </label>

            <label className={labelClass}>
              라이브 사이트 주소
              <input
                type="url"
                name="liveUrl"
                value={liveUrl}
                onChange={onLiveUrlChange}
                required={
                  previewType === "live"
                }
                placeholder="https://example.com"
                className={inputClass}
              />
            </label>
          </div>

          <input
            type="hidden"
            name="previewFallbackUrl"
            value=""
          />

          {liveUrl && (
            <div className="mt-5 rounded-xl border border-black/5 bg-white px-4 py-3">
              <p className="text-xs font-semibold text-neutral-600">
                연결 예정 주소
              </p>

              <p className="mt-1 break-all text-sm text-[#6f8d25]">
                {liveUrl}
              </p>
            </div>
          )}
        </div>
      )}

      <details className="mt-7 overflow-hidden rounded-2xl border border-black/5 bg-[#f8f6f1]">
        <summary className="cursor-pointer list-none px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-neutral-700">
                선택 정보
              </p>

              <p className="mt-1 text-xs font-normal text-neutral-400">
                부제목, 클라이언트, 제작 연도, 지역
              </p>
            </div>

            <span className="text-xs font-semibold text-neutral-400">
              펼치기
            </span>
          </div>
        </summary>

        <div className="grid gap-6 border-t border-black/5 bg-white p-5 md:grid-cols-2">
          <label className={labelClass}>
            부제목
            <input
              name="subtitle"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            클라이언트
            <input
              name="client"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            제작 연도
            <input
              name="year"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            지역
            <input
              name="location"
              className={inputClass}
            />
          </label>
        </div>
      </details>
    </section>
  );
}