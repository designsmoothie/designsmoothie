"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

type PortfolioMotionImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  isBanner?: boolean;
};

export default function PortfolioMotionImage({
  src,
  alt,
  sizes,
  priority = false,
  isBanner = false,
}: PortfolioMotionImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    isBanner ? [-5, 5] : [-16, 16]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isBanner ? [1.005, 1, 1.005] : [1.025, 1, 1.025]
  );

  const smoothY = useSpring(rawY, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const smoothScale = useSpring(rawScale, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  return (
    <div ref={imageRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className={
          isBanner
            ? "absolute inset-0"
            : "absolute inset-[-4%]"
        }
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: smoothY,
                scale: smoothScale,
              }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] ${
            isBanner ? "object-contain" : "object-cover"
          }`}
        />
      </motion.div>
    </div>
  );
}