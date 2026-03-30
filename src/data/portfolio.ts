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
  /** 실제 이미지 파일 경로 (예: /portfolio/wonju-univ.jpg). 없으면 gradient placeholder 표시 */
  image?: string;
  /** 이미지 없을 때 사용하는 CSS gradient */
  placeholderGradient: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "wonju-univ-night",
    tag: "야시장",
    location: "강원 원주시",
    title: "원주 소재 대학교 야시장 운영",
    desc: "대학교 축제 기간 야시장을 기획·운영. 푸드트럭과 플리마켓 셀러를 결합한 복합 야간 마켓으로 캠퍼스에 활기를 불어넣었습니다.",
    fullDesc: "원주 소재 대학교의 축제 기간에 맞춰 교내 야외 공간에서 야시장을 운영했습니다. 낮 축제 프로그램이 끝나는 저녁 시간대부터 야간까지 운영하여 축제의 연장선으로 자연스럽게 이어지도록 기획했습니다. 조명 연출과 음악으로 야시장 특유의 분위기를 만들고, 학생들과 지역 주민 모두가 즐길 수 있는 공간을 조성했습니다.",
    stats: [
      { label: "행사 유형", value: "야시장" },
      { label: "셀러 구성", value: "푸드+마켓" },
      { label: "운영 시간", value: "야간" },
    ],
    details: [
      { title: "기획 배경", content: "대학교 축제 기간 저녁 시간대 콘텐츠 부재 문제를 해결하고, 학생·지역 주민 모두 즐길 수 있는 야시장을 기획했습니다." },
      { title: "운영 방식", content: "저녁 시간대부터 야간까지 푸드트럭 존과 플리마켓 셀러 존을 병행 운영. 야간 조명 연출로 분위기를 조성했습니다." },
      { title: "셀러 구성", content: "지역 맛집 푸드트럭과 Flit 기반 핸드메이드·빈티지 셀러를 조합하여 먹거리와 볼거리를 동시에 제공했습니다." },
      { title: "성과", content: "축제 기간 야간 방문자 유입을 크게 늘리며 대학 측의 높은 만족도를 얻었습니다." },
    ],
    tagClass: "bg-indigo-100 text-indigo-700",
    borderClass: "border-indigo-100",
    placeholderGradient: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
  },
  {
    id: "daegu-univ-flea",
    tag: "캠퍼스 마켓",
    location: "대구광역시",
    title: "대구 소재 대학교 플리마켓 운영",
    desc: "대구 소재 대학교 캠퍼스 내 플리마켓 전 과정을 대행. Flit 셀러 네트워크를 활용해 다양한 카테고리의 셀러를 구성했습니다.",
    fullDesc: "대구 소재 대학교에서 캠퍼스 플리마켓을 운영했습니다. 학생 창업 셀러와 외부 Flit 인증 셀러를 조합하여 핸드메이드, 빈티지, 굿즈 등 다채로운 카테고리를 구성했습니다. 셀러 모집부터 부스 배치, 현장 운영, 정산까지 전 과정을 원스톱으로 대행하여 대학 측의 운영 부담을 최소화했습니다.",
    stats: [
      { label: "행사 유형", value: "플리마켓" },
      { label: "셀러 구성", value: "학생+외부" },
      { label: "운영 방식", value: "전 과정 대행" },
    ],
    details: [
      { title: "기획 배경", content: "대학 측에서 학생 참여형 플리마켓을 원했으나 셀러 모집과 현장 운영의 전문성이 부족하여 대행을 의뢰했습니다." },
      { title: "운영 방식", content: "교내 광장에 부스를 배치하고 전담 매니저가 상주하여 셀러 입·퇴장, 방문자 안내, 안전 관리를 책임졌습니다." },
      { title: "셀러 구성", content: "학생 창업팀을 우선 선발하고 나머지는 Flit 플랫폼을 통해 핸드메이드·빈티지 카테고리 외부 셀러로 구성했습니다." },
      { title: "성과", content: "학생과 방문자 모두 높은 만족도를 보였으며, 다음 학기 재의뢰로 이어졌습니다." },
    ],
    tagClass: "bg-blue-100 text-blue-700",
    borderClass: "border-blue-100",
    placeholderGradient: "linear-gradient(135deg, #1e3a8a 0%, #3182f6 100%)",
  },
  {
    id: "seoul-festival-booth",
    tag: "대형 축제",
    location: "서울특별시",
    title: "서울 소재 대형 축제 부스 운영",
    desc: "서울에서 열린 대형 축제에 부스를 기획·운영. 대규모 방문자 동선에 맞춘 부스 배치와 현장 관리를 수행했습니다.",
    fullDesc: "서울 시내 대형 축제 현장에서 부스 운영 전반을 대행했습니다. 대규모 인파가 몰리는 축제 특성에 맞춰 방문자 동선을 고려한 부스 배치, 안전 관리, 셀러 운영을 체계적으로 진행했습니다. 축제 주최 측과 긴밀하게 협업하여 행사 콘셉트에 부합하는 부스 콘텐츠를 구성했습니다.",
    stats: [
      { label: "행사 규모", value: "대형" },
      { label: "운영 범위", value: "부스 전체" },
      { label: "협업", value: "주최측 연계" },
    ],
    details: [
      { title: "기획 배경", content: "대형 축제 주최 측에서 부스 존 운영을 전문 업체에 위탁하고자 의뢰했습니다." },
      { title: "운영 방식", content: "축제 콘셉트에 맞는 셀러를 선별 배치하고, 대규모 인파에 대응하는 동선 설계와 안전 관리 체계를 수립했습니다." },
      { title: "장비 구성", content: "부스 텐트, 테이블, 배너, 조명 등 행사 장비를 일괄 렌탈 제공하여 통일감 있는 현장을 연출했습니다." },
      { title: "성과", content: "축제 방문자들의 부스 존 체류 시간과 만족도가 높아 주최 측으로부터 긍정적 평가를 받았습니다." },
    ],
    tagClass: "bg-rose-100 text-rose-700",
    borderClass: "border-rose-100",
    placeholderGradient: "linear-gradient(135deg, #881337 0%, #f43f5e 100%)",
  },
  {
    id: "seoul-apt-night",
    tag: "야시장",
    location: "서울특별시",
    title: "서울 소재 아파트 야시장 운영",
    desc: "서울 아파트 단지 내 유휴 공간을 활용한 주민 참여형 야시장. 입주민과 인근 주민 모두가 즐길 수 있는 커뮤니티 행사로 기획했습니다.",
    fullDesc: "서울 소재 아파트 단지의 유휴 공간(주차장·광장)을 활용하여 주민 참여형 야시장을 운영했습니다. 입주민 커뮤니티 활성화와 인근 지역 주민 유입을 동시에 달성하는 것을 목표로, 먹거리·핸드메이드·체험 부스를 복합 구성했습니다. 아파트 관리사무소와 협업하여 소음·안전 관리를 철저히 진행했습니다.",
    stats: [
      { label: "행사 유형", value: "야시장" },
      { label: "공간", value: "아파트 단지" },
      { label: "대상", value: "입주민+지역" },
    ],
    details: [
      { title: "기획 배경", content: "아파트 입주자대표회의에서 주민 화합과 커뮤니티 활성화를 위한 야시장 행사를 의뢰했습니다." },
      { title: "운영 방식", content: "저녁 시간대 단지 내 공간에서 운영. 소음 규제를 고려한 시간 설정과 동선 관리를 적용했습니다." },
      { title: "셀러 구성", content: "입주민 참여 셀러와 푸드트럭, 외부 핸드메이드 셀러를 조합하여 커뮤니티 행사 성격을 강화했습니다." },
      { title: "성과", content: "주민 참여도와 만족도가 높아 정기 행사로의 전환을 검토 중입니다." },
    ],
    tagClass: "bg-amber-100 text-amber-700",
    borderClass: "border-amber-100",
    placeholderGradient: "linear-gradient(135deg, #78350f 0%, #f59e0b 100%)",
  },
  {
    id: "hanam-apt-night",
    tag: "야시장",
    location: "경기 하남시",
    title: "하남 소재 아파트 야시장 운영",
    desc: "하남 아파트 단지에서 주민 대상 야시장을 운영. 가족 단위 방문자를 고려한 콘텐츠 구성으로 높은 참여율을 기록했습니다.",
    fullDesc: "하남 소재 대규모 아파트 단지에서 주민 대상 야시장을 기획·운영했습니다. 가족 단위 방문자가 많은 아파트 단지 특성을 반영하여 키즈 체험 부스, 가족 먹거리, 핸드메이드 소품 등 전 연령대가 즐길 수 있는 콘텐츠로 구성했습니다. 관리사무소와 긴밀히 협업하여 주차·소음·안전을 체계적으로 관리했습니다.",
    stats: [
      { label: "행사 유형", value: "야시장" },
      { label: "타깃", value: "가족 단위" },
      { label: "공간", value: "아파트 단지" },
    ],
    details: [
      { title: "기획 배경", content: "아파트 단지 내 커뮤니티 행사에 대한 입주민 수요가 높아 관리사무소에서 야시장 운영을 의뢰했습니다." },
      { title: "운영 방식", content: "단지 내 광장에서 저녁 시간대 운영. 가족 친화적 콘텐츠 중심으로 키즈존·체험존을 별도 구성했습니다." },
      { title: "셀러 구성", content: "푸드트럭, 수제 디저트, 핸드메이드 소품, 키즈 체험 셀러 등 가족 대상에 맞춘 카테고리로 구성했습니다." },
      { title: "성과", content: "입주민 참여율이 매우 높았으며, 단지 내 커뮤니티 활성화에 기여했다는 긍정적 피드백을 받았습니다." },
    ],
    tagClass: "bg-green-100 text-green-700",
    borderClass: "border-green-100",
    placeholderGradient: "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
  },
  {
    id: "seoul-univ-flea",
    tag: "캠퍼스 마켓",
    location: "서울특별시",
    title: "서울 소재 대학교 플리마켓 운영",
    desc: "서울 소재 대학교 캠퍼스에서 플리마켓 운영을 대행. 학생 창업 셀러 우선 선발과 Flit 셀러 조합으로 퀄리티 높은 마켓을 구현했습니다.",
    fullDesc: "서울 소재 대학교에서 축제 또는 정기 행사의 일환으로 캠퍼스 플리마켓을 운영했습니다. 학생 창업팀을 우선 선발하여 캠퍼스 특색을 살리고, Flit 플랫폼의 검증된 외부 셀러를 추가하여 다양성과 퀄리티를 동시에 확보했습니다. 전담 매니저가 현장에 상주하며 운영 전반을 책임졌습니다.",
    stats: [
      { label: "행사 유형", value: "플리마켓" },
      { label: "셀러 구성", value: "학생+Flit" },
      { label: "운영", value: "전담 매니저" },
    ],
    details: [
      { title: "기획 배경", content: "학생회에서 축제 기간 플리마켓을 기획했으나 셀러 모집·현장 운영의 전문성이 필요하여 대행을 의뢰했습니다." },
      { title: "운영 방식", content: "캠퍼스 내 야외 공간에 부스를 배치하고, 셀러 입·퇴장 관리부터 방문자 안내까지 전담 매니저가 운영했습니다." },
      { title: "셀러 구성", content: "학생 창업팀(핸드메이드, 굿즈)을 우선 배정하고, 빈티지·아트 카테고리는 Flit 외부 셀러로 보충했습니다." },
      { title: "성과", content: "학생·방문자 만족도가 높았으며, 학생 창업팀의 판매 경험 제공이라는 부가 가치도 달성했습니다." },
    ],
    tagClass: "bg-purple-100 text-purple-700",
    borderClass: "border-purple-100",
    placeholderGradient: "linear-gradient(135deg, #4a1d96 0%, #a855f7 100%)",
  },
  {
    id: "chungcheong-festival",
    tag: "대형 축제",
    location: "충청도",
    title: "충청 소재 대형 축제 부스 운영",
    desc: "충청 지역 대형 축제에서 부스 존을 기획·운영. 지역 특색을 반영한 셀러 구성과 체계적인 현장 관리를 수행했습니다.",
    fullDesc: "충청 지역에서 열린 대형 축제의 부스 존 운영을 대행했습니다. 지역 특산물·공예품 셀러와 Flit 플랫폼 셀러를 조합하여 지역 색과 다양성을 동시에 살렸습니다. 대규모 행사 특성에 맞는 동선 설계, 안전 관리, 장비 렌탈을 원스톱으로 제공했습니다.",
    stats: [
      { label: "행사 규모", value: "대형" },
      { label: "셀러 구성", value: "지역+Flit" },
      { label: "장비", value: "일괄 렌탈" },
    ],
    details: [
      { title: "기획 배경", content: "축제 주최 측에서 부스 존의 체계적 운영과 셀러 퀄리티 관리를 위해 전문 대행을 의뢰했습니다." },
      { title: "운영 방식", content: "축제장 내 지정 구역에 부스를 배치하고, 대규모 인파 대응을 위한 동선 관리와 안전 인력을 배치했습니다." },
      { title: "셀러 구성", content: "지역 특산물·전통 공예 셀러와 핸드메이드·푸드 카테고리 Flit 셀러를 조합하여 구성했습니다." },
      { title: "성과", content: "축제 방문자들의 부스 존 만족도가 높았으며, 지역 셀러 활성화에도 기여했습니다." },
    ],
    tagClass: "bg-teal-100 text-teal-700",
    borderClass: "border-teal-100",
    placeholderGradient: "linear-gradient(135deg, #134e4a 0%, #14b8a6 100%)",
  },
  {
    id: "seoul-folk-festival",
    tag: "민속 축제",
    location: "서울특별시",
    title: "서울 소재 민속 축제 부스 운영",
    desc: "서울에서 열린 민속 축제에 부스를 운영. 전통 문화 콘셉트에 맞는 셀러 구성과 분위기 연출로 축제와 조화를 이뤘습니다.",
    fullDesc: "서울에서 개최된 민속 축제에서 부스 존 운영을 대행했습니다. 전통 문화·민속 테마에 어울리는 전통 공예, 전통 먹거리, 체험형 셀러를 중심으로 구성하여 축제의 정체성과 자연스럽게 어우러지도록 기획했습니다. 전통 소재 장식과 조명으로 부스 존 전체의 분위기를 통일했습니다.",
    stats: [
      { label: "행사 유형", value: "민속 축제" },
      { label: "콘셉트", value: "전통 문화" },
      { label: "부스 구성", value: "체험+판매" },
    ],
    details: [
      { title: "기획 배경", content: "민속 축제 주최 측에서 전통 문화 콘셉트에 부합하는 부스 존 운영을 전문 업체에 위탁하고자 의뢰했습니다." },
      { title: "운영 방식", content: "축제 테마에 맞는 전통 소재 장식을 활용한 부스 연출과 체험형 콘텐츠를 기획·운영했습니다." },
      { title: "셀러 구성", content: "전통 공예(도자기, 매듭, 한지), 전통 먹거리, 민속 체험 셀러를 중심으로 축제 콘셉트에 맞게 구성했습니다." },
      { title: "성과", content: "축제 분위기와의 높은 조화도로 주최 측과 방문자 모두에게 좋은 평가를 받았습니다." },
    ],
    tagClass: "bg-orange-100 text-orange-700",
    borderClass: "border-orange-100",
    placeholderGradient: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
  },
];
