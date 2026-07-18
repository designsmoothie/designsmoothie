import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import { portfolioCategories } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "디자인스무디의 브랜딩, 간판, 파사드, 인테리어, 인쇄물, 배너 및 디자인 디렉션 포트폴리오를 확인하세요.",
  alternates: {
    canonical: "/portfolio",
  },
};

function getCategoryLayout(index: number) {
  const layoutIndex = index % 5;

  if (layoutIndex === 0) {
    return {
      wrapper: "lg:col-span-12",
      image: "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.2/1]",
      text: "lg:max-w-[72%]",
      title: "text-4xl sm:text-5xl lg:text-7xl",
    };
  }

  if (layoutIndex === 1) {
    return {
      wrapper: "lg:col-span-7",
      image: "aspect-[4/3] lg:aspect-[1.25/1]",
      text: "lg:max-w-[88%]",
      title: "text-4xl lg:text-5xl",
    };
  }

  if (layoutIndex === 2) {
    return {
      wrapper: "lg:col-span-5 lg:mt-[12vw]",
      image: "aspect-[4/3] lg:aspect-[0.95/1]",
      text: "lg:max-w-full",
      title: "text-4xl lg:text-5xl",
    };
  }

  if (layoutIndex === 3) {
    return {
      wrapper: "lg:col-span-5",
      image: "aspect-[4/3] lg:aspect-[0.92/1]",
      text: "lg:max-w-full",
      title: "text-4xl lg:text-5xl",
    };
  }

  return {
    wrapper: "lg:col-span-7 lg:mt-[7vw]",
    image: "aspect-[4/3] lg:aspect-[1.35/1]",
    text: "lg:max-w-[88%]",
    title: "text-4xl lg:text-5xl",
  };
}

export default function PortfolioPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
        {/* 상단 소개 */}
        <section className="px-5 pb-20 pt-8 sm:px-8 md:px-12 md:pb-28 md:pt-12 lg:px-[4vw]">
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
                브랜드의 얼굴부터 공간의 인상까지, 디자인스무디가
                만들어온 작업을 분야별로 소개합니다.
              </p>

              <p className="mt-7 text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
                하나의 스타일보다 각 브랜드가 가진 고유한 분위기와
                목적에 집중합니다.
              </p>

              <div className="mt-10 flex items-center justify-between border-t border-[var(--line)] pt-5">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
                  CATEGORIES
                </span>

                <span className="text-xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                  {String(portfolioCategories.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 카테고리 아카이브 */}
        <section className="px-5 pb-28 sm:px-8 md:px-12 md:pb-44 lg:px-[4vw]">
          <div className="grid items-start gap-x-[3vw] gap-y-24 lg:grid-cols-12 lg:gap-y-[11vw]">
            {portfolioCategories.map((category, categoryIndex) => {
              const layout = getCategoryLayout(categoryIndex);

              const previewImages =
                category.slug === "banner"
                  ? category.images.slice(0, 3)
                  : category.images.slice(0, 4);

              const isBanner = category.slug === "banner";
              const hasImages = previewImages.length > 0;

              return (
                <article
                  key={category.slug}
                  className={layout.wrapper}
                >
                  <Link
                    href={category.href}
                    className="group block"
                    aria-label={`${category.title} 포트폴리오 보기`}
                  >
                    {/* 이미지 전시 영역 */}
                    <div
                      className={`relative overflow-hidden rounded-[16px] bg-[#dedbd3] md:rounded-[20px] ${layout.image}`}
                    >
                      {hasImages ? (
                        <div
                          className={`grid h-full w-full ${
                            isBanner
                              ? "grid-cols-3 gap-1.5 p-1.5 sm:gap-2.5 sm:p-2.5 lg:gap-3 lg:p-3"
                              : previewImages.length === 1
                                ? "grid-cols-1"
                                : categoryIndex === 0
                                  ? "grid-cols-[1.2fr_0.8fr]"
                                  : "grid-cols-2"
                          }`}
                        >
                          {previewImages.map(
                            (image, imageIndex) => {
                              const isFeaturedMainImage =
                                categoryIndex === 0 &&
                                previewImages.length >= 3 &&
                                imageIndex === 0;

                              return (
                                <div
                                  key={`${image}-${imageIndex}`}
                                  className={`relative overflow-hidden ${
                                    isBanner
                                      ? "rounded-[10px] bg-white/60 sm:rounded-[14px]"
                                      : isFeaturedMainImage
                                        ? "row-span-2"
                                        : ""
                                  }`}
                                >
                                  <Image
                                    src={image}
                                    alt={`${category.title} 포트폴리오 미리보기 ${
                                      imageIndex + 1
                                    }`}
                                    fill
                                    priority={categoryIndex === 0}
                                    sizes={
                                      categoryIndex === 0
                                        ? "(max-width: 768px) 100vw, 96vw"
                                        : "(max-width: 1024px) 100vw, 58vw"
                                    }
                                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                                  />
                                </div>
                              );
                            },
                          )}
                        </div>
                      ) : (
                        <div
                          className={`flex h-full items-center justify-center ${category.color}`}
                        >
                          <span className="text-[10px] font-semibold tracking-[0.25em] text-[var(--muted)] md:text-xs">
                            DESIGN SMOOTHIE
                          </span>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30 transition-opacity duration-500 group-hover:opacity-60" />

                      <div className="absolute left-4 top-4 md:left-6 md:top-6">
                        <span className="inline-flex rounded-full border border-white/30 bg-black/15 px-3.5 py-2 text-[9px] font-semibold tracking-[0.18em] text-white backdrop-blur-md md:text-[10px]">
                          {category.number}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[var(--green)] text-base text-[var(--text-dark)] opacity-0 shadow-[0_12px_35px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-6 md:right-6 md:h-14 md:w-14 md:text-lg">
                        ↗
                      </div>
                    </div>

                    {/* 이미지와 분리된 텍스트 */}
                    <div
                      className={`mt-8 md:mt-10 ${layout.text}`}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] md:text-xs">
                            {category.subtitle}
                          </p>

                          <h2
                            className={`mt-3 font-semibold tracking-[-0.06em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] ${layout.title}`}
                          >
                            {category.title}
                          </h2>
                        </div>

                        <span className="mt-1 shrink-0 text-xl text-[var(--muted)] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--text-dark)] md:text-2xl">
                          →
                        </span>
                      </div>

                      <div className="mt-6 border-t border-[var(--line)] pt-6">
                        <p className="max-w-2xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                          {category.description}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                          {category.services
                            .slice(0, 4)
                            .map((service) => (
                              <span
                                key={service}
                                className="text-[10px] font-semibold tracking-[0.13em] text-[var(--muted)]"
                              >
                                {service}
                              </span>
                            ))}
                        </div>

                        <div className="mt-7 flex justify-end">
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text-dark)]">
                            EXPLORE CATEGORY
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
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
                브랜딩부터 사이니지와 공간 그래픽까지 하나의 흐름으로
                연결합니다.
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