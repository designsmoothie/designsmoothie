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
import type { CmsPortfolioProject } from "@/lib/portfolio-data";

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
 * 겹쳐서 전환되는 시간
 */
const TRANSITION_DURATION = 5600;

/**
 * 첫 전환 이후 다음 이미지가 시작되는 전체 주기
 */
const SLIDE_CYCLE =
  HOLD_DURATION + TRANSITION_DURATION;

/**
 * 메인 페이지 성능을 위해
 * 카테고리별 최대 노출 이미지 수를 제한합니다.
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
};

type CategoryShowcaseProps = {
  category: PortfolioCategory;
  categoryIndex: number;
  slides: ProjectSlide[];
  reduceMotion: boolean;
};

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
    setCurrentIndex(
      slides.length > 0
        ? categoryIndex % slides.length
        : 0,
    );

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
     * 처음 화면에서는 2.8초 머문 뒤 전환합니다.
     *
     * 이후에는:
     * 7.6초 전환
     * + 2.8초 머무름
     * = 10.4초마다 다음 이미지가 시작됩니다.
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
        <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,0.66fr)] lg:items-center">
          <CategoryInformation
            category={category}
            projectTitle=""
            summary=""
            slideNumber={0}
            slideCount={0}
          />

          <Link
            href={category.href}
            className={`flex aspect-[16/10] items-center justify-center overflow-hidden ${category.color}`}
          >
            <span className="section-label">
              DESIGN SMOOTHIE
            </span>
          </Link>
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
            className="group relative block aspect-[4/3] overflow-hidden bg-[#dedbd3] sm:aspect-[16/10] lg:aspect-[1.72/1]"
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
                  "pointer-events-none z-0 translate-y-[2.5%] scale-[1.012] opacity-0 blur-[2px]";

                if (isActive) {
                  imageState =
                    "z-[2] translate-y-0 scale-100 opacity-100 blur-0";
                } else if (isPrevious) {
                  imageState =
                    "pointer-events-none z-[1] -translate-y-[2.5%] scale-[1.006] opacity-0 blur-[1.5px]";
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
                    className={`object-cover will-change-[opacity,transform,filter] transition-[opacity,transform,filter] duration-[7600ms] ease-[cubic-bezier(0.45,0,0.55,1)] ${imageState}`}
                  />
                );
              },
            )}

            {/* 이미지가 겹쳐지는 동안 톤을 자연스럽게 연결 */}
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

                <div className="h-px w-12 bg-white/40">
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
              { category, slides },
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