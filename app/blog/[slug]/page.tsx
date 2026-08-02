import type {
  Metadata,
} from "next";
import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import {
  createClient,
} from "@/lib/supabase/server";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail_url: string | null;
  source_type: string;
  source_url: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

async function getPost(
  slug: string,
) {
  const supabase =
    await createClient();

  const {
    data,
  } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      thumbnail_url,
      source_type,
      source_url,
      published_at,
      seo_title,
      seo_description
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  return data as BlogPost | null;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const post =
    await getPost(slug);

  if (!post) {
    return {
      title: "Blog",
    };
  }

  const title =
    post.seo_title ??
    post.title;

  const description =
    post.seo_description ??
    post.excerpt ??
    "";

  return {
    title,
    description,

    alternates: {
      canonical: `/blog/${post.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,

      publishedTime:
        post.published_at ??
        undefined,

      images:
        post.thumbnail_url
          ? [
              {
                url:
                  post.thumbnail_url,
                alt:
                  post.title,
              },
            ]
          : [],
    },
  };
}

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
      month: "long",
      day: "numeric",
    },
  ).format(new Date(value));
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const {
    slug,
  } = await params;

  const post =
    await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#f7f3ec] pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          {/* 상단 내비게이션 */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6f8e28] transition-colors duration-300 hover:text-[#587019]"
            >
              <span aria-hidden="true">
                ←
              </span>

              블로그 목록
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/55 transition-colors duration-300 hover:text-[#6f8e28]"
            >
              홈으로

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* 글 제목 */}
          <header className="mt-10 border-t border-black/10 pt-8 md:mt-14 md:pt-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-black/40 md:text-xs">
                JOURNAL
              </p>

              <span className="h-px w-5 bg-black/15" />

              <time className="text-[10px] font-semibold tracking-[0.12em] text-black/40 md:text-xs">
                {formatDate(
                  post.published_at,
                )}
              </time>
            </div>

            <h1 className="mt-6 text-[2.7rem] font-semibold leading-[1.08] tracking-[-0.055em] text-black sm:text-5xl md:text-6xl md:leading-[1.05]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-7 max-w-3xl text-base leading-8 text-black/55 md:mt-9 md:text-lg md:leading-9">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* 대표 이미지: 모바일 풀블리드 */}
          {post.thumbnail_url && (
            <div className="-mx-6 mt-12 overflow-hidden bg-white md:mx-0 md:mt-16 md:rounded-3xl">
              <img
                src={
                  post.thumbnail_url
                }
                alt={
                  post.title
                }
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
              />
            </div>
          )}

          {/* CMS 작성 글 */}
          {post.source_type ===
            "cms" &&
            post.content && (
              <article className="mt-14 md:mt-20">
                <div
                  className="
                    prose
                    prose-neutral
                    max-w-none

                    prose-headings:font-semibold
                    prose-headings:tracking-[-0.035em]
                    prose-headings:text-black

                    prose-h2:mt-16
                    prose-h2:text-3xl
                    prose-h2:leading-[1.2]

                    prose-h3:mt-12
                    prose-h3:text-2xl
                    prose-h3:leading-[1.3]

                    prose-p:text-base
                    prose-p:leading-8
                    prose-p:text-black/65

                    prose-a:font-semibold
                    prose-a:text-[#6f8e28]
                    prose-a:no-underline

                    prose-strong:text-black

                    prose-blockquote:border-[#94b63f]
                    prose-blockquote:text-black/60

                    [&_img]:-ml-6
                    [&_img]:my-10
                    [&_img]:block
                    [&_img]:h-auto
                    [&_img]:w-[calc(100%+3rem)]
                    [&_img]:max-w-none
                    [&_img]:rounded-none

                    md:prose-p:text-lg
                    md:prose-p:leading-9

                    md:[&_img]:ml-0
                    md:[&_img]:my-14
                    md:[&_img]:w-full
                    md:[&_img]:rounded-2xl
                  "
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content,
                  }}
                />
              </article>
            )}

          {/* 네이버 글 요약 */}
          {post.source_type ===
            "naver" && (
              <section className="mt-14 border-y border-black/10 py-10 md:mt-20 md:py-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6f8e28] md:text-xs">
                  ARTICLE SUMMARY
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-black md:text-3xl">
                  이 글의 핵심 내용
                </h2>

                <p className="mt-6 whitespace-pre-line text-base leading-8 text-black/60 md:text-lg md:leading-9">
                  {post.excerpt ||
                    "자세한 내용은 네이버 블로그 원문에서 확인할 수 있습니다."}
                </p>
              </section>
            )}

          {/* 네이버 원문 이동 */}
          {post.source_type ===
            "naver" &&
            post.source_url && (
              <section className="mt-12 md:mt-16">
                <p className="text-sm leading-7 text-black/45">
                  이 글은 네이버 블로그에서 가져온
                  글입니다. 전체 내용은 원문에서
                  확인할 수 있습니다.
                </p>

                <a
                  href={
                    post.source_url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#94b63f] px-6 py-3 text-sm font-semibold !text-white transition-colors duration-300 hover:bg-[#86a735]"
                >
                  네이버 원문 보기

                  <span
                    aria-hidden="true"
                    className="ml-2"
                  >
                    ↗
                  </span>
                </a>
              </section>
            )}

          {/* 다른 글 보기 */}
          <div className="mt-20 border-t border-black/10 pt-8 md:mt-28 md:pt-10">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-black/65 transition-colors duration-300 hover:text-[#6f8e28]"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>

              다른 글 보기
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}