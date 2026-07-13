import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="overflow-hidden bg-[var(--cream)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="relative overflow-hidden rounded-[40px] bg-[var(--text-dark)] px-8 py-16 text-white md:px-16 md:py-24 lg:px-20">
          {/* 배경 장식 */}
          <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[var(--green)]/12 blur-3xl" />

          <div className="absolute -bottom-32 left-0 h-[260px] w-[260px] rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-white/55">
                START YOUR PROJECT
              </p>

              <h2 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-7xl lg:text-8xl">
                함께 만들면
                <br />
                더 오래 기억됩니다.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/70 md:text-xl md:leading-9">
                브랜딩부터 간판, 파사드, 공간 그래픽까지.
                <br />
                브랜드가 가장 좋은 모습으로 기억될 수 있도록
                디자인 스무디가 함께합니다.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-8 py-4 text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-1 hover:bg-[#cbe96a]"
                >
                  프로젝트 문의하기
                  <span className="ml-2">→</span>
                </Link>

                <Link
                  href="/guide"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  의뢰 안내 보기
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div>
                <p className="text-xs tracking-[0.22em] text-white/45">
                  RESPONSE
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  빠르고 명확하게
                  <br />
                  답변드립니다.
                </h3>
              </div>

              <div className="space-y-5 border-t border-white/10 pt-6">
                <div className="flex items-start justify-between">
                  <span className="text-white/55">
                    상담 채널
                  </span>

                  <span className="font-medium">
                    카카오채널
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-white/55">
                    상담 분야
                  </span>

                  <span className="text-right font-medium">
                    Branding
                    <br />
                    Signage
                    <br />
                    Space Graphic
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-white/55">
                    진행 방식
                  </span>

                  <span className="font-medium">
                    온라인 · 오프라인
                  </span>
                </div>
              </div>

              <div className="mt-2 rounded-2xl bg-white/6 p-5 text-sm leading-7 text-white/70">
                프로젝트의 규모와 업종에 맞는 방향을 함께 고민하며
                가장 적합한 디자인 솔루션을 제안드립니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}