"use client";

import Link from "next/link";
import FadeInSection from "./FadeInSection";
import Icon, { ICONS } from "./Icon";
import { flagshipService, standardServices } from "@/data/services";

/** 서비스 정의는 src/data/services.ts 가 정본 — 이 파일에 목록을 다시 두지 말 것 */

const ArrowIcon = () => <Icon path={ICONS.arrowRight} className="w-4 h-4" strokeWidth={2} />;

export default function ServicesSection() {
  const oddTail = standardServices.length % 2 === 1;

  return (
    <section id="services" className="py-20" style={{ background: "#f8fafc" }} aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeInSection className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
            Services
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            행사 운영의 전 과정을
            <br />
            하나의 창구에서 진행합니다
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            기획, 셀러 섭외, 장비, 현장 운영, 정산까지 제공하며 필요한 영역만 개별로 의뢰하실 수도 있습니다.
          </p>
        </FadeInSection>

        {/* Flagship — 행사 기획·운영 대행 */}
        <FadeInSection className="mb-5">
          <article
            className="relative overflow-hidden rounded-2xl p-7 sm:p-9 text-white"
            style={{ background: "linear-gradient(135deg, #0a1e3d 0%, #143a72 55%, #1b64da 100%)" }}
          >
            <div
              className="absolute -top-20 -right-16 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(49,130,246,0.35) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                    style={{ background: "rgba(255,255,255,0.14)", color: "#ffffff" }}
                  >
                    <Icon path={flagshipService.iconPath} />
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(49,130,246,0.25)", border: "1px solid rgba(147,197,253,0.5)", color: "#bfdbfe" }}
                  >
                    {flagshipService.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-3">{flagshipService.title}</h3>
                <p className="text-blue-100 leading-relaxed mb-5 max-w-2xl">{flagshipService.description}</p>

                <ul className="flex flex-wrap gap-1.5 mb-6" aria-label="대응 가능한 행사 유형">
                  {flagshipService.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "#dbeafe" }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${flagshipService.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white transition-colors hover:bg-blue-50"
                  style={{ color: "#1b64da" }}
                >
                  대행 범위 자세히 보기
                  <ArrowIcon />
                </Link>
              </div>

              {/* Stats */}
              <div className="lg:w-64 shrink-0 grid grid-cols-3 lg:grid-cols-1 gap-3">
                {flagshipService.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl px-4 py-3 text-center lg:text-left"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
                  >
                    <p className="text-xl sm:text-2xl font-black">{stat.value}</p>
                    <p className="text-xs text-blue-200 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </FadeInSection>

        {/* Standard services */}
        <div className="grid md:grid-cols-2 gap-5">
          {standardServices.map((service, index) => {
            const isLastOdd = oddTail && index === standardServices.length - 1;
            return (
              <FadeInSection key={service.slug} delay={index * 80} className={isLastOdd ? "md:col-span-2" : undefined}>
                <article
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all hover:-translate-y-1 h-full"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 transition-colors"
                    style={{ background: "#eff6ff", color: "#3182f6" }}
                  >
                    <Icon path={service.iconPath} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: "#3182f6" }}>
                    {service.subtitle}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="서비스 특징">
                    {service.tags.map((tag) => (
                      <li key={tag} className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="flex items-center gap-2 text-sm font-semibold rounded-xl px-4 py-2.5 mb-4"
                    style={{ background: "#eff6ff", color: "#3182f6", border: "1px solid #bfdbfe" }}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {service.highlight}
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                    style={{ color: "#3182f6" }}
                  >
                    자세히 보기
                    <ArrowIcon />
                  </Link>
                </article>
              </FadeInSection>
            );
          })}
        </div>

        {/* All-in-one Banner */}
        <FadeInSection className="mt-8">
          <div className="rounded-2xl p-7" style={{ background: "#191f28" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-black text-white mb-1">행사 준비의 모든 것, 한 곳에서</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  기획 · 셀러 모집 · 푸드트럭 섭외 · 장비 렌탈 · 현장 운영 · 결과 정산까지 플릿 유니온 단독으로 진행 가능합니다.
                </p>
              </div>
              <a
                href="#contact"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl text-sm btn-primary"
              >
                통합 견적 문의
                <ArrowIcon />
              </a>
            </div>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}
