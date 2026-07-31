import Link from "next/link";
import { notFound } from "next/navigation";

import ColorInput from "@/components/cms/ColorInput";
import FormCard from "@/components/cms/FormCard";
import SubmitButton from "@/components/cms/SubmitButton";
import TextArea from "@/components/cms/TextArea";
import TextInput from "@/components/cms/TextInput";
import { createClient } from "@/lib/supabase/server";

import {
  deleteCategory,
  updateCategory,
} from "../../actions";

import DeleteCategoryButton from "./DeleteCategoryButton";

type CategoryEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
};

export default async function CategoryEditPage({
  params,
}: CategoryEditPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      description,
      color
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-semibold text-black">
          카테고리를 불러오지 못했습니다.
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

  const category = data as Category;

  const updateAction =
    updateCategory.bind(
      null,
      category.id,
    );

  const deleteAction =
    deleteCategory.bind(
      null,
      category.id,
    );

  return (
    <main className="min-h-full bg-[#f7f7f5] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#94b63f]">
              Design SMOOTHIE CMS
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              카테고리 수정
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50 md:text-base">
              카테고리 정보와 홈페이지 노출 내용을 수정합니다.
            </p>
          </div>

          <Link
            href="/admin/categories"
            className="inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-black/5"
          >
            목록으로 돌아가기
          </Link>
        </header>

        <div className="mt-8">
          <FormCard
            title={category.name}
            description={`/portfolio/category/${category.slug}`}
          >
            <form
              action={updateAction}
              className="grid gap-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                  label="카테고리 이름"
                  name="name"
                  defaultValue={category.name}
                  required
                />

                <TextInput
                  label="슬러그"
                  name="slug"
                  defaultValue={category.slug}
                  required
                />
              </div>

              <TextArea
                label="설명"
                name="description"
                defaultValue={
                  category.description ?? ""
                }
                placeholder="카테고리 설명을 입력하세요."
              />

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <ColorInput
                  label="대표 색상"
                  name="color"
                  defaultValue={
                    category.color ??
                    "#94b63f"
                  }
                />

                <SubmitButton>
                  변경사항 저장
                </SubmitButton>
              </div>
            </form>
          </FormCard>

          <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6">
            <h2 className="text-lg font-semibold text-red-600">
              카테고리 삭제
            </h2>

            <p className="mt-2 text-sm leading-6 text-black/45">
              연결된 프로젝트가 있는 카테고리는 삭제할 수 없습니다.
              삭제한 카테고리는 복구할 수 없습니다.
            </p>

            <form
              action={deleteAction}
              className="mt-5"
            >
              <DeleteCategoryButton
                categoryName={category.name}
              />
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}