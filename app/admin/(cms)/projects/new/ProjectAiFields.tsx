"use client";

import {
  useState,
  type FormEvent,
} from "react";

type ProjectAiFieldsProps = {
  inputClass: string;
  labelClass: string;
};

type GeneratedProjectContent = {
  summary: string;
  background: string;
  designPoints: string;
  seoTitle: string;
  seoDescription: string;
};

function getFormValue(
  formData: FormData,
  name: string,
) {
  const value = formData.get(name);

  return typeof value === "string"
    ? value.trim()
    : "";
}

export default function ProjectAiFields({
  inputClass,
  labelClass,
}: ProjectAiFieldsProps) {
  const [summary, setSummary] = useState("");
  const [background, setBackground] = useState("");
  const [designPoints, setDesignPoints] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] =
    useState("");

  const [isGenerating, setIsGenerating] =
    useState(false);
  const [message, setMessage] = useState("");

  async function handleGenerate(
    event: FormEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    const button = event.currentTarget;
    const form = button.closest("form");

    if (!form) {
      setMessage(
        "프로젝트 입력 폼을 찾지 못했습니다.",
      );
      return;
    }

    const formData = new FormData(form);

    const title = getFormValue(
      formData,
      "title",
    );

    if (!title) {
      setMessage(
        "프로젝트명을 먼저 입력해주세요.",
      );

      const titleInput =
        form.elements.namedItem("title");

      if (
        titleInput instanceof HTMLInputElement
      ) {
        titleInput.focus();
      }

      return;
    }

    const categorySelect =
      form.elements.namedItem("categoryId");

    let category = "";

    if (
      categorySelect instanceof HTMLSelectElement
    ) {
      category =
        categorySelect.selectedOptions[0]
          ?.textContent?.trim() ?? "";
    }

    setIsGenerating(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/admin/projects/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            subtitle: getFormValue(
              formData,
              "subtitle",
            ),
            client: getFormValue(
              formData,
              "client",
            ),
            year: getFormValue(
              formData,
              "year",
            ),
            location: getFormValue(
              formData,
              "location",
            ),
            industry: getFormValue(
              formData,
              "industry",
            ),
            category,
          }),
        },
      );

      const data = (await response.json()) as
        | GeneratedProjectContent
        | {
            message?: string;
          };

      if (!response.ok) {
        throw new Error(
          "message" in data
            ? data.message
            : "AI 자동 생성에 실패했습니다.",
        );
      }

      if (!("summary" in data)) {
        throw new Error(
          "AI 응답 형식이 올바르지 않습니다.",
        );
      }

      setSummary(data.summary);
      setBackground(data.background);
      setDesignPoints(data.designPoints);
      setSeoTitle(data.seoTitle);
      setSeoDescription(
        data.seoDescription,
      );

      setMessage(
        "AI가 초안을 작성했습니다. 내용을 확인한 뒤 저장해주세요.",
      );
    } catch (error) {
      console.error(
        "프로젝트 AI 생성 오류:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "AI 자동 생성에 실패했습니다.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
              Project description
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              프로젝트 소개
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              기본 정보를 입력한 뒤 AI 초안을
              만들 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#94b63f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#829f35] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating
              ? "AI 작성 중..."
              : "✨ AI 자동 작성"}
          </button>
        </div>

        {message && (
          <div
            aria-live="polite"
            className="mt-5 rounded-xl border border-[#94b63f]/20 bg-[#94b63f]/10 px-4 py-3 text-sm leading-6 text-[#536b19]"
          >
            {message}
          </div>
        )}

        <div className="mt-7 space-y-6">
          <label className={labelClass}>
            프로젝트 설명
            <textarea
              name="summary"
              rows={6}
              value={summary}
              onChange={(event) =>
                setSummary(event.target.value)
              }
              placeholder="프로젝트 전체 내용과 디자인 방향을 소개해주세요."
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            작업 배경
            <textarea
              name="overview"
              rows={5}
              value={background}
              onChange={(event) =>
                setBackground(
                  event.target.value,
                )
              }
              placeholder="프로젝트가 시작된 배경을 작성해주세요."
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            디자인 포인트
            <textarea
              name="solution"
              rows={6}
              value={designPoints}
              onChange={(event) =>
                setDesignPoints(
                  event.target.value,
                )
              }
              placeholder="색상, 형태, 재질, 가독성 등 핵심 디자인 포인트를 작성해주세요."
              className={inputClass}
            />
          </label>
        </div>

        <input
          type="hidden"
          name="services"
          value=""
        />

        <input
          type="hidden"
          name="overviewTitle"
          value="작업 배경"
        />

        <input
          type="hidden"
          name="challenge"
          value=""
        />

        <input
          type="hidden"
          name="result"
          value=""
        />
      </section>

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
                AI가 생성한 검색 제목과 설명을
                확인할 수 있습니다.
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
              value={seoTitle}
              onChange={(event) =>
                setSeoTitle(
                  event.target.value,
                )
              }
              placeholder="예: 규젠 브랜드 디자인 | 디자인스무디"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            SEO 설명
            <textarea
              name="seoDescription"
              rows={4}
              value={seoDescription}
              onChange={(event) =>
                setSeoDescription(
                  event.target.value,
                )
              }
              placeholder="검색 결과에서 제목 아래에 표시될 프로젝트 설명입니다."
              className={inputClass}
            />
          </label>
        </div>
      </details>
    </>
  );
}