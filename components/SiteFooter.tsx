import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--cream)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="text-sm font-bold tracking-[0.45em] text-[var(--muted)]">
            DESIGN SMOOTHIE
          </p>

          <p className="mt-4 text-xl font-semibold text-[var(--text-dark)]">
            Branding & Signage
          </p>

          <p className="mt-3 leading-7 text-[var(--muted)]">
            브랜딩부터 간판까지,
            <br />
            기억에 남는 디자인을 만듭니다.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm font-semibold text-[var(--text)] md:items-end">
          <div className="flex flex-wrap gap-6">
            <Link
              href="/portfolio"
              className="transition hover:text-[#94b63f]"
            >
              PORTFOLIO
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#94b63f]"
            >
              CONTACT
            </Link>

            <Link
              href="/guide"
              className="transition hover:text-[#94b63f]"
            >
              REQUEST GUIDE
            </Link>
          </div>

          <a
            href="mailto:hello_smoothie@naver.com"
            className="text-[var(--muted)] transition hover:text-[#94b63f]"
          >
            hello_smoothie@naver.com
          </a>

          <p className="text-xs text-[var(--muted)]">
            © 2026 Design Smoothie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}