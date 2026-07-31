"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import { portfolioCategories } from "@/data/portfolio";
import type {
  CmsPortfolioProject,
  PreviewRatio,
} from "@/lib/portfolio-data";

const premiumEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

/**
 * 이미지가 완전히 보이는 시간
 */
const HOLD_DURATION = 1200;

/**
 * 이전 이미지와 다음 이미지가
 * 서로 겹치며 전환되는 시간
 */
const TRANSITION_DURATION = 7600;

/**
 * 다음 슬라이드 전환 시작 간격
 *
 * 7.6초 전환 + 1.2초 정지
 */
const SLIDE_CYCLE =
  TRANSITION_DURATION + HOLD_DURATION;

/**
 * 카테고리별 메인 노출 이미지 수
 */
const MAX_SLIDES_PER_CATEGORY = 12;

type PortfolioProps = {
  cmsProjects: CmsPortfolioProject[];
};

type PortfolioCategory =
  (typeof portfolioCategories)[number];

type ProjectSlide = {
  key: string;
  image: string;

  projectId: string;
  projectSlug: string;
  projectTitle: string;

  summary: string;
  client: string;
  year: string;
  location: string;

  previewRatio: PreviewRatio;
};

type CategoryShowcaseProps = {
  category: PortfolioCategory;
  categoryIndex: number;
  slides: ProjectSlide[];
  reduceMotion: boolean;
};

function getPreviewAspectClass(
  previewRatio: PreviewRatio,
) {
 if (previewRatio === "banner") {
  return [
    "aspect-[4/3]",
    "sm:aspect-[1.35/1]",
    "lg:aspect-[1.05/1]",
  ].join(" ");
}

  if (previewRatio === "tall") {
    return [
      "aspect-[4/3]",
      "sm:aspect-[3/2]",
      "lg:aspect-[1.38/1]",
    ].join(" ");
  }

  if (previewRatio === "standard") {
    return [
      "aspect-[4/3]",
      "sm:aspect-[16/10]",
      "lg:aspect-[1.55/1]",
    ].join(" ");
  }

  return [
    "aspect-[4/3]",
    "sm:aspect-[16/10]",
    "lg:aspect-[1.72/1]",
  ].join(" ");
}

function createCategorySlides(
  projects: CmsPortfolioProject[],
  categorySlug: string,
): ProjectSlide[] {
  const categoryProjects = projects
    .filter(
      (project) =>
        project.category === categorySlug,
    )
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder,
    );

  const slides: ProjectSlide[] = [];

  for (const project of categoryProjects) {
    const projectImages = Array.from(
      new Set(
        [
          project.thumbnail,
          ...project.images,
        ].filter(Boolean),
      ),
    );

    for (const [
      imageIndex,
      image,
    ] of projectImages.entries()) {
      slides.push({
        key: `${project.id}-${imageIndex}`,
        image,

        projectId: project.id,
        projectSlug: project.slug,
        projectTitle: project.title,

        summary: project.summary,
        client: project.client,
        year: project.year,
        location: project.location,

        previewRatio:
          project.categoryPreviewRatio,
      });

      if (
        slides.length >=
        MAX_SLIDES_PER_CATEGORY
      ) {
        return slides;
      }
    }
  }

  return slides;
}

