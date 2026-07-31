"use client";

type SeoSectionProps = {
  seoTitle: string;
  seoDescription: string;
  inputClass: string;
  labelClass: string;
  onSeoTitleChange: (
    value: string,
  ) => void;
  onSeoDescriptionChange: (
    value: string,
  ) => void;
};

export default function SeoSection({
  seoTitle,
  seoDescription,
  inputClass,
  labelClass,
  onSeoTitleChange,
  onSeoDescriptionChange,
}: SeoSectionProps) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        Search engine
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        SEO
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        검색 결과에 노출될 제목과 설명입니다.
      </p>

      <div className="mt-7 space-y-6">
        <label className={labelClass}>
          SEO 제목
          <input
            name="seoTitle"
            value={seoTitle}
            onChange={(event) =>
              onSeoTitleChange(
                event.target.value,
              )
            }
            placeholder="예: 부산 규카츠 전문점 브랜드 디자인 | 디자인스무디"
            className={inputClass}
          />

          <span className="mt-2 block text-xs font-normal text-neutral-400">
            검색 결과에서 보이는 제목입니다.
          </span>
        </label>

        <label className={labelClass}>
          SEO 설명
          <textarea
            name="seoDescription"
            rows={4}
            value={seoDescription}
            onChange={(event) =>
              onSeoDescriptionChange(
                event.target.value,
              )
            }
            placeholder="프로젝트의 업종, 지역, 디자인 특징을 자연스럽게 포함한 설명"
            className={inputClass}
          />

          <span className="mt-2 block text-xs font-normal text-neutral-400">
            검색 결과에서 제목 아래에 표시되는 설명입니다.
          </span>
        </label>
      </div>
    </section>
  );
}