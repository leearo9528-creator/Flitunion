"use client";

import FadeInSection from "./FadeInSection";

const services = [
  {
    slug: "flea-market",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    subtitle: "핵심 서비스",
    title: "플리마켓 운영 대행",
    desc: "유휴공간, 대학교 축제, 카페 홀 등 어떤 공간이든 플리마켓으로 전환합니다. 공간 분석 → 레이아웃 설계 → 셀러 모집 → 현장 운영까지 전 과정을 원스톱으로 책임집니다.",
    tags: ["대학 축제", "유휴공간", "카페 이벤트", "야외 광장"],
    highlight: "Flit 기반 검증 셀러로 퀄리티 보장",
  },
  {
    slug: "night-market",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    subtitle: "야간 행사 특화",
    title: "야시장 & 푸드 마켓 운영",
    desc: "저녁부터 밤까지 이어지는 야시장 행사를 전문적으로 기획합니다. 푸드트럭, 핸드메이드 셀러, 공연팀을 결합한 복합 야간 마켓으로 강력한 집객 효과를 만듭니다.",
    tags: ["야시장 기획", "야간 조명 설치", "공연 연계", "복합 행사"],
    highlight: "야간 행사 안전 관리 전담 시스템 운영",
  },
  {
    slug: "food-truck",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    subtitle: "푸드트럭 전문 연결",
    title: "푸드트럭 섭외 & 운영",
    desc: "행사 콘셉트에 맞는 푸드트럭을 직접 섭외하고 현장 배치까지 관리합니다. 한식, 디저트, 글로벌 푸드 등 다양한 카테고리의 검증된 푸드트럭 DB를 보유하고 있습니다.",
    tags: ["푸드트럭 섭외", "카테고리 다양화", "현장 배치 관리", "전기·용수 협의"],
    highlight: "보유 푸드트럭 DB 100대 이상",
  },
  {
    slug: "rental",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    subtitle: "원스톱 장비 지원",
    title: "행사 물품 렌탈",
    desc: "마켓 운영에 필요한 모든 장비를 렌탈로 제공합니다. 부스 텐트·테이블·의자부터 조명, 배너, 간판까지 — 별도 구매 없이 행사에 맞게 구성해 드립니다.",
    tags: ["텐트·테이블·의자", "조명 장비", "배너·간판", "전기 설비"],
    highlight: "렌탈 패키지 이용 시 운영비 할인",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20" style={{ background: "#f8fafc" }} aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeInSection className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
            Services
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            플리마켓부터 야시장까지
            <br />
            공간 행사 전 영역 원스톱 서비스
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            셀러 모집, 푸드트럭 섭외, 장비 렌탈까지. 플릿 유니온 하나로 끝납니다.
          </p>
        </FadeInSection>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <FadeInSection key={index} delay={index * 100}>
              <article
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all hover:-translate-y-1 h-full"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 transition-colors"
                  style={{ background: "#eff6ff", color: "#3182f6" }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: "#3182f6" }}>
                  {service.subtitle}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.desc}</p>

                {/* Tags */}
                <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="서비스 특징">
                  {service.tags.map((tag) => (
                    <li key={tag} className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Highlight */}
                <div className="flex items-center gap-2 text-sm font-semibold rounded-xl px-4 py-2.5 mb-4"
                  style={{ background: "#eff6ff", color: "#3182f6", border: "1px solid #bfdbfe" }}
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {service.highlight}
                </div>

                {/* Detail link */}
                <a
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: "#3182f6" }}
                >
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </article>
            </FadeInSection>
          ))}
        </div>

        {/* All-in-one Banner */}
        <FadeInSection className="mt-8">
          <div className="rounded-2xl p-7" style={{ background: "#191f28" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-black text-white mb-1">행사 준비의 모든 것, 한 곳에서</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  셀러 모집 · 푸드트럭 섭외 · 장비 렌탈 · 현장 운영 · 결과 정산까지 플릿 유니온 단독으로 진행 가능합니다.
                </p>
              </div>
              <a
                href="#contact"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl text-sm btn-primary"
              >
                통합 견적 문의
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}
