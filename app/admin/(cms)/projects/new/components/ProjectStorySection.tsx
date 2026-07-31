"use client";

type ProjectStorySectionProps = {
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  inputClass: string;
  labelClass: string;
  onSummaryChange: (
    value: string,
  ) => void;
  onOverviewChange: (
    value: string,
  ) => void;
  onChallengeChange: (
    value: string,
  ) => void;
  onSolutionChange: (
    value: string,
  ) => void;
  onResultChange: (
    value: string,
  ) => void;
};

export default function ProjectStorySection({
  summary,
  overview,
  challenge,
  solution,
  result,
  inputClass,
  labelClass,
  onSummaryChange,
  onOverviewChange,
  onChallengeChange,
  onSolutionChange,
  onResultChange,
}: ProjectStorySectionProps) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8d25]">
        Project story
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        프로젝트 내용
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        AI가 작성한 내용을 확인하고 필요한 부분을
        직접 수정할 수 있습니다.
      </p>

      <div className="mt-7 space-y-6">
        <label className={labelClass}>
          요약
          <textarea
            name="summary"
            rows={4}
            value={summary}
            onChange={(event) =>
              onSummaryChange(
                event.target.value,
              )
            }
            placeholder="프로젝트를 간단히 소개하는 문장"
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
              onOverviewChange(
                event.target.value,
              )
            }
            placeholder="프로젝트에서 해결해야 했던 디자인 과제와 작업 방향"
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
                onChallengeChange(
                  event.target.value,
                )
              }
              placeholder="해결해야 했던 핵심 과제"
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
                onSolutionChange(
                  event.target.value,
                )
              }
              placeholder="디자인 해결 방향과 적용 요소"
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
                onResultChange(
                  event.target.value,
                )
              }
              placeholder="완성된 디자인에서 확인되는 결과"
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
  );
}