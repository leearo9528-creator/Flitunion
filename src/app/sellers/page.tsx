import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import CatalogGrid from "@/components/CatalogGrid";
import { sellerItems, SELLER_PHOTO_NOTICE } from "@/data/catalog";

export const metadata: Metadata = {
  title: "셀러 품목 카탈로그 27종 | 플릿 유니온(Flit Union)",
  description:
    "플릿 유니온이 행사에 배치할 수 있는 플리마켓 셀러 품목 27종. 디저트·잡화·핸드메이드 공방·플라워·타로·반려동물·캐리커처·터프팅까지 품목별 보유 셀러 수와 운영 특성을 공개합니다.",
  alternates: { canonical: "https://flitunion.com/sellers" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com/sellers",
    siteName: "플릿 유니온(Flit Union)",
    title: "셀러 품목 카탈로그 27종 | 플릿 유니온(Flit Union)",
    description:
      "플리마켓 셀러 품목 27종. 품목별 보유 셀러 수와 현장 운영 특성을 공개합니다.",
  },
};

export default function SellersPage() {
  const total = sellerItems.reduce((sum, i) => sum + (parseInt(i.sellerCount, 10) || 0), 0);

  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Seller Catalog"
          breadcrumb="셀러 품목"
          title={
            <>
              어떤 셀러가 오는지
              <br className="hidden sm:block" /> 미리 보고 정하세요
            </>
          }
          description="플릿 유니온이 행사에 배치할 수 있는 플리마켓 셀러 품목입니다. 보유 셀러가 많은 순으로 정리했고, 품목마다 현장에서 어떻게 작동하는지 함께 적었습니다."
        >
          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-xl px-5 py-3" style={{ background: "rgba(49,130,246,0.18)", border: "1px solid rgba(49,130,246,0.4)" }}>
              <span className="text-2xl font-black text-white">{sellerItems.length}종</span>
              <span className="text-sm ml-2" style={{ color: "#bfdbfe" }}>셀러 품목</span>
            </div>
            <div className="rounded-xl px-5 py-3" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <span className="text-2xl font-black text-white">{total}곳</span>
              <span className="text-sm ml-2" style={{ color: "#c7d5ea" }}>보유 셀러 합계</span>
            </div>
          </div>
        </PageHero>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mb-8">
              <div className="rounded-2xl px-6 py-5" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                <p className="text-sm text-gray-700 leading-relaxed break-keep">
                  <strong className="font-bold text-gray-900">행사 성격에 맞춰 조합합니다.</strong> 모든 품목을 한 행사에
                  전부 넣지는 않습니다. 방문자 구성과 공간 규모를 보고 카테고리가 겹치지 않게 선별해 배치하며, 포화
                  품목은 행사당 수를 제한합니다.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <CatalogGrid
                index
                items={sellerItems.map((i) => ({
                  slug: i.slug,
                  title: i.title,
                  desc: i.desc,
                  photo: i.photo,
                  badge: i.sellerCount,
                }))}
              />
            </FadeInSection>

            {/* 사진 고지 — docs/photos/seller-items/README.md 의 요구사항. 지우지 말 것 */}
            <FadeInSection className="mt-8">
              <p className="text-xs text-gray-500 leading-relaxed break-keep">{SELLER_PHOTO_NOTICE}</p>
            </FadeInSection>
          </div>
        </section>

        <section className="pb-20">
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
                    우리 행사에는 어떤 구성이 맞을까요?
                  </h2>
                  <p className="leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#c7d5ea" }}>
                    행사 성격과 예상 방문자를 알려주시면 품목 구성안을 만들어 드립니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl btn-primary">
                      무료 상담 신청
                    </Link>
                    <Link
                      href="/packages"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold rounded-xl transition-colors"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
                    >
                      행사 유형별 패키지
                    </Link>
                  </div>
                  <p className="text-sm mt-6" style={{ color: "#8ba3c7" }}>
                    셀러로 참여하고 싶으시다면{" "}
                    <a href="https://app.flitunion.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-white">
                      플릿 플랫폼
                    </a>
                    에서 상시 지원하실 수 있습니다.
                  </p>
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
