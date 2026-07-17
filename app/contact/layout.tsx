import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "디자인·간판 제작 문의",
  description:
    "브랜딩, 간판, 파사드, 공간그래픽, 인쇄물 제작 상담은 디자인스무디로 문의하세요.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}