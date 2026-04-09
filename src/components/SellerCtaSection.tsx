import FadeInSection from "./FadeInSection";

export default function SellerCtaSection() {
  return (
    <section className="py-12 bg-white" aria-labelledby="seller-cta-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div
            className="rounded-2xl px-6 py-8 sm:px-10 sm:py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{
              background: "linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%)",
              border: "1px solid #dbeafe",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-black"
                style={{ background: "#3182f6" }}
                aria-hidden="true"
              >
                F
              </div>
              <div>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-[0.12em] mb-1.5"
                  style={{ color: "#3182f6" }}
                >
                  For Sellers
                </span>
                <h2
                  id="seller-cta-heading"
                  className="text-lg sm:text-xl font-black text-gray-900 leading-snug mb-1"
                >
                  셀러로 활동하고 계신가요?
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  플릿(Flit) 플랫폼에서 진행 중인 플리마켓·야시장·축제 부스에 직접 신청하고 참여할 수 있습니다.
                </p>
              </div>
            </div>

            <a
              href="https://app.flitunion.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-white font-bold text-sm rounded-xl btn-primary whitespace-nowrap"
              aria-label="플릿 플랫폼에서 셀러로 참여하기 (새 창)"
            >
              플릿에서 참여하기
              <svg
                className="w-4 h-4"
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
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
