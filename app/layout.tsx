import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import { getSiteSettings } from "@/lib/settings";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_SITE_URL = "https://designsmoothie.kr";

const SEO_BRAND_NAME = "디자인스무디";
const ENGLISH_BRAND_NAME = "Design Smoothie";

const DEFAULT_TITLE =
  "디자인스무디 | 브랜딩 · 사이니지 · 공간그래픽 디자인";

const DEFAULT_DESCRIPTION =
  "브랜딩부터 간판, 파사드, 공간그래픽, 배너, 인쇄물까지. 디자인스무디는 브랜드의 시작부터 공간까지 연결하는 디자인 스튜디오입니다.";

const DEFAULT_KEYWORDS = [
  "디자인스무디",
  "부산디자인",
  "부산간판",
  "부산간판디자인",
  "부산디자인간판",
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
];

function getValidUrl(
  value: string | null | undefined,
  fallback = DEFAULT_SITE_URL,
) {
  try {
    return new URL(value || fallback);
  } catch {
    return new URL(fallback);
  }
}

function getKeywords(value: string | null | undefined) {
  if (!value) {
    return DEFAULT_KEYWORDS;
  }

  const keywords = value
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return keywords.length > 0 ? keywords : DEFAULT_KEYWORDS;
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const siteUrl = getValidUrl(settings?.canonical_url);

  const siteTitle =
    settings?.site_title || DEFAULT_TITLE;

  const siteDescription =
    settings?.site_description || DEFAULT_DESCRIPTION;

  const ogImage =
    settings?.og_image || "/og-image.jpg";

  const favicon =
    settings?.favicon || "/favicon.png?v=2";

  const otherVerification: Record<string, string> = {
    "naver-site-verification":
      settings?.naver_verification ||
      "1d3c959632c1136789092f03bc7606ed870def18",
  };

  if (settings?.bing_verification) {
    otherVerification["msvalidate.01"] =
      settings.bing_verification;
  }

  return {
    metadataBase: siteUrl,

    applicationName: SEO_BRAND_NAME,

    title: {
      default: siteTitle,
      template: `%s | ${SEO_BRAND_NAME}`,
    },

    description: siteDescription,

    keywords: getKeywords(settings?.site_keywords),

    authors: [
      {
        name: SEO_BRAND_NAME,
        url: siteUrl.toString(),
      },
    ],

    creator: SEO_BRAND_NAME,
    publisher: SEO_BRAND_NAME,

    alternates: {
      canonical: "/",
    },

    verification: {
      google:
        settings?.google_verification ||
        "vK0Pxr5n5bF8P7aZ2WcdDdXYFwW6LHAt3Z-i",

      other: otherVerification,
    },

    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
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
      title: siteTitle,
      description: siteDescription,
      url: "/",
      type: "website",
      locale: "ko_KR",

      // 네이버/검색엔진에 한글 브랜드명을 명확하게 전달
      siteName: SEO_BRAND_NAME,

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SEO_BRAND_NAME} 브랜딩 및 사이니지 디자인 스튜디오`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
    },

    category: "design",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const siteUrl = getValidUrl(
    settings?.canonical_url,
  ).toString();

  const baseUrl = siteUrl.replace(/\/$/, "");

  const siteDescription =
    settings?.site_description ||
    DEFAULT_DESCRIPTION;

  /*
   * 네이버 사이트 연관채널
   *
   * CMS 사이트 설정에 저장되어 있는
   * 네이버 블로그 / 인스타그램 / 카카오 채널 주소를
   * 디자인스무디 공식 채널로 검색엔진에 전달합니다.
   */
  const sameAs = Array.from(
    new Set(
      [
        "https://blog.naver.com/hello_smoothie",
        "https://www.instagram.com/smoothie.sign?igsh=MTRvOXAxMWN1azQxZA==",
        "http://pf.kakao.com/_geqBn/chat"
      ]
        .map((url) => url?.trim())
        .filter(
          (url): url is string =>
            Boolean(url),
        ),
    ),
  );

  /*
   * 디자인스무디 브랜드 정보
   *
   * 중요:
   * name을 "Design Smoothie"가 아니라
   * "디자인스무디"로 고정합니다.
   *
   * 네이버에서 사용자가 실제로 검색하는
   * 브랜드명과 사이트 이름을 일치시키기 위함입니다.
   */
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${baseUrl}/#organization`,

    name: SEO_BRAND_NAME,

    alternateName: ENGLISH_BRAND_NAME,

    url: baseUrl,

    logo: `${baseUrl}/designsmoothie_logo1.png`,

    description: siteDescription,

    sameAs,

    ...(settings?.email
      ? {
          email: settings.email,
        }
      : {}),

    ...(settings?.phone
      ? {
          telephone: settings.phone,
        }
      : {}),

    ...(settings?.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
            addressCountry: "KR",
          },
        }
      : {}),

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
  };

  /*
   * 웹사이트 자체의 이름도
   * "디자인스무디"로 검색엔진에 명시합니다.
   */
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": `${baseUrl}/#website`,

    url: `${baseUrl}/`,

    name: SEO_BRAND_NAME,

    alternateName: ENGLISH_BRAND_NAME,

    description: siteDescription,

    inLanguage: "ko-KR",

    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",

    "@id": `${baseUrl}/#service`,

    name: "디자인스무디 브랜딩 및 사이니지 디자인 서비스",

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
      "@id": `${baseUrl}/#organization`,
    },

    areaServed: {
      "@type": "Country",
      name: "대한민국",
    },

    url: `${baseUrl}/`,
  };

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

        {/* 디자인스무디 브랜드 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              organizationJsonLd,
            ),
          }}
        />

        {/* 디자인스무디 웹사이트 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              websiteJsonLd,
            ),
          }}
        />

        {/* 디자인스무디 서비스 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              serviceJsonLd,
            ),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5BWXM253QV"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              window.dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'G-5BWXM253QV');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
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