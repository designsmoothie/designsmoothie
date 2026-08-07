import Link from "next/link";

import ProjectPreview from "@/components/ProjectPreview";

import type {
  CmsPortfolioCategory,
  CmsPortfolioProject,
} from "@/lib/portfolio-data";

type PortfolioArchiveRowProps = {
  category: CmsPortfolioCategory;
  leadProject?: CmsPortfolioProject;
  projectCount: number;
  categoryIndex: number;
};

function formatCount(value: number) {
  return String(value).padStart(2, "0");
}

export default function PortfolioArchiveRow({
  category,
  leadProject,
  projectCount,
  categoryIndex,
}: PortfolioArchiveRowProps) {
  const categoryNumber =
    category.number ||
    formatCount(categoryIndex + 1);

  const previewImage =
    leadProject?.thumbnail ||
    leadProject?.images[0] ||
    "";

  return (
    <article className="group relative lg:border-b lg:border-[var(--line)]">
      {/* 모바일·태블릿 */}
      <Link
        href={category.href}
        className="group/mobile relative mb-3 block min-h-[132px] overflow-hidden border-b border-white/15 sm:min-h-[160px] sm:rounded-[2px] sm:border-b-0 lg:hidden"
        aria-label={`${category.title} 카테고리 보기`}
      >
        {leadProject ? (
          <ProjectPreview
            projectType={
              leadProject.projectType
            }
            previewType={
              leadProject.previewType
            }
            liveUrl={leadProject.liveUrl}
            image={previewImage}
            title={leadProject.title}
            priority={
              categoryIndex === 0
            }
            sizes="(max-width: 1023px) 100vw, 0px"
            imageClassName="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-active/mobile:scale-[1.025]"
            className="absolute inset-0"
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

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />

        <div className="relative z-20 flex min-h-[132px] items-center justify-between gap-5 px-5 py-7 sm:min-h-[160px] sm:px-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-[9px] font-semibold tracking-[0.2em] text-white/65">
                {categoryNumber}
              </span>

              <span className="h-px w-4 bg-white/35" />

              <span className="text-[9px] font-semibold tracking-[0.16em] text-white/75">
                {formatCount(
                  projectCount,
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

      {/* 데스크톱 */}
      <Link
        href={category.href}
        className="relative hidden min-h-52 grid-cols-[90px_minmax(0,1fr)_280px_auto] items-center gap-8 py-12 lg:grid"
        aria-label={`${category.title} 카테고리 보기`}
      >
        <div>
          <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--green)]">
            {categoryNumber}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">
              {category.subtitle}
            </p>

            <span className="h-px w-5 bg-[var(--line)]" />

            <p className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-[var(--muted)]">
              {formatCount(
                projectCount,
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
                .map((service) => (
                  <span
                    key={service}
                    className="text-[9px] font-semibold tracking-[0.13em] text-[var(--muted)]"
                  >
                    {service}
                  </span>
                ))}
            </div>
          )}
        </div>

        {/* 데스크톱 호버 미리보기 */}
        <div className="relative aspect-[4/3]">
          {leadProject ? (
            <div className="absolute inset-0 translate-x-7 scale-[0.96] overflow-hidden rounded-[2px] bg-[var(--cream)] opacity-0 shadow-[0_24px_70px_rgba(35,32,25,0)] transition-[opacity,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-[0_24px_70px_rgba(35,32,25,0.14)]">
              <ProjectPreview
                projectType={
                  leadProject.projectType
                }
                previewType={
                  leadProject.previewType
                }
                liveUrl={
                  leadProject.liveUrl
                }
                image={previewImage}
                title={leadProject.title}
                priority={
                  categoryIndex === 0
                }
                sizes="280px"
                imageClassName="scale-[1.06] object-cover blur-[8px] transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:blur-0"
                className="absolute inset-0"
              />

              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-black/[0.04]" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-4 px-5 pb-5 pt-12 opacity-0 transition-[opacity,transform] delay-100 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[9px] font-semibold tracking-[0.16em] text-white/70">
                  FEATURED PROJECT
                </p>

                <p className="mt-2 truncate text-xs font-semibold tracking-[-0.01em] text-white">
                  {leadProject.title}
                </p>
              </div>
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

        <div className="flex items-center justify-end">
          <span className="text-2xl text-[var(--muted)] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[var(--text-dark)]">
            →
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-0 bg-[var(--green)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
      </Link>
    </article>
  );
}