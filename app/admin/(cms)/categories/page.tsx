import ColorInput from "@/components/cms/ColorInput";
import FormCard from "@/components/cms/FormCard";
import SubmitButton from "@/components/cms/SubmitButton";
import TextArea from "@/components/cms/TextArea";
import TextInput from "@/components/cms/TextInput";
import { createClient } from "@/lib/supabase/server";
import CategorySortableList from "./CategorySortableList";
import type {
  AdminCategory,
} from "./SortableCategoryRow";

import {
  createCategory,
} from "./actions";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  display_order: number | null;
};

export default async function CategoriesPage() {
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
      color,
      display_order
    `)
    .order("display_order", {
      ascending: true,
    });

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

 const categories =
  (data ?? []).map((category) => ({
    ...category,
    display_order:
      category.display_order ?? 0,
  })) as AdminCategory[];

  return (
    <main className="min-h-full bg-[#f7f7f5] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-medium text-[#94b63f]">
            Design SMOOTHIE CMS
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black md:text-4xl">
            카테고리 관리
          </h1>

          <p className="mt-3 text-sm leading-6 text-black/50 md:text-base">
            홈페이지 포트폴리오 분류를 추가하고 수정합니다.
          </p>
        </header>

        <div className="mt-8">
          <FormCard
            title="새 카테고리 추가"
            description="포트폴리오에 사용할 새 분류를 등록합니다."
          >
            <form
              action={createCategory}
              className="grid gap-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                  label="카테고리 이름"
                  name="name"
                  placeholder="예: Branding"
                  required
                />

                <TextInput
                  label="슬러그"
                  name="slug"
                  placeholder="비워두면 이름으로 자동 생성"
                />
              </div>

              <TextArea
                label="설명"
                name="description"
                placeholder="카테고리 설명을 입력하세요."
              />

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <ColorInput
                  label="대표 색상"
                  name="color"
                  defaultValue="#94b63f"
                />

                <SubmitButton>
                  카테고리 추가
                </SubmitButton>
              </div>
            </form>
          </FormCard>
        </div>

        <section className="mt-8">
  <div className="mb-5">
    <h2 className="text-xl font-semibold text-black">
      등록된 카테고리
    </h2>

    <p className="mt-1 text-sm text-black/45">
      드래그해서 홈페이지 노출 순서를 변경할 수 있습니다.
    </p>
  </div>

  {categories.length === 0 ? (
    <div className="rounded-2xl border border-black/10 bg-white px-6 py-16 text-center">
      <p className="text-base font-medium text-black/65">
        등록된 카테고리가 없습니다.
      </p>

      <p className="mt-2 text-sm text-black/40">
        위 입력란에서 새 카테고리를 추가해주세요.
      </p>
    </div>
  ) : (
    <CategorySortableList
      initialCategories={categories}
    />
  )}
</section>
      </div>
    </main>
  );
}