"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "서비스" },
  { href: "#portfolio", label: "포트폴리오" },
  { href: "#faq", label: "자주 묻는 질문" },
  { href: "#contact", label: "상담 신청" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-shadow duration-300 ${
        scrolled ? "border-gray-200 shadow-sm" : "border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5" aria-label="플릿 유니온 홈으로 이동">
            <span className="text-xl font-black tracking-tight" style={{ color: "#3182f6" }}>Flit</span>
            <span className="text-xl font-black tracking-tight text-gray-900">Union</span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="주요 메뉴" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-white text-sm font-bold rounded-lg btn-primary"
          >
            무료 상담 신청
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 animate-slide-down" aria-label="모바일 메뉴">
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <a
                  href="#contact"
                  className="block px-4 py-2.5 text-white text-sm font-bold rounded-lg text-center btn-primary"
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