function CategoryShowcase({
  category,
  categoryIndex,
  slides,
  reduceMotion,
}: CategoryShowcaseProps) {
  const initialIndex =
    slides.length > 0
      ? categoryIndex % slides.length
      : 0;

  const [currentIndex, setCurrentIndex] =
    useState(initialIndex);

  const [
    previousIndex,
    setPreviousIndex,
  ] = useState<number | null>(null);

  const [hasStarted, setHasStarted] =
    useState(false);

  useEffect(() => {
    const nextInitialIndex =
      slides.length > 0
        ? categoryIndex % slides.length
        : 0;

    setCurrentIndex(nextInitialIndex);
    setPreviousIndex(null);
    setHasStarted(false);
  }, [categoryIndex, slides]);

  useEffect(() => {
    if (
      reduceMotion ||
      slides.length <= 1
    ) {
      return;
    }

    /*
     * 첫 이미지는 1.2초 정지한 뒤 전환을 시작합니다.
     *
     * 그다음부터는:
     * 7.6초 전환
     * + 1.2초 정지
     * = 8.8초마다 다음 전환 시작
     */
    const delay = hasStarted
      ? SLIDE_CYCLE
      : HOLD_DURATION;

    const timer = window.setTimeout(() => {
      setCurrentIndex((current) => {
        const next =
          (current + 1) % slides.length;

        setPreviousIndex(current);

        return next;
      });

      setHasStarted(true);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    currentIndex,
    hasStarted,
    reduceMotion,
    slides.length,
  ]);

  if (slides.length === 0) {
    return (
      <article className="border-t border-[var(--line)] py-14 md:py-20 lg:py-[6vw]">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-[4vw]">
          <div className="lg:col-span-4">
            <CategoryInformation
              category={category}
              projectTitle=""
              summary=""
              slideNumber={0}
              slideCount={0}
            />
          </div>

          <div className="lg:col-span-8">
            <Link
              href={category.href}
              className={`flex items-center justify-center overflow-hidden bg-[#dedbd3] ${getPreviewAspectClass(
                "wide",
              )} ${category.color}`}
            >
              <span className="section-label">
                DESIGN SMOOTHIE
              </span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const currentSlide =
    slides[currentIndex] ?? slides[0];

  const isReversed =
    categoryIndex % 2 === 1;

  const projectHref =
    `/portfolio/project/${currentSlide.projectSlug}`;

  const imageAspectClass =
    getPreviewAspectClass(
      currentSlide.previewRatio,
    );

  return (
    <motion.article
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
      className="border-t border-[var(--line)] py-14 md:py-20 lg:py-[6vw]"
    >
      <div className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-[4vw]">
        <div
          className={
            isReversed
              ? "lg:order-2 lg:col-span-4"
              : "lg:col-span-4"
          }
        >
          <CategoryInformation
            category={category}
            projectTitle={
              currentSlide.projectTitle
            }
            summary={currentSlide.summary}
            slideNumber={
              currentIndex + 1
            }
            slideCount={slides.length}
          />
        </div>

        <div
          className={
            isReversed
              ? "lg:order-1 lg:col-span-8"
              : "lg:col-span-8"
          }
        >
          <Link
            href={projectHref}
            className={`group relative block overflow-hidden bg-[#dedbd3] transition-[aspect-ratio] duration-700 ${imageAspectClass}`}
            aria-label={`${currentSlide.projectTitle} 프로젝트 상세 보기`}
          >
            {slides.map(
              (slide, slideIndex) => {
                const isActive =
                  slideIndex === currentIndex;

                const isPrevious =
                  slideIndex ===
                  previousIndex;

                let imageState =
                  [
                    "pointer-events-none",
                    "z-0",
                    "translate-y-[2%]",
                    "scale-[1.012]",
                    "opacity-0",
                    "blur-[2px]",
                  ].join(" ");

                if (isActive) {
                  imageState = [
                    "z-[2]",
                    "translate-y-0",
                    "scale-100",
                    "opacity-100",
                    "blur-0",
                  ].join(" ");
                } else if (isPrevious) {
                  imageState = [
                    "pointer-events-none",
                    "z-[1]",
                    "-translate-y-[2%]",
                    "scale-[1.006]",
                    "opacity-0",
                    "blur-[1.5px]",
                  ].join(" ");
                }

                return (
                  <Image
                    key={slide.key}
                    src={slide.image}
                    alt={`${slide.projectTitle} 프로젝트 이미지`}
                    fill
                    priority={
                      categoryIndex === 0 &&
                      slideIndex === 0
                    }
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className={`will-change-[opacity,transform,filter] transition-[opacity,transform,filter] duration-[7600ms] ease-[cubic-bezier(0.45,0,0.55,1)] ${
  currentSlide.previewRatio === "banner"
    ? "object-contain bg-[#f5f4f0]"
    : "object-cover"
} ${imageState}`}
                  />
                );
              },
            )}

            <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-black/[0.015] via-transparent to-black/[0.07]" />

            <div className="pointer-events-none absolute left-5 top-5 z-10 sm:left-7 sm:top-7">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] md:text-xs">
                {category.number}
              </span>
            </div>

            <div className="pointer-events-none absolute bottom-5 right-5 z-10 translate-y-2 text-2xl text-white opacity-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-7 sm:right-7 md:text-3xl">
              ↗
            </div>

            {slides.length > 1 && (
              <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-3 sm:bottom-7 sm:left-7">
                <span className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
                  {String(
                    currentIndex + 1,
                  ).padStart(2, "0")}
                </span>

                <div className="h-px w-12 overflow-hidden bg-white/40">
                  <motion.div
                    key={`${category.slug}-${currentIndex}`}
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration:
                        hasStarted
                          ? SLIDE_CYCLE / 1000
                          : HOLD_DURATION /
                            1000,
                      ease: "linear",
                    }}
                    className="h-full origin-left bg-white"
                  />
                </div>

                <span className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-white/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
                  {String(
                    slides.length,
                  ).padStart(2, "0")}
                </span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function CategoryInformation({
  category,
  projectTitle,
  summary,
  slideNumber,
  slideCount,
}: {
  category: PortfolioCategory;
  projectTitle: string;
  summary: string;
  slideNumber: number;
  slideCount: number;
}) {
  return (
    <div>
      <p className="section-label">
        {category.subtitle}
      </p>

      <h3 className="mt-4 text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--text-dark)] sm:text-6xl lg:text-[4.8vw]">
        {category.title}
      </h3>

      {projectTitle && (
        <motion.div
          key={`${projectTitle}-${slideNumber}`}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: premiumEase,
          }}
          className="mt-8 border-t border-[var(--line)] pt-6"
        >
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--muted)]">
            CURRENT PROJECT
          </p>

          <p className="mt-3 text-xl font-semibold tracking-[-0.025em] text-[var(--text-dark)] md:text-2xl">
            {projectTitle}
          </p>

          {summary && (
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)] md:text-base">
              {summary}
            </p>
          )}

          {slideCount > 1 && (
            <p className="mt-5 text-[10px] font-semibold tabular-nums tracking-[0.18em] text-[var(--muted)]">
              {String(slideNumber).padStart(
                2,
                "0",
              )}{" "}
              /{" "}
              {String(slideCount).padStart(
                2,
                "0",
              )}
            </p>
          )}
        </motion.div>
      )}

      <p className="body-large mt-8 max-w-md">
        {category.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
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

      <Link
        href={category.href}
        className="group mt-9 inline-flex items-center gap-3 border-b border-[var(--text-dark)] pb-2 text-xs font-semibold tracking-[0.1em] text-[var(--text-dark)] transition-colors duration-300 hover:border-[var(--green)] hover:text-[var(--green)]"
      >
        카테고리 전체 보기

        <span className="transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </Link>
    </div>
  );
}

