"use client";

import Link from "next/link";
import { useState } from "react";

const emailAddress = "hello_smoothie@naver.com";

// 아래 주소만 실제 카카오채널 주소로 바꿔주세요.
const kakaoChannelUrl = "http://pf.kakao.com/_geqBn/chat";

const contactSteps = [
  {
    number: "01",
    title: "카카오채널 상담",
    description: "필요한 작업과 현재 상황을 간단히 알려주세요.",
  },
  {
    number: "02",
    title: "자료 전달",
    description: "로고, 사진, 치수, 참고 이미지 등의 자료를 전달해주세요.",
  },
  {
    number: "03",
    title: "견적 및 일정 안내",
    description: "작업 범위 확인 후 비용과 예상 일정을 안내드립니다.",
  },
  {
    number: "04",
    title: "작업 시작",
    description: "결제 및 일정 확정 후 디자인 작업을 시작합니다.",
  },
];

const faqs = [
  {
    question: "상담 전에 무엇을 준비해야 하나요?",
    answer:
      "브랜드명, 업종, 필요한 작업, 희망 일정과 참고 이미지를 준비해주시면 상담이 훨씬 빠릅니다. 준비가 덜 되어도 상담은 가능합니다.",
  },
  {
    question: "작업 기간은 얼마나 걸리나요?",
    answer:
      "작업 종류와 범위에 따라 달라집니다. 간단한 배너와 인쇄물은 비교적 짧게 진행되며, 브랜딩과 간판·파사드는 충분한 협의 기간이 필요합니다.",
  },
  {
    question: "인쇄와 제작도 가능한가요?",
    answer:
      "작업 항목에 따라 디자인부터 인쇄·제작까지 함께 진행할 수 있습니다. 필요한 범위를 상담 시 알려주세요.",
  },
  {
    question: "수정은 몇 회 가능한가요?",
    answer:
      "수정 범위와 횟수는 작업별 견적에 포함하여 사전에 안내드립니다. 최초 협의 범위를 벗어나는 변경은 추가 비용이 발생할 수 있습니다.",
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      window.prompt("아래 이메일 주소를 복사해주세요.", emailAddress);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--cream)] px-6 py-10 text-[var(--text)] md:px-12">
      <section className="mx-auto max-w-[1440px]">
        <Link
          href="/"
          className="inline-flex text-sm font-bold tracking-[0.25em] text-[var(--muted)] transition hover:text-[#94b63f]"
        >
          ← HOME
        </Link>

        <div className="mt-16">
          <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
            CONTACT
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-[var(--text-dark)] md:text-8xl">
            프로젝트를
            <br />
            시작해볼까요?
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--text)]">
            브랜딩부터 간판, 파사드, 인쇄물과 배너까지.
            <br />
            필요한 내용을 확인한 뒤 작업 범위와 일정을 안내드립니다.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex min-h-[360px] flex-col justify-between rounded-[34px] bg-[var(--green)] p-8 md:p-10">
            <div>
              <p className="text-sm font-bold tracking-[0.4em] text-[var(--muted)]">
                QUICK CONTACT
              </p>

              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                Kakao Channel
              </h2>

              <p className="mt-5 max-w-md leading-8 text-[var(--text)]">
                가장 빠른 상담은 카카오채널로 진행됩니다. 작업 종류와 희망
                일정을 간단히 남겨주세요.
              </p>
            </div>

            <a
              href={kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex w-fit rounded-full bg-[var(--cream)] px-8 py-4 text-sm font-bold text-[var(--text-dark)] shadow-sm transition hover:-translate-y-1"
            >
              카카오채널 문의하기 →
            </a>
          </article>

          <article className="flex min-h-[360px] flex-col justify-between rounded-[34px] bg-[#e8dfd2] p-8 md:p-10">
            <div>
              <p className="text-sm font-bold tracking-[0.4em] text-[var(--muted)]">
                FILE DELIVERY
              </p>

              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                Email
              </h2>

              <p className="mt-5 max-w-md leading-8 text-[var(--text)]">
                사진, 도면, 기존 로고처럼 자료가 많은 경우 이메일로 보내주시면
                확인이 편리합니다.
              </p>

              <p className="mt-7 break-all text-lg font-semibold text-[var(--text-dark)]">
                {emailAddress}
              </p>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              className="mt-10 inline-flex w-fit rounded-full border border-[var(--soft)] px-8 py-4 text-sm font-bold text-[var(--text-dark)] transition hover:-translate-y-1 hover:border-[var(--text-dark)]"
            >
              {copied ? "이메일 주소 복사 완료 ✓" : "이메일 주소 복사 →"}
            </button>
          </article>
        </div>

        <section className="mt-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
                HOW TO START
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-6xl">
                의뢰는 이렇게 진행됩니다.
              </h2>
            </div>

            <Link
              href="/guide"
              className="inline-flex w-fit rounded-full border border-[var(--soft)] px-7 py-3 text-sm font-bold transition hover:border-[var(--text-dark)]"
            >
              의뢰 준비사항 보기 →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {contactSteps.map((step) => (
              <article
                key={step.number}
                className="min-h-[260px] rounded-[30px] border border-[var(--line)] bg-white/55 p-8"
              >
                <p className="text-sm font-bold tracking-[0.35em] text-[var(--muted)]">
                  {step.number}
                </p>

                <h3 className="mt-14 text-2xl font-semibold text-[var(--text-dark)]">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-[var(--muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 pb-16">
          <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-6xl">
            자주 묻는 질문
          </h2>

          <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-semibold text-[var(--text-dark)]">
                  {faq.question}

                  <span className="text-2xl transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pt-5 leading-8 text-[var(--muted)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}