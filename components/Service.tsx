"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const services = [
  {
    number: "01",
    category: "BRANDING",
    title: "브랜드 아이덴티티 개발",
    description:
      "브랜드의 방향성을 정리하고 로고, 컬러 시스템, 디자인 가이드를 구축합니다.",
  },
  {
    number: "02",
    category: "SIGNAGE",
    title: "간판 & 사인 디자인",
    description:
      "브랜드가 가장 먼저 보이는 공간의 얼굴을 설계합니다.",
  },
  {
    number: "03",
    category: "SPACE GRAPHIC",
    title: "공간 그래픽 디자인",
    description:
      "파사드, 배너, 인쇄물까지 하나의 브랜드 경험으로 연결합니다.",
  },
];

const premiumEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function Service() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="service"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 34,
                  filter: "blur(9px)",
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
            amount: 0.3,
            margin: "0px 0px -60px 0px",
          }}
          transition={{
            duration: 0.85,
            ease: premiumEase,
          }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
            WHAT WE DO
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--text-dark)] md:text-6xl">
            브랜드를 만들고,
            <br />
            공간까지 완성합니다.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text)]">
            디자인 스무디는 단순히 예쁜 디자인을 만드는 것이 아니라,
            브랜드가 사람들에게 기억되는 방식을 설계합니다.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-7 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 42,
                      scale: 0.985,
                      filter: "blur(10px)",
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -50px 0px",
              }}
              transition={{
                duration: 0.72,
                delay: reduceMotion ? 0 : index * 0.09,
                ease: premiumEase,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.988,
                    }
              }
              className="group flex min-h-[390px] flex-col rounded-[32px] border border-black/5 bg-white/70 p-8 shadow-[0_20px_60px_rgba(57,48,40,0.04)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 hover:border-black/8 hover:bg-white/85 hover:shadow-[0_32px_90px_rgba(57,48,40,0.1)] sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--green)]">
                  {service.number}
                </span>

                <span className="text-[11px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  {service.category}
                </span>
              </div>

              <div className="mt-12">
                <h3 className="text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--text-dark)]">
                  {service.title}
                </h3>

                <p className="mt-6 leading-8 text-[var(--text)]">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto pt-12">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green)] text-lg text-[var(--text-dark)] shadow-[0_10px_30px_rgba(191,220,89,0.22)] transition-all duration-500 group-hover:translate-x-1 group-hover:scale-105 group-hover:bg-[var(--green-hover)]">
                  →
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  scaleX: 0,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  scaleX: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: premiumEase,
          }}
          className="mt-20 h-px origin-left bg-[var(--line)] md:mt-28"
        />
      </div>
    </section>
  );
}