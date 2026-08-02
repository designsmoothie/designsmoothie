import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageTransition from "@/components/PageTransition";
import {
  getCmsCategories,
  getCmsProjects,
} from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "디자인스무디의 브랜딩, 간판 및 파사드, 공간 디자인, 지주간판, 사인 시스템, 홈페이지 디자인 프로젝트를 확인하세요.",
  alternates: {
    canonical: "/portfolio",
  },
};

function formatCount(value: number) {
  return String(value).padStart(2, "0");
}

export default async function PortfolioPage() {
  const [projects, cmsCategories] =
    await Promise.all([
      getCmsProjects(),
      getCmsCategories(),
    ]);

  const categories = [...cmsCategories]
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder,
    )
    .map((category) => {
      const categoryProjects = projects
        .filter(
          (project) =>
            project.category ===
            category.slug,
        )
        .sort(
          (a, b) =>
            a.displayOrder -
            b.displayOrder,
        );

      const leadProject =
        categoryProjects[0];

      const previewImage =
        leadProject?.thumbnail ||
        leadProject?.images[0] ||
        "";

      return {
        ...category,
        projectCount:
          categoryProjects.length,
        previewImage,
        leadProjectTitle:
          leadProject?.title ?? "",
      };
    });

  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
        {/* 상단 소개 */}
        <section className="px-5 pb-16 pt-8 sm:px-8 md:px-12 md:pb-24 md:pt-12 lg:px-[4vw]">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--text-dark)] md:text-xs"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              HOME
            </Link>

            <p className="hidden text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] sm:block">
              DESIGN SMOOTHIE ARCHIVE
            </p>
          </div>

          <div className="mt-20 grid gap-12 border-b border-[var(--line)] pb-16 md:mt-28 md:pb-24 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-[var(--muted)] md:text-xs">
                PORTFOLIO
              </p>

              <h1 className="mt-7 text-[3.8rem] font-semibold leading-[0.88] tracking-[-0.08em] text-[var(--text-dark)] sm:text-7xl md:text-8xl lg:text-[10vw] lg:leading-[0.84]">
                Work
                <br />
                archive.
              </h1>
            </div>

            <div className="max-w-xl lg:pb-3">
              <p className="text-lg leading-9 text-[var(--text)] md:text-xl">
                분야별 작업을 빠르게 살펴보고,
                관심 있는 카테고리에서 프로젝트
                전체를 확인할 수 있습니다.
              </p>

              {/* 모바일 안내 */}
              <p className="mt-7 text-sm leading-7 text-[var(--muted)] lg:hidden">
                관심 있는 분야를 선택해
                카테고리별 프로젝트를 확인해보세요.
              </p>

              {/* 데스크톱 안내 */}
              <p className="mt-7 hidden text-sm leading-7 text-[var(--muted)] lg:block lg:text-base lg:leading-8">
                마우스를 올리면 해당 카테고리의
                대표 프로젝트를 미리 볼 수 있습니다.
              </p>

              <div className="mt-10 flex items-center justify-between border-t border-[var(--line)] pt-5">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
                  CATEGORIES
                </span>

                <span className="text-xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                  {formatCount(
                    categories.length,
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 카테고리 아카이브 */}
        <section className="px-0 pb-28 sm:px-8 md:px-12 md:pb-44 lg:px-[4vw]">
          <div className="lg:border-t lg:border-[var(--line)]">
            {categories.map(
              (
                category,
                categoryIndex,
              ) => (
                <article
                  key={category.id}
                  className="group relative lg:border-b lg:border-[var(--line)]"
                >
                  {/* 모바일·태블릿 이미지 메뉴 */}
                  <Link
                    href={category.href}
                    className="group/mobile relative block min-h-[132px] overflow-hidden border-b border-white/15 sm:min-h-[160px] sm:rounded-[2px] sm:border-b-0 sm:mb-3 lg:hidden"
                    aria-label={`${category.title} 카테고리 보기`}
                  >
                    {category.previewImage ? (
                      <Image
                        src={
                          category.previewImage
                        }
                        alt={`${category.title} 대표 프로젝트`}
                        fill
                        priority={
                          categoryIndex === 0
                        }
                        sizes="(max-width: 1023px) 100vw, 0px"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-active/mobile:scale-[1.025]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor:
                            category.color,
                        }}
                      />
                    )}

                    {/* 사진 위 오버레이 */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />

                    <div className="relative z-10 flex min-h-[132px] items-center justify-between gap-5 px-5 py-7 sm:min-h-[160px] sm:px-7">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <span className="text-[9px] font-semibold tracking-[0.2em] text-white/65">
                            {category.number ||
                              formatCount(
                                categoryIndex +
                                  1,
                              )}
                          </span>

                          <span className="h-px w-4 bg-white/35" />

                          <span className="text-[9px] font-semibold tracking-[0.16em] text-white/75">
                            {formatCount(
                              category.projectCount,
                            )}{" "}
                            PROJECTS
                          </span>
                        </div>

                        <h2 className="mt-3 text-[1.85rem] font-semibold leading-[0.95] tracking-[-0.055em] text-white sm:text-4xl">
                          {category.title}
                        </h2>

                        {category.subtitle && (
                          <p className="mt-2 truncate text-[9px] font-semibold tracking-[0.15em] text-white/70 sm:text-[10px]">
                            {category.subtitle}
                          </p>
                        )}
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/35 bg-black/10 text-lg text-white backdrop-blur-sm transition-transform duration-300 group-active/mobile:translate-x-1 sm:h-12 sm:w-12">
                        →
                      </span>
                    </div>
                  </Link>

                  {/* 데스크톱 기존 목록 */}
                  <Link
                    href={category.href}
                    className="relative hidden min-h-52 grid-cols-[90px_minmax(0,1fr)_280px_auto] items-center gap-8 py-12 lg:grid"
                    aria-label={`${category.title} 카테고리 보기`}
                  >
                    {/* 번호 */}
                    <div>
                      <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--green)]">
                        {category.number ||
                          formatCount(
                            categoryIndex + 1,
                          )}
                      </span>
                    </div>

                    {/* 카테고리 정보 */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">
                          {category.subtitle}
                        </p>

                        <span className="h-px w-5 bg-[var(--line)]" />

                        <p className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-[var(--muted)]">
                          {formatCount(
                            category.projectCount,
                          )}{" "}
                          PROJECTS
                        </p>
                      </div>

                      <h2 className="mt-3 text-[4.5vw] font-semibold leading-tight tracking-[-0.055em] text-[var(--text-dark)] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[var(--green)]">
                        {category.title}
                      </h2>

                      {category.description && (
                        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                          {category.description}
                        </p>
                      )}

                      {category.services.length >
                        0 && (
                        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                          {category.services
                            .slice(0, 4)
                            .map(
                              (service) => (
                                <span
                                  key={
                                    service
                                  }
                                  className="text-[9px] font-semibold tracking-[0.13em] text-[var(--muted)]"
                                >
                                  {
                                    service
                                  }
                                </span>
                              ),
                            )}
                        </div>
                      )}
                    </div>

                    {/* 데스크톱 호버 미리보기 */}
                    <div className="relative aspect-[4/3]">
                      {category.previewImage ? (
                        <div className="absolute inset-0 translate-x-7 scale-[0.96] overflow-hidden rounded-[2px] bg-[var(--cream)] opacity-0 shadow-[0_24px_70px_rgba(35,32,25,0)] transition-[opacity,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_24px_70px_rgba(35,32,25,0.14)]">
                          <Image
                            src={
                              category.previewImage
                            }
                            alt={`${category.title} 대표 프로젝트 미리보기`}
                            fill
                            priority={
                              categoryIndex ===
                              0
                            }
                            sizes="280px"
                            className="scale-[1.06] object-cover blur-[8px] transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:blur-0"
                          />

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/[0.04]" />

                          {category.leadProjectTitle && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 px-5 pb-5 pt-12 opacity-0 transition-[opacity,transform] delay-100 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                              <p className="text-[9px] font-semibold tracking-[0.16em] text-white/70">
                                FEATURED
                                PROJECT
                              </p>

                              <p className="mt-2 truncate text-xs font-semibold tracking-[-0.01em] text-white">
                                {
                                  category.leadProjectTitle
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          style={{
                            backgroundColor:
                              category.color,
                          }}
                          className="absolute inset-0 flex translate-x-7 items-center justify-center opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
                        >
                          <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--text-dark)]">
                            DESIGN SMOOTHIE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 데스크톱 화살표 */}
                    <div className="flex items-center justify-end">
                      <span className="text-2xl text-[var(--muted)] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[var(--text-dark)]">
                        →
                      </span>
                    </div>

                    {/* 하단 라인 */}
                    <div className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-0 bg-[var(--green)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
                  </Link>
                </article>
              ),
            )}
          </div>
        </section>

        {/* 하단 연결 */}
        <section className="border-t border-[var(--line)] px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-[4vw]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] md:text-xs">
                DESIGN SMOOTHIE
              </p>

              <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
                브랜딩부터 간판과 파사드,
                공간 디자인과 홈페이지까지
                브랜드에 필요한 디자인을
                하나의 흐름으로 연결합니다.
              </p>
            </div>

            <Link
              href="/contact"
              className="group border-b border-[var(--line)] pb-7"
            >
              <div className="flex items-end justify-between gap-6">
                <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] sm:text-5xl md:text-7xl lg:text-8xl">
                  Start a project.
                </h2>

                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-xl text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-x-2 md:h-16 md:w-16">
                  →
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}