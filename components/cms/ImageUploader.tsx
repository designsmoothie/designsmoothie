"use client";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  DragEvent,
} from "react";

import {
  createClient,
} from "@/lib/supabase/client";

type ImageUploaderProps = {
  name: string;
  defaultValue?: string;
  label?: string;
  description?: string;
  bucket?: string;
  folder?: string;
};

const MAX_ORIGINAL_FILE_SIZE =
  30 * 1024 * 1024;

const MAX_UPLOAD_FILE_SIZE =
  6 * 1024 * 1024;

const MAX_IMAGE_DIMENSION = 2400;
const WEBP_QUALITY = 0.82;

type OptimizedImage = {
  file: File;
  width: number;
  height: number;
};

async function optimizeImage(
  originalFile: File,
): Promise<OptimizedImage> {
  const bitmap =
    await createImageBitmap(originalFile);

  const longestSide = Math.max(
    bitmap.width,
    bitmap.height,
  );

  const scale = Math.min(
    1,
    MAX_IMAGE_DIMENSION / longestSide,
  );

  const width = Math.max(
    1,
    Math.round(bitmap.width * scale),
  );

  const height = Math.max(
    1,
    Math.round(bitmap.height * scale),
  );

  const canvas =
    document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();

    throw new Error(
      "이미지 최적화 화면을 만들지 못했습니다.",
    );
  }

  context.drawImage(
    bitmap,
    0,
    0,
    width,
    height,
  );

  bitmap.close();

  const blob = await new Promise<Blob>(
    (resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(
              new Error(
                "이미지를 WebP로 변환하지 못했습니다.",
              ),
            );

            return;
          }

          resolve(result);
        },
        "image/webp",
        WEBP_QUALITY,
      );
    },
  );

  const baseName = originalFile.name.replace(
    /\.[^.]+$/,
    "",
  );

  const optimizedFile = new File(
    [blob],
    `${baseName}.webp`,
    {
      type: "image/webp",
      lastModified: Date.now(),
    },
  );

  return {
    file: optimizedFile,
    width,
    height,
  };
}

export default function ImageUploader({
  name,
  defaultValue = "",
  label = "대표 이미지",
  description = "이미지를 끌어놓거나 파일을 선택하세요.",
  bucket = "projects",
  folder = "blog",
}: ImageUploaderProps) {
  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] =
    useState(defaultValue);

  const [isUploading, setIsUploading] =
    useState(false);

  const [isDragging, setIsDragging] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function uploadFile(
    originalFile: File,
  ) {
    if (
      !originalFile.type.startsWith(
        "image/",
      )
    ) {
      setMessage(
        "이미지 파일만 업로드할 수 있습니다.",
      );

      return;
    }

    if (
      originalFile.size >
      MAX_ORIGINAL_FILE_SIZE
    ) {
      setMessage(
        "원본 이미지 용량은 30MB 이하여야 합니다.",
      );

      return;
    }

    setIsUploading(true);
    setMessage(
      "이미지를 최적화하고 있습니다...",
    );

    try {
      const {
        file: optimizedFile,
      } = await optimizeImage(
        originalFile,
      );

      if (
        optimizedFile.size >
        MAX_UPLOAD_FILE_SIZE
      ) {
        throw new Error(
          "이미지를 최적화했지만 6MB를 초과합니다.",
        );
      }

      const normalizedFolder =
        folder
          .replace(/^\/+/, "")
          .replace(/\/+$/, "");

      const storagePath =
        `${normalizedFolder}/${crypto.randomUUID()}.webp`;

      setMessage(
        "이미지를 업로드하고 있습니다...",
      );

      const {
        error: uploadError,
      } = await supabase.storage
        .from(bucket)
        .upload(
          storagePath,
          optimizedFile,
          {
            cacheControl: "31536000",
            upsert: false,
            contentType: "image/webp",
          },
        );

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: {
          publicUrl,
        },
      } = supabase.storage
        .from(bucket)
        .getPublicUrl(storagePath);

      setImageUrl(publicUrl);

      setMessage(
        "이미지 업로드가 완료되었습니다. 아래 저장 버튼을 눌러 적용하세요.",
      );
    } catch (error) {
      console.error(
        "이미지 업로드 실패:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "이미지 업로드에 실패했습니다.",
      );
    } finally {
      setIsUploading(false);
      setIsDragging(false);
    }
  }

  async function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    await uploadFile(file);

    event.target.value = "";
  }

  async function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(false);

    if (isUploading) {
      return;
    }

    const file =
      event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    await uploadFile(file);
  }

  function clearImage() {
    const confirmed = window.confirm(
      "현재 대표 이미지를 비울까요?\n저장 버튼을 눌러야 최종 반영됩니다.",
    );

    if (!confirmed) {
      return;
    }

    setImageUrl("");
    setMessage(
      "대표 이미지가 비워졌습니다. 아래 저장 버튼을 눌러 적용하세요.",
    );
  }

  return (
    <div className="grid gap-4">
      <input
        type="hidden"
        name={name}
        value={imageUrl}
      />

      <div>
        <p className="text-sm font-medium text-black/70">
          {label}
        </p>

        <p className="mt-1 text-sm leading-6 text-black/45">
          {description}
        </p>
      </div>

      {imageUrl && (
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
          <img
            src={imageUrl}
            alt="업로드된 대표 이미지 미리보기"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      )}

      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
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

          setIsDragging(false);
        }}
        onDrop={handleDrop}
        className={`flex min-h-44 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
          isDragging
            ? "border-[#94b63f] bg-[#94b63f]/10"
            : "border-black/15 bg-[#f8f6f1]"
        }`}
      >
        <p className="text-sm font-semibold text-neutral-800">
          {isUploading
            ? "이미지를 처리하고 있습니다..."
            : "이미지를 이곳에 끌어놓으세요"}
        </p>

        <p className="mt-2 text-xs leading-5 text-neutral-500">
          JPG, PNG, WEBP · 최대 30MB
          <br />
          업로드 시 최대 2400px WebP로 자동 최적화
        </p>

        <button
          type="button"
          disabled={isUploading}
          onClick={() => {
            inputRef.current?.click();
          }}
          className={`mt-5 rounded-xl px-5 py-3 text-sm font-semibold !text-white transition ${
            isUploading
              ? "cursor-not-allowed bg-neutral-400"
              : "bg-neutral-950 hover:bg-neutral-800"
          }`}
        >
          {isUploading
            ? "업로드 중..."
            : imageUrl
              ? "이미지 변경"
              : "파일 선택"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isUploading}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {message && (
        <p className="rounded-xl bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-600">
          {message}
        </p>
      )}

      {imageUrl && (
        <button
          type="button"
          onClick={clearImage}
          disabled={isUploading}
          className="w-fit text-sm font-medium text-red-500 transition hover:text-red-700"
        >
          대표 이미지 비우기
        </button>
      )}
    </div>
  );
}