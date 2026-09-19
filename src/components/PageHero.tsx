import Link from "next/link";
import type { ReactNode } from "react";

/** /about · /portfolio 등 서브페이지 공통 헤더 (홈 HeroSection 과 톤을 맞춘 네이비 그라데이션) */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumb: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden pt-16"
      style={{ background: "linear-gradient(135deg, #050e1f 0%, #0a1e3d 50%, #0c2553 100%)" }}
      aria-labelledby="page-hero-heading"
    >
      <div
        className="absolute top-0 right-1/4 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(49,130,246,0.18) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Breadcrumb */}
        <nav aria-label="현재 위치" className="mb-6">
          <ol className="flex items-center gap-2 text-sm" style={{ color: "#93a4c0" }}>
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                홈
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-white font-medium">{breadcrumb}</li>
          </ol>
        </nav>

        <span
          className="inline-flex items-center text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-5"
          style={{ background: "rgba(49,130,246,0.18)", border: "1px solid rgba(49,130,246,0.4)", color: "#93c5fd" }}
        >
          {eyebrow}
        </span>

        <h1
          id="page-hero-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 max-w-3xl"
        >
          {title}
        </h1>

        <p className="text-base sm:text-lg leading-relaxed max-w-2xl" style={{ color: "#c7d5ea" }}>
          {description}
        </p>

        {children}
      </div>
    </section>
  );
}
