export const franchiseGroups = [
  { id: "menus", title: "메뉴판", english: "MENU BOARDS", description: "매장과 화면에 맞는 메뉴 디자인", color: "#e5edcf" },
  { id: "promotion", title: "매장 홍보물", english: "STORE PROMOTION", description: "매장 안팎에서 전하는 브랜드 소식", color: "#f6e4ce" },
  { id: "print", title: "인쇄물", english: "PRINT MATERIALS", description: "작은 지면까지 이어지는 브랜드의 인상", color: "#f0dde0" },
] as const;

export const franchiseCategories = [
  { slug: "foam-menu", title: "포맥스 메뉴판", group: "menus", description: "가볍고 단단한 보드에 메뉴를 담는 매장용 메뉴판입니다." },
  { slug: "light-menu", title: "조명 메뉴판", group: "menus", description: "빛을 통해 메뉴와 사진을 선명하게 보여주는 메뉴판입니다." },
  { slug: "digital-menu", title: "디지털 메뉴판", group: "menus", description: "움직이는 이미지와 영상으로 메뉴를 소개하는 화면용 콘텐츠입니다." },
  { slug: "banner", title: "배너", group: "promotion", description: "신메뉴와 이벤트를 안내하는 스탠드형 홍보물입니다." },
  { slug: "air-sign", title: "에어간판", group: "promotion", description: "멀리서도 매장을 알아볼 수 있도록 돕는 입체형 홍보물입니다." },
  { slug: "hanging-banner", title: "현수막", group: "promotion", description: "오픈 소식과 매장 행사를 넓은 지면에 전달합니다." },
  { slug: "poster", title: "포스터", group: "print", description: "메뉴와 브랜드 메시지를 한 장에 담는 매장용 포스터입니다." },
  { slug: "leaflet", title: "전단지", group: "print", description: "메뉴, 혜택, 매장 정보를 손에 전하는 홍보 인쇄물입니다." },
  { slug: "business-card", title: "명함", group: "print", description: "브랜드의 인상과 필요한 연락처를 간결하게 전달합니다." },
] as const;

export type FranchiseCategory = (typeof franchiseCategories)[number]["slug"];
export type FranchiseMedia = { id: string; type: "image" | "video"; path: string; url: string; alt: string };
export type FranchiseWork = {
  id: string;
  title: string;
  category: FranchiseCategory;
  client: string;
  description: string;
  media: FranchiseMedia[];
  thumbnail_id: string | null;
  status: "draft" | "published";
  featured: boolean;
  display_order: number;
  updated_at: string;
};
export const FRANCHISE_BUCKET = "franchise-assets";
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function findFranchiseCategory(slug: string) { return franchiseCategories.find((item) => item.slug === slug); }
export function getFranchiseThumbnail(work: FranchiseWork) {
  return work.media.find((item) => item.id === work.thumbnail_id && item.type === "image") ?? work.media.find((item) => item.type === "image");
}
