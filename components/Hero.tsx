"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "10%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.06]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, 0.5]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 36]
  );

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative overflow-hidden bg-[var(--cream)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 sm:pt-16 md:px-12 md:pb-20 md:pt-28">
        <motion.div
          className="mx-auto max-w-[1200px] text-center"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)] sm:text-xs sm:tracking-[0.3em] md:text-sm"
          >
            BRANDING & SIGNAGE DESIGN STUDIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 text-[3rem] font-semibold leading-[1.06] tracking-[-0.06em] text-[var(--text-dark)] sm:text-6xl sm:leading-[1.02] md:text-8xl lg:text-[7.5rem]"
          >
            Design that stays.
            <br />
            Not just looks.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.26,
              ease: [0.22, 1, 0.36, 1],
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
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
          >
            <Link
              href="/portfolio"
              className="premium-button inline-flex items-center justify-center rounded-full bg-[var(--green)] px-7 py-3.5 text-sm font-semibold text-[var(--text-dark)]"
            >
              포트폴리오 보기
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/contact"
              className="premium-button inline-flex items-center justify-center rounded-full border border-[var(--soft)] bg-white/40 px-7 py-3.5 text-sm font-semibold text-[var(--text)] backdrop-blur-sm"
            >
              상담 문의
              <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 36,
            scale: 0.985,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.46,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-14 overflow-hidden rounded-[28px] bg-[#ded7cb] sm:mt-16 md:mt-24 md:rounded-[44px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/8]">
            <motion.div
              className="absolute inset-[-6%]"
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
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1360px"
                className="object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white md:p-10">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.22em]">
                  SELECTED PROJECT
                </p>

                <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl md:text-4xl">
                  Signage & Brand Experience
                </p>
              </div>

              <p className="hidden text-sm font-medium text-white/70 md:block">
                DESIGN SMOOTHIE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}