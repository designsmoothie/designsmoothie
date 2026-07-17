import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioCategories } from "@/data/portfolio";
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
    (item) => item.slug === category
  );

  if (!currentCategory) {
    return {
      title: "포트폴리오",
    };
  }

  return {
    title: `${currentCategory.title} 포트폴리오`,
    description: currentCategory.description,
    alternates: {
      canonical: `/portfolio/${currentCategory.slug}`,
    },
  };
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = portfolioCategories.find(
    (item) => item.slug === category
  );

  if (!currentCategory) {
    notFound();
  }

  const currentCategoryIndex = portfolioCategories.findIndex(
    (item) => item.slug === currentCategory.slug
  );

  const nextCategory =
    portfolioCategories[
      (currentCategoryIndex + 1) % portfolioCategories.length
    ];

  return (
    <PortfolioCategoryClient
      currentCategory={currentCategory}
      nextCategory={nextCategory}
    />
  );
}