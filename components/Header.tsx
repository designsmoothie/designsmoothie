"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    label: "PORTFOLIO",
    description: "Selected Works",
    href: "/#portfolio",
  },
  {
    label: "SERVICE",
    description: "Branding & Signage",
    href: "/#service",
  },
  {
    label: "PROCESS",
    description: "How We Work",
    href: "/#process",
  },
  {
    label: "ABOUT",
    description: "Design Smoothie",
    href: "/#about",
  },
  {
    label: "CONTACT",
    description: "Let’s Start",
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
          ? "border-b border-black/5 bg-[var(--cream)]/90 shadow-[0_1px_18px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-[var(--cream)]/95 backdrop-blur-lg"
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
            className="inline-flex items-center justify-center rounded-full bg-[var(--green)] px-5 py-2.5 text-xs font-semibold text-[var(--text-dark)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--green-hover)]"
          >
            디자인 의뢰 안내
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/45 backdrop-blur-md transition hover:bg-white/75 md:hidden"
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
        className={`fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] bg-[var(--cream)]/98 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col px-6 pb-8 pt-6">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="group border-b border-black/6 py-5 transition duration-300"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 45}ms` : "0ms",
                }}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="block text-[2rem] font-semibold leading-none tracking-[-0.045em] text-[var(--text-dark)] transition group-hover:text-[var(--green)]">
                      {item.label}
                    </span>

                    <span className="mt-2 block text-xs font-medium tracking-[0.08em] text-[var(--muted)]">
                      {item.description}
                    </span>
                  </div>

                  <span className="pb-1 text-lg text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <Link
              href="/guide"
              onClick={closeMenu}
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--green)] px-6 py-4 text-sm font-semibold text-[var(--text-dark)] transition hover:bg-[var(--green-hover)]"
            >
              디자인 의뢰 안내사항
            </Link>

            <p className="mt-5 text-center text-[10px] font-semibold tracking-[0.2em] text-[var(--muted)]">
              BRANDING & SIGNAGE DESIGN STUDIO
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}