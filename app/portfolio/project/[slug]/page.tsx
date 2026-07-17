import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  portfolioProjects,
} from "@/data/projects";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
    };
  }

  return {
    title: `${project.title} | ${project.categoryTitle} 포트폴리오`,
    description: project.summary,
    alternates: {
      canonical: `/portfolio/project/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | 디자인 스무디`,
      description: project.summary,
      url: `/portfolio/project/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.thumbnail,
          alt: `${project.title} ${project.subtitle}`,
        },
      ],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentProjectIndex = portfolioProjects.findIndex(
    (item) => item.slug === project.slug,
  );

  const nextProject =
    portfolioProjects[
      (currentProjectIndex + 1) % portfolioProjects.length
    ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: project.images,
    creator: {
      "@type": "Organization",
      name: "Design Smoothie",
    },
    dateCreated: project.year,
    genre: project.categoryTitle,
    keywords: project.services.join(", "),
  };

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-12 md:pb-36 md:pt-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/portfolio/${project.category}`}
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            {project.categoryTitle.toUpperCase()}
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            HOME
          </Link>
        </div>

        <div className="mt-20 border-b border-[var(--line)] pb-16 md:mt-24 md:pb-24">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
            {project.categoryTitle.toUpperCase()} PROJECT
          </p>

          <div className="mt-7 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
                {project.title}
              </h1>

              <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-[var(--muted)]">
                {project.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-[var(--line)] pt-7 sm:grid-cols-4 lg:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  CLIENT
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.client}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  INDUSTRY
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.industry}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  LOCATION
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.location}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  YEAR
                </p>

                <p className="mt-2 text-sm font-semibold text-[var(--text-dark)]">
                  {project.year}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[28px] bg-[#e5e1da] md:mt-16 md:aspect-[16/9] md:rounded-[40px]">
          <Image
            src={project.thumbnail}
            alt={`${project.title} ${project.subtitle}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover"
          />
        </div>

        <section className="grid gap-12 border-b border-[var(--line)] py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
              PROJECT OVERVIEW
            </p>

            <h2 className="mt-5 max-w-lg text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--text-dark)] md:text-5xl">
              {project.overviewTitle}
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-lg leading-9 text-[var(--text)] md:text-xl md:leading-10">
              {project.overview}
            </p>

            <div className="mt-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
                SERVICES
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[var(--line)] bg-white/55 px-4 py-2 text-sm text-[var(--text)]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {project.images.length > 1 && (
  <section className="mt-16 space-y-6 md:mt-24 md:space-y-10">
    {project.images.slice(1).map((image, index) => (
      <figure
        key={`${project.slug}-${image}-${index}`}
        className="overflow-hidden rounded-[28px] bg-[#e5e1da] md:rounded-[40px]"
      >
        <div className="relative aspect-[4/3] md:aspect-[16/10]">
          <Image
            src={image}
            alt={`${project.title} 프로젝트 이미지 ${index + 2}`}
            fill
            sizes="(max-width: 768px) 100vw, 1440px"
            className="object-cover"
          />
        </div>
      </figure>
    ))}
  </section>
)}

        <section className="mt-24 border-t border-[var(--line)] pt-12 md:mt-36 md:pt-16">
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">
            NEXT PROJECT
          </p>

          <Link
            href={`/portfolio/project/${nextProject.slug}`}
            className="group mt-6 block"
          >
            <div className="flex flex-col justify-between gap-8 overflow-hidden rounded-[32px] bg-[var(--text-dark)] p-8 text-white shadow-[0_22px_70px_rgba(57,48,40,0.12)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_100px_rgba(57,48,40,0.22)] md:flex-row md:items-end md:p-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-white/50">
                  {nextProject.categoryTitle.toUpperCase()} ·{" "}
                  {nextProject.subtitle}
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">
                  {nextProject.title}
                </h2>
              </div>

              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green)] text-xl text-[var(--text-dark)] transition-transform duration-300 group-hover:translate-x-1.5 md:h-16 md:w-16">
                →
              </span>
            </div>
          </Link>
        </section>
      </section>
    </main>
  );
}