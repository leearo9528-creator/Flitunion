import Link from "next/link";
import FadeInSection from "./FadeInSection";
import { packages } from "@/data/packages";
import { sellerItems, foodtruckItems } from "@/data/catalog";

/**
 * 서비스 섹션이 '무엇을 파는가' 라면 이 섹션은 '우리 행사엔 뭐가 필요한가' 에 답한다.
 * 데이터는 packages.ts · catalog.ts 정본에서 파생 — 개수를 손으로 적지 않는다.
 */
export default function PackagesSection() {
  return (
    <section id="packages" className="py-20 bg-white" aria-labelledby="packages-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeInSection className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
            Packages
          </span>
          <h2 id="packages-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            우리 행사엔 뭐가 필요한지
            <br />
            처음부터 따져보지 않으셔도 됩니다
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            행사 유형만 고르시면 셀러 구성·푸드트럭·장비·운영 인력이 묶여 나옵니다.
          </p>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {packages.map((pkg, i) => (
            <FadeInSection key={pkg.slug} delay={i * 70}>
              <Link
                href={`/packages/${pkg.slug}`}
                className="group block h-full rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="px-5 py-6 text-white" style={{ background: pkg.gradient }}>
                  <span className="text-2xl" aria-hidden="true">{pkg.icon}</span>
                  <h3 className="text-base font-black mt-2.5">{pkg.title}</h3>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>{pkg.subtitle}</p>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">{pkg.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2" style={{ color: "#3182f6" }}>
                    구성 보기 →
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>

        {/* 카탈로그 진입점 */}
        <FadeInSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/sellers"
              className="group flex items-center justify-between gap-4 rounded-2xl px-6 py-5 border transition-all hover:shadow-lg"
              style={{ background: "#f8fafc", borderColor: "#e5e7eb" }}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: "#3182f6" }}>
                  Seller Catalog
                </p>
                <h3 className="text-base font-bold text-gray-900 mb-1">셀러 품목 {sellerItems.length}종</h3>
                <p className="text-sm text-gray-600 break-keep">어떤 셀러가 오는지 품목별로 미리 확인하세요</p>
              </div>
              <span className="shrink-0 text-2xl transition-transform group-hover:translate-x-1" style={{ color: "#3182f6" }} aria-hidden="true">→</span>
            </Link>

            <Link
              href="/foodtruck"
              className="group flex items-center justify-between gap-4 rounded-2xl px-6 py-5 border transition-all hover:shadow-lg"
              style={{ background: "#f8fafc", borderColor: "#e5e7eb" }}
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: "#3182f6" }}>
                  Foodtruck Menu
                </p>
                <h3 className="text-base font-bold text-gray-900 mb-1">푸드트럭 메뉴 {foodtruckItems.length}종</h3>
                <p className="text-sm text-gray-600 break-keep">메뉴가 겹치지 않는 라인업으로 구성합니다</p>
              </div>
              <span className="shrink-0 text-2xl transition-transform group-hover:translate-x-1" style={{ color: "#3182f6" }} aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}
