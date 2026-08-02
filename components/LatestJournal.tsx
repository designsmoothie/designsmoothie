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
      className="overflow-hidden bg-[#f7f3ec] py-24 md:py-32 lg:py-[9vw]"
    >
      {/* 섹션 소개 */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-[4vw]">
        <header className="grid gap-10 border-t border-[var(--line)] pt-8 md:pt-11 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold tracking-[0.28em] text-[var(--green)] md:text-xs">
              LATEST JOURNAL
            </p>

            <h2 className="mt-6 text-[3rem] font-semibold leading-[0.98] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-7xl lg:text-[6vw] lg:leading-[0.92]">
              디자인에 관한
              <br />
              실무적인 이야기
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end lg:pb-2">
            <p className="text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
              브랜딩, 간판, 공간 디자인에 관한
              디자인스무디의 기록과 노하우를
              소개합니다.
            </p>

            <Link
              href="/blog"
              className="group mt-7 inline-flex items-center gap-3 border-b border-[var(--text-dark)] pb-2 text-sm font-semibold text-[var(--text-dark)] transition-colors duration-300 hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              모든 글 보기

              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </header>
      </div>

      {/* 블로그 미리보기 */}
      <div className="mt-16 md:mt-24 lg:px-[4vw]">
        <div className="grid gap-0 md:px-12 lg:grid-cols-3 lg:gap-6 lg:px-0">
          {posts.map(
            (post, index) => (
              <article
                key={post.id}
                className="group border-t border-[var(--line)] pt-10 first:border-t-0 first:pt-0 md:pt-14 lg:border-t-0 lg:pt-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  {/* 모바일은 화면 양끝까지 */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ebe6dd] sm:aspect-[16/10] lg:aspect-[4/3] lg:rounded-[2px]">
                    {post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        loading={
                          index === 0
                            ? "eager"
                            : "lazy"
                        }
                        className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                          DESIGN SMOOTHIE
                        </span>

                        <span className="mt-3 text-sm text-[var(--muted)]">
                          JOURNAL
                        </span>
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/[0.04]" />

                    <div className="pointer-events-none absolute left-5 top-5 sm:left-7 sm:top-7">
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
                        JOURNAL
                      </span>
                    </div>

                    <div className="pointer-events-none absolute bottom-5 right-5 text-2xl text-white opacity-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 sm:bottom-7 sm:right-7">
                      ↗
                    </div>
                  </div>

                  {/* 텍스트는 기존 여백 유지 */}
                  <div className="px-5 pb-14 pt-6 sm:px-8 md:px-0 md:pb-16 lg:pb-0 lg:pt-7">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-[0.12em] text-[var(--muted)]">
                      <time>
                        {formatDate(
                          post.published_at,
                        )}
                      </time>

                      {post.source_type ===
                        "naver" && (
                        <>
                          <span className="h-px w-4 bg-[var(--line)]" />

                          <span>
                            NAVER BLOG
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold leading-[1.25] tracking-[-0.035em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)] md:text-3xl lg:text-[2rem]">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-4 line-clamp-2 text-sm leading-7 text-[var(--muted)] md:text-base">
                        {post.excerpt}
                      </p>
                    )}

                    <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[var(--text-dark)] transition-colors duration-300 group-hover:text-[var(--green)]">
                      글 읽기

                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </p>
                  </div>
                </Link>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}