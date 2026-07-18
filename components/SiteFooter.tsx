"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const navigation = [
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "SERVICE", href: "/#service" },
  { label: "PROCESS", href: "/#process" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/contact" },
  { label: "REQUEST GUIDE", href: "/guide" },
];

const services = [
  "BRAND IDENTITY",
  "SIGNAGE & FACADE",
  "SPACE GRAPHIC",
  "PRINT & EDITORIAL",
];

const ease = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function SiteFooter() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 28,
          filter: "blur(7px)",
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
    },
  };

  return (
    <footer className="overflow-hidden bg-[var(--text-dark)] text-[var(--cream)]">
      <div className="px-5 pb-8 pt-20 sm:px-8 md:px-12 md:pb-10 md:pt-28 lg:px-[4vw] lg:pt-[8vw]">
        <motion.div
          {...reveal}
          transition={{
            duration: 0.9,
            ease,
          }}
          className="grid gap-16 border-b border-white/20 pb-16 md:pb-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:pb-[6vw]"
        >
          <div>
            <p className="text-[10px] font-semibold tracking-[0.26em] text-white/45 md:text-xs">
              DESIGN SMOOTHIE
            </p>

            <p className="mt-7 max-w-xs text-sm leading-7 text-white/60 md:mt-9">
              Branding
              <br />
              Signage
              <br />
              Space Graphic
            </p>
          </div>

          <div>
            <p className="display-en-sm text-[var(--green)]">
              Design that stays.
            </p>

            <h2 className="mt-7 max-w-[1200px] text-[clamp(3.2rem,8vw,9rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[var(--cream)] md:mt-10">
              브랜드의 시작부터
              <br />
              공간의 완성까지.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:mt-14 md:grid-cols-2 md:gap-14 md:pt-10">
              <p className="max-w-xl text-base leading-8 text-white/70 md:text-lg md:leading-9">
                브랜딩, 간판, 파사드와 공간 그래픽을 하나의 흐름으로
                연결합니다.
              </p>

              <p className="max-w-xl text-base leading-8 text-white/70 md:text-lg md:leading-9">
                보기 좋은 디자인을 넘어 오래 기억되는 브랜드 경험을
                만듭니다.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-16 border-b border-white/20 py-16 md:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:py-[6vw]">
          <motion.div
            {...reveal}
            transition={{
              duration: 0.82,
              ease,
            }}
          >
            <p className="text-[10px] font-semibold tracking-[0.26em] text-white/45 md:text-xs">
              BASED IN
            </p>

            <p className="mt-6 text-xl font-semibold tracking-[-0.025em] text-[var(--cream)] md:text-2xl">
              Busan, South Korea
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
              부산을 기반으로 브랜드와 공간이 필요한 다양한 프로젝트를
              진행합니다.
            </p>
          </motion.div>

          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              {...reveal}
              transition={{
                duration: 0.82,
                delay: reduceMotion ? 0 : 0.06,
                ease,
              }}
            >
              <p className="text-[10px] font-semibold tracking-[0.26em] text-white/45 md:text-xs">
                NAVIGATION
              </p>

              <nav className="mt-7 flex flex-col items-start">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: 14,
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
                      duration: 0.46,
                      delay: reduceMotion ? 0 : index * 0.04,
                      ease,
                    }}
                    className="w-full border-t border-white/15 last:border-b"
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between py-4 text-sm font-semibold tracking-[0.08em] text-[var(--cream)] transition-colors duration-300 hover:text-[var(--green)]"
                    >
                      <span>{item.label}</span>

                      <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{
                duration: 0.82,
                delay: reduceMotion ? 0 : 0.12,
                ease,
              }}
            >
              <p className="text-[10px] font-semibold tracking-[0.26em] text-white/45 md:text-xs">
                SERVICES
              </p>

              <div className="mt-7 border-t border-white/15">
                {services.map((service, index) => (
                  <div
                    key={service}
                    className="grid grid-cols-[34px_1fr] gap-3 border-b border-white/15 py-4"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-semibold leading-6 tracking-[0.03em] text-[var(--cream)]">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{
                duration: 0.82,
                delay: reduceMotion ? 0 : 0.18,
                ease,
              }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <p className="text-[10px] font-semibold tracking-[0.26em] text-white/45 md:text-xs">
                CONTACT
              </p>

              <div className="mt-7 space-y-8">
                <div>
                  <p className="text-xs text-white/40">Email</p>

                  <a
                    href="mailto:hello_smoothie@naver.com"
                    className="mt-2 inline-block break-all text-base font-semibold tracking-[-0.015em] text-[var(--cream)] transition-colors duration-300 hover:text-[var(--green)]"
                  >
                    hello_smoothie@naver.com
                  </a>
                </div>

                <div>
                  <p className="text-xs text-white/40">Main Channel</p>

                  <Link
                    href="/contact"
                    className="group mt-2 inline-flex items-center gap-3 text-base font-semibold text-[var(--cream)] transition-colors duration-300 hover:text-[var(--green)]"
                  >
                    카카오채널 상담
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>

                <div>
                  <p className="text-xs text-white/40">Project Inquiry</p>

                  <Link
                    href="/contact"
                    className="group mt-2 inline-flex items-center gap-3 text-base font-semibold text-[var(--cream)] transition-colors duration-300 hover:text-[var(--green)]"
                  >
                    프로젝트 문의하기
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
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
            duration: 0.9,
            ease,
          }}
          className="border-b border-white/20 py-14 md:py-20 lg:py-[5vw]"
        >
          <Link
            href="/contact"
            className="group grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[0.26em] text-white/45 md:text-xs">
                START A PROJECT
              </p>

              <p className="mt-6 max-w-[1200px] text-[clamp(2.8rem,7vw,8rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[var(--cream)] transition-colors duration-300 group-hover:text-[var(--green)]">
                함께 만들 이야기가
                <br />
                있다면, 들려주세요.
              </p>
            </div>

            <span className="flex h-16 w-16 items-center justify-center border border-white/50 text-2xl text-[var(--cream)] transition-all duration-300 group-hover:translate-x-2 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)] md:h-20 md:w-20">
              →
            </span>
          </Link>
        </motion.div>

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
            delay: reduceMotion ? 0 : 0.15,
          }}
          className="flex flex-col gap-5 pt-8 text-[11px] leading-6 text-white/40 md:flex-row md:items-center md:justify-between md:text-xs"
        >
          <p>© 2026 Design Smoothie. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Branding & Signage Design Studio</span>
            <span>Busan, South Korea</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}