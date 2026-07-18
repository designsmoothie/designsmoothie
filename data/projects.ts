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

  challenge?: string;
  solution?: string;
  result?: string;

  thumbnail: string;
  images: string[];

  featured?: boolean;
};

export const portfolioProjects: PortfolioProject[] = [
  // =========================================================
  // BRANDING
  // =========================================================

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

    challenge:
      "음식과 공간이 전달하는 따뜻한 인상을 유지하면서도, 다양한 온·오프라인 매체에서 일관되게 활용할 수 있는 브랜드 체계가 필요했습니다.",

    solution:
      "부드러운 형태와 편안한 컬러를 중심으로 로고와 그래픽 요소를 구성하고, 인쇄물과 사인물까지 자연스럽게 확장될 수 있는 시각 시스템을 설계했습니다.",

    result:
      "브랜드의 친근함과 전문성이 함께 전달되며, 고객이 어느 접점에서든 Feely Meal을 동일한 분위기로 경험할 수 있도록 완성했습니다.",

    thumbnail: "/images/portfolio/branding/feelymeal.jpg",

    images: ["/images/portfolio/branding/feelymeal.jpg"],

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

    challenge:
      "부드럽고 여성적인 이미지에만 머물지 않으면서, 뷰티 브랜드로서의 전문성과 세련된 인상을 함께 전달해야 했습니다.",

    solution:
      "절제된 형태와 여백을 활용해 감성적인 분위기를 살리고, 인쇄물과 디지털 콘텐츠에 유연하게 적용되는 그래픽 체계를 구축했습니다.",

    result:
      "섬세하면서도 명확한 브랜드 인상을 완성해 다양한 고객 접점에서 일관된 이미지를 유지할 수 있게 했습니다.",

    thumbnail: "/images/portfolio/branding/cher.jpg",

    images: ["/images/portfolio/branding/cher.jpg"],
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

    challenge:
      "자유로운 창작 감성을 살리면서도 브랜드가 산만하게 보이지 않도록 명확한 중심을 만드는 것이 핵심이었습니다.",

    solution:
      "유연한 그래픽 요소와 일관된 타이포그래피 원칙을 조합해 자유로움과 정돈된 인상이 공존하도록 설계했습니다.",

    result:
      "콘텐츠의 성격에 따라 다양하게 변화하면서도 Drawing만의 인상을 유지하는 확장성 높은 아이덴티티를 완성했습니다.",

    thumbnail: "/images/portfolio/branding/drawing.jpg",

    images: ["/images/portfolio/branding/drawing.jpg"],
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

    challenge:
      "전통적인 일본식 이미지에 치우치지 않으면서도 음식과 공간이 지닌 정갈함을 직관적으로 전달해야 했습니다.",

    solution:
      "간결한 조형과 절제된 컬러, 안정적인 여백을 활용해 현대적이면서도 깊이 있는 브랜드 인상을 구성했습니다.",

    result:
      "메뉴와 인쇄물, 공간 그래픽까지 일관되게 확장 가능한 정제된 외식 브랜드 이미지를 완성했습니다.",

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

    challenge:
      "미니멀한 표현을 유지하면서도 브랜드가 평범하거나 무표정하게 느껴지지 않도록 고유한 인상을 만드는 것이 필요했습니다.",

    solution:
      "형태와 비례, 타이포그래피의 미세한 차이를 조율해 단순함 안에서도 기억에 남는 시각적 리듬을 만들었습니다.",

    result:
      "다양한 매체에서 안정적으로 활용되는 명확하고 일관된 브랜드 시스템을 완성했습니다.",

    thumbnail: "/images/portfolio/branding/monad.jpg",

    images: ["/images/portfolio/branding/monad.jpg"],
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

    challenge:
      "기술 기업의 전문성과 신뢰를 전달하면서도 기존 산업 분야에서 흔히 사용되는 무겁고 경직된 이미지를 피해야 했습니다.",

    solution:
      "견고한 형태와 명확한 구조를 바탕으로 현대적인 기업 이미지를 구축하고, 실무 매체에 적용하기 쉬운 시스템으로 정리했습니다.",

    result:
      "기업의 기술력과 안정성을 균형 있게 표현하는 실용적이고 지속 가능한 아이덴티티를 완성했습니다.",

    thumbnail: "/images/portfolio/branding/shinjinHYD.jpg",

    images: ["/images/portfolio/branding/shinjinHYD.jpg"],
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

    challenge:
      "우아한 감성을 유지하면서도 장식적으로 과해 보이지 않는 절제된 브랜드 이미지를 만드는 것이 중요했습니다.",

    solution:
      "유연한 곡선과 안정적인 타이포그래피, 여백 중심의 레이아웃을 통해 섬세하고 현대적인 분위기를 설계했습니다.",

    result:
      "브랜드의 감성을 선명하게 전달하면서 인쇄물과 디지털 매체로 자연스럽게 확장되는 아이덴티티를 완성했습니다.",

    thumbnail: "/images/portfolio/branding/yuhyun.jpg",

    images: [
      "/images/portfolio/branding/yuhyun.jpg",
      "/images/portfolio/branding/yuhyun1.jpg",
    ],
  },

  // =========================================================
  // SIGNAGE & FACADE
  // =========================================================

  {
    slug: "feelymeal-signage",
    title: "Feely Meal Signage",

    category: "signage&facade",
    categoryTitle: "Signage & Facade",
    subtitle: "Exterior Signage Design",

    client: "Feely Meal",
    year: "2026",
    location: "Busan",
    industry: "Food & Beverage",

    services: [
      "Signage Design",
      "Facade Graphic",
      "Exterior Branding",
      "Visual Direction",
    ],

    summary:
      "브랜드의 시각 언어를 실제 공간의 파사드와 사인 시스템으로 확장한 프로젝트입니다.",

    overviewTitle: "From brand identity to physical space.",

    overview:
      "로고와 브랜드 컬러가 건물 외관에서도 자연스럽게 작동하도록 크기, 위치, 대비와 시인성을 함께 고려해 사인 디자인을 구성했습니다.",

    challenge:
      "브랜드의 감성을 유지하면서도 거리와 이동 중에 빠르게 인식될 수 있는 시인성을 확보해야 했습니다.",

    solution:
      "외관의 비례와 주변 환경을 고려해 사인의 크기와 배치를 조정하고, 브랜드 컬러와 소재가 공간에서 명확하게 드러나도록 설계했습니다.",

    result:
      "브랜드의 첫인상을 강화하면서 공간의 성격까지 효과적으로 전달하는 파사드 디자인을 완성했습니다.",

    thumbnail: "/images/portfolio/signage&facade/feelymeal1.png",

    images: ["/images/portfolio/signage&facade/feelymeal1.png"],

    featured: true,
  },

  // =========================================================
  // INTERIOR
  // =========================================================

  {
    slug: "cafe-interior",
    title: "Cafe Interior",

    category: "interior",
    categoryTitle: "Space Design",
    subtitle: "Commercial Interior Design",

    client: "Cafe Project",
    year: "2026",
    location: "Busan",
    industry: "Cafe & Hospitality",

    services: [
      "Space Planning",
      "Interior Design",
      "Material Direction",
      "Visual Styling",
    ],

    summary:
      "브랜드의 분위기와 고객 경험을 공간의 구조, 소재와 컬러로 구체화한 카페 인테리어 프로젝트입니다.",

    overviewTitle: "A space designed around experience.",

    overview:
      "고객이 공간에 들어서는 순간부터 머무르고 나가는 과정까지 자연스럽게 이어지도록 동선과 시각적 포인트를 함께 설계했습니다.",

    challenge:
      "제한된 공간 안에서 운영 효율과 고객의 편안한 체류 경험을 동시에 확보해야 했습니다.",

    solution:
      "이용 동선을 단순화하고 소재와 조명의 대비를 조율해 공간이 넓고 안정적으로 느껴지도록 구성했습니다.",

    result:
      "브랜드의 분위기가 공간 전반에 자연스럽게 녹아들며 운영과 고객 경험이 균형을 이루는 공간을 완성했습니다.",

    thumbnail: "/images/portfolio/interior/cafe.png",

    images: ["/images/portfolio/interior/cafe.png"],

    featured: true,
  },

  // =========================================================
  // PRINT
  // =========================================================

  {
    slug: "metis-print",
    title: "Metis",

    category: "print",
    categoryTitle: "Editorial & Print",
    subtitle: "Editorial Design",

    client: "Metis",
    year: "2026",
    location: "Busan",
    industry: "Corporate",

    services: [
      "Editorial Design",
      "Print Design",
      "Layout System",
      "Visual Direction",
    ],

    summary:
      "정보의 흐름과 브랜드 이미지를 함께 고려해 완성한 편집·인쇄 디자인 프로젝트입니다.",

    overviewTitle: "Clear information, refined presentation.",

    overview:
      "복잡한 정보도 쉽게 읽힐 수 있도록 위계와 여백을 정리하고, 브랜드의 전문성과 신뢰가 자연스럽게 전달되도록 편집했습니다.",

    challenge:
      "다양한 내용을 한정된 지면에 담으면서도 정보가 복잡하거나 답답하게 느껴지지 않도록 구성해야 했습니다.",

    solution:
      "명확한 정보 위계와 반복 가능한 그리드 시스템을 적용해 가독성과 시각적 완성도를 함께 확보했습니다.",

    result:
      "정보 전달력과 브랜드 이미지가 균형을 이루는 정돈된 인쇄 결과물을 완성했습니다.",

    thumbnail: "/images/portfolio/print/metis.jpg",

    images: ["/images/portfolio/print/metis.jpg"],

    featured: true,
  },

  // =========================================================
  // DIRECTION
  // =========================================================

  {
    slug: "feelymeal-direction",
    title: "Feely Meal Direction",

    category: "direction",
    categoryTitle: "Art Direction",
    subtitle: "Integrated Visual Direction",

    client: "Feely Meal",
    year: "2026",
    location: "Busan",
    industry: "Food & Beverage",

    services: [
      "Art Direction",
      "Visual Direction",
      "Brand Application",
      "Campaign Design",
    ],

    summary:
      "브랜딩과 공간, 그래픽 매체가 하나의 분위기로 연결되도록 전체적인 비주얼 방향을 설계한 프로젝트입니다.",

    overviewTitle: "One direction across every brand touchpoint.",

    overview:
      "브랜드가 다양한 환경에서 서로 다른 모습으로 흩어지지 않도록 이미지, 컬러, 레이아웃과 공간 적용 원칙을 하나의 방향으로 정리했습니다.",

    challenge:
      "여러 매체와 공간에 적용되는 디자인이 각각 독립적으로 보이지 않고 하나의 브랜드 경험으로 인식되어야 했습니다.",

    solution:
      "핵심 색상과 그래픽 원칙을 중심으로 매체별 표현 방식을 통합하고, 각 접점의 역할에 맞게 강약을 조절했습니다.",

    result:
      "브랜드의 모든 시각적 접점이 하나의 분위기로 연결되며 더욱 선명하고 기억에 남는 경험을 형성했습니다.",

    thumbnail: "/images/portfolio/direction/feelymeal.jpg",

    images: [
      "/images/portfolio/direction/feelymeal.jpg",
      "/images/portfolio/direction/feelymeal1.jpg",
    ],
  },

  // =========================================================
  // BANNER & CAMPAIGN
  // =========================================================

  {
    slug: "campaign-banner-collection",
    title: "Campaign Collection",

    category: "banner",
    categoryTitle: "Campaign",
    subtitle: "Digital Banner & Campaign Design",

    client: "Various Clients",
    year: "2026",
    location: "Busan",
    industry: "Various Industries",

    services: [
      "Campaign Design",
      "Digital Banner",
      "Promotion Design",
      "Visual Communication",
    ],

    summary:
      "다양한 브랜드와 프로모션의 핵심 메시지를 빠르고 명확하게 전달하도록 구성한 캠페인 디자인 컬렉션입니다.",

    overviewTitle: "Fast communication, strong visual impact.",

    overview:
      "짧은 시간 안에 고객의 시선을 확보해야 하는 배너의 특성을 고려해 정보의 우선순위, 이미지와 문구의 대비를 중심으로 설계했습니다.",

    challenge:
      "각기 다른 업종과 프로모션의 목적을 제한된 화면 안에서 즉각적으로 이해할 수 있도록 표현해야 했습니다.",

    solution:
      "핵심 메시지와 행동 유도 요소를 중심으로 정보 구조를 단순화하고, 캠페인 성격에 맞는 컬러와 이미지 연출을 적용했습니다.",

    result:
      "다양한 플랫폼과 규격에서도 메시지가 빠르게 전달되는 명확하고 주목도 높은 캠페인 디자인을 완성했습니다.",

    thumbnail: "/images/portfolio/banner/banner001.jpg",

    images: [
      "/images/portfolio/banner/banner001.jpg",
      "/images/portfolio/banner/banner002.jpg",
      "/images/portfolio/banner/banner003.jpg",
      "/images/portfolio/banner/banner004.jpg",
      "/images/portfolio/banner/banner005.jpg",
      "/images/portfolio/banner/banner006.jpg",
      "/images/portfolio/banner/banner007.jpg",
      "/images/portfolio/banner/banner008.jpg",
      "/images/portfolio/banner/banner009.jpg",
      "/images/portfolio/banner/banner010.jpg",
      "/images/portfolio/banner/banner011.jpg",
      "/images/portfolio/banner/banner012.jpg",
      "/images/portfolio/banner/banner013.jpg",
      "/images/portfolio/banner/banner014.jpg",
      "/images/portfolio/banner/banner015.jpg",
      "/images/portfolio/banner/banner016.jpg",
      "/images/portfolio/banner/banner017.jpg",
      "/images/portfolio/banner/banner018.jpg",
      "/images/portfolio/banner/banner019.jpg",
      "/images/portfolio/banner/banner020.jpg",
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