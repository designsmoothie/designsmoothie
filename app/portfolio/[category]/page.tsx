import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioCategories } from "@/data/portfolio";
import { getProjectsByCategory } from "@/data/projects";
import PortfolioCategoryClient from "@/components/PortfolioCategoryClient";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  const currentCategory = portfolioCategories.find(
    (item) => item.slug === category,
  );

  if (!currentCategory) {
    return {
      title: "포트폴리오",
      description:
        "디자인 스무디의 브랜딩, 간판, 공간, 인쇄물 디자인 포트폴리오입니다.",
    };
  }

  return {
    title: `${currentCategory.heroTitle} 포트폴리오`,
    description: currentCategory.description,
    keywords: currentCategory.keywords,
    alternates: {
      canonical: `/portfolio/${currentCategory.slug}`,
    },
    openGraph: {
      title: `${currentCategory.heroTitle} | 디자인 스무디`,
      description: currentCategory.description,
      url: `/portfolio/${currentCategory.slug}`,
      type: "website",
    },
  };
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = portfolioCategories.find(
    (item) => item.slug === category,
  );

  if (!currentCategory) {
    notFound();
  }

  const currentCategoryIndex = portfolioCategories.findIndex(
    (item) => item.slug === currentCategory.slug,
  );

  const nextCategory =
    portfolioCategories[
      (currentCategoryIndex + 1) % portfolioCategories.length
    ];

  const projects = getProjectsByCategory(currentCategory.slug);

  return (
    <PortfolioCategoryClient
      currentCategory={currentCategory}
      nextCategory={nextCategory}
      projects={projects}
    />
  );
}