"use client";

type Confidence = {
  industry: number;
  materials: number;
  signTypes: number;
  lighting: number;
  overall: number;
};

type AiAnalysisSectionProps = {
  industry: string;
  businessType: string;
  mainColors: string;
  subColors: string;
  materials: string;
  signTypes: string;
  lighting: string;
  styles: string;
  designFeatures: string;
  visualPoints: string;
  keywords: string;
  designerMemo: string;
  confidence: Confidence;
  isGenerating: boolean;
  inputClass: string;
  labelClass: string;

  onIndustryChange: (value: string) => void;
  onBusinessTypeChange: (value: string) => void;
  onMainColorsChange: (value: string) => void;
  onSubColorsChange: (value: string) => void;
  onMaterialsChange: (value: string) => void;
  onSignTypesChange: (value: string) => void;
  onLightingChange: (value: string) => void;
  onStylesChange: (value: string) => void;
  onDesignFeaturesChange: (value: string) => void;
  onVisualPointsChange: (value: string) => void;
  onKeywordsChange: (value: string) => void;
  onDesignerMemoChange: (value: string) => void;
  onGenerateContent: () => void;
};

export default function AiAnalysisSection({
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
  confidence,
  isGenerating,
  inputClass,
  labelClass,
  onIndustryChange,
  onBusinessTypeChange,
  onMainColorsChange,
  onSubColorsChange,
  onMaterialsChange,
  onSignTypesChange,
  onLightingChange,
  onStylesChange,
  onDesignFeaturesChange,
  onVisualPointsChange,
  onKeywordsChange,
  onDesignerMemoChange,
  onGenerateContent,
}: AiAnalysisSectionProps) {
  return (
    <section className="rounded-3xl border border-[#94b63f]/20 bg-[#f7faef] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        AI image analysis
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        AI 사진 분석 결과
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        분석 결과를 확인하고 잘못된 내용은 직접
        수정해주세요. 여러 항목은 쉼표로 구분합니다.
      </p>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          업종
          <input
            value={industry}
            onChange={(event) =>
              onIndustryChange(event.target.value)
            }
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          상위 업종
          <input
            value={businessType}
            onChange={(event) =>
              onBusinessTypeChange(event.target.value)
            }
            placeholder="예: 외식업, 의료업, 교육업"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          주요 색상
          <input
            value={mainColors}
            onChange={(event) =>
              onMainColorsChange(event.target.value)
            }
            placeholder="예: 블랙, 우드 브라운"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          보조 색상
          <input
            value={subColors}
            onChange={(event) =>
              onSubColorsChange(event.target.value)
            }
            placeholder="예: 화이트, 베이지"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          재질
          <input
            value={materials}
            onChange={(event) =>
              onMaterialsChange(event.target.value)
            }
            placeholder="예: 금속 채널, 아크릴, 우드"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          간판·디자인 종류
          <input
            value={signTypes}
            onChange={(event) =>
              onSignTypesChange(event.target.value)
            }
            placeholder="예: 채널간판, 파사드 그래픽"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          조명 방식
          <input
            value={lighting}
            onChange={(event) =>
              onLightingChange(event.target.value)
            }
            placeholder="예: 전면 발광, 간접조명"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          디자인 스타일
          <input
            value={styles}
            onChange={(event) =>
              onStylesChange(event.target.value)
            }
            placeholder="예: 미니멀, 따뜻한 분위기"
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-6 space-y-6">
        <label className={labelClass}>
          디자인 특징
          <textarea
            rows={4}
            value={designFeatures}
            onChange={(event) =>
              onDesignFeaturesChange(event.target.value)
            }
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          핵심 시각 요소
          <textarea
            rows={4}
            value={visualPoints}
            onChange={(event) =>
              onVisualPointsChange(event.target.value)
            }
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          추천 검색 키워드
          <input
            value={keywords}
            onChange={(event) =>
              onKeywordsChange(event.target.value)
            }
            placeholder="예: 부산 간판디자인, 규카츠 브랜딩"
            className={inputClass}
          />
        </label>

        <label className={labelClass}>
          AI 디자이너 메모
          <textarea
            rows={5}
            value={designerMemo}
            onChange={(event) =>
              onDesignerMemoChange(event.target.value)
            }
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-7 rounded-2xl border border-[#94b63f]/15 bg-white p-5">
        <p className="text-sm font-semibold text-neutral-700">
          분석 신뢰도
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <ConfidenceItem
            label="업종"
            value={confidence.industry}
          />
          <ConfidenceItem
            label="재질"
            value={confidence.materials}
          />
          <ConfidenceItem
            label="종류"
            value={confidence.signTypes}
          />
          <ConfidenceItem
            label="조명"
            value={confidence.lighting}
          />
          <ConfidenceItem
            label="전체"
            value={confidence.overall}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerateContent}
        disabled={isGenerating}
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isGenerating
          ? "프로젝트 글 작성 중..."
          : "✨ 프로젝트 글 작성"}
      </button>
    </section>
  );
}

function ConfidenceItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const safeValue = Math.max(
    0,
    Math.min(100, value || 0),
  );

  return (
    <div className="rounded-xl bg-[#f7faef] p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-neutral-600">
          {label}
        </span>

        <span className="text-xs font-semibold text-[#6f8d25]">
          {safeValue}%
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full bg-[#94b63f]"
          style={{
            width: `${safeValue}%`,
          }}
        />
      </div>
    </div>
  );
}