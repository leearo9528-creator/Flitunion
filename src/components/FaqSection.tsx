"use client";

import { useState } from "react";

const faqs = [
  {
    question: "플리마켓과 야시장, 어떤 행사가 우리 공간에 더 맞을까요?",
    answer: "공간 위치, 유동 시간대, 주변 상권에 따라 달라집니다. 낮 유동인구가 많은 카페·캠퍼스라면 플리마켓, 저녁 이후 상권이 활발하거나 야외 광장을 보유하고 있다면 야시장이 효과적입니다. 플릿 유니온이 무료 상담을 통해 공간에 최적화된 행사 형태를 제안드립니다.",
  },
  {
    question: "푸드트럭 섭외는 어떻게 진행되나요?",
    answer: "플릿 유니온은 한식, 디저트, 글로벌 푸드 등 카테고리별 검증된 푸드트럭 DB 100대 이상을 보유하고 있습니다. 행사 콘셉트와 공간 조건(전기·용수 여부)을 확인한 후 최적의 푸드트럭을 매칭하고 계약·배치까지 대행합니다.",
  },
  {
    question: "행사 장비(텐트, 테이블, 조명 등)는 직접 준비해야 하나요?",
    answer: "아니요. 플릿 유니온의 렌탈 서비스를 통해 텐트, 테이블, 의자, 조명, 배너, 간판, 전기 설비까지 원스톱으로 제공받을 수 있습니다. 운영 대행 패키지와 함께 이용하시면 렌탈 비용 할인 혜택도 받으실 수 있습니다.",
  },
  {
    question: "플리마켓 운영 대행 수수료는 어떻게 책정되나요?",
    answer: "운영 규모, 기간, 서비스 범위에 따라 달라집니다. 셀러 참가비의 일부를 수수료로 수취하는 수익 쉐어 구조가 기본이며, 렌탈 장비·푸드트럭 섭외 등 추가 서비스는 별도 견적으로 안내드립니다. 무료 상담을 통해 확인하세요.",
  },
  {
    question: "대학교 축제 플리마켓은 어떻게 진행되나요?",
    answer: "학생회 또는 담당자와의 초기 미팅 → 공간 분석 및 레이아웃 설계 → Flit 기반 셀러 모집 및 심사 → 푸드트럭 섭외(옵션) → 현장 설치 및 행사 운영 → 정산 및 결과 보고서 제공 순으로 진행됩니다. 행사일 기준 최소 3주 전에 의뢰 주시면 원활하게 준비할 수 있습니다.",
  },
  {
    question: "Flit 셀러와 일반 셀러의 차이가 뭔가요?",
    answer: "Flit 셀러는 플릿 플랫폼에 등록된 셀러로, 이전 마켓 참가 이력과 방문객·운영자 리뷰 점수를 보유하고 있습니다. 검증된 데이터를 기반으로 선발하기 때문에 일반 모집 대비 불참·품질 미달 리스크가 현저히 낮습니다.",
  },
  {
    question: "지방에서도 운영 대행이 가능한가요?",
    answer: "네, 전국 어디서나 가능합니다. 부산, 대구, 광주, 대전 등 광역시와 지역 거점 도시는 원격 기획 + 현지 파트너 운영 체계로 진행합니다. 출장 교통·숙박 등 비용은 견적에 투명하게 포함하여 안내드립니다.",
  },
  {
    question: "의뢰 후 취소하거나 일정을 변경하면 어떻게 되나요?",
    answer: "행사일 기준 4주 전 취소 시 계약금의 50% 환불, 2주 전 취소 시 계약금 환불 불가를 원칙으로 합니다. 천재지변 등 불가항력 상황은 협의를 통해 유연하게 조율합니다. 일정 변경은 셀러 모집 단계 이전이라면 1회 무료로 조정 가능합니다.",
  },
];

function FaqItem({
  question, answer, isOpen, onToggle, index,
}: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-semibold text-gray-900 text-sm leading-snug pr-4">{question}</span>
        <span
          className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all ${
            isOpen ? "bg-brand border-brand text-white rotate-180" : "border-gray-300 text-gray-400"
          }`}
          aria-hidden="true"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0 overflow-hidden"}`}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            플리마켓·야시장·푸드트럭 운영 의뢰 전, 궁금한 점을 미리 확인하세요.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 bg-brand-light border border-brand-border rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-3 text-sm">더 궁금한 점이 있으신가요?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-brand font-bold text-sm hover:text-brand-dark transition-colors"
          >
            직접 상담 문의하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
