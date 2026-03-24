const portfolioItems = [
  {
    category: "대학교 축제",
    title: "홍익대학교 대동제 플리마켓 운영 사례",
    location: "서울 마포구",
    description:
      "3일간 150개 부스 운영. 재학생 80명, 플릿 인증 외부 셀러 70명 참가. 야시장 연계 야간 운영으로 방문자 12,000명 달성.",
    stats: [
      { label: "운영 일수", value: "3일" },
      { label: "셀러", value: "150팀" },
      { label: "방문자", value: "12,000명" },
    ],
    tag: "캠퍼스 마켓",
    color: "bg-blue-50 border-blue-100",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    category: "야시장",
    title: "한강공원 여름 야시장 행사 운영 사례",
    location: "서울 영등포구",
    description:
      "야간 6시간 운영, 푸드트럭 20대 + 플리마켓 셀러 50팀 복합 구성. 조명·무대·음향 렌탈 포함 원스톱 운영.",
    stats: [
      { label: "푸드트럭", value: "20대" },
      { label: "셀러", value: "50팀" },
      { label: "일 방문자", value: "3,500명" },
    ],
    tag: "야시장",
    color: "bg-indigo-50 border-indigo-100",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    category: "카페 이벤트",
    title: "강남 대형 카페 브런치 마켓 운영 사례",
    location: "서울 강남구",
    description:
      "200석 규모 카페 홀 활용, 핸드메이드 & 빈티지 콘셉트 월 2회 정기 운영. 카페 주말 매출 40% 증가.",
    stats: [
      { label: "운영 주기", value: "월 2회" },
      { label: "참가 셀러", value: "30팀" },
      { label: "매출 증가", value: "+40%" },
    ],
    tag: "카페 마켓",
    color: "bg-amber-50 border-amber-100",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    category: "유휴공간 활용",
    title: "성수동 복합문화공간 주말 팝업마켓 사례",
    location: "서울 성동구",
    description:
      "평일 비어있는 1·2층 공간 주말 플리마켓 전환. 렌탈 장비 일체 제공, 월 임대 외 추가 수익 창출.",
    stats: [
      { label: "공간 면적", value: "330㎡" },
      { label: "월 운영", value: "4회" },
      { label: "렌탈 장비", value: "일체 포함" },
    ],
    tag: "공간 수익화",
    color: "bg-green-50 border-green-100",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    category: "대학교 축제",
    title: "건국대학교 봄 축제 야외 플리마켓 사례",
    location: "서울 광진구",
    description:
      "교내 야외 공간 2일 운영. 푸드트럭 8대 섭외 포함. 플릿 기반 학생 창업 셀러 우선 선발로 학교-학생 윈윈 구조.",
    stats: [
      { label: "푸드트럭", value: "8대" },
      { label: "학생 셀러", value: "60%" },
      { label: "방문자", value: "8,000명" },
    ],
    tag: "캠퍼스 마켓",
    color: "bg-purple-50 border-purple-100",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    category: "브랜드 행사",
    title: "분당 프리미엄 아울렛 시즌 팝업마켓 사례",
    location: "경기 성남시",
    description:
      "추석 시즌 5일간 야외 광장 팝업 마켓. 텐트·조명·배너 등 장비 전량 렌탈 제공, 선물 콘셉트 셀러 집중 구성.",
    stats: [
      { label: "운영 일수", value: "5일" },
      { label: "셀러", value: "80팀" },
      { label: "일 방문자", value: "2,500명" },
    ],
    tag: "브랜드 팝업",
    color: "bg-rose-50 border-rose-100",
    tagColor: "bg-rose-100 text-rose-700",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-24 bg-gray-50"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: "#3182f6" }}
          >
            Portfolio
          </span>
          <h2
            id="portfolio-heading"
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
          >
            검증된 운영 실적, 직접 확인하세요
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            플리마켓·야시장·푸드트럭·렌탈까지, 전국 다양한 공간의 실제 운영 사례입니다.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <article
              key={index}
              className={`rounded-2xl p-6 border ${item.color} hover:shadow-md hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <span className="text-xs text-gray-400">{item.location}</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-3 leading-snug">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                {item.description}
              </p>

              <dl className="grid grid-cols-3 gap-2 border-t border-gray-200 pt-4">
                {item.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <dd className="font-bold text-gray-900 text-sm">
                      {stat.value}
                    </dd>
                    <dt className="text-xs text-gray-400 mt-0.5">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-14 rounded-2xl p-8 sm:p-12 text-center text-white"
          style={{
            background: "linear-gradient(135deg, #3182f6 0%, #1b64da 100%)",
          }}
        >
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            다음 성공 사례의 주인공이 되세요
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            귀하의 공간에 맞는 플리마켓·야시장 플랜을 무료로 제안해 드립니다.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            style={{ color: "#3182f6" }}
          >
            무료 기획안 요청하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
