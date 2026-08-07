"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";

import { createClient } from "@/lib/supabase/client";
import { setThumbnail } from "../actions";

import AiAnalysisSection from "./components/AiAnalysisSection";
import BasicInfoSection from "./components/BasicInfoSection";
import ImageUploadSection from "./components/ImageUploadSection";
import ProjectStorySection from "./components/ProjectStorySection";
import PublishSection from "./components/PublishSection";
import SeoSection from "./components/SeoSection";

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

type AiVisualAnalysis = {
  industry: string;
  businessType: string;
  mainColors: string[];
  subColors: string[];
  materials: string[];
  signTypes: string[];
  lighting: string[];
  styles: string[];
  designFeatures: string[];
  visualPoints: string[];
  keywords: string[];
  designerMemo: string;
  confidence: {
    industry: number;
    materials: number;
    signTypes: number;
    lighting: number;
    overall: number;
  };
};

type OptimizedImage = {
  file: File;
  width: number;
  height: number;
};

const MAX_IMAGE_COUNT = 20;
const MAX_AI_IMAGE_COUNT = 4;

const MAX_ORIGINAL_FILE_SIZE =
  30 * 1024 * 1024;

const MAX_UPLOAD_FILE_SIZE =
  6 * 1024 * 1024;

const MAX_IMAGE_DIMENSION = 2400;
const WEBP_QUALITY = 0.82;

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function joinValues(values: string[]) {
  return values
    .map((value) => value.trim())
    .filter(Boolean)
    .join(", ");
}

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

  const baseName =
    originalFile.name.replace(
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

  const [
    projectType,
    setProjectType,
  ] = useState("design");

  const [
    previewType,
    setPreviewType,
  ] = useState("image");

  const [liveUrl, setLiveUrl] =
    useState("");

  const [images, setImages] = useState<
    SelectedImage[]
  >([]);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [industry, setIndustry] =
    useState("");

  const [businessType, setBusinessType] =
    useState("");

  const [mainColors, setMainColors] =
    useState("");

  const [subColors, setSubColors] =
    useState("");

  const [materials, setMaterials] =
    useState("");

  const [signTypes, setSignTypes] =
    useState("");

  const [lighting, setLighting] =
    useState("");

  const [styles, setStyles] =
    useState("");

  const [
    designFeatures,
    setDesignFeatures,
  ] = useState("");

  const [visualPoints, setVisualPoints] =
    useState("");

  const [keywords, setKeywords] =
    useState("");

  const [designerMemo, setDesignerMemo] =
    useState("");

  const [confidence, setConfidence] =
    useState({
      industry: 0,
      materials: 0,
      signTypes: 0,
      lighting: 0,
      overall: 0,
    });

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

  const inputClass =
    "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-[#94b63f] focus:ring-4 focus:ring-[#94b63f]/10";

  const labelClass =
    "block text-sm font-semibold text-neutral-700";

  const aiImageCount = Math.min(
    images.length,
    MAX_AI_IMAGE_COUNT,
  );

  const hasAnalysis =
    Boolean(industry.trim()) ||
    Boolean(businessType.trim()) ||
    Boolean(mainColors.trim()) ||
    Boolean(materials.trim()) ||
    Boolean(signTypes.trim()) ||
    confidence.overall > 0;

  const imageInputLabel =
    images.length === 0
      ? projectType === "website"
        ? "대표 이미지가 필요하면 선택해주세요."
        : "사진을 먼저 선택해주세요."
      : `${images.length}장의 사진이 선택되었습니다. AI는 앞의 ${aiImageCount}장을 분석합니다.`;

  function handleTitleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const nextTitle =
      event.target.value;

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

  function handleProjectTypeChange(
    value: string,
  ) {
    setProjectType(value);

    if (value === "design") {
      setPreviewType("image");
      setLiveUrl("");
    }
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

      if (
        file.size >
        MAX_ORIGINAL_FILE_SIZE
      ) {
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

    if (newImages.length === 0) {
      return;
    }

    setImages((currentImages) => [
      ...currentImages,
      ...newImages,
    ]);

    setMessage(
      `${newImages.length}장의 사진을 추가했습니다.`,
    );
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

  async function analyzeImages() {
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
      document.querySelector<HTMLFormElement>(
        "form",
      );

    if (!form) {
      setMessage(
        "프로젝트 입력 폼을 찾지 못했습니다.",
      );

      return;
    }

    setIsAnalyzing(true);

    setMessage(
      "AI가 프로젝트 사진을 분석하고 있습니다...",
    );

    try {
      const currentFormData =
        new FormData(form);

      const aiFormData =
        new FormData();

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

      const aiImages = images.slice(
        0,
        MAX_AI_IMAGE_COUNT,
      );

      for (const [
        index,
        image,
      ] of aiImages.entries()) {
        setMessage(
          `${index + 1}/${aiImages.length} · AI 분석용 이미지를 준비하고 있습니다...`,
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

        aiFormData.append(
          "images",
          optimizedFile,
          optimizedFile.name,
        );
      }

      setMessage(
        "AI가 색상, 재질, 디자인 특징을 분석하고 있습니다...",
      );

      const response = await fetch(
        "/api/admin/projects/analyze",
        {
          method: "POST",
          body: aiFormData,
        },
      );

      const data =
        (await response.json()) as
          | AiVisualAnalysis
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

      if (!("confidence" in data)) {
        throw new Error(
          "AI 응답 형식이 올바르지 않습니다.",
        );
      }

      setIndustry(
        data.industry || industry,
      );

      setBusinessType(
        data.businessType ?? "",
      );

      setMainColors(
        joinValues(
          data.mainColors ?? [],
        ),
      );

      setSubColors(
        joinValues(
          data.subColors ?? [],
        ),
      );

      setMaterials(
        joinValues(
          data.materials ?? [],
        ),
      );

      setSignTypes(
        joinValues(
          data.signTypes ?? [],
        ),
      );

      setLighting(
        joinValues(
          data.lighting ?? [],
        ),
      );

      setStyles(
        joinValues(
          data.styles ?? [],
        ),
      );

      setDesignFeatures(
        joinValues(
          data.designFeatures ?? [],
        ),
      );

      setVisualPoints(
        joinValues(
          data.visualPoints ?? [],
        ),
      );

      setKeywords(
        joinValues(
          data.keywords ?? [],
        ),
      );

      setDesignerMemo(
        data.designerMemo ?? "",
      );

      setConfidence({
        industry:
          data.confidence.industry ?? 0,

        materials:
          data.confidence.materials ?? 0,

        signTypes:
          data.confidence.signTypes ?? 0,

        lighting:
          data.confidence.lighting ?? 0,

        overall:
          data.confidence.overall ?? 0,
      });

      setMessage(
        "사진 분석이 완료되었습니다. 결과를 확인하고 필요한 부분을 수정해주세요.",
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

  async function generateProjectContent() {
    if (!hasAnalysis) {
      setMessage(
        "먼저 프로젝트 사진을 분석해주세요.",
      );

      return;
    }

    const form =
      document.querySelector<HTMLFormElement>(
        "form",
      );

    if (!form) {
      setMessage(
        "프로젝트 입력 폼을 찾지 못했습니다.",
      );

      return;
    }

    setIsGenerating(true);

    setMessage(
      "AI가 분석 결과를 바탕으로 프로젝트 글을 작성하고 있습니다...",
    );

    try {
      const formData =
        new FormData(form);

      const response = await fetch(
        "/api/admin/projects/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            category: String(
              formData.get(
                "categoryName",
              ) ?? "",
            ),
            client: String(
              formData.get("client") ??
                "",
            ),
            location: String(
              formData.get("location") ??
                "",
            ),
            industry,
            businessType,
            mainColors,
            subColors,
            materials,
            signTypes,
            lighting,
            styles,
            designFeatures,
            visualPoints,
            keywords,
            designerMemo,
          }),
        },
      );

      const data =
        (await response.json()) as
          | {
              summary: string;
              overview: string;
              challenge: string;
              solution: string;
              result: string;
              seoTitle: string;
              seoDescription: string;
            }
          | {
              message?: string;
            };

      if (!response.ok) {
        throw new Error(
          "message" in data
            ? data.message
            : "프로젝트 글 작성에 실패했습니다.",
        );
      }

      if (!("summary" in data)) {
        throw new Error(
          "AI 응답 형식이 올바르지 않습니다.",
        );
      }

      setSummary(data.summary ?? "");
      setOverview(data.overview ?? "");
      setChallenge(data.challenge ?? "");
      setSolution(data.solution ?? "");
      setResult(data.result ?? "");
      setSeoTitle(data.seoTitle ?? "");

      setSeoDescription(
        data.seoDescription ?? "",
      );

      setMessage(
        "프로젝트 글과 SEO 초안이 작성되었습니다. 내용을 확인한 뒤 저장해주세요.",
      );
    } catch (error) {
      console.error(
        "프로젝트 글 작성 실패:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "프로젝트 글 작성에 실패했습니다.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      images.length === 0 &&
      projectType !== "website"
    ) {
      setMessage(
        "프로젝트 사진을 한 장 이상 선택해주세요.",
      );

      return;
    }

    if (
      projectType === "website" &&
      previewType === "live" &&
      !liveUrl.trim()
    ) {
      setMessage(
        "라이브 사이트 주소를 입력해주세요.",
      );

      return;
    }

    setIsSaving(true);

    setMessage(
      "프로젝트 정보를 저장하고 있습니다...",
    );

    let createdProjectId = "";

    try {
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

      const data =
        (await response.json()) as {
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

      createdProjectId =
        data.projectId;

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
                cacheControl:
                  "31536000",

                upsert: false,

                contentType:
                  "image/webp",
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

        const isThumbnail =
          index === 0;

        const {
          data: insertedImage,
          error: databaseError,
        } = await supabase
          .from("project_images")
          .insert({
            project_id:
              createdProjectId,

            storage_path:
              storagePath,

            public_url:
              publicUrl,

            original_name:
              image.file.name,

            alt_text: "",

            sort_order: index,

            is_thumbnail:
              isThumbnail,

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

      if (createdProjectId) {
        setMessage(
          `${
            error instanceof Error
              ? error.message
              : "이미지 저장에 실패했습니다."
          } 프로젝트 기본 정보는 저장되었습니다. 수정 화면으로 이동합니다.`,
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
      <BasicInfoSection
        categories={categories}
        title={title}
        slug={slug}
        industry={industry}
        projectType={projectType}
        previewType={previewType}
        liveUrl={liveUrl}
        inputClass={inputClass}
        labelClass={labelClass}
        onTitleChange={
          handleTitleChange
        }
        onSlugChange={
          handleSlugChange
        }
        onIndustryChange={(event) =>
          setIndustry(
            event.target.value,
          )
        }
        onProjectTypeChange={
          handleProjectTypeChange
        }
        onPreviewTypeChange={
          setPreviewType
        }
        onLiveUrlChange={(event) =>
          setLiveUrl(
            event.target.value,
          )
        }
      />

      <ImageUploadSection
        images={images}
        isDragging={isDragging}
        isAnalyzing={isAnalyzing}
        imageInputLabel={
          imageInputLabel
        }
        maxImageCount={
          MAX_IMAGE_COUNT
        }
        maxAiImageCount={
          MAX_AI_IMAGE_COUNT
        }
        onFileChange={
          handleFileChange
        }
        onDrop={handleDrop}
        onDragStateChange={
          setIsDragging
        }
        onRemoveImage={
          removeImage
        }
        onAnalyzeImages={
          analyzeImages
        }
      />

      {hasAnalysis && (
        <AiAnalysisSection
          industry={industry}
          businessType={
            businessType
          }
          mainColors={
            mainColors
          }
          subColors={subColors}
          materials={materials}
          signTypes={signTypes}
          lighting={lighting}
          styles={styles}
          designFeatures={
            designFeatures
          }
          visualPoints={
            visualPoints
          }
          keywords={keywords}
          designerMemo={
            designerMemo
          }
          confidence={confidence}
          isGenerating={
            isGenerating
          }
          inputClass={inputClass}
          labelClass={labelClass}
          onIndustryChange={
            setIndustry
          }
          onBusinessTypeChange={
            setBusinessType
          }
          onMainColorsChange={
            setMainColors
          }
          onSubColorsChange={
            setSubColors
          }
          onMaterialsChange={
            setMaterials
          }
          onSignTypesChange={
            setSignTypes
          }
          onLightingChange={
            setLighting
          }
          onStylesChange={
            setStyles
          }
          onDesignFeaturesChange={
            setDesignFeatures
          }
          onVisualPointsChange={
            setVisualPoints
          }
          onKeywordsChange={
            setKeywords
          }
          onDesignerMemoChange={
            setDesignerMemo
          }
          onGenerateContent={
            generateProjectContent
          }
        />
      )}

      <ProjectStorySection
        summary={summary}
        overview={overview}
        challenge={challenge}
        solution={solution}
        result={result}
        inputClass={inputClass}
        labelClass={labelClass}
        onSummaryChange={
          setSummary
        }
        onOverviewChange={
          setOverview
        }
        onChallengeChange={
          setChallenge
        }
        onSolutionChange={
          setSolution
        }
        onResultChange={
          setResult
        }
      />

      <SeoSection
        seoTitle={seoTitle}
        seoDescription={
          seoDescription
        }
        inputClass={inputClass}
        labelClass={labelClass}
        onSeoTitleChange={
          setSeoTitle
        }
        onSeoDescriptionChange={
          setSeoDescription
        }
      />

      <PublishSection
        inputClass={inputClass}
        labelClass={labelClass}
      />

      {message && (
        <p
          aria-live="polite"
          className="rounded-xl border border-black/5 bg-white px-5 py-4 text-sm leading-6 text-neutral-600"
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
            isSaving ||
            isAnalyzing ||
            isGenerating
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