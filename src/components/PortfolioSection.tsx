"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioItems } from "@/data/portfolio";
import FadeInSection from "./FadeInSection";

export default function PortfolioSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-white" aria-labelledby="portfolio-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <FadeInSection className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#3182f6" }}>
            Portfolio
          </span>
          <h2 id="portfolio-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            검증된 운영 실적, 직접 확인하세요
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            플리마켓·야시장·푸드트럭·렌탈까지, 전국 다양한 공간의 실제 운영 사례입니다.
          </p>
          <p className="text-sm text-gray-400 mt-2">카드를 클릭하면 상세 내용을 확인할 수 있습니다.</p>
        </FadeInSection>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <FadeInSection
                key={item.id}
                delay={index * 80}
                className={`${isOpen ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-1"} transition-all duration-300`}
              >
                <article
                  className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-blue-200 shadow-lg"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-1"
                  }`}
                  style={{ boxShadow: isOpen ? "0 4px 24px rgba(49,130,246,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative w-full h-40 overflow-hidden"
                    style={{ background: item.placeholderGradient }}
                    aria-hidden="true"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-end p-4">
                        <span className="text-white/60 text-xs font-medium">
                          {item.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Header */}
                  <button
                    className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`portfolio-detail-${item.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.tagClass}`}>
                            {item.tag}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{item.location}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{item.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed mb-5">{item.desc}</p>
                        <dl className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                          {item.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <dd className="text-sm font-bold text-gray-900">{stat.value}</dd>
                              <dt className="text-xs text-gray-500 mt-0.5">{stat.label}</dt>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>

                    {/* Toggle hint */}
                    <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs font-medium" style={{ color: isOpen ? "#3182f6" : "#9ca3af" }}>
                        {isOpen ? "접기" : "상세 보기"}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: isOpen ? "#3182f6" : "#9ca3af" }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable Detail — CSS grid animation */}
                  <div
                    id={`portfolio-detail-${item.id}`}
                    className="accordion-content"
                    data-open={isOpen}
                  >
                    <div className="accordion-inner">
                      <div
                        className="border-t border-gray-100 px-6 py-6"
                        style={{ background: "#f8fafc" }}
                      >
                        <p className="text-sm text-gray-700 leading-relaxed mb-6">{item.fullDesc}</p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {item.details.map((detail) => (
                            <div key={detail.title} className="bg-white rounded-xl p-4 border border-gray-100">
                              <h4 className="text-xs font-bold mb-2" style={{ color: "#3182f6" }}>{detail.title}</h4>
                              <p className="text-xs text-gray-600 leading-relaxed">{detail.content}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 text-center">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-bold rounded-xl btn-primary"
                            onClick={() => setOpenId(null)}
                          >
                            이런 행사 의뢰하기
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            );
          })}
        </div>

        {/* CTA Banner */}
        <FadeInSection className="mt-10">
          <div className="rounded-2xl p-10 text-center text-white" style={{ background: "#3182f6" }}>
            <h3 className="text-2xl font-black mb-3">다음 성공 사례의 주인공이 되세요</h3>
            <p className="mb-6 leading-relaxed" style={{ color: "#dbeafe" }}>
              귀하의 공간에 맞는 플리마켓·야시장 플랜을 무료로 제안해 드립니다.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white font-bold rounded-xl transition-colors text-sm hover:bg-blue-50"
              style={{ color: "#3182f6" }}
            >
              무료 기획안 요청하기
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
