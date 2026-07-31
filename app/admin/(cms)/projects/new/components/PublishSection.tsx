"use client";

type PublishSectionProps = {
  inputClass: string;
  labelClass: string;
};

export default function PublishSection({
  inputClass,
  labelClass,
}: PublishSectionProps) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-semibold">
        공개 설정
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        저장할 프로젝트의 공개 상태를 설정합니다.
      </p>

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

          <span className="text-sm font-semibold text-neutral-700">
            홈페이지 대표 프로젝트
          </span>
        </label>
      </div>
    </section>
  );
}