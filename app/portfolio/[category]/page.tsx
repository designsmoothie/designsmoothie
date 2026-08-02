import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioCategoryClient from "@/components/PortfolioCategoryClient";
import {
  getCmsCategories,
  getCmsProjectsByCategory,
  type CmsPortfolioCategory,
} from "@/lib/portfolio-data";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

type PortfolioCategoryView = {
  number: string;
  slug: string;
  title: string;
  heroTitle: string;
  subtitle: string;
  href: string;
  color: string;
  description: string;
  overviewTitle: string;
  overview: string;
  services: string[];
  keywords: string[];
  images: string[];
};

function convertCategory(
  category: CmsPortfolioCategory,
): PortfolioCategoryView {
  return {
    number: category.number,
    slug: category.slug,
    title: category.title,

    heroTitle: category.title,

    subtitle:
      category.subtitle ||
      "PORTFOLIO CATEGORY",

    href: category.href,

    color: category.color,

    description:
      category.description ||
      `${category.title} 관련 디자인 프로젝트를 확인할 수 있습니다.`,

    overviewTitle: "OVERVIEW",

    overview:
      category.description ||
      `${category.title} 분야의 디자인 작업을 소개합니다.`,

    services: category.services ?? [],

    keywords: [
      category.title,
      "디자인스무디",
      "포트폴리오",
    ],

    images: [],
  };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  const cmsCategories =
    await getCmsCategories();

  const matchedCategory =
    cmsCategories.find(
      (item) => item.slug === category,
    );

  if (!matchedCategory) {
    return {
      title: "포트폴리오",
      description:
        "디자인스무디의 브랜딩, 간판, 공간 디자인과 홈페이지 포트폴리오입니다.",
    };
  }

  const currentCategory =
    convertCategory(matchedCategory);

  return {
    title: `${currentCategory.title} 포트폴리오`,

    description:
      currentCategory.description,

    keywords:
      currentCategory.keywords,

    alternates: {
      canonical: `/portfolio/${currentCategory.slug}`,
    },

    openGraph: {
      title: `${currentCategory.title} | 디자인스무디`,

      description:
        currentCategory.description,

      url: `/portfolio/${currentCategory.slug}`,

      type: "website",
    },
  };
}

export default async function PortfolioCategoryPage({
  params,
}: Props) {
  const { category } = await params;

  const cmsCategories =
    await getCmsCategories();

  const sortedCategories = [
    ...cmsCategories,
  ].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder,
  );

  const currentCategoryIndex =
    sortedCategories.findIndex(
      (item) => item.slug === category,
    );

  if (currentCategoryIndex === -1) {
    notFound();
  }

  const currentCmsCategory =
    sortedCategories[
      currentCategoryIndex
    ];

  const nextCmsCategory =
    sortedCategories[
      (currentCategoryIndex + 1) %
        sortedCategories.length
    ];

  const currentCategory =
    convertCategory(
      currentCmsCategory,
    );

  const nextCategory =
    convertCategory(
      nextCmsCategory,
    );

  const projects =
    await getCmsProjectsByCategory(
      currentCategory.slug,
    );

  return (
    <PortfolioCategoryClient
      currentCategory={
        currentCategory
      }
      nextCategory={nextCategory}
      projects={projects}
    />
  );
}