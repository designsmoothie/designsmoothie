"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const process = [
  {
    number: "01",
    title: "상담",
    text: "카카오채널 또는 전화로 프로젝트의 목적과 필요한 작업을 편하게 알려주세요.",
  },
  {
    number: "02",
    title: "견적 및 일정",
    text: "작업 범위와 난이도를 확인한 뒤 비용과 예상 일정을 안내드립니다.",
  },
  {
    number: "03",
    title: "디자인 진행",
    text: "브랜드의 방향과 사용 환경을 고려해 컨셉과 디자인 시안을 제작합니다.",
  },
  {
    number: "04",
    title: "수정 및 확정",
    text: "전달해주신 피드백을 반영하고 세부 요소를 조정해 디자인을 완성합니다.",
  },
  {
    number: "05",
    title: "최종 납품",
    text: "인쇄용, 제작용, 웹용 등 실제 사용에 필요한 최종 파일을 전달드립니다.",
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

  return (
    <section
      id="process"
      className="scroll-mt-28 overflow-hidden bg-[#f5f4f0] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 36,
                    filter: "blur(8px)",
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.85,
              ease,
            }}
          >
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              OUR PROCESS
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl lg:text-7xl">
              의뢰부터 납품까지,
              <br />
              복잡하지 않게.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-8 text-[var(--text)] md:text-lg">
              필요한 내용을 명확하게 정리하고,
              각 단계마다 진행 상황을 공유합니다.
              처음 디자인을 의뢰하는 경우에도
              어렵지 않게 진행할 수 있습니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="premium-button inline-flex items-center rounded-full bg-[var(--green)] px-7 py-3.5 text-sm font-semibold text-[var(--text-dark)] hover:bg-[var(--green-hover)]"
              >
                프로젝트 문의하기
              </Link>

              <Link
                href="/guide"
                className="premium-button inline-flex items-center rounded-full border border-black/10 bg-white/60 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm hover:border-[var(--text-dark)]"
              >
                의뢰 안내 보기
              </Link>
            </div>
          </motion.div>

          <div className="overflow-hidden rounded-[40px] border border-black/5 bg-white/70 shadow-[0_24px_80px_rgba(0,0,0,.05)] backdrop-blur-xl">
            {process.map((item, index) => (
              <motion.article
                key={item.number}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 30,
                      }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 6,
                      }
                }
                className={`group grid gap-6 p-8 transition-colors duration-300 hover:bg-white/85 md:grid-cols-[90px_0.55fr_1fr] md:items-center md:p-10 ${
                  index !== process.length - 1
                    ? "border-b border-black/5"
                    : ""
                }`}
              >
                <div className="flex justify-between md:block">
                  <span className="text-sm font-semibold tracking-[0.18em] text-[var(--green)]">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-3xl">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between gap-6">
                  <p className="max-w-xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                    {item.text}
                  </p>

                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 text-sm transition-all duration-300 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)] md:flex">
                    {index !== process.length - 1 ? "↓" : "✓"}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="mt-20 flex flex-col justify-between gap-8 border-t border-[var(--line)] pt-10 md:mt-28 md:flex-row md:items-center md:pt-12"
        >
          <p className="text-sm leading-7 text-[var(--muted)]">
            프로젝트의 범위와 제작 방식에 따라
            <br className="hidden sm:block" />
            일부 과정과 일정은 달라질 수 있습니다.
          </p>

          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
            CLEAR PROCESS · SMOOTH COMMUNICATION
          </p>
        </motion.div>
      </div>
    </section>
  );
}