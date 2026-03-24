export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "플릿 유니온(Flit Union)",
    alternateName: "Flit Union",
    url: "https://flitunion.co.kr",
    logo: "https://flitunion.co.kr/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+82-10-0000-0000",
      contactType: "customer service",
      areaServed: "KR",
      availableLanguage: "Korean",
    },
    sameAs: ["https://www.instagram.com/flitunion_official"],
    description:
      "플릿 셀러 네트워크 기반 플리마켓 운영 대행 전문 기업. 대학교 축제 기획, 유휴공간 활용, 대형 카페 이벤트 등 원스톱 마켓 솔루션 제공.",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "플리마켓 운영 대행",
    provider: {
      "@type": "Organization",
      name: "플릿 유니온(Flit Union)",
    },
    areaServed: {
      "@type": "Country",
      name: "South Korea",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "플리마켓 운영 서비스",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "유휴공간 팝업스토어 기획",
            description:
              "수익이 없는 유휴공간을 플리마켓으로 전환, 공간 수익화 솔루션 제공",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "대학교 축제 마켓 운영",
            description:
              "대학교 축제 플리마켓 셀러 모집부터 현장 운영까지 전 과정 대행",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "대형 카페 정기 플리마켓",
            description:
              "카페 유휴시간대 정기 플리마켓 운영으로 집객 및 매출 향상",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "플리마켓 운영 대행 업체를 선정할 때 무엇을 봐야 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "셀러 모집 네트워크, 현장 운영 인력, 이전 운영 실적(포트폴리오), 안전 관리 계획, 수수료 구조의 투명성을 확인해야 합니다. 플릿 유니온은 플릿 플랫폼의 검증된 셀러 DB를 기반으로 모집하며 모든 현장에 전담 매니저를 배치합니다.",
        },
      },
      {
        "@type": "Question",
        name: "플리마켓 운영 대행 수수료는 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "운영 규모, 기간, 서비스 범위에 따라 달라집니다. 기본적으로 셀러 참가비의 일부를 수수료로 수취하는 구조이며, 공간 규모와 행사 성격에 따라 고정 운영비가 발생할 수 있습니다. 정확한 견적은 무료 상담을 통해 안내드립니다.",
        },
      },
      {
        "@type": "Question",
        name: "대학교 축제 플리마켓을 처음 기획하는데 어떻게 진행되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "1) 학생회 또는 담당자와 초기 미팅 → 2) 공간 분석 및 레이아웃 설계 → 3) 플릿 기반 셀러 모집 및 심사 → 4) 현장 설치 및 행사 운영 → 5) 정산 및 결과 보고서 제공 순으로 진행됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "카페나 건물 내부 유휴공간에서도 플리마켓이 가능한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 실내 공간에서도 충분히 운영 가능합니다. 카페 홀, 빈 건물 층, 문화센터 복도 등 다양한 공간을 분석하여 최적의 마켓 레이아웃을 제안합니다.",
        },
      },
      {
        "@type": "Question",
        name: "플리마켓 셀러 모집은 어떻게 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "플릿 유니온은 자체 운영하는 플릿 플랫폼의 셀러 DB와 리뷰 데이터를 활용해 검증된 셀러를 빠르게 모집합니다. 플릿에 등록된 셀러의 리뷰 점수와 이전 참가 이력을 기반으로 행사 콘셉트에 맞는 셀러를 선발합니다.",
        },
      },
    ],
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
