import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { franchiseCategories, franchiseGroups, getFranchiseThumbnail } from "@/lib/franchise/config";
import { getFranchiseWorks } from "@/lib/franchise/data";
import MaterialArtwork from "@/components/franchise/MaterialArtwork";

export const metadata: Metadata = {
  title: "프랜차이즈 제작물 | 디자인스무디",
  description: "포맥스·조명·디지털 메뉴판부터 배너, 에어간판, 현수막, 포스터, 전단지, 명함까지. 품목별 작업 사례를 확인하세요.",
  alternates: { canonical: "/franchise" },
};
export default async function FranchisePage() {
  const works = await getFranchiseWorks();
  return <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 md:px-12 lg:px-16">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><h1 className="text-3xl font-semibold tracking-tight text-[var(--text-dark)] md:text-5xl">프랜차이즈 제작물</h1><Link href="/contact" className="rounded-full bg-[var(--green)] px-5 py-2 text-sm font-semibold text-[var(--text-dark)]">제작 문의 ↗</Link></div>
    <nav aria-label="제작물 분류" className="mb-10 flex flex-wrap gap-3">{franchiseGroups.map((group) => <a href={`#${group.id}`} key={group.id} className="rounded-full border border-[var(--line)] px-5 py-2 text-sm hover:bg-white">{group.title}</a>)}</nav>
    {franchiseGroups.map((group) => <section id={group.id} key={group.id} className="scroll-mt-28 border-t border-[var(--line)] py-8 md:py-12">
      <div className="mb-6 flex flex-wrap items-baseline gap-3"><h2 className="text-2xl font-semibold text-[var(--text-dark)]">{group.title}</h2><span className="text-xs tracking-widest text-[var(--muted)]">{group.english}</span></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{franchiseCategories.filter((item) => item.group === group.id).map((category) => {
        const matches = works.filter((work) => work.category === category.slug);
        const lead = matches.find((work) => work.featured && getFranchiseThumbnail(work)) ?? matches.find((work) => getFranchiseThumbnail(work));
        const image = lead && getFranchiseThumbnail(lead);
        return <Link key={category.slug} href={`/franchise/${category.slug}`} className="group rounded-2xl border border-[var(--line)] bg-white/30 p-4 transition-colors hover:bg-white/60">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl" style={{ backgroundColor: group.color }}>{image ? <Image src={image.url} alt={image.alt || lead!.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]" /> : <MaterialArtwork kind={group.id} />}{category.slug === "digital-menu" && <span className="absolute bottom-3 right-3 rounded-full bg-[var(--text-dark)] px-3 py-1 text-xs text-white">▶ VIDEO</span>}</div>
          <div className="mt-5 flex items-center justify-between gap-2"><h3 className="text-lg font-semibold text-[var(--text-dark)]">{category.title}</h3><span aria-hidden="true">↗</span></div>
          <p className="mt-2 text-sm">{category.description}</p><p className="mt-4 text-xs text-[var(--muted)]">{matches.length ? `작업 사례 ${matches.length}건` : "품목 자세히 보기"}</p>
        </Link>;
      })}</div>
    </section>)}
  </div>;
}
