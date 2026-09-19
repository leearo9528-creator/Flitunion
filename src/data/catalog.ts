/**
 * 셀러 품목 · 푸드트럭 메뉴 카탈로그 정본.
 *
 * 출처: docs/catalog-build.js 의 SL / FT 배열 (회사 카탈로그 PPTX 와 같은 데이터).
 * 품목을 추가·수정하면 양쪽을 함께 고친다 — 카탈로그 PDF 와 웹이 어긋나면 영업 현장에서 티가 난다.
 *
 * ⚠️ 사진 정책 (docs/photos 하위 README 의 제약을 그대로 따른다)
 * - 셀러 품목 사진: CC0(퍼블릭도메인) 스톡이라 웹 게시 가능. 단 **실제 참여 셀러의 상품 사진이 아니므로**
 *   화면에 그 사실을 반드시 고지한다 (SELLER_PHOTO_NOTICE). 지우고 배포하면 안 된다.
 * - 푸드트럭 사진: docs/photos/foodtruck-menu 의 14장은 **크러쉬 F&P 사업제안서에서 추출한 자료**로
 *   "내부 검토용" 제한이 걸려 있다. 웹사이트는 외부 배포이므로 **싣지 않는다.**
 *   각 트럭에서 직접 받은 사진으로 교체한 뒤에야 photo 필드를 채울 수 있다.
 */

export type SellerItem = {
  slug: string;
  title: string;
  /** 보유 셀러 수 (예: "23곳") */
  sellerCount: string;
  desc: string;
  /** CC0 예시 이미지. 없으면 그라데이션 플레이스홀더 */
  photo?: string;
};

export type FoodtruckItem = {
  slug: string;
  title: string;
  desc: string;
  /** ⚠️ 위 사진 정책 참조 — 현재 전 품목 미사용 */
  photo?: string;
};

export const SELLER_PHOTO_NOTICE =
  "사진은 품목 이해를 돕기 위한 예시 이미지입니다(자유 이용 라이선스). 실제 참여 셀러의 상품 사진이 아닙니다.";

