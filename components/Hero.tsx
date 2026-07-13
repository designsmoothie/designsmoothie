import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--cream)]">
      <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-28 md:px-12 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-6 text-xs font-semibold tracking-[0.34em] text-[var(--muted)] md:text-sm">
            BRANDING & SIGNAGE DESIGN STUDIO
          </p>

          <h1 className="text-[3.4rem] font-semibold leading-[0.95] tracking-[-0.065em] text-[var(--text-dark)] sm:text-6xl md:text-8xl lg:text-[7.5rem]">
            Design that stays.
            <br />
            Not just looks.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-[var(--text)] md:mt-10 md:text-2xl">
            브랜딩부터 간판까지,
            <br className="sm:hidden" />
            오래 기억되는 브랜드 경험을 만듭니다.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-7 py-3.5 text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#cbe96a]"
            >
              포트폴리오 보기
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[var(--soft)] bg-white/40 px-7 py-3.5 text-sm font-semibold text-[var(--text)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--text-dark)] hover:text-[var(--text-dark)]"
            >
              상담 문의
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[28px] bg-[#ded7cb] md:mt-24 md:rounded-[44px]">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
            <Image
              src="/images/hero/signage.jpg"
              alt="Design Smoothie signage project"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1360px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white md:p-10">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-white/70">
                  SELECTED PROJECT
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Signage & Brand Experience
                </p>
              </div>

              <p className="hidden text-sm font-medium text-white/70 md:block">
                DESIGN SMOOTHIE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}