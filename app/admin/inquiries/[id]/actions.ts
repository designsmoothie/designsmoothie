"use server";

import { revalidatePath } from "next/cache";

import { openai } from "@/lib/openai";
import { createClient } from "@/lib/supabase/server";

export type InquiryUpdateActionState = {
  success: boolean;
  message: string;
};

export type InquiryAiActionState = {
  success: boolean;
  message: string;
  generatedText: string;
};

const allowedStatuses = [
  "new",
  "checking",
  "consulting",
  "completed",
  "cancelled",
] as const;

type InquiryData = {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  inquiry_type: string | null;
  budget: string | null;
  schedule: string | null;
  message: string;
  status: string;
  admin_memo: string | null;
  ai_summary: string | null;
  ai_reply_draft: string | null;
};

function getText(
  formData: FormData,
  key: string,
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

async function getAuthenticatedInquiry(
  id: string,
): Promise<
  | {
      inquiry: InquiryData;
      error: null;
    }
  | {
      inquiry: null;
      error: string;
    }
> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      inquiry: null,
      error: "관리자 로그인이 필요합니다.",
    };
  }

  const { data, error } = await supabase
    .from("contact_inquiries")
    .select(`
      id,
      name,
      company,
      phone,
      email,
      inquiry_type,
      budget,
      schedule,
      message,
      status,
      admin_memo,
      ai_summary,
      ai_reply_draft
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("문의 정보 불러오기 오류:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return {
      inquiry: null,
      error:
        "문의 정보를 불러오지 못했습니다.",
    };
  }

  if (!data) {
    return {
      inquiry: null,
      error: "해당 문의를 찾을 수 없습니다.",
    };
  }

  return {
    inquiry: data as InquiryData,
    error: null,
  };
}

export async function updateInquiry(
  _previousState: InquiryUpdateActionState,
  formData: FormData,
): Promise<InquiryUpdateActionState> {
  const id = getText(formData, "id");
  const status = getText(
    formData,
    "status",
  );
  const adminMemo = getText(
    formData,
    "admin_memo",
  );

  if (!id) {
    return {
      success: false,
      message:
        "문의 ID를 확인할 수 없습니다.",
    };
  }

  if (
    !allowedStatuses.includes(
      status as (typeof allowedStatuses)[number],
    )
  ) {
    return {
      success: false,
      message:
        "올바르지 않은 상담 상태입니다.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message:
        "관리자 로그인이 필요합니다.",
    };
  }

  const { error } = await supabase
    .from("contact_inquiries")
    .update({
      status,
      admin_memo:
        adminMemo || null,
    })
    .eq("id", id);

  if (error) {
    console.error(
      "문의 정보 수정 오류:",
      {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
    );

    return {
      success: false,
      message:
        "문의 정보를 저장하지 못했습니다.",
    };
  }

  revalidatePath(
    `/admin/inquiries/${id}`,
  );
  revalidatePath("/admin/inquiries");

  return {
    success: true,
    message:
      "문의 정보가 저장되었습니다.",
  };
}

export async function generateInquiryAnalysis(
  _previousState: InquiryAiActionState,
  formData: FormData,
): Promise<InquiryAiActionState> {
  const id = getText(formData, "id");

  if (!id) {
    return {
      success: false,
      message:
        "문의 ID를 확인할 수 없습니다.",
      generatedText: "",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      message:
        "OPENAI_API_KEY가 설정되지 않았습니다.",
      generatedText: "",
    };
  }

  const result =
    await getAuthenticatedInquiry(id);

  if (result.error || !result.inquiry) {
    return {
      success: false,
      message:
        result.error ??
        "문의 정보를 확인하지 못했습니다.",
      generatedText: "",
    };
  }

  const inquiry = result.inquiry;

  try {
    const response =
      await openai.responses.create({
        model:
          process.env.OPENAI_MODEL ||
          "gpt-4.1-mini",

        instructions: `
당신은 Design SMOOTHIE의 수석 상담 디렉터입니다.

Design SMOOTHIE는 브랜딩, 로고 디자인, 간판 및 파사드,
공간 그래픽, 사인 시스템, 인쇄물, 홈페이지 디자인을 진행합니다.

고객의 문의 내용을 실무적으로 분석하세요.

지켜야 할 기준:
- 고객이 입력하지 않은 사실을 단정하지 마세요.
- 견적은 확정 금액처럼 말하지 마세요.
- 정보가 부족하면 필요한 추가 질문을 제시하세요.
- 지나치게 장황하거나 영업적인 표현은 피하세요.
- 내부 상담자가 빠르게 읽을 수 있도록 한국어로 정리하세요.
- 아래 형식을 반드시 유지하세요.

[문의 핵심 요약]
내용

[고객의 주요 니즈]
- 내용

[추천 서비스]
- 내용

[예상 작업 범위]
- 내용

[추가 확인 질문]
- 내용

[추천 다음 액션]
- 내용

[상담 시 주의사항]
- 내용
        `.trim(),

        input: `
아래는 홈페이지에서 접수된 고객 문의입니다.

이름: ${inquiry.name}
업체명: ${inquiry.company || "미입력"}
문의 유형: ${
          inquiry.inquiry_type || "미입력"
        }
예상 예산: ${
          inquiry.budget || "미입력"
        }
희망 일정: ${
          inquiry.schedule || "미입력"
        }

문의 내용:
${inquiry.message}

기존 관리자 메모:
${inquiry.admin_memo || "없음"}
        `.trim(),
      });

    const generatedText =
      response.output_text.trim();

    if (!generatedText) {
      return {
        success: false,
        message:
          "AI 분석 결과가 비어 있습니다.",
        generatedText: "",
      };
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("contact_inquiries")
      .update({
        ai_summary: generatedText,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "AI 분석 저장 오류:",
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
      );

      return {
        success: false,
        message:
          "분석은 완료됐지만 DB에 저장하지 못했습니다.",
        generatedText,
      };
    }

    revalidatePath(
      `/admin/inquiries/${id}`,
    );

    return {
      success: true,
      message:
        "AI 문의 분석이 완료되었습니다.",
      generatedText,
    };
  } catch (error) {
    console.error(
      "AI 문의 분석 생성 오류:",
      error,
    );

    return {
      success: false,
      message:
        "AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      generatedText: "",
    };
  }
}

export async function generateInquiryReply(
  _previousState: InquiryAiActionState,
  formData: FormData,
): Promise<InquiryAiActionState> {
  const id = getText(formData, "id");

  if (!id) {
    return {
      success: false,
      message:
        "문의 ID를 확인할 수 없습니다.",
      generatedText: "",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      message:
        "OPENAI_API_KEY가 설정되지 않았습니다.",
      generatedText: "",
    };
  }

  const result =
    await getAuthenticatedInquiry(id);

  if (result.error || !result.inquiry) {
    return {
      success: false,
      message:
        result.error ??
        "문의 정보를 확인하지 못했습니다.",
      generatedText: "",
    };
  }

  const inquiry = result.inquiry;

  try {
    const response =
      await openai.responses.create({
        model:
          process.env.OPENAI_MODEL ||
          "gpt-4.1-mini",

        instructions: `
당신은 Design SMOOTHIE의 고객 상담 담당자입니다.

고객에게 보낼 첫 답변 초안을 한국어로 작성하세요.

답변 기준:
- 첫 문장은 "안녕하세요, 디자인스무디입니다."로 시작하세요.
- 문의에 감사한다는 말을 자연스럽게 포함하세요.
- 문의 내용을 실제로 읽었다는 것이 드러나야 합니다.
- 고객이 입력하지 않은 내용을 단정하지 마세요.
- 견적이나 작업 가능 여부를 확정하지 마세요.
- 필요한 추가 자료나 질문은 2~4개만 간결하게 정리하세요.
- 지나치게 영업적이거나 과장된 표현은 피하세요.
- 따뜻하지만 전문적인 말투를 사용하세요.
- 이모지는 사용하지 마세요.
- 마지막에는 확인 후 작업 가능 범위와 일정을 안내하겠다고 작성하세요.
- 이메일이나 카카오톡에 바로 복사할 수 있는 완성된 답변만 출력하세요.
        `.trim(),

        input: `
고객 이름: ${inquiry.name}
업체명: ${inquiry.company || "미입력"}
문의 유형: ${
          inquiry.inquiry_type || "미입력"
        }
예상 예산: ${
          inquiry.budget || "미입력"
        }
희망 일정: ${
          inquiry.schedule || "미입력"
        }

문의 내용:
${inquiry.message}

AI 문의 분석:
${inquiry.ai_summary || "아직 분석되지 않음"}

관리자 메모:
${inquiry.admin_memo || "없음"}
        `.trim(),
      });

    const generatedText =
      response.output_text.trim();

    if (!generatedText) {
      return {
        success: false,
        message:
          "AI 답변 결과가 비어 있습니다.",
        generatedText: "",
      };
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("contact_inquiries")
      .update({
        ai_reply_draft: generatedText,
      })
      .eq("id", id);

    if (error) {
      console.error(
        "AI 답변 저장 오류:",
        {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
      );

      return {
        success: false,
        message:
          "답변은 생성됐지만 DB에 저장하지 못했습니다.",
        generatedText,
      };
    }

    revalidatePath(
      `/admin/inquiries/${id}`,
    );

    return {
      success: true,
      message:
        "AI 답변 초안이 생성되었습니다.",
      generatedText,
    };
  } catch (error) {
    console.error(
      "AI 답변 초안 생성 오류:",
      error,
    );

    return {
      success: false,
      message:
        "AI 답변 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      generatedText: "",
    };
  }
}