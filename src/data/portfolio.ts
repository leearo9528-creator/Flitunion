export type PortfolioItem = {
  id: string;
  tag: string;
  location: string;
  title: string;
  desc: string;
  fullDesc: string;
  stats: { label: string; value: string }[];
  details: { title: string; content: string }[];
  tagClass: string;
  borderClass: string;
  /** 실제 이미지 파일 경로 (예: /portfolio/hongik-festival.jpg). 없으면 gradient placeholder 표시 */
  image?: string;
  /** 이미지 없을 때 사용하는 CSS gradient */
  placeholderGradient: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "hongik-festival",
    tag: "캠퍼스 마켓",
    location: "서울 마포구",
    title: "홍익대학교 대동제 플리마켓 운영 사례",
    desc: "3일간 150개 부스 운영. 재학생 80명, Flit 인증 외부 셀러 70명 참가. 야시장 연계 야간 운영으로 방문자 12,000명 달성.",
    fullDesc: "홍익대학교 총학생회와 협업하여 대동제 기간 3일간 플리마켓 전 과정을 대행했습니다. 낮에는 핸드메이드·굿즈 중심 플리마켓, 저녁에는 야시장 형태로 전환하는 이중 콘셉트를 적용하여 방문자층을 낮과 밤으로 분산시켰습니다.",
    stats: [
      { label: "운영 일수", value: "3일" },
      { label: "셀러", value: "150팀" },
      { label: "방문자", value: "12,000명" },
    ],
    details: [
      { title: "기획 배경", content: "기존 축제 내 마켓 운영이 체계 없이 진행되어 셀러 불만과 방문자 혼잡이 반복되었습니다. 총학생회의 요청으로 전문 운영 대행을 도입했습니다." },
      { title: "운영 방식", content: "오전 11시~오후 6시 플리마켓, 오후 6시~10시 야시장으로 이원화 운영. 야간에는 조명 연출과 버스킹 공연을 추가하여 분위기를 전환했습니다." },
      { title: "셀러 구성", content: "Flit 플랫폼을 통해 재학생 창업 셀러 80팀을 우선 선발하고, 핸드메이드·빈티지·푸드 카테고리 외부 셀러 70팀을 추가 구성했습니다." },
      { title: "성과", content: "3일 합산 방문자 12,000명, 셀러 평균 매출 35만원. 행사 만족도 설문 결과 96점(100점 만점). 이듬해 재의뢰 확정." },
    ],
    tagClass: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-100",
    placeholderGradient: "linear-gradient(135deg, #1e3a8a 0%, #3182f6 100%)",
  },
  {
    id: "hangang-night",
    tag: "야시장",
    location: "서울 영등포구",
    title: "한강공원 여름 야시장 행사 운영 사례",
    desc: "야간 6시간 운영, 푸드트럭 20대 + 플리마켓 셀러 50팀 복합 구성. 조명·무대·음향 렌탈 포함 원스톱 운영.",
    fullDesc: "여의도 한강공원 내 야외 광장을 활용한 여름 야시장입니다. 푸드트럭 존과 플리마켓 존을 구분 배치하고, 중앙 무대에서 버스킹 공연을 진행하는 복합 행사로 기획했습니다.",
    stats: [
      { label: "푸드트럭", value: "20대" },
      { label: "셀러", value: "50팀" },
      { label: "일 방문자", value: "3,500명" },
    ],
    details: [
      { title: "기획 배경", content: "한강공원 내 유휴 광장을 주말 야시장으로 활성화하여 지역 상권과 시민 여가를 동시에 지원하는 프로젝트였습니다." },
      { title: "운영 방식", content: "오후 5시~11시 운영. 동쪽 구역 푸드트럭 20대, 서쪽 구역 플리마켓 50팀, 중앙 무대 2시간 간격 버스킹 공연으로 구성했습니다." },
      { title: "장비 구성", content: "파고라 텐트 50개, 가랜드 조명 200m, 무대 1식, 음향 장비, 전기 분배기 5식 전량 자체 렌탈 제공했습니다." },
      { title: "성과", content: "8주 연속 운영 중 누적 방문자 28,000명. SNS 인스타그램 태그 게시물 3,200건 이상 발생. 다음 시즌 규모 확대 계약 체결." },
    ],
    tagClass: "bg-indigo-100 text-indigo-700",
    borderClass: "border-indigo-100",
    placeholderGradient: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
  },
  {
    id: "gangnam-cafe",
    tag: "카페 마켓",
    location: "서울 강남구",
    title: "강남 대형 카페 브런치 마켓 운영 사례",
    desc: "200석 규모 카페 홀 활용, 핸드메이드 & 빈티지 콘셉트 월 2회 정기 운영. 카페 주말 매출 40% 증가.",
    fullDesc: "강남 200석 규모 대형 카페의 주말 홀을 핸드메이드·빈티지 콘셉트 플리마켓으로 전환했습니다. 카페 음료 주문과 마켓 쇼핑을 자연스럽게 연계하여 카페 매출과 셀러 매출을 동시에 높였습니다.",
    stats: [
      { label: "운영 주기", value: "월 2회" },
      { label: "참가 셀러", value: "30팀" },
      { label: "매출 증가", value: "+40%" },
    ],
    details: [
      { title: "기획 배경", content: "주말 점심 이후 손님이 급감하는 문제를 해결하기 위해 카페 사장님이 마켓 운영을 의뢰했습니다. 홀 공간을 최대한 활용하는 구조를 설계했습니다." },
      { title: "운영 방식", content: "매월 둘째·넷째 주 토요일 오후 1시~7시 운영. 카페 테이블을 재배치하여 셀러 30팀이 입점하고, 방문자는 음료를 주문하며 쇼핑하는 구조입니다." },
      { title: "셀러 구성", content: "핸드메이드 액세서리, 천연 비누, 빈티지 소품, 식물 등 카페 감성과 어울리는 카테고리를 중심으로 구성했습니다." },
      { title: "성과", content: "6개월 정기 운영 후 카페 주말 매출 평균 40% 증가. 인스타그램 팔로워 2배 성장. 카페 브랜딩 효과로 평일 방문자도 15% 증가." },
    ],
    tagClass: "bg-amber-100 text-amber-700",
    borderClass: "border-amber-100",
    placeholderGradient: "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)",
  },
  {
    id: "seongsu-popup",
    tag: "공간 수익화",
    location: "서울 성동구",
    title: "성수동 복합문화공간 주말 팝업마켓 사례",
    desc: "평일 비어있는 1·2층 공간 주말 플리마켓 전환. 렌탈 장비 일체 제공, 월 임대 외 추가 수익 창출.",
    fullDesc: "성수동에 위치한 복합문화공간 1·2층의 평일 유휴 공간을 주말 플리마켓으로 전환했습니다. 공간 오너는 월 임대 수익 외에 셀러 참가비 수익을 추가로 확보했습니다.",
    stats: [
      { label: "공간 면적", value: "330㎡" },
      { label: "월 운영", value: "4회" },
      { label: "렌탈 장비", value: "일체 포함" },
    ],
    details: [
      { title: "기획 배경", content: "공간 오너가 평일 임대 후 주말에 비어있는 공간을 수익화하고 싶다는 의뢰로 시작했습니다. 공간 인지도도 함께 높이고 싶다는 목표가 있었습니다." },
      { title: "운영 방식", content: "매주 토·일 오전 11시~오후 7시 운영. 1층은 핸드메이드·식품 셀러, 2층은 빈티지·아트 셀러로 층별 콘셉트를 구분했습니다." },
      { title: "장비 구성", content: "330㎡ 공간에 접이식 테이블 60개, 파티션 20개, 조명 장비 일체를 자체 렌탈 제공. 공간 오너는 별도 장비 구매 없이 운영 가능했습니다." },
      { title: "성과", content: "월 4회 운영으로 셀러 참가비 순수익 월 평균 180만원 추가 확보. 공간 인스타그램 팔로워 3개월 만에 1,200명 증가. 카페 및 갤러리 입점 문의 증가." },
    ],
    tagClass: "bg-green-100 text-green-700",
    borderClass: "border-green-100",
    placeholderGradient: "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
  },
  {
    id: "konkuk-festival",
    tag: "캠퍼스 마켓",
    location: "서울 광진구",
    title: "건국대학교 봄 축제 야외 플리마켓 사례",
    desc: "교내 야외 공간 2일 운영. 푸드트럭 8대 섭외 포함. Flit 기반 학생 창업 셀러 우선 선발.",
    fullDesc: "건국대학교 봄 축제 기간 교내 광장에서 2일간 플리마켓과 푸드트럭 존을 통합 운영했습니다. 학생 창업 셀러를 우선 선발하는 정책을 도입하여 대학 측과 학생 모두의 만족도를 높였습니다.",
    stats: [
      { label: "푸드트럭", value: "8대" },
      { label: "학생 셀러", value: "60%" },
      { label: "방문자", value: "8,000명" },
    ],
    details: [
      { title: "기획 배경", content: "학생회 예산 내에서 퀄리티 있는 마켓을 운영하고 싶다는 요청이었습니다. 학생 창업 셀러를 발굴·지원하는 방향으로 기획했습니다." },
      { title: "운영 방식", content: "교내 광장 셀러 60부스 + 푸드트럭 존 8대를 병행 운영. 학생 창업팀 36부스(60%)를 우선 배정하고 나머지는 외부 Flit 셀러로 구성했습니다." },
      { title: "셀러 구성", content: "학생 창업팀: 졸업작품 굿즈, 핸드메이드 제품, 수제 식품. 외부 셀러: 빈티지 의류, 보석류, 아트 포스터. 푸드트럭: 타코, 버거, 떡볶이, 디저트 등 8종." },
      { title: "성과", content: "2일 방문자 8,000명. 학생 셀러 평균 매출 28만원. 대학 측 만족도 조사 94점. 다음 가을 축제 연속 의뢰 확정." },
    ],
    tagClass: "bg-purple-100 text-purple-700",
    borderClass: "border-purple-100",
    placeholderGradient: "linear-gradient(135deg, #4a1d96 0%, #a855f7 100%)",
  },
  {
    id: "bundang-outlet",
    tag: "브랜드 팝업",
    location: "경기 성남시",
    title: "분당 프리미엄 아울렛 시즌 팝업마켓 사례",
    desc: "추석 시즌 5일간 야외 광장 팝업 마켓. 텐트·조명·배너 등 장비 전량 렌탈 제공.",
    fullDesc: "분당 프리미엄 아울렛의 야외 광장을 활용해 추석 시즌 5일간 시즌 팝업마켓을 진행했습니다. 선물 콘셉트 셀러를 중심으로 구성하여 명절 집객 효과를 극대화하고, 아울렛 브랜드 이미지와 어울리는 프리미엄 마켓을 연출했습니다.",
    stats: [
      { label: "운영 일수", value: "5일" },
      { label: "셀러", value: "80팀" },
      { label: "일 방문자", value: "2,500명" },
    ],
    details: [
      { title: "기획 배경", content: "추석 연휴 아울렛 방문자 집객을 위한 이벤트 필요성으로 의뢰했습니다. 기존 행사 대비 차별화된 콘텐츠가 필요한 상황이었습니다." },
      { title: "운영 방식", content: "야외 광장 1,200㎡에 80팀 부스를 배치. '선물하기 좋은 마켓'을 슬로건으로 식품·공예·패션 선물 카테고리 셀러를 집중 구성했습니다." },
      { title: "장비 구성", content: "프리미엄 마켓 이미지에 맞춰 화이트 천막 80개, 우드 테이블 80개, 따뜻한 색감의 조명 장비 일체를 렌탈 제공했습니다. 입구 아치 배너, 포토존도 설치했습니다." },
      { title: "성과", content: "5일 누적 방문자 12,500명, 일 평균 2,500명. 셀러 평균 매출 52만원(5일). 아울렛 측 명절 기간 집객 목표 130% 달성. 설·추석 정기 행사로 계약 연장." },
    ],
    tagClass: "bg-rose-100 text-rose-700",
    borderClass: "border-rose-100",
    placeholderGradient: "linear-gradient(135deg, #881337 0%, #f43f5e 100%)",
  },
];
