import Link from "next/link";

const process = [
  {
    number: "01",
    title: "상담",
    text: "카카오채널 또는 전화로 편하게 문의해주세요.",
  },
  {
    number: "02",
    title: "견적 및 일정",
    text: "작업 범위와 비용, 예상 일정을 안내드립니다.",
  },
  {
    number: "03",
    title: "디자인 진행",
    text: "브랜드에 맞는 컨셉과 시안을 제작합니다.",
  },
  {
    number: "04",
    title: "수정 및 확정",
    text: "피드백을 반영하여 디자인을 완성합니다.",
  },
  {
    number: "05",
    title: "최종 납품",
    text: "인쇄용·웹용 등 필요한 파일을 전달드립니다.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="mx-auto max-w-[1440px] px-6 py-28 md:px-12"
    >
      <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
        PROCESS
      </p>

      <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-dark)]">
        의뢰부터 납품까지,
        <br />
        복잡하지 않습니다.
      </h2>

      <div className="mt-20 space-y-8">
        {process.map((item, index) => (
          <div
            key={item.number}
            className="flex flex-col gap-6 rounded-[28px] border border-[var(--line)] bg-white p-10 md:flex-row md:items-center"
          >
            <div className="text-5xl font-semibold text-[var(--green)]">
              {item.number}
            </div>

            <div className="flex-1">
              <h3 className="text-3xl font-semibold text-[var(--text-dark)]">
                {item.title}
              </h3>

              <p className="mt-3 max-w-xl leading-8 text-[var(--muted)]">
                {item.text}
              </p>
            </div>

            {index !== process.length - 1 && (
              <div className="text-3xl text-[var(--green)]">↓</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-[var(--green)] px-10 py-5 font-semibold text-[var(--text-dark)] shadow-md transition hover:scale-105"
        >
          지금 문의하기 →
        </Link>
      </div>
    </section>
  );
}