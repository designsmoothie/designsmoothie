import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
export default function FranchiseLayout({ children }: { children: React.ReactNode }) {
  return <><Header /><main className="min-h-[70vh] bg-[var(--cream)] text-[var(--text)]">{children}</main><SiteFooter /></>;
}
