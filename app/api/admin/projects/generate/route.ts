import { NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

type GenerateProjectRequest = {
  title?: string;
  subtitle?: string;
  client?: string;
  year?: string;
  location?: string;
  industry?: string;
  category?: string;
};

type GeneratedProjectContent = {
  summary: string;
  background: string;
  designPoints: string;
  seoTitle: string;
  seoDescription: string;
};

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

    const body = (await request.json()) as GenerateProjectRequest;

    const title = body.title?.trim() ?? "";
    const subtitle = body.subtitle?.trim() ?? "";
    const client = body.client?.trim() ?? "";
    const year = body.year?.trim() ?? "";
    const location = body.location?.trim() ?? "";
    const industry = body.industry?.trim() ?? "";
    const category = body.category?.trim() ?? "";

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

    const projectInformation = [
      `프로젝트명: ${title}`,
      `부제목: ${subtitle || "미입력"}`,
      `클라이언트: ${client || "미입력"}`,
      `제작 연도: ${year || "미입력"}`,
      `지역: ${location || "미입력"}`,
      `업종: ${industry || "미입력"}`,
      `카테고리: ${category || "미입력"}`,
    ].join("\n");

    const completion = await openai.chat.completions.create({
      model:
        process.env.OPENAI_TEXT_MODEL ??
        "gpt-4.1-mini",
      response_format: {
        type: "json_object",
      },
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `
당신은 대한민국의 브랜딩, 사이니지, 공간 그래픽 디자인 전문 스튜디오
'디자인스무디(Design SMOOTHIE)'의 포트폴리오 에디터입니다.

사용자가 제공한 프로젝트 정보를 바탕으로
실제 디자인 스튜디오 홈페이지에 게시할 수 있는 글을 작성하세요.

작성 원칙:

1. 제공되지 않은 사실은 지어내지 않습니다.
2. 시공 여부, 매출 증가, 고객 반응 등 확인되지 않은 성과를 만들지 않습니다.
3. 지나치게 감성적이거나 과장된 광고 문구를 피합니다.
4. 전문적이지만 일반 고객이 쉽게 이해할 수 있는 한국어를 사용합니다.
5. 모든 문장은 자연스러운 서술형으로 작성합니다.
6. 같은 표현과 내용을 반복하지 않습니다.
7. 디자인스무디의 작업 역량과 디자인 의도가 자연스럽게 드러나야 합니다.
8. 검색 키워드를 억지로 반복하지 않습니다.
9. 프로젝트명과 업종이 불분명한 경우 입력된 정보 안에서만 작성합니다.

반드시 아래 JSON 구조만 출력하세요.

{
  "summary": "프로젝트 전체를 소개하는 2~3문장",
  "background": "의뢰 또는 작업이 시작된 배경을 설명하는 2~3문장",
  "designPoints": "색상, 형태, 가독성, 브랜드 인상 등 디자인의 핵심을 설명하는 2~4문장",
  "seoTitle": "검색 결과에 사용할 35~55자 이내 제목",
  "seoDescription": "검색 결과에 사용할 80~150자 이내 설명"
}
          `.trim(),
        },
        {
          role: "user",
          content: `
다음 프로젝트 정보를 바탕으로 포트폴리오 콘텐츠를 작성해주세요.

${projectInformation}
          `.trim(),
        },
      ],
    });

    const rawContent =
      completion.choices[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json(
        {
          message: "AI가 내용을 생성하지 못했습니다.",
        },
        {
          status: 500,
        },
      );
    }

    const parsed = JSON.parse(
      rawContent,
    ) as Partial<GeneratedProjectContent>;

    const result: GeneratedProjectContent = {
      summary: parsed.summary?.trim() ?? "",
      background: parsed.background?.trim() ?? "",
      designPoints:
        parsed.designPoints?.trim() ?? "",
      seoTitle: parsed.seoTitle?.trim() ?? "",
      seoDescription:
        parsed.seoDescription?.trim() ?? "",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "프로젝트 AI 자동 생성 실패:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "AI 콘텐츠 생성 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}