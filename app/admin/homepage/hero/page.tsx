import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import HeroContentForm, {
  type HeroContent,
} from "./HeroContentForm";

export default async function AdminHeroContentPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_sections")
    .select("content, is_active")
    .eq("section_key", "hero")
    .maybeSingle();

  if (error) {
    console.error(
      "Hero 콘텐츠 불러오기 오류:",
      error,
    );
  }

  const content =
    (data?.content as HeroContent | null) ?? {};

  return (
    <main className="mx-auto w-full max-w-[1400px] px-6 py-10 md:px-10 lg:px-12">
      <div className="mb-10 flex flex-col gap-6 border-b border-[#e6e6e1] pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/admin/homepage"
            className="mb-5 inline-flex text-sm font-semibold text-[#777] transition hover:text-[#94b63f]"
          >
            ← 홈페이지 관리
          </Link>

          <p className="mb-2 text-sm font-semibold text-[#94b63f]">
            Design SMOOTHIE CMS
          </p>

          <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#383838]">
            Hero 영역 관리
          </h1>

          <p className="mt-2 text-base text-[#777]">
            홈페이지 첫 화면의 문구, 버튼,
            대표 이미지를 관리합니다.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full border border-[#ddddda] bg-white px-6 text-sm font-semibold text-[#333] transition hover:bg-[#f0f0ed]"
        >
          Hero 확인 ↗
        </Link>
      </div>

      {error ? (
        <section className="rounded-[24px] border border-[#efcece] bg-white p-8">
          <h2 className="text-xl font-bold text-[#333]">
            Hero 콘텐츠를 불러오지 못했습니다.
          </h2>

          <p className="mt-2 text-sm text-[#888]">
            homepage_sections 테이블의 hero 데이터를
            확인해 주세요.
          </p>
        </section>
      ) : (
        <HeroContentForm content={content} />
      )}
    </main>
  );
}