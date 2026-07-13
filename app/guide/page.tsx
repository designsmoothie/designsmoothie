import Link from "next/link";

const guideItems = [
  {
    number: "01",
    title: "Branding",
    subtitle: "로고 · 브랜드 아이덴티티",
    description:
      "브랜드의 방향과 첫인상을 설계하기 위해 아래 내용을 준비해주세요.",
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
    description:
      "설치 환경을 정확히 파악할 수 있는 사진과 기본 정보를 준비해주세요.",
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
    description:
      "건물 외관과 브랜드의 분위기를 함께 확인할 수 있는 자료가 필요합니다.",
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
    description:
      "인쇄 규격과 실제 들어갈 콘텐츠를 미리 정리하면 진행이 빨라집니다.",
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
    description:
      "사이즈와 문구가 정확해야 빠르게 시안 작업을 시작할 수 있습니다.",
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
    description:
      "현재 브랜드의 문제와 앞으로 만들고 싶은 방향을 편하게 알려주세요.",
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
    <main className="min-h-screen bg-[var(--cream)] text-[var(--text)]">
      <section className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-12 md:pb-36 md:pt-14">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[var(--muted)] transition duration-300 hover:text-[var(--text-dark)]"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            HOME
          </Link>

          <p className="hidden text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)] sm:block">
            DESIGN REQUEST GUIDE
          </p>
        </div>

        <div className="mt-20 grid gap-12 border-b border-[var(--line)] pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end md:mt-24 md:pb-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              REQUEST GUIDE
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
              의뢰 전,
              <br />
              이것만 준비해주세요.
            </h1>
          </div>

          <div className="max-w-xl lg:pb-2">
            <p className="text-lg leading-9 text-[var(--text)] md:text-xl">
              필요한 자료가 미리 정리되어 있으면 상담과 견적 안내가 훨씬
              빠르고 정확해집니다.
            </p>

            <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
              모든 항목을 완벽하게 준비하지 않아도 괜찮습니다. 준비된
              내용부터 보내주시면 필요한 부분을 함께 정리해드립니다.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-7 md:mt-24 md:grid-cols-2 xl:grid-cols-3">
          {guideItems.map((item) => (
            <article
              key={item.number}
              className="group flex min-h-full flex-col rounded-[30px] border border-black/5 bg-white/65 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.035)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-[0_28px_80px_rgba(0,0,0,0.07)] md:rounded-[36px] md:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green)] text-xs font-semibold tracking-[0.12em] text-[var(--text-dark)]">
                  {item.number}
                </span>

                <span className="text-xl text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                  ↘
                </span>
              </div>

              <div className="mt-10">
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  {item.subtitle}
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[var(--text-dark)] md:text-4xl">
                  {item.title}
                </h2>

                <p className="mt-5 min-h-[84px] text-sm leading-7 text-[var(--text)]">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
                  CHECKLIST
                </p>

                <ul className="mt-5">
                  {item.checklist.map((checkItem, index) => (
                    <li
                      key={checkItem}
                      className="grid grid-cols-[34px_1fr] gap-3 border-b border-black/5 py-4 last:border-b-0"
                    >
                      <span className="text-xs font-semibold tracking-[0.1em] text-[var(--green)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm leading-6 text-[var(--text-dark)]">
                        {checkItem}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <section className="relative mt-24 overflow-hidden rounded-[38px] bg-[var(--text-dark)] px-8 py-14 text-white md:mt-36 md:rounded-[48px] md:px-14 md:py-20 lg:px-20">
          <div className="absolute -right-28 -top-28 h-[320px] w-[320px] rounded-full bg-[var(--green)]/15 blur-3xl" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-white/50">
                READY TO START
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-white md:text-6xl lg:text-7xl">
                준비가 되셨다면,
                <br />
                편하게 문의해주세요.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                준비된 자료를 카카오채널로 보내주시면 작업 범위와 일정,
                예상 비용을 확인한 뒤 안내드립니다.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-8 py-4 text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--green-hover)]"
                >
                  문의 페이지로 이동
                  <span className="ml-2">→</span>
                </Link>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  포트폴리오 보기
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/5 p-7 backdrop-blur-md md:p-8">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-white/45">
                BEFORE CONTACT
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
                  <span className="text-sm text-white/55">
                    자료가 부족한 경우
                  </span>
                  <span className="text-right text-sm font-medium text-white">
                    상담 후 정리 가능
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-5">
                  <span className="text-sm text-white/55">
                    견적 안내
                  </span>
                  <span className="text-right text-sm font-medium text-white">
                    작업 범위 확인 후
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <span className="text-sm text-white/55">
                    상담 채널
                  </span>
                  <span className="text-right text-sm font-medium text-white">
                    카카오채널
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}