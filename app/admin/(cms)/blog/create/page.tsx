import Link from "next/link";

import FormCard from "@/components/cms/FormCard";
import SubmitButton from "@/components/cms/SubmitButton";
import TextArea from "@/components/cms/TextArea";
import TextInput from "@/components/cms/TextInput";

import {
  createBlogPost,
} from "../actions";

export default function CreateBlogPostPage() {
  return (
    <main className="min-h-full bg-[#f7f7f5] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              새 블로그 글 작성
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50 md:text-base">
              홈페이지 블로그에 노출할 글을 작성합니다.
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
          action={createBlogPost}
          className="mt-8 grid gap-6"
        >
          <FormCard
            title="기본 정보"
            description="글 제목과 주소, 요약 내용을 입력합니다."
          >
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                  label="제목"
                  name="title"
                  placeholder="예: 부산 간판 디자인, 어떤 재질이 좋을까?"
                  required
                />

                <TextInput
                  label="슬러그"
                  name="slug"
                  placeholder="비워두면 제목으로 자동 생성"
                />
              </div>

              <TextArea
                label="요약"
                name="excerpt"
                placeholder="목록과 검색결과에 표시할 짧은 설명을 입력하세요."
              />
            </div>
          </FormCard>

          <FormCard
            title="본문"
            description="현재는 기본 텍스트 입력 방식이며, 이후 에디터로 확장합니다."
          >
            <label className="grid gap-2">
              <span className="text-sm font-medium text-black/70">
                글 내용
              </span>

              <textarea
                name="content"
                rows={18}
                placeholder="블로그 본문을 입력하세요."
                className="min-h-[420px] resize-y rounded-xl border border-black/10 bg-white px-4 py-4 text-sm leading-7 text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
              />
            </label>
          </FormCard>

          <FormCard
            title="썸네일"
            description="우선 이미지 주소 방식으로 연결하고, 다음 단계에서 직접 업로드 기능을 붙입니다."
          >
            <TextInput
              label="썸네일 이미지 URL"
              name="thumbnail_url"
              placeholder="https://..."
            />
          </FormCard>

          <FormCard
            title="발행 설정"
            description="글의 공개 상태와 대표글 여부를 지정합니다."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-black/70">
                  상태
                </span>

                <select
                  name="status"
                  defaultValue="draft"
                  className="h-12 rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/30"
                >
                  <option value="draft">
                    임시저장
                  </option>

                  <option value="published">
                    게시
                  </option>

                  <option value="archived">
                    보관
                  </option>
                </select>
              </label>

              <label className="flex h-12 items-center gap-3 self-end rounded-xl border border-black/10 bg-white px-4">
                <input
                  type="checkbox"
                  name="featured"
                  className="size-4"
                />

                <span className="text-sm font-medium text-black/70">
                  대표글로 설정
                </span>
              </label>
            </div>
          </FormCard>

          <FormCard
            title="SEO"
            description="검색엔진과 공유 화면에 표시할 정보를 입력합니다."
          >
            <div className="grid gap-5">
              <TextInput
                label="SEO 제목"
                name="seo_title"
                placeholder="비워두면 글 제목을 사용합니다."
              />

              <TextArea
                label="SEO 설명"
                name="seo_description"
                placeholder="검색결과에 표시할 설명을 입력하세요."
              />
            </div>
          </FormCard>

          <div className="flex justify-end">
            <SubmitButton>
              블로그 글 저장
            </SubmitButton>
          </div>
        </form>
      </div>
    </main>
  );
}