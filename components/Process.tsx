import Link from "next/link";

const process = [
  {
    number: "01",
    title: "상담",
    text: "카카오채널 또는 전화로 프로젝트의 목적과 필요한 작업을 편하게 알려주세요.",
  },
  {
    number: "02",
    title: "견적 및 일정",
    text: "작업 범위와 난이도를 확인한 뒤 비용과 예상 일정을 안내드립니다.",
  },
  {
    number: "03",
    title: "디자인 진행",
    text: "브랜드의 방향과 사용 환경을 고려해 컨셉과 디자인 시안을 제작합니다.",
  },
  {
    number: "04",
    title: "수정 및 확정",
    text: "전달해주신 피드백을 반영하고 세부 요소를 조정해 디자인을 완성합니다.",
  },
  {
    number: "05",
    title: "최종 납품",
    text: "인쇄용, 제작용, 웹용 등 실제 사용에 필요한 최종 파일을 전달드립니다.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-28 overflow-hidden bg-[#f5f4f0] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              OUR PROCESS
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl lg:text-7xl">
              의뢰부터 납품까지,
              <br />
              복잡하지 않게.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-8 text-[var(--text)] md:text-lg">
              필요한 내용을 명확하게 정리하고, 각 단계마다 진행 상황을
              공유합니다. 처음 디자인을 의뢰하는 경우에도 어렵지 않게
              진행할 수 있습니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-7 py-3.5 text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#cbe96a]"
              >
                프로젝트 문의하기
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/guide"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/55 px-7 py-3.5 text-sm font-semibold text-[var(--text)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--text-dark)] hover:text-[var(--text-dark)]"
              >
                의뢰 안내 보기
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-black/5 bg-white/70 shadow-[0_24px_80px_rgba(0,0,0,0.05)] backdrop-blur-xl md:rounded-[44px]">
            {process.map((item, index) => (
              <article
                key={item.number}
                className={`group grid gap-6 p-7 transition-colors duration-300 hover:bg-white/80 md:grid-cols-[82px_0.55fr_1fr] md:items-center md:gap-8 md:p-10 ${
                  index !== process.length - 1
                    ? "border-b border-black/5"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between md:block">
                  <span className="text-sm font-semibold tracking-[0.18em] text-[var(--green)]">
                    {item.number}
                  </span>

                  <span className="text-sm text-[var(--muted)] md:hidden">
                    {index !== process.length - 1 ? "↓" : "✓"}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-3xl">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between gap-6">
                  <p className="max-w-xl text-sm leading-7 text-[var(--text)] md:text-base md:leading-8">
                    {item.text}
                  </p>

                  <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/8 text-sm text-[var(--muted)] transition duration-300 group-hover:border-[var(--green)] group-hover:bg-[var(--green)] group-hover:text-[var(--text-dark)] md:flex">
                    {index !== process.length - 1 ? "↓" : "✓"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-8 border-t border-[var(--line)] pt-10 md:mt-28 md:flex-row md:items-center md:pt-12">
          <p className="text-sm leading-7 text-[var(--muted)]">
            프로젝트의 범위와 제작 방식에 따라
            <br className="hidden sm:block" />
            일부 과정과 일정은 달라질 수 있습니다.
          </p>

          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
            CLEAR PROCESS · SMOOTH COMMUNICATION
          </p>
        </div>
      </div>
    </section>
  );
}