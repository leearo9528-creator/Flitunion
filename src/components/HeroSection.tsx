"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(135deg, #050e1f 0%, #0a1e3d 50%, #0c2553 100%)" }}
      aria-labelledby="hero-heading"
    >
      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(49,130,246,0.18) 0%, transparent 70%)" }} aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(49,130,246,0.12) 0%, transparent 70%)" }} aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(49,130,246,0.18)", border: "1px solid rgba(49,130,246,0.4)", color: "#93c5fd" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#3182f6" }} aria-hidden="true" />
            플릿(Flit) 셀러 네트워크 기반 행사 대행
          </div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            행사 하나를 통째로
            <br />
            맡기는 가장 확실한 방법
            <br />
            <span style={{ color: "#3182f6" }}>행사 대행 플릿유니온</span>
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl" style={{ color: "#cbd5e1" }}>
            셀러 모집부터 장비, 당일 현장 통제, 결과 보고서까지
            <br className="hidden sm:block" />
            <strong className="text-white">행사 담당자가 할 일을</strong> 플릿 유니온이 대신합니다.
            <br className="hidden sm:block" />
            담당자는 확인하고 결정만 하시면 됩니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-xl btn-primary"
              style={{ boxShadow: "0 8px 30px rgba(49,130,246,0.4)" }}
            >
              무료 상담 신청하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-lg rounded-xl transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              진행 이력 보기
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-8 sm:gap-10">
            {[
              { value: "50+", label: "운영 행사" },
              { value: "500+", label: "Flit 셀러 DB" },
              { value: "98%", label: "재의뢰율" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <p className="text-3xl font-black" style={{ color: "#3182f6" }}>{stat.value}</p>
                <p className="text-sm font-medium mt-1" style={{ color: "#94a3b8" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#64748b" }} aria-hidden="true">
        <span className="text-xs">스크롤</span>
        <div className="w-5 h-8 border-2 rounded-full flex justify-center pt-1.5" style={{ borderColor: "#334155" }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: "#3182f6" }} />
        </div>
      </div>
    </section>
  );
}
