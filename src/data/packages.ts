import { ICONS } from "@/components/Icon";

/**
 * 행사 유형별 패키지 정본.
 *
 * 잔치꾼의 '제막식 세트 / 워크숍 세트' 처럼, 주최자가 자기 행사 유형을 고르면
 * 필요한 구성이 묶여 나오게 한다. 서비스(services.ts)가 '무엇을 파는가' 라면
 * 패키지는 '우리 행사에는 뭐가 필요한가' 에 답한다.
 *
 * ⚠️ 수치는 지어내지 않는다. 규모·기간은 계약 안내(company.ts contractTerms)와
 *    실제 진행 이력(portfolio.ts)에서 확인된 범위만 적는다.
 */

export type EventPackage = {
  slug: string;
  title: string;
  subtitle: string;
  /** 누가 의뢰하는가 */
  client: string;
  summary: string;
  heroDesc: string;
  /** 라인 아이콘 (components/Icon.tsx 의 ICONS 키에 대응하는 path) */
  iconPath: string;
  gradient: string;
  /** 이 패키지에 들어가는 서비스 (services.ts 의 slug) */
  serviceSlugs: string[];
  /** 추천 셀러 카테고리 (catalog.ts sellerItems 의 slug) */
  sellerSlugs: string[];
  /** 추천 푸드트럭 (catalog.ts foodtruckItems 의 slug) */
  foodtruckSlugs: string[];
  /** 구성 요소 */
  includes: { title: string; desc: string }[];
  /** 운영 포인트 — 해당 유형에서 유의해야 할 사항 */
  notes: { title: string; desc: string }[];
  /** 관련 진행 이력 (portfolio.ts 의 id) */
  portfolioIds: string[];
};

