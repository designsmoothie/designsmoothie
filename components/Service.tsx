"use client";

import { motion, useReducedMotion } from "motion/react";

const services = [
  {
    number: "01",
    category: "BRANDING",
    title: "Brand Identity",
    koreanTitle: "브랜드 아이덴티티 개발",
    description:
      "브랜드의 방향성을 정리하고 로고, 컬러 시스템, 그래픽 언어와 디자인 가이드를 구축합니다.",
    scope: ["Strategy", "Naming", "Logo", "Visual System"],
  },
  {
    number: "02",
    category: "SIGNAGE",
    title: "Signage Design",
    koreanTitle: "간판 & 사인 디자인",
    description:
      "브랜드가 가장 먼저 발견되는 공간의 얼굴을 설계하고, 실제 제작과 시공 환경까지 고려합니다.",
    scope: ["Signage", "Facade", "Wayfinding", "Production"],
  },
  {
    number: "03",
    category: "SPACE GRAPHIC",
    title: "Space Graphic",
    koreanTitle: "공간 그래픽 디자인",
    description:
      "파사드와 공간 그래픽, 배너와 인쇄물을 하나의 일관된 브랜드 경험으로 연결합니다.",
    scope: ["Facade", "Graphic", "Print", "Experience"],
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
      className="scroll-mt-24 overflow-hidden bg-[var(--cream)] py-28 md:py-40 lg:py-[10vw]"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-[4vw]">
        {/* 섹션 소개 */}
        <div className="grid gap-12 border-t border-[var(--line)] pt-8 md:pt-11 lg:grid-cols-12 lg:gap-[3vw]">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
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
              amount: 0.3,
              margin: "0px 0px -60px 0px",
            }}
            transition={{
              duration: 0.78,
              ease: premiumEase,
            }}
            className="lg:col-span-3"
          >
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[var(--muted)] md:text-xs">
              WHAT WE DO
            </p>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 36,
                    filter: "blur(10px)",
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
              margin: "0px 0px -60px 0px",
            }}
            transition={{
              duration: 0.9,
              delay: reduceMotion ? 0 : 0.06,
              ease: premiumEase,
            }}
            className="lg:col-span-9"
          >
            <h2 className="max-w-[1300px] text-[3rem] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-7xl lg:text-[6.5vw] lg:leading-[0.9]">
              브랜드를 만들고,
              <br />
              공간에서 완성합니다.
            </h2>

            <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:items-start lg:mt-[4vw]">
              <p className="max-w-xl text-xl font-medium leading-[1.5] tracking-[-0.025em] text-[var(--text-dark)] md:text-2xl">
                보기 좋은 디자인보다,
                <br />
                오래 기억되는 경험을 설계합니다.
              </p>

              <p className="max-w-xl text-sm leading-7 text-[var(--text)] md:justify-self-end md:text-base md:leading-8">
                디자인 스무디는 브랜드의 첫인상부터 실제 공간에서
                마주하는 순간까지 일관된 시각 언어로 연결합니다.
                기획과 디자인뿐 아니라 제작 환경과 활용 방식까지 함께
                고민합니다.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 서비스 목록 */}
        <div className="mt-24 border-t border-[var(--line)] md:mt-32 lg:mt-[8vw]">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 38,
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
                amount: 0.25,
                margin: "0px 0px -50px 0px",
              }}
              transition={{
                duration: 0.82,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: premiumEase,
              }}
              className="group border-b border-[var(--line)]"
            >
              <div className="grid gap-8 py-11 sm:py-14 md:grid-cols-12 md:gap-6 md:py-16 lg:py-[5vw]">
                {/* 번호 */}
                <div className="flex items-start justify-between md:col-span-2 md:block">
                  <span className="text-sm font-semibold text-[var(--green)]">
                    {service.number}
                  </span>

                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:mt-3 md:block">
                    {service.category}
                  </span>
                </div>

                {/* 제목 */}
                <div className="md:col-span-5">
                  <h3 className="text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--text-dark)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 sm:text-5xl lg:text-[4.3vw]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium text-[var(--muted)] md:mt-5 md:text-base">
                    {service.koreanTitle}
                  </p>
                </div>

                {/* 설명 */}
                <div className="md:col-span-4 md:pl-4 lg:pl-[2vw]">
                  <p className="max-w-xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                    {service.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                    {service.scope.map((item) => (
                      <span
                        key={item}
                        className="text-[9px] font-semibold tracking-[0.16em] text-[var(--muted)] md:text-[10px]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 화살표 */}
                <div className="flex items-end justify-end md:col-span-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-lg text-[var(--text-dark)] transition-all duration-500 group-hover:translate-x-1 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] md:h-12 md:w-12">
                    ↗
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* 마무리 문장 */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 38,
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
          }}
          transition={{
            duration: 0.84,
            ease: premiumEase,
          }}
          className="grid gap-8 pt-14 md:grid-cols-12 md:pt-20 lg:pt-[5vw]"
        >
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:col-span-3 md:text-xs">
            FROM IDEA TO SPACE
          </p>

          <p className="max-w-5xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-4xl md:col-span-9 md:text-5xl lg:text-[4.4vw]">
            하나의 브랜드가 화면과 인쇄물,
            <br className="hidden sm:block" />
            간판과 공간에서 같은 목소리를 내도록.
          </p>
        </motion.div>
      </div>
    </section>
  );
}