"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  type ContactContentActionState,
  updateContactContent,
} from "./actions";

export type ContactContent = {
  eyebrow?: string;
  english_title?: string;
  title_line_1?: string;
  title_line_2?: string;
  description_1?: string;
  description_2?: string;

  kakao_label?: string;
  kakao_title?: string;
  kakao_description?: string;

  inquiry_label?: string;
  inquiry_title?: string;
  inquiry_description?: string;

  bottom_label?: string;
  bottom_title_line_1?: string;
  bottom_title_line_2?: string;
};

type ContactContentFormProps = {
  content: ContactContent;
};

const initialState: ContactContentActionState = {
  success: false,
  message: "",
};

export default function ContactContentForm({
  content,
}: ContactContentFormProps) {
  const [state, formAction] = useActionState(
    updateContactContent,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-7">
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

      <Section
        title="문의 영역 상단"
        description="홈페이지 문의 섹션의 대표 제목과 설명입니다."
      >
        <Field
          name="eyebrow"
          label="상단 영문 라벨"
          defaultValue={
            content.eyebrow ?? "START A PROJECT"
          }
        />

        <Field
          name="english_title"
          label="영문 문구"
          defaultValue={
            content.english_title ??
            "Let's make it memorable."
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            name="title_line_1"
            label="메인 제목 첫 번째 줄"
            defaultValue={
              content.title_line_1 ??
              "당신의 브랜드는"
            }
          />

          <Field
            name="title_line_2"
            label="메인 제목 두 번째 줄"
            defaultValue={
              content.title_line_2 ??
              "어떤 기억으로 남고 있나요?"
            }
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TextAreaField
            name="description_1"
            label="설명 첫 번째 문단"
            defaultValue={
              content.description_1 ??
              "로고 하나를 만드는 일부터 브랜드가 공간에서 보이는 방식까지, 필요한 지점을 함께 찾습니다."
            }
          />

          <TextAreaField
            name="description_2"
            label="설명 두 번째 문단"
            defaultValue={
              content.description_2 ??
              "아직 작업 범위와 방향이 명확하지 않아도 괜찮습니다. 현재의 고민부터 편하게 들려주세요."
            }
          />
        </div>
      </Section>

      <Section
        title="상담 채널"
        description="카카오 상담과 홈페이지 문의 연결 문구를 관리합니다."
      >
        <div className="grid gap-7 border-b border-[#ecece8] pb-8">
          <Field
            name="kakao_label"
            label="카카오 영문 라벨"
            defaultValue={
              content.kakao_label ??
              "KAKAO CHANNEL"
            }
          />

          <Field
            name="kakao_title"
            label="카카오 상담 제목"
            defaultValue={
              content.kakao_title ??
              "카카오채널로 상담하기"
            }
          />

          <TextAreaField
            name="kakao_description"
            label="카카오 상담 설명"
            defaultValue={
              content.kakao_description ??
              "프로젝트의 목적과 필요한 작업, 현재 고민을 가장 편하게 전달할 수 있는 상담 채널입니다."
            }
          />
        </div>

        <div className="grid gap-7 pt-2">
          <Field
            name="inquiry_label"
            label="문의 폼 영문 라벨"
            defaultValue={
              content.inquiry_label ??
              "PROJECT INQUIRY"
            }
          />

          <Field
            name="inquiry_title"
            label="문의 폼 제목"
            defaultValue={
              content.inquiry_title ??
              "프로젝트 문의 남기기"
            }
          />

          <TextAreaField
            name="inquiry_description"
            label="문의 폼 설명"
            defaultValue={
              content.inquiry_description ??
              "브랜딩, 간판, 파사드, 인쇄물과 공간 그래픽 작업을 문의할 수 있습니다."
            }
          />
        </div>
      </Section>

      <Section
        title="하단 문의 유도 문구"
        description="문의 섹션 마지막에 크게 표시되는 문구입니다."
      >
        <Field
          name="bottom_label"
          label="영문 라벨"
          defaultValue={
            content.bottom_label ??
            "LET'S WORK TOGETHER"
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Field
            name="bottom_title_line_1"
            label="제목 첫 번째 줄"
            defaultValue={
              content.bottom_title_line_1 ??
              "함께 만들 이야기가"
            }
          />

          <Field
            name="bottom_title_line_2"
            label="제목 두 번째 줄"
            defaultValue={
              content.bottom_title_line_2 ??
              "있다면, 들려주세요."
            }
          />
        </div>
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
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#333]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#888]">
          {description}
        </p>
      </div>

      <div className="grid gap-7">{children}</div>
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
      className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#999]"
    >
      {pending
        ? "저장 중..."
        : "문의 콘텐츠 저장"}
    </button>
  );
}