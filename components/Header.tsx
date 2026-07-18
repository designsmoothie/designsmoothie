"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const menuItems = [
  {
    label: "SERVICE",
    description: "Branding & Signage",
    href: "/#service",
    sectionId: "service",
  },
  {
    label: "PORTFOLIO",
    description: "Selected Works",
    href: "/#portfolio",
    sectionId: "portfolio",
  },
  {
    label: "ABOUT",
    description: "Design Smoothie",
    href: "/#about",
    sectionId: "about",
  },
  {
    label: "PROCESS",
    description: "How We Work",
    href: "/#process",
    sectionId: "process",
  },
  {
    label: "CONTACT",
    description: "Let’s Start",
    href: "/contact",
    sectionId: "contact",
  },
];

export default function Header() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateHeaderStyle = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateHeaderStyle();

    window.addEventListener("scroll", updateHeaderStyle, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateHeaderStyle);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (pathname.startsWith("/portfolio")) {
      setActiveMenu("PORTFOLIO");
      return;
    }

    if (pathname.startsWith("/contact")) {
      setActiveMenu("CONTACT");
      return;
    }

    if (pathname !== "/") {
      setActiveMenu("");
      return;
    }

    const updateActiveSection = () => {
      const headerHeight = window.innerWidth >= 768 ? 78 : 72;
      const activationLine = headerHeight + 8;

      let nextActiveMenu = "";

      for (const item of menuItems) {
        const section = document.getElementById(item.sectionId);

        if (!section) {
          continue;
        }

        const sectionRect = section.getBoundingClientRect();

        const isActivationLineInsideSection =
          sectionRect.top <= activationLine &&
          sectionRect.bottom > activationLine;

        if (isActivationLineInsideSection) {
          nextActiveMenu = item.label;
          break;
        }
      }

      setActiveMenu((previousActiveMenu) => {
        if (previousActiveMenu === nextActiveMenu) {
          return previousActiveMenu;
        }

        return nextActiveMenu;
      });
    };

    const requestActiveSectionUpdate = () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current =
        window.requestAnimationFrame(updateActiveSection);
    };

    requestActiveSectionUpdate();

    window.addEventListener("scroll", requestActiveSectionUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestActiveSectionUpdate);
    window.addEventListener("load", requestActiveSectionUpdate);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener(
        "scroll",
        requestActiveSectionUpdate,
      );

      window.removeEventListener(
        "resize",
        requestActiveSectionUpdate,
      );

      window.removeEventListener(
        "load",
        requestActiveSectionUpdate,
      );
    };
  }, [pathname]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    closeMenu();

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setActiveMenu("");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-black/5 bg-[var(--cream)]/92 shadow-[0_1px_18px_rgba(0,0,0,0.035)] backdrop-blur-xl"
          : "border-b border-transparent bg-[var(--cream)]/96 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center px-5 sm:px-8 md:h-[78px] md:px-12 lg:px-16">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="relative z-50 flex shrink-0 items-center"
          aria-label="디자인스무디 홈페이지 상단으로 이동"
        >
          <Image
            src="/designsmoothie_logo1.png"
            alt="Design Smoothie"
            width={340}
            height={140}
            priority
            className="h-11 w-auto object-contain md:h-[52px]"
          />
        </Link>

        <div className="ml-auto hidden items-center md:flex">
          <nav
            className="flex items-center gap-7 lg:gap-8"
            aria-label="주요 메뉴"
          >
            {menuItems.map((item) => {
              const isActive = activeMenu === item.label;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                  className={`group relative py-2 text-xs font-semibold tracking-[0.08em] transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--green)]"
                      : "text-[var(--text)] hover:text-[var(--text-dark)]"
                  }`}
                >
                  {item.label}

                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[var(--green)] opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
                  )}

                  {isActive && (
                    <motion.span
                      layoutId="active-navigation-indicator"
                      className="absolute bottom-0 left-0 h-px w-full bg-[var(--green)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 38,
                        mass: 0.65,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/guide"
            className="premium-button ml-8 inline-flex items-center justify-center rounded-full bg-[var(--green)] px-5 py-2.5 text-[11px] font-semibold text-[var(--text-dark)] hover:bg-[var(--green-hover)] lg:ml-10"
          >
            디자인 의뢰 안내
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsMenuOpen(
              (previousState) => !previousState,
            );
          }}
          className="relative z-50 ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/45 backdrop-blur-md transition hover:bg-white/75 md:hidden"
          aria-label={
            isMenuOpen ? "메뉴 닫기" : "메뉴 열기"
          }
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">
            {isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          </span>

          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen
                  ? "translate-y-[7px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[7px] block h-[1.5px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 top-[14px] block h-[1.5px] w-5 bg-[var(--text-dark)] transition duration-300 ${
                isMenuOpen
                  ? "-translate-y-[7px] -rotate-45"
                  : ""
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
        <nav
          className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-6"
          aria-label="모바일 주요 메뉴"
        >
          <div className="flex flex-col">
            {menuItems.map((item, index) => {
              const isActive = activeMenu === item.label;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="group border-b border-black/6 py-5 transition duration-300"
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${index * 45}ms`
                      : "0ms",
                  }}
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span
                        className={`block text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--green)]"
                            : "text-[var(--text-dark)] group-hover:text-[var(--green)]"
                        }`}
                      >
                        {item.label}
                      </span>

                      <span className="mt-2 block text-xs font-medium tracking-[0.06em] text-[var(--muted)]">
                        {item.description}
                      </span>
                    </div>

                    <span
                      className={`pb-1 text-lg transition-all duration-300 group-hover:translate-x-1 ${
                        isActive
                          ? "text-[var(--green)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            <Link
              href="/guide"
              onClick={closeMenu}
              className="premium-button inline-flex w-full items-center justify-center rounded-full bg-[var(--green)] px-6 py-4 text-sm font-semibold text-[var(--text-dark)] hover:bg-[var(--green-hover)]"
            >
              디자인 의뢰 안내사항
            </Link>

            <p className="mt-5 text-center text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)]">
              BRANDING & SIGNAGE DESIGN STUDIO
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}