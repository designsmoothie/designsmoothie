"use client";

import {
  useState,
  type MouseEvent,
} from "react";

type ProjectAiAssistantProps = {
  projectType: string | null;
  liveUrl: string | null;
};

type AiVisualAnalysis = {
  industry: string;
  businessType: string;
  mainColors: string[];
  subColors: string[];
  materials: string[];
  signTypes: string[];
  lighting: string[];
  styles: string[];
  designFeatures: string[];
  visualPoints: string[];
  keywords: string[];
  designerMemo: string;

  confidence: {
    industry: number;
    materials: number;
    signTypes: number;
    lighting: number;
    overall: number;
  };
};

type GeneratedContent = {
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  seoTitle: string;
  seoDescription: string;
};

function getFormElement(
  button: HTMLButtonElement,
) {
  return button.closest("form");
}

function getFormValue(
  form: HTMLFormElement,
  name: string,
) {
  const field =
    form.elements.namedItem(name);

  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement ||
    field instanceof HTMLSelectElement
  ) {
    return field.value.trim();
  }

  return "";
}

function setFormValue(
  form: HTMLFormElement,
  name: string,
  value: string,
) {
  const field =
    form.elements.namedItem(name);

  if (
    field instanceof HTMLInputElement ||
    field instanceof HTMLTextAreaElement
  ) {
    field.value = value;

    field.dispatchEvent(
      new Event("input", {
        bubbles: true,
      }),
    );

    field.dispatchEvent(
      new Event("change", {
        bubbles: true,
      }),
    );
  }
}

function joinValues(
  values: string[],
) {
  return values
    .map((value) => value.trim())
    .filter(Boolean)
    .join(", ");
}

