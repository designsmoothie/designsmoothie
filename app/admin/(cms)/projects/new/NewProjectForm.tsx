"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";

import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { setThumbnail } from "../actions";

type Category = {
  id: string;
  name: string;
};

type NewProjectFormProps = {
  categories: Category[];
};

type SelectedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

type AiProjectResult = {
  analysis: {
    industry: string;
    colors: string[];
    materials: string[];
    signTypes: string[];
    designFeatures: string[];
  };
  content: {
    summary: string;
    overview: string;
    challenge: string;
    solution: string;
    result: string;
    seoTitle: string;
    seoDescription: string;
  };
};

const MAX_IMAGE_COUNT = 20;
const MAX_AI_IMAGE_COUNT = 4;
const MAX_FILE_SIZE = 30 * 1024 * 1024;

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

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewProjectForm({
  categories,
}: NewProjectFormProps) {

  const supabase = useMemo(
    () => createClient(),
    [],
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] =
    useState(false);

  const [images, setImages] = useState<
    SelectedImage[]
  >([]);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [industry, setIndustry] =
    useState("");

  const [summary, setSummary] =
    useState("");

  const [overview, setOverview] =
    useState("");

  const [challenge, setChallenge] =
    useState("");

  const [solution, setSolution] =
    useState("");

  const [result, setResult] =
    useState("");

  const [seoTitle, setSeoTitle] =
    useState("");

  const [
    seoDescription,
    setSeoDescription,
  ] = useState("");

  const [colors, setColors] = useState<
    string[]
  >([]);

  const [materials, setMaterials] =
    useState<string[]>([]);

  const [signTypes, setSignTypes] =
    useState<string[]>([]);

  const [
    designFeatures,
    setDesignFeatures,
  ] = useState<string[]>([]);

  const inputClass =
    "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#94b63f] focus:ring-4 focus:ring-[#94b63f]/10";

  const labelClass =
    "block text-sm font-semibold text-neutral-700";

  const aiImageCount = Math.min(
    images.length,
    MAX_AI_IMAGE_COUNT,
  );

  const hasAnalysis =
    colors.length > 0 ||
    materials.length > 0 ||
    signTypes.length > 0 ||
    designFeatures.length > 0;

  const imageInputLabel = useMemo(() => {
    if (images.length === 0) {
      return "사진을 먼저 선택해주세요.";
    }

    return `${images.length}장의 사진이 선택되었습니다. AI는 앞의 ${aiImageCount}장을 분석합니다.`;
  }, [aiImageCount, images.length]);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(
          image.previewUrl,
        );
      });
    };
  }, [images]);

  function handleTitleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextTitle = event.target.value;

    setTitle(nextTitle);

    if (!slugEdited) {
      setSlug(makeSlug(nextTitle));
    }
  }

  function handleSlugChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setSlugEdited(true);
    setSlug(
      makeSlug(event.target.value),
    );
  }

  function addFiles(
    fileList: FileList | File[],
  ) {
    const selectedFiles =
      Array.from(fileList);

    if (selectedFiles.length === 0) {
      return;
    }

    const remainingCount =
      MAX_IMAGE_COUNT - images.length;

    if (remainingCount <= 0) {
      setMessage(
        `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있습니다.`,
      );
      return;
    }

    const acceptedFiles =
      selectedFiles.slice(
        0,
        remainingCount,
      );

    const newImages: SelectedImage[] =
      [];

    for (const file of acceptedFiles) {
      if (
        !file.type.startsWith("image/")
      ) {
        setMessage(
          `${file.name}은 이미지 파일이 아닙니다.`,
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setMessage(
          `${file.name}은 30MB를 초과합니다.`,
        );
        continue;
      }

      newImages.push({
        id: crypto.randomUUID(),
        file,
        previewUrl:
          URL.createObjectURL(file),
      });
    }

    setImages((currentImages) => [
      ...currentImages,
      ...newImages,
    ]);

    if (newImages.length > 0) {
      setMessage(
        `${newImages.length}장의 사진을 추가했습니다.`,
      );
    }
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (!event.target.files) {
      return;
    }

    addFiles(event.target.files);

    event.target.value = "";
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();
    setIsDragging(false);

    addFiles(
      event.dataTransfer.files,
    );
  }

  function removeImage(imageId: string) {
    setImages((currentImages) => {
      const selectedImage =
        currentImages.find(
          (image) =>
            image.id === imageId,
        );

      if (selectedImage) {
        URL.revokeObjectURL(
          selectedImage.previewUrl,
        );
      }

      return currentImages.filter(
        (image) =>
          image.id !== imageId,
      );
    });
  }

  async function analyzeImages(
    event: FormEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setMessage(
        "프로젝트명을 먼저 입력해주세요.",
      );
      return;
    }

    if (images.length === 0) {
      setMessage(
        "AI가 분석할 사진을 먼저 선택해주세요.",
      );
      return;
    }

    const form =
      event.currentTarget.closest("form");

    if (!form) {
      setMessage(
        "프로젝트 입력 폼을 찾지 못했습니다.",
      );
      return;
    }

    const currentFormData =
      new FormData(form);

    const aiFormData = new FormData();

    aiFormData.append(
      "title",
      title.trim(),
    );

    aiFormData.append(
      "category",
      String(
        currentFormData.get(
          "categoryName",
        ) ?? "",
      ),
    );

    aiFormData.append(
      "client",
      String(
        currentFormData.get(
          "client",
        ) ?? "",
      ),
    );

    aiFormData.append(
      "location",
      String(
        currentFormData.get(
          "location",
        ) ?? "",
      ),
    );

    aiFormData.append(
      "industry",
      industry.trim(),
    );

    images
      .slice(0, MAX_AI_IMAGE_COUNT)
      .forEach((image) => {
        aiFormData.append(
          "images",
          image.file,
          image.file.name,
        );
      });

    setIsAnalyzing(true);
    setMessage(
      "AI가 사진을 분석하고 프로젝트 글을 작성하고 있습니다...",
    );

    try {
      const response = await fetch(
        "/api/admin/projects/analyze",
        {
          method: "POST",
          body: aiFormData,
        },
      );

      const data =
        (await response.json()) as
          | AiProjectResult
          | {
              message?: string;
            };

      if (!response.ok) {
        throw new Error(
          "message" in data
            ? data.message
            : "AI 이미지 분석에 실패했습니다.",
        );
      }

      if (
        !("analysis" in data) ||
        !("content" in data)
      ) {
        throw new Error(
          "AI 응답 형식이 올바르지 않습니다.",
        );
      }

      setIndustry(
        data.analysis.industry ||
          industry,
      );

      setColors(
        data.analysis.colors ?? [],
      );

      setMaterials(
        data.analysis.materials ?? [],
      );

      setSignTypes(
        data.analysis.signTypes ?? [],
      );

      setDesignFeatures(
        data.analysis
          .designFeatures ?? [],
      );

      setSummary(
        data.content.summary ?? "",
      );

      setOverview(
        data.content.overview ?? "",
      );

      setChallenge(
        data.content.challenge ?? "",
      );

      setSolution(
        data.content.solution ?? "",
      );

      setResult(
        data.content.result ?? "",
      );

      setSeoTitle(
        data.content.seoTitle ?? "",
      );

      setSeoDescription(
        data.content
          .seoDescription ?? "",
      );

      setMessage(
        "사진 분석과 초안 작성이 완료되었습니다. 내용을 확인하고 수정한 뒤 저장해주세요.",
      );
    } catch (error) {
      console.error(
        "AI 이미지 분석 실패:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "AI 이미지 분석에 실패했습니다.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

    async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (images.length === 0) {
      setMessage(
        "프로젝트 사진을 한 장 이상 선택해주세요.",
      );
      return;
    }

    setIsSaving(true);
    setMessage(
      "프로젝트 정보를 저장하고 있습니다...",
    );

    let createdProjectId = "";

    try {
      /*
       * 1. 먼저 프로젝트 정보만 생성합니다.
       * 이미지 원본은 이 요청에 넣지 않습니다.
       */
      const formData = new FormData(
        event.currentTarget,
      );

      formData.delete("images");
      formData.delete("categoryName");

      const response = await fetch(
        "/api/admin/projects/create",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = (await response.json()) as {
        projectId?: string;
        message?: string;
      };

      if (
        !response.ok ||
        !data.projectId
      ) {
        throw new Error(
          data.message ??
            "프로젝트를 생성하지 못했습니다.",
        );
      }

      createdProjectId = data.projectId;

      /*
       * 2. 생성된 프로젝트 ID로 이미지를
       * 최적화하고 Supabase Storage에 올립니다.
       */
      for (const [
        index,
        image,
      ] of images.entries()) {
        setMessage(
          `${index + 1}/${images.length} · ${image.file.name} 이미지를 최적화하고 있습니다...`,
        );

        const {
          file: optimizedFile,
        } = await optimizeImage(
          image.file,
        );

        if (
          optimizedFile.size >
          MAX_UPLOAD_FILE_SIZE
        ) {
          throw new Error(
            `${image.file.name}을 최적화했지만 6MB를 초과합니다.`,
          );
        }

        const storagePath =
          `${createdProjectId}/${crypto.randomUUID()}.webp`;

        setMessage(
          `${index + 1}/${images.length} · 이미지를 업로드하고 있습니다...`,
        );

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
          throw new Error(
            `${image.file.name} 업로드 실패: ${uploadError.message}`,
          );
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("projects")
          .getPublicUrl(storagePath);

        const isThumbnail = index === 0;

        const {
          data: insertedImage,
          error: databaseError,
        } = await supabase
          .from("project_images")
          .insert({
            project_id: createdProjectId,
            storage_path: storagePath,
            public_url: publicUrl,
            original_name:
              image.file.name,
            alt_text: "",
            sort_order: index,
            is_thumbnail: isThumbnail,
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

          throw new Error(
            databaseError?.message ??
              "이미지 정보를 저장하지 못했습니다.",
          );
        }

        /*
         * 첫 이미지를 대표 이미지로 지정하고
         * projects.thumbnail_url도 갱신합니다.
         */
        if (isThumbnail) {
          await setThumbnail(
            createdProjectId,
            insertedImage.id,
          );
        }
      }

      setMessage(
        "프로젝트와 이미지 저장이 완료되었습니다.",
      );

      window.location.href =
        `/admin/projects/${createdProjectId}/edit`;
    } catch (error) {
      console.error(
        "프로젝트 저장 실패:",
        error,
      );

      /*
       * 프로젝트 생성 후 이미지 업로드 중 실패했다면
       * 생성된 프로젝트 수정 화면으로 이동할 수 있게 안내합니다.
       */
      if (createdProjectId) {
        setMessage(
          `${
            error instanceof Error
              ? error.message
              : "이미지 저장에 실패했습니다."
          } 프로젝트 기본 정보는 저장되었으므로 수정 화면에서 이미지를 다시 등록해주세요.`,
        );

        window.setTimeout(() => {
          window.location.href =
            `/admin/projects/${createdProjectId}/edit`;
        }, 2500);
      } else {
        setMessage(
          error instanceof Error
            ? error.message
            : "프로젝트 저장에 실패했습니다.",
        );
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
    >
      {/* 기본 정보 */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
          Basic information
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          기본 정보
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          프로젝트명과 카테고리를 먼저
          입력해주세요.
        </p>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <label className={labelClass}>
            프로젝트명 *
            <input
              name="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="프로젝트명 기재"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            슬러그 *
            <input
              name="slug"
              required
              value={slug}
              onChange={handleSlugChange}
              placeholder="홈페이지 주소 영문기재"
              pattern="[a-z0-9-]+"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            카테고리 *
            <select
              name="categoryId"
              required
              defaultValue=""
              className={inputClass}
              onChange={(event) => {
                const option =
                  event.currentTarget
                    .selectedOptions[0];

                const hiddenInput =
                  event.currentTarget
                    .form?.elements.namedItem(
                      "categoryName",
                    );

                if (
                  hiddenInput instanceof
                  HTMLInputElement
                ) {
                  hiddenInput.value =
                    option?.textContent?.trim() ??
                    "";
                }
              }}
            >
              <option value="" disabled>
                카테고리를 선택하세요
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ),
              )}
            </select>
          </label>

          <input
            type="hidden"
            name="categoryName"
            defaultValue=""
          />

          <label className={labelClass}>
            업종
            <input
              name="industry"
              value={industry}
              onChange={(event) =>
                setIndustry(
                  event.target.value,
                )
              }
              placeholder="사진 분석 후 자동 입력됩니다."
              className={inputClass}
            />
          </label>
        </div>

        <details className="mt-7 overflow-hidden rounded-2xl border border-black/5 bg-[#f8f6f1]">
          <summary className="cursor-pointer list-none px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-700">
                  선택 정보
                </p>

                <p className="mt-1 text-xs font-normal text-neutral-400">
                  부제목, 클라이언트, 제작
                  연도, 지역
                </p>
              </div>

              <span className="text-xs font-semibold text-neutral-400">
                펼치기
              </span>
            </div>
          </summary>

          <div className="grid gap-6 border-t border-black/5 bg-white p-5 md:grid-cols-2">
            <label className={labelClass}>
              부제목
              <input
                name="subtitle"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              클라이언트
              <input
                name="client"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              제작 연도
              <input
                name="year"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              지역
              <input
                name="location"
                className={inputClass}
              />
            </label>
          </div>
        </details>
      </section>

      {/* 사진 선택 */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
          Project images
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          프로젝트 사진
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          사진을 먼저 등록하면 AI가 실제
          이미지를 보고 프로젝트 내용을
          작성합니다.
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
            이미지를 이곳에 끌어놓으세요
          </p>

          <p className="mt-2 text-sm text-neutral-500">
            JPG, PNG, WEBP · 최대{" "}
            {MAX_IMAGE_COUNT}장
          </p>

          <label className="mt-5 cursor-pointer rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
            파일 선택

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <p className="mt-4 text-sm text-neutral-500">
          {imageInputLabel}
        </p>

        {images.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {images.map(
              (image, index) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white"
                >
                  <div className="relative aspect-[4/3] bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        image.previewUrl
                      }
                      alt=""
                      className="size-full object-cover"
                    />

                    {index <
                      MAX_AI_IMAGE_COUNT && (
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
                        removeImage(
                          image.id,
                        )
                      }
                      className="shrink-0 text-xs font-semibold text-red-500"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        <button
          type="button"
          onClick={analyzeImages}
          disabled={
            isAnalyzing ||
            images.length === 0
          }
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#94b63f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#829f35] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isAnalyzing
            ? "사진 분석 중..."
            : "✨ 사진 분석하고 글 작성"}
        </button>
      </section>

      {/* AI 분석 결과 */}
      {hasAnalysis && (
        <section className="rounded-3xl border border-[#94b63f]/20 bg-[#f7faef] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
            AI image analysis
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            AI 사진 분석 결과
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            잘못 판단한 내용은 아래
            프로젝트 글에서 직접 수정할 수
            있습니다.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <AnalysisItem
              title="색상"
              values={colors}
            />

            <AnalysisItem
              title="재질"
              values={materials}
            />

            <AnalysisItem
              title="간판·디자인 종류"
              values={signTypes}
            />

            <AnalysisItem
              title="디자인 특징"
              values={designFeatures}
            />
          </div>
        </section>
      )}

      {/* 프로젝트 글 */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
          Project story
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          프로젝트 내용
        </h2>

        <div className="mt-7 space-y-6">
          <label className={labelClass}>
            요약
            <textarea
              name="summary"
              rows={4}
              value={summary}
              onChange={(event) =>
                setSummary(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            작업 배경
            <textarea
              name="overview"
              rows={6}
              value={overview}
              onChange={(event) =>
                setOverview(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <div className="grid gap-6 md:grid-cols-3">
            <label className={labelClass}>
              Challenge
              <textarea
                name="challenge"
                rows={7}
                value={challenge}
                onChange={(event) =>
                  setChallenge(
                    event.target.value,
                  )
                }
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Solution
              <textarea
                name="solution"
                rows={7}
                value={solution}
                onChange={(event) =>
                  setSolution(
                    event.target.value,
                  )
                }
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              Result
              <textarea
                name="result"
                rows={7}
                value={result}
                onChange={(event) =>
                  setResult(
                    event.target.value,
                  )
                }
                className={inputClass}
              />
            </label>
          </div>
        </div>

        <input
          type="hidden"
          name="services"
          value=""
        />

        <input
          type="hidden"
          name="overviewTitle"
          value="작업 배경"
        />
      </section>

      {/* SEO */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
          Search engine
        </p>

        <h2 className="mt-2 text-xl font-semibold">
          SEO
        </h2>

        <div className="mt-7 space-y-6">
          <label className={labelClass}>
            SEO 제목
            <input
              name="seoTitle"
              value={seoTitle}
              onChange={(event) =>
                setSeoTitle(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            SEO 설명
            <textarea
              name="seoDescription"
              rows={4}
              value={seoDescription}
              onChange={(event) =>
                setSeoDescription(
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>
        </div>
      </section>

      {/* 공개 설정 */}
      <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-semibold">
          공개 설정
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            상태
            <select
              name="status"
              defaultValue="draft"
              className={inputClass}
            >
              <option value="draft">
                작성 중
              </option>

              <option value="published">
                공개
              </option>

              <option value="private">
                비공개
              </option>

              <option value="archived">
                보관
              </option>
            </select>
          </label>

          <label className="flex items-center gap-3 self-end rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-3">
            <input
              type="checkbox"
              name="featured"
              className="size-4 accent-[#94b63f]"
            />

            <span className="text-sm font-semibold">
              홈페이지 대표 프로젝트
            </span>
          </label>
        </div>
      </section>

      {message && (
        <p
          aria-live="polite"
          className="rounded-xl border border-black/5 bg-white px-5 py-4 text-sm text-neutral-600"
        >
          {message}
        </p>
      )}

      <div className="flex justify-end gap-3 pb-10">
        <Link
          href="/admin/projects"
          className="rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold"
        >
          취소
        </Link>

        <button
          type="submit"
          disabled={
            isSaving || isAnalyzing
          }
          className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving
            ? "프로젝트 저장 중..."
            : "프로젝트 저장"}
        </button>
      </div>
    </form>
  );
}

function AnalysisItem({
  title,
  values,
}: {
  title: string;
  values: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#94b63f]/15 bg-white p-5">
      <p className="text-sm font-semibold text-neutral-700">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {values.length > 0 ? (
          values.map((value) => (
            <span
              key={value}
              className="rounded-full bg-[#94b63f]/10 px-3 py-1.5 text-xs font-semibold text-[#5f781e]"
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-sm text-neutral-400">
            확인되지 않음
          </span>
        )}
      </div>
    </div>
  );
}