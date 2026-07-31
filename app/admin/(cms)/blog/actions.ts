"use server";

import {
  revalidatePath,
} from "next/cache";
import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  XMLParser,
} from "fast-xml-parser";

import { openai } from "@/lib/openai";

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createBlogPost(
  formData: FormData,
) {
  const supabase = await createClient();

  const title = String(
    formData.get("title") ?? "",
  ).trim();

  const inputSlug = String(
    formData.get("slug") ?? "",
  ).trim();

  const excerpt = String(
    formData.get("excerpt") ?? "",
  ).trim();

  const content = String(
    formData.get("content") ?? "",
  ).trim();

  const thumbnailUrl = String(
    formData.get("thumbnail_url") ?? "",
  ).trim();

  const status = String(
    formData.get("status") ?? "draft",
  ).trim();

  const featured =
    formData.get("featured") === "on";

  const seoTitle = String(
    formData.get("seo_title") ?? "",
  ).trim();

  const seoDescription = String(
    formData.get("seo_description") ?? "",
  ).trim();

  if (!title) {
    redirect(
      "/admin/blog/create?error=title-required",
    );
  }

  const slug =
    createSlug(inputSlug || title);

  if (!slug) {
    redirect(
      "/admin/blog/create?error=slug-required",
    );
  }

  const publishedAt =
    status === "published"
      ? new Date().toISOString()
      : null;

  const {
    error,
  } = await supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      excerpt:
        excerpt || null,
      content:
        content || null,
      thumbnail_url:
        thumbnailUrl || null,
      status,
      featured,
      seo_title:
        seoTitle || null,
      seo_description:
        seoDescription || null,
      source_type: "cms",
      published_at:
        publishedAt,
    });

  if (error) {
    redirect(
      `/admin/blog/create?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath(
    "/admin/blog",
  );

  revalidatePath(
    "/blog",
  );

  redirect(
    "/admin/blog?success=created",
  );
}

const NAVER_BLOG_RSS_URL =
  "https://rss.blog.naver.com/hello_smoothie.xml";

type NaverRssItem = {
  title?: string;
  link?: string;
  guid?: string;
  description?: string;
  pubDate?: string;
};

function toArray<T>(
  value: T | T[] | undefined,
): T[] {
  if (!value) {
    return [];
  }

  return Array.isArray(value)
    ? value
    : [value];
}

function stripHtml(value: string) {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getFirstImageUrl(
  html: string,
) {
  const match = html.match(
    /<img[^>]+src=["']([^"']+)["']/i,
  );

  return match?.[1] ?? null;
}

function createNaverSourceId(
  item: NaverRssItem,
) {
  const sourceValue =
    item.guid ||
    item.link ||
    item.title ||
    "";

  return `naver:${sourceValue}`;
}

function createNaverSlug(
  item: NaverRssItem,
  index: number,
) {
  const link = item.link ?? "";

  const logNoMatch = link.match(
    /logNo=(\d+)/,
  );

  if (logNoMatch?.[1]) {
    return `naver-${logNoMatch[1]}`;
  }

  const pathNumberMatch = link.match(
    /\/(\d+)(?:\?|$)/,
  );

  if (pathNumberMatch?.[1]) {
    return `naver-${pathNumberMatch[1]}`;
  }

  const titleSlug = createSlug(
    item.title ?? "",
  );

  return titleSlug
    ? `naver-${titleSlug}`
    : `naver-post-${Date.now()}-${index}`;
}

export async function syncNaverBlogPosts() {
  const supabase = await createClient();

  let response: Response;

  try {
    response = await fetch(
      NAVER_BLOG_RSS_URL,
      {
        cache: "no-store",
        headers: {
          "User-Agent":
            "DesignSmoothie-RSS-Sync/1.0",
        },
      },
    );
  } catch {
    redirect(
      "/admin/blog?error=rss-connection-failed",
    );
  }

  if (!response.ok) {
    redirect(
      `/admin/blog?error=${encodeURIComponent(
        `RSS 요청 실패: ${response.status}`,
      )}`,
    );
  }

  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    processEntities: true,
  });

  const parsed = parser.parse(xml);

  const items = toArray<NaverRssItem>(
    parsed?.rss?.channel?.item,
  );

  if (items.length === 0) {
    redirect(
      "/admin/blog?error=no-rss-posts",
    );
  }

  let importedCount = 0;
  let skippedCount = 0;

  for (
    let index = 0;
    index < items.length;
    index += 1
  ) {
    const item = items[index];

    const title = String(
      item.title ?? "",
    ).trim();

    const sourceUrl = String(
      item.link ?? "",
    ).trim();

    const description = String(
      item.description ?? "",
    ).trim();

    if (!title || !sourceUrl) {
      skippedCount += 1;
      continue;
    }

    const sourceId =
      createNaverSourceId(item);

    const {
      data: existingPost,
      error: existingPostError,
    } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("source_id", sourceId)
      .maybeSingle();

    if (existingPostError) {
      redirect(
        `/admin/blog?error=${encodeURIComponent(
          existingPostError.message,
        )}`,
      );
    }

    if (existingPost) {
      skippedCount += 1;
      continue;
    }

   const plainDescription =
  stripHtml(description);

const fallbackExcerpt =
  plainDescription.length > 180
    ? `${plainDescription.slice(
        0,
        180,
      )}...`
    : plainDescription;

let generatedExcerpt =
  fallbackExcerpt;

try {
  const aiSummary =
    await generateAiSummary(
      [
        `글 제목: ${title}`,
        "",
        plainDescription,
      ].join("\n"),
    );

  if (aiSummary) {
    generatedExcerpt =
      aiSummary;
  }
} catch (summaryError) {
  console.error(
    "AI 요약 생성 실패:",
    summaryError,
  );

  // AI 호출에 실패해도 RSS 가져오기는 중단하지 않고
  // 기존 방식의 짧은 요약을 대신 저장합니다.
}

    const publishedAt =
      item.pubDate &&
      !Number.isNaN(
        new Date(
          item.pubDate,
        ).getTime(),
      )
        ? new Date(
            item.pubDate,
          ).toISOString()
        : new Date().toISOString();

    const {
      error: insertError,
    } = await supabase
      .from("blog_posts")
      .insert({
        title,
        slug: createNaverSlug(
          item,
          index,
        ),
       excerpt:
  generatedExcerpt || null,
        content:
          description || null,
        thumbnail_url:
          getFirstImageUrl(
            description,
          ),
        status: "published",
        featured: false,
        source_type: "naver",
        source_url: sourceUrl,
        source_id: sourceId,
        published_at: publishedAt,
      });

    if (insertError) {
      redirect(
        `/admin/blog?error=${encodeURIComponent(
          insertError.message,
        )}`,
      );
    }

    importedCount += 1;
  }

  revalidatePath(
    "/admin/blog",
  );

  revalidatePath(
    "/blog",
  );

  redirect(
    `/admin/blog?success=synced&imported=${importedCount}&skipped=${skippedCount}`,
  );
}

export async function updateBlogPost(
  postId: string,
  formData: FormData,
) {
  const supabase = await createClient();

  const title = String(
    formData.get("title") ?? "",
  ).trim();

  const inputSlug = String(
    formData.get("slug") ?? "",
  ).trim();

  const excerpt = String(
    formData.get("excerpt") ?? "",
  ).trim();

  const content = String(
    formData.get("content") ?? "",
  ).trim();

  const thumbnailUrl = String(
    formData.get("thumbnail_url") ?? "",
  ).trim();

  if (!postId) {
    redirect(
      "/admin/blog?error=post-id-required",
    );
  }

  if (!title) {
    redirect(
      `/admin/blog/${postId}/edit?error=title-required`,
    );
  }

  const slug =
    createSlug(inputSlug || title);

  if (!slug) {
    redirect(
      `/admin/blog/${postId}/edit?error=slug-required`,
    );
  }

  const {
    error,
  } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt:
        excerpt || null,
      content:
        content || null,
      thumbnail_url:
        thumbnailUrl || null,
    })
    .eq("id", postId);

  if (error) {
    redirect(
      `/admin/blog/${postId}/edit?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath(
    "/admin/blog",
  );

  revalidatePath(
    `/admin/blog/${postId}/edit`,
  );

  revalidatePath(
    "/blog",
  );

  revalidatePath(
    `/blog/${slug}`,
  );

  redirect(
    "/admin/blog?success=updated",
  );
}

export async function generateAiSummary(
  content: string,
) {
  "use server";

  if (!content.trim()) {
    return "";
  }

  const response =
    await openai.responses.create({
      model: "gpt-5-nano",
      input: `
아래 글을 홈페이지 소개용으로 3~5문장 정도의 자연스러운 요약으로 작성해주세요.

조건

- 광고처럼 쓰지 말 것
- 핵심만 전달
- 250자 이하
- 마지막은 "자세한 내용은 원문에서 확인할 수 있습니다." 로 마무리

본문

${content}
`,
    });

  return (
    response.output_text ?? ""
  ).trim();
}

export async function summarizeExistingNaverPosts() {
  const supabase = await createClient();

  const {
    data: posts,
    error: loadError,
  } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      content
    `)
    .eq("source_type", "naver")
    .not("content", "is", null)
    .order("published_at", {
      ascending: false,
    });

  if (loadError) {
    redirect(
      `/admin/blog?error=${encodeURIComponent(
        loadError.message,
      )}`,
    );
  }

  if (!posts?.length) {
    redirect(
      "/admin/blog?error=no-naver-posts",
    );
  }

  let updatedCount = 0;
  let failedCount = 0;

  for (const post of posts) {
    const plainContent =
      stripHtml(
        String(post.content ?? ""),
      );

    if (!plainContent) {
      failedCount += 1;
      continue;
    }

    try {
      const summary =
        await generateAiSummary(
          [
            `글 제목: ${post.title}`,
            "",
            plainContent,
          ].join("\n"),
        );

      if (!summary) {
        failedCount += 1;
        continue;
      }

      const {
        error: updateError,
      } = await supabase
        .from("blog_posts")
        .update({
          excerpt: summary,
        })
        .eq("id", post.id);

      if (updateError) {
        console.error(
          `${post.title} 요약 저장 실패:`,
          updateError,
        );

        failedCount += 1;
        continue;
      }

      updatedCount += 1;
    } catch (error) {
      console.error(
        `${post.title} AI 요약 실패:`,
        error,
      );

      failedCount += 1;
    }
  }

  revalidatePath(
    "/admin/blog",
  );

  revalidatePath(
    "/blog",
  );

  revalidatePath(
    "/",
  );

  redirect(
    `/admin/blog?success=ai-summarized&updated=${updatedCount}&failed=${failedCount}`,
  );
}