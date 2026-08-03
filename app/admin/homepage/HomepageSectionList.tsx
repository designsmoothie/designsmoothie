"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { toggleHomepageSection } from "./actions";

export type HomepageSection = {
  id: string;
  section_key: string;
  section_name: string;
  content: Record<string, unknown>;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

type HomepageSectionListProps = {
  sections: HomepageSection[];
};

const sectionDescriptions: Record<string, string> = {
  hero: "홈페이지 첫 화면의 대표 문구와 비주얼을 관리합니다.",
  about: "디자인스무디 소개 문구와 브랜드 이야기를 관리합니다.",
  service: "제공 서비스와 서비스 설명을 관리합니다.",
  process: "프로젝트 진행 과정과 단계별 안내를 관리합니다.",
  contact: "문의 유도 문구와 상담 채널을 관리합니다.",
  footer: "푸터 문구, 연락처와 외부 채널을 관리합니다.",
};

const sectionLabels: Record<string, string> = {
  hero: "첫 화면",
  about: "브랜드 소개",
  service: "서비스",
  process: "진행 과정",
  contact: "문의 영역",
  footer: "푸터",
};

export default function HomepageSectionList({
  sections,
}: HomepageSectionListProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleToggle(
    sectionId: string,
    currentActiveState: boolean,
  ) {
    setMessage("");

    startTransition(async () => {
      const result = await toggleHomepageSection(
        sectionId,
        !currentActiveState,
      );

      setMessage(result.message);
    });
  }

  return (
    <div>
      {message && (
        <div className="mb-6 rounded-2xl border border-[#dce8bd] bg-[#f3f7e9] px-5 py-4 text-sm font-medium text-[#6f8c25]">
          {message}
        </div>
      )}

      <div className="overflow-hidden rounded-[24px] border border-[#e2e2de] bg-white">
        <div className="border-b border-[#ecece8] px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#333]">
                홈페이지 섹션
              </h2>

              <p className="mt-1 text-sm text-[#888]">
                각 영역의 콘텐츠와 홈페이지 표시 여부를 관리합니다.
              </p>
            </div>

            <p className="text-sm text-[#999]">
              총 {sections.length}개 섹션
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#ecece8]">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="grid gap-5 px-6 py-6 sm:px-8 lg:grid-cols-[70px_1fr_auto] lg:items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f3f0] text-sm font-semibold text-[#777]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-bold text-[#333]">
                    {sectionLabels[section.section_key] ??
                      section.section_name}
                  </h3>

                  <span className="rounded-full bg-[#f1f1ef] px-3 py-1 text-xs text-[#777]">
                    {section.section_key}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      section.is_active
                        ? "bg-[#edf3de] text-[#78952c]"
                        : "bg-[#f1f1ef] text-[#888]"
                    }`}
                  >
                    {section.is_active ? "표시중" : "숨김"}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-[#888]">
                  {sectionDescriptions[section.section_key] ??
                    "홈페이지 섹션 콘텐츠를 관리합니다."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    handleToggle(
                      section.id,
                      section.is_active,
                    )
                  }
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#ddddda] bg-white px-5 text-sm font-semibold text-[#555] transition hover:bg-[#f5f5f2] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {section.is_active
                    ? "홈페이지에서 숨기기"
                    : "홈페이지에 표시"}
                </button>

                <Link
                  href={`/admin/homepage/${section.section_key}`}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-[#333]"
                >
                  콘텐츠 수정
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-7 rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#333]">
          홈페이지 운영 안내
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <GuideCard
            number="01"
            title="콘텐츠 수정"
            description="각 섹션의 제목과 설명, 버튼 문구를 변경합니다."
          />

          <GuideCard
            number="02"
            title="표시 여부"
            description="필요하지 않은 섹션은 홈페이지에서 잠시 숨길 수 있습니다."
          />

          <GuideCard
            number="03"
            title="홈페이지 반영"
            description="저장한 내용은 실제 홈페이지에 자동으로 반영됩니다."
          />
        </div>
      </section>
    </div>
  );
}

function GuideCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-5">
      <p className="text-xs font-semibold tracking-[0.14em] text-[#94b63f]">
        {number}
      </p>

      <p className="mt-4 font-semibold text-[#333]">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-[#888]">
        {description}
      </p>
    </div>
  );
}