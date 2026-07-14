import PageTransition from "@/components/PageTransition";
import Image from "next/image";
import Link from "next/link";
import { portfolioCategories } from "@/data/portfolio";

export default function PortfolioPage() {
  return (
    <PageTransition>
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-12 md:pb-36 md:pt-14">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition hover:text-[var(--text-dark)]"
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

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              PORTFOLIO
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[8rem]">
              Work
              <br />
              archive.
            </h1>
          </div>

          <div className="max-w-xl lg:pb-3">
            <p className="text-lg leading-9 text-[var(--text)] md:text-xl">
              브랜딩, 간판, 파사드, 공간 그래픽, 인쇄물과 배너 작업을
              카테고리별로 확인할 수 있습니다.
            </p>

            <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
              각 카테고리를 선택하면 해당 분야의 작업을 모아볼 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-2">
          {portfolioCategories.map((category, categoryIndex) => {
            const previewImages =
              category.slug === "banner"
                ? category.images.slice(0, 3)
                : category.images.slice(0, 4);

            return (
              <Link
                key={category.slug}
                href={category.href}
                className={`group overflow-hidden rounded-[32px] border border-black/5 bg-white/70 shadow-[0_20px_70px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(0,0,0,0.09)] md:rounded-[40px] ${
                  categoryIndex === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-[#dedbd3] ${
                    categoryIndex === 0
                      ? "aspect-[4/3] sm:aspect-[16/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  {previewImages.length > 0 ? (
                    <div
                      className={`grid h-full w-full ${
                        category.slug === "banner"
                          ? "grid-cols-3 gap-2 p-3 md:gap-4 md:p-5"
                          : previewImages.length === 1
                            ? "grid-cols-1"
                            : "grid-cols-2"
                      }`}
                    >
                      {previewImages.map((image, imageIndex) => (
                        <div
                          key={image}
                          className={`relative overflow-hidden ${
                            category.slug === "banner"
                              ? "rounded-[18px] bg-white/60"
                              : previewImages.length === 1
                                ? ""
                                : "bg-white/50"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${category.title} 포트폴리오 미리보기 ${
                              imageIndex + 1
                            }`}
                            fill
                            sizes={
                              categoryIndex === 0
                                ? "(max-width: 768px) 100vw, 1400px"
                                : "(max-width: 768px) 100vw, 700px"
                            }
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`flex h-full items-center justify-center ${category.color}`}
                    >
                      <span className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
                        DESIGN SMOOTHIE
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 md:left-7 md:top-7">
                    <span className="rounded-full border border-white/30 bg-black/15 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md">
                      {category.number}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-6 p-7 md:p-10">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                      {category.subtitle}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--text-dark)] md:text-4xl">
                      {category.title}
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text)] md:text-base">
                      {category.description}
                    </p>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-lg text-[var(--text-dark)] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[var(--green-hover)] md:h-14 md:w-14">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
    </PageTransition>
  );
}