/** 보유 셀러가 많은 순 27종 */
export const sellerItems: SellerItem[] = [
  { slug: "dessert", title: "디저트 · 먹거리", sellerCount: "23곳", desc: "마카롱, 쿠키, 케이크, 잼, 밀크티, 솜사탕, 아이스크림. 대부분 완제품이라 전기가 필요 없음", photo: "/catalog/sellers/" + "dessert" + ".jpg" },
  { slug: "goods", title: "잡화 · 소품", sellerCount: "15곳", desc: "파우치, 미니백, 데코 소품, 문구, 굿즈, 지비츠", photo: "/catalog/sellers/" + "goods" + ".jpg" },
  { slug: "handmade", title: "핸드메이드 공방", sellerCount: "14곳", desc: "품목을 특정하지 않고 공방 단위로 참가하는 셀러. 행사 성격에 맞춰 품목 조율 가능", photo: "/catalog/sellers/" + "handmade" + ".jpg" },
  { slug: "flower", title: "플라워 · 식물", sellerCount: "12곳", desc: "생화, 프리저브드, 실크플라워, 다육식물, 가드닝 소품", photo: "/catalog/sellers/" + "flower" + ".jpg" },
  { slug: "tarot", title: "타로 · 사주", sellerCount: "11곳", desc: "타로, 신점, 심리상담. 포화 품목이라 행사당 1~2곳으로 제한 배치", photo: "/catalog/sellers/" + "tarot" + ".jpg" },
  { slug: "pet", title: "반려동물", sellerCount: "11곳", desc: "수제 간식, 수제 사료, 하네스, 맞춤 인형. 반려동물 동반 행사 전용", photo: "/catalog/sellers/" + "pet" + ".jpg" },
  { slug: "clothing", title: "의류 · 한복", sellerCount: "10곳", desc: "생활한복, 컨템포러리 한복, 여성 의류, 빅사이즈(66 이상), 직수입 빈티지", photo: "/catalog/sellers/" + "clothing" + ".jpg" },
  { slug: "accessory", title: "악세사리 · 주얼리", sellerCount: "8곳", desc: "은세공, 원석 주얼리, 비녀, 블링 악세사리, 스마트폰 악세사리", photo: "/catalog/sellers/" + "accessory" + ".jpg" },
  { slug: "keyring", title: "키링 · 그립톡", sellerCount: "8곳", desc: "레진 그립톡, 폰 비즈키링, 매듭 키링, 인형 키링, 지비츠", photo: "/catalog/sellers/" + "keyring" + ".jpg" },
  { slug: "doll", title: "인형", sellerCount: "6곳", desc: "모루인형, 수공예 인형, 털모찌, 1:1 맞춤 제작 인형", photo: "/catalog/sellers/" + "doll" + ".jpg" },
  { slug: "beads", title: "비즈 · 볼펜꾸미기", sellerCount: "5곳", desc: "비즈 악세사리, 비즈 볼펜, 네잎클로버·꽃 비즈 소품", photo: "/catalog/sellers/" + "beads" + ".jpg" },
  { slug: "candle", title: "캔들 · 방향제", sellerCount: "5곳", desc: "소이캔들, 디퓨저, 석고 방향제, 차량용 방향제", photo: "/catalog/sellers/" + "candle" + ".jpg" },
  { slug: "farm", title: "농산물 · 특산물", sellerCount: "5곳", desc: "지역 과일, 건어물, 반건조 오징어, 한우. 지역 축제에서 현지 농가와 함께 구성", photo: "/catalog/sellers/" + "farm" + ".jpg" },
  { slug: "kids", title: "키즈", sellerCount: "5곳", desc: "키즈 놀이존, 유아 용품, 도서 나눔, 아토피 케어", photo: "/catalog/sellers/" + "kids" + ".jpg" },
  { slug: "henna", title: "헤나 · 타투", sellerCount: "4곳", desc: "헤나 타투, 페이스페인팅, 주문제작 타투 스티커. 아이 동반 행사 필수 부스", photo: "/catalog/sellers/" + "henna" + ".jpg" },
  { slug: "ceramic", title: "도자기", sellerCount: "4곳", desc: "그릇, 미니어처 오브제, 리빙 소품, 페인팅 액자", photo: "/catalog/sellers/" + "ceramic" + ".jpg" },
  { slug: "knit", title: "뜨개 · 니팅", sellerCount: "4곳", desc: "손염색실, 뜨개 소품, 수세미, 니팅 제품", photo: "/catalog/sellers/" + "knit" + ".jpg" },
  { slug: "caricature", title: "캐리커처 · 초상화", sellerCount: "4곳", desc: "현장 캐리커처, 수채 초상화, 거리 인물화. 3분 내외로 완성돼 회전이 빠름", photo: "/catalog/sellers/" + "caricature" + ".jpg" },
  { slug: "photo", title: "즉석사진", sellerCount: "4곳", desc: "현장 촬영 후 즉석 인화. 행사 기념품으로 남는 부스", photo: "/catalog/sellers/" + "photo" + ".jpg" },
  { slug: "figure", title: "피규어", sellerCount: "3곳", desc: "3D 인물 피규어 제작, 캐릭터 피규어", photo: "/catalog/sellers/" + "figure" + ".jpg" },
  { slug: "maedeup", title: "매듭 · 리본", sellerCount: "3곳", desc: "전통 매듭 팔찌·머리핀, 리본 공예", photo: "/catalog/sellers/" + "maedeup" + ".jpg" },
  { slug: "nail", title: "네일 · 뷰티", sellerCount: "3곳", desc: "수제 네일팁 주문제작, 더마·K뷰티 화장품", photo: "/catalog/sellers/" + "nail" + ".jpg" },
  { slug: "leather", title: "가죽 · 라탄 · 펠트", sellerCount: "3곳", desc: "카드지갑·키링 DIY 가죽 체험, 라탄 바구니와 트레이, 양모펠트 인형과 브로치", photo: "/catalog/sellers/" + "leather" + ".jpg" },
  { slug: "wood", title: "목공예", sellerCount: "2곳", desc: "원목 소품, 바느질 도구, 데스크 오거나이저", photo: "/catalog/sellers/" + "wood" + ".jpg" },
  { slug: "badge", title: "뱃지", sellerCount: "2곳", desc: "캘리그래피·그림 뱃지 제작", photo: "/catalog/sellers/" + "badge" + ".jpg" },
  { slug: "tufting", title: "터프팅", sellerCount: "1곳", desc: "러그 공예. 체류 시간이 길어 유입을 붙잡는 부스", photo: "/catalog/sellers/" + "tufting" + ".jpg" },
  { slug: "reptile", title: "파충류 체험", sellerCount: "1곳", desc: "크레스티드게코, 아프리카 식물. 다른 마켓에 없는 차별화 콘텐츠", photo: "/catalog/sellers/" + "reptile" + ".jpg" },
];

