"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
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

type ProjectImagePreviewProps = {
  project: PortfolioProject;
  isWide: boolean;
  priority: boolean;
  projectIndex: number;
};

const revealTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as [
    number,
    number,
    number,
    number,
  ],
};

function getProjectImages(project: PortfolioProject) {
  if (project.images && project.images.length > 0) {
    return project.images;
  }

  return [project.thumbnail];
}

function ProjectImagePreview({
  project,
  isWide,
  priority,
  projectIndex,
}: ProjectImagePreviewProps) {
  const images = useMemo(
    () => getProjectImages(project).slice(0, 6),
    [project],
  );

  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const imageSizes = isWide
    ? "(max-width: 768px) 100vw, 1400px"
    : "(max-width: 768px) 100vw, 700px";

  const aspectClass =
    project.category === "banner"
      ? "aspect-[16/11]"
      : isWide
        ? "aspect-[4/3] md:aspect-[16/8.6]"
        : "aspect-[4/3]";

  useEffect(() => {
    if (!isHovering || images.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) =>
          (currentIndex + 1) % images.length,
      );
    }, 1350);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [images.length, isHovering]);

  return (
    <div
      className={`relative overflow-hidden rounded-[22px] bg-[#e4dfd7] md:rounded-[30px] ${aspectClass}`}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      {images.map((image, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={`${project.slug}-${image}-${index}`}
            className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive
                ? "scale-100 opacity-100"
                : "scale-[1.035] opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`${project.title} 프로젝트 이미지 ${
                index + 1
              }`}
              fill
              priority={priority && index === 0}
              sizes={imageSizes}
              className="object-cover"
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute left-5 top-5 z-10 md:left-7 md:top-7">
        <span className="inline-flex rounded-full border border-white/30 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
          {String(projectIndex + 1).padStart(2, "0")}
        </span>
      </div>

      {images.length > 1 && (
        <div className="absolute right-5 top-5 z-10 md:right-7 md:top-7">
          <span className="inline-flex rounded-full border border-white/30 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex gap-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:bottom-7 md:left-7 md:right-7">
          {images.map((_, index) => (
            <span
              key={`${project.slug}-indicator-${index}`}
              className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/35"
            >
              <span
                className={`absolute inset-y-0 left-0 bg-white transition-all duration-500 ${
                  activeIndex === index ? "w-full" : "w-0"
                }`}
              />
            </span>
          ))}
        </div>
      )}

      <div className="absolute bottom-5 right-5 z-10 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-[var(--green)] text-lg text-[var(--text-dark)] opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.14)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-7 md:right-7 md:h-14 md:w-14">
        ↗
      </div>
    </div>
  );
}

export default function PortfolioCategoryClient({
  currentCategory,
  nextCategory,
  projects,
}: PortfolioCategoryClientProps) {
  const isBannerCategory =
    currentCategory.slug === "banner";

  const hasProjects = projects.length > 0;
  const projectCount = projects.length;

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 md:px-12 md:pb-36 md:pt-12">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text-dark)] md:text-xs"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            ALL WORK
          </Link>

          <Link
            href="/"
            className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text-dark)] md:text-xs"
          >
            HOME
          </Link>
        </div>

        {/* 카테고리 Hero */}
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
          transition={revealTransition}
          className="mt-20 border-b border-[var(--line)] pb-16 md:mt-28 md:pb-24"
        >
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-xs">
                <span>PORTFOLIO</span>
                <span className="h-px w-8 bg-[var(--line)]" />
                <span>{currentCategory.number}</span>
              </div>

              <h1 className="mt-7 max-w-[1100px] text-[3.4rem] font-semibold leading-[0.92] tracking-[-0.075em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.8rem]">
                {currentCategory.heroTitle}
              </h1>

              <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-[var(--muted)] md:text-sm">
                {currentCategory.subtitle}
              </p>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-xl text-lg leading-9 text-[var(--text)] md:text-xl">
                {currentCategory.description}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                    PROJECTS
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-[var(--text-dark)]">
                    {String(projectCount).padStart(2, "0")}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                    CATEGORY
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-[var(--text-dark)]">
                    {currentCategory.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t border-[var(--line)] pt-10 md:mt-20 md:grid-cols-[0.75fr_1.25fr] md:pt-12">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                SERVICES
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {currentCategory.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[var(--line)] bg-white/35 px-4 py-2 text-xs text-[var(--text)] md:text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                {currentCategory.overviewTitle ||
                  "OVERVIEW"}
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--text)] md:text-lg md:leading-9">
                {currentCategory.overview}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 프로젝트 목록 */}
        {hasProjects ? (
          <div className="mt-20 grid items-start gap-x-9 gap-y-24 md:mt-28 md:grid-cols-2 md:gap-x-12 md:gap-y-36">
            {projects.map((project, index) => {
              const isOnlyProject = projects.length === 1;
              const isWide =
                isOnlyProject || index % 5 === 0;

              const staggerClass =
                !isWide && index % 5 === 2
                  ? "md:mt-20"
                  : !isWide && index % 5 === 3
                    ? "md:mt-8"
                    : "";

              return (
                <motion.article
                  key={project.slug}
                  initial={{
                    opacity: 0,
                    y: 50,
                    filter: "blur(10px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.08,
                    margin: "0px 0px -60px 0px",
                  }}
                  transition={{
                    ...revealTransition,
                    delay: Math.min(index * 0.055, 0.25),
                  }}
                  className={`${
                    isWide ? "md:col-span-2" : ""
                  } ${staggerClass}`}
                >
                  <Link
                    href={`/portfolio/project/${project.slug}`}
                    className="group block"
                    aria-label={`${project.title} 프로젝트 상세보기`}
                  >
                    {/* 작품 이미지 */}
                    <ProjectImagePreview
                      project={project}
                      isWide={isWide}
                      priority={index < 2}
                      projectIndex={index}
                    />

                    {/* 이미지와 완전히 분리된 프로젝트 정보 */}
                    <div className="mt-7 md:mt-9">
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                            {project.subtitle}
                          </p>

                          <h2
                            className={`mt-3 font-semibold tracking-[-0.055em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] ${
                              isWide
                                ? "text-4xl md:text-6xl"
                                : "text-3xl md:text-[2.65rem]"
                            }`}
                          >
                            {project.title}
                          </h2>
                        </div>

                        <span className="mt-1 shrink-0 text-xl text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--text-dark)] md:text-2xl">
                          →
                        </span>
                      </div>

                      <div className="mt-6 border-t border-[var(--line)] pt-6">
                        <div
                          className={`grid gap-6 ${
                            isWide
                              ? "md:grid-cols-[1.1fr_0.9fr]"
                              : ""
                          }`}
                        >
                          <p className="max-w-3xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                            {project.summary}
                          </p>

                          <div
                            className={
                              isWide ? "md:text-right" : ""
                            }
                          >
                            <div
                              className={`flex flex-wrap gap-x-3 gap-y-2 text-[10px] font-semibold tracking-[0.15em] text-[var(--muted)] ${
                                isWide
                                  ? "md:justify-end"
                                  : ""
                              }`}
                            >
                              <span>{project.industry}</span>
                              <span className="text-[var(--line)]">
                                •
                              </span>
                              <span>{project.location}</span>
                              <span className="text-[var(--line)]">
                                •
                              </span>
                              <span>{project.year}</span>
                            </div>

                            <div
                              className={`mt-5 flex flex-wrap gap-2 ${
                                isWide
                                  ? "md:justify-end"
                                  : ""
                              }`}
                            >
                              {project.services
                                .slice(0, 4)
                                .map((service) => (
                                  <span
                                    key={service}
                                    className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[10px] text-[var(--muted)] transition-colors duration-300 group-hover:border-[var(--green)]/50 md:text-[11px]"
                                  >
                                    {service}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-7 flex justify-end">
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)]">
                            VIEW FULL PROJECT
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        ) : currentCategory.images.length > 0 ? (
          /* 레거시 이미지 목록 */
          <div
            className={`mt-20 grid gap-x-8 gap-y-20 md:mt-28 ${
              isBannerCategory
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2"
            }`}
          >
            {currentCategory.images.map((image, index) => {
              const isWide =
                !isBannerCategory && index % 5 === 0;

              return (
                <motion.article
                  key={`${image}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 44,
                    filter: "blur(9px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    ...revealTransition,
                    delay: Math.min(index * 0.05, 0.25),
                  }}
                  className={`${
                    isWide ? "md:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-[22px] bg-[#e4dfd7] md:rounded-[30px] ${
                      isBannerCategory
                        ? "aspect-[2.96/4]"
                        : isWide
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
                          ? "(max-width: 640px) 100vw, 33vw"
                          : "(max-width: 768px) 100vw, 700px"
                      }
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]"
                    />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/35 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--line)] pt-5">
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                      SELECTED WORK
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em] text-[var(--text-dark)] md:text-3xl">
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
            transition={revealTransition}
            className="mt-24 border-y border-[var(--line)] px-6 py-24 text-center md:mt-32 md:py-32"
          >
            <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)] md:text-xs">
              PORTFOLIO UPDATE
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-5xl">
              작업 이미지를 준비하고 있습니다.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--text)]">
              새로운 프로젝트와 함께 카테고리별 작업물을
              순차적으로 업데이트할 예정입니다.
            </p>
          </motion.div>
        )}

        {/* 다음 카테고리 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={revealTransition}
          className="mt-28 border-t border-[var(--line)] pt-12 md:mt-44 md:pt-16"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-xs">
              NEXT CATEGORY
            </p>

            <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
              {nextCategory.number}
            </span>
          </div>

          <Link
            href={nextCategory.href}
            className="group mt-8 block"
          >
            <div className="border-b border-[var(--line)] pb-10 md:pb-14">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
                    {nextCategory.subtitle}
                  </p>

                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] sm:text-5xl md:text-7xl lg:text-8xl">
                    {nextCategory.title}
                  </h2>
                </div>

                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-xl text-[var(--text-dark)] transition-all duration-400 group-hover:translate-x-2 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] md:h-16 md:w-16 md:text-2xl">
                  →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}