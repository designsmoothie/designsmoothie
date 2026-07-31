import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

const MAX_IMAGE_COUNT = 4;
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;

type ImageContent = {
  type: "input_image";
  image_url: string;
  detail: "high";
};

function getFormText(
  formData: FormData,
  name: string,
) {
  const value = formData.get(name);

  return typeof value === "string"
    ? value.trim()
    : "";
}

async function fileToDataUrl(
  file: File,
) {
  const buffer = Buffer.from(
    await file.arrayBuffer(),
  );

  return `data:${file.type};base64,${buffer.toString(
    "base64",
  )}`;
}

export async function POST(
  request: Request,
) {
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

    const formData =
      await request.formData();

    const title = getFormText(
      formData,
      "title",
    );

    const category = getFormText(
      formData,
      "category",
    );

    const client = getFormText(
      formData,
      "client",
    );

    const location = getFormText(
      formData,
      "location",
    );

    const enteredIndustry = getFormText(
      formData,
      "industry",
    );

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

    const imageFiles = formData
      .getAll("images")
      .filter(
        (value): value is File =>
          value instanceof File,
      )
      .slice(0, MAX_IMAGE_COUNT);

    if (imageFiles.length === 0) {
      return NextResponse.json(
        {
          message:
            "분석할 이미지가 없습니다.",
        },
        {
          status: 400,
        },
      );
    }

    for (const file of imageFiles) {
      if (
        !file.type.startsWith("image/")
      ) {
        return NextResponse.json(
          {
            message: `${file.name}은 이미지 파일이 아닙니다.`,
          },
          {
            status: 400,
          },
        );
      }

      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          {
            message: `${file.name}은 AI 분석용 제한인 6MB를 초과합니다.`,
          },
          {
            status: 400,
          },
        );
      }
    }

    const imageContents: ImageContent[] =
      await Promise.all(
        imageFiles.map(
          async (file) => ({
            type: "input_image",
            image_url:
              await fileToDataUrl(file),
            detail: "high",
          }),
        ),
      );

    const projectInformation = [
      `프로젝트명: ${title}`,
      `카테고리: ${category || "미입력"}`,
      `클라이언트: ${client || "미입력"}`,
      `지역: ${location || "미입력"}`,
      `사용자가 입력한 업종: ${
        enteredIndustry || "미입력"
      }`,
    ].join("\n");

    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_VISION_MODEL ??
          "gpt-4.1-mini",

        input: [
          {
            role: "system",
            content: `
당신은 대한민국의 브랜딩, 사이니지, 공간 그래픽 디자인 전문 스튜디오
'디자인스무디(Design SMOOTHIE)'의 포트폴리오 분석가입니다.

반드시 제공된 프로젝트 사진과 기본 정보만 근거로 분석하세요.

중요 원칙:

1. 사진에서 확인되지 않는 사실은 지어내지 않습니다.
2. 시공 방식, 재질, 조명 방식이 불확실하면 단정하지 않습니다.
3. 불확실한 재질이나 간판 종류는 "추정" 또는 "확인 필요"라고 표현합니다.
4. 매출 증가, 고객 반응, 의뢰 목적처럼 사진으로 확인할 수 없는 내용은 만들지 않습니다.
5. 사진에 실제로 보이는 색상, 형태, 공간, 그래픽, 간판 요소를 중심으로 설명합니다.
6. 입력된 프로젝트명, 카테고리, 클라이언트, 지역은 참고하되 사진과 충돌하면 억지로 맞추지 않습니다.
7. 전문적이지만 일반 고객이 이해하기 쉬운 자연스러운 한국어를 사용합니다.
8. SEO 키워드를 반복하거나 과장된 광고 문구를 사용하지 않습니다.
9. Result에는 확인되지 않은 성과를 쓰지 말고 완성된 디자인에서 보이는 결과만 설명합니다.
10. 사진만으로 작업 배경을 알 수 없으면 확인 가능한 디자인 과제를 중심으로 작성합니다.
            `.trim(),
          },

          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `
아래 프로젝트 정보와 첨부 이미지를 함께 분석해주세요.

${projectInformation}

분석 후 다음 항목을 작성하세요.

- 업종
- 주요 색상
- 확인되거나 합리적으로 추정 가능한 재질
- 간판 또는 디자인 종류
- 핵심 디자인 특징
- 프로젝트 요약
- 작업 배경 또는 사진에서 확인 가능한 디자인 과제
- Challenge
- Solution
- Result
- SEO 제목
- SEO 설명

확인되지 않는 사실은 절대 만들어내지 마세요.
                `.trim(),
              },

              ...imageContents,
            ],
          },
        ],

        text: {
          format: {
            type: "json_schema",
            name: "project_image_analysis",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                analysis: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    industry: {
                      type: "string",
                    },
                    colors: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    materials: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    signTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    designFeatures: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                  required: [
                    "industry",
                    "colors",
                    "materials",
                    "signTypes",
                    "designFeatures",
                  ],
                },

                content: {
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
              required: [
                "analysis",
                "content",
              ],
            },
          },
        },
      });

    const outputText =
      response.output_text;

    if (!outputText) {
      return NextResponse.json(
        {
          message:
            "AI가 분석 결과를 반환하지 못했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    const result = JSON.parse(
      outputText,
    ) as {
      analysis: {
        industry: string;
        colors: string[];
        materials: string[];
        signTypes: string[];
        designFeatures: string[];
      };
      content: {
        summary: string;
        overview: string;
        challenge: string;
        solution: string;
        result: string;
        seoTitle: string;
        seoDescription: string;
      };
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "프로젝트 이미지 AI 분석 실패:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "AI 이미지 분석 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}