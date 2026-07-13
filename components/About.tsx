const credentials = [
  {
    number: "01",
    name: "옥외광고사",
    category: "SIGNAGE",
  },
  {
    number: "02",
    name: "컬러리스트기사",
    category: "COLOR",
  },
  {
    number: "03",
    name: "시각디자인기사",
    category: "VISUAL DESIGN",
  },
  {
    number: "04",
    name: "실내건축기사",
    category: "INTERIOR",
  },
  {
    number: "05",
    name: "웹디자인기능사",
    category: "WEB DESIGN",
  },
  {
    number: "06",
    name: "컴퓨터그래픽스운용기능사",
    category: "GRAPHIC DESIGN",
  },
];

const trustItems = [
  {
    value: "12+",
    label: "Years of Experience",
    description: "12년 이상의 디자인 실무 경험",
  },
  {
    value: "800+",
    label: "Projects Completed",
    description: "브랜딩 · 간판 · 공간 그래픽 프로젝트",
  },
  {
    value: "06",
    label: "Professional Licenses",
    description: "디자인 · 옥외광고 · 실내건축 전문 자격",
  },
];

const certifications = [
  {
    title: "산업디자인전문회사",
    status: "인증",
    description:
      "전문적인 디자인 역량과 수행 체계를 갖춘 산업디자인전문회사입니다.",
  },
  {
    title: "여성기업",
    status: "인증",
    description:
      "여성기업 확인을 완료한 전문 디자인 기업입니다.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-28 overflow-hidden bg-[var(--cream)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              ABOUT DESIGN SMOOTHIE
            </p>

            <div className="mt-8 h-px w-full max-w-[180px] bg-[var(--line)]" />

            <p className="mt-8 max-w-xs text-sm leading-7 text-[var(--muted)]">
              BRANDING · SIGNAGE
              <br />
              SPACE GRAPHIC DESIGN
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl lg:text-7xl">
              보기 좋은 디자인을 넘어,
              <br />
              기억에 남는 브랜드로.
            </h2>

            <div className="mt-10 grid gap-8 text-base leading-8 text-[var(--text)] md:mt-14 md:grid-cols-2 md:text-lg">
              <p>
                디자인 스무디는 12년 이상의 실무 경험을 바탕으로 브랜드의
                시작인 로고와 컬러부터 간판, 파사드, 인쇄물까지 하나의
                흐름으로 연결합니다.
              </p>

              <p>
                각각의 디자인이 따로 보이지 않도록 브랜드와 공간의 성격을
                이해하고, 오래 사용할 수 있는 일관된 시각 방향을
                설계합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 overflow-hidden rounded-[32px] border border-black/5 bg-white/65 shadow-[0_24px_80px_rgba(0,0,0,0.04)] backdrop-blur-xl md:mt-32 md:rounded-[44px]">
          <div className="grid md:grid-cols-3">
            {trustItems.map((item, index) => (
              <article
                key={item.label}
                className={`flex min-h-[280px] flex-col justify-between p-8 md:min-h-[360px] md:p-10 lg:p-12 ${
                  index !== trustItems.length - 1
                    ? "border-b border-black/5 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                    {item.label.toUpperCase()}
                  </p>

                  <span className="text-xs text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <strong className="block text-6xl font-semibold tracking-[-0.065em] text-[var(--text-dark)] md:text-7xl lg:text-8xl">
                    {item.value}
                  </strong>

                  <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--text)] md:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-[var(--line)] pt-16 md:mt-28 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pt-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              PROFESSIONAL LICENSES
            </p>

            <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-dark)] md:text-5xl">
              디자인과 공간을
              <br />
              함께 이해합니다.
            </h3>

            <p className="mt-7 max-w-md text-base leading-8 text-[var(--text)]">
              시각 디자인의 완성도뿐 아니라 컬러, 제작, 시공과 공간 환경까지
              고려해 실제 현장에서 구현 가능한 디자인을 제안합니다.
            </p>
          </div>

          <div className="border-t border-[var(--line)]">
            {credentials.map((credential) => (
              <div
                key={credential.name}
                className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-6 transition-colors duration-300 hover:bg-white/45 md:grid-cols-[64px_1fr_auto] md:px-4 md:py-7"
              >
                <span className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">
                  {credential.number}
                </span>

                <span className="text-base font-semibold tracking-[-0.02em] text-[var(--text-dark)] md:text-xl">
                  {credential.name}
                </span>

                <span className="hidden text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] sm:block">
                  {credential.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-[var(--line)] pt-16 md:mt-28 md:pt-20">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
                COMPANY CERTIFICATIONS
              </p>

              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-[var(--text-dark)] md:text-5xl">
                전문성과 신뢰를 갖춘
                <br />
                디자인 스튜디오.
              </h3>
            </div>

            <p className="max-w-md text-base leading-8 text-[var(--text)]">
              디자인 역량과 사업 수행 체계를 공식적인 인증 절차를 통해
              갖추고 있습니다.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {certifications.map((certification) => (
              <article
                key={certification.title}
                className="rounded-[28px] border border-black/5 bg-white/65 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.035)] backdrop-blur-xl md:p-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h4 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--text-dark)] md:text-3xl">
                    {certification.title}
                  </h4>

                  <span className="rounded-full bg-[var(--green)] px-4 py-2 text-[11px] font-semibold text-[var(--text-dark)]">
                    {certification.status}
                  </span>
                </div>

                <p className="mt-8 max-w-xl text-sm leading-7 text-[var(--text)] md:text-base">
                  {certification.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}