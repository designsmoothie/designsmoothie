import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import ContactContentForm, {
  type ContactContent,
} from "./ContactContentForm";

export default async function AdminContactContentPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("content, is_active")
    .eq("section_key", "contact")
    .maybeSingle();

  if (error) {
    console.error(
      "문의 콘텐츠 불러오기 오류:",
      error,
    );
  }

  const content =
    (data?.content as ContactContent | null) ?? {};

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1540px]">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/admin/homepage"
              className="mb-5 inline-flex text-sm font-semibold text-[#777] transition hover:text-black"
            >
              ← 홈페이지 관리
            </Link>

            <p className="mb-2 text-sm font-semibold text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#383838]">
              문의 영역 관리
            </h1>

            <p className="mt-2 text-base text-[#777]">
              홈페이지에 표시되는 문의 유도 문구와 상담 채널을 관리합니다.
            </p>
          </div>

          <Link
            href="/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#ddddda] bg-white px-6 text-sm font-semibold text-[#333] transition hover:bg-[#f0f0ed]"
          >
            문의 영역 확인 ↗
          </Link>
        </div>

        {error ? (
          <section className="rounded-[24px] border border-[#efcece] bg-white p-8">
            <h2 className="text-xl font-bold text-[#333]">
              문의 콘텐츠를 불러오지 못했습니다.
            </h2>

            <p className="mt-2 text-sm text-[#888]">
              homepage_sections 테이블의 contact 데이터를 확인해 주세요.
            </p>
          </section>
        ) : (
          <ContactContentForm content={content} />
        )}
      </div>
    </main>
  );
}