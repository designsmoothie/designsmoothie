import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_IMAGE_COUNT = 4;
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;

type ImageInput = {
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
            "분석할 사진을 먼저 선택해주세요.",
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

    const imageInputs: ImageInput[] =
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
'디자인스무디(Design SMOOTHIE)'의 이미지 분석가입니다.

이번 단계에서는 프로젝트 글을 작성하지 말고,
사진에 실제로 보이는 디자인 요소만 분석하세요.

분석 원칙:

1. 사진에서 확인되지 않는 사실은 만들지 않습니다.
2. 재질과 조명 방식이 불분명하면 "추정" 또는 "확인 필요"라고 표시합니다.
3. 프로젝트의 의뢰 배경, 고객 요구, 매출, 반응, 성과는 추측하지 않습니다.
4. 이미지에 보이는 색상, 형태, 그래픽, 공간, 간판, 조명, 마감 요소를 분석합니다.
5. 여러 사진이 같은 프로젝트라면 전체 사진을 종합하여 분석합니다.
6. 브랜드명이나 프로젝트명은 이미지와 기본 정보에서 확인되는 범위만 사용합니다.
7. 전문가가 검토하기 쉽게 짧고 명확한 한국어로 작성합니다.
8. 재질이나 간판 종류를 확신할 수 없으면 단정하지 않습니다.
9. 신뢰도는 0부터 100 사이의 정수로 작성합니다.
10. 디자인 피드백은 비난이 아니라 내부 검토용 전문 의견으로 작성합니다.
            `.trim(),
          },

          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `
다음 프로젝트 정보와 이미지를 분석해주세요.

${projectInformation}

아래 내용을 분석하세요.

- 업종
- 상위 업종 분류
- 주요 색상
- 보조 색상
- 재질
- 간판 또는 디자인 종류
- 조명 방식
- 디자인 스타일
- 디자인 특징
- 사진에서 확인되는 핵심 포인트
- 추천 검색 키워드
- 내부 검토용 디자인 피드백
- 각 주요 판단의 신뢰도

이번 요청에서는 프로젝트 소개글이나 SEO 문장을 작성하지 마세요.
                `.trim(),
              },

              ...imageInputs,
            ],
          },
        ],

        text: {
          format: {
            type: "json_schema",
            name: "project_visual_analysis",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,

              properties: {
                industry: {
                  type: "string",
                },

                businessType: {
                  type: "string",
                },

                mainColors: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                subColors: {
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

                lighting: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                styles: {
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

                visualPoints: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                keywords: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                designerMemo: {
                  type: "string",
                },

                confidence: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    industry: {
                      type: "integer",
                    },

                    materials: {
                      type: "integer",
                    },

                    signTypes: {
                      type: "integer",
                    },

                    lighting: {
                      type: "integer",
                    },

                    overall: {
                      type: "integer",
                    },
                  },

                  required: [
                    "industry",
                    "materials",
                    "signTypes",
                    "lighting",
                    "overall",
                  ],
                },
              },

              required: [
                "industry",
                "businessType",
                "mainColors",
                "subColors",
                "materials",
                "signTypes",
                "lighting",
                "styles",
                "designFeatures",
                "visualPoints",
                "keywords",
                "designerMemo",
                "confidence",
              ],
            },
          },
        },
      });

    if (!response.output_text) {
      return NextResponse.json(
        {
          message:
            "AI가 사진 분석 결과를 반환하지 못했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    const result = JSON.parse(
      response.output_text,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "프로젝트 사진 분석 실패:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "사진 분석 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}