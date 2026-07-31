import Link from "next/link";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase/server";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  source_type: string;
  source_url: string | null;
  published_at: string | null;
};

function formatDate(
  date: string | null,
) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
  ).format(new Date(date));
}

export default async function BlogPage() {
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
      source_url,
      published_at
    `)
    .eq("status", "published")
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#f7f3ec] px-6 pb-24 pt-20 md:px-10 md:pt-28">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-3xl font-semibold text-black">
              블로그를 불러오지 못했습니다.
            </h1>

            <p className="mt-3 text-sm text-red-600">
              {error.message}
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-black/65 transition hover:text-[#6f8e28]"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>
        </main>

        <SiteFooter />
      </>
    );
  }

  const posts =
    (data ?? []) as BlogPost[];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f7f3ec] px-6 pb-24 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#94b63f]">
                Design SMOOTHIE Journal
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black md:text-6xl">
                Blog
              </h1>

              <p className="mt-5 text-base leading-7 text-black/55 md:text-lg">
                브랜딩, 간판, 공간 디자인에 대한 실무 이야기와
                디자인스무디의 작업 기록을 소개합니다.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 border-b border-black pb-1 text-sm font-semibold text-black transition hover:border-[#94b63f] hover:text-[#6f8e28]"
            >
              홈으로 돌아가기
              <span aria-hidden="true">
                →
              </span>
            </Link>
          </header>

          {posts.length === 0 ? (
            <section className="mt-14 rounded-3xl border border-black/10 bg-white/70 px-6 py-20 text-center">
              <p className="text-lg font-medium text-black/65">
                아직 공개된 글이 없습니다.
              </p>

              <p className="mt-2 text-sm text-black/40">
                새로운 콘텐츠를 준비하고 있습니다.
              </p>
            </section>
          ) : (
            <section className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-white">
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#ebe6dd]">
                          <span className="text-sm font-medium text-black/35">
                            Design SMOOTHIE
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

                      <h2 className="mt-3 text-xl font-semibold leading-8 tracking-tight text-black transition group-hover:text-[#6f8e28]">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/50">
                          {post.excerpt}
                        </p>
                      )}

                      <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-black/65 transition group-hover:text-[#6f8e28]">
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
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}