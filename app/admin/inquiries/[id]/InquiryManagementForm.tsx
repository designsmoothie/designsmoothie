"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  type InquiryUpdateActionState,
  updateInquiry,
} from "./actions";

type InquiryManagementFormProps = {
  id: string;
  status: string;
  adminMemo: string;
};

const initialState: InquiryUpdateActionState = {
  success: false,
  message: "",
};

export default function InquiryManagementForm({
  id,
  status,
  adminMemo,
}: InquiryManagementFormProps) {
  const [state, formAction] = useActionState(
    updateInquiry,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8"
    >
      <input
        type="hidden"
        name="id"
        value={id}
      />

      <div>
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#999]">
          INQUIRY MANAGEMENT
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#292929]">
          상담 관리
        </h2>
      </div>

      {state.message && (
        <div
          className={`mt-6 rounded-2xl border px-5 py-4 text-sm font-medium ${
            state.success
              ? "border-[#dce8bd] bg-[#f3f7e9] text-[#6f8c25]"
              : "border-[#efcccc] bg-[#fff3f3] text-[#b65353]"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="mt-8">
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-semibold text-[#444]"
        >
          상담 상태
        </label>

        <select
          id="status"
          name="status"
          defaultValue={status}
          className="h-[54px] w-full rounded-2xl border border-[#deded9] bg-white px-4 text-sm text-[#333] outline-none transition focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
        >
          <option value="new">
            신규
          </option>

          <option value="checking">
            확인 중
          </option>

          <option value="consulting">
            상담 중
          </option>

          <option value="completed">
            상담 완료
          </option>

          <option value="cancelled">
            취소
          </option>
        </select>
      </div>

      <div className="mt-7">
        <label
          htmlFor="admin_memo"
          className="mb-2 block text-sm font-semibold text-[#444]"
        >
          관리자 메모
        </label>

        <textarea
          id="admin_memo"
          name="admin_memo"
          rows={10}
          defaultValue={adminMemo}
          placeholder="상담 내용, 견적 안내, 재연락 일정 등을 기록해 주세요."
          className="w-full resize-none rounded-2xl border border-[#deded9] bg-white px-4 py-4 text-sm leading-7 text-[#333] outline-none transition focus:border-[#94b63f] focus:ring-2 focus:ring-[#94b63f]/10"
        />
      </div>

      <div className="mt-7 flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-full bg-black px-7 text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#999]"
    >
      {pending
        ? "저장 중..."
        : "상담 정보 저장"}
    </button>
  );
}