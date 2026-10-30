"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { franchiseCategories, findFranchiseCategory, FRANCHISE_BUCKET, type FranchiseWork, type FranchiseMedia } from "@/lib/franchise/config";
import { deleteFranchiseWork, saveFranchiseWork } from "./actions";

const inputClass = "mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm";
const buttonClass = "rounded-lg border border-black/15 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-40";
const fileTypes: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "video/mp4": "mp4", "video/webm": "webm" };

async function prepareImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) { bitmap.close(); throw new Error("이미지를 처리하지 못했습니다."); }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("이미지 변환에 실패했습니다.")), "image/webp", 0.88));
  return new File([blob], "image.webp", { type: "image/webp" });
}

export default function FranchiseManager({ initialWorks }: { initialWorks: FranchiseWork[] }) {
  const supabase = useMemo(() => createClient(), []);
  const [works, setWorks] = useState(initialWorks);
  const [editing, setEditing] = useState<FranchiseWork | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filter, setFilter] = useState("");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const temporaryPaths = useRef(new Set<string>());
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty || busy) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, busy]);
  const visibleWorks = works.filter((work) => !filter || work.category === filter).sort((a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id));

  function change(patch: Partial<FranchiseWork>) {
    setEditing((work) => work ? { ...work, ...patch } : null); setDirty(true);
  }
  async function discardUploads() {
    const paths = [...temporaryPaths.current];
    if (!paths.length) return;
    const { error } = await supabase.storage.from(FRANCHISE_BUCKET).remove(paths);
    if (error) throw new Error("저장 전 파일을 정리하지 못했습니다.");
    temporaryPaths.current.clear();
  }
  async function openEditor(work?: FranchiseWork) {
    if (busy) return;
    if (dirty && !window.confirm("저장하지 않은 변경 사항을 버리고 다른 작업으로 이동할까요?")) return;
    setBusy(true);
    try {
      await discardUploads();
      setEditing(work ? structuredClone(work) : {
        id: crypto.randomUUID(), title: "", category: (filter || "foam-menu") as FranchiseWork["category"], client: "", description: "", media: [], thumbnail_id: null, status: "draft", featured: false, display_order: works.length ? Math.max(...works.map((item) => item.display_order)) + 10 : 0, updated_at: "",
      });
      setIsNew(!work); setDirty(false); setMessage("");
    } catch { setMessage("저장 전 업로드 파일을 정리하지 못했습니다. 연결 상태를 확인하고 다시 시도해 주세요."); }
    finally { setBusy(false); }
  }
  async function upload(files: File[], thumbnail = false) {
    if (!editing || busy || !files.length) return;
    if (editing.media.length + files.length > 50) { setMessage("파일은 작업당 최대 50개입니다."); return; }
    setBusy(true);
    const added: FranchiseMedia[] = [];
    let warning = "";
    try {
      for (const original of files) {
        if (!fileTypes[original.type]) throw new Error(`${original.name}: JPG, PNG, WEBP, MP4, WEBM만 지원합니다.`);
        const video = original.type.startsWith("video/");
        if (original.size > (video ? 45 : 15) * 1024 * 1024) throw new Error(`${original.name}: ${video ? "영상 45" : "이미지 15"}MB 이하로 준비해 주세요.`);
        setMessage(`${added.length + 1}/${files.length} · ${original.name} 업로드 중…`);
        const file = video ? original : await prepareImage(original);
        const id = crypto.randomUUID();
        const path = `${editing.id}/${id}.${fileTypes[file.type]}`;
        const { error } = await supabase.storage.from(FRANCHISE_BUCKET).upload(path, file, { upsert: false, contentType: file.type, cacheControl: "31536000" });
        if (error) throw new Error(`${original.name}: ${error.message}`);
        temporaryPaths.current.add(path);
        const { data } = supabase.storage.from(FRANCHISE_BUCKET).getPublicUrl(path);
        added.push({ id, path, url: data.publicUrl, type: video ? "video" : "image", alt: "" });
      }
    } catch (error) { warning = error instanceof Error ? error.message : "파일 업로드에 실패했습니다."; }
    finally {
      if (added.length) {
        const firstImage = added.find((item) => item.type === "image");
        change({ media: [...editing.media, ...added], thumbnail_id: thumbnail && firstImage ? firstImage.id : editing.thumbnail_id || firstImage?.id || null });
      }
      setMessage(`${added.length}개 업로드 완료. 저장 버튼을 눌러 반영해 주세요.${warning ? ` ${warning}` : ""}`);
      setBusy(false); setDragging(false);
    }
  }
  async function capture(video: HTMLVideoElement | null) {
    if (!video || !video.videoWidth || busy) { setMessage("영상이 로드된 후 원하는 장면에서 다시 눌러주세요."); return; }
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("이미지를 만들지 못했습니다.");
      ctx.drawImage(video, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("장면을 추출하지 못했습니다.")), "image/webp", 0.9));
      await upload([new File([blob], "video-thumbnail.webp", { type: "image/webp" })], true);
    } catch { setMessage("이 영상의 장면을 추출하지 못했습니다. 대표 이미지를 파일로 업로드해 주세요."); }
  }
  function move(index: number, direction: number) {
    if (!editing) return;
    const next = [...editing.media]; const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    change({ media: next });
  }
  function removeMedia(item: FranchiseMedia) {
    if (!editing) return;
    const media = editing.media.filter((value) => value.id !== item.id);
    change({ media, thumbnail_id: item.id === editing.thumbnail_id ? media.find((value) => value.type === "image")?.id || null : editing.thumbnail_id });
  }
  async function save() {
    if (!editing || busy) return;
    setBusy(true); setMessage("저장 중…");
    try {
      const result = await saveFranchiseWork(editing, isNew);
      if (result.ok) {
        // Removed files that were uploaded and then removed before saving are not in the DB.
        const unused = [...temporaryPaths.current].filter((path) => !result.work.media.some((item) => item.path === path));
        let cleanupMessage = "";
        if (unused.length) {
          const cleanup = await supabase.storage.from(FRANCHISE_BUCKET).remove(unused);
          if (cleanup.error) cleanupMessage = " 저장 전 제외한 파일 정리에 실패했습니다.";
        }
        temporaryPaths.current.clear();
        setWorks((items) => [...items.filter((item) => item.id !== result.work.id), result.work]);
        setEditing(result.work); setIsNew(false); setDirty(false); setMessage(result.message + cleanupMessage);
      } else setMessage(result.message);
    } catch { setMessage("서버에 연결하지 못했습니다. 변경 내용은 유지되어 있으니 다시 저장해 주세요."); }
    finally { setBusy(false); }
  }
  async function removeWork() {
    if (!editing || isNew || busy || !window.confirm(`‘${editing.title}’ 작업과 첨부 파일을 삭제할까요?`)) return;
    setBusy(true);
    try {
      const result = await deleteFranchiseWork(editing.id, editing.updated_at);
      if (result.ok) {
        let warning = "";
        try { await discardUploads(); } catch { warning = " 저장 전 업로드 파일 정리에 실패했습니다."; }
        temporaryPaths.current.clear();
        setWorks((items) => items.filter((item) => item.id !== editing.id)); setEditing(null); setDirty(false); setMessage(result.message + warning);
      } else setMessage(result.message);
    } catch { setMessage("삭제 요청에 실패했습니다. 새로고침 후 목록을 확인해 주세요."); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto max-w-[1600px] px-5 py-8 md:px-8">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-semibold">프랜차이즈 제작물</h1><p className="mt-2 text-sm text-neutral-500">사진과 영상을 함께 등록하세요. 노출 순서는 작은 숫자가 먼저입니다.</p></div><div className="flex gap-3"><Link href="/franchise" target="_blank" rel="noreferrer" className={buttonClass}>공개 페이지 ↗</Link><button disabled={busy} type="button" onClick={() => void openEditor()} className={buttonClass}>+ 작업 등록</button></div></div>
    <p role="status" aria-live="polite" className="mb-5 min-h-12 rounded-xl border border-black/5 bg-white px-4 py-3 text-sm">{message || "품목별로 작업을 등록하고 공개할 수 있습니다."}</p>
    <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-black/5 bg-white p-4"><label className="text-sm font-semibold">품목 필터<select value={filter} disabled={busy} onChange={(event) => setFilter(event.target.value)} className={inputClass}><option value="">전체 품목</option>{franchiseCategories.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label><div className="mt-4 space-y-2">{visibleWorks.map((work) => <button key={work.id} type="button" disabled={busy} onClick={() => void openEditor(work)} className={`w-full rounded-xl border p-3 text-left disabled:opacity-50 ${editing?.id === work.id ? "border-[#94b63f] bg-[#94b63f]/10" : "border-black/5 hover:bg-neutral-50"}`}><span className="block text-sm font-semibold">{work.title}</span><span className="mt-1 block text-xs text-neutral-500">{findFranchiseCategory(work.category)?.title} · {work.status === "published" ? "공개" : "비공개"} · 순서 {work.display_order}</span></button>)}{!visibleWorks.length && <p className="py-8 text-center text-sm text-neutral-500">등록된 작업이 없습니다.</p>}</div></aside>
      {editing ? <form onSubmit={(event) => { event.preventDefault(); startTransition(async () => { await save(); }); }} className="min-w-0 rounded-2xl border border-black/5 bg-white p-5 md:p-8"><fieldset disabled={busy}>
        <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold sm:col-span-2">작업 제목<input required maxLength={150} value={editing.title} onChange={(event) => change({ title: event.target.value })} className={inputClass} /></label><label className="text-sm font-semibold">품목<select value={editing.category} onChange={(event) => change({ category: event.target.value as FranchiseWork["category"] })} className={inputClass}>{franchiseCategories.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label><label className="text-sm font-semibold">업체명<input maxLength={150} value={editing.client} onChange={(event) => change({ client: event.target.value })} className={inputClass} /></label><label className="text-sm font-semibold sm:col-span-2">작업 설명<textarea rows={4} maxLength={5000} value={editing.description} onChange={(event) => change({ description: event.target.value })} className={inputClass} /></label><label className="text-sm font-semibold">공개 상태<select value={editing.status} onChange={(event) => change({ status: event.target.value as FranchiseWork["status"] })} className={inputClass}><option value="draft">비공개</option><option value="published">공개</option></select></label><label className="text-sm font-semibold">노출 순서<input type="number" min={0} max={1000000} required value={editing.display_order} onChange={(event) => change({ display_order: Number(event.target.value) })} className={inputClass} /></label><label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={editing.featured} onChange={(event) => change({ featured: event.target.checked })} />메인 대표 이미지로 우선 사용</label></div>
        <section className="mt-8 border-t border-black/10 pt-6"><h2 className="text-lg font-semibold">사진 · 영상</h2><p className="mt-2 text-sm text-neutral-500">이미지 15MB · MP4/WEBM 영상 45MB 이하 · 작업당 최대 50개. 이미지는 최대 2400px WebP로 최적화되며 영상은 원본 비율로 재생됩니다. MP4는 H.264 코덱을 권장합니다.</p><p className="mt-2 text-sm text-neutral-500">공개 시 대표 이미지가 필요합니다. 디지털 메뉴판은 영상도 필요합니다. 아래 순서대로 상세 페이지에 표시됩니다.</p>
          <div onDragOver={(event) => { event.preventDefault(); if (!busy) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); if (!busy) void upload(Array.from(event.dataTransfer.files)); }} className={`mt-5 rounded-xl border-2 border-dashed p-8 text-center ${dragging ? "border-[#94b63f] bg-[#94b63f]/10" : "border-black/15 bg-neutral-50"}`}><label className="cursor-pointer text-sm font-semibold">사진·영상을 끌어놓거나 파일 선택<input type="file" multiple accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" disabled={busy} className="mt-4 block w-full text-sm" onChange={(event) => { const input = event.currentTarget; const files = Array.from(input.files ?? []); input.value = ""; void upload(files); }} /></label></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">{editing.media.map((item, index) => <div key={item.id} className="min-w-0 rounded-xl border border-black/10 p-3">
            {item.type === "video" ? <><video id={`video-${item.id}`} src={item.url} crossOrigin="anonymous" controls muted playsInline preload="metadata" aria-label="업로드 영상 미리보기" className="h-48 w-full rounded-lg bg-black object-contain" /><button type="button" className={`${buttonClass} mt-2 w-full`} onClick={() => void capture(document.getElementById(`video-${item.id}`) as HTMLVideoElement | null)}>현재 장면을 대표 이미지로 추출</button></> : <img src={item.url} alt={item.alt || "업로드 이미지 미리보기"} className="h-48 w-full rounded-lg bg-neutral-50 object-contain" />}
            <div className="my-3 flex flex-wrap items-center gap-2"><span className="text-xs text-neutral-500">{index + 1} · {item.type === "video" ? "영상" : "이미지"}</span>{item.type === "image" && <button type="button" className={`${buttonClass} ${editing.thumbnail_id === item.id ? "bg-[#94b63f]/20" : ""}`} onClick={() => change({ thumbnail_id: item.id })}>{editing.thumbnail_id === item.id ? "✓ 대표 이미지" : "대표로 지정"}</button>}<button type="button" aria-label={`${index + 1}번 파일 앞으로 이동`} disabled={busy || index === 0} className={buttonClass} onClick={() => move(index, -1)}>↑</button><button type="button" aria-label={`${index + 1}번 파일 뒤로 이동`} disabled={busy || index === editing.media.length - 1} className={buttonClass} onClick={() => move(index, 1)}>↓</button><button type="button" className={buttonClass} onClick={() => removeMedia(item)}>제외</button></div>
            <label className="text-xs text-neutral-500">사진·영상 설명 (선택)<input maxLength={200} value={item.alt} className={inputClass} onChange={(event) => change({ media: editing.media.map((value) => value.id === item.id ? { ...value, alt: event.target.value } : value) })} /></label>
          </div>)}</div>
        </section>
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-black/10 pt-5"><button type="submit" className="rounded-xl bg-neutral-950 px-7 py-3 text-sm font-semibold text-white disabled:opacity-40">{busy ? "처리 중…" : "저장하기"}</button>{dirty && <span className="text-xs text-amber-700">저장하지 않은 변경 사항</span>}{!isNew && !dirty && editing.status === "published" && <Link href={`/franchise/work/${editing.id}`} target="_blank" rel="noreferrer" className={buttonClass}>공개 결과 보기 ↗</Link>}{!isNew && <button type="button" onClick={() => startTransition(async () => { await removeWork(); })} className="ml-auto text-sm text-red-700">작업 삭제</button>}</div>
      </fieldset></form> : <div className="rounded-2xl border border-black/5 bg-white p-12 text-center text-sm text-neutral-500">왼쪽에서 작업을 선택하거나 ‘+ 작업 등록’을 눌러주세요.</div>}
    </div>
  </div>;
}
