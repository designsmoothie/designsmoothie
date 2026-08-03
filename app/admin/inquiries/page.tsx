import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

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
  source: string;
  created_at: string;
  updated_at: string;
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
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
  }).format(new Date(value));
}

function getStatusCount(
  inquiries: ContactInquiry[],
  status: InquiryStatus,
) {
  return inquiries.filter(
    (inquiry) => inquiry.status === status,
  ).length;
}

export default async function InquiriesPage() {
  const supabase = await createClient();

  const {
    data,
    error,
  } = await supabase
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
      source,
      created_at,
      updated_at
    `)
    .order("created_at", {
      ascending: false,
    });

 if (error) {
  console.log("문의 목록 불러오기 오류:", {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
}

  const inquiries =
    (data ?? []) as ContactInquiry[];

  return (
    <main className="min-h-screen bg-[#f6f6f3] px-5 py-8 sm:px-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col gap-6 border-b border-[#ddddda] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#8a8a84]">
              CONTACT MANAGEMENT
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#222] md:text-4xl">
              문의관리
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#777]">
              홈페이지에서 접수된 프로젝트
              문의를 확인하고 상담 상태를
              관리합니다.
            </p>
          </div>

          <div className="text-sm text-[#777]">
            전체 문의{" "}
            <strong className="ml-1 text-lg text-[#222]">
              {inquiries.length}
            </strong>
          </div>
        </header>

        {error && (
  <div className="mt-7 rounded-2xl border border-[#efcccc] bg-[#fff3f3] px-5 py-4 text-sm leading-7 text-[#b65353]">
    <p className="font-semibold">
      문의 목록을 불러오지 못했습니다.
    </p>

    <p className="mt-2">
      오류 코드: {error.code || "확인 불가"}
    </p>

    <p>
      오류 내용: {error.message || "확인 불가"}
    </p>
  </div>
)}

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(
            Object.keys(
              statusLabels,
            ) as InquiryStatus[]
          ).map((status) => (
            <div
              key={status}
              className="rounded-[20px] border border-[#e2e2de] bg-white p-5"
            >
              <p className="text-xs font-semibold text-[#888]">
                {statusLabels[status]}
              </p>

              <p className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#222]">
                {getStatusCount(
                  inquiries,
                  status,
                )}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-[24px] border border-[#e2e2de] bg-white">
          <div className="hidden grid-cols-[110px_1fr_160px_170px_120px] gap-5 border-b border-[#ecece8] bg-[#fafaf8] px-7 py-4 text-[11px] font-semibold tracking-[0.08em] text-[#888] lg:grid">
            <span>상태</span>
            <span>문의자 / 내용</span>
            <span>연락처</span>
            <span>접수일</span>
            <span className="text-right">
              관리
            </span>
          </div>

          {inquiries.length === 0 ? (
            <div className="px-6 py-24 text-center">
              <p className="text-lg font-semibold text-[#444]">
                아직 접수된 문의가 없습니다.
              </p>

              <p className="mt-2 text-sm text-[#888]">
                홈페이지 문의 폼이 연결되면
                이곳에 문의가 표시됩니다.
              </p>
            </div>
          ) : (
            <div>
              {inquiries.map(
                (inquiry) => (
                  <article
                    key={inquiry.id}
                    className="grid gap-5 border-b border-[#ecece8] px-6 py-6 last:border-b-0 lg:grid-cols-[110px_1fr_160px_170px_120px] lg:items-center lg:px-7"
                  >
                    <div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
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

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h2 className="font-bold text-[#292929]">
                          {inquiry.name}
                        </h2>

                        {inquiry.company && (
                          <span className="text-xs text-[#888]">
                            {
                              inquiry.company
                            }
                          </span>
                        )}
                      </div>

                      {inquiry.inquiry_type && (
                        <p className="mt-2 text-xs font-semibold text-[#79952f]">
                          {
                            inquiry.inquiry_type
                          }
                        </p>
                      )}

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#666]">
                        {inquiry.message}
                      </p>
                    </div>

                    <div className="text-sm leading-6 text-[#666]">
                      {inquiry.phone && (
                        <p>
                          {inquiry.phone}
                        </p>
                      )}

                      {inquiry.email && (
                        <p className="truncate">
                          {inquiry.email}
                        </p>
                      )}

                      {!inquiry.phone &&
                        !inquiry.email && (
                          <p className="text-[#aaa]">
                            연락처 없음
                          </p>
                        )}
                    </div>

                    <div className="text-sm text-[#777]">
                      {formatDate(
                        inquiry.created_at,
                      )}
                    </div>

                    <div className="flex lg:justify-end">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[#d9d9d4] px-5 text-sm font-semibold text-[#444] transition hover:border-[#94b63f] hover:text-[#6f8c25]"
                      >
                        상세보기
                      </Link>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}