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
    offset: ["start 95%", "end 5%"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isBanner ? [-10, 0, 10] : [-42, 0, 42]
  );

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isBanner ? [1.015, 1.005, 1.015] : [1.1, 1.035, 1.1]
  );

  const smoothY = useSpring(rawY, {
    stiffness: 70,
    damping: 22,
    mass: 0.5,
  });

  const smoothScale = useSpring(rawScale, {
    stiffness: 70,
    damping: 22,
    mass: 0.5,
  });

  return (
    <div ref={imageRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className={
          isBanner
            ? "absolute inset-0"
            : "absolute inset-x-[-6%] inset-y-[-12%]"
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
          className={`transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.045] ${
            isBanner ? "object-contain" : "object-cover"
          }`}
        />
      </motion.div>
    </div>
  );
}