"use client";

import { useState } from "react";

type FormState = {
  name: string;
  phone: string;
  location: string;
  eventDate: string;
  spaceType: string;
  message: string;
};

const initialForm: FormState = {
  name: "", phone: "", location: "", eventDate: "", spaceType: "", message: "",
};

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "전화 상담",
    value: "010-8018-8492",
    sub: "평일 09:00 – 18:00",
    href: "tel:+821080188492",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "이메일",
    value: "hello@flitunion.co.kr",
    sub: "24시간 접수, 영업일 기준 응답",
    href: "mailto:hello@flitunion.co.kr",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    label: "카카오채널",
    value: "@flitunion",
    sub: "채팅 상담 가능",
    href: "https://open.kakao.com/o/sZ5YZ4ni",
  },
];

const spaceTypes = [
  { value: "flea-market", label: "플리마켓" },
  { value: "night-market", label: "야시장" },
  { value: "food-truck", label: "푸드트럭 이벤트" },
  { value: "popup", label: "팝업스토어" },
  { value: "university", label: "대학교 축제" },
  { value: "brand", label: "기업·브랜드 행사" },
  { value: "rental-only", label: "장비 렌탈만" },
  { value: "other", label: "기타" },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("서버 오류");
      setSubmitted(true);
    } catch {
      alert("문의 접수 중 오류가 발생했습니다. 직접 전화(010-8018-8492)로 연락해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-400 transition bg-white";

  return (
    <section
      id="contact"
      className="py-20"
      style={{ background: "linear-gradient(160deg, #050e1f 0%, #0a1e3d 60%, #0c2553 100%)" }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#93c5fd" }}>
              Contact
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4"
            >
              플리마켓·야시장 운영,
              <br />
              지금 바로 무료 상담받으세요
            </h2>
            <p className="leading-relaxed mb-10 text-sm" style={{ color: "#94a3b8" }}>
              공간 위치와 행사 유형을 알려주시면 48시간 이내에 맞춤 기획안을 무료로 제안드립니다.
            </p>

            <ul className="space-y-5" aria-label="연락처 정보">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(49,130,246,0.2)", color: "#93c5fd" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: "#64748b" }}>{item.label}</p>
                    <a href={item.href} className="font-semibold text-white hover:text-blue-300 transition-colors text-sm">
                      {item.value}
                    </a>
                    <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Trust indicators */}
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { value: "48h", label: "기획안 제안" },
                  { value: "50+", label: "운영 행사" },
                  { value: "98%", label: "재의뢰율" },
                ].map((s) => (
                  <div key={s.label} className="text-center rounded-xl py-4 px-2" style={{ background: "rgba(49,130,246,0.12)" }}>
                    <p className="text-xl font-black" style={{ color: "#3182f6" }}>{s.value}</p>
                    <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#eff6ff" }}
                  aria-hidden="true"
                >
                  <svg className="w-8 h-8" style={{ color: "#3182f6" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">문의가 접수되었습니다!</h3>
                <p className="text-gray-600 text-sm leading-relaxed">48시간 이내에 맞춤 기획안과 함께 연락드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="무료 상담 신청 폼">
                <h3 className="text-lg font-bold text-gray-900 mb-6">무료 상담 신청</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      이름 / 담당자명 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required autoComplete="name"
                      value={form.name} onChange={handleChange} placeholder="홍길동"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      연락처 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required autoComplete="tel"
                      value={form.phone} onChange={handleChange} placeholder="010-0000-0000"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="spaceType" className="block text-sm font-medium text-gray-700 mb-1.5">
                      행사 유형 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="spaceType" name="spaceType" required
                      value={form.spaceType} onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>행사 유형을 선택하세요</option>
                      {spaceTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                      공간 위치 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="location" name="location" type="text" required
                      value={form.location} onChange={handleChange}
                      placeholder="서울 강남구 역삼동 (지역 및 건물명)"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                      행사 예정일
                    </label>
                    <input
                      id="eventDate" name="eventDate" type="date"
                      value={form.eventDate} onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      추가 문의사항
                    </label>
                    <textarea
                      id="message" name="message" rows={3}
                      value={form.message} onChange={handleChange}
                      placeholder="공간 규모, 원하시는 행사 콘셉트, 예산, 푸드트럭 필요 여부 등을 자유롭게 적어주세요."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-3.5 disabled:opacity-60 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                  style={{ background: "#3182f6" }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#1b64da"; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#3182f6"; }}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      접수 중...
                    </>
                  ) : "무료 상담 신청하기"}
                </button>

                <p className="mt-3 text-xs text-gray-400 text-center">
                  개인정보는 상담 목적 외에 사용되지 않으며, 상담 완료 후 즉시 파기됩니다.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
