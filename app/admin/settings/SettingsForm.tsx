"use client";

import {
  useActionState,
  useEffect,
  useRef,
} from "react";
import { useFormStatus } from "react-dom";

import type { SiteSettings } from "@/types/settings";

import {
  type SettingsActionState,
  updateSiteSettings,
} from "./actions";

type SettingsFormProps = {
  settings: SiteSettings;
};

const initialState: SettingsActionState = {
  success: false,
  message: "",
};

export default function SettingsForm({
  settings,
}: SettingsFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState(
    updateSiteSettings,
    initialState,
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-7"
    >
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
            브랜드 정보
          </h2>

          <p className="mt-1 text-sm text-[#888]">
            홈페이지 전반에 표시되는 기본 브랜드 정보입니다.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            id="brand_name"
            name="brand_name"
            label="브랜드명"
            defaultValue={
              settings.brand_name ?? "Design SMOOTHIE"
            }
            placeholder="Design SMOOTHIE"
          />

          <Field
            id="slogan"
            name="slogan"
            label="슬로건"
            defaultValue={
              settings.slogan ?? "JUST SMOOTHIE-ISH."
            }
            placeholder="JUST SMOOTHIE-ISH."
          />

          <Field
            id="ceo_name"
            name="ceo_name"
            label="대표자명"
            defaultValue={settings.ceo_name ?? ""}
            placeholder="대표자명을 입력하세요."
          />

          <Field
            id="business_number"
            name="business_number"
            label="사업자등록번호"
            defaultValue={
              settings.business_number ?? ""
            }
            placeholder="000-00-00000"
          />
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#333]">
            연락처 및 주소
          </h2>

          <p className="mt-1 text-sm text-[#888]">
            고객에게 표시되는 대표 연락처와 사업장 정보를 관리합니다.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            id="phone"
            name="phone"
            label="대표 전화번호"
            defaultValue={settings.phone ?? ""}
            placeholder="010-0000-0000"
            inputMode="tel"
          />

          <Field
            id="email"
            name="email"
            label="대표 이메일"
            type="email"
            defaultValue={settings.email ?? ""}
            placeholder="hello@designsmoothie.kr"
          />

          <div className="lg:col-span-2">
            <Field
              id="address"
              name="address"
              label="사업장 주소"
              defaultValue={settings.address ?? ""}
              placeholder="주소를 입력하세요."
            />
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#333]">
            외부 채널
          </h2>

          <p className="mt-1 text-sm text-[#888]">
            카카오채널, 인스타그램과 네이버 블로그 주소를 관리합니다.
          </p>
        </div>

        <div className="grid gap-6">
          <Field
            id="kakao_url"
            name="kakao_url"
            label="카카오채널 URL"
            type="url"
            defaultValue={settings.kakao_url ?? ""}
            placeholder="https://pf.kakao.com/..."
          />

          <Field
            id="instagram_url"
            name="instagram_url"
            label="인스타그램 URL"
            type="url"
            defaultValue={
              settings.instagram_url ?? ""
            }
            placeholder="https://instagram.com/..."
          />

          <Field
            id="blog_url"
            name="blog_url"
            label="네이버 블로그 URL"
            type="url"
            defaultValue={
              settings.blog_url ??
              "https://blog.naver.com/hello_smoothie"
            }
            placeholder="https://blog.naver.com/..."
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
  type?: "text" | "email" | "url";
  inputMode?:
    | "text"
    | "tel"
    | "email"
    | "url";
};

function Field({
  id,
  name,
  label,
  defaultValue,
  placeholder,
  type = "text",
  inputMode,
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
        inputMode={inputMode}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-2xl border border-[#deded9] bg-white px-4 text-sm text-[#333] outline-none transition placeholder:text-[#aaa] focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
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
      className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#999]"
    >
      {pending ? "저장 중..." : "사이트 설정 저장"}
    </button>
  );
}