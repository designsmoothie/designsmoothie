import Link from "next/link";

export default function ContactPreview() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-6 py-28 md:px-12"
    >
      <div className="rounded-[36px] bg-[#e8dfd2] p-8 md:p-14">
        <p className="text-sm font-bold tracking-[0.5em] text-[var(--muted)]">
          CONTACT
        </p>

        <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-[var(--text-dark)] md:text-7xl">
          프로젝트를
          <br />
          시작해볼까요?
        </h2>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-[var(--text)]">
          브랜딩, 간판, 파사드, 인쇄물, 배너 작업이 필요하다면
          카카오채널로 편하게 문의해주세요.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-[var(--green)] px-8 py-4 text-sm font-bold text-[var(--text-dark)] shadow-sm transition hover:-translate-y-1"
          >
            문의 페이지로 이동 →
          </Link>

          <Link
            href="/guide"
            className="rounded-full border border-[var(--soft)] px-8 py-4 text-sm font-bold text-[var(--text)] transition hover:border-[var(--text-dark)] hover:text-[var(--text-dark)]"
          >
            의뢰 안내사항 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}