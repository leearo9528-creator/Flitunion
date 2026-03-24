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
  name: "",
  phone: "",
  location: "",
  eventDate: "",
  spaceType: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: 실제 API 연결 시 이 부분을 교체하세요
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #0d2240 100%)",
      }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <span
              className="inline-block font-semibold text-sm uppercase tracking-widest mb-3"
              style={{ color: "#93c5fd" }}
            >
              Contact
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight"
            >
              플리마켓·야시장 운영,
              <br />
              지금 바로 무료 상담받으세요
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              공간 위치와 행사 유형을 알려주시면 48시간 이내에 맞춤
              기획안을 무료로 제안드립니다.
            </p>

            <ul className="space-y-6" aria-label="연락처 정보">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "전화 상담",
                  value: "010-0000-0000",
                  sub: "평일 09:00 – 18:00",
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
                },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(49,130,246,0.2)",
                      color: "#93c5fd",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* 플릿 링크 */}
            <div
              className="mt-10 flex items-center gap-3 p-4 rounded-xl border"
              style={{
                backgroundColor: "rgba(49,130,246,0.1)",
                borderColor: "rgba(49,130,246,0.2)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-black shrink-0"
                style={{ backgroundColor: "#3182f6" }}
                aria-hidden="true"
              >
                F
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">셀러라면?</p>
                <p className="text-sm font-semibold text-white">
                  플릿(Flit)에서 마켓 참가 신청하기
                </p>
              </div>
              <a
                href="https://flit-black.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold transition-colors"
                style={{ color: "#3182f6" }}
                aria-label="플릿 플랫폼으로 이동"
              >
                바로가기 →
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#ebf3fe" }} aria-hidden="true">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#3182f6" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  문의가 접수되었습니다!
                </h3>
                <p className="text-gray-500">
                  48시간 이내에 맞춤 기획안과 함께 연락드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="무료 상담 신청 폼">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  무료 상담 신청
                </h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 / 담당자명 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="홍길동"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
                      style={{ ["--tw-ring-color" as string]: "#3182f6" } as React.CSSProperties}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #3182f6")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #3182f6")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                    />
                  </div>

                  <div>
                    <label htmlFor="spaceType" className="block text-sm font-medium text-gray-700 mb-1">
                      행사 유형 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="spaceType"
                      name="spaceType"
                      required
                      value={form.spaceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none transition bg-white"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #3182f6")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                    >
                      <option value="" disabled>행사 유형을 선택하세요</option>
                      <option value="flea-market">플리마켓</option>
                      <option value="night-market">야시장</option>
                      <option value="food-truck">푸드트럭 이벤트</option>
                      <option value="popup">팝업스토어</option>
                      <option value="university">대학교 축제</option>
                      <option value="brand">기업·브랜드 행사</option>
                      <option value="rental-only">장비 렌탈만</option>
                      <option value="other">기타</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      공간 위치 <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={form.location}
                      onChange={handleChange}
                      placeholder="서울 강남구 역삼동 (지역 및 건물명)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #3182f6")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                      행사 예정일
                    </label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none transition"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #3182f6")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      추가 문의사항
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="공간 규모, 원하시는 행사 콘셉트, 예산, 푸드트럭 필요 여부 등을 자유롭게 적어주세요."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition resize-none"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #3182f6")}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full py-4 text-white font-bold text-lg rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ backgroundColor: loading ? "#93c5fd" : "#3182f6" }}
                  onMouseEnter={(e) => {
                    if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1b64da";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#3182f6";
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      접수 중...
                    </>
                  ) : (
                    "무료 상담 신청하기"
                  )}
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
