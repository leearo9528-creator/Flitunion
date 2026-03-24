const problems = [
  {
    icon: "🏚️",
    question: "수익이 나지 않는 유휴공간, 어떻게 활용할까요?",
    answer:
      "빈 주차장, 낮 시간 한산한 카페 홀, 비어있는 건물 로비 — 이 공간들이 정기 플리마켓의 무대가 될 수 있습니다. 플릿 유니온이 유동인구를 분석하고 최적의 마켓 모델을 설계합니다.",
  },
  {
    icon: "🎓",
    question: "성공적인 대학 축제 플리마켓의 조건은 무엇일까요?",
    answer:
      "학생들이 원하는 콘셉트, 검증된 셀러 구성, 안전한 현장 동선 설계가 핵심입니다. 플릿 리뷰 데이터를 기반으로 평점 높은 셀러를 우선 선발하여 행사 만족도를 높입니다.",
  },
  {
    icon: "☕",
    question: "카페 매출을 높이는 이벤트, 직접 기획하기엔 너무 복잡하지 않나요?",
    answer:
      "셀러 모집, SNS 홍보, 당일 운영, 정산까지 모든 것이 준비물입니다. 플릿 유니온에 맡기면 카페 사장님은 커피만 신경 쓰면 됩니다.",
  },
];

export default function ProblemSolutionSection() {
  return (
    <section
      id="problem-solution"
      className="py-24 bg-gray-50"
      aria-labelledby="problem-solution-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: "#3182f6" }}
          >
            Why Flit Union
          </span>
          <h2
            id="problem-solution-heading"
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
          >
            공간의 문제, 플릿 유니온이 해결합니다
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            많은 분들이 이런 고민을 하고 계십니다. 우리가 그 답을 제시합니다.
          </p>
        </div>

        {/* Problem/Solution cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                {item.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        {/* Flit 신뢰 배너 */}
        <div
          className="mt-14 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6"
          style={{ backgroundColor: "#ebf3fe" }}
        >
          <div
            className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black"
            style={{ backgroundColor: "#3182f6" }}
            aria-hidden="true"
          >
            F
          </div>
          <div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: "#3182f6" }}
            >
              플릿(Flit) 셀러 리뷰 플랫폼 연계
            </p>
            <h3 className="text-xl font-black text-gray-900 mb-1">
              셀러 리뷰 점수가 검증한 마켓 운영사
            </h3>
            <p className="text-gray-600 text-sm">
              플릿에 참가한 셀러들의 실제 리뷰와 평점을 기반으로 운영 퀄리티를
              지속 관리합니다. 다른 대행사가 갖지 못한 데이터 기반 운영 역량입니다.
            </p>
          </div>
        </div>

        {/* Process overview */}
        <div className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-12">
            의뢰부터 행사 완료까지, 4단계 원스톱 프로세스
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {[
              {
                step: "01",
                title: "공간 분석 & 기획",
                desc: "유동인구, 공간 구조, 목표 방문자를 분석해 최적의 마켓 콘셉트를 제안합니다.",
              },
              {
                step: "02",
                title: "플릿 기반 셀러 모집",
                desc: "플릿의 리뷰 점수와 참가 이력을 바탕으로 콘셉트에 맞는 셀러를 빠르게 선발합니다.",
              },
              {
                step: "03",
                title: "현장 설치 & 운영",
                desc: "부스 배치, 안전 관리, 고객 안내까지 전담 매니저가 현장을 책임집니다.",
              },
              {
                step: "04",
                title: "결과 보고 & 정산",
                desc: "방문자 수, 매출 데이터, 셀러 리뷰 리포트와 투명한 정산서를 제공합니다.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <span
                  className="block text-5xl font-black mb-4 leading-none"
                  style={{ color: "#ebf3fe" }}
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
