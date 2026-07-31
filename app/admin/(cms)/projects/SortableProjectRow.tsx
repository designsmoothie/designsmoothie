"use client";

import Link from "next/link";
import {
  CSS,
} from "@dnd-kit/utilities";
import {
  useSortable,
} from "@dnd-kit/sortable";

export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  status: string;
  featured: boolean;
  thumbnail_url: string | null;
  updated_at: string;
  display_order: number;
  categoryName: string;
};

type SortableProjectRowProps = {
  project: AdminProject;
};

function getStatusLabel(status: string) {
  switch (status) {
    case "published":
      return "공개";

    case "private":
      return "비공개";

    case "archived":
      return "보관";

    default:
      return "작성 중";
  }
}

export default function SortableProjectRow({
  project,
}: SortableProjectRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
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
          aria-label={`${project.title} 순서 변경`}
          {...attributes}
          {...listeners}
          className="flex size-10 shrink-0 cursor-grab items-center justify-center rounded-xl border border-black/10 bg-[#f8f6f1] text-lg text-neutral-500 transition hover:border-[#94b63f] hover:text-[#587019] active:cursor-grabbing"
        >
          ☰
        </button>

        <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
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
            <h2 className="truncate text-base font-semibold text-neutral-900">
              {project.title}
            </h2>

            {project.featured && (
              <span className="rounded-full bg-[#94b63f]/15 px-2.5 py-1 text-xs font-semibold text-[#587019]">
                Featured
              </span>
            )}

            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              {getStatusLabel(project.status)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
            <span>{project.categoryName}</span>
            <span>/{project.slug}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pl-14 md:justify-end md:pl-0">
        <span className="text-xs text-neutral-400">
          {new Date(
            project.updated_at,
          ).toLocaleDateString("ko-KR")}
        </span>

        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          수정
        </Link>
      </div>
    </article>
  );
}

