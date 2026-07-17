"use client";

import Link from "next/link";
import { motion } from "motion/react";
import PortfolioMotionImage from "@/components/PortfolioMotionImage";
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

export default function PortfolioCategoryClient({
  currentCategory,
  nextCategory,
  projects,
}: PortfolioCategoryClientProps) {
  const isBanner = currentCategory.slug === "banner";
  const hasProjects = projects.length > 0;

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-12 md:pb-36 md:pt-14">
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

        {hasProjects ? (
          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2">
            {projects.map((project, index) => {
              const isWideCard = index % 5 === 0;

              const imageSizes = isWideCard
                ? "(max-width: 768px) 100vw, 1400px"
                : "(max-width: 768px) 100vw, 700px";

              return (
  <Link
    key={project.slug}
    href={`/portfolio/project/${project.slug}`}
    className={`block ${
      isWideCard ? "md:col-span-2" : ""
    }`}
  >
    <motion.article
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
                  whileHover={{
                    y: -8,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className={`group overflow-hidden rounded-[28px] border border-black/5 bg-white/65 shadow-[0_18px_60px_rgba(57,48,40,0.045)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_34px_90px_rgba(57,48,40,0.12)] md:rounded-[36px] ${
                    isWideCard ? "md:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-[#e5e1da] ${
                      isWideCard
                        ? "aspect-[4/3] md:aspect-[16/9]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <PortfolioMotionImage
                      src={project.thumbnail}
                      alt={`${project.title} ${project.subtitle}`}
                      priority={index < 2}
                      sizes={imageSizes}
                      isBanner={false}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/35 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {project.featured && (
                      <div className="absolute right-5 top-5">
                        <span className="rounded-full border border-white/35 bg-white/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                          FEATURED
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 text-white md:p-8">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-white/70">
                          {project.subtitle}
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                          {project.title}
                        </h2>
                      </div>

                      <span className="hidden text-xs font-semibold tracking-[0.16em] text-white/70 sm:block">
                        PROJECT
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold tracking-[0.16em] text-[var(--muted)]">
                      <span>{project.industry}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--muted)]/40" />
                      <span>{project.location}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--muted)]/40" />
                      <span>{project.year}</span>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text)] md:text-base">
                      {project.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.services.slice(0, 4).map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] text-[var(--muted)]"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                    </motion.article>
  </Link>
              );
            })}
          </div>
        ) : currentCategory.images.length > 0 ? (
          <div
            className={`mt-16 grid gap-6 md:mt-24 ${
              isBanner
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "md:grid-cols-2"
            }`}
          >
            {currentCategory.images.map((image, index) => {
              const isWideCard = !isBanner && index % 5 === 0;

              const imageSizes = isBanner
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                : isWideCard
                  ? "(max-width: 768px) 100vw, 1400px"
                  : "(max-width: 768px) 100vw, 700px";

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
                  whileHover={{
                    y: -8,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className={`group overflow-hidden rounded-[28px] border border-black/5 bg-white/65 shadow-[0_18px_60px_rgba(57,48,40,0.045)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_34px_90px_rgba(57,48,40,0.12)] md:rounded-[36px] 
                    `}
                >
                  <div
                    className={`relative overflow-hidden bg-[#e5e1da] ${
                      isBanner
                        ? "aspect-[2.96/4]"
                        : isWideCard
                          ? "aspect-[4/3] md:aspect-[16/9]"
                          : "aspect-[4/3]"
                    }`}
                  >
                    <PortfolioMotionImage
                      src={image}
                      alt={`${currentCategory.title} 프로젝트 ${index + 1}`}
                      priority={index < 2}
                      sizes={imageSizes}
                      isBanner={isBanner}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/35 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 md:p-7">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] text-white/65">
                          {currentCategory.subtitle}
                        </p>

                        <p className="mt-2 text-xl font-semibold tracking-[-0.035em] text-white md:text-2xl">
                          {currentCategory.title} Project
                        </p>
                      </div>

                      <span className="hidden text-xs font-semibold tracking-[0.16em] text-white/70 sm:block">
                        VIEW
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-5 p-6 md:p-8">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                        DESIGN SMOOTHIE
                      </p>

                      <h2 className="mt-3 text-xl font-semibold tracking-[-0.035em] text-[var(--text-dark)] md:text-2xl">
                        {currentCategory.title} Project
                      </h2>
                    </div>

                    <span className="text-sm font-semibold text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
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