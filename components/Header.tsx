"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    label: "PORTFOLIO",
    href: "/#portfolio",
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
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-black/5 bg-[var(--cream)]/80 shadow-[0_1px_18px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-[var(--cream)]/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[82px] md:px-12">
        <Link
          href="/#top"
          className="relative z-50 flex items-center"
          onClick={closeMenu}
          aria-label="디자인스무디 홈페이지 상단으로 이동"
        >
          <Image
            src="/designsmoothie_logo1.png"
            alt="Design Smoothie"
            width={340}
            height={140}
            priority
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative py-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--text)] transition duration-300 hover:text-[var(--text-dark)]"
              >
                {item.label}

                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[var(--green)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/guide"
            className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-5 py-2.5 text-xs font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#cbe96a]"
          >
            디자인 의뢰 안내
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/40 backdrop-blur-md transition hover:bg-white/70 md:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">
            {isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          </span>

          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 top-[14px] block h-[1.5px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-[72px] z-40 h-[calc(100vh-72px)] bg-[var(--cream)]/96 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col px-6 pb-10 pt-8">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-black/5 py-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-dark)] transition hover:text-[var(--green)]"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 40}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <Link
              href="/guide"
              onClick={closeMenu}
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--green)] px-6 py-4 text-sm font-semibold text-[var(--text-dark)] transition hover:bg-[#cbe96a]"
            >
              디자인 의뢰 안내사항
            </Link>

            <p className="mt-6 text-center text-xs tracking-[0.14em] text-[var(--muted)]">
              BRANDING & SIGNAGE DESIGN STUDIO
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}