"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { portfolioCategories } from "@/data/portfolio";

const premiumEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

type CategoryLayout = {
  wrapper: string;
  media: string;
  info: string;
  title: string;
  description: string;
  offset: string;
};

function getCategoryLayout(index: number): CategoryLayout {
  const layoutIndex = index % 6;

  if (layoutIndex === 0) {
    return {
      wrapper: "lg:col-span-12",
      media:
        "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2.05/1]",
      info:
        "lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]",
      title:
        "text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[5.6vw]",
      description: "max-w-xl lg:justify-self-end",
      offset: "",
    };
  }

  if (layoutIndex === 1) {
    return {
      wrapper: "lg:col-span-7",
      media: "aspect-[4/3] lg:aspect-[1.25/1]",
      info: "lg:grid-cols-1",
      title:
        "text-[2.45rem] sm:text-5xl lg:text-[4.2vw]",
      description: "max-w-xl",
      offset: "",
    };
  }

  if (layoutIndex === 2) {
    return {
      wrapper: "lg:col-span-5",
      media: "aspect-[4/5] lg:aspect-[0.92/1]",
      info: "lg:grid-cols-1",
      title:
        "text-[2.45rem] sm:text-5xl lg:text-[4.2vw]",
      description: "max-w-lg",
      offset: "lg:mt-[11vw]",
    };
  }

  if (layoutIndex === 3) {
    return {
      wrapper: "lg:col-span-5",
      media: "aspect-[4/5] lg:aspect-[0.9/1]",
      info: "lg:grid-cols-1",
      title:
        "text-[2.45rem] sm:text-5xl lg:text-[4.2vw]",
      description: "max-w-lg",
      offset: "",
    };
  }

  if (layoutIndex === 4) {
    return {
      wrapper: "lg:col-span-7",
      media: "aspect-[4/3] lg:aspect-[1.32/1]",
      info: "lg:grid-cols-1",
      title:
        "text-[2.45rem] sm:text-5xl lg:text-[4.2vw]",
      description: "max-w-xl",
      offset: "lg:mt-[7vw]",
    };
  }

  return {
    wrapper: "lg:col-span-12",
    media:
      "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2.12/1]",
    info:
      "lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]",
    title:
      "text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[5.6vw]",
    description: "max-w-xl lg:justify-self-end",
    offset: "",
  };
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden bg-[#f5f4f0] py-24 sm:py-28 md:py-36 lg:py-[9vw]"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-[4vw]">
        <div className="grid gap-12 border-b border-[var(--line)] pb-14 md:gap-16 md:pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-end lg:pb-[5vw]">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 34,
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
              margin: "0px 0px -60px 0px",
            }}
            transition={{
              duration: 0.9,
              ease: premiumEase,
            }}
          >
            <p className="section-label">
              SELECTED WORK
            </p>

            <h2 className="display-xl mt-6 max-w-[1250px] md:mt-8">
              실력은 설명보다
              <br />
              결과로 보여드립니다.
            </h2>
          </motion.div>

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
              amount: 0.25,
              margin: "0px 0px -60px 0px",
            }}
            transition={{
              duration: 0.82,
              delay: reduceMotion ? 0 : 0.08,
              ease: premiumEase,
            }}
            className="max-w-xl lg:justify-self-end lg:pb-2"
          >
            <p className="body-large">
              브랜딩부터 간판, 파사드와 공간 디자인까지.
              브랜드가 실제 환경 속에서 보이고 기억되는
              과정을 담았습니다.
            </p>

            <Link
              href="/portfolio"
              className="group mt-7 inline-flex items-center gap-3 border-b border-[var(--text-dark)] pb-2 text-sm font-semibold text-[var(--text-dark)] transition-colors duration-300 hover:border-[var(--green)] hover:text-[var(--green)] md:mt-9"
            >
              전체 포트폴리오 보기

              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 px-5 sm:px-8 md:mt-24 md:px-12 lg:mt-[7vw] lg:px-[4vw]">
        <div className="grid items-start gap-x-[3.5vw] gap-y-24 lg:grid-cols-12 lg:gap-y-[11vw]">
          {portfolioCategories.map(
            (category, categoryIndex) => {
              const layout =
                getCategoryLayout(categoryIndex);

              const isBanner =
                category.slug === "banner";

              const previewImages = isBanner
                ? category.images.slice(0, 3)
                : category.images.slice(0, 4);

              const hasImages =
                previewImages.length > 0;

              const isWide =
                categoryIndex % 6 === 0 ||
                categoryIndex % 6 === 5;

              return (
                <motion.article
                  key={category.slug}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 50,
                          filter: "blur(11px)",
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
                    amount: 0.08,
                    margin: "0px 0px -70px 0px",
                  }}
                  transition={{
                    duration: 0.88,
                    delay: reduceMotion
                      ? 0
                      : Math.min(
                          categoryIndex * 0.045,
                          0.22,
                        ),
                    ease: premiumEase,
                  }}
                  className={`${layout.wrapper} ${layout.offset}`}
                >
                  <Link
                    href={category.href}
                    className="group block"
                    aria-label={`${category.title} 포트폴리오 보기`}
                  >
                    <div
                      className={`relative overflow-hidden bg-[#dedbd3] ${layout.media}`}
                    >
                      {hasImages ? (
                        <div
                          className={`grid h-full w-full ${
                            isBanner
                              ? "grid-cols-3 gap-px bg-[#f5f4f0]"
                              : previewImages.length === 1
                                ? "grid-cols-1"
                                : isWide
                                  ? "grid-cols-[1.18fr_0.82fr]"
                                  : "grid-cols-2"
                          }`}
                        >
                          {previewImages.map(
                            (image, imageIndex) => {
                              const isMainImage =
                                isWide &&
                                previewImages.length >= 3 &&
                                imageIndex === 0;

                              return (
                                <div
                                  key={`${category.slug}-${imageIndex}`}
                                  className={`relative overflow-hidden bg-[#dedbd3] ${
                                    isMainImage
                                      ? "row-span-2"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    src={image}
                                    alt={`${category.title} 포트폴리오 미리보기 ${
                                      imageIndex + 1
                                    }`}
                                    fill
                                    priority={
                                      categoryIndex === 0
                                    }
                                    sizes={
                                      isWide
                                        ? "(max-width: 768px) 100vw, 92vw"
                                        : "(max-width: 1024px) 100vw, 58vw"
                                    }
                                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]"
                                  />
                                </div>
                              );
                            },
                          )}
                        </div>
                      ) : (
                        <div
                          className={`flex h-full items-center justify-center ${category.color}`}
                        >
                          <span className="section-label">
                            DESIGN SMOOTHIE
                          </span>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/[0.04]" />

                      <div className="absolute left-4 top-4 sm:left-5 sm:top-5 md:left-7 md:top-7">
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] md:text-xs">
                          {category.number}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 translate-y-2 text-2xl text-white opacity-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-5 sm:right-5 md:bottom-7 md:right-7 md:text-3xl">
                        ↗
                      </div>
                    </div>

                    <div className="mt-7 md:mt-9">
                      <div
                        className={`grid gap-7 border-t border-[var(--line)] pt-6 md:gap-9 md:pt-8 ${layout.info}`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-6">
                            <div className="min-w-0">
                              <p className="section-label">
                                {category.subtitle}
                              </p>

                              <h3
                                className={`mt-3 font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--text-dark)] transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--green)] md:mt-4 ${layout.title}`}
                              >
                                {category.title}
                              </h3>
                            </div>

                            <span className="mt-1 shrink-0 text-xl text-[var(--muted)] transition-all duration-400 group-hover:translate-x-1.5 group-hover:text-[var(--text-dark)] md:text-2xl">
                              →
                            </span>
                          </div>
                        </div>

                        <div
                          className={`${layout.description} ${
                            isWide
                              ? "lg:self-end"
                              : ""
                          }`}
                        >
                          <p className="body-large">
                            {category.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 md:mt-7">
                            {category.services
                              .slice(0, 4)
                              .map((service) => (
                                <span
                                  key={service}
                                  className="text-[10px] font-semibold tracking-[0.12em] text-[var(--muted)]"
                                >
                                  {service}
                                </span>
                              ))}
                          </div>

                          <p className="mt-7 text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)]">
                            EXPLORE CATEGORY
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            },
          )}
        </div>
      </div>

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
          amount: 0.2,
        }}
        transition={{
          duration: 0.85,
          ease: premiumEase,
        }}
        className="mt-28 px-5 sm:px-8 md:mt-40 md:px-12 lg:mt-[12vw] lg:px-[4vw]"
      >
        <Link
          href="/portfolio"
          className="group block border-y border-[var(--line)] py-10 md:py-14 lg:py-[4vw]"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="section-label">
                FULL ARCHIVE
              </p>

              <h3 className="display-en-lg mt-5 transition-colors duration-300 group-hover:text-[var(--green)] md:mt-7">
                Explore all work.
              </h3>
            </div>

            <span className="flex h-14 w-14 items-center justify-center border border-[var(--text-dark)] text-xl text-[var(--text-dark)] transition-all duration-300 group-hover:translate-x-2 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] md:h-16 md:w-16">
              →
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}