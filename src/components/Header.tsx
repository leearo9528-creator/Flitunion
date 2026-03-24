"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "서비스" },
    { href: "#portfolio", label: "포트폴리오" },
    { href: "#faq", label: "자주 묻는 질문" },
    { href: "#contact", label: "상담 신청" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5" aria-label="플릿 유니온 홈으로 이동">
            <span className="text-xl font-black tracking-tight text-gray-900">
              Flit
            </span>
            <span
              className="text-xl font-black tracking-tight px-2 py-0.5 rounded-md text-white"
              style={{ backgroundColor: "#3182f6" }}
            >
              Union
            </span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="주요 메뉴">
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-[#3182f6]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: "#3182f6" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1b64da")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#3182f6")
            }
          >
            무료 상담 신청
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="모바일 메뉴 열기"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav
            className="md:hidden py-4 border-t border-gray-100"
            aria-label="모바일 메뉴"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#3182f6]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="block mt-2 px-4 py-2 text-white text-sm font-semibold rounded-lg text-center"
                  style={{ backgroundColor: "#3182f6" }}
                  onClick={() => setMenuOpen(false)}
                >
                  무료 상담 신청
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
