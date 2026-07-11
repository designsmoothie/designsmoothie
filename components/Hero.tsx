import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto grid min-h-[760px] max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-[0.82fr_1.18fr] md:px-12 md:py-20">
      <div className="flex flex-col justify-center">
        <p className="mb-8 text-sm font-bold tracking-[0.55em] text-[var(--muted)]">
          BRANDING & SIGNAGE DESIGN STUDIO
        </p>

        <h1 className="text-6xl font-semibold leading-[0.98] tracking-[-0.07em] text-[var(--text-dark)] md:text-8xl">
          Design that stays.
          <br />
          Not just looks.
        </h1>

        <p className="mt-10 max-w-xl text-2xl font-medium leading-relaxed text-[var(--text)]">
          브랜딩부터 간판까지,
          <br />
          기억에 남는 브랜드를 만들어 드립니다.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="rounded-full bg-[var(--green)] px-8 py-4 text-sm font-bold text-[var(--text-dark)] shadow-sm transition hover:translate-y-[-1px] hover:bg-[#cbe96a]"
          >
            포트폴리오 보기 →
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[var(--soft)] px-8 py-4 text-sm font-bold text-[var(--text)] transition hover:border-[var(--text-dark)] hover:text-[var(--text-dark)]"
          >
            상담 문의 →
          </Link>
        </div>
      </div>

      <div className="grid min-h-[560px] grid-cols-5 grid-rows-2 gap-3">
        <div className="col-span-3 row-span-2 overflow-hidden rounded-[30px] bg-[#c9beb0]">
          <img
            src="/images/hero/signage.jpg"
            alt="Signage Project"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div className="col-span-2 overflow-hidden rounded-[30px] bg-[#ded6c8]">
          <img
            src="/images/hero/branding.jpg"
            alt="Branding"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>

        <div className="col-span-2 overflow-hidden rounded-[30px] bg-[#f3c9c7]">
          <img
            src="/images/hero/coloring.jpg"
            alt="Coloring System"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}