import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

type StatCardProps = {
  label: string;
  value: number;
  description: string;
};

type RecentProject = {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  created_at: string;
  categories:
    | {
        name: string;
      }
    | {
        name: string;
      }[]
    | null;
};

function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-6">
      <p className="text-sm font-medium text-black/55">
        {label}
      </p>

      <p className="mt-3 text-4xl font-semibold tracking-tight text-black">
        {value}
      </p>

      <p className="mt-3 text-sm leading-6 text-black/45">
        {description}
      </p>
    </article>
  );
}

function getCategoryName(
  categories: RecentProject["categories"],
) {
  if (!categories) {
    return "미분류";
  }

  if (Array.isArray(categories)) {
    return categories[0]?.name ?? "미분류";
  }

  return categories.name;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    projectsResult,
    categoriesResult,
    publishedProjectsResult,
    featuredProjectsResult,
    recentProjectsResult,
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("categories")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("projects")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "published"),

    supabase
      .from("projects")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("featured", true),

    supabase
      .from("projects")
      .select(`
        id,
        title,
        slug,
        status,
        featured,
        created_at,
        categories (
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5),
  ]);

  const projectCount =
    projectsResult.count ?? 0;

  const categoryCount =
    categoriesResult.count ?? 0;

  const publishedProjectCount =
    publishedProjectsResult.count ?? 0;

  const featuredProjectCount =
    featuredProjectsResult.count ?? 0;

  const recentProjects =
    (recentProjectsResult.data ??
      []) as RecentProject[];

  const stats = [
    {
      label: "전체 프로젝트",
      value: projectCount,
      description:
        "CMS에 등록된 전체 프로젝트 수",
    },
    {
      label: "카테고리",
      value: categoryCount,
      description:
        "현재 운영 중인 포트폴리오 분류",
    },
    {
      label: "게시중 프로젝트",
      value: publishedProjectCount,
      description:
        "홈페이지에 공개된 프로젝트 수",
    },
    {
      label: "대표 프로젝트",
      value: featuredProjectCount,
      description:
        "메인 화면에 강조되는 프로젝트",
    },
  ];

  return (
    <main className="min-h-full bg-[#f7f7f5] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50 md:text-base">
              홈페이지 콘텐츠 현황을 한눈에 확인합니다.
            </p>
          </div>

          <Link
  href="/admin/projects/new"
  className="inline-flex w-fit items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium !text-white transition hover:bg-black/80"
>
  새 프로젝트 등록
</Link>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
            />
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-black">
                최근 등록 프로젝트
              </h2>

              <p className="mt-1 text-sm text-black/45">
                최근 등록된 프로젝트 5개를 표시합니다.
              </p>
            </div>

            <Link
              href="/admin/projects"
              className="text-sm font-medium text-black/55 transition hover:text-black"
            >
              전체 보기
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-medium text-black/65">
                아직 등록된 프로젝트가 없습니다.
              </p>

              <p className="mt-2 text-sm text-black/40">
                첫 번째 포트폴리오 프로젝트를 등록해보세요.
              </p>

              <Link
  href="/admin/projects/new"
  className="mt-6 inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium !text-black transition hover:bg-black hover:!text-white"
>
  프로젝트 등록하기
</Link>
            </div>
          ) : (
            <div className="divide-y divide-black/10">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}/edit`}
                  className="grid gap-3 px-6 py-5 transition hover:bg-black/[0.025] md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6"
                >
                  <div>
                    <p className="font-medium text-black">
                      {project.title}
                    </p>

                    <p className="mt-1 text-sm text-black/40">
                      {getCategoryName(
                        project.categories,
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/55">
                      {project.status ===
                      "published"
                        ? "게시중"
                        : "임시저장"}
                    </span>

                    {project.featured && (
                      <span className="rounded-full bg-[#eef4df] px-3 py-1 text-xs font-medium text-[#6f8e28]">
                        대표
                      </span>
                    )}
                  </div>

                  <time className="text-sm text-black/40">
                    {formatDate(
                      project.created_at,
                    )}
                  </time>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}