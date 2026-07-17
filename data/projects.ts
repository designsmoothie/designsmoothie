export type PortfolioProject = {
  slug: string;
  title: string;

  category: string;
  categoryTitle: string;
  subtitle: string;

  client: string;
  year: string;
  location: string;
  industry: string;

  services: string[];

  summary: string;
  overviewTitle: string;
  overview: string;

  thumbnail: string;
  images: string[];

  featured?: boolean;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "feelymeal",
    title: "Feely Meal",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Restaurant Brand Identity",

    client: "Feely Meal",
    year: "2026",
    location: "Busan",
    industry: "Food & Beverage",

    services: [
      "Brand Identity",
      "Logo Design",
      "Visual System",
      "Signage Design",
    ],

    summary:
      "브랜드의 분위기와 서비스 방향을 하나의 일관된 시각 언어로 구축한 브랜딩 프로젝트입니다.",

    overviewTitle: "A warm and memorable brand experience.",

    overview:
      "브랜드의 첫인상부터 공간까지 하나의 경험으로 연결될 수 있도록 로고, 컬러, 그래픽 요소와 공간 적용 방향을 함께 설계했습니다.",

    thumbnail: "/images/portfolio/branding/feelymeal.jpg",

    images: [
      "/images/portfolio/branding/feelymeal.jpg",
    ],

    featured: true,
  },

  {
    slug: "cher",
    title: "Cher",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Beauty Brand Identity",

    client: "Cher",
    year: "2026",
    location: "Busan",
    industry: "Beauty",

    services: [
      "Logo Design",
      "Brand Identity",
      "Graphic System",
      "Print Design",
    ],

    summary:
      "절제된 분위기와 부드러운 감성을 조화롭게 표현한 브랜드 아이덴티티 프로젝트입니다.",

    overviewTitle: "Soft details, clear identity.",

    overview:
      "브랜드가 가진 섬세하고 정돈된 이미지를 중심으로 로고와 그래픽 시스템을 구성하고, 다양한 매체에서도 동일한 인상이 유지되도록 설계했습니다.",

    thumbnail: "/images/portfolio/branding/cher.jpg",

    images: [
      "/images/portfolio/branding/cher.jpg",
    ],
  },

  {
    slug: "drawing",
    title: "Drawing",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Creative Brand Identity",

    client: "Drawing",
    year: "2026",
    location: "Busan",
    industry: "Creative",

    services: [
      "Logo Design",
      "Brand Identity",
      "Graphic Design",
      "Visual Direction",
    ],

    summary:
      "창의적인 이미지와 자유로운 인상을 중심으로 구축한 브랜드 디자인 프로젝트입니다.",

    overviewTitle: "A visual identity built from creativity.",

    overview:
      "브랜드의 개성과 창의적인 성격이 자연스럽게 드러나도록 로고와 그래픽 요소를 정리하고, 다양한 콘텐츠로 확장 가능한 시각 체계를 구축했습니다.",

    thumbnail: "/images/portfolio/branding/drawing.jpg",

    images: [
      "/images/portfolio/branding/drawing.jpg",
    ],
  },

  {
    slug: "kyuzen",
    title: "Kyuzen",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Japanese Restaurant Identity",

    client: "Kyuzen",
    year: "2026",
    location: "Busan",
    industry: "Restaurant",

    services: [
      "Brand Identity",
      "Logo Design",
      "Graphic System",
      "Menu Design",
    ],

    summary:
      "정갈하고 절제된 분위기를 중심으로 완성한 일본식 외식 브랜드 아이덴티티 프로젝트입니다.",

    overviewTitle: "Minimal, refined and memorable.",

    overview:
      "일본식 브랜드가 가진 정돈된 이미지와 공간의 분위기가 자연스럽게 연결되도록 로고와 그래픽 시스템을 설계했습니다.",

    thumbnail: "/images/portfolio/branding/kyuzen.jpg",

    images: [
      "/images/portfolio/branding/kyuzen.jpg",
      "/images/portfolio/branding/kyuzen1.jpg",
    ],

    featured: true,
  },

  {
    slug: "monad",
    title: "Monad",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Minimal Brand Identity",

    client: "Monad",
    year: "2026",
    location: "Busan",
    industry: "Lifestyle",

    services: [
      "Logo Design",
      "Brand Identity",
      "Visual System",
      "Graphic Design",
    ],

    summary:
      "간결한 형태와 일관된 그래픽 언어를 중심으로 완성한 미니멀 브랜드 아이덴티티 프로젝트입니다.",

    overviewTitle: "Identity with clarity and consistency.",

    overview:
      "불필요한 장식을 줄이고 브랜드의 핵심 인상이 선명하게 전달되도록 로고와 그래픽 시스템을 구성했습니다.",

    thumbnail: "/images/portfolio/branding/monad.jpg",

    images: [
      "/images/portfolio/branding/monad.jpg",
    ],
  },

  {
    slug: "shinjin-hyd",
    title: "Shinjin HYD",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Corporate Brand Identity",

    client: "Shinjin HYD",
    year: "2026",
    location: "Busan",
    industry: "Corporate",

    services: [
      "Corporate Identity",
      "Logo Design",
      "Visual System",
      "Graphic Design",
    ],

    summary:
      "기업의 전문성과 신뢰감을 명확하게 전달할 수 있도록 구성한 기업 아이덴티티 프로젝트입니다.",

    overviewTitle: "A reliable identity for a professional brand.",

    overview:
      "기업의 전문성과 기술적인 이미지를 바탕으로 로고와 시각 체계를 정리하고, 다양한 업무 환경에서 안정적으로 활용할 수 있도록 설계했습니다.",

    thumbnail: "/images/portfolio/branding/shinjinHYD.jpg",

    images: [
      "/images/portfolio/branding/shinjinHYD.jpg",
    ],
  },

  {
    slug: "yuhyun",
    title: "Yuhyun",

    category: "branding",
    categoryTitle: "Branding",
    subtitle: "Elegant Brand Identity",

    client: "Yuhyun",
    year: "2026",
    location: "Busan",
    industry: "Lifestyle",

    services: [
      "Brand Identity",
      "Logo Design",
      "Graphic System",
      "Print Design",
    ],

    summary:
      "부드럽고 우아한 인상을 중심으로 브랜드의 감성과 정체성을 표현한 브랜딩 프로젝트입니다.",

    overviewTitle: "Elegant details, lasting impressions.",

    overview:
      "브랜드가 가진 섬세한 분위기를 유지하면서도 다양한 인쇄물과 콘텐츠에 자연스럽게 적용할 수 있도록 시각 시스템을 구축했습니다.",

    thumbnail: "/images/portfolio/branding/yuhyun.jpg",

    images: [
      "/images/portfolio/branding/yuhyun.jpg",
      "/images/portfolio/branding/yuhyun1.jpg",
    ],
  },
];

export function getProjectsByCategory(category: string) {
  return portfolioProjects.filter(
    (project) => project.category === category,
  );
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find(
    (project) => project.slug === slug,
  );
}

export function getFeaturedProjects() {
  return portfolioProjects.filter(
    (project) => project.featured,
  );
}