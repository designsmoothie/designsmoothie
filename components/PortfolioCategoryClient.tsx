"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { PortfolioProject } from "@/data/projects";

type PortfolioCategory = {
  number: string;
  slug: string;
  title: string;
  heroTitle: string;
  subtitle: string;
  href: string;
  color: string;
  description: string;
  overviewTitle: string;
  overview: string;
  services: string[];
  keywords: string[];
  images: string[];
};

type PortfolioCategoryClientProps = {
  currentCategory: PortfolioCategory;
  nextCategory: PortfolioCategory;
  projects: PortfolioProject[];
};

const cardTransition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [
    number,
    number,
    number,
    number,
  ],
};

function getPreviewImages(project: PortfolioProject) {
  const sourceImages =
    project.images.length > 0
      ? project.images
      : [project.thumbnail];

  return sourceImages.slice(0, 3);
}

function getImageLabel(count: number) {
  return `${count} ${count === 1 ? "IMAGE" : "IMAGES"}`;
}

type ProjectPreviewProps = {
  project: PortfolioProject;
  isWideCard: boolean;
  priority: boolean;
};

function ProjectPreview({
  project,
  isWideCard,
  priority,
}: ProjectPreviewProps) {
  const previewImages = getPreviewImages(project);
  const imageCount = project.images.length || 1;
  const remainingCount = Math.max(imageCount - 3, 0);
  const isBannerProject = project.category === "banner";

  const imageSizes = isWideCard
    ? "(max-width: 768px) 100vw, 1400px"
    : "(max-width: 768px) 100vw, 700px";

  /*
   * 이미지 1장
   */
  if (previewImages.length === 1) {
    return (
      <div
        className={`relative overflow-hidden bg-[#e5e1da] ${
          isBannerProject
            ? "aspect-[2.96/4]"
            : isWideCard
              ? "aspect-[4/3] md:aspect-[16/9]"
              : "aspect-[4/3]"
        }`}
      >
        <Image
          src={previewImages[0]}
          alt={`${project.title} 프로젝트 미리보기`}
          fill
          priority={priority}
          sizes={imageSizes}
          className={`transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] ${
            isBannerProject ? "object-cover" : "object-cover"
          }`}
        />
      </div>
    );
  }

  /*
   * 이미지 2장
   */
  if (previewImages.length === 2) {
    return (
      <div
        className={`grid overflow-hidden bg-[#e5e1da] ${
          isBannerProject
            ? "aspect-[16/10] grid-cols-2"
            : isWideCard
              ? "aspect-[4/3] grid-cols-2 md:aspect-[16/9]"
              : "aspect-[4/3] grid-cols-2"
        }`}
      >
        {previewImages.map((image, index) => (
          <div
            key={`${project.slug}-preview-${image}-${index}`}
            className="relative overflow-hidden border-r border-white/25 last:border-r-0"
          >
            <Image
              src={image}
              alt={`${project.title} 프로젝트 미리보기 ${index + 1}`}
              fill
              priority={priority && index === 0}
              sizes={imageSizes}
              className={`transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] ${
                isBannerProject ? "object-cover" : "object-cover"
              }`}
            />
          </div>
        ))}
      </div>
    );
  }

  /*
   * 이미지 3장 이상
   * 큰 이미지 1장 + 우측 작은 이미지 2장
   */
  return (
    <div
      className={`grid overflow-hidden bg-[#e5e1da] ${
        isBannerProject
          ? "aspect-[16/10] grid-cols-[1.15fr_0.85fr]"
          : isWideCard
            ? "aspect-[4/3] grid-cols-[1.3fr_0.7fr] md:aspect-[16/9]"
            : "aspect-[4/3] grid-cols-[1.15fr_0.85fr]"
      }`}
    >
      <div className="relative overflow-hidden border-r border-white/25">
        <Image
          src={previewImages[0]}
          alt={`${project.title} 프로젝트 대표 미리보기`}
          fill
          priority={priority}
          sizes={imageSizes}
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="grid grid-rows-2">
        {previewImages.slice(1, 3).map((image, index) => {
          const isLastPreview = index === 1;

          return (
            <div
              key={`${project.slug}-preview-${image}-${index}`}
              className="relative overflow-hidden border-b border-white/25 last:border-b-0"
            >
              <Image
                src={image}
                alt={`${project.title} 프로젝트 추가 미리보기 ${
                  index + 2
                }`}
                fill
                sizes={imageSizes}
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
              />

              {isLastPreview && remainingCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
                  <span className="text-2xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PortfolioCategoryClient({
  currentCategory,
  nextCategory,
  projects,
}: PortfolioCategoryClientProps) {
  const isBannerCategory = currentCategory.slug === "banner";
  const hasProjects = projects.length > 0;

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-12 md:pb-36 md:pt-14">
        {/* 상단 이동 링크 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            PORTFOLIO
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            HOME
          </Link>
        </div>

        {/* 카테고리 소개 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 grid gap-12 border-b border-[var(--line)] pb-16 md:mt-24 md:pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              PORTFOLIO / {currentCategory.number}
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
              {currentCategory.heroTitle}
            </h1>

            <p className="mt-5 text-sm font-semibold tracking-[0.2em] text-[var(--muted)]">
              {currentCategory.subtitle}
            </p>
          </div>

          <div className="max-w-xl lg:pb-2">
            <p className="text-lg leading-9 text-[var(--text)] md:text-xl">
              {currentCategory.description}
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">
                SERVICES
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {currentCategory.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm text-[var(--text)]"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <p className="mt-8 text-base leading-8 text-[var(--text)]">
                {currentCategory.overview}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 프로젝트 목록 */}
        {hasProjects ? (
          <div className="mt-16 grid items-start gap-7 md:mt-24 md:grid-cols-2 md:gap-9">
            {projects.map((project, index) => {
              /*
               * 0, 4, 8번째 프로젝트는 넓은 카드
               * 프로젝트가 1개뿐인 카테고리도 전체 너비 사용
               */
              const isOnlyProject = projects.length === 1;
              const isWideCard =
                isOnlyProject || index % 4 === 0;

              /*
               * 일반 프로젝트는 카드마다 미세하게 높이를 엇갈리게 배치
               * 넓은 카드는 오프셋을 적용하지 않음
               */
              const cardOffset =
                !isWideCard && index % 4 === 2
                  ? "md:mt-16"
                  : !isWideCard && index % 4 === 3
                    ? "md:mt-8"
                    : "";

              const imageCount = project.images.length || 1;

              return (
                <motion.div
                  key={project.slug}
                  initial={{
                    opacity: 0,
                    y: 44,
                    scale: 0.985,
                    filter: "blur(10px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.08,
                    margin: "0px 0px -50px 0px",
                  }}
                  transition={{
                    ...cardTransition,
                    delay: Math.min(index * 0.06, 0.3),
                  }}
                  className={`${
                    isWideCard ? "md:col-span-2" : ""
                  } ${cardOffset}`}
                >
                  <Link
                    href={`/portfolio/project/${project.slug}`}
                    className="group block"
                    aria-label={`${project.title} 프로젝트 상세보기`}
                  >
                    <motion.article
                      whileHover={{
                        y: -8,
                      }}
                      whileTap={{
                        scale: 0.988,
                      }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full overflow-hidden rounded-[28px] border border-black/5 bg-white/70 shadow-[0_18px_60px_rgba(57,48,40,0.05)] backdrop-blur-xl transition-shadow duration-500 group-hover:shadow-[0_36px_100px_rgba(57,48,40,0.14)] md:rounded-[38px]"
                    >
                      {/* 다중 이미지 미리보기 */}
                      <div className="relative">
                        <ProjectPreview
                          project={project}
                          isWideCard={isWideCard}
                          priority={index < 2}
                        />

                        {/* 어두운 하단 오버레이 */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-45 transition-opacity duration-500 group-hover:opacity-65" />

                        {/* 프로젝트 순번 */}
                        <div className="absolute left-5 top-5 md:left-7 md:top-7">
                          <span className="inline-flex rounded-full border border-white/35 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* 이미지 수 */}
                        <div className="absolute right-5 top-5 md:right-7 md:top-7">
                          <span className="inline-flex rounded-full border border-white/35 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md">
                            {getImageLabel(imageCount)}
                          </span>
                        </div>

                        {/* 이미지 위 프로젝트명 */}
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white md:p-9">
                          <div>
                            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/70 md:text-xs">
                              {project.subtitle}
                            </p>

                            <h2
                              className={`mt-2 font-semibold tracking-[-0.045em] text-white ${
                                isWideCard
                                  ? "text-3xl md:text-5xl"
                                  : "text-3xl md:text-4xl"
                              }`}
                            >
                              {project.title}
                            </h2>
                          </div>

                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-base text-white backdrop-blur-md transition-all duration-500 group-hover:translate-x-1.5 group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)] md:h-14 md:w-14 md:text-lg">
                            →
                          </span>
                        </div>
                      </div>

                      {/* 프로젝트 정보 */}
                      <div className="p-6 md:p-9">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold tracking-[0.16em] text-[var(--muted)]">
                          <span>{project.industry}</span>

                          <span className="h-1 w-1 rounded-full bg-[var(--muted)]/40" />

                          <span>{project.location}</span>

                          <span className="h-1 w-1 rounded-full bg-[var(--muted)]/40" />

                          <span>{project.year}</span>
                        </div>

                        <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                          {project.summary}
                        </p>

                        <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
                          <div className="flex flex-wrap gap-2">
                            {project.services
                              .slice(0, 4)
                              .map((service) => (
                                <span
                                  key={service}
                                  className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] text-[var(--muted)]"
                                >
                                  {service}
                                </span>
                              ))}
                          </div>

                          <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)]">
                            VIEW FULL PROJECT
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : currentCategory.images.length > 0 ? (
          /*
           * 기존 레거시 이미지
           * projects.ts로 옮기지 않은 카테고리가 있을 경우에만 표시
           */
          <div
            className={`mt-16 grid gap-6 md:mt-24 ${
              isBannerCategory
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "md:grid-cols-2"
            }`}
          >
            {currentCategory.images.map((image, index) => {
              const isWideCard =
                !isBannerCategory && index % 5 === 0;

              return (
                <motion.article
                  key={image}
                  initial={{
                    opacity: 0,
                    y: 42,
                    scale: 0.985,
                    filter: "blur(10px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                    margin: "0px 0px -40px 0px",
                  }}
                  transition={{
                    ...cardTransition,
                    delay: Math.min(index * 0.055, 0.28),
                  }}
                  className={`overflow-hidden rounded-[28px] border border-black/5 bg-white/65 shadow-[0_18px_60px_rgba(57,48,40,0.045)] md:rounded-[36px] ${
                    isWideCard ? "md:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-[#e5e1da] ${
                      isBannerCategory
                        ? "aspect-[2.96/4]"
                        : isWideCard
                          ? "aspect-[4/3] md:aspect-[16/9]"
                          : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${currentCategory.title} 작업물 ${
                        index + 1
                      }`}
                      fill
                      priority={index < 2}
                      sizes={
                        isBannerCategory
                          ? "(max-width: 640px) 100vw, 25vw"
                          : "(max-width: 768px) 100vw, 700px"
                      }
                      className="object-cover"
                    />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/35 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                      LEGACY PORTFOLIO IMAGE
                    </p>

                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.035em] text-[var(--text-dark)] md:text-2xl">
                      {currentCategory.title} Project
                    </h2>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* 빈 카테고리 */
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-20 rounded-[32px] border border-[var(--line)] bg-white/55 px-8 py-20 text-center md:mt-28"
          >
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              PORTFOLIO UPDATE
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-[var(--text-dark)] md:text-5xl">
              작업 이미지를 준비하고 있습니다.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--text)]">
              새로운 프로젝트와 함께 카테고리별 작업물을 순차적으로
              업데이트할 예정입니다.
            </p>
          </motion.div>
        )}

        {/* 다음 카테고리 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 36,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-24 border-t border-[var(--line)] pt-12 md:mt-36 md:pt-16"
        >
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
            NEXT CATEGORY
          </p>

          <Link href={nextCategory.href} className="group mt-6 block">
            <motion.div
              whileHover={{
                y: -6,
              }}
              whileTap={{
                scale: 0.99,
              }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between gap-8 overflow-hidden rounded-[32px] bg-[var(--text-dark)] p-8 text-white shadow-[0_22px_70px_rgba(57,48,40,0.12)] transition-shadow duration-500 group-hover:shadow-[0_36px_100px_rgba(57,48,40,0.22)] md:flex-row md:items-end md:p-12"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-white/50">
                  {nextCategory.number} · {nextCategory.subtitle}
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
                  {nextCategory.title}
                </h2>
              </div>

              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green)] text-xl text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-x-1.5 md:h-16 md:w-16">
                →
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}