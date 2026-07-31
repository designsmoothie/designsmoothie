import ImageUploader from "@/components/cms/ImageUploader";
import Link from "next/link";
import { notFound } from "next/navigation";

import FormCard from "@/components/cms/FormCard";
import SubmitButton from "@/components/cms/SubmitButton";
import TextArea from "@/components/cms/TextArea";
import TextInput from "@/components/cms/TextInput";
import { createClient } from "@/lib/supabase/server";
import {
  updateBlogPost,
} from "../../actions";

type BlogEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail_url: string | null;
};

export default async function BlogEditPage({
  params,
}: BlogEditPageProps) {
  const { id } = await params;

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
      content,
      thumbnail_url
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-semibold text-black">
          글을 불러오지 못했습니다.
        </h1>

        <p className="mt-3 text-sm text-red-600">
          {error.message}
        </p>
      </main>
    );
  }

  if (!data) {
    notFound();
  }

  const post = data as BlogPost;

  const updateAction =
    updateBlogPost.bind(
      null,
      post.id,
    );

  return (
    <main className="min-h-full bg-[#f7f7f5] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              블로그 수정
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50 md:text-base">
              홈페이지에 표시될 블로그 정보를 수정합니다.
            </p>
          </div>

          <Link
            href="/admin/blog"
            className="inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-black/5"
          >
            목록으로 돌아가기
          </Link>
        </header>

        <form
          action={updateAction}
          className="mt-8 grid gap-6"
        >
          <FormCard
            title="기본 정보"
            description="블로그 제목, 주소, 요약 내용을 수정합니다."
          >
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                  label="제목"
                  name="title"
                  defaultValue={post.title}
                  required
                />

                <TextInput
                  label="슬러그"
                  name="slug"
                  defaultValue={post.slug}
                  required
                />
              </div>

              <TextArea
                label="요약"
                name="excerpt"
                defaultValue={
                  post.excerpt ?? ""
                }
                placeholder="블로그 목록에 표시할 짧은 설명을 입력하세요."
              />
            </div>
          </FormCard>

          <FormCard
            title="본문"
            description="홈페이지 상세페이지에 표시될 내용을 수정합니다."
          >
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/70">
                글 내용
              </span>

              <textarea
                name="content"
                defaultValue={
                  post.content ?? ""
                }
                rows={18}
                placeholder="블로그 본문을 입력하세요."
                className="min-h-[450px] w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-4 text-sm leading-7 text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
              />
            </label>
          </FormCard>

          <FormCard
  title="대표 이미지"
  description="블로그 목록과 상세페이지에 표시될 이미지입니다."
>

  <ImageUploader
    name="thumbnail_url"
    defaultValue={
      post.thumbnail_url ?? ""
    }
    bucket="projects"
    folder="blog"
  />

</FormCard>

          <div className="flex justify-end">
            <SubmitButton>
              변경사항 저장
            </SubmitButton>
          </div>
        </form>
      </div>
    </main>
  );
}