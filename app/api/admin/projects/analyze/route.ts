import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_IMAGE_COUNT = 4;
const MAX_IMAGE_SIZE =
  6 * 1024 * 1024;

type ImageInput = {
  type: "input_image";
  image_url: string;
  detail: "high";
};

type ProjectType =
  | "design"
  | "website";

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

function normalizeProjectType(
  value: string,
): ProjectType {
  return value === "website"
    ? "website"
    : "design";
}

function normalizeWebsiteUrl(
  value: string,
) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function isBlockedHostname(
  hostname: string,
) {
  const normalized =
    hostname.toLowerCase();

  if (
    normalized === "localhost" ||
    normalized ===
      "localhost.localdomain" ||
    normalized.endsWith(".local")
  ) {
    return true;
  }

  if (
    normalized === "127.0.0.1" ||
    normalized === "0.0.0.0" ||
    normalized === "::1"
  ) {
    return true;
  }

  /*
   * 사설 IPv4 대역 차단
   */
  if (
    /^10\./.test(normalized) ||
    /^192\.168\./.test(normalized) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(
      normalized,
    ) ||
    /^169\.254\./.test(normalized)
  ) {
    return true;
  }

  return false;
}

function stripHtml(
  html: string,
) {
  return html
    .replace(
      /<script[\s\S]*?<\/script>/gi,
      " ",
    )
    .replace(
      /<style[\s\S]*?<\/style>/gi,
      " ",
    )
    .replace(
      /<svg[\s\S]*?<\/svg>/gi,
      " ",
    )
    .replace(
      /<noscript[\s\S]*?<\/noscript>/gi,
      " ",
    )
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWebsiteText(
  url: URL,
) {
  if (isBlockedHostname(url.hostname)) {
    throw new Error(
      "로컬 또는 내부 네트워크 주소는 분석할 수 없습니다.",
    );
  }

  const controller =
    new AbortController();

  const timeout =
    setTimeout(() => {
      controller.abort();
    }, 10000);

  try {
    const response = await fetch(
      url.toString(),
      {
        method: "GET",

        headers: {
          "User-Agent":
            "Mozilla/5.0 DesignSmoothie Portfolio Analyzer",

          Accept:
            "text/html,application/xhtml+xml",
        },

        signal:
          controller.signal,

        cache: "no-store",

        redirect: "follow",
      },
    );

    if (!response.ok) {
      throw new Error(
        `웹사이트를 불러오지 못했습니다. (${response.status})`,
      );
    }

    const contentType =
      response.headers.get(
        "content-type",
      ) ?? "";

    if (
      !contentType.includes(
        "text/html",
      )
    ) {
      throw new Error(
        "HTML 웹페이지가 아닙니다.",
      );
    }

    const html =
      await response.text();

    /*
     * 너무 큰 페이지 전체를
     * AI에 넘기지 않습니다.
     */
    const slicedHtml =
      html.slice(0, 400000);

    const text =
      stripHtml(slicedHtml);

    return text.slice(0, 24000);
  } finally {
    clearTimeout(timeout);
  }
}

const analysisSchema = {
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
};

async function analyzeWebsite({
  title,
  category,
  client,
  location,
  enteredIndustry,
  liveUrl,
}: {
  title: string;
  category: string;
  client: string;
  location: string;
  enteredIndustry: string;
  liveUrl: string;
}) {
  const normalizedUrl =
    normalizeWebsiteUrl(liveUrl);

  if (!normalizedUrl) {
    throw new Error(
      "올바른 웹사이트 주소를 입력해주세요.",
    );
  }

  const websiteText =
    await fetchWebsiteText(
      normalizedUrl,
    );

  if (!websiteText) {
    throw new Error(
      "웹사이트에서 분석할 텍스트를 찾지 못했습니다.",
    );
  }

  const projectInformation = [
    `프로젝트명: ${title}`,
    `카테고리: ${
      category || "미입력"
    }`,
    `클라이언트: ${
      client || "미입력"
    }`,
    `지역: ${
      location || "미입력"
    }`,
    `사용자가 입력한 업종: ${
      enteredIndustry ||
      "미입력"
    }`,
    `라이브 웹사이트: ${normalizedUrl.toString()}`,
  ].join("\n");

  const response =
    await openai.responses.create({
      model:
        process.env
          .OPENAI_TEXT_MODEL ??
        "gpt-4.1-mini",

      input: [
        {
          role: "system",

          content: `
당신은 대한민국 디자인 스튜디오
'디자인스무디(Design SMOOTHIE)'의
웹사이트 포트폴리오 분석가입니다.

이번 단계에서는 포트폴리오 소개글을 쓰지 말고,
제공된 웹사이트 텍스트와 프로젝트 기본 정보에서
확인할 수 있는 브랜드 및 웹 경험 요소를 분석하세요.

작성 원칙:

1. 제공된 웹사이트와 프로젝트 정보에서 확인되지 않는 사실은 만들지 않습니다.
2. 실제 계약 범위, 고객 요구사항, 매출, 전환율, 사용자 반응은 추측하지 않습니다.
3. 웹사이트의 브랜드 톤, 정보 구조, 콘텐츠 구성, UI 방향을 중심으로 분석합니다.
4. 디자인과 개발 방식이 명확하지 않으면 단정하지 않습니다.
5. 기술 스택은 제공된 정보에서 확인되지 않으면 추측하지 않습니다.
6. 전문적이지만 포트폴리오 작성에 바로 활용할 수 있는 짧은 한국어로 작성합니다.
7. mainColors와 subColors는 웹사이트 텍스트만으로 정확히 알 수 없으면 빈 배열로 반환해도 됩니다.
8. 웹 프로젝트이므로 materials, signTypes, lighting은 원칙적으로 빈 배열로 반환합니다.
9. styles에는 웹사이트의 시각적·브랜드 스타일을 정리합니다.
10. designFeatures에는 UI 구성, 정보 구조, 반응형 경험, 콘텐츠 구성 등 확인 가능한 특징을 작성합니다.
11. visualPoints에는 사용자가 첫 화면과 주요 콘텐츠에서 인지할 핵심 포인트를 작성합니다.
12. designerMemo에는 포트폴리오 글 작성에 참고할 내부 요약을 작성합니다.
13. 신뢰도는 0부터 100 사이의 정수로 작성합니다.
          `.trim(),
        },

        {
          role: "user",

          content: `
아래 프로젝트 기본 정보와 웹사이트에서 추출된 내용을 분석해주세요.

[프로젝트 정보]
${projectInformation}

[웹사이트에서 확인된 텍스트]
${websiteText}

분석 항목:

- 업종
- 상위 업종 분류
- 주요 색상
- 보조 색상
- 웹사이트 스타일
- UI 및 정보 구조 특징
- 브랜드의 주요 시각·콘텐츠 포인트
- 추천 검색 키워드
- 포트폴리오 작성용 내부 메모
- 각 주요 판단의 신뢰도

웹 프로젝트이므로
materials, signTypes, lighting은 빈 배열로 작성하세요.

이번 단계에서는
Summary, Overview, Challenge, Solution, Result,
SEO 문장을 작성하지 마세요.
          `.trim(),
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name:
            "website_project_analysis",
          strict: true,
          schema:
            analysisSchema,
        },
      },
    });

  if (!response.output_text) {
    throw new Error(
      "AI가 웹사이트 분석 결과를 반환하지 못했습니다.",
    );
  }

  return JSON.parse(
    response.output_text,
  );
}

async function analyzeDesignProject({
  title,
  category,
  client,
  location,
  enteredIndustry,
  imageFiles,
}: {
  title: string;
  category: string;
  client: string;
  location: string;
  enteredIndustry: string;
  imageFiles: File[];
}) {
  for (const file of imageFiles) {
    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      throw new Error(
        `${file.name}은 이미지 파일이 아닙니다.`,
      );
    }

    if (
      file.size >
      MAX_IMAGE_SIZE
    ) {
      throw new Error(
        `${file.name}은 AI 분석용 제한인 6MB를 초과합니다.`,
      );
    }
  }

  const imageInputs: ImageInput[] =
    await Promise.all(
      imageFiles.map(
        async (file) => ({
          type: "input_image",
          image_url:
            await fileToDataUrl(
              file,
            ),
          detail: "high",
        }),
      ),
    );

  const projectInformation = [
    `프로젝트명: ${title}`,
    `카테고리: ${
      category || "미입력"
    }`,
    `클라이언트: ${
      client || "미입력"
    }`,
    `지역: ${
      location || "미입력"
    }`,
    `사용자가 입력한 업종: ${
      enteredIndustry ||
      "미입력"
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
              type:
                "input_text",

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
          name:
            "project_visual_analysis",
          strict: true,
          schema:
            analysisSchema,
        },
      },
    });

  if (!response.output_text) {
    throw new Error(
      "AI가 사진 분석 결과를 반환하지 못했습니다.",
    );
  }

  return JSON.parse(
    response.output_text,
  );
}

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

    const formData =
      await request.formData();

    const title =
      getFormText(
        formData,
        "title",
      );

    const category =
      getFormText(
        formData,
        "category",
      );

    const client =
      getFormText(
        formData,
        "client",
      );

    const location =
      getFormText(
        formData,
        "location",
      );

    const enteredIndustry =
      getFormText(
        formData,
        "industry",
      );

    const projectType =
      normalizeProjectType(
        getFormText(
          formData,
          "projectType",
        ),
      );

    const liveUrl =
      getFormText(
        formData,
        "liveUrl",
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

    if (
      projectType === "website"
    ) {
      if (!liveUrl) {
        return NextResponse.json(
          {
            message:
              "분석할 웹사이트 주소를 입력해주세요.",
          },
          {
            status: 400,
          },
        );
      }

      const result =
        await analyzeWebsite({
          title,
          category,
          client,
          location,
          enteredIndustry,
          liveUrl,
        });

      return NextResponse.json(
        result,
      );
    }

    const imageFiles =
      formData
        .getAll("images")
        .filter(
          (
            value,
          ): value is File =>
            value instanceof
            File,
        )
        .slice(
          0,
          MAX_IMAGE_COUNT,
        );

    if (
      imageFiles.length === 0
    ) {
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

    const result =
      await analyzeDesignProject({
        title,
        category,
        client,
        location,
        enteredIndustry,
        imageFiles,
      });

    return NextResponse.json(
      result,
    );
  } catch (error) {
    console.error(
      "프로젝트 분석 실패:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "프로젝트 분석 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}