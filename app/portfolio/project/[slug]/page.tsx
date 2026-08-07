import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as motion from "motion/react-client";

import ProjectPreview from "@/components/ProjectPreview";

import {
  getProjectBySlug,
  getProjectsByCategory,
} from "@/lib/portfolio-data";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const premiumEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

const revealTransition = {
  duration: 0.9,
  ease: premiumEase,
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const project =
    await getProjectBySlug(slug);

  if (!project) {
    return {
      title:
        "프로젝트를 찾을 수 없습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const metadataTitle =
    project.seoTitle ||
    `${project.title} | ${project.categoryTitle} 포트폴리오`;

  const metadataDescription =
    project.seoDescription ||
    project.summary ||
    `${project.title} 프로젝트를 소개합니다.`;

  return {
    title: metadataTitle,

    description:
      metadataDescription,

    alternates: {
      canonical:
        `/portfolio/project/${project.slug}`,
    },

    openGraph: {
      title:
        project.seoTitle ||
        `${project.title} | 디자인스무디`,

      description:
        metadataDescription,

      url:
        `/portfolio/project/${project.slug}`,

      type: "article",

      images: project.thumbnail
        ? [
            {
              url: project.thumbnail,
              alt: `${project.title} ${project.subtitle}`,
            },
          ]
        : [],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: Props) {
  const { slug } = await params;

  const project =
    await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isBannerProject =
    project.category === "banner";

  const isWebsiteProject =
    project.projectType ===
      "website" &&
    project.previewType === "live" &&
    Boolean(project.liveUrl);

  const projectImages = Array.from(
    new Set(
      [
        project.thumbnail,
        ...project.images,
      ].filter(Boolean),
    ),
  );

  const categoryProjects =
    await getProjectsByCategory(
      project.category,
    );

  const currentProjectIndex =
    categoryProjects.findIndex(
      (item) =>
        item.slug === project.slug,
    );

  const nextProject =
    categoryProjects.length > 1 &&
    currentProjectIndex >= 0
      ? categoryProjects[
          (currentProjectIndex + 1) %
            categoryProjects.length
        ]
      : null;

  const relatedProjects =
    categoryProjects
      .filter(
        (item) =>
          item.slug !== project.slug,
      )
      .slice(0, 2);

  const galleryImages =
    isBannerProject
      ? projectImages
      : projectImages.slice(1);

  const summaryText =
    project.summary ||
    (isWebsiteProject
      ? "브랜드의 온라인 경험을 새롭게 설계하고, 데스크톱과 모바일 환경에 대응하는 반응형 웹사이트와 콘텐츠 관리 구조를 구축한 프로젝트입니다."
      : "브랜드의 목적과 실제 사용 환경을 고려해 시각적 경험을 설계한 프로젝트입니다.");

  const overviewText =
    project.overview ||
    project.summary ||
    (isWebsiteProject
      ? "브랜드의 이미지와 정보 전달 구조를 웹 환경에 맞게 재정리하고, 사용자 흐름과 운영 편의성을 함께 고려해 디자인과 개발을 진행했습니다."
      : "프로젝트의 목적과 환경을 분석하고 브랜드가 효과적으로 전달될 수 있는 디자인 방향을 구축했습니다.");

  const challengeText =
    project.challenge ||
    (isWebsiteProject
      ? "브랜드가 가진 전문성과 고급스러운 이미지를 온라인 환경에서도 일관되게 전달하면서, 다양한 콘텐츠를 관리자가 직접 운영할 수 있는 구조가 필요했습니다."
      : "프로젝트가 가진 환경과 브랜드의 목적을 분석하고, 사용자가 자연스럽게 메시지를 인식할 수 있는 디자인 방향을 설정했습니다.");

  const solutionText =
    project.solution ||
    (isWebsiteProject
      ? "브랜드 톤에 맞는 UI와 정보 구조를 설계하고, 반응형 인터페이스와 CMS를 연결해 디자인과 운영 기능이 하나의 시스템으로 작동하도록 구현했습니다."
      : "브랜드의 핵심 인상을 시각적으로 정리하고, 실제 사용 환경과 매체 특성을 고려한 일관된 디자인 시스템으로 구체화했습니다.");

  const resultText =
    project.result ||
    (isWebsiteProject
      ? "브랜드의 시각적 완성도와 실제 운영 편의성을 함께 갖춘 웹사이트 기반을 구축하고, 이후 콘텐츠와 기능을 지속적으로 확장할 수 있는 구조를 완성했습니다."
      : "브랜드의 특징이 명확하게 전달되면서도 실제 현장과 다양한 매체에서 안정적으로 활용할 수 있는 결과물을 완성했습니다.");

  const storyItems = [
    {
      number: "01",
      label: "CHALLENGE",
      title:
        "무엇을 해결해야 했는가",
      text: challengeText,
    },
    {
      number: "02",
      label: "SOLUTION",
      title:
        "어떤 방식으로 풀었는가",
      text: solutionText,
    },
    {
      number: "03",
      label: "RESULT",
      title:
        "무엇이 달라졌는가",
      text: resultText,
    },
  ];

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type": "CreativeWork",

    name: project.title,

    description: summaryText,

    image: projectImages,

    url:
      isWebsiteProject
        ? project.liveUrl
        : undefined,

    creator: {
      "@type": "Organization",
      name: "Design Smoothie",
    },

    dateCreated:
      project.year,

    genre:
      project.categoryTitle,

    keywords:
      project.services.join(", "),
  };

  const projectNumber =
    currentProjectIndex >= 0
      ? currentProjectIndex + 1
      : 1;

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ),
        }}
      />

      {/* 상단 내비게이션 */}
      <motion.div
        initial={{
          opacity: 0,
          y: -16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: premiumEase,
        }}
        className="mx-auto max-w-[1440px] px-6 pt-8 md:px-12 md:pt-12"
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-6">
          <Link
            href={`/portfolio/${project.category}`}
            className="group inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text-dark)] md:text-xs"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            {project.categoryTitle.toUpperCase()}
          </Link>

          <Link
            href="/"
            className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text-dark)] md:text-xs"
          >
            DESIGN SMOOTHIE
          </Link>
        </div>
      </motion.div>

      {/* 프로젝트 히어로 */}
      <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-12 md:px-12 md:pb-14 md:pt-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 34,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={
            revealTransition
          }
        >
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
            <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-[10px]">
              {isWebsiteProject
                ? "WEB PROJECT"
                : "SELECTED WORK"}
            </p>

            <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-[10px]">
              {String(
                projectNumber,
              ).padStart(
                2,
                "0",
              )}{" "}
              /{" "}
              {String(
                Math.max(
                  categoryProjects.length,
                  1,
                ),
              ).padStart(
                2,
                "0",
              )}
            </p>
          </div>

          <div className="grid gap-10 pt-7 md:pt-9 lg:grid-cols-[1fr_280px] lg:items-end lg:gap-16">
            <div className="min-w-0">
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 42,
                  filter:
                    "blur(12px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter:
                    "blur(0px)",
                }}
                transition={{
                  ...revealTransition,
                  delay: 0.08,
                }}
                className="break-words text-[clamp(4rem,11vw,10rem)] font-semibold uppercase leading-[0.82] tracking-[-0.085em] text-[var(--text-dark)]"
              >
                {project.title}
              </motion.h1>

              {project.subtitle && (
                <p className="mt-8 max-w-2xl text-sm font-semibold tracking-[0.1em] text-[var(--muted)] md:text-base">
                  {
                    project.subtitle
                  }
                </p>
              )}
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.78,
                delay: 0.22,
                ease: premiumEase,
              }}
              className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[var(--line)] pt-6 lg:grid-cols-1 lg:border-t-0 lg:pb-2 lg:pt-0"
            >
              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  SERVICES
                </p>

                <div className="mt-3 flex flex-col gap-1">
                  {project.services.length >
                  0 ? (
                    project.services
                      .slice(0, 4)
                      .map(
                        (
                          service,
                        ) => (
                          <p
                            key={
                              service
                            }
                            className="text-sm font-medium leading-6 text-[var(--text-dark)]"
                          >
                            {
                              service
                            }
                          </p>
                        ),
                      )
                  ) : (
                    <p className="text-sm font-medium leading-6 text-[var(--text-dark)]">
                      {isWebsiteProject
                        ? "Web Design · Development"
                        : "-"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  {isWebsiteProject
                    ? "PROJECT"
                    : "LOCATION"}
                </p>

                <p className="mt-3 text-sm font-medium leading-6 text-[var(--text-dark)]">
                  {isWebsiteProject
                    ? "Responsive Website"
                    : project.location ||
                      "-"}
                </p>

                <p className="text-sm font-medium leading-6 text-[var(--text-dark)]">
                  {project.year ||
                    "-"}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 대표 미리보기 */}
      {!isBannerProject && (
        <motion.section
          initial={{
            opacity: 0,
            y: 48,
            scale: 0.99,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            ...revealTransition,
            delay: 0.16,
          }}
          className="mx-auto max-w-[1440px] md:px-12"
        >
          <div className="group relative aspect-[4/3] overflow-hidden bg-[#e5e1da] md:aspect-[16/8.5]">
            <ProjectPreview
              projectType={
                project.projectType
              }
              previewType={
                project.previewType
              }
              liveUrl={
                project.liveUrl
              }
              image={
                project.thumbnail ||
                project.previewFallbackUrl
              }
              title={
                project.title
              }
              priority
              sizes="(max-width: 768px) 100vw, 1440px"
              className="absolute inset-0"
              imageClassName="premium-image object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]"
            />

            {isWebsiteProject &&
              project.liveUrl && (
                <>
                  <div className="pointer-events-none absolute left-5 top-5 z-30 md:left-8 md:top-8">
                    <span className="inline-flex rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[9px] font-semibold tracking-[0.2em] text-white backdrop-blur-md md:text-[10px]">
                      LIVE PREVIEW
                    </span>
                  </div>

                  <a
                    href={
                      project.liveUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-5 right-5 z-30 inline-flex items-center gap-3 rounded-full bg-[var(--green)] px-5 py-3 text-[10px] font-semibold tracking-[0.14em] text-[var(--text-dark)] shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition-all duration-300 hover:translate-x-1 hover:brightness-105 md:bottom-8 md:right-8 md:px-6 md:py-4 md:text-xs"
                  >
                    LIVE WEBSITE
                    <span>
                      ↗
                    </span>
                  </a>
                </>
              )}
          </div>
        </motion.section>
      )}

      {/* 프로젝트 개요 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 48,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.16,
          }}
          transition={
            revealTransition
          }
          className="grid gap-16 border-b border-[var(--line)] py-24 md:py-36 lg:grid-cols-[0.42fr_1.58fr] lg:gap-24"
        >
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-label">
              01 · PROJECT
              OVERVIEW
            </p>

            <div className="mt-10 space-y-7 border-t border-[var(--line)] pt-7">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  PROJECT
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {
                    project.title
                  }
                </p>
              </div>

              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  CATEGORY
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {
                    project.categoryTitle
                  }
                </p>
              </div>

              {project.services.length >
                0 && (
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                    SERVICES
                  </p>

                  <div className="mt-3 flex flex-col gap-1.5">
                    {project.services.map(
                      (
                        service,
                      ) => (
                        <span
                          key={
                            service
                          }
                          className="text-sm leading-6 text-[var(--text)]"
                        >
                          {
                            service
                          }
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              {isWebsiteProject &&
                project.liveUrl && (
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                      WEBSITE
                    </p>

                    <a
                      href={
                        project.liveUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 border-b border-[var(--text-dark)] pb-1 text-xs font-semibold tracking-[0.1em] text-[var(--text-dark)] transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
                    >
                      VISIT SITE
                      ↗
                    </a>
                  </div>
                )}
            </div>
          </aside>

          <div>
            <h2 className="max-w-5xl text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-[var(--text-dark)]">
              {project.overviewTitle ||
                (isWebsiteProject
                  ? "Digital experience, built around the brand."
                  : project.title)}
            </h2>

            <p className="mt-12 max-w-4xl whitespace-pre-line text-lg leading-9 text-[var(--text)] md:mt-16 md:text-[1.7rem] md:leading-[1.65]">
              {overviewText}
            </p>

            <div className="mt-16 grid gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
              <p className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)]">
                {isWebsiteProject
                  ? "DIGITAL CONTEXT"
                  : "BRAND CONTEXT"}
              </p>

              <p className="text-base leading-8 text-[var(--muted)]">
                {isWebsiteProject
                  ? "브랜드 방향과 사용자 경험을 함께 고려해 데스크톱과 모바일 환경에서 일관된 흐름으로 작동하도록 설계했습니다."
                  : "브랜드의 목적과 실제 사용 환경을 함께 고려해, 시각적 인상과 기능이 분리되지 않는 하나의 경험으로 설계했습니다."}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 프로젝트 스토리 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="border-b border-[var(--line)] py-24 md:py-36">
          <motion.div
            initial={{
              opacity: 0,
              y: 42,
              filter:
                "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={
              revealTransition
            }
            className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
          >
            <div>
              <p className="section-label">
                02 · PROJECT STORY
              </p>

              <h2 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] md:text-6xl">
                {isWebsiteProject ? (
                  <>
                    브랜드의 방향을,
                    <br />
                    디지털 경험으로.
                  </>
                ) : (
                  <>
                    문제를 발견하고,
                    <br />
                    디자인으로
                    답했습니다.
                  </>
                )}
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-[var(--muted)] lg:justify-self-end">
              {isWebsiteProject
                ? "브랜드의 온라인 경험을 기준으로 정보 구조와 인터페이스를 정리하고, 반응형 환경에서도 자연스럽게 이어지는 웹 경험으로 구현했습니다."
                : "브랜드가 놓인 환경을 관찰하고 핵심 문제를 정리한 뒤, 실제 사용 환경에서 작동하는 디자인 언어로 연결했습니다."}
            </p>
          </motion.div>

          <div className="mt-16 border-t border-[var(--line)] md:mt-24">
            {storyItems.map(
              (
                item,
                index,
              ) => (
                <motion.article
                  key={
                    item.label
                  }
                  initial={{
                    opacity: 0,
                    y: 36,
                    filter:
                      "blur(8px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    filter:
                      "blur(0px)",
                  }}
                  viewport={{
                    once: true,
                    amount: 0.14,
                  }}
                  transition={{
                    ...revealTransition,
                    delay:
                      index *
                      0.06,
                  }}
                  className="grid gap-8 border-b border-[var(--line)] py-12 md:grid-cols-[0.24fr_0.62fr_1.14fr] md:gap-12 md:py-16"
                >
                  <div className="flex items-start justify-between md:block">
                    <p className="text-xs font-semibold tracking-[0.22em] text-[var(--green)]">
                      {
                        item.number
                      }
                    </p>

                    <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:mt-4">
                      {
                        item.label
                      }
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold leading-[1.15] tracking-[-0.045em] text-[var(--text-dark)] md:text-3xl">
                    {
                      item.title
                    }
                  </h3>

                  <p className="max-w-2xl whitespace-pre-line text-base leading-8 text-[var(--text)] md:text-lg md:leading-9">
                    {item.text}
                  </p>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 웹 프로젝트 라이브 링크 */}
      {isWebsiteProject &&
        project.liveUrl && (
          <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-36">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              initial={{
                opacity: 0,
                y: 36,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={
                revealTransition
              }
              className="group block border-y border-[var(--line)] py-10 md:py-14"
            >
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="section-label">
                    LIVE WEBSITE
                  </p>

                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] md:mt-7 md:text-7xl">
                    Visit the live
                    project.
                  </h2>
                </div>

                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)] text-2xl text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-x-2 md:h-20 md:w-20">
                  ↗
                </span>
              </div>
            </motion.a>
          </section>
        )}

      {/* 갤러리 */}
      {galleryImages.length >
        0 && (
        <section className="mx-auto max-w-[1440px] pt-12 md:px-12 md:pt-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 42,
              filter:
                "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={
              revealTransition
            }
            className="grid gap-12 border-b border-[var(--line)] px-6 pb-12 md:grid-cols-[1.45fr_0.55fr] md:items-end md:px-0 md:pb-16"
          >
            <div>
              <p className="section-label">
                03 · PROJECT GALLERY
              </p>

              <h2 className="mt-7 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] md:text-6xl">
                {isBannerProject
                  ? "각기 다른 메시지를 하나의 흐름으로."
                  : isWebsiteProject
                    ? "화면 하나하나가 이어지는 하나의 브랜드 경험."
                    : "디테일이 모여 완성된 브랜드 경험."}
              </h2>
            </div>

            <div className="md:text-right">
              <p className="text-5xl font-semibold tracking-[-0.07em] text-[var(--text-dark)] md:text-7xl">
                {String(
                  galleryImages.length,
                ).padStart(
                  2,
                  "0",
                )}
              </p>

              <p className="mt-3 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                ARCHIVE IMAGES
              </p>
            </div>
          </motion.div>

          <div
            className={
              isBannerProject
                ? "columns-1 gap-5 pb-24 pt-14 sm:columns-2 md:gap-7 md:pb-36 md:pt-20 lg:columns-3"
                : "grid gap-y-5 pb-24 pt-14 md:grid-cols-2 md:gap-8 md:pb-36 md:pt-20"
            }
          >
            {galleryImages.map(
              (
                image,
                index,
              ) => {
                const isFullWidth =
                  !isBannerProject &&
                  index % 5 ===
                    0;

                const isPortrait =
                  !isBannerProject &&
                  (index % 5 ===
                    2 ||
                    index % 5 ===
                      3);

                return (
                  <motion.figure
                    key={`${project.slug}-${image}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 48,
                      scale: 0.98,
                      filter:
                        "blur(11px)",
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter:
                        "blur(0px)",
                    }}
                    viewport={{
                      once: true,
                      amount: 0.08,
                    }}
                    transition={{
                      ...revealTransition,
                      delay:
                        Math.min(
                          index *
                            0.05,
                          0.25,
                        ),
                    }}
                    className={`group overflow-hidden bg-[#e5e1da] ${
                      isBannerProject
                        ? "mb-5 break-inside-avoid md:mb-7"
                        : isFullWidth
                          ? "md:col-span-2"
                          : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        isBannerProject
                          ? "aspect-[2/3]"
                          : isFullWidth
                            ? "aspect-[4/3] md:aspect-[16/9]"
                            : isPortrait
                              ? "aspect-[4/5]"
                              : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={
                          image
                        }
                        alt={`${project.title} 프로젝트 이미지 ${
                          index +
                          1
                        }`}
                        fill
                        sizes={
                          isFullWidth
                            ? "(max-width: 768px) 100vw, 1440px"
                            : "(max-width: 768px) 100vw, 720px"
                        }
                        className="premium-image object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </motion.figure>
                );
              },
            )}
          </div>
        </section>
      )}

      {/* 결과 */}
      <section className="mt-10 bg-[var(--text-dark)] text-white md:mt-16">
        <motion.div
          initial={{
            opacity: 0,
            y: 52,
            filter:
              "blur(11px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter:
              "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={
            revealTransition
          }
          className="mx-auto grid max-w-[1440px] gap-16 px-6 py-24 md:px-12 md:py-36 lg:grid-cols-[0.42fr_1.58fr]"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-white/45">
              04 · PROJECT RESULT
            </p>
          </div>

          <div>
            <p className="display-en-sm text-[var(--green)]">
              Built to work.
            </p>

            <h2 className="mt-7 max-w-6xl text-4xl font-semibold leading-[1.02] tracking-[-0.065em] text-white md:text-7xl">
              {isWebsiteProject ? (
                <>
                  디자인과 기능이,
                  <br className="hidden md:block" />
                  하나의 경험으로.
                </>
              ) : (
                <>
                  보기 좋은 디자인을
                  넘어,
                  <br className="hidden md:block" />
                  실제 환경에서
                  작동하도록.
                </>
              )}
            </h2>

            <p className="mt-10 max-w-4xl whitespace-pre-line text-base leading-8 text-white/65 md:text-xl md:leading-10">
              {resultText}
            </p>
          </div>
        </motion.div>
      </section>

      {/* 관련 프로젝트 */}
      {relatedProjects.length >
        0 && (
        <section className="mx-auto max-w-[1440px] pt-24 md:px-12 md:pt-36">
          <div className="flex items-end justify-between gap-6 px-6 md:px-0">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                RELATED PROJECTS
              </p>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.055em] text-[var(--text-dark)] md:text-5xl">
                같은 분야의 다른
                작업
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {relatedProjects.map(
              (
                relatedProject,
              ) => (
                <Link
                  key={
                    relatedProject.slug
                  }
                  href={`/portfolio/project/${relatedProject.slug}`}
                  className="group block"
                >
                  <article className="border-t border-[var(--line)] pt-6">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e1da]">
                      <ProjectPreview
                        projectType={
                          relatedProject.projectType
                        }
                        previewType={
                          relatedProject.previewType
                        }
                        liveUrl={
                          relatedProject.liveUrl
                        }
                        image={
                          relatedProject.thumbnail
                        }
                        title={
                          relatedProject.title
                        }
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="absolute inset-0"
                      />
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-6 px-6 md:px-0">
                      <div>
                        <p className="text-[9px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                          {
                            relatedProject.subtitle
                          }
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-3xl">
                          {
                            relatedProject.title
                          }
                        </h3>
                      </div>

                      <span className="text-2xl">
                        →
                      </span>
                    </div>
                  </article>
                </Link>
              ),
            )}
          </div>
        </section>
      )}

      {/* 다음 프로젝트 */}
      {nextProject && (
        <section className="mx-auto max-w-[1440px] pb-24 pt-24 md:px-12 md:pb-36 md:pt-36">
          <div className="border-t border-[var(--line)] pt-12 md:pt-16">
            <div className="flex items-center justify-between px-6 md:px-0">
              <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                NEXT PROJECT
              </p>

              <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                KEEP EXPLORING
              </p>
            </div>

            <Link
              href={`/portfolio/project/${nextProject.slug}`}
              className="group mt-7 block"
            >
              <article className="relative min-h-[360px] overflow-hidden bg-[var(--text-dark)] md:min-h-[480px]">
                <div className="absolute inset-0 opacity-35">
                  <ProjectPreview
                    projectType={
                      nextProject.projectType
                    }
                    previewType={
                      nextProject.previewType
                    }
                    liveUrl={
                      nextProject.liveUrl
                    }
                    image={
                      nextProject.thumbnail
                    }
                    title={
                      nextProject.title
                    }
                    className="absolute inset-0"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-[var(--text-dark)] via-[var(--text-dark)]/88 to-[var(--text-dark)]/35" />

                <div className="relative flex min-h-[360px] flex-col justify-between gap-16 p-8 text-white md:min-h-[480px] md:p-14 lg:p-16">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-white/50">
                    {nextProject.categoryTitle.toUpperCase()}
                  </p>

                  <div className="flex items-end justify-between gap-8">
                    <h2 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.065em] text-white md:text-7xl lg:text-8xl">
                      {
                        nextProject.title
                      }
                    </h2>

                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-xl text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-2 md:h-20 md:w-20">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {!nextProject && (
        <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-12 md:pb-36">
          <div className="flex items-center justify-between border-t border-[var(--line)] pt-12">
            <Link
              href={`/portfolio/${project.category}`}
              className="group inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-[var(--muted)]"
            >
              ← VIEW CATEGORY
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]"
            >
              HOME
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}