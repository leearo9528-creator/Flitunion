import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import CatalogGrid from "@/components/CatalogGrid";
import { foodtruckItems } from "@/data/catalog";

export const metadata: Metadata = {
  title: "푸드트럭 메뉴 카탈로그 24종 | 플릿 유니온(Flit Union)",
  description:
    "행사 섭외 가능한 푸드트럭 메뉴 24종. 곱창·떡튀순·닭강정·화덕피자·케밥·스테이크부터 크레페·츄러스·빙수·스페셜티 커피까지. 메뉴별 객단가와 회전 특성을 공개합니다.",
  alternates: { canonical: "https://flitunion.com/foodtruck" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com/foodtruck",
    siteName: "플릿 유니온(Flit Union)",
    title: "푸드트럭 메뉴 카탈로그 24종 | 플릿 유니온(Flit Union)",
    description: "행사 섭외 가능한 푸드트럭 메뉴 24종. 메뉴별 객단가와 회전 특성을 공개합니다.",
  },
};

export default function FoodtruckPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Foodtruck Menu"
          breadcrumb="푸드트럭 메뉴"
          title={
            <>
              메뉴가 중복되지 않도록
              <br className="hidden sm:block" /> 라인업을 구성합니다
            </>
          }
          description="행사 섭외가 가능한 푸드트럭 메뉴입니다. 동일 메뉴가 두 대 배치되면 양쪽 모두 매출이 감소합니다. 객단가와 회전 속도를 안배하여 대기열이 한쪽으로 몰리지 않도록 구성합니다."
        >
          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-xl px-5 py-3" style={{ background: "rgba(49,130,246,0.18)", border: "1px solid rgba(49,130,246,0.4)" }}>
              <span className="text-2xl font-black text-white">{foodtruckItems.length}종</span>
              <span className="text-sm ml-2" style={{ color: "#bfdbfe" }}>섭외 가능 메뉴</span>
            </div>
            <div className="rounded-xl px-5 py-3" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
              <span className="text-2xl font-black text-white">1대</span>
              <span className="text-sm ml-2" style={{ color: "#c7d5ea" }}>부터 단독 섭외</span>
            </div>
          </div>
        </PageHero>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mb-8">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { t: "메뉴 중복 없이", d: "동일 카테고리가 중복되지 않도록 라인업을 구성합니다. 저단가 회전형과 객단가가 높은 메인 메뉴를 안배합니다." },
                  { t: "전기·용수 사전 조율", d: "현장 전기 용량과 용수 여건을 사전에 확인하고 트럭별 필요 설비를 조율합니다." },
                  { t: "예비 트럭 대기", d: "행사별로 예비 푸드트럭 1~2대를 대기시켜 당일 불참이 발생하더라도 즉시 대체합니다." },
                ].map((c) => (
                  <div key={c.t} className="rounded-2xl p-5 border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <h2 className="text-sm font-bold text-gray-900 mb-1.5">{c.t}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{c.d}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>

            <FadeInSection>
              <CatalogGrid
                index
                items={foodtruckItems.map((i) => ({ slug: i.slug, title: i.title, desc: i.desc, photo: i.photo }))}
              />
            </FadeInSection>

            <FadeInSection className="mt-8">
              <p className="text-xs text-gray-500 leading-relaxed break-keep">
                메뉴 구성과 가격대는 트럭별·시즌별로 달라질 수 있습니다. 주류 판매 가능 여부는 장소마다 다르므로 섭외
                전에 확인합니다. 확정된 트럭의 실제 메뉴 사진과 부스 외관은 상담 시 별도로 안내드립니다.
              </p>
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
                    적정 운영 대수부터 안내해 드립니다
                  </h2>
                  <p className="leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#c7d5ea" }}>
                    예상 방문자 수와 공간 조건을 알려주시면 운영 대수와 메뉴 조합을 제안해 드립니다. 마켓 운영 없이 푸드트럭
                    섭외만 단독으로 진행하실 수도 있습니다.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-bold rounded-xl btn-primary">
                      섭외 문의하기
                    </Link>
                    <Link
                      href="/services/food-truck"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-bold rounded-xl transition-colors"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}
                    >
                      섭외 진행 방식 보기
                    </Link>
                  </div>
                  <p className="text-sm mt-6" style={{ color: "#8ba3c7" }}>
                    푸드트럭을 운영 중이시라면{" "}
                    <Link href="/partners" className="font-semibold underline hover:text-white">
                      협력사 등록
                    </Link>
                    을 해 두시기 바랍니다. 조건이 맞는 행사가 있을 때 우선 연락드립니다.
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
