"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const credentials = [
  {
    number: "01",
    name: "옥외광고사",
    category: "SIGNAGE",
  },
  {
    number: "02",
    name: "컬러리스트기사",
    category: "COLOR",
  },
  {
    number: "03",
    name: "시각디자인기사",
    category: "VISUAL DESIGN",
  },
  {
    number: "04",
    name: "실내건축기사",
    category: "INTERIOR",
  },
  {
    number: "05",
    name: "웹디자인기능사",
    category: "WEB DESIGN",
  },
  {
    number: "06",
    name: "컴퓨터그래픽스운용기능사",
    category: "GRAPHIC DESIGN",
  },
];

const statistics = [
  {
    value: "12+",
    label: "YEARS OF EXPERIENCE",
    description: "디자인 현장에서 쌓아온 실무 경험",
  },
  {
    value: "800+",
    label: "PROJECTS COMPLETED",
    description: "브랜딩·사인·공간그래픽 프로젝트",
  },
  {
    value: "06",
    label: "PROFESSIONAL LICENSES",
    description: "디자인과 공간을 아우르는 전문 자격",
  },
];

const experienceFlow = [
  {
    number: "01",
    title: "Identity",
    korean: "브랜드 정체성",
    description:
      "이름과 로고, 컬러와 그래픽 언어를 통해 브랜드의 첫인상을 설계합니다.",
  },
  {
    number: "02",
    title: "Signage",
    korean: "간판과 파사드",
    description:
      "브랜드가 거리와 건물에서 가장 먼저 발견되는 모습을 디자인합니다.",
  },
  {
    number: "03",
    title: "Space",
    korean: "공간과 동선",
    description:
      "사람이 브랜드를 마주하고 머무는 공간의 흐름과 시각 경험을 연결합니다.",
  },
  {
    number: "04",
    title: "Experience",
    korean: "하나의 브랜드 경험",
    description:
      "서로 다른 결과물이 하나의 인상으로 기억되도록 전체 방향을 조율합니다.",
  },
];

const certifications = [
  {
    number: "01",
    english: "INDUSTRIAL DESIGN COMPANY",
    title: "산업디자인전문회사",
    status: "인증 완료",
    description:
      "전문적인 디자인 역량과 사업 수행 체계를 공식적으로 인정받은 디자인 전문회사입니다.",
  },
  {
    number: "02",
    english: "WOMEN-OWNED BUSINESS",
    title: "여성기업",
    status: "확인 진행 중",
    description:
      "여성기업 확인을 위한 절차를 진행하고 있으며 현재 현장실사를 앞두고 있습니다.",
  },
];

