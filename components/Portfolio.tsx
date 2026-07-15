"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { portfolioCategories } from "@/data/portfolio";

const cardTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-28 overflow-hidden bg-[#f5f4f0] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* 섹션 제목 */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <motion.div
            initial={{
              opacity: 0,
              y: 32,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={cardTransition}
            className="max-w-4xl"
          >
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              SELECTED WORK
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl lg:text-7xl">
              실력은 설명보다
              <br />
              결과로 보여드립니다.
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 26,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              ...cardTransition,
              delay: 0.1,
            }}
            className="max-w-md md:pb-2"
          >
            <p className="text-base leading-8 text-[var(--text)] md:text-lg">
              브랜딩부터 간판, 파사드와 공간 디자인까지.
              <br />
              브랜드가 실제 공간에서 완성되는 과정을 담았습니다.
            </p>

            <Link
              href="/portfolio"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-dark)]"
            >
              전체 포트폴리오 보기

              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* 포트폴리오 카드 */}
        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-2">
          {portfolioCategories.map((category, categoryIndex) => {
            const isFeatured = categoryIndex === 0;
            const isBanner = category.slug === "banner";

            const previewImages = isBanner
              ? category.images.slice(0, 3)
              : category.images.slice(0, 4);

            return (
              <motion.div
                key={category.slug}
                initial={{
                  opacity: 0,
                  y: 44,
                  scale: 0.985,
                  filter: "blur(9px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                  margin: "0px 0px -40px 0px",
                }}
                transition={{
                  ...cardTransition,
                  delay: Math.min(categoryIndex * 0.07, 0.28),
                }}
                className={isFeatured ? "md:col-span-2" : ""}
              >
                <Link
                  href={category.href}
                  className="group block h-full"
                >
                  <motion.article
                    whileHover={{
                      y: -9,
                    }}
                    transition={{
                      duration: 0.42,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-full overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_20px_70px_rgba(57,48,40,0.055)] transition-shadow duration-500 group-hover:shadow-[0_38px_100px_rgba(57,48,40,0.13)] md:rounded-[42px]"
                  >
                    {/* 이미지 영역 */}
                    <div
                      className={`relative overflow-hidden bg-[#dedbd3] ${
                        isFeatured
                          ? "aspect-[4/3] sm:aspect-[16/9]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      {previewImages.length > 0 ? (
                        <div
                          className={`grid h-full w-full ${
                            isBanner
                              ? "grid-cols-3 gap-2 p-3 md:gap-4 md:p-5"
                              : previewImages.length === 1
                                ? "grid-cols-1"
                                : "grid-cols-2"
                          }`}
                        >
                          {previewImages.map((image, imageIndex) => (
                            <div
                              key={image}
                              className={`relative overflow-hidden ${
                                isBanner
                                  ? "rounded-[18px] bg-white/65"
                                  : previewImages.length === 1
                                    ? ""
                                    : "bg-white/45"
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`${category.title} 포트폴리오 미리보기 ${
                                  imageIndex + 1
                                }`}
                                fill
                                sizes={
                                  isFeatured
                                    ? "(max-width: 768px) 100vw, 1400px"
                                    : "(max-width: 768px) 100vw, 700px"
                                }
                                className={`transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] ${
                                  isBanner
                                    ? "object-cover"
                                    : "object-cover"
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={`flex h-full items-center justify-center ${category.color}`}
                        >
                          <span className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                            DESIGN SMOOTHIE
                          </span>
                        </div>
                      )}

                      {/* 이미지 오버레이 */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                      {/* 번호 */}
                      <div className="absolute left-5 top-5 md:left-7 md:top-7">
                        <span className="inline-flex items-center rounded-full border border-white/30 bg-black/15 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md">
                          {category.number}
                        </span>
                      </div>

                      {/* 이미지 위 하단 정보 */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white md:p-9">
                        <div>
                          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/65 md:text-xs">
                            {category.subtitle}
                          </p>

                          <h3
                            className={`mt-2 font-semibold tracking-[-0.045em] text-white ${
                              isFeatured
                                ? "text-3xl md:text-5xl"
                                : "text-3xl md:text-4xl"
                            }`}
                          >
                            {category.title}
                          </h3>
                        </div>

                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-500 group-hover:translate-x-1.5 group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)] md:h-14 md:w-14">
                          →
                        </span>
                      </div>
                    </div>

                    {/* 카드 설명 영역 */}
                    <div className="flex items-start justify-between gap-6 p-7 md:p-9">
                      <p className="max-w-2xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                        {category.description}
                      </p>

                      <span className="hidden shrink-0 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] sm:block">
                        VIEW PROJECT
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}