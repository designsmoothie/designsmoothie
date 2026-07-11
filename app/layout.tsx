import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "디자인스무디 | 브랜딩 · 사이니지 · 공간그래픽 디자인",
    template: "%s | 디자인스무디",
  },

  description:
    "브랜딩부터 간판, 파사드, 공간그래픽, 배너, 인쇄물까지. 디자인스무디는 브랜드의 시작부터 공간까지 연결하는 디자인 스튜디오입니다.",

    icons: {
  icon: "/favicon.png?v=2",
  shortcut: "/favicon.png?v=2",
  apple: "/favicon.png?v=2",
},

  keywords: [
    "디자인스무디",
    "부산디자인",
    "부산간판",
    "브랜딩",
    "브랜드디자인",
    "로고디자인",
    "간판디자인",
    "사이니지디자인",
    "파사드디자인",
    "공간그래픽",
    "사인디자인",
    "배너디자인",
    "인쇄디자인",
    "옥외광고",
    "부산디자이너",
  ],

  authors: [
    {
      name: "Design Smoothie",
    },
  ],

  creator: "Design Smoothie",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "디자인스무디 | 브랜딩 · 사이니지 디자인",
    description:
      "브랜딩부터 간판까지, 기억에 남는 브랜드를 만듭니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "Design Smoothie",
  },

  twitter: {
    card: "summary_large_image",
    title: "디자인스무디 | 브랜딩 · 사이니지 디자인",
    description:
      "브랜딩부터 간판까지, 기억에 남는 브랜드를 만듭니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}