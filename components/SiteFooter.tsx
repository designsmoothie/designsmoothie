"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const footerLinks = [
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "SERVICE", href: "/#service" },
  { label: "PROCESS", href: "/#process" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/contact" },
  { label: "REQUEST GUIDE", href: "/guide" },
];

const ease = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export default function SiteFooter() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="overflow-hidden border-t border-black/5 bg-[var(--cream)]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 32,
                    filter: "blur(8px)",
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.85,
              ease,
            }}
          >
            <p className="text-xs font-semibold tracking-[0.28em] text-[var(--muted)]">
              DESIGN SMOOTHIE
            </p>

            <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--text-dark)] md:text-6xl">
              브랜드의 시작부터
              <br />
              공간의 완성까지.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--text)] md:text-lg">
              브랜딩, 간판, 파사드, 공간 그래픽을
              하나의 흐름으로 연결하여
              오래 기억되는 브랜드 경험을 만듭니다.
            </p>

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                    }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: reduceMotion ? 0 : 0.45,
              }}
              className="mt-12 text-sm font-semibold tracking-[0.18em] text-[var(--green)]"
            >
              JUST SMOOTHIE-ISH.
            </motion.p>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.8,
              delay: reduceMotion ? 0 : 0.12,
              ease,
            }}
            className="grid gap-12 sm:grid-cols-2 lg:pt-3"
          >
            <div>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)]">
                NAVIGATION
              </p>

              <nav className="mt-6 flex flex-col items-start gap-4">
                {footerLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            x: 14,
                          }
                    }
                    whileInView={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            x: 0,
                          }
                    }
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : index * 0.04,
                      ease,
                    }}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-[var(--text-dark)] transition-colors duration-300 hover:text-[var(--green)]"
                    >
                      {link.label}

                      <span className="translate-x-[-4px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--muted)]">
                CONTACT
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Email
                  </p>

                  <a
                    href="mailto:hello_smoothie@naver.com"
                    className="mt-2 inline-block text-sm font-semibold transition-colors duration-300 hover:text-[var(--green)]"
                  >
                    hello_smoothie@naver.com
                  </a>
                </div>

                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Main Channel
                  </p>

                  <Link
                    href="/contact"
                    className="mt-2 inline-block text-sm font-semibold transition-colors duration-300 hover:text-[var(--green)]"
                  >
                    카카오채널 상담
                  </Link>
                </div>

                <div>
                  <p className="text-xs text-[var(--muted)]">
                    Service
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-6">
                    Branding
                    <br />
                    Signage
                    <br />
                    Space Graphic
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: reduceMotion ? 0 : 0.25,
          }}
          className="mt-20 flex flex-col gap-5 border-t border-[var(--line)] pt-8 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between"
        >
          <p>
            © 2026 Design Smoothie. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <span>
              Branding & Signage Design Studio
            </span>

            <Link
              href="/contact"
              className="transition-colors duration-300 hover:text-[var(--text-dark)]"
            >
              Project Inquiry
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}