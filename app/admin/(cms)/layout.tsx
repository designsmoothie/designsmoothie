import type {
  ReactNode,
} from "react";
import Link from "next/link";

import AdminLogoutButton from "@/components/AdminLogoutButton";

type CmsLayoutProps = {
  children: ReactNode;
};

const adminLinks = [
  {
    href: "/admin/dashboard",
    label: "대시보드",
  },
  {
    href: "/admin/projects",
    label: "프로젝트",
  },
  {
    href: "/admin/categories",
    label: "카테고리",
  },
  {
    href: "/admin/blog",
    label: "블로그",
  },
  {
    href: "/admin/inquiries",
    label: "문의관리",
  },
  {
    href: "/admin/seo",
    label: "SEO",
  },
  {
    href: "/admin/settings",
    label: "설정",
  },
];

export default function CmsLayout({
  children,
}: CmsLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-5 px-5 md:px-8">
          <div className="flex min-w-0 items-center gap-7">
            <Link
              href="/admin/dashboard"
              className="shrink-0 text-sm font-bold tracking-[-0.03em] text-neutral-950"
            >
              Design Smoothie CMS
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-xs font-semibold text-neutral-700 transition hover:border-[#94b63f] hover:bg-[#94b63f]/10 hover:text-[#587019]"
            >
              홈페이지 보기

              <span aria-hidden="true">
                ↗
              </span>
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto border-t border-black/5 px-4 py-2 lg:hidden">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1600px] px-5 py-7 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}