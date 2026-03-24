"use client";

import { useState } from "react";
import { portfolioItems } from "@/data/portfolio";

export default function PortfolioSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-gray-50" aria-labelledby="portfolio-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-3">
            Portfolio
          </span>
          <h2 id="portfolio-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            검증된 운영 실적, 직접 확인하세요
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            플리마켓·야시장·푸드트럭·렌탈까지, 전국 다양한 공간의 실제 운영 사례입니다.
            <br />
            <span className="text-sm text-gray-400">카드를 클릭하면 상세 내용을 확인할 수 있습니다.</span>
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`lg:col-span-1 ${isOpen ? "sm:col-span-2 lg:col-span-3" : ""} transition-all`}>
                <article
                  className={`bg-white rounded-2xl border ${item.borderClass} transition-all overflow-hidden ${isOpen ? "shadow-lg" : "hover:shadow-md hover:-translate-y-1"}`}
                >
                  {/* Card Header — always visible */}
                  <button
                    className="w-full text-left p-6 focus:outline-none"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`portfolio-detail-${item.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.tagClass}`}>
                            {item.tag}
                          </span>
                          <span className="text-xs text-gray-400">{item.location}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug">{item.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-5">{item.desc}</p>
                        <dl className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                          {item.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <dd className="text-sm font-bold text-gray-900">{stat.value}</dd>
                              <dt className="text-xs text-gray-400 mt-0.5">{stat.label}</dt>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>

                    {/* Toggle hint */}
                    <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-400 font-medium">
                        {isOpen ? "접기" : "상세 보기"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable Detail */}
                  {isOpen && (
                    <div
                      id={`portfolio-detail-${item.id}`}
                      className="border-t border-gray-100 bg-gray-50 px-6 py-6"
                    >
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.fullDesc}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {item.details.map((detail) => (
                          <div key={detail.title} className="bg-white rounded-xl p-4 border border-gray-100">
                            <h4 className="text-xs font-bold text-brand mb-2">{detail.title}</h4>
                            <p className="text-xs text-gray-600 leading-relaxed">{detail.content}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand hover:bg-brand-dark text-white text-sm font-semibold rounded-xl transition-colors"
                          onClick={() => setOpenId(null)}
                        >
                          이런 행사 의뢰하기
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 rounded-2xl p-10 text-center text-white bg-brand">
          <h3 className="text-2xl font-black mb-3">다음 성공 사례의 주인공이 되세요</h3>
          <p className="text-blue-100 mb-6 leading-relaxed">
            귀하의 공간에 맞는 플리마켓·야시장 플랜을 무료로 제안해 드립니다.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-brand font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            무료 기획안 요청하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
