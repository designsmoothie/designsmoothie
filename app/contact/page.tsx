"use client";

import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { useState } from "react";



const emailAddress = "hello_smoothie@naver.com";
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
    <PageTransition>
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-12 md:pb-36 md:pt-14">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            HOME
          </Link>

          <p className="hidden text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] sm:block">
            DESIGN SMOOTHIE CONTACT
          </p>
        </div>

        <div className="mt-20 grid gap-12 border-b border-[var(--line)] pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end md:mt-24 md:pb-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              CONTACT
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
              프로젝트를
              <br />
              시작해볼까요?
            </h1>
          </div>

          <div className="max-w-xl lg:pb-2">
            <p className="text-lg leading-9 text-[var(--text)] md:text-xl">
              브랜딩부터 간판, 파사드, 인쇄물과 배너까지 필요한 내용을
              확인한 뒤 작업 범위와 일정을 안내드립니다.
            </p>

            <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
              처음 의뢰하는 경우에도 괜찮습니다. 준비된 내용부터 편하게
              알려주세요.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-7 md:mt-24 md:grid-cols-2">
          <article className="group relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[34px] bg-[var(--green)] p-8 transition-all duration-500 hover:-translate-y-1.5 md:rounded-[42px] md:p-11">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold tracking-[0.24em] text-[var(--text-dark)]/55">
                  QUICK CONTACT
                </p>

                <span className="text-xl text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <h2 className="mt-10 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-5xl">
                Kakao Channel
              </h2>

              <p className="mt-6 max-w-md text-base leading-8 text-[var(--text-dark)]/75">
                가장 빠른 상담은 카카오채널로 진행됩니다. 작업 종류와 희망
                일정을 간단히 남겨주세요.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <a
                href={kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--cream)] px-8 py-4 text-sm font-semibold text-[var(--text-dark)] shadow-sm transition duration-300 hover:-translate-y-1"
              >
                카카오채널 문의하기
                <span className="ml-2">→</span>
              </a>
            </div>
          </article>

          <article className="group flex min-h-[430px] flex-col justify-between rounded-[34px] border border-black/5 bg-white/65 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:rounded-[42px] md:p-11">
            <div>
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                  FILE DELIVERY
                </p>

                <span className="text-xl text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <h2 className="mt-10 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-5xl">
                Email
              </h2>

              <p className="mt-6 max-w-md text-base leading-8 text-[var(--text)]">
                사진, 도면, 기존 로고처럼 자료가 많은 경우 이메일로 보내주시면
                확인이 편리합니다.
              </p>

              <p className="mt-8 break-all text-lg font-semibold tracking-[-0.02em] text-[var(--text-dark)] md:text-xl">
                {emailAddress}
              </p>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              className="mt-12 inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white/40 px-8 py-4 text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-1 hover:border-[var(--text-dark)] hover:bg-white/80"
            >
              {copied ? "이메일 주소 복사 완료 ✓" : "이메일 주소 복사"}
              {!copied && <span className="ml-2">→</span>}
            </button>
          </article>
        </div>

        <section className="mt-28 md:mt-40">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
                HOW TO START
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-[1.06] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
                의뢰는 이렇게
                <br />
                진행됩니다.
              </h2>

              <p className="mt-7 max-w-lg text-base leading-8 text-[var(--text)]">
                상담부터 작업 시작까지 필요한 내용을 순서대로 안내드립니다.
              </p>

              <Link
                href="/guide"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-dark)]"
              >
                의뢰 준비사항 보기
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-black/5 bg-white/65 shadow-[0_20px_70px_rgba(0,0,0,0.04)] backdrop-blur-xl md:rounded-[42px]">
              {contactSteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`group grid gap-5 p-7 transition-colors duration-300 hover:bg-white/75 md:grid-cols-[64px_0.7fr_1fr] md:items-center md:gap-7 md:p-9 ${
                    index !== contactSteps.length - 1
                      ? "border-b border-black/5"
                      : ""
                  }`}
                >
                  <span className="text-sm font-semibold tracking-[0.16em] text-[var(--green)]">
                    {step.number}
                  </span>

                  <h3 className="text-xl font-semibold tracking-[-0.035em] text-[var(--text-dark)] md:text-2xl">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-7 text-[var(--text)] md:text-base">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-28 pb-8 md:mt-40">
          <div className="grid gap-8 border-b border-[var(--line)] pb-12 md:grid-cols-[0.75fr_1.25fr] md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
                FAQ
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-6xl">
                자주 묻는 질문
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-[var(--text)]">
              상담 전에 가장 많이 확인하는 내용을 정리했습니다.
            </p>
          </div>

          <div className="border-b border-[var(--line)]">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group border-b border-[var(--line)] last:border-b-0"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[42px_1fr_auto] items-center gap-4 py-7 md:grid-cols-[64px_1fr_auto] md:py-9">
                  <span className="text-xs font-semibold tracking-[0.14em] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-lg font-semibold tracking-[-0.025em] text-[var(--text-dark)] md:text-2xl">
                    {faq.question}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg text-[var(--text-dark)] transition duration-300 group-open:rotate-45 group-open:bg-[var(--green)]">
                    +
                  </span>
                </summary>

                <div className="grid grid-cols-[42px_1fr] gap-4 pb-8 md:grid-cols-[64px_1fr] md:pb-10">
                  <span />

                  <p className="max-w-3xl text-sm leading-8 text-[var(--text)] md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
    </PageTransition>
  );
}