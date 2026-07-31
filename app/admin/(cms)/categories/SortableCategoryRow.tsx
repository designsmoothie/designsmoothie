"use client";

import Link from "next/link";
import {
  CSS,
} from "@dnd-kit/utilities";
import {
  useSortable,
} from "@dnd-kit/sortable";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  display_order: number;
};

type SortableCategoryRowProps = {
  category: AdminCategory;
};

export default function SortableCategoryRow({
  category,
}: SortableCategoryRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform,
    ),
    transition,
    opacity: isDragging ? 0.55 : 1,
    zIndex: isDragging ? 20 : "auto",
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`flex flex-col gap-4 bg-white p-5 md:flex-row md:items-center ${
        isDragging
          ? "relative rounded-2xl shadow-xl"
          : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          aria-label={`${category.name} 순서 변경`}
          {...attributes}
          {...listeners}
          className="flex size-10 shrink-0 cursor-grab items-center justify-center rounded-xl border border-black/10 bg-[#f8f6f1] text-lg text-neutral-500 transition hover:border-[#94b63f] hover:text-[#587019] active:cursor-grabbing"
        >
          ☰
        </button>

        <span
          className="size-5 shrink-0 rounded-full border border-black/10"
          style={{
            backgroundColor:
              category.color ?? "#94b63f",
          }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="truncate text-base font-semibold text-neutral-900">
              {category.name}
            </h2>

            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-500">
              순서 {category.display_order}
            </span>
          </div>

          <p className="mt-2 text-xs text-neutral-500">
            /portfolio/category/
            {category.slug}
          </p>

          <p className="mt-2 line-clamp-1 text-sm text-neutral-500">
            {category.description ||
              "등록된 설명이 없습니다."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end pl-14 md:pl-0">
        <Link
          href={`/admin/categories/${category.id}/edit`}
          className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          수정
        </Link>
      </div>
    </article>
  );
}