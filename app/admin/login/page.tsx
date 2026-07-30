"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("이메일 또는 비밀번호를 확인해주세요.");
      setIsLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl"
      >
        <h1 className="mb-2 text-3xl font-bold">
          DesignSmoothie CMS
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          관리자 로그인
        </p>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일"
            autoComplete="email"
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border p-3"
          />

          {errorMessage && (
            <p className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-black py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </div>
      </form>
    </main>
  );
}