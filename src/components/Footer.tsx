export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 py-12" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-black text-white">Flit</span>
              <span
                className="text-xl font-black text-white px-2 py-0.5 rounded-md"
                style={{ backgroundColor: "#3182f6" }}
              >
                Union
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              플리마켓·야시장·푸드트럭 운영 대행 및 유휴공간 수익화 솔루션
            </p>
            <p className="text-sm leading-relaxed text-gray-500">
              플릿(Flit) 셀러 네트워크 기반의 플리마켓 운영 대행 전문 기업.
              <br />
              셀러 모집·푸드트럭 섭외·장비 렌탈·현장 운영까지 원스톱 제공.
            </p>
            {/* Flit 링크 */}
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors"
              style={{ color: "#3182f6" }}
              aria-label="플릿 플랫폼 바로가기"
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-black"
                style={{ backgroundColor: "#3182f6" }}
                aria-hidden="true"
              >
                F
              </span>
              플릿(Flit) 플랫폼 바로가기 →
            </a>
          </div>

          {/* Services */}
          <nav aria-label="서비스 링크">
            <h3 className="text-sm font-semibold text-white mb-4">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition-colors">플리마켓 운영 대행</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">야시장 행사 운영</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">푸드트럭 섭외</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">행사 장비 렌탈</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">대학교 축제 기획</a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="text-sm font-semibold text-white mb-4">연락처</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+821000000000" className="hover:text-white transition-colors">
                  010-0000-0000
                </a>
              </li>
              <li>
                <a href="mailto:hello@flitunion.co.kr" className="hover:text-white transition-colors">
                  hello@flitunion.co.kr
                </a>
              </li>
              <li>평일 09:00 – 18:00</li>
            </ul>
          </address>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {currentYear} Flit Union 플릿 유니온. All rights reserved.</p>
          <nav aria-label="하단 링크">
            <ul className="flex gap-4">
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">개인정보처리방침</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition-colors">이용약관</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
