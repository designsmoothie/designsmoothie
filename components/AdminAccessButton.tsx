import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function AdminAccessButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Link
      href={
        user
          ? "/admin/dashboard"
          : "/admin/login"
      }
      aria-label={
        user
          ? "CMS 관리 화면으로 이동"
          : "관리자 로그인"
      }
      className="fixed bottom-5 right-5 z-[100] inline-flex h-11 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/90 px-5 text-xs font-semibold text-neutral-700 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#94b63f] hover:text-[#587019]"
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-[#94b63f]"
      />

      {user ? "CMS 관리" : "관리자 로그인"}
    </Link>
  );
}