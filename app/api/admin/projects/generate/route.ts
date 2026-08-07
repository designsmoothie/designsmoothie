import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type ProjectType =
  | "design"
  | "website";

type GenerateProjectBody = {
  title?: string;
  category?: string;
  client?: string;
  location?: string;

  projectType?: string;
  liveUrl?: string;

  industry?: string;
  businessType?: string;

  mainColors?: string;
  subColors?: string;

  materials?: string;
  signTypes?: string;
  lighting?: string;

  styles?: string;
  designFeatures?: string;
  visualPoints?: string;

  keywords?: string;
  designerMemo?: string;
};

type GeneratedProjectContent = {
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  seoTitle: string;
  seoDescription: string;
};

function cleanText(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function normalizeProjectType(
  value: unknown,
): ProjectType {
  return cleanText(value) === "website"
    ? "website"
    : "design";
}

const generatedContentSchema = {
  type: "object",
  additionalProperties: false,

  properties: {
    summary: {
      type: "string",
    },

    overview: {
      type: "string",
    },

    challenge: {
      type: "string",
    },

    solution: {
      type: "string",
    },

    result: {
      type: "string",
    },

    seoTitle: {
      type: "string",
    },

    seoDescription: {
      type: "string",
    },
  },

  required: [
    "summary",
    "overview",
    "challenge",
    "solution",
    "result",
    "seoTitle",
    "seoDescription",
  ],
};

function buildDesignAnalysis(
  body: GenerateProjectBody,
  title: string,
) {
  return [
    `프로젝트명: ${title}`,
    `카테고리: ${
      cleanText(body.category) ||
      "미입력"
    }`,
    `클라이언트: ${
      cleanText(body.client) ||
      "미입력"
    }`,
    `지역: ${
      cleanText(body.location) ||
      "미입력"
    }`,
    `업종: ${
      cleanText(body.industry) ||
      "미입력"
    }`,
    `상위 업종: ${
      cleanText(body.businessType) ||
      "미입력"
    }`,
    `주요 색상: ${
      cleanText(body.mainColors) ||
      "확인되지 않음"
    }`,
    `보조 색상: ${
      cleanText(body.subColors) ||
      "확인되지 않음"
    }`,
    `재질: ${
      cleanText(body.materials) ||
      "확인되지 않음"
    }`,
    `간판·디자인 종류: ${
      cleanText(body.signTypes) ||
      "확인되지 않음"
    }`,
    `조명 방식: ${
      cleanText(body.lighting) ||
      "확인되지 않음"
    }`,
    `디자인 스타일: ${
      cleanText(body.styles) ||
      "확인되지 않음"
    }`,
    `디자인 특징: ${
      cleanText(
        body.designFeatures,
      ) || "확인되지 않음"
    }`,
    `핵심 시각 요소: ${
      cleanText(
        body.visualPoints,
      ) || "확인되지 않음"
    }`,
    `추천 키워드: ${
      cleanText(body.keywords) ||
      "미입력"
    }`,
    `내부 디자이너 메모: ${
      cleanText(
        body.designerMemo,
      ) || "없음"
    }`,
  ].join("\n");
}

function buildWebsiteAnalysis(
  body: GenerateProjectBody,
  title: string,
) {
  return [
    `프로젝트명: ${title}`,
    `카테고리: ${
      cleanText(body.category) ||
      "미입력"
    }`,
    `클라이언트: ${
      cleanText(body.client) ||
      "미입력"
    }`,
    `지역: ${
      cleanText(body.location) ||
      "미입력"
    }`,
    `업종: ${
      cleanText(body.industry) ||
      "미입력"
    }`,
    `상위 업종: ${
      cleanText(body.businessType) ||
      "미입력"
    }`,
    `라이브 웹사이트: ${
      cleanText(body.liveUrl) ||
      "미입력"
    }`,
    `확인된 주요 색상: ${
      cleanText(body.mainColors) ||
      "확인되지 않음"
    }`,
    `확인된 보조 색상: ${
      cleanText(body.subColors) ||
      "확인되지 않음"
    }`,
    `웹사이트 스타일: ${
      cleanText(body.styles) ||
      "확인되지 않음"
    }`,
    `UI·정보구조 특징: ${
      cleanText(
        body.designFeatures,
      ) || "확인되지 않음"
    }`,
    `핵심 시각·콘텐츠 요소: ${
      cleanText(
        body.visualPoints,
      ) || "확인되지 않음"
    }`,
    `추천 검색 키워드: ${
      cleanText(body.keywords) ||
      "미입력"
    }`,
    `내부 디자이너 메모: ${
      cleanText(
        body.designerMemo,
      ) || "없음"
    }`,
  ].join("\n");
}

const designSystemPrompt = `
당신은 대한민국의 브랜딩, 사이니지, 공간 그래픽 디자인 전문 스튜디오
'디자인스무디(Design SMOOTHIE)'의 포트폴리오 에디터입니다.

이미 이미지 분석이 끝난 디자인 프로젝트입니다.
반드시 제공된 분석 정보만 바탕으로 포트폴리오 글을 작성하세요.

작성 원칙:

1. 제공되지 않은 사실은 지어내지 않습니다.
2. 의뢰인의 요구, 매출 증가, 고객 반응, 시공 성과를 추측하지 않습니다.
3. 재질이나 조명 방식에 "추정" 또는 "확인 필요"가 포함되어 있다면 단정적으로 쓰지 않습니다.
4. 결과물에서 확인 가능한 색상, 형태, 재질, 가독성, 분위기를 중심으로 작성합니다.
5. 전문적이지만 일반 고객이 쉽게 이해할 수 있는 자연스러운 한국어를 사용합니다.
6. 같은 내용을 여러 항목에서 반복하지 않습니다.
7. 과장된 광고 문구와 감성적인 수사를 피합니다.
8. Challenge는 분석에서 확인되는 디자인 과제를 설명합니다.
9. Solution은 실제로 확인 가능한 시각적 해결 방식을 설명합니다.
10. Result는 확인되지 않은 성과가 아니라 완성된 디자인에서 보이는 결과를 설명합니다.
11. SEO 문장에는 지역, 업종, 디자인 종류를 자연스럽게 사용하되 키워드를 반복하지 않습니다.
12. summary는 2~3문장으로 간결하게 작성합니다.
13. overview는 프로젝트 배경과 디자인 방향을 설명하는 1~2개 문단 분량으로 작성합니다.
14. seoTitle은 과도하게 길지 않게 작성합니다.
15. seoDescription은 검색 결과에서 자연스럽게 읽히는 1~2문장으로 작성합니다.
`.trim();

const websiteSystemPrompt = `
당신은 대한민국의 브랜드 디자인 스튜디오
'디자인스무디(Design SMOOTHIE)'의 웹 프로젝트 포트폴리오 에디터입니다.

이미 웹사이트 분석이 끝난 프로젝트입니다.
반드시 제공된 분석 정보만 바탕으로 포트폴리오 글을 작성하세요.

작성 원칙:

1. 제공되지 않은 사실은 지어내지 않습니다.
2. 실제 계약 범위, 고객 요구사항, 사용자 수, 매출, 전환율, 고객 반응은 추측하지 않습니다.
3. 기술 스택이 제공되지 않았다면 React, Next.js, Supabase 같은 기술명을 임의로 넣지 않습니다.
4. CMS 구축, 반응형 구현, SEO 적용 등은 분석 또는 내부 메모에서 확인되는 경우에만 구체적으로 작성합니다.
5. 웹 프로젝트에서는 재질, 간판, 조명 이야기를 하지 않습니다.
6. 브랜드 이미지, 정보 구조, UI/UX, 콘텐츠 흐름, 반응형 경험, 운영 편의성 등 웹 프로젝트에 맞는 관점으로 작성합니다.
7. 전문적이지만 비개발자 고객도 이해하기 쉬운 자연스러운 한국어를 사용합니다.
8. 같은 내용을 Summary, Overview, Challenge, Solution, Result에서 반복하지 않습니다.
9. Challenge는 웹사이트에서 해결해야 하는 정보 전달 또는 사용자 경험상의 과제를 설명합니다.
10. Solution은 확인된 UI 구성, 정보 구조, 디자인 방향, 반응형 경험 등의 해결 방식을 설명합니다.
11. Result는 확인되지 않은 사업 성과가 아니라 완성된 웹사이트에서 확인 가능한 경험과 구조를 설명합니다.
12. 프로젝트가 아직 개발 중이거나 미완성이라는 정보가 없다면 임의로 "완성", "운영 중", "성공적으로 구축" 같은 표현을 과도하게 사용하지 않습니다.
13. summary는 포트폴리오 카드에도 사용할 수 있도록 2~3문장으로 간결하게 작성합니다.
14. overview는 웹 프로젝트의 전체 방향을 설명하는 1~2개 문단으로 작성합니다.
15. SEO 제목과 설명에는 업종과 홈페이지/웹디자인 관련 검색어를 자연스럽게 포함하되 키워드 나열식 문장을 피합니다.
16. 디자인스무디가 직접 수행했다고 명시되지 않은 업무 범위를 임의로 추가하지 않습니다.
`.trim();

export async function POST(
  request: Request,
) {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message:
            "로그인이 필요합니다.",
        },
        {
          status: 401,
        },
      );
    }

    const body =
      (await request.json()) as
        GenerateProjectBody;

    const title =
      cleanText(body.title);

    if (!title) {
      return NextResponse.json(
        {
          message:
            "프로젝트명을 먼저 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    const projectType =
      normalizeProjectType(
        body.projectType,
      );

    const analysis =
      projectType === "website"
        ? buildWebsiteAnalysis(
            body,
            title,
          )
        : buildDesignAnalysis(
            body,
            title,
          );

    const systemPrompt =
      projectType === "website"
        ? websiteSystemPrompt
        : designSystemPrompt;

    const userPrompt =
      projectType === "website"
        ? `
아래 웹 프로젝트 정보와 AI 분석 결과를 바탕으로
디자인스무디 포트폴리오 콘텐츠를 작성해주세요.

${analysis}

다음 항목을 작성하세요.

- Summary
- Overview
- Challenge
- Solution
- Result
- SEO Title
- SEO Description

웹사이트 프로젝트라는 점을 반드시 반영하세요.
확인되지 않은 기술이나 개발 범위는 추측하지 마세요.
          `.trim()
        : `
아래 프로젝트 정보와 이미지 분석 결과를 바탕으로
디자인스무디 포트폴리오 콘텐츠를 작성해주세요.

${analysis}

다음 항목을 작성하세요.

- Summary
- Overview
- Challenge
- Solution
- Result
- SEO Title
- SEO Description
          `.trim();

    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_TEXT_MODEL ??
          "gpt-4.1-mini",

        input: [
          {
            role: "system",
            content:
              systemPrompt,
          },

          {
            role: "user",
            content:
              userPrompt,
          },
        ],

        text: {
          format: {
            type: "json_schema",
            name:
              "generated_project_content",
            strict: true,
            schema:
              generatedContentSchema,
          },
        },
      });

    if (!response.output_text) {
      return NextResponse.json(
        {
          message:
            "AI가 프로젝트 글을 반환하지 못했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    const result = JSON.parse(
      response.output_text,
    ) as GeneratedProjectContent;

    return NextResponse.json(
      result,
    );
  } catch (error) {
    console.error(
      "프로젝트 글 생성 실패:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "프로젝트 글 작성 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}