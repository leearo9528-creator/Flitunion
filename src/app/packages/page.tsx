import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import { packages } from "@/data/packages";

export const metadata: Metadata = {
  title: "행사 유형별 패키지 | 플릿 유니온(Flit Union) 행사 대행",
  description:
    "대학 축제, 아파트 야시장, 지자체 축제 부스, 기업 행사. 행사 유형을 선택하시면 셀러 구성·푸드트럭·장비·운영 인력이 함께 제안됩니다. 유형별 운영 유의사항까지 공개합니다.",
  alternates: { canonical: "https://flitunion.com/packages" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com/packages",
    siteName: "플릿 유니온(Flit Union)",
    title: "행사 유형별 패키지 | 플릿 유니온(Flit Union) 행사 대행",
    description: "행사 유형을 선택하시면 셀러 구성·푸드트럭·장비·운영 인력이 함께 제안됩니다.",
  },
};

export default function PackagesPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Packages"
          breadcrumb="행사 유형별 패키지"
          title={
            <>
              행사 유형을 선택하시면
              <br className="hidden sm:block" /> 필요한 구성이 함께 제안됩니다
            </>
          }
          description="필요한 구성을 처음부터 검토하지 않으셔도 됩니다. 유형별로 셀러 구성, 푸드트럭 라인업, 장비, 운영 인력을 미리 편성해 두었습니다. 불필요한 항목은 제외하고 조정하실 수 있습니다."
        />

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {packages.map((pkg, i) => (
                <FadeInSection key={pkg.slug} delay={i * 80}>
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="group block h-full rounded-2xl overflow-hidden border border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg transition-all"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    <div className="px-6 py-7 text-white" style={{ background: pkg.gradient }}>
                      <span className="text-3xl" aria-hidden="true">{pkg.icon}</span>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] mt-3 mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {pkg.subtitle}
                      </p>
                      <h2 className="text-xl font-black">{pkg.title}</h2>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-gray-600 leading-relaxed mb-5 break-keep">{pkg.summary}</p>

                      <dl className="space-y-2 mb-5 text-sm">
                        <div className="flex gap-3">
                          <dt className="shrink-0 w-16 text-xs font-bold text-gray-400 pt-0.5">의뢰 주체</dt>
                          <dd className="text-gray-700 break-keep">{pkg.client}</dd>
                        </div>
                        <div className="flex gap-3">
                          <dt className="shrink-0 w-16 text-xs font-bold text-gray-400 pt-0.5">구성</dt>
                          <dd className="text-gray-700">
                            셀러 {pkg.sellerSlugs.length}종 · 푸드트럭 {pkg.foodtruckSlugs.length}종 · 서비스{" "}
                            {pkg.serviceSlugs.length}개
                          </dd>
                        </div>
                      </dl>

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5" style={{ color: "#3182f6" }}>
                        패키지 구성 보기 →
                      </span>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection className="mt-8">
              <div className="rounded-2xl px-6 py-5" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                <p className="text-sm text-gray-700 leading-relaxed break-keep">
                  <strong className="font-bold text-gray-900">목록에 없는 형태도 가능합니다.</strong> 패키지는 자주 의뢰받는
                  구성을 정리한 것으로 고정 상품이 아닙니다. 행사 성격을 알려주시면 맞춤 구성해 드립니다.
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
