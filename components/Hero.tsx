"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const premiumEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["-2%", "10%"],
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.025, 1.075],
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    reduceMotion ? [1, 1] : [1, 0.55],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 32],
  );

  const entrance = reduceMotion
    ? {
        initial: false as const,
        animate: undefined,
        transition: undefined,
      }
    : {
        initial: {
          opacity: 0,
          y: 26,
          filter: "blur(9px)",
        },
        animate: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
      };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden bg-[var(--cream)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-14 pt-12 sm:pt-16 md:px-12 md:pb-24 md:pt-28">
        <motion.div
          className="mx-auto max-w-[1200px] text-center"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <motion.p
            {...entrance}
            transition={{
              duration: 0.7,
              delay: 0.04,
              ease: premiumEase,
            }}
            className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)] sm:text-xs sm:tracking-[0.3em] md:text-sm"
          >
            BRANDING & SIGNAGE DESIGN STUDIO
          </motion.p>

          <div className="mt-5 overflow-hidden">
            <motion.h1
              {...entrance}
              transition={{
                duration: 0.95,
                delay: 0.13,
                ease: premiumEase,
              }}
              className="text-[3rem] font-semibold leading-[1.06] tracking-[-0.06em] text-[var(--text-dark)] sm:text-6xl sm:leading-[1.02] md:text-8xl lg:text-[7.5rem]"
            >
              Design that stays.
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              {...entrance}
              transition={{
                duration: 0.95,
                delay: 0.21,
                ease: premiumEase,
              }}
              className="text-[3rem] font-semibold leading-[1.06] tracking-[-0.06em] text-[var(--text-dark)] sm:text-6xl sm:leading-[1.02] md:text-8xl lg:text-[7.5rem]"
            >
              Not just looks.
            </motion.h1>
          </div>

          <motion.div
            {...entrance}
            transition={{
              duration: 0.85,
              delay: 0.3,
              ease: premiumEase,
            }}
            className="mt-14 flex justify-center sm:mt-16 md:mt-20"
          >
            <p className="max-w-2xl text-center text-lg font-medium leading-[1.45] text-[var(--text)] sm:text-xl md:text-2xl md:leading-[1.5]">
              브랜딩부터 간판까지,
              <br />
              오래 기억되는 브랜드 경험을 만듭니다.
            </p>
          </motion.div>

          <motion.div
            {...entrance}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: premiumEase,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
          >
            <Link
              href="/portfolio"
              className="premium-button group inline-flex items-center justify-center rounded-full bg-[var(--green)] px-7 py-3.5 text-sm font-semibold text-[var(--text-dark)] hover:bg-[var(--green-hover)]"
            >
              포트폴리오 보기

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="premium-button group inline-flex items-center justify-center rounded-full border border-[var(--soft)] bg-white/40 px-7 py-3.5 text-sm font-semibold text-[var(--text)] backdrop-blur-sm hover:border-[var(--text-dark)] hover:text-[var(--text-dark)]"
            >
              상담 문의

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 46,
                scale: 0.99,
                filter: "blur(12px)",
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        transition={{
          duration: 1.15,
          delay: 0.48,
          ease: premiumEase,
        }}
        className="relative w-full overflow-hidden bg-[#ded7cb]"
      >
        <div className="relative h-[70vh] min-h-[520px] max-h-[920px] w-full sm:h-[76vh] md:min-h-[680px]">
          <motion.div
            className="absolute inset-[-7%] will-change-transform"
            style={{
              y: imageY,
              scale: imageScale,
            }}
          >
            <Image
              src="/images/hero/signage.jpg"
              alt="Design Smoothie signage project"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-8 px-6 pb-8 text-white md:px-12 md:pb-12">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.75,
                  delay: 0.9,
                  ease: premiumEase,
                }}
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] text-white/65 sm:text-xs">
                  SELECTED PROJECT
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl md:text-5xl">
                  Signage & Brand Experience
                </p>
              </motion.div>

              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 16,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.7,
                  delay: 1,
                  ease: premiumEase,
                }}
                className="hidden text-xs font-medium tracking-[0.12em] text-white/65 md:block"
              >
                DESIGN SMOOTHIE
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}