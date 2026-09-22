import { services } from "@/data/services";
import { faqs } from "@/data/faq";

/**
 * 구조화 데이터는 화면에 실제로 있는 내용에서 파생한다.
 * 서비스 목록은 services.ts, FAQ 는 faq.ts 가 정본 — 여기에 문구를 다시 적지 말 것.
 */
export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "플릿 유니온(Flit Union)",
    alternateName: "Flit Union",
    url: "https://flitunion.com",
    logo: "https://flitunion.com/logo.svg",
    // ⚠️ foundingDate(설립일)·address(상세 소재지)는 의도적으로 넣지 않는다 — company.ts 주석 참조
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-10-8018-8492",
      email: "hello@flitunion.com",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: "Korean",
    },
    sameAs: ["https://www.instagram.com/flitunion_official", "https://app.flitunion.com"],
    description:
      "검증된 셀러 네트워크 기반 행사 대행 전문 기업. 대학 축제, 지자체 축제, 기업 행사, 플리마켓·야시장의 기획부터 셀러·푸드트럭 섭외, 장비 렌탈, 현장 운영, 정산까지 원스톱으로 대행합니다.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "행사 대행",
    provider: {
      "@type": "Organization",
      name: "플릿 유니온(Flit Union)",
      url: "https://flitunion.com",
    },
    areaServed: {
      "@type": "Country",
      name: "South Korea",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "행사 대행 서비스",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `https://flitunion.com/services/${service.slug}`,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
