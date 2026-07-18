"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="overflow-hidden bg-[var(--cream)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 44,
                  scale: 0.99,
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
            amount: 0.18,
            margin: "0px 0px -60px 0px",
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
          className="relative overflow-hidden rounded-[40px] bg-[var(--text-dark)] px-8 py-16 text-white md:px-16 md:py-24 lg:px-20"
        >
          <div className="motion-glow absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[var(--green)]/12 blur-3xl" />

          <div className="motion-glow-delayed absolute -bottom-32 left-0 h-[260px] w-[260px] rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
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
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: reduceMotion ? 0 : 0.12,
                  ease,
                }}
                className="text-xs font-semibold tracking-[0.28em] text-white/55"
              >
                START YOUR PROJECT
              </motion.p>

              <motion.h2
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 28,
                        filter: "blur(7px)",
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
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: reduceMotion ? 0 : 0.2,
                  ease,
                }}
                className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white md:text-7xl lg:text-8xl"
              >
                함께 만들면
                <br />
                더 오래 기억됩니다.
              </motion.h2>

              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 22,
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
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: reduceMotion ? 0 : 0.3,
                  ease,
                }}
                className="mt-8 max-w-2xl text-base leading-8 text-white/70 md:text-xl md:leading-9"
              >
                브랜딩부터 간판, 파사드, 공간 그래픽까지.
                <br />
                브랜드가 가장 좋은 모습으로 기억될 수 있도록
                디자인 스무디가 함께합니다.
              </motion.p>

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
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
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : 0.4,
                  ease,
                }}
                className="mt-12 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="premium-button group inline-flex items-center justify-center rounded-full bg-[var(--green)] px-8 py-4 text-sm font-semibold text-[var(--text-dark)] hover:bg-[var(--green-hover)]"
                >
                  프로젝트 문의하기

                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/guide"
                  className="premium-button group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
                >
                  의뢰 안내 보기

                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 34,
                      scale: 0.985,
                      filter: "blur(8px)",
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
                amount: 0.35,
              }}
              transition={{
                duration: 0.8,
                delay: reduceMotion ? 0 : 0.28,
                ease,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -7,
                    }
              }
              className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 hover:border-white/15 hover:bg-white/[0.07] hover:shadow-[0_32px_100px_rgba(0,0,0,0.18)]"
            >
              <div>
                <p className="text-xs tracking-[0.22em] text-white/45">
                  RESPONSE
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                  빠르고 명확하게
                  <br />
                  답변드립니다.
                </h3>
              </div>

              <div className="space-y-5 border-t border-white/10 pt-6">
                <div className="flex items-start justify-between gap-8">
                  <span className="text-white/55">
                    상담 채널
                  </span>

                  <span className="font-medium text-white">
                    카카오채널
                  </span>
                </div>

                <div className="flex items-start justify-between gap-8">
                  <span className="text-white/55">
                    상담 분야
                  </span>

                  <span className="text-right font-medium text-white">
                    Branding
                    <br />
                    Signage
                    <br />
                    Space Graphic
                  </span>
                </div>

                <div className="flex items-start justify-between gap-8">
                  <span className="text-white/55">
                    진행 방식
                  </span>

                  <span className="font-medium text-white">
                    온라인 · 오프라인
                  </span>
                </div>
              </div>

              <div className="mt-2 rounded-2xl bg-white/[0.06] p-5 text-sm leading-7 text-white/70">
                프로젝트의 규모와 업종에 맞는 방향을 함께 고민하며
                가장 적합한 디자인 솔루션을 제안드립니다.
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}