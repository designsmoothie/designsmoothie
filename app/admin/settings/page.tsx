import Link from "next/link";

import { getSiteSettings } from "@/lib/settings";

import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1540px]">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#383838]">
              사이트 설정
            </h1>

            <p className="mt-2 text-base text-[#777]">
              브랜드 정보, 연락처와 외부 채널을 관리합니다.
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

        {settings ? (
          <SettingsForm settings={settings} />
        ) : (
          <section className="rounded-[24px] border border-[#efcece] bg-white p-8">
            <h2 className="text-xl font-bold text-[#333]">
              사이트 설정을 불러오지 못했습니다.
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#888]">
              Supabase의 site_settings 테이블에 설정 데이터가
              존재하는지 확인해 주세요.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}