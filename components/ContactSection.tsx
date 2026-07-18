"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const services = [
  "BRAND IDENTITY",
  "SIGNAGE & FACADE",
  "SPACE GRAPHIC",
  "PRINT & EDITORIAL",
];

const contactLinks = [
  {
    number: "01",
    label: "KAKAO CHANNEL",
    title: "카카오채널로 상담하기",
    description:
      "프로젝트의 목적과 필요한 작업, 현재 고민을 가장 편하게 전달할 수 있는 상담 채널입니다.",
    href: "/contact",
  },
  {
    number: "02",
    label: "PROJECT INQUIRY",
    title: "프로젝트 문의 남기기",
    description:
      "브랜딩, 간판, 파사드, 인쇄물과 공간 그래픽 작업을 문의할 수 있습니다.",
    href: "/contact",
  },
];

const ease = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function ContactSection() {
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
      id="contact"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-24 sm:py-28 md:py-36 lg:py-[9vw]"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-[4vw]">
        <div className="grid gap-12 border-b border-[var(--line)] pb-16 md:gap-16 md:pb-24 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:pb-[7vw]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.82,
              ease,
            }}
          >
            <p className="section-label">START A PROJECT</p>

            <div className="mt-7 h-px w-full max-w-[180px] bg-[var(--line)] md:mt-9" />

            <p className="mt-7 max-w-xs text-sm leading-7 text-[var(--muted)] md:mt-9">
              BRANDING
              <br />
              SIGNAGE
              <br />
              SPACE GRAPHIC
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
              Let&apos;s make it memorable.
            </p>

            <h2 className="display-xl mt-8 max-w-[1200px] md:mt-10">
              당신의 브랜드는
              <br />
              어떤 기억으로 남고 있나요?
            </h2>

            <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 md:mt-14 md:grid-cols-2 md:gap-12 md:pt-10">
              <p className="body-large">
                로고 하나를 만드는 일부터 브랜드가 공간에서 보이는
                방식까지, 필요한 지점을 함께 찾습니다.
              </p>

              <p className="body-large">
                아직 작업 범위와 방향이 명확하지 않아도 괜찮습니다.
                현재의 고민부터 편하게 들려주세요.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.88,
            ease,
          }}
          className="border-b border-[var(--line)] py-20 md:py-28 lg:py-[8vw]"
        >
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="section-label">WHAT WE CAN CREATE</p>

              <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-5xl md:mt-8 md:text-6xl">
                하나의 인상을
                <br />
                여러 접점으로 연결합니다.
              </h3>
            </div>

            <div className="border-t border-[var(--line)]">
              {services.map((service, index) => (
                <motion.div
                  key={service}
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
                    delay: reduceMotion ? 0 : index * 0.05,
                    ease,
                  }}
                  className="group grid grid-cols-[50px_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-7 sm:grid-cols-[64px_1fr_auto] md:py-9"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-xl font-semibold tracking-[-0.025em] text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl md:text-3xl">
                    {service}
                  </span>

                  <span className="text-lg text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--green)]">
                    →
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-b border-[var(--line)]">
          {contactLinks.map((item, index) => (
            <motion.div
              key={item.number}
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.72,
                delay: reduceMotion ? 0 : index * 0.07,
                ease,
              }}
            >
              <Link
                href={item.href}
                className="group grid gap-7 border-t border-[var(--line)] py-10 sm:grid-cols-[56px_1fr] md:py-14 lg:grid-cols-[0.16fr_0.9fr_0.8fr_auto] lg:items-center lg:gap-10 lg:py-[4.5vw]"
              >
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                  {item.number}
                </span>

                <div className="sm:col-start-2 lg:col-start-auto">
                  <p className="section-label">{item.label}</p>

                  <h3 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--text-dark)] transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--green)] sm:text-4xl md:text-5xl">
                    {item.title}
                  </h3>
                </div>

                <p className="max-w-xl text-sm leading-7 text-[var(--text)] sm:col-start-2 md:text-base md:leading-8 lg:col-start-auto">
                  {item.description}
                </p>

                <span className="flex h-14 w-14 items-center justify-center border border-[var(--text-dark)] text-xl text-[var(--text-dark)] transition-all duration-300 group-hover:translate-x-2 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] sm:col-start-2 md:h-16 md:w-16 lg:col-start-auto">
                  →
                </span>
              </Link>
            </motion.div>
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
              <p className="section-label">A SIMPLE BEGINNING</p>

              <h3 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-5xl md:mt-8 md:text-6xl">
                시작은
                <br />
                간단해도 괜찮습니다.
              </h3>
            </div>

            <div className="lg:self-end">
              <p className="max-w-2xl text-base leading-8 text-[var(--text)] md:text-lg md:leading-9">
                업종과 필요한 작업, 오픈 예정일 또는 현재 가장 고민되는
                부분만 알려주셔도 충분합니다.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
                확인 후 작업 가능 여부와 예상 범위, 진행 방향을
                순서대로 안내드립니다.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{
            duration: 0.9,
            ease,
          }}
          className="border-y border-[var(--line)] py-10 md:py-14 lg:py-[4vw]"
        >
          <Link
            href="/contact"
            className="group grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <p className="section-label">LET&apos;S WORK TOGETHER</p>

              <h3 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] sm:text-5xl md:mt-7 md:text-7xl lg:text-[6vw]">
                함께 만들 이야기가
                <br />
                있다면, 들려주세요.
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