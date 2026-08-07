"use client";

import Image from "next/image";

import WebsitePreview from "@/components/WebsitePreview";

type ProjectPreviewProps = {
  projectType?: "design" | "website";
  previewType?: "image" | "live";

  liveUrl?: string;
  image?: string;

  title: string;
  alt?: string;

  priority?: boolean;
  sizes?: string;

  imageClassName?: string;
  className?: string;

  showFallbackBackground?: boolean;
};

export default function ProjectPreview({
  projectType = "design",
  previewType = "image",

  liveUrl,
  image,

  title,
  alt,

  priority = false,
  sizes = "(max-width: 1024px) 100vw, 66vw",

  imageClassName = "object-cover",
  className = "",

  showFallbackBackground = true,
}: ProjectPreviewProps) {
  const canShowLiveWebsite =
    projectType === "website" &&
    previewType === "live" &&
    Boolean(liveUrl);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        showFallbackBackground
          ? "bg-[#dedbd3]"
          : ""
      } ${className}`}
    >
      {canShowLiveWebsite && liveUrl ? (
        <WebsitePreview
          url={liveUrl}
          title={title}
          fallbackImage={
            image || undefined
          }
          priority={priority}
        />
      ) : image ? (
        <Image
          src={image}
          alt={alt ?? `${title} 프로젝트 이미지`}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#dedbd3]">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-neutral-500">
            DESIGN SMOOTHIE
          </span>
        </div>
      )}
    </div>
  );
}