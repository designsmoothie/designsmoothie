import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import HomepageSectionList, {
  type HomepageSection,
} from "./HomepageSectionList";

export default async function AdminHomepagePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_sections")
    .select(`
      id,
      section_key,
      section_name,
      content,
      is_active,
      display_order,
      created_at,
      updated_at
    `)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "홈페이지 섹션을 불러오는 중 오류가 발생했습니다.",
      error,
    );
  }

  const sections = (data ?? []) as HomepageSection[];
  const activeCount = sections.filter(
    (section) => section.is_active,
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1540px]">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#383838]">
              홈페이지 관리
            </h1>

            <p className="mt-2 text-base text-[#777]">
              홈페이지의 주요 영역과 표시 상태를 관리합니다.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#ddddda] bg-white px-6 text-sm font-semibold text-[#333] transition hover:bg-[#f0f0ed]"
          >
            홈페이지 확인 ↗
          </Link>
        </div>

        <div className="mb-7 grid gap-5 md:grid-cols-3">
          <SummaryCard
            label="전체 섹션"
            value={sections.length}
            description="CMS에 등록된 홈페이지 영역"
          />

          <SummaryCard
            label="표시 중"
            value={activeCount}
            description="현재 홈페이지에 공개된 영역"
          />

          <SummaryCard
            label="숨김"
            value={sections.length - activeCount}
            description="홈페이지에서 숨겨진 영역"
          />
        </div>

        {error ? (
          <section className="rounded-[24px] border border-[#efcece] bg-white p-8">
            <h2 className="text-xl font-bold text-[#333]">
              홈페이지 정보를 불러오지 못했습니다.
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#888]">
              Supabase의 homepage_sections 테이블과 접근 권한을
              확인해 주세요.
            </p>
          </section>
        ) : (
          <HomepageSectionList sections={sections} />
        )}
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#e2e2de] bg-white p-6">
      <p className="text-sm font-semibold text-[#777]">
        {label}
      </p>

      <p className="mt-2 text-4xl font-bold tracking-[-0.04em] text-black">
        {value}
      </p>

      <p className="mt-2 text-sm text-[#999]">
        {description}
      </p>
    </div>
  );
}