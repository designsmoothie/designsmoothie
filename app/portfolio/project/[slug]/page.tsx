import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as motion from "motion/react-client";
import {
  getProjectBySlug,
  portfolioProjects,
} from "@/data/projects";

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

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
    };
  }

  return {
    title: `${project.title} | ${project.categoryTitle} 포트폴리오`,
    description: project.summary,
    alternates: {
      canonical: `/portfolio/project/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | 디자인 스무디`,
      description: project.summary,
      url: `/portfolio/project/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.thumbnail,
          alt: `${project.title} ${project.subtitle}`,
        },
      ],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isBannerProject = project.category === "banner";

  const projectImages =
    project.images && project.images.length > 0
      ? project.images
      : [project.thumbnail];

  const currentProjectIndex = portfolioProjects.findIndex(
    (item) => item.slug === project.slug,
  );

  const nextProject =
    portfolioProjects[
      (currentProjectIndex + 1) % portfolioProjects.length
    ];

  const relatedProjects = portfolioProjects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        item.category === project.category,
    )
    .slice(0, 2);

  const galleryImages = isBannerProject
    ? projectImages
    : projectImages.slice(1);

  const challengeText =
    project.challenge ||
    "프로젝트가 가진 환경과 브랜드의 목적을 분석하고, 사용자가 자연스럽게 메시지를 인식할 수 있는 디자인 방향을 설정했습니다.";

  const solutionText =
    project.solution ||
    "브랜드의 핵심 인상을 시각적으로 정리하고, 실제 사용 환경과 매체 특성을 고려한 일관된 디자인 시스템으로 구체화했습니다.";

  const resultText =
    project.result ||
    "브랜드의 특징이 명확하게 전달되면서도 실제 현장과 다양한 매체에서 안정적으로 활용할 수 있는 결과물을 완성했습니다.";

  const storyItems = [
    {
      number: "01",
      label: "CHALLENGE",
      title: "무엇을 해결해야 했는가",
      text: challengeText,
    },
    {
      number: "02",
      label: "SOLUTION",
      title: "어떤 방식으로 풀었는가",
      text: solutionText,
    },
    {
      number: "03",
      label: "RESULT",
      title: "무엇이 달라졌는가",
      text: resultText,
    },
  ];

  const projectInformation = [
    {
      label: "CLIENT",
      value: project.client,
    },
    {
      label: "INDUSTRY",
      value: project.industry,
    },
    {
      label: "LOCATION",
      value: project.location,
    },
    {
      label: "YEAR",
      value: project.year,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: projectImages,
    creator: {
      "@type": "Organization",
      name: "Design Smoothie",
    },
    dateCreated: project.year,
    genre: project.categoryTitle,
    keywords: project.services.join(", "),
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
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
      <section className="mx-auto max-w-[1440px] px-6 pb-14 pt-16 md:px-12 md:pb-24 md:pt-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 38,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={revealTransition}
        >
          <div className="flex flex-wrap items-center justify-between gap-5">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[var(--muted)] md:text-xs">
              {project.categoryTitle.toUpperCase()} PROJECT
            </p>

            <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-xs">
              {String(currentProjectIndex + 1).padStart(2, "0")} /{" "}
              {String(portfolioProjects.length).padStart(2, "0")}
            </p>
          </div>

          <div className="mt-8 grid gap-14 lg:grid-cols-[1.22fr_0.78fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-[var(--text-dark)]">
                {project.title}
              </h1>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <span className="h-px w-12 bg-[var(--green)]" />

                <p className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] md:text-sm">
                  {project.subtitle}
                </p>
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 28,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                ...revealTransition,
                delay: 0.12,
              }}
              className="rounded-[28px] border border-black/5 bg-white/55 p-6 shadow-[0_20px_70px_rgba(57,48,40,0.06)] backdrop-blur-xl md:p-8"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {projectInformation.map((item) => (
                  <div key={item.label}>
                    <p className="text-[9px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-[10px]">
                      {item.label}
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-dark)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 대표 이미지 */}
      {!isBannerProject && (
        <motion.section
          initial={{
            opacity: 0,
            y: 56,
            scale: 0.98,
            filter: "blur(14px)",
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
          className="mx-auto max-w-[1640px] px-3 md:px-6"
        >
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#e5e1da] shadow-[0_26px_90px_rgba(57,48,40,0.1)] md:aspect-[16/9] md:rounded-[52px]">
            <Image
              src={project.thumbnail}
              alt={`${project.title} ${project.subtitle}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1640px"
              className="premium-image object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/5" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white md:p-10">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] text-white/60 md:text-[10px]">
                  SELECTED WORK
                </p>

                <p className="mt-2 text-sm font-semibold md:text-base">
                  {project.title} · {project.year}
                </p>
              </div>

              <span className="hidden rounded-full border border-white/25 bg-black/10 px-4 py-2 text-[9px] font-semibold tracking-[0.2em] text-white backdrop-blur-md sm:block">
                DESIGN SMOOTHIE
              </span>
            </div>
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
          transition={revealTransition}
          className="grid gap-14 border-b border-[var(--line)] py-24 md:py-36 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              01 · PROJECT OVERVIEW
            </p>

            <h2 className="mt-7 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] md:text-6xl">
              {project.overviewTitle}
            </h2>
          </div>

          <div>
            <p className="max-w-4xl text-lg leading-9 text-[var(--text)] md:text-[1.65rem] md:leading-[1.7]">
              {project.overview}
            </p>

            <div className="mt-14 border-t border-[var(--line)] pt-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  PROVIDED SERVICES
                </p>

                <div className="flex max-w-2xl flex-wrap gap-2.5 md:justify-end">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-[var(--line)] bg-white/55 px-4 py-2.5 text-sm text-[var(--text)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--green)] hover:bg-white"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
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
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={revealTransition}
          >
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              02 · PROJECT STORY
            </p>

            <div className="mt-7 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] md:text-6xl">
                문제를 발견하고,
                <br />
                디자인으로 답했습니다.
              </h2>

              <p className="max-w-lg text-base leading-8 text-[var(--muted)] lg:justify-self-end">
                브랜드가 놓인 환경을 관찰하고, 핵심 문제를 정리한 뒤
                실제 사용 환경에서 작동하는 디자인으로 연결했습니다.
              </p>
            </div>
          </motion.div>

          <div className="mt-16 grid gap-5 md:mt-24 lg:grid-cols-3">
            {storyItems.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 46,
                  scale: 0.98,
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
                  amount: 0.14,
                }}
                transition={{
                  ...revealTransition,
                  delay: index * 0.08,
                }}
                className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[30px] border border-black/5 bg-white/60 p-7 shadow-[0_18px_60px_rgba(57,48,40,0.045)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_34px_100px_rgba(57,48,40,0.12)] md:rounded-[40px] md:p-9"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-[var(--green)]/0 blur-3xl transition-colors duration-700 group-hover:bg-[var(--green)]/15" />

                <div className="relative z-10 flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                    {item.label}
                  </p>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-xs font-semibold text-[var(--muted)] transition-all duration-500 group-hover:rotate-12 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)]">
                    {item.number}
                  </span>
                </div>

                <div className="relative z-10 mt-auto pt-20">
                  <h3 className="text-2xl font-semibold leading-[1.15] tracking-[-0.045em] text-[var(--text-dark)] md:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-7 text-base leading-8 text-[var(--text)]">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 갤러리 제목 */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-12 md:pt-36">
        <motion.div
          initial={{
            opacity: 0,
            y: 42,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={revealTransition}
          className="flex flex-col justify-between gap-12 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              03 · PROJECT GALLERY
            </p>

            <h2 className="mt-7 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] md:text-6xl">
              {isBannerProject
                ? "각기 다른 메시지를 하나의 흐름으로."
                : "디테일이 모여 완성된 브랜드 경험."}
            </h2>
          </div>

          <div className="border-l border-[var(--line)] pl-6 md:text-right">
            <p className="text-3xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-4xl">
              {String(projectImages.length).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
              ARCHIVE IMAGES
            </p>
          </div>
        </motion.div>
      </section>

      {/* 배너 갤러리 */}
      {isBannerProject && galleryImages.length > 0 && (
        <section className="mx-auto max-w-[1640px] px-4 pb-24 pt-14 md:px-8 md:pb-36 md:pt-20">
          <div className="columns-1 gap-5 sm:columns-2 md:gap-7 lg:columns-3">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={`${project.slug}-${image}-${index}`}
                initial={{
                  opacity: 0,
                  y: 48,
                  scale: 0.98,
                  filter: "blur(11px)",
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
                  margin: "0px 0px -40px 0px",
                }}
                transition={{
                  ...revealTransition,
                  delay: Math.min((index % 6) * 0.05, 0.25),
                }}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-[24px] border border-black/5 bg-[#e5e1da] shadow-[0_18px_60px_rgba(57,48,40,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_105px_rgba(57,48,40,0.16)] md:mb-7 md:rounded-[32px]"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} 캠페인 디자인 ${index + 1}`}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="premium-image object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-5 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-[10px] font-semibold tracking-[0.2em]">
                      IMAGE {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-lg">↗</span>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* 일반 프로젝트 갤러리 */}
      {!isBannerProject && galleryImages.length > 0 && (
        <section className="mx-auto max-w-[1640px] px-4 pb-24 pt-14 md:px-8 md:pb-36 md:pt-20">
          <div className="grid gap-5 md:grid-cols-2 md:gap-8">
            {galleryImages.map((image, index) => {
              const isFullWidth = index % 5 === 0;
              const isPortrait =
                index % 5 === 2 || index % 5 === 3;

              return (
                <motion.figure
                  key={`${project.slug}-${image}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.98,
                    filter: "blur(11px)",
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
                    ...revealTransition,
                    delay: Math.min((index % 5) * 0.055, 0.24),
                  }}
                  className={`group overflow-hidden rounded-[26px] bg-[#e5e1da] shadow-[0_18px_65px_rgba(57,48,40,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_105px_rgba(57,48,40,0.16)] md:rounded-[42px] ${
                    isFullWidth ? "md:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden ${
                      isFullWidth
                        ? "aspect-[4/3] md:aspect-[16/9]"
                        : isPortrait
                          ? "aspect-[4/5]"
                          : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} 프로젝트 이미지 ${
                        index + 1
                      }`}
                      fill
                      sizes={
                        isFullWidth
                          ? "(max-width: 768px) 100vw, 1640px"
                          : "(max-width: 768px) 100vw, 820px"
                      }
                      className="premium-image object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-9">
                      <span className="text-[10px] font-semibold tracking-[0.22em]">
                        IMAGE {String(index + 2).padStart(2, "0")}
                      </span>

                      <span className="text-xl">↗</span>
                    </div>
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </section>
      )}

      {/* 프로젝트 결과 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 52,
            scale: 0.985,
            filter: "blur(11px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={revealTransition}
          className="relative overflow-hidden rounded-[34px] bg-[var(--text-dark)] px-8 py-16 text-white shadow-[0_32px_110px_rgba(57,48,40,0.18)] md:rounded-[54px] md:px-14 md:py-24 lg:px-20"
        >
          <div className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[var(--green)]/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-0 h-[340px] w-[340px] rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-white/45">
                04 · PROJECT RESULT
              </p>

              <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)] text-xl font-semibold text-[var(--text-dark)] md:h-20 md:w-20 md:text-2xl">
                ✓
              </div>
            </div>

            <div>
              <h2 className="max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.06em] text-white md:text-6xl">
                보기 좋은 디자인을 넘어,
                <br className="hidden md:block" />
                실제 환경에서 작동하도록.
              </h2>

              <p className="mt-9 max-w-3xl text-base leading-8 text-white/65 md:text-xl md:leading-10">
                {resultText}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 관련 프로젝트 */}
      {relatedProjects.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 pt-24 md:px-12 md:pt-36">
          <motion.div
            initial={{
              opacity: 0,
              y: 38,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.18,
            }}
            transition={revealTransition}
            className="flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                RELATED PROJECTS
              </p>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.055em] text-[var(--text-dark)] md:text-5xl">
                같은 분야의 다른 작업
              </h2>
            </div>

            <Link
              href={`/portfolio/${project.category}`}
              className="group hidden items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text-dark)] sm:inline-flex"
            >
              VIEW CATEGORY

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {relatedProjects.map((relatedProject, index) => (
              <motion.div
                key={relatedProject.slug}
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
                  amount: 0.14,
                }}
                transition={{
                  ...revealTransition,
                  delay: index * 0.08,
                }}
              >
                <Link
                  href={`/portfolio/project/${relatedProject.slug}`}
                  className="group block"
                >
                  <article className="overflow-hidden rounded-[28px] border border-black/5 bg-white/60 shadow-[0_18px_65px_rgba(57,48,40,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_36px_105px_rgba(57,48,40,0.15)] md:rounded-[40px]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e1da]">
                      <Image
                        src={relatedProject.thumbnail}
                        alt={`${relatedProject.title} 프로젝트`}
                        fill
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="premium-image object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white md:p-9">
                        <div>
                          <p className="text-[9px] font-semibold tracking-[0.2em] text-white/60">
                            {relatedProject.subtitle}
                          </p>

                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] md:text-3xl">
                            {relatedProject.title}
                          </h3>
                        </div>

                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:translate-x-1 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)]">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 다음 프로젝트 */}
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-12 md:pb-36 md:pt-36">
        <motion.div
          initial={{
            opacity: 0,
            y: 44,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.18,
          }}
          transition={revealTransition}
          className="border-t border-[var(--line)] pt-12 md:pt-16"
        >
          <div className="flex items-center justify-between">
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
            <article className="relative overflow-hidden rounded-[34px] bg-[var(--text-dark)] shadow-[0_26px_90px_rgba(57,48,40,0.16)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_44px_130px_rgba(57,48,40,0.27)] md:rounded-[54px]">
              <div className="absolute inset-0 opacity-25 transition-all duration-[1400ms] group-hover:scale-[1.04] group-hover:opacity-40">
                <Image
                  src={nextProject.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--text-dark)] via-[var(--text-dark)]/88 to-[var(--text-dark)]/30" />

              <div className="relative flex min-h-[360px] flex-col justify-between gap-16 p-8 text-white md:min-h-[480px] md:p-14 lg:p-16">
                <div className="flex items-center justify-between gap-6">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-white/50 md:text-xs">
                    {nextProject.categoryTitle.toUpperCase()} ·{" "}
                    {nextProject.subtitle}
                  </p>

                  <span className="hidden text-[10px] font-semibold tracking-[0.22em] text-white/40 sm:block">
                    DESIGN SMOOTHIE
                  </span>
                </div>

                <div className="flex items-end justify-between gap-8">
                  <div>
                    <p className="mb-5 text-[10px] font-semibold tracking-[0.22em] text-white/50">
                      CONTINUE TO
                    </p>

                    <h2 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.065em] text-white md:text-7xl lg:text-8xl">
                      {nextProject.title}
                    </h2>
                  </div>

                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-xl text-[var(--text-dark)] transition-transform duration-500 group-hover:translate-x-2 md:h-20 md:w-20 md:text-2xl">
                    →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}