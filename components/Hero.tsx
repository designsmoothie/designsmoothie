"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const premiumEase = [
  0.22,
  1,
  0.36,
  1,
] as [
  number,
  number,
  number,
  number,
];

export type HeroContent = {
  eyebrow?: string;
  service_label?: string;

  title_line_1?: string;
  title_line_2?: string;

  lead_text?: string;
  description?: string;

  primary_button_label?: string;
  primary_button_url?: string;

  secondary_button_label?: string;
  secondary_button_url?: string;

  image_url?: string;
  image_alt?: string;

  project_label?: string;
  project_title?: string;
  project_location?: string;
};

type HeroProps = {
  content?: HeroContent;
};

function renderMultilineText(
  text: string,
) {
  return text
    .split("\n")
    .map((line, index, lines) => (
      <span key={`${line}-${index}`}>
        {line}
        {index < lines.length - 1 && (
          <br />
        )}
      </span>
    ));
}

export default function Hero({
  content = {},
}: HeroProps) {
  const heroRef =
    useRef<HTMLElement>(null);

  const reduceMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll({
      target: heroRef,
      offset: [
        "start start",
        "end start",
      ],
    });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion
      ? ["0%", "0%"]
      : ["-2%", "5%"],
  );

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      reduceMotion
        ? [1, 1]
        : [1.015, 1.045],
    );

  const headingY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion
      ? [0, 0]
      : [0, 30],
  );

  const headingOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.68],
      reduceMotion
        ? [1, 1]
        : [1, 0.55],
    );

  const entrance = reduceMotion
    ? {
        initial: false as const,
        animate: undefined,
      }
    : {
        initial: {
          opacity: 0,
          y: 28,
          filter: "blur(8px)",
        },
        animate: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
      };

  const eyebrow =
    content.eyebrow ??
    "DESIGN SMOOTHIE";

  const serviceLabel =
    content.service_label ??
    "BRANDING · SIGNAGE · SPACE GRAPHIC";

  const titleLine1 =
    content.title_line_1 ??
    "Design that stays.";

  const titleLine2 =
    content.title_line_2 ??
    "Not just looks.";

  const leadText =
    content.lead_text ??
    `브랜딩부터 간판까지,
오래 기억되는 브랜드 경험을 만듭니다.`;

  const description =
    content.description ??
    `로고와 그래픽에 머무르지 않고,
브랜드가 실제 공간에서 어떻게 보이고
기억되는지까지 설계합니다.`;

  const primaryButtonLabel =
    content.primary_button_label ??
    "포트폴리오 보기";

  const primaryButtonUrl =
    content.primary_button_url ??
    "/portfolio";

  const secondaryButtonLabel =
    content.secondary_button_label ??
    "프로젝트 문의";

  const secondaryButtonUrl =
    content.secondary_button_url ??
    "/contact";

  const imageUrl =
    content.image_url ??
    "/images/hero/signage.jpg";

  const imageAlt =
    content.image_alt ??
    "디자인스무디 사이니지 프로젝트";

  const projectLabel =
    content.project_label ??
    "SELECTED PROJECT";

  const projectTitle =
    content.project_title ??
    "Signage & Brand Experience";

  const projectLocation =
    content.project_location ??
    "BUSAN · KOREA";

  return (
    <section
      ref={heroRef}
      className="overflow-hidden"
    >
      <div className="px-5 pt-28 sm:px-8 md:px-12 md:pt-32 lg:px-[4vw] lg:pt-[9vw]">
        <motion.div
          style={{
            y: headingY,
            opacity:
              headingOpacity,
          }}
        >
          <div className="flex items-center justify-between gap-6">
            <motion.p
              {...entrance}
              transition={{
                duration: 0.7,
                delay: 0.04,
                ease: premiumEase,
              }}
              className="section-label"
            >
              {eyebrow}
            </motion.p>

            <motion.p
              {...entrance}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: premiumEase,
              }}
              className="section-label hidden md:block"
            >
              {serviceLabel}
            </motion.p>
          </div>

          <div className="mt-8 border-t border-[var(--line)] pt-8 sm:mt-10 md:mt-12 md:pt-10 lg:mt-[3vw] lg:pt-[2.6vw]">
            <motion.h1
              {...entrance}
              transition={{
                duration: 0.95,
                delay: 0.12,
                ease: premiumEase,
              }}
              className="display-en-xl max-w-[1500px]"
            >
              {titleLine1}
            </motion.h1>

            <motion.h1
              {...entrance}
              transition={{
                duration: 0.95,
                delay: 0.2,
                ease: premiumEase,
              }}
              className="display-en-xl ml-[4vw] mt-2 max-w-[1500px] sm:mt-3 lg:ml-[7vw]"
            >
              {titleLine2}
            </motion.h1>
          </div>

          <div className="mt-12 grid gap-10 sm:mt-14 md:mt-16 md:grid-cols-[1fr_1fr] md:items-end lg:mt-[4vw] lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              {...entrance}
              transition={{
                duration: 0.82,
                delay: 0.3,
                ease: premiumEase,
              }}
              className="max-w-2xl"
            >
              <p className="lead-text">
                {renderMultilineText(
                  leadText,
                )}
              </p>
            </motion.div>

            <motion.div
              {...entrance}
              transition={{
                duration: 0.8,
                delay: 0.38,
                ease: premiumEase,
              }}
              className="md:justify-self-end"
            >
              <p className="body-large max-w-md">
                {renderMultilineText(
                  description,
                )}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 md:mt-8">
                <Link
                  href={
                    primaryButtonUrl
                  }
                  className="group inline-flex items-center gap-3 border-b border-[var(--text-dark)] pb-2 text-sm font-semibold text-[var(--text-dark)] transition-colors duration-300 hover:border-[var(--green)] hover:text-[var(--green)]"
                >
                  {
                    primaryButtonLabel
                  }

                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>

                <Link
                  href={
                    secondaryButtonUrl
                  }
                  className="group inline-flex items-center gap-3 border-b border-[var(--line)] pb-2 text-sm font-semibold text-[var(--text)] transition-colors duration-300 hover:border-[var(--text-dark)] hover:text-[var(--text-dark)]"
                >
                  {
                    secondaryButtonLabel
                  }

                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 38,
                scale: 0.994,
                filter:
                  "blur(10px)",
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                filter:
                  "blur(0px)",
              }
        }
        transition={{
          duration: 1.05,
          delay: 0.42,
          ease: premiumEase,
        }}
        className="mt-14 w-full sm:mt-16 md:mt-20 lg:mt-[5vw]"
      >
        <div className="relative h-[38vh] min-h-[300px] w-full overflow-hidden bg-[#ded7cb] sm:h-[42vh] sm:min-h-[350px] md:h-[46vh] md:min-h-[420px] lg:h-[50vh] lg:min-h-[460px] lg:max-h-[620px]">
          <motion.div
            className="absolute inset-[-5%] will-change-transform"
            style={{
              y: imageY,
              scale: imageScale,
            }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/5" />

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              duration: 0.78,
              delay: 0.82,
              ease: premiumEase,
            }}
            className="absolute inset-x-0 bottom-0"
          >
            <div className="grid gap-7 px-5 pb-7 text-white sm:px-8 sm:pb-9 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:pb-11 lg:px-[4vw] lg:pb-[3vw]">
              <div>
                <p className="text-[10px] font-semibold leading-[1.5] tracking-[0.2em] text-white/65 sm:text-xs">
                  {projectLabel}
                </p>

                <p className="mt-3 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[3.4vw]">
                  {projectTitle}
                </p>
              </div>

              <div className="flex items-end justify-between gap-8 md:block md:text-right">
                <p className="text-[10px] font-semibold leading-[1.5] tracking-[0.16em] text-white/65 sm:text-xs">
                  {
                    projectLocation
                  }
                </p>

                <span className="mt-5 hidden h-14 w-14 items-center justify-center rounded-full border border-white/35 text-lg text-white backdrop-blur-sm md:inline-flex">
                  ↘
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scaleY: 0,
                  }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    scaleY: 1,
                  }
            }
            transition={{
              duration: 0.85,
              delay: 0.92,
              ease: premiumEase,
            }}
            className="absolute right-5 top-5 hidden h-20 w-px origin-top bg-white/45 md:block lg:right-[4vw] lg:top-[3vw]"
          />
        </div>
      </motion.div>
    </section>
  );
}