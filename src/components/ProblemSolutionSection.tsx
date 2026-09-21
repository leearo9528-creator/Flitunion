import FadeInSection from "./FadeInSection";

const problems = [
  {
    iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    question: "행사 일정은 확정되었는데, 준비를 담당자 혼자 감당해야 합니까?",
    answer:
      "셀러 모집 공고, 신청서 취합, 부스 배치도 작성, 장비 수배, 당일 현장 운영까지 담당자 한 분이 본업과 병행하기에는 부담이 큽니다. 플릿 유니온이 전 과정을 대행하며, 담당자께서는 확인과 결정만 하시면 됩니다.",
  },
  {
    iconPath: "M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 4a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z",
    question: "당일 셀러가 불참하면 어떻게 대응합니까?",
    answer:
      "가장 많이 주시는 질문입니다. 플릿 플랫폼의 리뷰 점수와 참가 이력으로 성실도가 확인된 셀러를 선발하며, 행사별로 예비 푸드트럭 1~2대를 대기시킵니다. 결원이 발생하더라도 현장 대응은 플릿 유니온이 맡습니다.",
  },
  {
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    question: "행사 종료 후 결과 보고는 어떻게 준비합니까?",
    answer:
      "행사 종료 후 48시간 이내에 방문자 수, 셀러별 매출, 참가비 정산 내역을 담은 결과 보고서를 제공해 드립니다. 내부 보고에 그대로 활용하실 수 있는 형태로 정리하여 전달드립니다.",
  },
];

const steps = [
  {
    title: "현장 분석 및 기획",
    desc: "유동인구, 공간 구조, 목표 방문자를 분석하여 최적의 행사 콘셉트를 제안합니다.",
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
            행사 준비의 문제, 플릿 유니온이 해결합니다
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            행사 담당자들이 실제로 겪는 문제입니다. 플릿 유니온이 해법을 제시합니다.
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
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                  style={{ background: "#eff6ff", color: "#3182f6" }}
                  aria-hidden="true"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.iconPath} />
                  </svg>
                </div>
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
              <h3 className="text-base font-black text-gray-900 mb-1">셀러 리뷰 데이터로 운영 품질을 관리하는 행사 대행사</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                플릿에 참가한 셀러들의 실제 리뷰와 평점을 기반으로 운영 품질을 지속 관리합니다.
                축적된 데이터를 근거로 행사마다 셀러 구성을 조정합니다.
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
