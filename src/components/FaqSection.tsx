"use client";

import { useState } from "react";
import FadeInSection from "./FadeInSection";
import { faqs } from "@/data/faq";

/** 문항은 src/data/faq.ts 가 정본 — JsonLd 의 FAQPage 스키마도 같은 배열을 읽는다 */

function FaqItem({
  question, answer, isOpen, onToggle, index,
}: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        border: isOpen ? "1px solid #bfdbfe" : "1px solid #e5e7eb",
        boxShadow: isOpen ? "0 2px 12px rgba(49,130,246,0.08)" : "none",
      }}
    >
      <button
        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors ${
          isOpen ? "" : "hover:bg-gray-50"
        }`}
        style={{ background: isOpen ? "#eff6ff" : "#ffffff" }}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="font-semibold text-gray-900 text-sm leading-snug pr-4">{question}</span>
        <span
          className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
            isOpen
              ? "bg-[#3182f6] border-[#3182f6] text-white rotate-180"
              : "border-gray-300 text-gray-400"
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
        className="accordion-content"
        data-open={isOpen}
      >
        <div className="accordion-inner">
          <p className="px-6 pb-5 text-gray-700 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20" style={{ background: "#f8fafc" }} aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeInSection className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
            FAQ
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            행사 대행을 의뢰하시기 전 궁금하신 점을 미리 확인하실 수 있습니다.
          </p>
        </FadeInSection>

        <FadeInSection>
          <div className="space-y-2.5">
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

          <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <p className="text-gray-800 font-semibold mb-3 text-sm">추가로 궁금하신 점이 있으십니까?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-bold text-sm transition-colors hover:opacity-80"
              style={{ color: "#3182f6" }}
            >
              직접 상담 문의하기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}
