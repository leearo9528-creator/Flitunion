import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import { IconBadge } from "@/components/Icon";
import { services } from "@/data/services";
import {
  companyInfo,
  keyStats,
  vision,
  principles,
  problems,
  comparison,
  processSteps,
  processNotes,
  partners,
  contractTerms,
} from "@/data/company";

export const metadata: Metadata = {
  title: "회사 소개 | 플릿 유니온(Flit Union) 행사 대행",
  description:
    "플릿 유니온은 검증된 셀러 네트워크를 기반으로 행사 기획부터 현장 운영, 정산까지 대행하는 행사 대행 전문 기업입니다. 회사 개요, 비전, 운영 프로세스, 계약 안내를 확인하실 수 있습니다.",
  alternates: { canonical: "https://flitunion.com/about" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com/about",
    siteName: "플릿 유니온(Flit Union)",
    title: "회사 소개 | 플릿 유니온(Flit Union) 행사 대행",
    description:
      "검증된 셀러 네트워크 기반 행사 대행 전문 기업. 회사 개요, 비전, 차별점, 운영 프로세스, 계약 안내.",
  },
};

const sections = [
  { id: "overview", label: "회사 개요" },
  { id: "vision", label: "비전과 미션" },
  { id: "problem", label: "과제와 해법" },
  { id: "business", label: "사업 영역" },
  { id: "why", label: "플릿의 차별점" },
  { id: "process", label: "운영 프로세스" },
  { id: "partners", label: "협업 대상" },
  { id: "terms", label: "계약 안내" },
];

