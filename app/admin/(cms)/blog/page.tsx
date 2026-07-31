import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import {
  summarizeExistingNaverPosts,
  syncNaverBlogPosts,
} from "./actions";

type BlogPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
    imported?: string;
    skipped?: string;
  }>;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  thumbnail_url: string | null;
  source_type: string;
  source_url: string | null;
  published_at: string | null;
  updated_at: string;
};

function getStatusLabel(status: string) {
  switch (status) {
    case "published":
      return "게시중";

    case "archived":
      return "보관";

    default:
      return "임시저장";
  }
}

function formatDate(date: string | null) {
  if (!date) {
    return "발행일 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params = await searchParams;

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
      status,
      featured,
      thumbnail_url,
      source_type,
      source_url,
      published_at,
      updated_at
    `)
    .order("published_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-semibold text-black">
          블로그를 불러오지 못했습니다.
        </h1>

        <p className="mt-3 text-sm text-red-600">
          {error.message}
        </p>
      </main>
    );
  }

  const posts =
    (data ?? []) as BlogPost[];

  const importedCount =
    Number(params.imported ?? 0);

  const skippedCount =
    Number(params.skipped ?? 0);

  return (
    <main className="min-h-full bg-[#f7f7f5] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              블로그 관리
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50 md:text-base">
              네이버 블로그 글을 가져오거나 홈페이지 전용 글을 관리합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <form action={syncNaverBlogPosts}>
                <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#94b63f]/40 bg-[#94b63f]/10 px-5 text-sm font-semibold !text-[#587019] transition hover:bg-[#94b63f]/20"
              >
                네이버 글 가져오기
              </button>
            </form>

          <form action={summarizeExistingNaverPosts}>
  <button
    type="submit"
    className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-neutral-700 transition hover:border-[#94b63f] hover:bg-[#94b63f]/10 hover:text-[#587019]"
  >
    기존 글 AI 요약
  </button>
</form>

            <Link
              href="/admin/blog/create"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold !text-white transition hover:bg-black/80"
            >
              새 글 작성
            </Link>
          </div>
        </header>

        {params.success === "synced" && (
          <div className="mt-6 rounded-2xl border border-[#94b63f]/20 bg-[#94b63f]/10 px-5 py-4">
            <p className="text-sm font-medium text-[#587019]">
              네이버 블로그 동기화가 완료되었습니다.
            </p>

            <p className="mt-1 text-sm text-[#587019]/75">
              새 글 {importedCount}개를 가져왔고, 기존 글 {skippedCount}개는 건너뛰었습니다.
            </p>
          </div>
        )}

        {params.success === "created" && (
          <div className="mt-6 rounded-2xl border border-[#94b63f]/20 bg-[#94b63f]/10 px-5 py-4">
            <p className="text-sm font-medium text-[#587019]">
              블로그 글이 저장되었습니다.
            </p>
          </div>
        )}

        {params.error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-600">
              블로그 작업을 완료하지 못했습니다.
            </p>

            <p className="mt-1 break-all text-sm text-red-500">
              {decodeURIComponent(params.error)}
            </p>
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
            <div>
              <h2 className="font-semibold text-black">
                게시글 목록
              </h2>

              <p className="mt-1 text-sm text-black/45">
                총 {posts.length}개의 글이 등록되어 있습니다.
              </p>
            </div>

            <span className="text-xs font-medium text-black/35">
              네이버 블로그 · 홈페이지 직접 작성
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <p className="font-medium text-black/60">
                아직 등록된 글이 없습니다.
              </p>

              <p className="mt-2 text-sm text-black/40">
                ‘네이버 글 가져오기’를 눌러 기존 글을 불러오세요.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-black/5">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      {post.thumbnail_url ? (
                        <img
                          src={post.thumbnail_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-semibold text-black">
                          {post.title}
                        </h3>

                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                          {getStatusLabel(
                            post.status,
                          )}
                        </span>

                        <span className="rounded-full bg-[#94b63f]/10 px-2.5 py-1 text-xs font-medium text-[#587019]">
                          {post.source_type === "naver"
                            ? "네이버"
                            : "홈페이지"}
                        </span>

                        {post.featured && (
                          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
                            대표글
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-black/40">
                        {formatDate(
                          post.published_at,
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    {post.source_type ===
                      "naver" &&
                      post.source_url && (
                        <a
                          href={post.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 bg-white px-4 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
                        >
                          네이버 원문 보기 ↗
                        </a>
                      )}

                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 bg-white px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                    >
                      수정
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}