export default function Portfolio({
  cmsProjects,
}: PortfolioProps) {
  const reduceMotion =
    useReducedMotion();

  const categorySlides = useMemo(
    () =>
      portfolioCategories.map(
        (category) => ({
          category,

          slides: createCategorySlides(
            cmsProjects,
            category.slug,
          ),
        }),
      ),
    [cmsProjects],
  );

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
              margin:
                "0px 0px -60px 0px",
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
              margin:
                "0px 0px -60px 0px",
            }}
            transition={{
              duration: 0.82,
              delay: reduceMotion
                ? 0
                : 0.08,
              ease: premiumEase,
            }}
            className="max-w-xl lg:justify-self-end lg:pb-2"
          >
            <p className="body-large">
              브랜딩부터 간판, 파사드와
              공간 디자인까지. 브랜드가
              실제 환경 속에서 보이고
              기억되는 과정을 담았습니다.
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

        <div className="mt-10 md:mt-16 lg:mt-[4vw]">
          {categorySlides.map(
            (
              {
                category,
                slides,
              },
              categoryIndex,
            ) => (
              <CategoryShowcase
                key={category.slug}
                category={category}
                categoryIndex={
                  categoryIndex
                }
                slides={slides}
                reduceMotion={Boolean(
                  reduceMotion,
                )}
              />
            ),
          )}
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
          className="mt-20 md:mt-28 lg:mt-[8vw]"
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
      </div>
    </section>
  );
}