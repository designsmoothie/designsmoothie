import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--cream)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-12 pt-20 sm:pt-24 md:px-12 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="mb-6 text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)] sm:text-xs sm:tracking-[0.3em] md:text-sm">
            BRANDING & SIGNAGE DESIGN STUDIO
          </p>

          <h1 className="text-[3rem] font-semibold leading-[1.04] tracking-[-0.06em] text-[var(--text-dark)] sm:text-6xl sm:leading-[1] md:text-8xl lg:text-[7.5rem]">
            Design that stays.
            <br />
            Not just looks.
          </h1>

          <p className="mx-auto mt-20 max-w-2xl text-lg font-medium leading-[1.8] text-[var(--text)] sm:mt-12 sm:text-xl md:mt-14 md:text-2xl md:leading-relaxed">
            브랜딩부터 간판까지,
            <br className="sm:hidden" />
            오래 기억되는 브랜드 경험을 만듭니다.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 md:mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-7 py-3.5 text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--green-hover)]"
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

        <div className="relative mt-14 overflow-hidden rounded-[28px] bg-[#ded7cb] sm:mt-16 md:mt-24 md:rounded-[44px]">
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
                <p className="text-[10px] font-semibold tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.22em]">
                  SELECTED PROJECT
                </p>

                <p className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl md:text-4xl">
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