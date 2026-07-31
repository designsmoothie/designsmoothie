import Link from "next/link";

import {
  createClient,
} from "@/lib/supabase/server";

type LatestBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  source_type: string;
  published_at: string | null;
};

function formatDate(
  value: string | null,
) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  ).format(new Date(value));
}

export default async function LatestJournal() {
  const supabase = await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      thumbnail_url,
      source_type,
      published_at
    `)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .limit(3);

  if (error) {
    console.error(
      "최신 블로그 글 불러오기 실패:",
      error,
    );

    return null;
  }

  const posts =
    (data ?? []) as LatestBlogPost[];

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="journal"
      className="bg-[#f7f3ec] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#94b63f]">
              Latest Journal
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-black md:text-6xl">
              디자인에 관한
              <br />
              실무적인 이야기
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-black/55 md:text-lg">
              브랜딩, 간판, 공간 디자인에 관한
              디자인스무디의 기록과 노하우를 소개합니다.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 border-b border-black pb-1 text-sm font-semibold text-black transition hover:border-[#94b63f] hover:text-[#6f8e28]"
          >
            모든 글 보기
            <span aria-hidden="true">
              →
            </span>
          </Link>
        </header>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#ebe6dd]">
                  {post.thumbnail_url ? (
                    <img
                      src={post.thumbnail_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/25">
                        Design Smoothie
                      </span>

                      <span className="mt-3 text-sm leading-6 text-black/35">
                        Journal
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-black/40">
                    <time>
                      {formatDate(
                        post.published_at,
                      )}
                    </time>

                    {post.source_type ===
                      "naver" && (
                      <span className="rounded-full bg-[#94b63f]/10 px-2.5 py-1 text-[#587019]">
                        네이버 블로그
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold leading-8 tracking-[-0.025em] text-black transition group-hover:text-[#6f8e28]">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">
                      {post.excerpt}
                    </p>
                  )}

                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black/65 transition group-hover:text-[#6f8e28]">
                    글 읽기
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}