import Link from "next/link";
import { services } from "@/data/services";

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
              검증된 셀러 네트워크 기반의 행사 운영 원스톱 대행 전문 기업
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6b7280" }}>
              행사 기획·셀러 모집·푸드트럭 섭외·장비 렌탈·현장 운영·정산까지
              <br />
              창구 하나로 진행합니다.
            </p>
            <a
              href="https://app.flitunion.com"
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
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-gray-200"
                    style={{ color: "#6b7280" }}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company + Contact */}
          <div>
            <nav aria-label="회사 링크" className="mb-8">
              <h3 className="text-sm font-semibold text-white mb-4">둘러보기</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { href: "/packages", label: "행사 유형별 패키지" },
                  { href: "/sellers", label: "셀러 품목 27종" },
                  { href: "/foodtruck", label: "푸드트럭 메뉴 24종" },
                  { href: "/portfolio", label: "진행 이력" },
                  { href: "/about", label: "회사 소개" },
                  { href: "/partners", label: "협력사 등록" },
                  { href: "/#contact", label: "상담 신청" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-gray-200" style={{ color: "#6b7280" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="not-italic">
              <h3 className="text-sm font-semibold text-white mb-4">연락처</h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="tel:+821080188492" className="hover:text-white transition-colors" style={{ color: "#6b7280" }}>010-8018-8492</a>
                </li>
                <li>
                  <a href="mailto:hello@flitunion.com" className="hover:text-white transition-colors" style={{ color: "#6b7280" }}>hello@flitunion.com</a>
                </li>
                <li style={{ color: "#4b5563" }}>평일 09:00 – 18:00</li>
              </ul>
            </address>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs" style={{ borderColor: "#1f2937", color: "#4b5563" }}>
          <p>
            © {currentYear} Flit Union 플릿 유니온. All rights reserved.
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            사업자등록번호 655-26-02147
          </p>
          <nav aria-label="하단 링크">
            <ul className="flex gap-5">
              <li>
                <Link href="/about" className="hover:text-gray-300 transition-colors">회사 소개</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gray-300 transition-colors">진행 이력</Link>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  );
}
