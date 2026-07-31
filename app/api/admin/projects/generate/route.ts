import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type GenerateProjectBody = {
  title?: string;
  category?: string;
  client?: string;
  location?: string;
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

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          message: "로그인이 필요합니다.",
        },
        {
          status: 401,
        },
      );
    }

    const body =
      (await request.json()) as GenerateProjectBody;

    const title = cleanText(body.title);

    if (!title) {
      return NextResponse.json(
        {
          message: "프로젝트명을 먼저 입력해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    const visualAnalysis = [
      `프로젝트명: ${title}`,
      `카테고리: ${cleanText(body.category) || "미입력"}`,
      `클라이언트: ${cleanText(body.client) || "미입력"}`,
      `지역: ${cleanText(body.location) || "미입력"}`,
      `업종: ${cleanText(body.industry) || "미입력"}`,
      `상위 업종: ${cleanText(body.businessType) || "미입력"}`,
      `주요 색상: ${cleanText(body.mainColors) || "확인되지 않음"}`,
      `보조 색상: ${cleanText(body.subColors) || "확인되지 않음"}`,
      `재질: ${cleanText(body.materials) || "확인되지 않음"}`,
      `간판·디자인 종류: ${cleanText(body.signTypes) || "확인되지 않음"}`,
      `조명 방식: ${cleanText(body.lighting) || "확인되지 않음"}`,
      `디자인 스타일: ${cleanText(body.styles) || "확인되지 않음"}`,
      `디자인 특징: ${cleanText(body.designFeatures) || "확인되지 않음"}`,
      `핵심 시각 요소: ${cleanText(body.visualPoints) || "확인되지 않음"}`,
      `추천 키워드: ${cleanText(body.keywords) || "미입력"}`,
      `내부 디자이너 메모: ${cleanText(body.designerMemo) || "없음"}`,
    ].join("\n");

    const response = await openai.responses.create({
      model:
        process.env.OPENAI_TEXT_MODEL ??
        "gpt-4.1-mini",

      input: [
        {
          role: "system",
          content: `
당신은 대한민국의 브랜딩, 사이니지, 공간 그래픽 디자인 전문 스튜디오
'디자인스무디(Design SMOOTHIE)'의 포트폴리오 에디터입니다.

이미 사진 분석이 끝난 프로젝트입니다.
반드시 제공된 분석 정보만 바탕으로 포트폴리오 글을 작성하세요.

작성 원칙:

1. 제공되지 않은 사실은 지어내지 않습니다.
2. 의뢰인의 요구, 매출 증가, 고객 반응, 시공 성과를 추측하지 않습니다.
3. 재질이나 조명 방식에 "추정" 또는 "확인 필요"가 포함되어 있다면 단정적으로 쓰지 않습니다.
4. 디자인 결과물에서 확인 가능한 색상, 형태, 재질, 가독성, 분위기를 중심으로 작성합니다.
5. 전문적이지만 일반 고객이 쉽게 이해할 수 있는 한국어를 사용합니다.
6. 같은 내용을 여러 항목에서 반복하지 않습니다.
7. 과장된 광고 문구와 감성적인 수사를 피합니다.
8. Challenge는 사진과 분석에서 확인되는 디자인 과제를 설명합니다.
9. Solution은 실제로 적용된 시각적 해결 방식을 설명합니다.
10. Result는 확인되지 않은 성과가 아니라 완성된 디자인에서 보이는 결과를 설명합니다.
11. SEO 문장에는 지역, 업종, 디자인 종류를 자연스럽게 사용하되 키워드를 반복하지 않습니다.
          `.trim(),
        },
        {
          role: "user",
          content: `
아래 프로젝트 정보와 이미지 분석 결과를 바탕으로 포트폴리오 콘텐츠를 작성해주세요.

${visualAnalysis}
          `.trim(),
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "generated_project_content",
          strict: true,
          schema: {
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
          },
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

    return NextResponse.json(result);
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