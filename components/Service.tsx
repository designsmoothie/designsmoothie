const services = [
  {
    number: "01",
    title: "BRANDING",
    subtitle: "브랜드 아이덴티티 개발",
    description:
      "브랜드의 방향성을 정리하고 로고, 컬러 시스템, 디자인 가이드를 구축합니다.",
  },
  {
    number: "02",
    title: "SIGNAGE",
    subtitle: "간판 & 사인 디자인",
    description:
      "브랜드가 가장 먼저 보이는 공간의 얼굴을 설계합니다.",
  },
  {
    number: "03",
    title: "SPACE GRAPHIC",
    subtitle: "공간 그래픽 디자인",
    description:
      "파사드, 배너, 인쇄물까지 하나의 브랜드 경험으로 연결합니다.",
  },
];

export default function Service() {
  return (
    <section
      id="service"
      className="scroll-mt-28 bg-[var(--cream)] py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
            WHAT WE DO
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-6xl">
            브랜드를 만들고,
            <br />
            공간까지 완성합니다.
          </h2>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text)]">
            디자인 스무디는 단순히 예쁜 디자인을 만드는 것이 아니라,
            브랜드가 사람들에게 기억되는 방식을 설계합니다.
          </p>
        </div>

        <div className="mt-20 grid gap-7 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group rounded-[32px] border border-black/5 bg-white/70 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--green)]">
                  {service.number}
                </span>

                <span className="text-[11px] font-semibold tracking-[0.22em] text-[var(--muted)]">
                  {service.title}
                </span>
              </div>

              <h3 className="mt-12 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-dark)]">
                {service.subtitle}
              </h3>

              <p className="mt-6 leading-8 text-[var(--text)]">
                {service.description}
              </p>

              <div className="mt-12 flex items-center">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--green)] text-lg transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}