const ease = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function About() {
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
      id="about"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-24 sm:py-28 md:py-36 lg:py-[9vw]"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-[4vw]">
        <div className="grid gap-12 border-b border-[var(--line)] pb-16 md:gap-16 md:pb-24 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:pb-[7vw]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.82,
              ease,
            }}
          >
            <p className="section-label">
              ABOUT DESIGN SMOOTHIE
            </p>

            <div className="mt-7 h-px w-full max-w-[180px] bg-[var(--line)] md:mt-9" />

            <p className="mt-7 max-w-xs text-sm leading-7 text-[var(--muted)] md:mt-9">
              BRAND IDENTITY
              <br />
              SIGNAGE & FACADE
              <br />
              SPACE GRAPHIC DESIGN
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
              Design is not decoration.
            </p>

            <h2 className="display-xl mt-8 max-w-[1150px] md:mt-10">
              브랜드는
              <br />
              로고에서 끝나지 않습니다.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 md:mt-14 md:grid-cols-2 md:gap-12 md:pt-10">
              <p className="body-large">
                디자인 스무디는 브랜드의 시작인 로고와 컬러부터 간판,
                파사드, 인쇄물과 공간 그래픽까지 하나의 흐름으로
                연결합니다.
              </p>

              <p className="body-large">
                각각의 결과물이 따로 보이지 않도록 브랜드의 성격과
                공간의 맥락을 이해하고, 오래 사용할 수 있는 일관된
                시각 경험을 설계합니다.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="py-20 md:py-28 lg:py-[8vw]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.84,
              ease,
            }}
            className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"
          >
            <div>
              <p className="section-label">
                FROM IDENTITY TO EXPERIENCE
              </p>

              <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-5xl md:mt-8 md:text-6xl">
                보이는 것부터
                <br />
                기억되는 순간까지.
              </h3>
            </div>

            <div className="border-t border-[var(--line)]">
              {experienceFlow.map((item, index) => (
                <motion.article
                  key={item.number}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 28,
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
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: reduceMotion ? 0 : index * 0.06,
                    ease,
                  }}
                  className="group grid gap-5 border-b border-[var(--line)] py-8 transition-colors duration-500 hover:bg-white/35 sm:grid-cols-[56px_1fr] md:grid-cols-[70px_0.85fr_1.15fr] md:items-start md:gap-8 md:py-10"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                    {item.number}
                  </span>

                  <div>
                    <h4 className="text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-sm font-medium text-[var(--muted)]">
                      {item.korean}
                    </p>
                  </div>

                  <p className="max-w-xl text-sm leading-7 text-[var(--text)] sm:col-start-2 md:col-start-auto md:text-base md:leading-8">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-y border-[var(--line)]">
          {statistics.map((item, index) => (
            <motion.article
              key={item.label}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 36,
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
                amount: 0.35,
              }}
              transition={{
                duration: 0.74,
                delay: reduceMotion ? 0 : index * 0.07,
                ease,
              }}
              className="group grid gap-6 border-b border-[var(--line)] py-10 last:border-b-0 sm:grid-cols-[0.55fr_1.45fr] sm:items-end md:py-14 lg:grid-cols-[0.55fr_0.8fr_0.65fr] lg:gap-12 lg:py-[4vw]"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>

              <strong className="block text-[5.5rem] font-semibold leading-[0.8] tracking-[-0.08em] text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-2 sm:col-start-1 sm:text-[7rem] md:text-[9rem] lg:col-start-auto lg:text-[10vw]">
                {item.value}
              </strong>

              <div className="sm:self-end lg:pb-2">
                <p className="section-label">
                  {item.label}
                </p>

                <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.88,
            ease,
          }}
          className="py-20 md:py-28 lg:py-[8vw]"
        >
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="section-label">
                PROFESSIONAL LICENSES
              </p>

              <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-5xl md:mt-8 md:text-6xl">
                디자인과 공간을
                <br />
                함께 이해합니다.
              </h3>

              <p className="mt-8 max-w-sm text-sm leading-7 text-[var(--text)] md:mt-10 md:text-base md:leading-8">
                시각 디자인뿐 아니라 옥외광고와 색채, 웹과
                실내건축까지 실제 제작과 공간 구현에 필요한 전문성을
                함께 갖추고 있습니다.
              </p>
            </div>

            <div className="border-t border-[var(--line)]">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential.name}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 24,
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
                    amount: 0.4,
                  }}
                  transition={{
                    duration: 0.58,
                    delay: reduceMotion ? 0 : index * 0.045,
                    ease,
                  }}
                  className="group grid grid-cols-[48px_1fr] items-center gap-4 border-b border-[var(--line)] py-7 transition-colors duration-500 hover:bg-white/35 sm:grid-cols-[60px_1fr_auto] sm:gap-6 md:py-8"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                    {credential.number}
                  </span>

                  <span className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl md:text-3xl">
                    {credential.name}
                  </span>

                  <span className="col-start-2 text-[9px] font-semibold tracking-[0.16em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)] sm:col-start-auto sm:text-[10px]">
                    {credential.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.88,
            ease,
          }}
          className="border-t border-[var(--line)] pt-20 md:pt-28 lg:pt-[7vw]"
        >
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="section-label">
                COMPANY CERTIFICATIONS
              </p>

              <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-5xl md:mt-8 md:text-6xl">
                감각만이 아니라,
                <br />
                신뢰까지 갖춘 스튜디오.
              </h3>
            </div>

            <div className="border-t border-[var(--line)]">
              {certifications.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 28,
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
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 0.68,
                    delay: reduceMotion ? 0 : index * 0.07,
                    ease,
                  }}
                  className="group grid gap-6 border-b border-[var(--line)] py-9 md:grid-cols-[58px_1fr_auto] md:items-start md:gap-8 md:py-11"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                    {item.number}
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.17em] text-[var(--muted)] md:text-[10px]">
                      {item.english}
                    </p>

                    <h4 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                      {item.title}
                    </h4>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`w-fit border px-3 py-2 text-[9px] font-semibold tracking-[0.12em] md:text-[10px] ${
                      item.status === "인증 완료"
                        ? "border-[var(--green)] bg-[var(--green)] text-[var(--text-dark)]"
                        : "border-[var(--line)] text-[var(--muted)]"
                    }`}
                  >
                    {item.status}
                  </span>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.88,
            ease,
          }}
          className="mt-24 border-y border-[var(--line)] py-10 md:mt-36 md:py-14 lg:mt-[10vw] lg:py-[4vw]"
        >
          <Link
            href="#process"
            className="group grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <p className="section-label">
                HOW WE WORK
              </p>

              <h3 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] sm:text-5xl md:mt-7 md:text-7xl lg:text-[6vw]">
                좋은 결과는
                <br />
                좋은 과정에서 시작됩니다.
              </h3>
            </div>

            <span className="flex h-14 w-14 items-center justify-center border border-[var(--text-dark)] text-xl text-[var(--text-dark)] transition-all duration-300 group-hover:translate-x-2 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] md:h-16 md:w-16">
              ↓
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}