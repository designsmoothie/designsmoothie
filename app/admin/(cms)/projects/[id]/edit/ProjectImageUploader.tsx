"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ChangeEvent,
  DragEvent,
} from "react";

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { createClient } from "@/lib/supabase/client";

import {
  setThumbnail,
  updateProjectImageOrder,
} from "../../actions";

import SortableProjectImage, {
  type ProjectImage,
} from "./SortableProjectImage";

type ProjectImageUploaderProps = {
  projectId: string;
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

export default function ProjectImageUploader({
  projectId,
}: ProjectImageUploaderProps) {
  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const [images, setImages] = useState<
    ProjectImage[]
  >([]);

  const [isUploading, setIsUploading] =
    useState(false);

  const [isDragging, setIsDragging] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const loadImages = useCallback(async () => {
    const { data, error } = await supabase
      .from("project_images")
      .select(`
        id,
        storage_path,
        public_url,
        original_name,
        alt_text,
        sort_order,
        is_thumbnail
      `)
      .eq("project_id", projectId)
      .order("sort_order", {
        ascending: true,
      });

    if (error) {
      console.error(
        "이미지 불러오기 실패:",
        error,
      );

      setMessage(
        "이미지를 불러오지 못했습니다.",
      );

      return;
    }

    setImages(data ?? []);
  }, [projectId, supabase]);

  useEffect(() => {
    void loadImages();
  }, [loadImages]);

  async function uploadFiles(
    fileList: FileList | File[],
  ) {
    const files = Array.from(fileList);

    if (files.length === 0) {
      return;
    }

    setMessage("");
    setIsUploading(true);

    try {
      const currentImageCount =
        images.length;

      for (const [
        index,
        originalFile,
      ] of files.entries()) {
        if (
          !originalFile.type.startsWith(
            "image/",
          )
        ) {
          throw new Error(
            `${originalFile.name}은 이미지 파일이 아닙니다.`,
          );
        }

        if (
          originalFile.size >
          MAX_ORIGINAL_FILE_SIZE
        ) {
          throw new Error(
            `${originalFile.name}은 원본 기준 30MB를 초과합니다.`,
          );
        }

        setMessage(
          `${originalFile.name} 이미지를 최적화하고 있습니다...`,
        );

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
            `${originalFile.name}을 최적화했지만 여전히 6MB를 초과합니다.`,
          );
        }

        const storagePath =
          `${projectId}/${crypto.randomUUID()}.webp`;

        const { error: uploadError } =
          await supabase.storage
            .from("projects")
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
          data: { publicUrl },
        } = supabase.storage
          .from("projects")
          .getPublicUrl(storagePath);

        const shouldBeThumbnail =
          currentImageCount === 0 &&
          index === 0;

                  const {
          data: insertedImage,
          error: databaseError,
        } = await supabase
          .from("project_images")
          .insert({
            project_id: projectId,
            storage_path: storagePath,
            public_url: publicUrl,
            original_name:
              originalFile.name,
            alt_text: "",
            sort_order:
              currentImageCount + index,
            is_thumbnail:
              shouldBeThumbnail,
            file_size:
              optimizedFile.size,
          })
          .select("id")
          .single();

        if (
          databaseError ||
          !insertedImage
        ) {
          await supabase.storage
            .from("projects")
            .remove([storagePath]);

          throw (
            databaseError ??
            new Error(
              "이미지 정보를 저장하지 못했습니다.",
            )
          );
        }

        if (shouldBeThumbnail) {
          await setThumbnail(
            projectId,
            insertedImage.id,
          );
        }
      }

      await loadImages();

      setMessage(
        `${files.length}개의 이미지 업로드가 완료되었습니다.`,
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
    const selectedFiles =
      event.target.files;

    if (!selectedFiles) {
      return;
    }

    await uploadFiles(selectedFiles);

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

    await uploadFiles(
      event.dataTransfer.files,
    );
  }

  async function makeThumbnail(
    image: ProjectImage,
  ) {
    if (image.is_thumbnail) {
      setMessage(
        "이미 대표 이미지로 지정되어 있습니다.",
      );

      return;
    }

    setMessage(
      "대표 이미지를 변경하고 있습니다...",
    );

    try {
      await setThumbnail(
        projectId,
        image.id,
      );

      await loadImages();

      setMessage(
        "대표 이미지가 변경되었습니다.",
      );
    } catch (error) {
      console.error(
        "대표 이미지 변경 실패:",
        error,
      );

      setMessage(
        "대표 이미지를 변경하지 못했습니다.",
      );
    }
  }

  async function deleteImage(
    image: ProjectImage,
  ) {
    const confirmed = window.confirm(
      "이 이미지를 삭제할까요?",
    );

    if (!confirmed) {
      return;
    }

    setMessage(
      "이미지를 삭제하고 있습니다...",
    );

    const { error: storageError } =
      await supabase.storage
        .from("projects")
        .remove([image.storage_path]);

    if (storageError) {
      console.error(
        "Storage 삭제 실패:",
        storageError,
      );

      setMessage(
        "이미지 파일을 삭제하지 못했습니다.",
      );

      return;
    }

    const { error: databaseError } =
      await supabase
        .from("project_images")
        .delete()
        .eq("id", image.id)
        .eq("project_id", projectId);

    if (databaseError) {
      console.error(
        "이미지 정보 삭제 실패:",
        databaseError,
      );

      setMessage(
        "이미지 정보를 삭제하지 못했습니다.",
      );

      return;
    }

    const remainingImages =
      images.filter(
        (item) => item.id !== image.id,
      );

    if (image.is_thumbnail) {
      const nextThumbnail =
        remainingImages[0];

      if (nextThumbnail) {
        try {
          await setThumbnail(
            projectId,
            nextThumbnail.id,
          );
        } catch (error) {
          console.error(
            "새 대표 이미지 지정 실패:",
            error,
          );
        }
      } else {
        const { error: clearError } =
          await supabase
            .from("projects")
            .update({
              thumbnail_url: null,
            })
            .eq("id", projectId);

        if (clearError) {
          console.error(
            "대표 이미지 URL 초기화 실패:",
            clearError,
          );
        }
      }
    }

    await loadImages();

    setMessage(
      "이미지가 삭제되었습니다.",
    );
  }

  async function handleImageDragEnd(
    event: DragEndEvent,
  ) {
    const { active, over } = event;

    if (
      !over ||
      active.id === over.id
    ) {
      return;
    }

    const oldIndex = images.findIndex(
      (image) =>
        image.id === active.id,
    );

    const newIndex = images.findIndex(
      (image) =>
        image.id === over.id,
    );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }

    const previousImages = images;

    const reorderedImages = arrayMove(
      images,
      oldIndex,
      newIndex,
    ).map((image, index) => ({
      ...image,
      sort_order: index,
    }));

    setImages(reorderedImages);

    setMessage(
      "이미지 순서를 저장하고 있습니다...",
    );

    try {
      await updateProjectImageOrder(
        projectId,
        reorderedImages.map(
          (image, index) => ({
            id: image.id,
            sort_order: index,
          }),
        ),
      );

      setMessage(
        "이미지 순서가 저장되었습니다.",
      );
    } catch (error) {
      console.error(
        "이미지 순서 변경 실패:",
        error,
      );

      setImages(previousImages);

      setMessage(
        "이미지 순서를 저장하지 못했습니다.",
      );
    }
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        Project images
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        프로젝트 이미지
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        이미지를 끌어놓거나 파일을
        선택하세요. 첫 번째 이미지는
        자동으로 대표 이미지가 됩니다.
      </p>

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
        className={`mt-6 flex min-h-52 flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
          isDragging
            ? "border-[#94b63f] bg-[#94b63f]/10"
            : "border-black/15 bg-[#f8f6f1]"
        }`}
      >
        <p className="text-base font-semibold text-neutral-800">
          {isUploading
            ? "이미지를 최적화하고 업로드하고 있습니다..."
            : "이미지를 이곳에 끌어놓으세요"}
        </p>

        <p className="mt-2 text-sm text-neutral-500">
          JPG, PNG, WEBP · 업로드 시
          최대 2400px WebP로 자동 최적화
        </p>

        <label
          className={`mt-5 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
            isUploading
              ? "cursor-not-allowed bg-neutral-400"
              : "cursor-pointer bg-neutral-950 hover:bg-neutral-800"
          }`}
        >
          {isUploading
            ? "업로드 중..."
            : "파일 선택"}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={isUploading}
            onChange={handleInputChange}
            className="hidden"
          />
        </label>
      </div>

      {message && (
        <p className="mt-4 rounded-xl bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
          {message}
        </p>
      )}

      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={
            closestCenter
          }
          onDragEnd={
            handleImageDragEnd
          }
        >
          <SortableContext
            items={images.map(
              (image) => image.id,
            )}
            strategy={
              rectSortingStrategy
            }
          >
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <SortableProjectImage
                  key={image.id}
                  image={image}
                  onMakeThumbnail={
                    makeThumbnail
                  }
                  onDelete={
                    deleteImage
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length === 0 &&
        !isUploading && (
          <div className="mt-8 rounded-2xl border border-black/5 bg-neutral-50 px-6 py-10 text-center">
            <p className="text-sm text-neutral-400">
              등록된 이미지가 없습니다.
            </p>
          </div>
        )}
    </section>
  );
}

