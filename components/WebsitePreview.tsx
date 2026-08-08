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

/*
 * 카드가 화면에 들어오기 훨씬 전부터
 * 실제 웹사이트를 미리 로딩합니다.
 *
 * 이렇게 해야 사용자가 포트폴리오까지
 * 스크롤했을 때 이미 Hero가 움직이고 있는
 * 상태를 볼 가능성이 높아집니다.
 */
const PRELOAD_MARGIN = "1200px";

/*
 * 일정 시간 이상 로딩되지 않으면
 * fallback 이미지를 그대로 유지합니다.
 */
const LOAD_TIMEOUT = 10000;

export default function WebsitePreview({
  url,
  title,
  fallbackImage,
  priority = false,
}: WebsitePreviewProps) {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const [scale, setScale] =
    useState(1);

  /*
   * priority인 미리보기는 처음부터 로딩합니다.
   * 메인 Featured 웹 프로젝트에 특히 유리합니다.
   */
  const [shouldLoad, setShouldLoad] =
    useState(priority);

  const [isLoaded, setIsLoaded] =
    useState(false);

  const [hasLoadError, setHasLoadError] =
    useState(false);

  /*
   * 화면에 들어오기 훨씬 전부터 iframe 선로딩
   */
  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

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
          rootMargin:
            PRELOAD_MARGIN,
        },
      );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  /*
   * 실제 1440px 데스크톱 화면을
   * 카드 크기에 맞춰 축소합니다.
   */
  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    function updateScale() {
      const currentContainer =
        containerRef.current;

      if (!currentContainer) {
        return;
      }

      setScale(
        currentContainer.clientWidth /
          DESKTOP_PREVIEW_WIDTH,
      );
    }

    updateScale();

    const resizeObserver =
      new ResizeObserver(
        updateScale,
      );

    resizeObserver.observe(
      container,
    );

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /*
   * 너무 오래 로딩되는 사이트는
   * 이미지 fallback을 유지합니다.
   */
  useEffect(() => {
    if (
      !shouldLoad ||
      isLoaded
    ) {
      return;
    }

    const timeoutId =
      window.setTimeout(() => {
        if (!isLoaded) {
          setHasLoadError(true);
        }
      }, LOAD_TIMEOUT);

    return () => {
      window.clearTimeout(
        timeoutId,
      );
    };
  }, [
    shouldLoad,
    isLoaded,
  ]);

  /*
   * URL이 변경되면 상태 초기화
   */
  useEffect(() => {
    setIsLoaded(false);
    setHasLoadError(false);

    if (priority) {
      setShouldLoad(true);
    }
  }, [url, priority]);

  const showFallback =
    Boolean(fallbackImage) &&
    (!isLoaded ||
      hasLoadError);

  const showLive =
    shouldLoad &&
    !hasLoadError;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-[#e5e1da]"
    >
      {/* 라이브 웹사이트 */}
      {showLive && (
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 origin-top-left transition-opacity duration-[180ms] ease-out ${
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
            onLoad={() => {
              /*
               * iframe의 첫 화면이 그려진
               * 다음 프레임에서 표시합니다.
               */
              requestAnimationFrame(
                () => {
                  requestAnimationFrame(
                    () => {
                      setHasLoadError(
                        false,
                      );

                      setIsLoaded(
                        true,
                      );
                    },
                  );
                },
              );
            }}
            onError={() => {
              setHasLoadError(true);
              setIsLoaded(false);
            }}
            className="h-full w-full border-0 bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      )}

      {/* 로딩 중 / 실패 시 fallback */}
      {fallbackImage && (
        <Image
          src={fallbackImage}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 66vw"
          className={`z-20 object-cover transition-[opacity,transform] duration-[180ms] ease-out ${
            showFallback
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-[1.005] opacity-0"
          }`}
        />
      )}

      {/* fallback 이미지조차 없을 때 */}
      {!fallbackImage &&
        !isLoaded && (
          <div className="absolute inset-0 z-0 bg-[#e5e1da]" />
        )}

      {/* 미세한 통일감용 오버레이 */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-black/[0.01] via-transparent to-black/[0.04]" />

      {/* 로딩 실패 시에는 사진을 유지 */}
      {hasLoadError &&
        fallbackImage && (
          <div className="pointer-events-none absolute bottom-4 right-4 z-40">
            <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[8px] font-semibold tracking-[0.16em] text-white/70 backdrop-blur-md">
              WEBSITE PREVIEW
            </span>
          </div>
        )}
    </div>
  );
}