export interface SiteSettings {
  id: string;

  site_title: string | null;
  site_description: string | null;
  site_keywords: string | null;
  canonical_url: string | null;

  og_image: string | null;
  favicon: string | null;

  google_verification: string | null;
  naver_verification: string | null;
  bing_verification: string | null;

  brand_name: string | null;
  slogan: string | null;

  ceo_name: string | null;
  business_number: string | null;

  phone: string | null;
  email: string | null;
  address: string | null;

  kakao_url: string | null;
  instagram_url: string | null;
  blog_url: string | null;

  created_at: string;
  updated_at: string;
}