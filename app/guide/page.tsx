import Link from "next/link";

const guideItems = [
  {
    number: "01",
    title: "Branding",
    subtitle: "로고 · 브랜드 아이덴티티",
    color: "bg-[#dfe8d7]",
    checklist: [
      "브랜드명 또는 상호명",
      "업종과 주요 서비스",
      "원하는 분위기와 키워드",
      "선호 색상 또는 피하고 싶은 색상",
      "참고 이미지나 경쟁 브랜드",
      "사용 목적과 필요한 일정",
    ],
  },
  {
    number: "02",
    title: "Signage",
    subtitle: "간판 · 사인 디자인",
    color: "bg-[#d1c6b8]",
    checklist: [
      "상호명과 업종",
      "설치할 장소의 전체 사진",
      "간판 크기 또는 설치 가능 범위",
      "건물 외관과 주변 환경",
      "원하는 간판 방식",
      "설치 지역과 예상 일정",
    ],
  },
  {
    number: "03",
    title: "Facade",
    subtitle: "파사드 · 공간 그래픽",
    color: "bg-[#f2c7c7]",
    checklist: [
      "건물 정면과 측면 사진",
      "가능한 경우 도면과 치수",
      "업종과 주요 고객층",
      "원하는 분위기와 콘셉트",
      "기존 로고와 브랜드 자료",
      "시공 여부와 예상 일정",
    ],
  },
  {
    number: "04",
    title: "Print",
    subtitle: "명함 · 리플렛 · 인쇄물",
    color: "bg-[#f7d69a]",
    checklist: [
      "제작할 인쇄물 종류",
      "완성 사이즈와 수량",
      "들어갈 문구와 연락처",
      "로고와 사용할 이미지",
      "선호하는 분위기",
      "인쇄까지 필요한지 여부",
    ],
  },
  {
    number: "05",
    title: "Banner",
    subtitle: "현수막 · 배너",
    color: "bg-[#e8dfd2]",
    checklist: [
      "정확한 제작 사이즈",
      "들어갈 문구 전체",
      "사용할 사진과 로고",
      "설치 장소와 사용 목적",
      "원하는 색상과 분위기",
      "출력과 배송 필요 여부",
    ],
  },
  {
    number: "06",
    title: "Direction",
    subtitle: "브랜드 방향 · 디자인 시스템",
    color: "bg-[#cbdc8b]",
    checklist: [
      "현재 브랜드의 상황",
      "정리하고 싶은 문제점",
      "주요 고객층과 경쟁 브랜드",
      "기존 디자인 자료",
      "필요한 작업 범위",
      "희망 일정과 예산 범위",
    ],
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-[var(--cream)] px-6 py-10 text-[var(--text)] md:px-12">
      <section className="mx-auto max-w-[1440px]">
        <Link
          href="/"
          className="inline-flex text-sm font-bold tracking-[0.25em] text-[var(--muted)] transition hover:text-[#94b63f]"
        >
          ← HOME
        </Link>

        <div className="mt-16">
          <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
            REQUEST GUIDE
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-[var(--text-dark)] md:text-8xl">
            의뢰 전,
            <br />
            이것만 준비해주세요.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--text)]">
            필요한 자료가 미리 정리되어 있으면 상담과 견적 안내가 훨씬
            빠르고 정확해집니다. 모든 항목이 완벽하게 준비되지 않아도
            괜찮습니다.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guideItems.map((item) => (
            <article
              key={item.number}
              className={`rounded-[34px] ${item.color} p-8 md:p-10`}
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-bold tracking-[0.35em] text-[var(--muted)]">
                  {item.number}
                </span>
                <span className="text-2xl text-[var(--text-dark)]">↘</span>
              </div>

              <h2 className="mt-16 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                {item.title}
              </h2>

              <p className="mt-3 text-sm font-bold tracking-[0.16em] text-[var(--muted)]">
                {item.subtitle}
              </p>

              <ul className="mt-8 space-y-4">
                {item.checklist.map((checkItem, index) => (
                  <li
                    key={checkItem}
                    className="flex gap-3 border-b border-black/10 pb-4 leading-7"
                  >
                    <span className="shrink-0 text-sm font-bold text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{checkItem}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-20 rounded-[36px] bg-[#e8dfd2] p-8 md:p-14">
          <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
            READY TO START
          </p>

          <div className="mt-5 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-6xl">
                준비가 되셨다면,
                <br />
                편하게 문의해주세요.
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-[var(--text)]">
                준비된 자료를 카카오채널로 보내주시면 작업 범위와 일정 확인 후
                안내드립니다.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 rounded-full bg-[var(--green)] px-8 py-4 text-sm font-bold text-[var(--text-dark)] shadow-sm transition hover:-translate-y-1"
            >
              문의 페이지로 이동 →
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}