"use client";

import type { ReactNode } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  type HeroContentActionState,
  updateHeroContent,
} from "./actions";

export type HeroContent = {
  eyebrow?: string;
  service_label?: string;

  title_line_1?: string;
  title_line_2?: string;

  lead_text?: string;
  description?: string;

  primary_button_label?: string;
  primary_button_url?: string;

  secondary_button_label?: string;
  secondary_button_url?: string;

  image_url?: string;
  image_alt?: string;

  project_label?: string;
  project_title?: string;
  project_location?: string;
};

type HeroContentFormProps = {
  content: HeroContent;
};

const initialState: HeroContentActionState = {
  success: false,
  message: "",
};

export default function HeroContentForm({
  content,
}: HeroContentFormProps) {
  const [state, formAction] = useActionState(
    updateHeroContent,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="grid gap-8"
    >
      {state.message && (
  <div
    className={`fixed right-6 top-24 z-[100] max-w-[420px] rounded-2xl border px-6 py-4 text-sm font-semibold shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md ${
      state.success
        ? "border-[#dce8bd] bg-[#f3f7e9]/95 text-[#6f8c25]"
        : "border-[#f1caca] bg-[#fff3f3]/95 text-[#b64b4b]"
    }`}
  >
    {state.success ? "✓ " : "⚠ "}
    {state.message}
  </div>
)}

      <Section
        title="Hero 상단"
        description="Hero 최상단의 브랜드와 서비스 안내 문구입니다."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            name="eyebrow"
            label="브랜드 라벨"
            defaultValue={
              content.eyebrow ??
              "DESIGN SMOOTHIE"
            }
          />

          <Field
            name="service_label"
            label="서비스 라벨"
            defaultValue={
              content.service_label ??
              "BRANDING · SIGNAGE · SPACE GRAPHIC"
            }
          />
        </div>
      </Section>

      <Section
        title="메인 타이틀"
        description="홈페이지 첫 화면에 가장 크게 표시되는 영문 문구입니다."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            name="title_line_1"
            label="첫 번째 줄"
            defaultValue={
              content.title_line_1 ??
              "Design that stays."
            }
          />

          <Field
            name="title_line_2"
            label="두 번째 줄"
            defaultValue={
              content.title_line_2 ??
              "Not just looks."
            }
          />
        </div>
      </Section>

      <Section
        title="소개 문구"
        description="메인 타이틀 아래에 표시되는 브랜드 소개 내용입니다."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <TextAreaField
            name="lead_text"
            label="왼쪽 강조 문구"
            defaultValue={
              content.lead_text ??
              `브랜딩부터 간판까지,
오래 기억되는 브랜드 경험을 만듭니다.`
            }
          />

          <TextAreaField
            name="description"
            label="오른쪽 설명 문구"
            defaultValue={
              content.description ??
              `로고와 그래픽에 머무르지 않고,
브랜드가 실제 공간에서 어떻게 보이고
기억되는지까지 설계합니다.`
            }
          />
        </div>
      </Section>

      <Section
        title="바로가기 버튼"
        description="Hero에서 포트폴리오와 문의 페이지로 연결되는 버튼입니다."
      >
        <div className="grid gap-8">
          <div className="grid gap-6 border-b border-[#ecece8] pb-8 lg:grid-cols-2">
            <Field
              name="primary_button_label"
              label="첫 번째 버튼 이름"
              defaultValue={
                content.primary_button_label ??
                "포트폴리오 보기"
              }
            />

            <Field
              name="primary_button_url"
              label="첫 번째 버튼 링크"
              defaultValue={
                content.primary_button_url ??
                "/portfolio"
              }
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Field
              name="secondary_button_label"
              label="두 번째 버튼 이름"
              defaultValue={
                content.secondary_button_label ??
                "프로젝트 문의"
              }
            />

            <Field
              name="secondary_button_url"
              label="두 번째 버튼 링크"
              defaultValue={
                content.secondary_button_url ??
                "/contact"
              }
            />
          </div>
        </div>
      </Section>

      <Section
        title="대표 이미지"
        description="Hero 하단에 가로 전체로 표시되는 대표 이미지입니다."
      >
        <Field
          name="image_url"
          label="이미지 경로"
          defaultValue={
            content.image_url ??
            "/images/hero/signage.jpg"
          }
        />

        <Field
          name="image_alt"
          label="이미지 ALT"
          defaultValue={
            content.image_alt ??
            "디자인스무디 사이니지 프로젝트"
          }
        />

        <p className="-mt-3 text-xs leading-6 text-[#999]">
          현재는 기존 이미지 경로나 외부 이미지
          URL을 입력하는 방식입니다. 이미지 업로드
          기능은 기존 Supabase Storage 구조와 맞춰
          별도로 연결할 수 있습니다.
        </p>
      </Section>

      <Section
        title="대표 이미지 프로젝트 정보"
        description="대표 이미지 위에 표시되는 프로젝트 제목과 위치 정보입니다."
      >
        <Field
          name="project_label"
          label="프로젝트 라벨"
          defaultValue={
            content.project_label ??
            "SELECTED PROJECT"
          }
        />

        <TextAreaField
          name="project_title"
          label="프로젝트 제목"
          defaultValue={
            content.project_title ??
            "Signage & Brand Experience"
          }
        />

        <Field
          name="project_location"
          label="프로젝트 위치"
          defaultValue={
            content.project_location ??
            "BUSAN · KOREA"
          }
        />
      </Section>

      <div className="sticky bottom-5 z-10 flex justify-end">
        <div className="rounded-full border border-[#e0e0dc] bg-white/90 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[#e5e5e0] bg-[#fafaf8] p-6 md:p-8">
      <div className="mb-8 border-b border-[#e6e6e1] pb-5">
        <h2 className="text-xl font-bold tracking-[-0.03em] text-[#333]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#888]">
          {description}
        </p>
      </div>

      <div className="grid gap-7">
        {children}
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#444]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        defaultValue={defaultValue}
        className="h-[52px] w-full rounded-2xl border border-[#deded9] bg-white px-4 text-sm text-[#333] outline-none transition focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
      />
    </div>
  );
}

function TextAreaField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#444]"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={5}
        defaultValue={defaultValue}
        className="w-full resize-none rounded-2xl border border-[#deded9] bg-white px-4 py-4 text-sm leading-7 text-[#333] outline-none transition focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center rounded-full bg-[#333] px-7 text-sm font-semibold text-white transition hover:bg-[#94b63f] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? "저장 중..."
        : "Hero 콘텐츠 저장"}
    </button>
  );
}