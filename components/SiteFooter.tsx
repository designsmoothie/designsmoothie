import Link from "next/link";

const footerLinks = [
  {
    label: "PORTFOLIO",
    href: "/portfolio",
  },
  {
    label: "SERVICE",
    href: "/#service",
  },
  {
    label: "PROCESS",
    href: "/#process",
  },
  {
    label: "ABOUT",
    href: "/#about",
  },
  {
    label: "CONTACT",
    href: "/contact",
  },
  {
    label: "REQUEST GUIDE",
    href: "/guide",
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-[var(--cream)]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              DESIGN SMOOTHIE
            </p>

            <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
              브랜드의 시작부터
              <br />
              공간의 완성까지.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--text)] md:text-lg">
              브랜딩, 간판, 파사드, 공간 그래픽을 하나의 흐름으로 연결해
              오래 기억되는 브랜드 경험을 만듭니다.
            </p>

            <p className="mt-10 text-sm font-semibold tracking-[0.16em] text-[var(--green)]">
              JUST SMOOTHIE-ISH.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:pt-2">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)]">
                NAVIGATION
              </p>

              <nav className="mt-6 flex flex-col items-start gap-4">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-[var(--text-dark)] transition duration-300 hover:text-[var(--green)]"
                  >
                    {link.label}

                    <span className="translate-x-[-4px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)]">
                CONTACT
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Email
                  </p>

                  <a
                    href="mailto:hello_smoothie@naver.com"
                    className="mt-1 inline-block text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:text-[var(--green)]"
                  >
                    hello_smoothie@naver.com
                  </a>
                </div>

                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Main channel
                  </p>

                  <Link
                    href="/contact"
                    className="mt-1 inline-block text-sm font-semibold text-[var(--text-dark)] transition duration-300 hover:text-[var(--green)]"
                  >
                    카카오채널 상담
                  </Link>
                </div>

                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Service
                  </p>

                  <p className="mt-1 text-sm font-semibold leading-6 text-[var(--text-dark)]">
                    Branding
                    <br />
                    Signage
                    <br />
                    Space Graphic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-[var(--line)] pt-7 text-xs text-[var(--muted)] md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Design Smoothie. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <span>
              Branding & Signage Design Studio
            </span>

            <Link
              href="/contact"
              className="transition duration-300 hover:text-[var(--text-dark)]"
            >
              Project Inquiry
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}