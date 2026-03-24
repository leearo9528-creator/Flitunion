"use client";

import { useState } from "react";
import type { Service } from "@/data/services";

export default function ServiceDetailClient({ service }: { service: Service }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="플릿 유니온 홈으로 이동">
            <span className="text-xl font-black text-gray-900">Flit</span>
            <span className="text-xl font-black text-white px-2 py-0.5 rounded-md bg-brand">Union</span>
          </a>
          <a href="/#services" className="text-sm font-medium text-gray-600 hover:text-brand transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            전체 서비스
          </a>
        </div>
      </header>

      <main className="pt-16">

        {/* Hero */}
        <section
          className="py-24"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2240 100%)" }}
          aria-labelledby="service-heading"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <a
                href="/#services"
                className="inline-flex items-center gap-1 text-blue-300 text-sm mb-6 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                전체 서비스 보기
              </a>
              <span className="block text-brand text-sm font-semibold uppercase tracking-widest mb-3">
                {service.subtitle}
              </span>
              <h1 id="service-heading" className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                {service.icon} {service.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl">
                {service.heroDesc}
              </p>

              {/* Stats */}
              <div className="flex gap-10 mb-10">
                {service.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black text-brand">{stat.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <a
                href="#contact-service"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold text-lg rounded-xl transition-colors"
              >
                무료 상담 신청하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white" aria-labelledby="features-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-3">Features</span>
              <h2 id="features-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                서비스 주요 특징
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                플릿 유니온이 {service.title}에서 제공하는 핵심 가치입니다.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-brand-border hover:bg-brand-light transition-all">
                  <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center text-sm font-black mb-4" aria-hidden="true">
                    {i + 1}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50" aria-labelledby="process-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-3">Process</span>
              <h2 id="process-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                진행 프로세스
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                의뢰부터 행사 완료까지, 단계별로 안내해 드립니다.
              </p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" role="list">
              {service.process.map((step) => (
                <li key={step.step} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <span className="block text-4xl font-black text-brand-light mb-3 leading-none" aria-hidden="true">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white" aria-labelledby="service-faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-brand text-sm font-semibold uppercase tracking-widest mb-3">FAQ</span>
              <h2 id="service-faq-heading" className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                자주 묻는 질문
              </h2>
            </div>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`sfaq-${i}`}
                  >
                    <span className="text-sm font-semibold text-gray-900 pr-4 leading-snug">{faq.question}</span>
                    <span
                      className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all ${openFaq === i ? "bg-brand border-brand text-white rotate-180" : "border-gray-300 text-gray-400"}`}
                      aria-hidden="true"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`sfaq-${i}`}
                    className={`transition-all duration-300 ${openFaq === i ? "max-h-64" : "max-h-0 overflow-hidden"}`}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact-service"
          className="py-20"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d2240 100%)" }}
          aria-labelledby="service-cta-heading"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="service-cta-heading" className="text-3xl font-black text-white leading-tight mb-4">
              {service.title},<br />지금 바로 시작하세요
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              48시간 이내에 맞춤 기획안을 무료로 제안드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl transition-colors"
              >
                무료 상담 신청
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+821080188492"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                010-8018-8492
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-600 py-8 text-center text-xs">
        © {new Date().getFullYear()} Flit Union 플릿 유니온. All rights reserved.
      </footer>
    </>
  );
}
