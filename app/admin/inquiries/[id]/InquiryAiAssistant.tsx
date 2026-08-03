"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

import {
  generateInquiryAnalysis,
  generateInquiryReply,
  type InquiryAiActionState,
} from "./actions";

type InquiryAiAssistantProps = {
  inquiryId: string;
  initialSummary: string;
  initialReplyDraft: string;
};

const initialState: InquiryAiActionState = {
  success: false,
  message: "",
  generatedText: "",
};

export default function InquiryAiAssistant({
  inquiryId,
  initialSummary,
  initialReplyDraft,
}: InquiryAiAssistantProps) {
  const [
    analysisState,
    analysisAction,
  ] = useActionState(
    generateInquiryAnalysis,
    initialState,
  );

  const [replyState, replyAction] =
    useActionState(
      generateInquiryReply,
      initialState,
    );

  const [summary, setSummary] =
    useState(initialSummary);

  const [replyDraft, setReplyDraft] =
    useState(initialReplyDraft);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    if (
      analysisState.success &&
      analysisState.generatedText
    ) {
      setSummary(
        analysisState.generatedText,
      );
    }
  }, [analysisState]);

  useEffect(() => {
    if (
      replyState.success &&
      replyState.generatedText
    ) {
      setReplyDraft(
        replyState.generatedText,
      );
    }
  }, [replyState]);

  async function copyReply() {
    if (!replyDraft) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        replyDraft,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.prompt(
        "아래 답변을 복사해 주세요.",
        replyDraft,
      );
    }
  }

  return (
    <section className="rounded-[24px] border border-[#e2e2de] bg-white p-6 sm:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#999]">
          AI ASSISTANT
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#292929]">
          AI 상담 보조
        </h2>

        <p className="mt-2 text-sm leading-7 text-[#888]">
          고객 문의를 분석하고 첫 답변
          초안을 생성합니다.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        <article className="rounded-[20px] border border-[#e4e4df] bg-[#fafaf8] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-[#333]">
                AI 문의 분석
              </h3>

              <p className="mt-1 text-sm text-[#888]">
                고객 니즈와 추천 서비스를
                내부 상담용으로 정리합니다.
              </p>
            </div>

            <form action={analysisAction}>
              <input
                type="hidden"
                name="id"
                value={inquiryId}
              />

              <AnalysisButton
                hasResult={Boolean(summary)}
              />
            </form>
          </div>

          {analysisState.message && (
            <Message
              success={
                analysisState.success
              }
            >
              {analysisState.message}
            </Message>
          )}

          {summary ? (
            <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-[#e5e5e0] bg-white p-5 text-sm leading-8 text-[#555]">
              {summary}
            </div>
          ) : (
            <EmptyResult>
              아직 생성된 문의 분석이
              없습니다.
            </EmptyResult>
          )}
        </article>

        <article className="rounded-[20px] border border-[#e4e4df] bg-[#fafaf8] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-[#333]">
                AI 답변 초안
              </h3>

              <p className="mt-1 text-sm text-[#888]">
                고객에게 보낼 첫 답변을
                작성합니다.
              </p>
            </div>

            <form action={replyAction}>
              <input
                type="hidden"
                name="id"
                value={inquiryId}
              />

              <ReplyButton
                hasResult={Boolean(
                  replyDraft,
                )}
              />
            </form>
          </div>

          {replyState.message && (
            <Message
              success={replyState.success}
            >
              {replyState.message}
            </Message>
          )}

          {replyDraft ? (
            <>
              <div className="mt-6 whitespace-pre-wrap rounded-2xl border border-[#e5e5e0] bg-white p-5 text-sm leading-8 text-[#555]">
                {replyDraft}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={copyReply}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-[#d7d7d2] bg-white px-5 text-xs font-semibold text-[#444] transition hover:border-[#94b63f] hover:text-[#6f8c25]"
                >
                  {copied
                    ? "복사 완료 ✓"
                    : "답변 복사"}
                </button>
              </div>
            </>
          ) : (
            <EmptyResult>
              아직 생성된 답변 초안이
              없습니다.
            </EmptyResult>
          )}
        </article>
      </div>
    </section>
  );
}

function AnalysisButton({
  hasResult,
}: {
  hasResult: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 min-w-[150px] items-center justify-center rounded-full bg-black px-5 text-xs font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:bg-[#999]"
    >
      {pending
        ? "분석 중..."
        : hasResult
          ? "다시 분석"
          : "AI 문의 분석"}
    </button>
  );
}

function ReplyButton({
  hasResult,
}: {
  hasResult: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 min-w-[150px] items-center justify-center rounded-full bg-[#94b63f] px-5 text-xs font-semibold text-[#28320e] transition hover:bg-[#86a737] disabled:cursor-not-allowed disabled:bg-[#b8c88c]"
    >
      {pending
        ? "작성 중..."
        : hasResult
          ? "답변 다시 생성"
          : "AI 답변 생성"}
    </button>
  );
}

function Message({
  success,
  children,
}: {
  success: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${
        success
          ? "border-[#dce8bd] bg-[#f3f7e9] text-[#6f8c25]"
          : "border-[#efcccc] bg-[#fff3f3] text-[#b65353]"
      }`}
    >
      {children}
    </div>
  );
}

function EmptyResult({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-[#d8d8d3] px-5 py-10 text-center text-sm text-[#999]">
      {children}
    </div>
  );
}