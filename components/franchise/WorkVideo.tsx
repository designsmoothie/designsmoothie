"use client";
import { useEffect, useRef } from "react";
export default function WorkVideo({ src, poster, title }: { src: string; poster?: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let autoStarted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced.matches && !autoStarted) {
        autoStarted = true;
        void video.play().catch(() => {});
      } else if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, []);
  return <video ref={ref} src={src} poster={poster} controls muted loop playsInline preload="metadata" aria-label={title} className="mx-auto max-h-[85svh] w-full rounded-xl bg-black object-contain" />;
}
