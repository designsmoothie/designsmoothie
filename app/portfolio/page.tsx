import type { Metadata } from "next";
import Link from "next/link";

import PageTransition from "@/components/PageTransition";
import {
  getCmsCategories,
  getCmsProjects,
} from "@/lib/portfolio-data";
import PortfolioArchiveRow from "@/components/PortfolioArchiveRow";

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
      ) => {
        const categoryProjects =
          projects
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

        return (
          <PortfolioArchiveRow
            key={category.id}
            category={category}
            leadProject={
              categoryProjects[0]
            }
            projectCount={
              categoryProjects.length
            }
            categoryIndex={
              categoryIndex
            }
          />
        );
      },
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