/** 행사 섭외 가능 푸드트럭 24종 */
export const foodtruckItems: FoodtruckItem[] = [
  { slug: "gopchang", title: "곱창", desc: "철판에 볶아내는 야채곱창과 곱창볶음밥. 저녁·주류 수요가 붙는 야시장형 메뉴" },
  { slug: "cozeat", title: "떡튀순", desc: "떡볶이·오뎅·튀김 3종. 5,000~9,000원대로 회전이 가장 빠른 품목" },
  { slug: "dakgangjeong", title: "닭강정", desc: "간장·양념 닭강정. 컵 포장이라 걸어 다니며 먹기 좋음" },
  { slug: "dutch-kkochi", title: "닭꼬치", desc: "소금구이·데리야끼·매운맛 3종. 5,000원대 저단가 회전 메뉴" },
  { slug: "steak", title: "스테이크", desc: "즉석 구이 스테이크와 도시락 구성. 객단가가 가장 높은 메인 메뉴" },
  { slug: "pizza", title: "화덕피자", desc: "페퍼로니·버섯·고르곤졸라. 화덕 자체가 볼거리가 되는 부스" },
  { slug: "kebab", title: "케밥", desc: "치킨·램 케밥. 한 손에 들고 먹는 형태라 대기 회전이 빠름" },
  { slug: "bulchobap", title: "불초밥", desc: "소고기 불초밥·연어초밥. 토치로 구워내는 과정이 그대로 노출됨" },
  { slug: "takoyaki", title: "타코야끼", desc: "오리지널·매운맛. 조리 과정이 보여 대기줄이 그림이 되는 품목" },
  { slug: "takoazit", title: "오코노미야끼", desc: "철판에 부쳐내는 오코노미야끼. 타코야끼와 함께 운영 가능" },
  { slug: "shasha-crepe", title: "크레페", desc: "생크림·과일 크레페와 크레페 파르페. 디저트 라인 대표 메뉴" },
  { slug: "churros", title: "츄러스", desc: "츄러스와 아이스크림 츄러스. 아이 동반 가족 대응" },
  { slug: "chan-cafe", title: "커피 · 에이드", desc: "아메리카노·에이드·스무디. 체류 시간을 늘리는 필수 구성" },
  { slug: "udon", title: "우동", desc: "기본 우동·김치우동·튀김우동. 저녁 시간대와 추운 계절에 강함" },
  { slug: "yakisoba", title: "야끼소바", desc: "철판 야끼소바. 오코노미야끼와 한 부스로 묶어 운영" },
  { slug: "hoeori", title: "회오리감자 · 소떡소떡", desc: "4,000~5,000원대. 아이 동반 가족이 가장 먼저 서는 부스" },
  { slug: "hotdog", title: "핫도그", desc: "뉴욕핫도그·옛날핫도그. 한 손 취식형 저단가 메뉴" },
  { slug: "eomuk", title: "새우꼬치 · 부산어묵", desc: "레몬새우·칠리새우와 어묵 3꼬치 4,000원 구성" },
  { slug: "shrimp", title: "새우튀김 · 새우버거", desc: "튀김류 중심 구성. 감자튀김 사이드 운영" },
  { slug: "gimbap", title: "충무김밥", desc: "포장 도시락형. 앉을 자리가 있는 행사에 적합" },
  { slug: "bingsu", title: "빙수", desc: "컵빙수·사과빙수. 여름 야외 행사 전용 라인" },
  { slug: "specialty", title: "스페셜티 커피", desc: "스페셜티 수준 커피 케이터링. 기업 행사·전시에 적합" },
  { slug: "bakery-coffee", title: "커피 · 베이커리", desc: "프리미엄 커피에 당일 구운 베이커리를 함께 운영" },
  { slug: "cocktail", title: "칵테일 · 주류", desc: "야간 행사 전용. 주류 판매 가능 여부는 장소별 확인 필요" },
];
