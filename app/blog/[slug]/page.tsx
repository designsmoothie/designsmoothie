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

    openGraph: {
      title,
      description,
      type: "article",
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

      <main className="min-h-screen bg-[#f7f3ec] px-6 pb-24 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#6f8e28] transition hover:text-[#587019]"
            >
              <span aria-hidden="true">
                ←
              </span>
              블로그 목록
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-black/55 transition hover:text-[#6f8e28]"
            >
              홈으로
              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <header className="mt-10">
            <p className="text-sm font-medium text-black/40">
              {formatDate(
                post.published_at,
              )}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-[1.15] tracking-[-0.04em] text-black md:text-6xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-6 max-w-3xl text-base leading-8 text-black/55 md:text-lg">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.thumbnail_url && (
            <div className="mt-12 overflow-hidden rounded-3xl bg-white">
              <img
                src={
                  post.thumbnail_url
                }
                alt={
                  post.title
                }
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          )}

          {post.source_type === "cms" &&
  post.content && (
    <article className="mt-14">
      <div
        className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-p:leading-8 prose-a:text-[#6f8e28] prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </article>
  )}

{post.source_type === "naver" && (
  <section className="mt-14 rounded-3xl border border-black/8 bg-white/60 px-6 py-8 md:px-8">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6f8e28]">
      Article summary
    </p>

    <h2 className="mt-3 text-xl font-semibold tracking-tight text-black">
      이 글의 핵심 내용
    </h2>

    <p className="mt-4 whitespace-pre-line text-base leading-8 text-black/60">
      {post.excerpt ||
        "자세한 내용은 네이버 블로그 원문에서 확인할 수 있습니다."}
    </p>
  </section>
)}

          {post.source_type ===
            "naver" &&
            post.source_url && (
              <section className="mt-20 border-t border-black/10 pt-10">
                <p className="text-sm leading-6 text-black/45">
                  이 글은 네이버 블로그에서 가져온 글입니다.
                </p>

                <a
                  href={
                    post.source_url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-[#94b63f] px-6 py-3 text-sm font-semibold !text-white transition hover:bg-[#86a735]"
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

          <div className="mt-20 border-t border-black/10 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/65 transition hover:text-[#6f8e28]"
            >
              <span aria-hidden="true">
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