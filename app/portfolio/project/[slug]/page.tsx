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

const revealTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as [
    number,
    number,
    number,
    number,
  ],
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
      <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-12 md:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/portfolio/${project.category}`}
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            {project.categoryTitle.toUpperCase()}
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            HOME
          </Link>
        </div>
      </div>

      {/* 프로젝트 히어로 */}
      <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-20 md:px-12 md:pb-24 md:pt-28">
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
          transition={revealTransition}
        >
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
            {project.categoryTitle.toUpperCase()} PROJECT
          </p>

          <div className="mt-7 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.07em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
                {project.title}
              </h1>

              <p className="mt-7 text-sm font-semibold tracking-[0.2em] text-[var(--muted)]">
                {project.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[var(--line)] pt-7 sm:grid-cols-4 lg:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  CLIENT
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.client}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  INDUSTRY
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.industry}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  LOCATION
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.location}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  YEAR
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.year}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 대표 이미지 */}
      {!isBannerProject && (
        <motion.section
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.985,
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
            delay: 0.12,
          }}
          className="mx-auto max-w-[1600px] px-4 md:px-8"
        >
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[#e5e1da] md:aspect-[16/9] md:rounded-[48px]">
            <Image
              src={project.thumbnail}
              alt={`${project.title} ${project.subtitle}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1600px"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />

            <div className="absolute bottom-6 left-6 rounded-full border border-white/30 bg-black/15 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md md:bottom-9 md:left-9">
              DESIGN SMOOTHIE · {project.year}
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
            amount: 0.18,
          }}
          transition={revealTransition}
          className="grid gap-14 border-b border-[var(--line)] py-24 md:py-36 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              01 · PROJECT OVERVIEW
            </p>

            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
              {project.overviewTitle}
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-9 text-[var(--text)] md:text-2xl md:leading-[1.75]">
              {project.overview}
            </p>

            <div className="mt-12">
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
                SERVICES
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[var(--line)] bg-white/60 px-4 py-2.5 text-sm text-[var(--text)] backdrop-blur-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== PART 1 END ===== */}

            {/* 프로젝트 스토리 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="border-b border-[var(--line)] py-24 md:py-36">
          <motion.div
            initial={{
              opacity: 0,
              y: 42,
              filter: "blur(9px)",
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
          >
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              02 · PROJECT STORY
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
              문제를 발견하고,
              <br />
              디자인으로 답을 만들었습니다.
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-3">
            {[
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
            ].map((item, index) => (
              <motion.article
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 42,
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
                  amount: 0.16,
                }}
                transition={{
                  ...revealTransition,
                  delay: index * 0.09,
                }}
                className="group flex min-h-[390px] flex-col justify-between rounded-[30px] border border-black/5 bg-white/65 p-7 shadow-[0_18px_60px_rgba(57,48,40,0.045)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(57,48,40,0.11)] md:rounded-[38px] md:p-9"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)]">
                      {item.label}
                    </p>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-xs font-semibold text-[var(--muted)] transition-colors duration-500 group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)]">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-10 text-2xl font-semibold leading-[1.18] tracking-[-0.045em] text-[var(--text-dark)] md:text-3xl">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-12 text-base leading-8 text-[var(--text)]">
                  {item.text}
                </p>
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
            filter: "blur(9px)",
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
          className="flex flex-col justify-between gap-10 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              03 · PROJECT GALLERY
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
              {isBannerProject
                ? "다양한 브랜드의 메시지를 하나의 캠페인 흐름으로."
                : "디자인의 디테일과 실제 적용 모습을 확인해보세요."}
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[var(--muted)] md:text-right">
            {String(projectImages.length).padStart(2, "0")} IMAGES
            <br />
            DESIGN SMOOTHIE ARCHIVE
          </p>
        </motion.div>
      </section>

      {/* 배너 Masonry 갤러리 */}
      {isBannerProject && galleryImages.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 pb-24 pt-14 md:px-8 md:pb-36 md:pt-20">
          <div className="columns-1 gap-5 sm:columns-2 md:gap-7 lg:columns-3">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={`${project.slug}-${image}-${index}`}
                initial={{
                  opacity: 0,
                  y: 46,
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
                  margin: "0px 0px -40px 0px",
                }}
                transition={{
                  ...revealTransition,
                  delay: Math.min((index % 6) * 0.055, 0.25),
                }}
                className="group mb-5 break-inside-avoid overflow-hidden rounded-[24px] border border-black/5 bg-[#e6e2db] shadow-[0_18px_60px_rgba(57,48,40,0.07)] transition-shadow duration-500 hover:shadow-[0_34px_95px_rgba(57,48,40,0.16)] md:mb-7 md:rounded-[30px]"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} 캠페인 디자인 ${index + 1}`}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute bottom-5 left-5 translate-y-3 rounded-full border border-white/30 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* 일반 프로젝트 갤러리 */}
      {!isBannerProject && galleryImages.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 pb-24 pt-14 md:px-8 md:pb-36 md:pt-20">
          <div className="grid gap-5 md:grid-cols-2 md:gap-8">
            {galleryImages.map((image, index) => {
              const isFullWidth = index % 5 === 0;
              const isPortrait = index % 5 === 2 || index % 5 === 3;

              return (
                <motion.figure
                  key={`${project.slug}-${image}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 48,
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
                    margin: "0px 0px -50px 0px",
                  }}
                  transition={{
                    ...revealTransition,
                    delay: Math.min((index % 5) * 0.06, 0.24),
                  }}
                  className={`group overflow-hidden rounded-[26px] bg-[#e5e1da] md:rounded-[40px] ${
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
                          ? "(max-width: 768px) 100vw, 1600px"
                          : "(max-width: 768px) 100vw, 800px"
                      }
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute bottom-5 left-5 translate-y-3 text-[10px] font-semibold tracking-[0.2em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-8 md:left-8">
                      IMAGE {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>
                </motion.figure>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== PART 2 END ===== */}

            {/* 프로젝트 결과 강조 */}
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
            amount: 0.2,
          }}
          transition={revealTransition}
          className="overflow-hidden rounded-[32px] bg-[var(--text-dark)] px-8 py-16 text-white shadow-[0_28px_90px_rgba(57,48,40,0.15)] md:rounded-[48px] md:px-14 md:py-24 lg:px-20"
        >
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-white/45">
                04 · PROJECT RESULT
              </p>

              <div className="mt-12 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)] text-2xl text-[var(--text-dark)] md:h-20 md:w-20">
                ✓
              </div>
            </div>

            <div>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] text-white md:text-6xl">
                디자인은 보기 좋은 결과를 넘어,
                <br className="hidden md:block" />
                실제 환경에서 작동해야 합니다.
              </h2>

              <p className="mt-8 max-w-3xl text-base leading-8 text-white/65 md:text-xl md:leading-10">
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
              amount: 0.2,
            }}
            transition={revealTransition}
            className="flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                RELATED PROJECTS
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-5xl">
                같은 분야의 다른 작업
              </h2>
            </div>

            <Link
              href={`/portfolio/${project.category}`}
              className="hidden text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--text-dark)] sm:block"
            >
              VIEW CATEGORY →
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {relatedProjects.map((relatedProject, index) => (
              <motion.div
                key={relatedProject.slug}
                initial={{
                  opacity: 0,
                  y: 42,
                  filter: "blur(9px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  ...revealTransition,
                  delay: index * 0.09,
                }}
              >
                <Link
                  href={`/portfolio/project/${relatedProject.slug}`}
                  className="group block"
                >
                  <article className="overflow-hidden rounded-[28px] border border-black/5 bg-white/60 shadow-[0_18px_60px_rgba(57,48,40,0.05)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_32px_90px_rgba(57,48,40,0.13)] md:rounded-[38px]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e1da]">
                      <Image
                        src={relatedProject.thumbnail}
                        alt={`${relatedProject.title} 프로젝트`}
                        fill
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white md:p-8">
                        <div>
                          <p className="text-[10px] font-semibold tracking-[0.18em] text-white/65">
                            {relatedProject.subtitle}
                          </p>

                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] md:text-3xl">
                            {relatedProject.title}
                          </h3>
                        </div>

                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:translate-x-1 group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)]">
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
            y: 42,
            filter: "blur(9px)",
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
          className="border-t border-[var(--line)] pt-12 md:pt-16"
        >
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
            NEXT PROJECT
          </p>

          <Link
            href={`/portfolio/project/${nextProject.slug}`}
            className="group mt-6 block"
          >
            <article className="relative overflow-hidden rounded-[32px] bg-[var(--text-dark)] shadow-[0_22px_70px_rgba(57,48,40,0.14)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_38px_110px_rgba(57,48,40,0.24)] md:rounded-[48px]">
              <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-35">
                <Image
                  src={nextProject.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-[var(--text-dark)] via-[var(--text-dark)]/90 to-[var(--text-dark)]/45" />

              <div className="relative flex min-h-[340px] flex-col justify-between gap-14 p-8 text-white md:min-h-[440px] md:p-14 lg:p-16">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-[0.2em] text-white/50">
                    {nextProject.categoryTitle.toUpperCase()} ·{" "}
                    {nextProject.subtitle}
                  </p>

                  <span className="text-xs font-semibold tracking-[0.18em] text-white/40">
                    CONTINUE
                  </span>
                </div>

                <div className="flex items-end justify-between gap-8">
                  <h2 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-white md:text-7xl">
                    {nextProject.title}
                  </h2>

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