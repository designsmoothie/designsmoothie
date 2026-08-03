import type { ReactNode } from "react";

type CmsLayoutProps = {
  children: ReactNode;
};

export default function CmsLayout({
  children,
}: CmsLayoutProps) {
  return children;
}