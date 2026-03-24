"use client";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2240 50%, #0f2d5a 100%)",
      }}
      aria-labelledby="hero-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(49,130,246,0.15)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: "rgba(49,130,246,0.10)" }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Badge — 플릿 연계 강조 */}
          <div
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full mb-8 border"
            style={{
              backgroundColor: "rgba(49,130,246,0.15)",
              borderColor: "rgba(49,130,246,0.3)",
              color: "#93c5fd",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#3182f6" }}
              aria-hidden="true"
            />
            플릿(Flit) 셀러 네트워크 기반 운영 대행
          </div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            공간에 생명을 불어넣는
            <br />
            <span style={{ color: "#3182f6" }}>플리마켓 운영 대행</span>
            <br />
            플릿 유니온
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
            유휴공간을 수익 창출의 거점으로. 대학교 축제부터 대형 카페까지
            —&nbsp;플릿에서 검증된 셀러 네트워크로
            <strong className="text-white"> 원스톱으로 책임집니다.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
              style={{
                backgroundColor: "#3182f6",
                boxShadow: "0 8px 30px rgba(49,130,246,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1b64da";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3182f6";
              }}
            >
              무료 상담 신청하기
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold text-lg rounded-xl border transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.08)")
              }
            >
              운영 사례 보기
            </a>
          </div>

          {/* Social proof numbers */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { value: "50+", label: "운영 행사" },
              { value: "500+", label: "플릿 셀러 DB" },
              { value: "98%", label: "재의뢰율" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl font-black"
                  style={{ color: "#3182f6" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 플릿 연계 배지 */}
          <a
            href="https://flit-black.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-xl border hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: "rgba(49,130,246,0.1)",
              borderColor: "rgba(49,130,246,0.2)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
              style={{ backgroundColor: "#3182f6" }}
              aria-hidden="true"
            >
              F
            </div>
            <div>
              <p className="text-xs text-gray-400">Powered by</p>
              <p className="text-sm font-bold text-white">
                플릿(Flit) 셀러 리뷰 플랫폼
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        aria-hidden="true"
      >
        <span className="text-xs">스크롤</span>
        <div className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center pt-1.5">
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ backgroundColor: "#3182f6" }}
          />
        </div>
      </div>
    </section>
  );
}
