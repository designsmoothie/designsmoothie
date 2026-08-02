"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "motion/react";

const services = [
  {
    number: "01",
    category: "BRANDING",
    title: "Branding",
    koreanTitle: "브랜드 아이덴티티",
    image: "/images/service/branding.jpg",
    imagePosition: "center",
    href: "/portfolio/category/branding",
  },
  {
    number: "02",
    category: "SIGNAGE & FACADE",
    title: "Signage & Facade",
    koreanTitle: "간판 및 파사드 디자인",
    image: "/images/service/signage.jpg",
    imagePosition: "center",
    href: "/portfolio/category/signage-facade",
  },
  {
    number: "03",
    category: "SPACE GRAPHIC",
    title: "Space Graphic",
    koreanTitle: "공간 그래픽 디자인",
    image: "/images/service/space-graphic.jpg",
    imagePosition: "center",
    href: "/portfolio/category/interior",
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
      className="scroll-mt-24 overflow-hidden bg-[var(--cream)] pt-24 md:pt-32 lg:pt-[8vw]"
    >
      {/* 서비스 소개 */}
      <div className="px-5 pb-16 sm:px-8 md:px-12 md:pb-20 lg:px-[4vw] lg:pb-[5vw]">
        <div className="grid gap-10 border-t border-[var(--line)] pt-8 md:pt-11 lg:grid-cols-12 lg:gap-[3vw]">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
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
            }}
            transition={{
              duration: 0.75,
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
                    y: 32,
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
            }}
            transition={{
              duration: 0.85,
              delay: reduceMotion ? 0 : 0.06,
              ease: premiumEase,
            }}
            className="lg:col-span-9"
          >
            <h2 className="max-w-[1200px] text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-7xl lg:text-[6vw] lg:leading-[0.92]">
              브랜드를 만들고,
              <br />
              공간에서 완성합니다.
            </h2>

            <div className="mt-9 grid gap-7 md:mt-12 md:grid-cols-2">
              <p className="max-w-xl text-xl font-medium leading-[1.5] tracking-[-0.025em] text-[var(--text-dark)] md:text-2xl">
                보기 좋은 디자인보다,
                <br />
                오래 기억되는 경험을 설계합니다.
              </p>

              <p className="max-w-xl text-sm leading-7 text-[var(--text)] md:justify-self-end md:text-base md:leading-8">
                브랜드의 첫인상부터 실제 공간에서
                마주하는 순간까지, 하나의 시각 언어로
                연결합니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 서비스 이미지 목록 */}
      <div className="border-t border-white/25">
        {services.map((service, index) => (
          <motion.article
            key={service.number}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
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
              amount: 0.16,
            }}
            transition={{
              duration: 0.8,
              delay: reduceMotion
                ? 0
                : index * 0.06,
              ease: premiumEase,
            }}
            className="group relative border-b border-white/30"
          >
            <Link
              href={service.href}
              className="relative block min-h-[180px] overflow-hidden sm:min-h-[220px] md:min-h-[250px] lg:min-h-[285px]"
              aria-label={`${service.koreanTitle} 포트폴리오 보기`}
            >
              <Image
                src={service.image}
                alt={service.koreanTitle}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                style={{
                  objectPosition:
                    service.imagePosition,
                }}
              />

              {/* 기본은 어둡게, 호버하면 사진이 조금 선명해짐 */}
              <div className="pointer-events-none absolute inset-0 bg-black/55 transition-colors duration-700 group-hover:bg-black/42" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/20" />

              <div className="relative z-10 flex min-h-[180px] items-center px-5 py-7 text-white sm:min-h-[220px] sm:px-8 md:min-h-[250px] md:px-12 lg:min-h-[285px] lg:px-[4vw]">
                <div className="flex w-full items-center justify-between gap-6">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-semibold tracking-[0.2em] text-white/65 md:text-[10px]">
                        {service.number}
                      </span>

                      <span className="h-px w-5 bg-white/35" />

                      <span className="text-[9px] font-semibold tracking-[0.18em] text-white/65 md:text-[10px]">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[2rem] font-semibold leading-[0.95] tracking-[-0.055em] text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl md:text-5xl lg:text-[4.4vw]">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-xs font-medium text-white/70 md:text-sm">
                      {service.koreanTitle}
                    </p>
                  </div>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/10 text-lg text-white backdrop-blur-sm transition-all duration-500 group-hover:translate-x-1.5 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)] md:h-13 md:w-13 lg:h-14 lg:w-14">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* 마무리 */}
      <div className="px-5 pb-24 pt-14 sm:px-8 md:px-12 md:pb-32 md:pt-20 lg:px-[4vw] lg:pb-[8vw] lg:pt-[5vw]">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
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
          }}
          transition={{
            duration: 0.8,
            ease: premiumEase,
          }}
          className="grid gap-8 md:grid-cols-12"
        >
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:col-span-3 md:text-xs">
            FROM IDEA TO SPACE
          </p>

          <p className="max-w-5xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--text-dark)] sm:text-4xl md:col-span-9 md:text-5xl lg:text-[4.2vw]">
            하나의 브랜드가 화면과 인쇄물,
            <br className="hidden sm:block" />
            간판과 공간에서 같은 목소리를 내도록.
          </p>
        </motion.div>
      </div>
    </section>
  );
}