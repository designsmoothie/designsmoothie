"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type WebsitePreviewProps = {
  url: string;
  title: string;
  fallbackImage?: string;
  priority?: boolean;
};

const DESKTOP_PREVIEW_WIDTH = 1440;
const DESKTOP_PREVIEW_HEIGHT = 900;

export default function WebsitePreview({
  url,
  title,
  fallbackImage,
  priority = false,
}: WebsitePreviewProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [scale, setScale] =
    useState(1);

  const [shouldLoad, setShouldLoad] =
    useState(false);

  const [isLoaded, setIsLoaded] =
    useState(false);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: "300px",
        },
      );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    function updateScale() {
      if (!container) {
        return;
      }

      setScale(
        container.clientWidth /
          DESKTOP_PREVIEW_WIDTH,
      );
    }

    updateScale();

    const resizeObserver =
      new ResizeObserver(updateScale);

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#dedbd3]"
      aria-hidden="true"
    >
      {fallbackImage && (
        <Image
          src={fallbackImage}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 66vw"
          className={`z-0 object-cover transition-opacity duration-700 ${
            isLoaded
              ? "opacity-0"
              : "opacity-100"
          }`}
        />
      )}

      {shouldLoad && (
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 origin-top-left transition-opacity duration-700 ${
            isLoaded
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            width:
              DESKTOP_PREVIEW_WIDTH,
            height:
              DESKTOP_PREVIEW_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            src={url}
            title={`${title} 웹사이트 미리보기`}
            loading="eager"
            tabIndex={-1}
            scrolling="no"
            onLoad={() =>
              setIsLoaded(true)
            }
            className="h-full w-full border-0 bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/[0.01] via-transparent to-black/[0.05]" />
    </div>
  );
}