import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findFranchiseCategory, franchiseCategories } from "@/lib/franchise/config";
import { getFranchiseWorks } from "@/lib/franchise/data";
import WorkCard from "@/components/franchise/WorkCard";
type Props = { params: Promise<{ category: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = findFranchiseCategory((await params).category);
  if (!category) return {};
  return { title: `${category.title} | 프랜차이즈 제작물 | 디자인스무디`, description: category.description, alternates: { canonical: `/franchise/${category.slug}` } };
}
export default async function CategoryPage({ params }: Props) {
  const category = findFranchiseCategory((await params).category);
  if (!category) notFound();
  const works = (await getFranchiseWorks()).filter((work) => work.category === category.slug);
  return <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 md:px-12 lg:px-16">
    <Link href={`/franchise#${category.group}`} className="text-sm text-[var(--muted)]">← 프랜차이즈 제작물</Link>
    <h1 className="mt-6 text-3xl font-semibold text-[var(--text-dark)] md:text-5xl">{category.title}</h1><p className="mt-4 text-sm md:text-base">{category.description}</p>
    <nav aria-label="제작 품목" className="my-8 flex flex-wrap gap-2">{franchiseCategories.map((item) => <Link key={item.slug} href={`/franchise/${item.slug}`} aria-current={item.slug === category.slug ? "page" : undefined} className={`rounded-full border px-4 py-2 text-xs ${item.slug === category.slug ? "border-[var(--green)] bg-[var(--green)] text-[var(--text-dark)]" : "border-[var(--line)] hover:bg-white"}`}>{item.title}</Link>)}</nav>
    {works.length ? <div className="grid gap-x-6 gap-y-10 pb-16 sm:grid-cols-2 lg:grid-cols-3">{works.map((work) => <WorkCard key={work.id} work={work} />)}</div> : <div className="rounded-2xl border border-[var(--line)] px-6 py-16 text-center"><p>작업 사례를 준비하고 있습니다.</p><Link href="/contact" className="mt-6 inline-block rounded-full bg-[var(--green)] px-6 py-3 text-sm font-semibold text-[var(--text-dark)]">{category.title} 제작 문의 ↗</Link></div>}
  </div>;
}
