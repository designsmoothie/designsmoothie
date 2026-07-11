import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioCategories } from "@/data/portfolio";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = portfolioCategories.find(
    (item) => item.slug === category
  );

  if (!currentCategory) {
    notFound();
  }

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
          PORTFOLIO / {currentCategory.number}
        </p>

        <h1 className="text-6xl font-semibold tracking-[-0.06em] text-[var(--text-dark)] md:text-8xl">
          {currentCategory.title}
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-9">
          {currentCategory.description}
        </p>

       <div
  className={`mt-16 grid grid-cols-1 gap-5 ${
    currentCategory.slug === "banner"
      ? "md:grid-cols-4"
      : "md:grid-cols-3"
  }`}
>
          {currentCategory.images.map((image, index) => (
            <article
              key={image}
              className="overflow-hidden rounded-[30px] bg-white/50"
            >
              <div
  className={`overflow-hidden ${
    currentCategory.slug === "banner"
      ? "aspect-[2.96/4] bg-white"
      : "aspect-[4/3]"
  }`}
>
  <img
    src={image}
    alt={`${currentCategory.title} project ${index + 1}`}
    className={`h-full w-full ${
      currentCategory.slug === "banner"
        ? "object-contain"
        : "object-cover"
    }`}
  />
</div>

              <div className="p-7">
                <p className="text-sm font-bold tracking-[0.3em] text-[var(--muted)]">
                  PROJECT {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-[var(--text-dark)]">
                  {currentCategory.title} Project
                </h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}