import Image from "next/image";
import Link from "next/link";
import { portfolioCategories } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-28 overflow-hidden bg-[#f5f4f0] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              SELECTED WORK
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl lg:text-7xl">
              실력은 설명보다
              <br />
              결과로 보여드립니다.
            </h2>
          </div>

          <div className="max-w-md md:pb-2">
            <p className="text-base leading-8 text-[var(--text)] md:text-lg">
              브랜딩부터 간판, 공간 그래픽까지.
              <br />
              브랜드가 실제 공간에서 완성되는 과정을 담았습니다.
            </p>

            <Link
              href="/portfolio"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-dark)]"
            >
              전체 포트폴리오 보기

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
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
                className={`group relative overflow-hidden rounded-[32px] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(0,0,0,0.1)] md:rounded-[40px] ${
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
                            className={`transition-transform duration-700 group-hover:scale-[1.035] ${
                              category.slug === "banner"
                                ? "object-cover"
                                : "object-cover"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`flex h-full items-center justify-center ${category.color}`}
                    >
                      <span className="text-sm font-semibold tracking-[0.24em] text-[var(--muted)]">
                        DESIGN SMOOTHIE
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80" />

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

                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--text-dark)] md:text-4xl">
                      {category.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text)] md:text-base">
                      {category.description}
                    </p>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--green)] text-lg text-[var(--text-dark)] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#cbe96a] md:h-14 md:w-14">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}