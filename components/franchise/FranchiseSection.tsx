import Image from "next/image";
import Link from "next/link";
import { franchiseCategories, franchiseGroups, getFranchiseThumbnail } from "@/lib/franchise/config";
import { getFranchiseWorks } from "@/lib/franchise/data";
import MaterialArtwork from "./MaterialArtwork";

export default async function FranchiseSection() {
  const works = await getFranchiseWorks();
  return <section id="franchise" className="mx-auto w-full max-w-[1600px] scroll-mt-24 px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-t border-[var(--line)] pt-10">
      <div><p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)]">FRANCHISE MATERIALS</p><h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text-dark)] md:text-4xl">프랜차이즈 제작물</h2></div>
      <Link href="/franchise" className="text-sm font-semibold text-[var(--text-dark)] underline underline-offset-8">제작 품목 전체 보기 ↗</Link>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {franchiseGroups.map((group, index) => {
        const categories = franchiseCategories.filter((item) => item.group === group.id);
        const candidates = works.filter((work) => categories.some((item) => item.slug === work.category));
        const lead = candidates.find((work) => work.featured && getFranchiseThumbnail(work)) ?? candidates.find((work) => getFranchiseThumbnail(work));
        const image = lead && getFranchiseThumbnail(lead);
        return <Link key={group.id} href={`/franchise#${group.id}`} className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl" style={{ backgroundColor: group.color }}>
            {image ? <Image src={image.url} alt={image.alt || lead!.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.03]" /> : <MaterialArtwork kind={group.id} />}
            <span className="absolute left-5 top-4 text-xs font-semibold tracking-widest text-[var(--text-dark)]">0{index + 1} / {group.english}</span>
            <span aria-hidden="true" className="absolute bottom-4 right-5 text-xl text-[var(--text-dark)]">↗</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-[var(--text-dark)]">{group.title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{categories.map((item) => item.title).join(" · ")}</p>
        </Link>;
      })}
    </div>
  </section>;
}
