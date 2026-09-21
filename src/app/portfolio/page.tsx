import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "진행 이력 | 플릿 유니온(Flit Union) 행사 대행",
  description:
    "대학교 축제, 아파트 단지, 지자체 대형 축제까지 플릿 유니온이 직접 기획·운영한 행사 사례입니다. 기획 배경부터 운영 방식, 셀러 구성, 성과까지 공개합니다.",
  alternates: { canonical: "https://flitunion.com/portfolio" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com/portfolio",
    siteName: "플릿 유니온(Flit Union)",
    title: "진행 이력 | 플릿 유니온(Flit Union) 행사 대행",
    description:
      "대학교 축제, 아파트 단지, 지자체 대형 축제까지. 플릿 유니온이 직접 운영한 행사 사례를 기획 배경부터 성과까지 공개합니다.",
  },
};

/** 태그별 건수 요약 (데이터에서 파생 — 숫자를 손으로 적지 않는다) */
function tagSummary() {
  const counts = new Map<string, number>();
  for (const item of portfolioItems) {
    counts.set(item.tag, (counts.get(item.tag) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export default function PortfolioPage() {
  const summary = tagSummary();
  const regions = new Set(portfolioItems.map((i) => i.location.split(" ")[0]));

  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Portfolio"
          breadcrumb="진행 이력"
          title={
            <>
              직접 운영한 행사만
              <br className="hidden sm:block" /> 기록하고 있습니다
            </>
          }
          description="대학교 축제, 아파트 단지, 지자체 대형 축제까지. 기획 배경부터 운영 방식, 셀러 구성, 성과까지 공개합니다."
        >
          <div className="mt-10 flex flex-wrap gap-3">
            <div
              className="rounded-xl px-5 py-3"
              style={{ background: "rgba(49,130,246,0.18)", border: "1px solid rgba(49,130,246,0.4)" }}
            >
              <span className="text-2xl font-black text-white">{portfolioItems.length}건</span>
              <span className="text-sm ml-2" style={{ color: "#bfdbfe" }}>대표 운영 사례</span>
            </div>
            <div
              className="rounded-xl px-5 py-3"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <span className="text-2xl font-black text-white">{regions.size}개</span>
              <span className="text-sm ml-2" style={{ color: "#c7d5ea" }}>운영 지역</span>
            </div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="행사 유형별 건수">
            {summary.map(([tag, count]) => (
              <li
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)", color: "#dbeafe" }}
              >
                {tag} {count}
              </li>
            ))}
          </ul>
        </PageHero>

        {/* Cases */}
        <section className="py-16 sm:py-20" aria-label="운영 사례 목록">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {portfolioItems.map((item, index) => (
              <FadeInSection key={item.id} delay={Math.min(index, 3) * 70}>
                <article
                  id={item.id}
                  className="scroll-mt-24 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <div className="grid lg:grid-cols-[320px_1fr]">
                    {/* Thumbnail */}
                    <div
                      className="relative w-full h-48 lg:h-full min-h-[200px] overflow-hidden"
                      style={{ background: item.placeholderGradient }}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 320px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col justify-between p-5" aria-hidden="true">
                          <span
                            className="self-start text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(255,255,255,0.22)", color: "#ffffff" }}
                          >
                            {item.tag}
                          </span>
                          <span className="text-white/70 text-xs font-medium">{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.tagClass}`}>{item.tag}</span>
                        <span className="text-xs font-medium text-gray-500">{item.location}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 break-keep">{item.title}</h2>
                      <p className="text-gray-600 leading-relaxed mb-6 break-keep">{item.fullDesc}</p>

                      {/* Stats */}
                      <dl className="flex flex-wrap gap-2 mb-6">
                        {item.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-xl px-4 py-2.5"
                            style={{ background: "#f8fafc", border: "1px solid #e5e7eb" }}
                          >
                            <dt className="text-xs text-gray-500 mb-0.5">{stat.label}</dt>
                            <dd className="text-sm font-bold text-gray-900">{stat.value}</dd>
                          </div>
                        ))}
                      </dl>

                      {/* Details */}
                      <div className="grid sm:grid-cols-2 gap-px rounded-xl overflow-hidden" style={{ background: "#e5e7eb" }}>
                        {item.details.map((detail) => (
                          <div key={detail.title} className="bg-white px-5 py-4">
                            <h3 className="text-xs font-bold uppercase tracking-[0.1em] mb-2" style={{ color: "#3182f6" }}>
                              {detail.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed break-keep">{detail.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* Note + CTA */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 break-keep">
                의뢰 기관과의 협의에 따라 기관명은 지역·유형으로만 표기합니다. 구체적인 행사명과 상세 성과 자료는 상담 시
                안내드립니다.
              </p>
            </FadeInSection>

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
                    준비하시는 행사도
                    <br className="hidden sm:block" /> 같은 방식으로 운영해 드립니다.
                  </h2>
                  <p className="leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#c7d5ea" }}>
                    행사 성격과 공간 조건을 알려주시면 유사 사례를 기준으로 운영 형태와 예상 규모를 제안해 드립니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl btn-primary"
                    >
                      무료 상담 신청
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold rounded-xl transition-colors"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
                    >
                      회사 소개 보기
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
