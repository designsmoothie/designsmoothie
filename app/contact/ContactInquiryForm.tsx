"use client";

import {
  type FormEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import {
  createContactInquiry,
  type ContactInquiryActionState,
} from "./actions";

const initialState: ContactInquiryActionState = {
  success: false,
  message: "",
};

export default function ContactInquiryForm() {
  const formRef =
    useRef<HTMLFormElement>(null);

  const [clientError, setClientError] =
    useState("");

  const [state, formAction] = useActionState(
    createContactInquiry,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setClientError("");
    }
  }, [state.success]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(
      formData.get("name") ?? "",
    ).trim();

    const phone = String(
      formData.get("phone") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    const inquiryType = String(
      formData.get("inquiry_type") ?? "",
    ).trim();

    const message = String(
      formData.get("message") ?? "",
    ).trim();

    let errorMessage = "";
    let targetName = "";

    if (!name) {
      errorMessage =
        "이름을 입력해 주세요.";
      targetName = "name";
    } else if (!phone && !email) {
      errorMessage =
        "연락 가능한 전화번호 또는 이메일을 입력해 주세요.";
      targetName = "phone";
    } else if (!inquiryType) {
      errorMessage =
        "문의 유형을 선택해 주세요.";
      targetName = "inquiry_type";
    } else if (!message) {
      errorMessage =
        "문의 내용을 입력해 주세요.";
      targetName = "message";
    } else if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      errorMessage =
        "이메일 주소 형식을 확인해 주세요.";
      targetName = "email";
    }

    if (errorMessage) {
      event.preventDefault();
      setClientError(errorMessage);

      const target =
        form.elements.namedItem(targetName);

      if (
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLSelectElement ||
        target instanceof
          HTMLTextAreaElement
      ) {
        target.focus();
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      return;
    }

    setClientError("");
  }

  const visibleMessage =
    clientError || state.message;

  const isSuccess =
    !clientError && state.success;

  return (
    <section className="mt-28 md:mt-40">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
            PROJECT INQUIRY
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
            프로젝트에 대해
            <br />
            들려주세요.
          </h2>

          <p className="mt-7 max-w-md text-base leading-8 text-[var(--text)]">
            아직 작업 범위가 명확하지 않아도
            괜찮습니다. 현재 필요한 내용과
            고민되는 부분부터 편하게 남겨주세요.
          </p>

          <div className="mt-10 border-t border-[var(--line)] pt-6">
            <p className="text-sm leading-7 text-[var(--muted)]">
              접수된 문의는 확인 후 순서대로
              연락드립니다.
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          action={formAction}
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[32px] border border-black/5 bg-white/65 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:p-8 md:rounded-[42px] md:p-11"
        >
          {visibleMessage && (
            <div
              role="alert"
              aria-live="polite"
              className={`mb-8 rounded-2xl border px-5 py-4 text-sm font-medium leading-6 ${
                isSuccess
                  ? "border-[#dce8bd] bg-[#f3f7e9] text-[#6f8c25]"
                  : "border-[#efcccc] bg-[#fff3f3] text-[#b65353]"
              }`}
            >
              {visibleMessage}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              name="name"
              label="이름"
              placeholder="성함을 입력해 주세요"
              required
            />

            <Field
              name="company"
              label="업체명"
              placeholder="업체명 또는 브랜드명"
            />

            <Field
              name="phone"
              label="연락처"
              placeholder="010-0000-0000"
              inputMode="tel"
            />

            <Field
              name="email"
              label="이메일"
              placeholder="example@email.com"
              type="email"
            />

            <SelectField
              name="inquiry_type"
              label="문의 유형"
              required
              options={[
                "브랜딩",
                "간판 및 파사드",
                "공간 그래픽",
                "인쇄물",
                "홈페이지",
                "기타",
              ]}
            />

            <SelectField
              name="budget"
              label="예상 예산"
              options={[
                "50만 원 미만",
                "50만 원 ~ 100만 원",
                "100만 원 ~ 300만 원",
                "300만 원 ~ 500만 원",
                "500만 원 이상",
                "상담 후 결정",
              ]}
            />

            <div className="md:col-span-2">
              <Field
                name="schedule"
                label="희망 일정"
                placeholder="예: 9월 중 오픈 예정"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-[var(--text-dark)]"
              >
                문의 내용
                <span className="ml-1 text-[var(--green)]">
                  *
                </span>
              </label>

              <textarea
                id="message"
                name="message"
                rows={8}
                placeholder="필요한 작업, 현재 상황, 참고사항을 자유롭게 작성해 주세요."
                className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-sm leading-7 text-[var(--text-dark)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--line)] pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-[var(--muted)]">
              이름과 연락처는 상담 목적으로만
              사용됩니다.
            </p>

            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  inputMode,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  inputMode?:
    | "text"
    | "tel"
    | "email"
    | "numeric";
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[var(--text-dark)]"
      >
        {label}

        {required && (
          <span className="ml-1 text-[var(--green)]">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        className="h-[54px] w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm text-[var(--text-dark)] outline-none transition placeholder:text-[var(--muted)]/70 focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  required = false,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[var(--text-dark)]"
      >
        {label}

        {required && (
          <span className="ml-1 text-[var(--green)]">
            *
          </span>
        )}
      </label>

      <select
        id={name}
        name={name}
        defaultValue=""
        className="h-[54px] w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm text-[var(--text-dark)] outline-none transition focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10"
      >
        <option value="" disabled>
          선택해 주세요
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[52px] min-w-[190px] items-center justify-center rounded-full bg-[var(--text-dark)] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[var(--green)] hover:text-[var(--text-dark)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? "문의 접수 중..."
        : "프로젝트 문의 보내기"}
    </button>
  );
}