export const packages: EventPackage[] = [
  {
    slug: "university-festival",
    title: "대학 축제 패키지",
    subtitle: "학생회 · 축제준비위원회",
    client: "대학교 학생회 · 총학생회 · 축제준비위원회",
    summary: "축제 기간 캠퍼스 플리마켓과 야시장을 학생회 인력 투입 없이 운영합니다.",
    heroDesc:
      "축제 일정은 정해졌는데 셀러 모집부터 부스 배치, 당일 현장 관리까지 학생회가 직접 감당하기는 부담이 큽니다. 플릿 유니온이 모집 공고부터 정산까지 맡고, 학생회는 축제 본 프로그램에만 집중하시면 됩니다.",
    iconPath: ICONS.academic,
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3182f6 100%)",
    serviceSlugs: ["flea-market", "night-market", "food-truck", "rental"],
    sellerSlugs: ["dessert", "goods", "keyring", "accessory", "caricature", "photo", "tarot", "henna"],
    foodtruckSlugs: ["cozeat", "dakgangjeong", "dutch-kkochi", "churros", "chan-cafe"],
    includes: [
      { title: "학생 창업팀 우선 배정", desc: "교내 창업팀·동아리 셀러를 먼저 선발해 캠퍼스 특색을 살리고, 부족한 카테고리만 Flit 외부 셀러로 채웁니다." },
      { title: "낮 마켓 + 밤 야시장 연계", desc: "낮 축제 프로그램이 끝나는 저녁부터 야시장으로 자연스럽게 이어지도록 시간대를 설계합니다." },
      { title: "부스 장비 일괄 렌탈", desc: "텐트·테이블·의자·조명·배너를 통일 규격으로 제공하고 설치·철거 인력까지 포함합니다." },
      { title: "전담 매니저 현장 상주", desc: "셀러 입·퇴장, 방문객 안내, 돌발 상황 대응을 전담 매니저가 맡아 학생회 인력 투입을 없앱니다." },
      { title: "SNS 모집·홍보", desc: "플릿 플랫폼 공고와 인스타그램·카카오채널 홍보를 별도 비용 없이 지원합니다." },
    ],
    notes: [
      { title: "회전이 빠른 품목을 앞에 둡니다", desc: "학생 객단가에 맞춰 5,000~9,000원대 먹거리와 체험형 부스를 동선 앞쪽에 배치합니다. 캐리커처는 3분 내외로 완성돼 대기열이 그림이 됩니다." },
      { title: "포화 품목은 제한 배치", desc: "타로·사주는 셀러 수가 많아 그대로 받으면 마켓이 한쪽으로 쏠립니다. 행사당 1~2곳으로 제한합니다." },
      { title: "전기 용량을 먼저 확인합니다", desc: "캠퍼스 야외는 전기 인출 지점이 한정적입니다. 완제품 위주 셀러를 섞어 전기 부하를 분산합니다." },
    ],
    portfolioIds: ["wonju-univ-night", "daegu-univ-flea", "seoul-univ-flea"],
  },
  {
    slug: "apartment-night-market",
    title: "아파트 야시장 패키지",
    subtitle: "관리사무소 · 입주자대표회의",
    client: "아파트 관리사무소 · 입주자대표회의 · 커뮤니티 운영위",
    summary: "단지 내 유휴 공간에서 주민 참여형 야시장을 소음·주차 관리까지 포함해 운영합니다.",
    heroDesc:
      "주차장이나 단지 광장은 저녁 시간대에 비어 있습니다. 가족 단위 입주민이 많은 단지 특성에 맞춰 키즈존·체험존을 포함한 커뮤니티 행사로 설계하고, 관리사무소와 협업해 소음·주차·안전을 함께 관리합니다.",
    iconPath: ICONS.home,
    gradient: "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
    serviceSlugs: ["night-market", "food-truck", "rental"],
    sellerSlugs: ["dessert", "kids", "henna", "pet", "flower", "candle", "beads", "doll"],
    foodtruckSlugs: ["hoeori", "churros", "chan-cafe", "cozeat", "takoyaki"],
    includes: [
      { title: "가족 친화 콘텐츠 구성", desc: "키즈 놀이존, 헤나·페이스페인팅, 체험 부스를 중심으로 전 연령대가 머무를 수 있게 구성합니다." },
      { title: "소음 규제 대응 시간 설계", desc: "주거 밀집 지역 기준에 맞춰 운영 시간과 음향 수준을 설정하고 사전에 관리사무소와 합의합니다." },
      { title: "주차·동선 관리", desc: "행사 구역과 주차 동선이 충돌하지 않도록 배치하고, 입주민 차량 출입 통제를 관리사무소와 분담합니다." },
      { title: "입주민 셀러 참여 창구", desc: "입주민이 직접 셀러로 참여하고 싶을 때 플릿 플랫폼으로 신청받아 커뮤니티 성격을 강화합니다." },
      { title: "야간 조명 연출", desc: "무드등·가랜드·포토존 조명으로 단지 광장을 야시장 분위기로 바꿉니다." },
    ],
    notes: [
      { title: "반려동물 동반 여부를 먼저 정합니다", desc: "동반 허용 단지라면 반려동물 셀러를 넣어 호응이 큽니다. 비허용이면 아예 빼야 현장에서 마찰이 없습니다." },
      { title: "정기 운영으로 전환하면 단가가 내려갑니다", desc: "월 2회 이상 정기 운영 계약 시 운영비 할인과 전담 매니저 우선 배정이 적용됩니다." },
    ],
    portfolioIds: ["hanam-apt-night", "seoul-apt-night"],
  },
  {
    slug: "local-festival-booth",
    title: "지자체 축제 부스 패키지",
    subtitle: "지자체 · 축제 주최 기관",
    client: "시·군·구청 · 축제추진위원회 · 문화재단",
    summary: "축제장 부스 존 구역을 통째로 위탁받아 셀러 선발부터 철수·정산까지 책임집니다.",
    heroDesc:
      "축제 본 프로그램은 주최 기관이 그대로 운영하시고, 부스 존만 넘기시면 됩니다. 지역 특산물·공예 셀러를 우선 배치해 지역색을 살리고, 대규모 인파에 대응하는 동선 설계와 안전 인력을 함께 배치합니다.",
    iconPath: ICONS.ticket,
    gradient: "linear-gradient(135deg, #881337 0%, #f43f5e 100%)",
    serviceSlugs: ["festival-booth", "food-truck", "rental"],
    sellerSlugs: ["farm", "ceramic", "maedeup", "knit", "wood", "leather", "clothing", "caricature"],
    foodtruckSlugs: ["gopchang", "steak", "pizza", "kebab", "bulchobap", "eomuk"],
    includes: [
      { title: "부스 존 단위 위탁 운영", desc: "지정 구역 전체를 위탁받아 셀러 선발·배치·운영·철수·원상복구까지 맡습니다." },
      { title: "지역 셀러 우선 구성", desc: "지역 특산물과 전통 공예 셀러를 먼저 배치하고, 카테고리가 비는 자리만 Flit 셀러로 보충합니다." },
      { title: "대규모 인파 동선 설계", desc: "출입구·주 통로·대기열 위치를 분석해 병목이 생기지 않도록 부스를 배치합니다." },
      { title: "안전 인력 및 비상 대응", desc: "행사 규모에 맞춘 안전 인력을 배치하고 주최 기관·소방·경비와 협업 체계를 구성합니다." },
      { title: "통일 규격 부스 연출", desc: "축제 정체성에 맞춰 부스 장식과 사이니지를 기획하고 장비를 통일 규격으로 제공합니다." },
    ],
    notes: [
      { title: "다일 축제는 로테이션을 설계합니다", desc: "며칠 이어지는 축제는 일자별 셀러 로테이션과 전 기간 고정 배치 중 축제 성격에 맞는 방식을 제안합니다." },
      { title: "전통·민속 테마는 품목을 좁힙니다", desc: "민속 축제는 전통 공예·전통 먹거리·체험형으로 좁혀야 축제와 따로 놀지 않습니다." },
      { title: "지방도 전국 출장합니다", desc: "광역시·지역 거점 도시는 원격 기획 + 현지 파트너 운영으로 진행하며 출장 비용은 견적에 포함해 투명하게 안내합니다." },
    ],
    portfolioIds: ["seoul-festival-booth", "chungcheong-festival", "seoul-folk-festival"],
  },
  {
    slug: "corporate-event",
    title: "기업 행사 패키지",
    subtitle: "기업 · 브랜드 · 유휴 공간",
    client: "기업 총무·인사팀 · 브랜드 마케팅 · 카페·건물주",
    summary: "사내 행사와 브랜드 프로모션에 푸드트럭·마켓을 단독 또는 조합으로 구성합니다.",
    heroDesc:
      "푸드트럭 1대만 필요한 사내 행사부터, 유휴 공간에 정기 마켓을 여는 것까지 규모에 맞춰 구성합니다. 마켓 운영 없이 푸드트럭 섭외만, 또는 장비 렌탈만 단독으로 의뢰하셔도 됩니다.",
    iconPath: ICONS.office,
    gradient: "linear-gradient(135deg, #4a1d96 0%, #a855f7 100%)",
    serviceSlugs: ["food-truck", "event-agency", "rental", "flea-market"],
    sellerSlugs: ["dessert", "flower", "candle", "nail", "photo", "goods"],
    foodtruckSlugs: ["specialty", "bakery-coffee", "chan-cafe", "steak", "gimbap", "cocktail"],
    includes: [
      { title: "1대부터 단독 섭외", desc: "사내 행사·창립기념일처럼 소규모라도 푸드트럭 1대부터 섭외합니다. 마켓 운영 없이 단독 진행이 가능합니다." },
      { title: "전기·용수 사전 조율", desc: "건물 전기 용량과 용수 여건을 미리 확인하고 트럭별 필요 설비를 조율합니다. 옥내 주차장·옥상은 특히 사전 점검이 필요합니다." },
      { title: "위생·허가 확인", desc: "영업허가증과 위생 점검 이력을 사전에 확인해 사내 행사에서 식품 안전 사고를 방지합니다." },
      { title: "유휴 공간 정기 마켓 설계", desc: "카페 홀, 건물 로비, 주차장의 유동 인구를 분석해 공간에 맞는 정기 마켓 모델을 설계합니다." },
      { title: "브랜드 콘셉트 맞춤 구성", desc: "프로모션 목적에 맞춰 셀러 카테고리와 포토존을 브랜드 톤에 맞게 구성합니다." },
    ],
    notes: [
      { title: "주류는 장소별 확인이 필요합니다", desc: "칵테일·주류 트럭은 판매 가능 여부가 장소마다 다릅니다. 섭외 전에 반드시 확인합니다." },
      { title: "소규모는 컨설팅으로 안내합니다", desc: "마켓 운영 대행은 10개 부스 이상부터 진행합니다. 그 미만은 컨설팅 형태로 별도 안내드립니다." },
    ],
    portfolioIds: [],
  },
];

export const packageBySlug = (slug: string) => packages.find((p) => p.slug === slug);
