import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import PartnerForm from "@/components/PartnerForm";
import { IconBadge, ICONS } from "@/components/Icon";
import { sellerItems, foodtruckItems } from "@/data/catalog";
import { keyStats } from "@/data/company";

export const metadata: Metadata = {
  title: "협력사 등록 — 푸드트럭·셀러 모집 | 플릿 유니온(Flit Union)",
  description:
    "플릿 유니온의 행사에 함께할 푸드트럭·셀러 협력사를 모집합니다. 등록해두시면 행사 일정이 맞을 때 먼저 연락드립니다. 등록 무료, 참가 의무 없음.",
  alternates: { canonical: "https://flitunion.com/partners" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://flitunion.com/partners",
    siteName: "플릿 유니온(Flit Union)",
    title: "협력사 등록 — 푸드트럭·셀러 모집 | 플릿 유니온(Flit Union)",
    description:
      "플릿 유니온의 행사에 함께할 푸드트럭·셀러를 모집합니다. 등록 무료, 참가 의무 없음.",
  },
};

const benefits = [
  {
    iconPath: ICONS.clipboard,
    title: "모집 공고를 직접 찾지 않으셔도 됩니다",
    desc: "등록해 두시면 행사 콘셉트와 지역이 맞을 때 플릿 유니온이 우선 연락드립니다. 매번 공고를 검색하고 신청서를 새로 작성하지 않으셔도 됩니다.",
  },
  {
    iconPath: ICONS.document,
    title: "프로필이 제안서에 수록됩니다",
    desc: "주최사에 전달하는 카탈로그와 제안서에 품목·메뉴 프로필이 포함됩니다. 주최 기관이 구성을 선정할 때 직접 확인하는 자료입니다.",
  },
  {
    iconPath: ICONS.ticket,
    title: "대학 축제 · 지자체 축제 물량",
    desc: "개별 접촉이 어려운 대학 축제, 지자체 대형 축제, 아파트 단지 행사를 플릿 유니온이 수주하여 배정합니다.",
  },
  {
    iconPath: ICONS.calculator,
    title: "정산을 하나의 창구에서 진행합니다",
    desc: "참가비와 정산은 플릿 유니온이 주최 측과 직접 처리합니다. 행사마다 다른 담당자와 개별 협의하지 않으셔도 됩니다.",
  },
];

const steps = [
  { step: "01", title: "등록 신청", desc: "아래 양식에 업체명, 연락처, 품목, 활동 지역을 남겨 주시기 바랍니다. 1분이면 작성하실 수 있습니다." },
  { step: "02", title: "확인 연락", desc: "담당자가 확인 후 연락드려 활동 조건과 가능한 행사 유형을 확인합니다." },
  { step: "03", title: "프로필 등록", desc: "사진과 소개를 받아 카탈로그에 프로필을 등록합니다. 이후 제안서에 함께 수록됩니다." },
  { step: "04", title: "행사 섭외", desc: "조건이 맞는 행사가 있을 때 일정, 참가비, 현장 조건을 안내하여 연락드립니다." },
];

export default function PartnersPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow="Partners Wanted"
          breadcrumb="협력사 등록"
          title={
            <>
              함께 행사를 운영할
              <br className="hidden sm:block" /> 협력사를 찾고 있습니다
            </>
          }
          description="플릿 유니온이 운영하는 대학 축제·지자체 축제·아파트 야시장에 참여하실 푸드트럭과 셀러를 모집합니다. 등록해 두시면 조건이 맞는 행사가 있을 때 우선 연락드립니다."
        >
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl px-4 py-4"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: "#bfdbfe" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm" style={{ color: "#8ba3c7" }}>
            등록 무료 · 참가 의무 없음 · 사업자등록 없이도 신청 가능
          </p>
        </PageHero>

        {/* 왜 등록하나 */}
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">등록하시면 무엇이 달라집니까?</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl break-keep">
                플릿 유니온은 주최 기관에서 행사를 수주해 운영하는 대행사입니다. 셀러·푸드트럭을 직접 섭외해 배치하기
                때문에, 등록하신 업체는 구성을 편성할 때 우선 검토 대상이 됩니다.
              </p>
            </FadeInSection>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <FadeInSection key={b.title} delay={i * 70}>
                  <div className="h-full bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <IconBadge path={b.iconPath} />
                    <h3 className="text-base font-bold text-gray-900 mt-3 mb-2 break-keep">{b.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed break-keep">{b.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 진행 절차 */}
        <section className="py-16 sm:py-20" style={{ background: "#f8fafc" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">등록부터 섭외까지</h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                등록하신다고 하여 즉시 행사에 참여하셔야 하는 것은 아닙니다. 조건이 맞을 때 연락드리며, 참여 여부는 그때 결정하시면 됩니다.
              </p>
            </FadeInSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <FadeInSection key={s.step} delay={i * 70}>
                  <div className="h-full bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <span className="inline-block text-xs font-black px-2.5 py-1 rounded-full mb-3" style={{ background: "#eff6ff", color: "#3182f6" }}>
                      {s.step}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 break-keep">{s.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed break-keep">{s.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* 폼 */}
        <section id="apply" className="py-16 sm:py-20 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mb-8 text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
                Apply
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">협력사 등록 신청</h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                다섯 항목만 작성하시면 됩니다. 세부 조건은 연락드릴 때 확인합니다.
              </p>
            </FadeInSection>

            <FadeInSection>
              <PartnerForm />
            </FadeInSection>
          </div>
        </section>

        {/* 현재 카탈로그 안내 */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="rounded-2xl px-6 py-6 sm:px-8" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                <h2 className="text-base font-bold text-gray-900 mb-2">현재 어떤 구성으로 제공되는지 확인하실 수 있습니다</h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 break-keep">
                  현재 셀러 품목 {sellerItems.length}종, 푸드트럭 메뉴 {foodtruckItems.length}종을 운영 중입니다.
                  등록하시면 본 카탈로그에 프로필이 추가됩니다.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/sellers" className="text-sm font-bold" style={{ color: "#1b64da" }}>
                    셀러 품목 카탈로그 →
                  </Link>
                  <Link href="/foodtruck" className="text-sm font-bold" style={{ color: "#1b64da" }}>
                    푸드트럭 메뉴 카탈로그 →
                  </Link>
                  <Link href="/portfolio" className="text-sm font-bold" style={{ color: "#1b64da" }}>
                    진행 이력 →
                  </Link>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection className="mt-6">
              <div className="rounded-2xl px-6 py-6 sm:px-8 border border-gray-200">
                <h2 className="text-base font-bold text-gray-900 mb-2">직접 행사를 찾아보고자 하신다면</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 break-keep">
                  플릿 유니온 협력사 등록과 별개로, 플릿(Flit) 플랫폼에서는 전국의 플리마켓·축제 모집 공고를 직접
                  검색하고 신청하실 수 있습니다. 양쪽 모두 이용하실 수 있습니다.
                </p>
                <a
                  href="https://app.flitunion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: "#3182f6" }}
                >
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-black"
                    style={{ background: "#3182f6" }}
                    aria-hidden="true"
                  >F</span>
                  플릿 플랫폼 바로가기 →
                </a>
              </div>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