export default function ProjectAiAssistant({
  projectType: initialProjectType,
  liveUrl: initialLiveUrl,
}: ProjectAiAssistantProps) {
  const [isWorking, setIsWorking] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function handleGenerate(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    const button =
      event.currentTarget;

    const form =
      getFormElement(button);

    if (!form) {
      setMessage(
        "프로젝트 수정 폼을 찾지 못했습니다.",
      );

      return;
    }

    const title =
      getFormValue(form, "title");

    const projectType =
      getFormValue(
        form,
        "projectType",
      ) ||
      initialProjectType ||
      "design";

    const liveUrl =
      getFormValue(
        form,
        "liveUrl",
      ) ||
      initialLiveUrl ||
      "";

    if (!title) {
      setMessage(
        "프로젝트명을 먼저 입력해주세요.",
      );

      return;
    }

    if (
      projectType !== "website"
    ) {
      setMessage(
        "현재 수정 화면 AI 자동작성은 웹사이트 프로젝트부터 지원합니다.",
      );

      return;
    }

    if (!liveUrl) {
      setMessage(
        "웹사이트 주소를 먼저 입력해주세요.",
      );

      return;
    }

    setIsWorking(true);

    try {
      setMessage(
        "AI가 웹사이트를 분석하고 있습니다...",
      );

      /*
       * 1. 웹사이트 분석
       */
      const analysisFormData =
        new FormData();

      analysisFormData.append(
        "title",
        title,
      );

      analysisFormData.append(
        "projectType",
        projectType,
      );

      analysisFormData.append(
        "liveUrl",
        liveUrl,
      );

      analysisFormData.append(
        "category",
        getFormValue(
          form,
          "categoryName",
        ),
      );

      analysisFormData.append(
        "client",
        getFormValue(
          form,
          "client",
        ),
      );

      analysisFormData.append(
        "location",
        getFormValue(
          form,
          "location",
        ),
      );

      analysisFormData.append(
        "industry",
        getFormValue(
          form,
          "industry",
        ),
      );

      const analysisResponse =
        await fetch(
          "/api/admin/projects/analyze",
          {
            method: "POST",
            body: analysisFormData,
          },
        );

      const analysisData =
        (await analysisResponse.json()) as
          | AiVisualAnalysis
          | {
              message?: string;
            };

      if (
        !analysisResponse.ok ||
        !("confidence" in analysisData)
      ) {
        throw new Error(
          "message" in analysisData
            ? analysisData.message
            : "웹사이트 분석에 실패했습니다.",
        );
      }

      setMessage(
        "분석 완료. 포트폴리오 글을 작성하고 있습니다...",
      );

      /*
       * 2. 포트폴리오 글 생성
       */
      const generateResponse =
        await fetch(
          "/api/admin/projects/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title,

              projectType,
              liveUrl,

              category:
                getFormValue(
                  form,
                  "categoryName",
                ),

              client:
                getFormValue(
                  form,
                  "client",
                ),

              location:
                getFormValue(
                  form,
                  "location",
                ),

              industry:
                analysisData.industry,

              businessType:
                analysisData.businessType,

              mainColors:
                joinValues(
                  analysisData.mainColors,
                ),

              subColors:
                joinValues(
                  analysisData.subColors,
                ),

              materials:
                joinValues(
                  analysisData.materials,
                ),

              signTypes:
                joinValues(
                  analysisData.signTypes,
                ),

              lighting:
                joinValues(
                  analysisData.lighting,
                ),

              styles:
                joinValues(
                  analysisData.styles,
                ),

              designFeatures:
                joinValues(
                  analysisData.designFeatures,
                ),

              visualPoints:
                joinValues(
                  analysisData.visualPoints,
                ),

              keywords:
                joinValues(
                  analysisData.keywords,
                ),

              designerMemo:
                analysisData.designerMemo,
            }),
          },
        );

      const generatedData =
        (await generateResponse.json()) as
          | GeneratedContent
          | {
              message?: string;
            };

      if (
        !generateResponse.ok ||
        !("summary" in generatedData)
      ) {
        throw new Error(
          "message" in generatedData
            ? generatedData.message
            : "프로젝트 글 작성에 실패했습니다.",
        );
      }

      /*
       * 3. 수정 폼에 자동 입력
       */
      setFormValue(
        form,
        "industry",
        analysisData.industry,
      );

      setFormValue(
        form,
        "summary",
        generatedData.summary,
      );

      setFormValue(
        form,
        "overviewTitle",
        "웹사이트 기획 및 구축",
      );

      setFormValue(
        form,
        "overview",
        generatedData.overview,
      );

      setFormValue(
        form,
        "challenge",
        generatedData.challenge,
      );

      setFormValue(
        form,
        "solution",
        generatedData.solution,
      );

      setFormValue(
        form,
        "result",
        generatedData.result,
      );

      setFormValue(
        form,
        "seoTitle",
        generatedData.seoTitle,
      );

      setFormValue(
        form,
        "seoDescription",
        generatedData.seoDescription,
      );

      setMessage(
        "AI 작성 완료! 아래 내용을 확인한 뒤 변경사항 저장을 눌러주세요.",
      );
    } catch (error) {
      console.error(
        "웹 프로젝트 AI 작성 실패:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "AI 자동작성 중 오류가 발생했습니다.",
      );
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <section className="rounded-3xl border border-[#94b63f]/20 bg-[#f7f8f2] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        AI Portfolio Assistant
      </p>

      <h2 className="mt-2 text-xl font-semibold text-neutral-900">
        웹 프로젝트 AI 자동작성
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
        입력된 웹사이트 주소를 분석해 프로젝트
        소개, 작업 배경, Challenge, Solution,
        Result와 SEO 초안을 자동으로 작성합니다.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isWorking}
        className="mt-6 rounded-xl bg-[#94b63f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#819f36] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isWorking
          ? "AI 작성 중..."
          : "웹사이트 분석 + 포트폴리오 자동작성"}
      </button>

      {message && (
        <p
          aria-live="polite"
          className="mt-4 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm leading-6 text-neutral-600"
        >
          {message}
        </p>
      )}
    </section>
  );
}