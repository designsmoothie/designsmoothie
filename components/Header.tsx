"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--cream)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 md:px-12 md:py-4">
        <Link
          href="/#top"
          className="relative z-50 block"
          onClick={closeMenu}
          aria-label="디자인스무디 홈페이지 상단으로 이동"
        >
          <Image
            src="/designsmoothie_logo1.png"
            alt="Design Smoothie"
            width={340}
            height={140}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        {/* PC 메뉴 */}
        <nav className="hidden items-center gap-9 text-xs font-bold tracking-wide text-[var(--text)] md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[#94b63f]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* PC 의뢰 안내 버튼 */}
        <Link
          href="/guide"
          className="hidden rounded-full bg-[var(--green)] px-6 py-3 text-sm font-bold text-[var(--text-dark)] shadow-sm transition hover:-translate-y-1 md:inline-flex"
        >
          디자인 의뢰 안내사항
        </Link>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--cream)] md:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">
            {isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          </span>

          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-0 top-1 block h-[2px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[9px] block h-[2px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 top-[17px] block h-[2px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* 모바일 펼침 메뉴 */}
      <div
        className={`overflow-hidden border-t border-[var(--line)] bg-[var(--cream)] transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "max-h-[560px] opacity-100"
            : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] flex-col px-6 py-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-[var(--line)] py-5 text-lg font-semibold tracking-[0.08em] text-[var(--text-dark)] transition hover:text-[#94b63f]"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/guide"
            onClick={closeMenu}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--green)] px-6 py-4 text-sm font-bold text-[var(--text-dark)] shadow-sm"
          >
            디자인 의뢰 안내사항
          </Link>
        </nav>
      </div>
    </header>
  );
}