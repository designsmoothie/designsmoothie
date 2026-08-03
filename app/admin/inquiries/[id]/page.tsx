import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import InquiryManagementForm from "./InquiryManagementForm";

import InquiryAiAssistant from "./InquiryAiAssistant";

type InquiryStatus =
  | "new"
  | "checking"
  | "consulting"
  | "completed"
  | "cancelled";

type ContactInquiry = {
  id: string;
  name: string;
  company: string | null;
  phone: string | null;
  email: string | null;
  inquiry_type: string | null;
  budget: string | null;
  schedule: string | null;
  message: string;
  status: InquiryStatus;
  admin_memo: string | null;
  ai_summary: string | null;
  ai_reply_draft: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const statusLabels: Record<
  InquiryStatus,
  string
> = {
  new: "신규",
  checking: "확인 중",
  consulting: "상담 중",
  completed: "상담 완료",
  cancelled: "취소",
};

const statusStyles: Record<
  InquiryStatus,
  string
> = {
  new: "border-[#dce8bd] bg-[#f3f7e9] text-[#6f8c25]",
  checking:
    "border-[#eadfb8] bg-[#fff9e8] text-[#9a7418]",
  consulting:
    "border-[#cfdff0] bg-[#f1f7fc] text-[#4d7396]",
  completed:
    "border-[#d9d9d5] bg-[#f4f4f1] text-[#6e6e68]",
  cancelled:
    "border-[#efcccc] bg-[#fff3f3] text-[#b65353]",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    },
  ).format(new Date(value));
}

export default async function InquiryDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createClient();

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
      ai_reply_draft,
      source,
      created_at,
      updated_at
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "문의 상세 불러오기 오류:",
      {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      },
    );
  }

  if (!data) {
    notFound();
  }

  const inquiry =
    data as ContactInquiry;

  return (
    <main className="min-h-screen bg-[#f6f6f3] px-5 py-8 sm:px-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1450px]">
        <header className="border-b border-[#ddddda] pb-8">
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#777] transition hover:text-black"
          >
            ← 문의 목록
          </Link>

          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#8a8a84]">
                INQUIRY DETAIL
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#222] md:text-4xl">
                {inquiry.name}님의 문의
              </h1>

              <p className="mt-3 text-sm text-[#777]">
                {formatDate(
                  inquiry.created_at,
                )}{" "}
                접수
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full border px-4 py-2 text-sm font-semibold ${
                statusStyles[
                  inquiry.status
                ]
              }`}
            >
              {
                statusLabels[
                  inquiry.status
                ]
              }
            </span>
          </div>
        </header>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="grid gap-8">
            <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#999]">
                CUSTOMER INFORMATION
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#292929]">
                문의자 정보
              </h2>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <InfoItem
                  label="이름"
                  value={inquiry.name}
                />

                <InfoItem
                  label="업체명"
                  value={
                    inquiry.company ||
                    "-"
                  }
                />

                <InfoItem
                  label="연락처"
                  value={
                    inquiry.phone ||
                    "-"
                  }
                />

                <InfoItem
                  label="이메일"
                  value={
                    inquiry.email ||
                    "-"
                  }
                />

                <InfoItem
                  label="문의 유형"
                  value={
                    inquiry.inquiry_type ||
                    "-"
                  }
                />

                <InfoItem
                  label="예상 예산"
                  value={
                    inquiry.budget ||
                    "-"
                  }
                />

                <InfoItem
                  label="희망 일정"
                  value={
                    inquiry.schedule ||
                    "-"
                  }
                />

                <InfoItem
                  label="접수 경로"
                  value={
                    inquiry.source ===
                    "website"
                      ? "홈페이지"
                      : inquiry.source
                  }
                />
              </dl>
            </section>

            <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#999]">
                MESSAGE
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#292929]">
                문의 내용
              </h2>

              <div className="mt-8 whitespace-pre-wrap rounded-[20px] bg-[#f7f7f4] p-6 text-sm leading-8 text-[#555] sm:text-base">
                {inquiry.message}
              </div>
            </section>

            <InquiryAiAssistant
  inquiryId={inquiry.id}
  initialSummary={
    inquiry.ai_summary ?? ""
  }
  initialReplyDraft={
    inquiry.ai_reply_draft ?? ""
  }
/>
          </div>

          <div>
            <InquiryManagementForm
              id={inquiry.id}
              status={inquiry.status}
              adminMemo={
                inquiry.admin_memo ??
                ""
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#ecece8] pb-4">
      <dt className="text-xs font-semibold text-[#999]">
        {label}
      </dt>

      <dd className="mt-2 break-words text-sm font-medium leading-6 text-[#333]">
        {value}
      </dd>
    </div>
  );
}