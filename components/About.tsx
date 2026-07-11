const credentials = [
  "옥외광고사",
  "컬러리스트기사",
  "시각디자인기사",
  "실내건축기사",
];

const trustCards = [
  {
    value: "12+",
    label: "Years Experience",
    description: "12년 이상 디자인 실무",
    color: "bg-[#dfe8d7]",
  },
  {
    value: "800+",
    label: "Projects Completed",
    description: "브랜딩 · 간판 · 공간그래픽",
    color: "bg-[#d1c6b8]",
  },
  {
    value: "4",
    label: "Professional Licenses",
    description: "국가기술자격 보유",
    color: "bg-[#f2c7c7]",
  },
  {
    value: "Design Company",
    label: "산업디자인전문회사",
    description: "인증",
    color: "bg-[#f7d69a]",
  },
  {
    value: "Women-Owned",
    label: "여성기업",
    description: "인증",
    color: "bg-[#cbdc8b]",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-28 md:px-12"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
        <div>
          <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
            ABOUT
          </p>

          <p className="mt-5 text-sm font-semibold tracking-[0.18em] text-[var(--muted)]">
            DESIGN SMOOTHIE
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.05em] text-[var(--text-dark)] md:text-6xl">
            보기 좋은 디자인에서
            <br />
            기억에 남는 브랜드까지.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 text-lg leading-8 text-[var(--text)] md:grid-cols-2">
            <p>
              디자인스무디는 12년 이상의 디자인 실무 경험을 바탕으로
              브랜드의 시작인 로고와 컬러부터 간판, 파사드, 인쇄물까지
              하나의 흐름으로 연결합니다.
            </p>

            <p>
              각각의 결과물이 따로 보이지 않도록 브랜드와 공간의 성격을
              이해하고, 오래 사용할 수 있는 일관된 시각 방향을 만듭니다.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {trustCards.map((card) => (
          <article
            key={`${card.value}-${card.label}`}
            className={`flex min-h-[280px] flex-col justify-between rounded-[30px] ${card.color} p-7 md:p-8`}
          >
            <div>
              <p className="text-sm font-bold tracking-[0.3em] text-[var(--muted)]">
                DESIGN SMOOTHIE
              </p>

              <h3
                className={`mt-10 font-semibold tracking-[-0.05em] text-[var(--text-dark)] ${
                  card.value.length > 8
                    ? "text-2xl leading-tight md:text-3xl"
                    : "text-5xl md:text-6xl"
                }`}
              >
                {card.value}
              </h3>
            </div>

            <div>
              <p className="text-lg font-semibold text-[var(--text-dark)]">
                {card.label}
              </p>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 rounded-[34px] border border-[var(--line)] bg-white/55 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
        <div>
          <p className="text-sm font-bold tracking-[0.45em] text-[var(--muted)]">
            PROFESSIONAL LICENSES
          </p>

          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-4xl">
            디자인과 공간을 함께 이해하는 전문성
          </h3>

          <p className="mt-6 max-w-xl leading-8 text-[var(--text)]">
            12년 이상의 실무 경험과 800건 이상의 프로젝트를 통해
            브랜딩부터 간판, 공간 그래픽까지 하나의 브랜드 경험으로
            연결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {credentials.map((credential, index) => (
            <div
              key={credential}
              className="flex items-center gap-4 rounded-2xl bg-[var(--cream)] px-6 py-5"
            >
              <span className="text-sm font-bold tracking-[0.25em] text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="font-semibold text-[var(--text-dark)]">
                {credential}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}