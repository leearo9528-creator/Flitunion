export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#0d1117" }} className="text-gray-400 py-14" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-0.5 mb-3">
              <span className="text-xl font-black" style={{ color: "#3182f6" }}>Flit</span>
              <span className="text-xl font-black text-white">Union</span>
            </div>
            <p className="text-sm leading-relaxed mb-1" style={{ color: "#6b7280" }}>
              플리마켓·야시장·푸드트럭 운영 대행 및 유휴공간 수익화 솔루션
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6b7280" }}>
              Flit 셀러 네트워크 기반의 플리마켓 운영 대행 전문 기업.
              <br />
              셀러 모집·푸드트럭 섭외·장비 렌탈·현장 운영까지 원스톱 제공.
            </p>
            <a
              href="https://flit-black.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-blue-400"
              style={{ color: "#3182f6" }}
              aria-label="플릿 플랫폼 바로가기"
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-black"
                style={{ background: "#3182f6" }}
                aria-hidden="true"
              >F</span>
              플릿(Flit) 플랫폼 바로가기 →
            </a>
          </div>

          {/* Services */}
          <nav aria-label="서비스 링크">
            <h3 className="text-sm font-semibold text-white mb-4">서비스</h3>
            <ul className="space-y-2.5 text-sm">
              {["플리마켓 운영 대행", "야시장 행사 운영", "푸드트럭 섭외", "행사 장비 렌탈", "대학교 축제 기획"].map((item) => (
                <li key={item}>
                  <a href="#services" className="transition-colors hover:text-gray-200" style={{ color: "#6b7280" }}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="text-sm font-semibold text-white mb-4">연락처</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="tel:+821080188492" className="hover:text-white transition-colors" style={{ color: "#6b7280" }}>010-8018-8492</a>
              </li>
              <li>
                <a href="mailto:hello@flitunion.co.kr" className="hover:text-white transition-colors" style={{ color: "#6b7280" }}>hello@flitunion.co.kr</a>
              </li>
              <li style={{ color: "#4b5563" }}>평일 09:00 – 18:00</li>
            </ul>
          </address>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs" style={{ borderColor: "#1f2937", color: "#4b5563" }}>
          <p>© {currentYear} Flit Union 플릿 유니온. All rights reserved.</p>
          <nav aria-label="하단 링크">
            <ul className="flex gap-5">
              <li><a href="#" className="hover:text-gray-300 transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">이용약관</a></li>
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}
