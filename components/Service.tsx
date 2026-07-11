const services = [
  {
    number: "01",
    title: "BRANDING",
    subtitle: "브랜드 아이덴티티 개발",
    description: "로고, 컬러시스템, 브랜드의 기준을 설계합니다.",
    bg: "bg-[var(--green)]",
  },
  {
    number: "02",
    title: "SIGNAGE",
    subtitle: "간판 & 사인 디자인",
    description: "공간의 첫인상을 만드는 사인 시스템을 디자인합니다.",
    bg: "bg-[var(--orange)]",
  },
  {
    number: "03",
    title: "SPACE GRAPHIC",
    subtitle: "공간 & 그래픽 디자인",
    description: "파사드, 배너, 인쇄물까지 일관된 시각 경험을 제공합니다.",
    bg: "bg-[var(--coral)]",
  },
];

export default function Service() {
  return (
    <section id="service" className="scroll-mt-5 grid grid-cols-1 md:grid-cols-3">
      {services.map((service) => (
        <article
          key={service.number}
          className={`${service.bg} min-h-[260px] p-10 text-[var(--text-dark)] md:p-14`}
        >
          <div className="mb-10 flex items-center gap-12">
            <span className="text-sm font-bold">{service.number}</span>
            <span className="text-sm font-bold tracking-[0.42em]">
              {service.title}
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            {service.subtitle}
          </h2>

          <p className="mt-5 max-w-sm leading-7">
            {service.description}
          </p>
        </article>
      ))}
    </section>
  );
}