"use client";

import type {
  ChangeEvent,
  DragEvent,
} from "react";

type SelectedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

type ImageUploadSectionProps = {
  images: SelectedImage[];
  isDragging: boolean;
  isAnalyzing: boolean;
  imageInputLabel: string;
  maxImageCount: number;
  maxAiImageCount: number;
  onFileChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onDrop: (
    event: DragEvent<HTMLDivElement>,
  ) => void;
  onDragStateChange: (
    isDragging: boolean,
  ) => void;
  onRemoveImage: (
    imageId: string,
  ) => void;
  onAnalyzeImages: () => void;
};

export default function ImageUploadSection({
  images,
  isDragging,
  isAnalyzing,
  imageInputLabel,
  maxImageCount,
  maxAiImageCount,
  onFileChange,
  onDrop,
  onDragStateChange,
  onRemoveImage,
  onAnalyzeImages,
}: ImageUploadSectionProps) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        Project images
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        프로젝트 사진
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        사진을 먼저 등록하면 AI가 실제 이미지를
        분석합니다.
      </p>

      <div
        onDragEnter={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          onDragStateChange(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();

          if (
            event.currentTarget.contains(
              event.relatedTarget as Node,
            )
          ) {
            return;
          }

          onDragStateChange(false);
        }}
        onDrop={onDrop}
        className={`mt-6 flex min-h-52 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
          isDragging
            ? "border-[#94b63f] bg-[#94b63f]/10"
            : "border-black/15 bg-[#f8f6f1]"
        }`}
      >
        <p className="text-base font-semibold text-neutral-800">
          이미지를 이곳에 끌어놓으세요
        </p>

        <p className="mt-2 text-sm text-neutral-500">
          JPG, PNG, WEBP · 최대{" "}
          {maxImageCount}장
        </p>

        <label className="mt-5 cursor-pointer rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
          파일 선택

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        {imageInputLabel}
      </p>

      {images.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.previewUrl}
                  alt=""
                  className="size-full object-cover"
                />

                {index <
                  maxAiImageCount && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#94b63f] px-3 py-1 text-xs font-semibold text-white">
                    AI 분석
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 p-3">
                <p className="truncate text-xs text-neutral-500">
                  {image.file.name}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    onRemoveImage(image.id)
                  }
                  className="shrink-0 text-xs font-semibold text-red-500"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onAnalyzeImages}
        disabled={
          isAnalyzing ||
          images.length === 0
        }
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#94b63f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#829f35] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAnalyzing
          ? "사진 분석 중..."
          : "✨ 사진 분석"}
      </button>
    </section>
  );
}