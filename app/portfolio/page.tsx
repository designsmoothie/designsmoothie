import Link from "next/link";
import { portfolioCategories } from "@/data/portfolio";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] px-6 py-10 text-[var(--text)] md:px-12">
      <Link
        href="/"
        className="mb-16 inline-block text-sm font-bold tracking-[0.25em] text-[var(--muted)]"
      >
        ← HOME
      </Link>

      <section className="mx-auto max-w-[1440px]">
        <p className="mb-5 text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
          PORTFOLIO
        </p>

        <h1 className="text-6xl font-semibold tracking-[-0.06em] text-[var(--text-dark)] md:text-8xl">
          Work archive.
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-9">
          브랜딩, 간판, 파사드, 인쇄물, 배너, 디렉션 작업을 카테고리별로
          확인할 수 있습니다.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className={`group flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[34px] ${category.color} p-8 transition duration-500 hover:-translate-y-2`}
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
                <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                  {category.title}
                </h2>
                <p className="mt-3 text-sm font-bold tracking-[0.18em] text-[var(--muted)]">
                  {category.subtitle}
                </p>
                <p className="mt-6 leading-7">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}