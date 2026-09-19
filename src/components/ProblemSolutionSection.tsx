import FadeInSection from "./FadeInSection";

const problems = [
  {
    icon: "🗓️",
    question: "날짜는 잡혔는데, 이걸 저 혼자 다 해야 하나요?",
    answer:
      "셀러 모집 공고, 신청서 취합, 부스 배치도, 장비 수배, 당일 현장 통제 — 담당자 한 명이 본업과 병행하기엔 많습니다. 플릿 유니온이 그 전부를 맡고, 담당자는 확인과 결정만 하시면 됩니다.",
  },
  {
    icon: "😰",
    question: "당일에 셀러가 안 나타나면 어떻게 하죠?",
    answer:
      "가장 자주 듣는 걱정입니다. 플릿 플랫폼의 리뷰 점수와 참가 이력으로 성실도가 확인된 셀러를 선발하고, 행사별로 예비 푸드트럭 1~2대를 대기시킵니다. 구멍이 나도 담당자가 뛰지 않습니다.",
  },
  {
    icon: "🧾",
    question: "끝나고 보고서는 또 어떻게 쓰나요?",
    answer:
      "행사 종료 후 48시간 이내에 방문자 수, 셀러별 매출, 참가비 정산 내역을 담은 결과 보고서를 드립니다. 그대로 내부 보고에 쓰실 수 있게 정리해서 보내 드립니다.",
  },
];

const steps = [
  {
    title: "공간 분석 & 기획",
    desc: "유동인구, 공간 구조, 목표 방문자를 분석해 최적의 마켓 콘셉트를 제안합니다.",
  },
  {
    title: "Flit 기반 셀러 모집",
    desc: "플릿의 리뷰 점수와 참가 이력을 바탕으로 콘셉트에 맞는 셀러를 빠르게 선발합니다.",
  },
  {
    title: "현장 설치 & 운영",
    desc: "부스 배치, 안전 관리, 고객 안내까지 전담 매니저가 현장을 책임집니다.",
  },
  {
    title: "결과 보고 & 정산",
    desc: "방문자 수, 매출 데이터, 셀러 리뷰 리포트와 투명한 정산서를 제공합니다.",
  },
];

export default function ProblemSolutionSection() {
  return (
    <section id="problem-solution" className="py-20 bg-white" aria-labelledby="problem-solution-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeInSection className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
            Why Flit Union
          </span>
          <h2 id="problem-solution-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            공간의 문제, 플릿 유니온이 해결합니다
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            많은 분들이 이런 고민을 하고 계십니다. 우리가 그 답을 제시합니다.
          </p>
        </FadeInSection>

        {/* Problem/Solution Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((item, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <article
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all h-full"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">{item.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
              </article>
            </FadeInSection>
          ))}
        </div>

        {/* Flit Trust Banner */}
        <FadeInSection className="mt-12">
          <div className="rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black"
              style={{ background: "#3182f6" }}
              aria-hidden="true"
            >
              F
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: "#3182f6" }}>
                플릿(Flit) 셀러 리뷰 플랫폼 연계
              </p>
              <h3 className="text-base font-black text-gray-900 mb-1">셀러 리뷰 점수가 검증한 마켓 운영사</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                플릿에 참가한 셀러들의 실제 리뷰와 평점을 기반으로 운영 퀄리티를 지속 관리합니다.
                다른 대행사가 갖지 못한 데이터 기반 운영 역량입니다.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Process Steps */}
        <div className="mt-16">
          <FadeInSection className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              의뢰부터 행사 완료까지, 4단계 원스톱 프로세스
            </h2>
          </FadeInSection>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" role="list">
            {steps.map((item, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <li className="bg-white rounded-2xl p-6 border border-gray-100 relative h-full"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-black mb-4"
                    style={{ background: "#3182f6" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </li>
              </FadeInSection>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
