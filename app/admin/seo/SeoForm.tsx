"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import type { SiteSettings } from "@/types/settings";

import {
  type SeoActionState,
  updateSeoSettings,
} from "./actions";

type SeoFormProps = {
  settings: SiteSettings;
};

const initialState: SeoActionState = {
  success: false,
  message: "",
};

export default function SeoForm({
  settings,
}: SeoFormProps) {
  const [state, formAction] = useActionState(
    updateSeoSettings,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-7">
      <input
        type="hidden"
        name="id"
        value={settings.id}
      />

      {state.message && (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm font-medium ${
            state.success
              ? "border-[#dce8bd] bg-[#f3f7e9] text-[#6f8c25]"
              : "border-[#f1caca] bg-[#fff3f3] text-[#b64b4b]"
          }`}
        >
          {state.message}
        </div>
      )}

      <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#333]">
            기본 SEO 설정
          </h2>

          <p className="mt-1 text-sm text-[#888]">
            검색결과와 SNS 공유에 사용되는 사이트 기본 정보입니다.
          </p>
        </div>

        <div className="grid gap-7">
          <Field
            id="site_title"
            name="site_title"
            label="사이트 제목"
            defaultValue={
              settings.site_title ??
              "디자인스무디 | 브랜딩 · 사이니지 · 공간그래픽 디자인"
            }
            placeholder="사이트 제목을 입력하세요."
            description="검색결과와 브라우저 탭에 표시되는 제목입니다."
          />

          <TextAreaField
            id="site_description"
            name="site_description"
            label="사이트 설명"
            defaultValue={
              settings.site_description ??
              "디자인스무디는 브랜딩, 간판, 파사드, 공간그래픽과 인쇄물 디자인을 제공하는 디자인 스튜디오입니다."
            }
            placeholder="사이트 설명을 입력하세요."
            description="검색결과에서 사이트 제목 아래에 표시될 수 있습니다."
          />

          <Field
            id="site_keywords"
            name="site_keywords"
            label="검색 키워드"
            defaultValue={
              settings.site_keywords ??
              "디자인스무디, 부산디자인, 부산간판, 브랜딩, 사이니지, 파사드디자인"
            }
            placeholder="키워드를 쉼표로 구분해 입력하세요."
            description="여러 키워드는 쉼표로 구분합니다."
          />

          <Field
            id="canonical_url"
            name="canonical_url"
            label="대표 사이트 주소"
            type="url"
            defaultValue={
              settings.canonical_url ??
              "https://designsmoothie.kr"
            }
            placeholder="https://designsmoothie.kr"
            description="검색엔진에 대표 주소로 알려줄 홈페이지 URL입니다."
          />
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#333]">
            검색엔진 인증
          </h2>

          <p className="mt-1 text-sm text-[#888]">
            검색엔진 소유권 인증에 사용하는 값입니다.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Field
            id="google_verification"
            name="google_verification"
            label="Google 인증 코드"
            defaultValue={
              settings.google_verification ?? ""
            }
            placeholder="Google 인증 코드"
          />

          <Field
            id="naver_verification"
            name="naver_verification"
            label="네이버 인증 코드"
            defaultValue={
              settings.naver_verification ?? ""
            }
            placeholder="네이버 인증 코드"
          />

          <Field
            id="bing_verification"
            name="bing_verification"
            label="Bing 인증 코드"
            defaultValue={
              settings.bing_verification ?? ""
            }
            placeholder="Bing 인증 코드"
          />
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
        <div className="mb-7">
          <h2 className="text-xl font-bold text-[#333]">
            검색 노출 상태
          </h2>

          <p className="mt-1 text-sm text-[#888]">
            홈페이지의 기본 검색엔진 파일 상태입니다.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <StatusCard
            title="Sitemap"
            description="/sitemap.xml"
          />

          <StatusCard
            title="Robots"
            description="/robots.txt"
          />

          <StatusCard
            title="대표 도메인"
            description={
              settings.canonical_url ??
              "https://designsmoothie.kr"
            }
          />
        </div>
      </section>

      <div className="sticky bottom-5 z-10 flex justify-end">
        <div className="rounded-full border border-[#e0e0dc] bg-white/90 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
  description?: string;
  type?: "text" | "url";
};

function Field({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  description,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#444]"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-2xl border border-[#deded9] bg-white px-4 text-sm text-[#333] outline-none transition placeholder:text-[#aaa] focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
      />

      {description && (
        <p className="mt-2 text-xs leading-5 text-[#999]">
          {description}
        </p>
      )}
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
  description?: string;
};

function TextAreaField({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  description,
}: TextAreaFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#444]"
      >
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        rows={5}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-[#deded9] bg-white px-4 py-4 text-sm leading-6 text-[#333] outline-none transition placeholder:text-[#aaa] focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
      />

      {description && (
        <p className="mt-2 text-xs leading-5 text-[#999]">
          {description}
        </p>
      )}
    </div>
  );
}

function StatusCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e5e5e1] bg-[#fafaf8] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-[#333]">
            {title}
          </p>

          <p className="mt-1 break-all text-sm text-[#999]">
            {description}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-[#edf3de] px-3 py-1 text-xs font-semibold text-[#78952c]">
          연결됨
        </span>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#999]"
    >
      {pending ? "저장 중..." : "SEO 설정 저장"}
    </button>
  );
}