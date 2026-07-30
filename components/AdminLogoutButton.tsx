"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    const supabase = createClient();

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "관리자 로그아웃 실패:",
        error,
      );

      window.alert(
        "로그아웃하지 못했습니다. 다시 시도해주세요.",
      );

      setIsLoggingOut(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-xs font-semibold text-neutral-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoggingOut
        ? "로그아웃 중..."
        : "로그아웃"}
    </button>
  );
}