import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import CatalogGrid from "@/components/CatalogGrid";
import { packages, packageBySlug } from "@/data/packages";
import { services } from "@/data/services";
import { sellerItems, foodtruckItems, SELLER_PHOTO_NOTICE } from "@/data/catalog";
import { portfolioItems } from "@/data/portfolio";
import { IconBadge } from "@/components/Icon";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

// ⚠️ Next 16 에서 params 는 Promise — 동기로 읽으면 조용히 404 가 구워진다
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) return {};
  return {
    title: `${pkg.title} | 플릿 유니온(Flit Union) 행사 대행`,
    description: pkg.heroDesc.slice(0, 155),
    alternates: { canonical: `https://flitunion.com/packages/${pkg.slug}` },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: `https://flitunion.com/packages/${pkg.slug}`,
      siteName: "플릿 유니온(Flit Union)",
      title: `${pkg.title} | 플릿 유니온(Flit Union) 행사 대행`,
      description: pkg.summary,
    },
  };
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>
          {desc ? <p className="text-gray-600 leading-relaxed break-keep max-w-2xl">{desc}</p> : null}
        </FadeInSection>
        {children}
      </div>
    </section>
  );
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = packageBySlug(slug);
  if (!pkg) notFound();

  const pkgServices = pkg.serviceSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const pkgSellers = pkg.sellerSlugs
    .map((s) => sellerItems.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const pkgTrucks = pkg.foodtruckSlugs
    .map((s) => foodtruckItems.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const cases = pkg.portfolioIds
    .map((id) => portfolioItems.find((x) => x.id === id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow={pkg.subtitle}
          breadcrumb={pkg.title}
          title={
            <>
              {pkg.title}
            </>
          }
          description={pkg.heroDesc}
        >
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            {[
              { v: `${pkgServices.length}개`, l: "포함 서비스" },
              { v: `${pkgSellers.length}종`, l: "추천 셀러 품목" },
              { v: `${pkgTrucks.length}종`, l: "추천 푸드트럭" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl px-5 py-4" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}>
                <p className="text-2xl font-black text-white">{s.v}</p>
                <p className="text-sm mt-0.5" style={{ color: "#bfdbfe" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </PageHero>

        {/* 포함 구성 */}
        <Section title="패키지 구성" desc="해당 유형에 기본 포함되는 항목입니다. 불필요한 항목은 제외하고 조정하실 수 있습니다.">
          <div className="grid sm:grid-cols-2 gap-4">
            {pkg.includes.map((inc, i) => (
              <FadeInSection key={inc.title} delay={i * 60}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#3182f6" }} aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1.5 break-keep">{inc.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed break-keep">{inc.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </Section>

        {/* 운영 포인트 */}
        <div style={{ background: "#f8fafc" }}>
          <Section title="해당 유형에서 유의해야 할 사항" desc="반복 운영을 통해 확인한 사항입니다. 사전에 협의해 두시면 현장에서 문제가 발생하지 않습니다.">
            <div className="space-y-3">
              {pkg.notes.map((n, i) => (
                <FadeInSection key={n.title} delay={i * 60}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5 break-keep">{n.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{n.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </Section>
        </div>

        {/* 포함 서비스 */}
        <Section title="포함 서비스">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pkgServices.map((s, i) => (
              <FadeInSection key={s.slug} delay={i * 60}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block h-full bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <IconBadge path={s.iconPath} size="sm" />
                  <h3 className="text-sm font-bold text-gray-900 mt-2 mb-1 break-keep">{s.title}</h3>
                  <span className="text-xs font-semibold" style={{ color: "#3182f6" }}>자세히 보기 →</span>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </Section>

        {/* 추천 셀러 */}
        <div style={{ background: "#f8fafc" }}>
          <Section
            title="추천 셀러 구성"
            desc="해당 유형에서 반응이 좋은 품목입니다. 전체 품목은 셀러 카탈로그에서 확인하실 수 있습니다."
          >
            <FadeInSection>
              <CatalogGrid
                items={pkgSellers.map((i) => ({ slug: i.slug, title: i.title, desc: i.desc, photo: i.photo, badge: i.sellerCount }))}
              />
            </FadeInSection>
            <FadeInSection className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/sellers" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#3182f6" }}>
                셀러 품목 27종 전체 보기 →
              </Link>
              <p className="text-xs text-gray-500 break-keep">{SELLER_PHOTO_NOTICE}</p>
            </FadeInSection>
          </Section>
        </div>

        {/* 추천 푸드트럭 */}
        <Section title="추천 푸드트럭 라인업" desc="메뉴가 중복되지 않도록 객단가와 회전 속도를 안배하여 구성합니다.">
          <FadeInSection>
            <CatalogGrid items={pkgTrucks.map((i) => ({ slug: i.slug, title: i.title, desc: i.desc, photo: i.photo }))} />
          </FadeInSection>
          <FadeInSection className="mt-6">
            <Link href="/foodtruck" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#3182f6" }}>
              푸드트럭 메뉴 24종 전체 보기 →
            </Link>
          </FadeInSection>
        </Section>

        {/* 관련 진행 이력 */}
        {cases.length > 0 ? (
          <div style={{ background: "#f8fafc" }}>
            <Section title="해당 유형의 진행 이력" desc="실제로 운영한 사례입니다.">
              <div className="grid sm:grid-cols-3 gap-4">
                {cases.map((c, i) => (
                  <FadeInSection key={c.id} delay={i * 60}>
                    <Link
                      href={`/portfolio#${c.id}`}
                      className="group block h-full rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-lg transition-all"
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                    >
                      <div className="h-28" style={{ background: c.placeholderGradient }} aria-hidden="true" />
                      <div className="p-5">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.tagClass}`}>{c.tag}</span>
                        <h3 className="text-sm font-bold text-gray-900 mt-2.5 mb-1 break-keep">{c.title}</h3>
                        <p className="text-xs text-gray-500">{c.location}</p>
                      </div>
                    </Link>
                  </FadeInSection>
                ))}
              </div>
            </Section>
          </div>
        ) : null}

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
                  <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-4">{pkg.title} 견적을 안내해 드립니다</h2>
                  <p className="leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#c7d5ea" }}>
                    날짜와 장소, 예상 방문자 수를 알려주시면 구성안과 예상 견적을 작성해 드립니다. 상담은 무료입니다.
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
                      다른 패키지 보기
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
