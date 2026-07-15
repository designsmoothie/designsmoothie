"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                scale: isBanner ? 1.025 : 1.08,
                filter: "blur(12px)",
              }
        }
        whileInView={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        viewport={{
          once: true,
          amount: 0.28,
          margin: "0px 0px -8% 0px",
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.045] ${
            isBanner ? "object-contain" : "object-cover"
          }`}
        />
      </motion.div>
    </div>
  );
}