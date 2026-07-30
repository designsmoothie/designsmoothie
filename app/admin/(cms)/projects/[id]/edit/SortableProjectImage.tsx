"use client";

import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ProjectImage = {
  id: string;
  storage_path: string;
  public_url: string;
  original_name: string | null;
  alt_text: string;
  sort_order: number;
  is_thumbnail: boolean;
};

type SortableProjectImageProps = {
  image: ProjectImage;
  onMakeThumbnail: (
    image: ProjectImage,
  ) => void;
  onDelete: (
    image: ProjectImage,
  ) => void;
};

export default function SortableProjectImage({
  image,
  onMakeThumbnail,
  onDelete,
}: SortableProjectImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
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
      className={`overflow-hidden rounded-2xl border border-black/10 bg-white ${
        isDragging
          ? "relative shadow-xl"
          : ""
      }`}
    >
      <div className="relative aspect-[4/3] bg-neutral-100">
        <img
          src={image.public_url}
          alt={
            image.alt_text ||
            image.original_name ||
            ""
          }
          className="h-full w-full object-cover"
        />

        {image.is_thumbnail && (
          <span className="absolute left-3 top-3 rounded-full bg-[#94b63f] px-3 py-1 text-xs font-semibold text-white">
            대표 이미지
          </span>
        )}

        <button
          type="button"
          aria-label="이미지 순서 변경"
          {...attributes}
          {...listeners}
          className="absolute right-3 top-3 flex size-10 cursor-grab items-center justify-center rounded-xl bg-black/70 text-lg text-white backdrop-blur transition hover:bg-black active:cursor-grabbing"
        >
          ☰
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <p className="min-w-0 truncate text-xs text-neutral-500">
          {image.original_name ?? "image"}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          {!image.is_thumbnail && (
            <button
              type="button"
              onClick={() =>
                onMakeThumbnail(image)
              }
              className="rounded-lg bg-[#94b63f]/15 px-3 py-2 text-xs font-semibold text-[#587019] transition hover:bg-[#94b63f]/25"
            >
              대표로 지정
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(image)}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
          >
            삭제
          </button>
        </div>
      </div>
    </article>
  );
}