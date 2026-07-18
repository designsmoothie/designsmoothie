"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { PortfolioProject } from "@/data/projects";

type ProjectHoverPreviewProps = {
  project: PortfolioProject;
  isWideCard: boolean;
  priority?: boolean;
};

export default function ProjectHoverPreview({
  project,
  isWideCard,
  priority = false,
}: ProjectHoverPreviewProps) {
  const images = useMemo(() => {
    const source =
      project.images && project.images.length > 0
        ? project.images
        : [project.thumbnail];

    return source.slice(0, 6);
  }, [project.images, project.thumbnail]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const isBannerProject = project.category === "banner";
  const imageCount = project.images?.length || 1;
  const remainingCount = Math.max(imageCount - 3, 0);

  const imageSizes = isWideCard
    ? "(max-width: 768px) 100vw, 1400px"
    : "(max-width: 768px) 100vw, 700px";

  useEffect(() => {
    if (!isPreviewing || images.length <= 1) {
      setActiveIndex(0);
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 1250);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length, isPreviewing]);

  const wrapperClass = isBannerProject
    ? "aspect-[16/10]"
    : isWideCard
      ? "aspect-[4/3] md:aspect-[16/9]"
      : "aspect-[4/3]";

  return (
    <div
      className={`relative overflow-hidden bg-[#e5e1da] ${wrapperClass}`}
      onMouseEnter={() => setIsPreviewing(true)}
      onMouseLeave={() => setIsPreviewing(false)}
      onFocus={() => setIsPreviewing(true)}
      onBlur={() => setIsPreviewing(false)}
    >
      {/* 기본 다중 이미지 미리보기 */}
      {images.length === 1 ? (
        <div className="absolute inset-0">
          <Image
            src={images[0]}
            alt={`${project.title} 프로젝트 미리보기`}
            fill
            priority={priority}
            sizes={imageSizes}
            className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        </div>
      ) : images.length === 2 ? (
        <div className="absolute inset-0 grid grid-cols-2">
          {images.map((image, index) => (
            <div
              key={`${project.slug}-base-${image}-${index}`}
              className="relative overflow-hidden border-r border-white/25 last:border-r-0"
            >
              <Image
                src={image}
                alt={`${project.title} 미리보기 ${index + 1}`}
                fill
                priority={priority && index === 0}
                sizes={imageSizes}
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 grid grid-cols-[1.18fr_0.82fr]">
          <div className="relative overflow-hidden border-r border-white/25">
            <Image
              src={images[0]}
              alt={`${project.title} 대표 미리보기`}
              fill
              priority={priority}
              sizes={imageSizes}
              className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </div>

          <div className="grid grid-rows-2">
            {images.slice(1, 3).map((image, index) => (
              <div
                key={`${project.slug}-side-${image}-${index}`}
                className="relative overflow-hidden border-b border-white/25 last:border-b-0"
              >
                <Image
                  src={image}
                  alt={`${project.title} 추가 미리보기 ${index + 2}`}
                  fill
                  sizes={imageSizes}
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />

                {index === 1 && remainingCount > 0 && !isPreviewing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                      +{remainingCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 호버 시 전체 화면 자동 프리뷰 */}
      {images.length > 1 && (
        <div
          className={`absolute inset-0 z-10 bg-[#e5e1da] transition-opacity duration-500 ${
            isPreviewing ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={`${project.slug}-hover-${image}-${index}`}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeIndex === index
                  ? "scale-100 opacity-100"
                  : "scale-[1.025] opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`${project.title} 호버 프리뷰 ${index + 1}`}
                fill
                sizes={imageSizes}
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

          {/* 프리뷰 순서 표시 */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 md:bottom-7 md:left-7 md:right-7">
            {images.map((_, index) => (
              <span
                key={`${project.slug}-progress-${index}`}
                className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/35"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-white transition-all duration-500 ${
                    activeIndex === index ? "w-full" : "w-0"
                  }`}
                />
              </span>
            ))}
          </div>

          <div className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/15 px-3.5 py-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md md:right-7 md:top-7">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </div>
  );
}