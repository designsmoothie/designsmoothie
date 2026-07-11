import Link from "next/link";
import { portfolioCategories } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-12"
    >
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
            PORTFOLIO
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-5xl">
            실력으로 먼저 보여드립니다.
          </h2>
        </div>

        <p className="max-w-md leading-7 text-[var(--muted)]">
          브랜딩, 간판, 인쇄물 브랜드가 기억될 디자인.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {portfolioCategories.map((category) => (
          <Link
            key={category.slug}
            href={category.href}
            className={`group flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[34px] ${category.color} p-8 transition duration-500 hover:-translate-y-2`}
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold tracking-[0.35em] text-[var(--muted)]">
                {category.number}
              </span>
              <span className="text-2xl transition group-hover:translate-x-1">
                →
              </span>
            </div>

            <div>
              <h3 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                {category.title}
              </h3>

              <p className="mt-3 text-sm font-bold tracking-[0.18em] text-[var(--muted)]">
                {category.subtitle}
              </p>

              <p className="mt-6 leading-7 text-[var(--text)]">
                {category.description}
              </p>

              {category.images.length > 0 && (
                <div
                  className={`mt-8 grid gap-3 ${
                    category.slug === "banner"
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  }`}
                >
                  {category.images
                    .slice(0, category.slug === "banner" ? 3 : 4)
                    .map((image, imageIndex) => (
                      <div
                        key={image}
                        className={`overflow-hidden rounded-2xl bg-white/40 ${
                          category.slug === "banner"
                            ? "aspect-[3/5]"
                            : "aspect-[4/5]"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${category.title} preview ${imageIndex + 1}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}