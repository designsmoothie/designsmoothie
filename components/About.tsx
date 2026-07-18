"use client";

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

const trustItems = [
  {
    value: "12+",
    label: "Years of Experience",
    description: "12년 이상의 디자인 실무 경험",
  },
  {
    value: "800+",
    label: "Projects Completed",
    description: "브랜딩 · 간판 · 공간 그래픽 프로젝트",
  },
  {
    value: "06",
    label: "Professional Licenses",
    description: "디자인 · 옥외광고 · 실내건축 전문 자격",
  },
];

const certifications = [
  {
    title: "산업디자인전문회사",
    status: "인증",
    description:
      "전문적인 디자인 역량과 수행 체계를 갖춘 산업디자인전문회사입니다.",
  },
  {
    title: "여성기업",
    status: "인증",
    description:
      "여성기업 확인을 완료한 전문 디자인 기업입니다.",
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
          y: 34,
          filter: "blur(8px)",
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
      amount: 0.25,
      margin: "0px 0px -60px 0px",
    },
  };

  return (
    <section
      id="about"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              ABOUT DESIGN SMOOTHIE
            </p>

            <div className="mt-8 h-px w-full max-w-[180px] bg-[var(--line)]" />

            <p className="mt-8 max-w-xs text-sm leading-7 text-[var(--muted)]">
              BRANDING · SIGNAGE
              <br />
              SPACE GRAPHIC DESIGN
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{
              duration: 0.9,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
          >
            <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl lg:text-7xl">
              보기 좋은 디자인을 넘어,
              <br />
              기억에 남는 브랜드로.
            </h2>

            <div className="mt-10 grid gap-8 text-base leading-8 text-[var(--text)] md:mt-14 md:grid-cols-2 md:text-lg">
              <p>
                디자인 스무디는 12년 이상의 실무 경험을 바탕으로 브랜드의
                시작인 로고와 컬러부터 간판, 파사드, 인쇄물까지 하나의
                흐름으로 연결합니다.
              </p>

              <p>
                각각의 디자인이 따로 보이지 않도록 브랜드와 공간의 성격을
                이해하고 오래 사용할 수 있는 일관된 시각 방향을 설계합니다.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 grid gap-7 md:mt-32 md:grid-cols-3">
          {trustItems.map((item, index) => (
            <motion.article
              key={item.label}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 44,
                      scale: 0.985,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
              }
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.72,
                delay: reduceMotion ? 0 : index * 0.09,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                    }
              }
              className="premium-card flex min-h-[340px] flex-col justify-between rounded-[36px] border border-black/5 bg-white/70 p-10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  {item.label.toUpperCase()}
                </span>

                <span className="text-xs text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <strong className="block text-7xl font-semibold tracking-[-0.07em] text-[var(--text-dark)]">
                  {item.value}
                </strong>

                <p className="mt-5 leading-8 text-[var(--text)]">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.8,
            delay: reduceMotion ? 0 : 0.12,
            ease,
          }}
          className="mt-24 border-t border-[var(--line)] pt-20"
        >
          <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
                PROFESSIONAL LICENSES
              </p>

              <h3 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-dark)]">
                디자인과 공간을
                <br />
                함께 이해합니다.
              </h3>
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
                  }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : index * 0.05,
                    ease,
                  }}
                  className="group grid grid-cols-[60px_1fr_auto] items-center border-b border-[var(--line)] py-7 transition-colors duration-300 hover:bg-white/45"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">
                    {credential.number}
                  </span>

                  <span className="text-xl font-semibold text-[var(--text-dark)]">
                    {credential.name}
                  </span>

                  <span className="text-[10px] tracking-[0.18em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)]">
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
            duration: 0.8,
            delay: reduceMotion ? 0 : 0.18,
            ease,
          }}
          className="mt-24 border-t border-[var(--line)] pt-20"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
                COMPANY CERTIFICATIONS
              </p>

              <h3 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-dark)]">
                전문성과 신뢰를 갖춘
                <br />
                디자인 스튜디오.
              </h3>
            </div>

            <p className="max-w-md leading-8 text-[var(--text)]">
              디자인 역량과 사업 수행 체계를 공식적인 인증 절차를 통해 갖추고
              있습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {certifications.map((item, index) => (
              <motion.article
                key={item.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 32,
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
                }}
                transition={{
                  duration: 0.65,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                      }
                }
                className="premium-card rounded-[30px] border border-black/5 bg-white/70 p-10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-3xl font-semibold tracking-[-0.04em]">
                    {item.title}
                  </h4>

                  <span className="rounded-full bg-[var(--green)] px-4 py-2 text-xs font-semibold text-[var(--text-dark)]">
                    {item.status}
                  </span>
                </div>

                <p className="mt-8 leading-8 text-[var(--text)]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}