function SectionHeading({ index, en, ko, desc }: { index: string; en: string; ko: string; desc: string }) {
  return (
    <div className="mb-10">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
        {index} · {en}
      </span>
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">{ko}</h2>
      <p className="text-gray-600 leading-relaxed max-w-2xl">{desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Company Profile"
          breadcrumb="회사 소개"
          title={
            <>
              행사 운영 전 과정을 위임하는
              <br className="hidden sm:block" /> 가장 확실한 방법
            </>
          }
          description="플릿 유니온은 검증된 셀러 네트워크를 기반으로 행사 기획부터 셀러 섭외, 장비, 현장 운영, 정산까지 대행하는 행사 대행 전문 기업입니다."
        >
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-4 py-4"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <p className="text-2xl sm:text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: "#bfdbfe" }}>{stat.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8ba3c7" }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </PageHero>

        {/* In-page nav */}
        <nav
          aria-label="회사 소개 목차"
          className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-100"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ul className="flex gap-1 overflow-x-auto py-2.5 -mx-1 px-1">
              {sections.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    className="block px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* 01 회사 개요 */}
        <section id="overview" className="py-20 scroll-mt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="01"
                en="Company Overview"
                ko="회사 개요"
                desc="플릿 유니온은 행사 주최자와 공간 소유자를 위한 행사 운영 전문 기업입니다."
              />
            </FadeInSection>

            <FadeInSection>
              <dl className="grid sm:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ background: "#e5e7eb" }}>
                {companyInfo.map((row) => (
                  <div key={row.label} className="bg-white px-5 py-4">
                    <dt className="text-xs font-bold text-gray-500 mb-1.5">{row.label}</dt>
                    <dd className="text-sm font-semibold text-gray-900 break-keep">
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.href.startsWith("http") ? "_blank" : undefined}
                          rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="transition-colors hover:underline"
                          style={{ color: "#3182f6" }}
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeInSection>
          </div>
        </section>

        {/* 02 비전과 미션 */}
        <section id="vision" className="py-20 scroll-mt-32" style={{ background: "#f8fafc" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="02"
                en="Vision & Mission"
                ko="비전과 미션"
                desc="플릿 유니온이 지향하는 가치입니다."
              />
            </FadeInSection>

            <FadeInSection>
              <div
                className="rounded-2xl p-8 sm:p-10 mb-5 text-white"
                style={{ background: "linear-gradient(135deg, #0a1e3d 0%, #1b64da 100%)" }}
              >
                <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#93c5fd" }}>
                  Vision
                </span>
                <p className="text-xl sm:text-2xl font-black leading-snug mb-4 whitespace-pre-line">{vision.headline}</p>
                <p className="leading-relaxed max-w-3xl" style={{ color: "#c7d5ea" }}>{vision.body}</p>
              </div>
            </FadeInSection>

            <div className="grid sm:grid-cols-3 gap-5">
              {principles.map((p, i) => (
                <FadeInSection key={p.en} delay={i * 90}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "#3182f6" }}>
                      {p.en}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{p.ko}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 03 과제와 해법 */}
        <section id="problem" className="py-20 scroll-mt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="03"
                en="Problem & Solution"
                ko="고객의 과제와 플릿의 해법"
                desc="행사를 준비하는 담당자들이 실제로 겪는 문제를 플릿 유니온이 해결합니다."
              />
            </FadeInSection>

            <div className="space-y-4">
              {problems.map((p, i) => (
                <FadeInSection key={p.target} delay={i * 80}>
                  <div className="rounded-2xl border border-gray-100 overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div className="grid md:grid-cols-2">
                      <div className="p-6" style={{ background: "#f8fafc" }}>
                        <span
                          className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                          style={{ background: "#e5e7eb", color: "#4b5563" }}
                        >
                          {p.target}
                        </span>
                        <p className="text-base font-bold text-gray-900 leading-relaxed break-keep">“{p.question}”</p>
                      </div>
                      <div className="p-6 bg-white">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: "#3182f6" }}>
                          플릿의 해법
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.solution}</p>
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 04 사업 영역 */}
        <section id="business" className="py-20 scroll-mt-32" style={{ background: "#f8fafc" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="04"
                en="Business Areas"
                ko="사업 영역"
                desc="행사에 필요한 영역을 개별 또는 패키지로 제공합니다. 필요한 부분만 의뢰하실 수도 있습니다."
              />
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <FadeInSection key={s.slug} delay={i * 70}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all h-full"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <IconBadge path={s.iconPath} size="sm" />
                      <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "#3182f6" }}>
                        {s.subtitle}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 break-keep">{s.description}</p>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:gap-2"
                      style={{ color: "#3182f6" }}
                    >
                      자세히 보기 →
                    </span>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 05 차별점 */}
        <section id="why" className="py-20 scroll-mt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="05"
                en="Why Flit Union"
                ko="플릿의 차별점"
                desc="직접 운영하는 셀러 플랫폼 '플릿(Flit)'의 데이터가 행사의 품질을 보증합니다."
              />
            </FadeInSection>

            <FadeInSection>
              <div className="rounded-2xl p-7 mb-5" style={{ background: "#0d1117" }}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-black"
                        style={{ background: "#3182f6" }}
                        aria-hidden="true"
                      >
                        F
                      </span>
                      <h3 className="text-lg font-black text-white">플릿(Flit) 셀러 플랫폼</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "#9ca3af" }}>
                      플리마켓·팝업 셀러가 행사 정보를 찾고 참가 기록을 남기는 플랫폼입니다. 셀러의 리뷰 점수와 참가 이력,
                      매출 기록이 축적되고, 그 데이터를 근거로 행사 콘셉트에 맞는 셀러를 선발합니다. 모집 공고가 플랫폼에
                      게시되므로 별도 홍보 비용 없이 셀러가 모입니다.
                    </p>
                    <a
                      href="https://app.flitunion.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-blue-400"
                      style={{ color: "#3182f6" }}
                    >
                      app.flitunion.com →
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* 비교표 */}
            <FadeInSection>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full min-w-[640px] text-sm border-collapse">
                  <caption className="sr-only">일반 모집 방식과 플릿 유니온 운영 방식 비교</caption>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th scope="col" className="text-left font-bold text-gray-500 px-5 py-3.5 w-32 border-b border-gray-200">
                        구분
                      </th>
                      <th scope="col" className="text-left font-bold text-gray-500 px-5 py-3.5 border-b border-gray-200">
                        일반 모집 방식
                      </th>
                      <th
                        scope="col"
                        className="text-left font-black px-5 py-3.5 border-b"
                        style={{ color: "#1b64da", background: "#eff6ff", borderColor: "#bfdbfe" }}
                      >
                        플릿 유니온
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.axis} className="align-top">
                        <th scope="row" className="text-left font-bold text-gray-900 px-5 py-4 border-b border-gray-100 whitespace-nowrap">
                          {row.axis}
                        </th>
                        <td className="text-gray-500 px-5 py-4 border-b border-gray-100 leading-relaxed break-keep">
                          {row.general}
                        </td>
                        <td
                          className="font-medium px-5 py-4 border-b leading-relaxed break-keep"
                          style={{ color: "#1f2937", background: "#f5f9ff", borderColor: "#dbeafe" }}
                        >
                          {row.flit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* 06 운영 프로세스 */}
        <section id="process" className="py-20 scroll-mt-32" style={{ background: "#f8fafc" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="06"
                en="Process"
                ko="운영 프로세스"
                desc="상담부터 결과 보고까지 다섯 단계로 진행됩니다."
              />
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {processSteps.map((step, i) => (
                <FadeInSection key={step.step} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 h-full" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <span
                      className="inline-block text-xs font-black px-2.5 py-1 rounded-full mb-3"
                      style={{ background: "#eff6ff", color: "#3182f6" }}
                    >
                      {step.step}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 break-keep">{step.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed break-keep">{step.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection>
              <ul className="space-y-2">
                {processNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#3182f6" }} aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="break-keep">{note}</span>
                  </li>
                ))}
              </ul>
            </FadeInSection>
          </div>
        </section>

        {/* 07 협업 대상 */}
        <section id="partners" className="py-20 scroll-mt-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="07"
                en="Partners"
                ko="협업 대상"
                desc="공간과 행사 수요를 가진 모든 기관·기업과 협업합니다."
              />
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {partners.map((p, i) => (
                <FadeInSection key={p.title} delay={i * 70}>
                  <div className="rounded-2xl p-6 border border-gray-100 h-full" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection>
              <div className="rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                <p className="text-sm text-gray-700 leading-relaxed break-keep">
                  <strong className="font-bold text-gray-900">셀러 파트너</strong> · 플릿 유니온의 행사에 참여하고자 하는
                  셀러·푸드트럭은 플릿 플랫폼을 통해 상시 지원하실 수 있습니다.
                </p>
                <a
                  href="https://app.flitunion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
                  style={{ color: "#1b64da" }}
                >
                  셀러 지원하기 →
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* 08 계약 안내 */}
        <section id="terms" className="py-20 scroll-mt-32" style={{ background: "#f8fafc" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <SectionHeading
                index="08"
                en="Partnership Guide"
                ko="계약 및 운영 안내"
                desc="협업 시 기준이 되는 주요 조건을 안내드립니다."
              />
            </FadeInSection>

            <div className="grid sm:grid-cols-2 gap-4">
              {contractTerms.map((t, i) => (
                <FadeInSection key={t.title} delay={i * 60}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{t.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{t.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div
                className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center text-white"
                style={{ background: "linear-gradient(135deg, #050e1f 0%, #0a1e3d 50%, #0c2553 100%)" }}
              >
                <div
                  className="absolute -top-24 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(49,130,246,0.2) 0%, transparent 70%)" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-4">
                    행사의 가능성을 플릿 유니온과
                    <br className="hidden sm:block" /> 함께 열어 보시기 바랍니다.
                  </h2>
                  <p className="leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#c7d5ea" }}>
                    무료 상담을 통해 행사에 최적화된 운영 형태와 예상 수익 구조를 제안해 드립니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl btn-primary"
                    >
                      무료 상담 신청
                    </Link>
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold rounded-xl transition-colors"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
                    >
                      진행 이력 보기
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
