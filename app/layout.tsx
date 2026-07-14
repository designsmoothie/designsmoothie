import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://designsmoothie.kr"),

  title: {
    default: "디자인스무디 | 브랜딩 · 사이니지 · 공간그래픽 디자인",
    template: "%s | 디자인스무디",
  },

  description:
    "브랜딩부터 간판, 파사드, 공간그래픽, 배너, 인쇄물까지. 디자인스무디는 브랜드의 시작부터 공간까지 연결하는 디자인 스튜디오입니다.",

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
      url: "https://designsmoothie.kr",
    },
  ],

  creator: "Design Smoothie",
  publisher: "Design Smoothie",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "vK0Pxr5n5bF8P7aZ2WcdDdXYFwW6LHAt3Z-i",
    other: {
      "naver-site-verification":
        "1d3c959632c1136789092f03bc7606ed870def18",
    },
  },

  icons: {
    icon: "/favicon.png?v=2",
    shortcut: "/favicon.png?v=2",
    apple: "/favicon.png?v=2",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "디자인스무디 | 브랜딩 · 사이니지 디자인",
    description:
      "브랜딩부터 간판까지, 브랜드의 시작과 공간을 연결하는 디자인 스튜디오입니다.",
    url: "/",
    type: "website",
    locale: "ko_KR",
    siteName: "Design Smoothie",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "디자인스무디 브랜딩 및 사이니지 디자인 스튜디오",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "디자인스무디 | 브랜딩 · 사이니지 디자인",
    description:
      "브랜딩부터 간판까지, 브랜드의 시작과 공간을 연결하는 디자인 스튜디오입니다.",
    images: ["/og-image.jpg"],
  },

  category: "design",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://designsmoothie.kr/#organization",
  name: "Design Smoothie",
  alternateName: "디자인스무디",
  url: "https://designsmoothie.kr",
  logo: "https://designsmoothie.kr/designsmoothie_logo1.png",
  description:
    "디자인스무디는 부산을 기반으로 브랜딩, 로고, 간판, 파사드, 공간그래픽, 배너와 인쇄물 디자인을 제공하는 디자인 스튜디오입니다.",
  areaServed: {
    "@type": "Country",
    name: "대한민국",
  },
  knowsAbout: [
    "브랜딩",
    "브랜드 디자인",
    "로고 디자인",
    "간판 디자인",
    "사이니지 디자인",
    "파사드 디자인",
    "공간그래픽",
    "배너 디자인",
    "인쇄 디자인",
    "옥외광고",
  ],
  sameAs: [
    // 실제 공개 중인 인스타그램 주소가 있으면 여기에 넣기
    // "https://www.instagram.com/계정명",
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://designsmoothie.kr/#service",
  name: "브랜딩 및 사이니지 디자인 서비스",
  serviceType: [
    "브랜딩",
    "로고 디자인",
    "간판 디자인",
    "사이니지 디자인",
    "파사드 디자인",
    "공간그래픽",
    "배너 디자인",
    "인쇄 디자인",
  ],
  provider: {
    "@id": "https://designsmoothie.kr/#organization",
  },
  areaServed: {
    "@type": "Country",
    name: "대한민국",
  },
  url: "https://designsmoothie.kr",
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
      <body className="flex min-h-full flex-col">
<MotionProvider>
    <ScrollProgress />      
        {children}
        </MotionProvider>

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
  }}
/>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5BWXM253QV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'G-5BWXM253QV');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a] = c[a] || function(){
                (c[a].q = c[a].q || []).push(arguments);
              };

              t = l.createElement(r);
              t.async = 1;
              t.src = "https://www.clarity.ms/tag/" + i;

              y = l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "xlqykfucvc");
          `}
        </Script>
      </body>
    </html>
  );
}