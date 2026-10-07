import Image from "next/image";
import Link from "next/link";



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
    category.number || formatCount(categoryIndex + 1);

  const previewImage =
    leadProject?.thumbnail || leadProject?.images?.[0] || "";

  return (
    <article className="relative lg:border-b lg:border-[var(--line)]">
      {/* 모바일·태블릿 */}
      <Link
        href={category.href}
        className="group/mobile relative isolate mb-3 block min-h-[132px] overflow-hidden border-b border-[var(--line)] sm:min-h-[160px] sm:rounded-[2px] lg:hidden"
        aria-label={`${category.title} 카테고리 보기`}
        style={{ backgroundColor: "var(--cream)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 12%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 65%, black 88%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 12%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 65%, black 88%)",
          }}
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 1023px) 100vw, 0px"
              className="object-cover object-right"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: category.color }}
            />
          )}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to right, var(--cream) 0%, var(--cream) 30%, transparent 90%)",
          }}
        />

        <div className="relative z-10 flex min-h-[132px] items-center justify-between gap-4 px-5 py-7 sm:min-h-[160px] sm:px-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--text-dark)]">
                {categoryNumber}
              </span>

              <span className="h-px w-4 bg-[var(--muted)]" />

              <span className="text-[9px] font-semibold tracking-[0.16em] text-[var(--text-dark)]">
                {formatCount(projectCount)} PROJECTS
              </span>
            </div>

            <h2 className="mt-3 break-words text-[1.85rem] font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--text-dark)] sm:text-4xl">
              {category.title}
            </h2>

            {category.subtitle && (
              <p className="mt-2 text-[9px] font-semibold leading-relaxed tracking-[0.15em] text-[var(--text-dark)] sm:text-[10px]">
                {category.subtitle}
              </p>
            )}
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-lg text-[var(--text-dark)] shadow-sm transition-transform duration-300 group-active/mobile:translate-x-1 motion-reduce:transition-none sm:h-12 sm:w-12">
            →
          </span>
        </div>
      </Link>
      {/* 데스크톱: 행 전체 배경 이미지 */}
      <Link
        href={category.href}
        className="group/archive relative isolate hidden min-h-52 grid-cols-[90px_minmax(0,1fr)_auto] items-center gap-8 overflow-hidden py-12 lg:grid focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--green)]"
        aria-label={`${category.title} 카테고리 보기`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 32%, rgba(0,0,0,0.12) 47%, rgba(0,0,0,0.5) 65%, black 85%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 32%, rgba(0,0,0,0.12) 47%, rgba(0,0,0,0.5) 65%, black 85%, black 100%)",
          }}
        >
          <div className="absolute inset-0 grayscale transition-[filter] duration-500 ease-out group-hover/archive:grayscale-0 group-focus-visible/archive:grayscale-0 motion-reduce:transition-none">
            {previewImage ? (
              <Image
                src={previewImage}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1024px) 100vw, 0px"
                className="object-cover object-right"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: category.color }}
              />
            )}
          </div>
        </div>

        {/* 文字 영역 가독성 보호 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to right, var(--cream) 0%, var(--cream) 34%, transparent 78%)",
          }}
        />

        <div className="relative z-10">
          <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 group-hover/archive:text-[var(--green)] group-focus-visible/archive:text-[var(--green)]">
            {categoryNumber}
          </span>
        </div>

        <div className="relative z-10 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">
              {category.subtitle}
            </p>
            <span className="h-px w-5 bg-[var(--line)]" />
            <p className="text-[10px] font-semibold tabular-nums tracking-[0.16em] text-[var(--muted)]">
              {formatCount(projectCount)} PROJECTS
            </p>
          </div>

          <h2 className="mt-3 text-[4.5vw] font-semibold leading-tight tracking-[-0.055em] text-[var(--text-dark)] transition-transform duration-500 group-hover/archive:translate-x-2 group-focus-visible/archive:translate-x-2 motion-reduce:transition-none">
            {category.title}
          </h2>

          {category.description && (
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-dark)]">
              {category.description}
            </p>
          )}

          {category.services.length > 0 && (
            <div className="mt-5 flex max-w-xl flex-wrap gap-x-4 gap-y-2">
              {category.services.slice(0, 4).map((service) => (
                <span
                  key={service}
                  className="text-[9px] font-semibold tracking-[0.13em] text-[var(--text-dark)]"
                >
                  {service}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 flex items-center justify-end pr-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--cream)] text-2xl text-[var(--text-dark)] shadow-sm transition-transform duration-500 group-hover/archive:translate-x-2 group-focus-visible/archive:translate-x-2 motion-reduce:transition-none">
            →
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px origin-left scale-x-0 bg-[var(--green)] transition-transform duration-700 group-hover/archive:scale-x-100 group-focus-visible/archive:scale-x-100 motion-reduce:transition-none" />
      </Link>
    </article>
  );
}