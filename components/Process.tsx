"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const process = [
  {
    number: "01",
    english: "Listen",
    title: "먼저, 충분히 듣습니다.",
    text: "카카오채널 또는 전화로 프로젝트의 목적과 필요한 작업, 현재 고민을 편하게 알려주세요.",
  },
  {
    number: "02",
    english: "Define",
    title: "범위와 방향을 정리합니다.",
    text: "필요한 작업과 우선순위를 구체화한 뒤 진행 범위, 비용과 예상 일정을 안내드립니다.",
  },
  {
    number: "03",
    english: "Design",
    title: "브랜드의 방향을 시각화합니다.",
    text: "브랜드의 성격과 실제 사용 환경을 함께 고려해 컨셉과 디자인 시안을 제작합니다.",
  },
  {
    number: "04",
    english: "Refine",
    title: "함께 완성도를 높입니다.",
    text: "전달해주신 피드백을 바탕으로 세부 요소와 사용성을 조율해 최종 디자인을 완성합니다.",
  },
  {
    number: "05",
    english: "Deliver",
    title: "실제로 사용할 결과물을 전달합니다.",
    text: "인쇄용, 제작용, 웹용 등 프로젝트 이후 바로 사용할 수 있는 최종 파일을 정리해 전달드립니다.",
  },
];

const ease = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function Process() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 36,
          filter: "blur(9px)",
        },
    whileInView: reduceMotion
      ? undefined
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
    viewport: {
      once: true,
      amount: 0.2,
      margin: "0px 0px -70px 0px",
    },
  };

  return (
    <section
      id="process"
      className="scroll-mt-28 overflow-hidden bg-[#f5f4f0] py-24 sm:py-28 md:py-36 lg:py-[9vw]"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-[4vw]">
        <div className="grid gap-12 border-b border-[var(--line)] pb-16 md:gap-16 md:pb-24 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:pb-[6vw]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.82,
              ease,
            }}
          >
            <p className="section-label">
              OUR PROCESS
            </p>

            <div className="mt-7 h-px w-full max-w-[180px] bg-[var(--line)] md:mt-9" />

            <p className="mt-7 max-w-xs text-sm leading-7 text-[var(--muted)] md:mt-9">
              CLEAR PROCESS
              <br />
              SMOOTH COMMUNICATION
              <br />
              PRACTICAL RESULTS
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{
              duration: 0.92,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
          >
            <p className="display-en-sm text-[var(--green)]">
              Good work begins with clarity.
            </p>

            <h2 className="display-xl mt-8 max-w-[1150px] md:mt-10">
              좋은 결과는
              <br />
              좋은 과정에서 시작됩니다.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 md:mt-14 md:grid-cols-2 md:gap-12 md:pt-10">
              <p className="body-large">
                필요한 내용을 명확하게 정리하고 각 단계마다 진행
                상황을 공유합니다.
              </p>

              <p className="body-large">
                처음 디자인을 의뢰하는 경우에도 무엇을 준비하고
                결정해야 하는지 어렵지 않게 안내합니다.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-b border-[var(--line)]">
          {process.map((item, index) => (
            <motion.article
              key={item.number}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 40,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.25,
                margin: "0px 0px -50px 0px",
              }}
              transition={{
                duration: 0.76,
                delay: reduceMotion ? 0 : index * 0.055,
                ease,
              }}
              className="group grid gap-7 border-t border-[var(--line)] py-10 sm:grid-cols-[56px_1fr] md:py-14 lg:grid-cols-[0.16fr_0.36fr_0.9fr_0.9fr] lg:items-start lg:gap-10 lg:py-[4.5vw]"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                {item.number}
              </span>

              <p className="text-sm font-semibold tracking-[0.08em] text-[var(--green)] sm:col-start-2 lg:col-start-auto md:text-base">
                {item.english}
              </p>

              <h3 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-1 sm:col-start-2 sm:text-4xl md:text-5xl lg:col-start-auto lg:text-[3.3vw]">
                {item.title}
              </h3>

              <div className="sm:col-start-2 lg:col-start-auto lg:justify-self-end">
                <p className="max-w-xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                  {item.text}
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <span className="h-px w-10 bg-[var(--line)] transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--green)]" />

                  <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)]">
                    {index === process.length - 1
                      ? "PROJECT COMPLETE"
                      : "NEXT STEP"}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.86,
            ease,
          }}
          className="mt-20 md:mt-28 lg:mt-[7vw]"
        >
          <div className="grid gap-12 border-b border-[var(--line)] pb-16 md:pb-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="section-label">
                BEFORE WE BEGIN
              </p>

              <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-5xl md:mt-8 md:text-6xl">
                완벽하게 정리해서
                <br />
                오실 필요는 없습니다.
              </h3>
            </div>

            <div className="lg:self-end">
              <p className="max-w-2xl text-base leading-8 text-[var(--text)] md:text-lg md:leading-9">
                필요한 디자인의 종류나 방향이 아직 명확하지 않아도
                괜찮습니다. 현재 상황과 해결하고 싶은 문제를 알려주시면
                작업 범위부터 함께 정리해드립니다.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
                프로젝트의 규모와 제작 방식에 따라 일부 과정과 일정은
                조정될 수 있습니다.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.88,
            ease,
          }}
          className="mt-16 md:mt-24 lg:mt-[6vw]"
        >
          <Link
            href="/contact"
            className="group grid gap-10 border-y border-[var(--line)] py-10 md:grid-cols-[1fr_auto] md:items-end md:py-14 lg:py-[4vw]"
          >
            <div>
              <p className="section-label">
                START A PROJECT
              </p>

              <h3 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] sm:text-5xl md:mt-7 md:text-7xl lg:text-[6vw]">
                이제, 당신의 이야기를
                <br />
                들려주세요.
              </h3>
            </div>

            <span className="flex h-14 w-14 items-center justify-center border border-[var(--text-dark)] text-xl text-[var(--text-dark)] transition-all duration-300 group-hover:translate-x-2 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] md:h-16 md:w-16">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}