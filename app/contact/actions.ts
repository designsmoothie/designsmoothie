"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ContactInquiryActionState = {
  success: boolean;
  message: string;
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

export async function createContactInquiry(
  _previousState: ContactInquiryActionState,
  formData: FormData,
): Promise<ContactInquiryActionState> {
  const name = getText(formData, "name");
  const company = getText(formData, "company");
  const phone = getText(formData, "phone");
  const email = getText(formData, "email");
  const inquiryType = getText(
    formData,
    "inquiry_type",
  );
  const budget = getText(formData, "budget");
  const schedule = getText(
    formData,
    "schedule",
  );
  const message = getText(
    formData,
    "message",
  );

  if (!name) {
    return {
      success: false,
      message: "이름을 입력해 주세요.",
    };
  }

  if (!phone && !email) {
    return {
      success: false,
      message:
        "연락 가능한 전화번호 또는 이메일을 입력해 주세요.",
    };
  }

  if (!inquiryType) {
    return {
      success: false,
      message: "문의 유형을 선택해 주세요.",
    };
  }

  if (!message) {
    return {
      success: false,
      message: "문의 내용을 입력해 주세요.",
    };
  }

  if (
    email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return {
      success: false,
      message:
        "이메일 주소 형식을 확인해 주세요.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_inquiries")
    .insert({
      name,
      company: company || null,
      phone: phone || null,
      email: email || null,
      inquiry_type: inquiryType,
      budget: budget || null,
      schedule: schedule || null,
      message,
      status: "new",
      source: "website",
    });

  if (error) {
    console.error(
      "홈페이지 문의 등록 오류:",
      error,
    );

    return {
      success: false,
      message:
        "문의 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  revalidatePath("/admin/inquiries");

  return {
    success: true,
    message:
      "문의가 정상적으로 접수되었습니다. 확인 후 연락드리겠습니다.",
  };
}