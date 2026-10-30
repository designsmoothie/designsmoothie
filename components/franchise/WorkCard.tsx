import Image from "next/image";
import Link from "next/link";
import { findFranchiseCategory, getFranchiseThumbnail, type FranchiseWork } from "@/lib/franchise/config";
import MaterialArtwork from "./MaterialArtwork";

export default function WorkCard({ work }: { work: FranchiseWork }) {
  const image = getFranchiseThumbnail(work);
  const category = findFranchiseCategory(work.category);
  return <Link href={`/franchise/work/${work.id}`} className="group block min-w-0">
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--background-soft)]">
      {image ? <Image src={image.url} alt={image.alt || work.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.03]" /> : <MaterialArtwork kind={category?.group} />}
      {work.media.some((item) => item.type === "video") && <span className="absolute bottom-4 right-4 rounded-full bg-[var(--text-dark)] px-3 py-1 text-xs text-white">▶ 영상 보기</span>}
    </div>
    <p className="mt-4 text-xs text-[var(--muted)]">{category?.title}{work.client && ` · ${work.client}`}</p>
    <h2 className="mt-1 text-lg font-semibold text-[var(--text-dark)]">{work.title} <span aria-hidden="true">↗</span></h2>
  </Link>;
}
