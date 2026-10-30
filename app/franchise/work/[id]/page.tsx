import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findFranchiseCategory, getFranchiseThumbnail } from "@/lib/franchise/config";
import { getFranchiseWork } from "@/lib/franchise/data";
import WorkVideo from "@/components/franchise/WorkVideo";
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await getFranchiseWork((await params).id);
  if (!work) return { robots: { index: false } };
  const image = getFranchiseThumbnail(work);
  return { title: `${work.title} | 디자인스무디`, description: work.description || `${findFranchiseCategory(work.category)?.title} 작업 사례`, alternates: { canonical: `/franchise/work/${work.id}` }, ...(image ? { openGraph: { images: [image.url] } } : {}) };
}
export default async function WorkPage({ params }: Props) {
  const work = await getFranchiseWork((await params).id);
  if (!work) notFound();
  const category = findFranchiseCategory(work.category);
  const thumbnail = getFranchiseThumbnail(work);
  return <article className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 md:px-12">
    <Link href={`/franchise/${work.category}`} className="text-sm text-[var(--muted)]">← {category?.title}</Link>
    <p className="mt-8 text-sm text-[var(--muted)]">{category?.title}{work.client && ` · ${work.client}`}</p><h1 className="mt-2 text-3xl font-semibold text-[var(--text-dark)] md:text-5xl">{work.title}</h1>
    {work.description && <p className="mt-6 max-w-3xl whitespace-pre-line">{work.description}</p>}
    <div className="my-10 space-y-8">{work.media.map((item) => <figure key={item.id}>{item.type === "video" ? <WorkVideo src={item.url} poster={thumbnail?.url} title={item.alt || work.title} /> : <Image src={item.url} alt={item.alt || work.title} width={1800} height={1200} sizes="(max-width: 1200px) 100vw, 1104px" className="h-auto w-full rounded-xl" style={{ height: "auto" }} />}{item.alt && <figcaption className="mt-2 text-sm text-[var(--muted)]">{item.alt}</figcaption>}</figure>)}</div>
    <div className="flex flex-wrap justify-between gap-4 border-t border-[var(--line)] py-8"><Link href={`/franchise/${work.category}`}>같은 품목 더 보기 →</Link><Link href="/contact" className="font-semibold text-[var(--text-dark)]">제작 문의 ↗</Link></div>
  </article>;
}
