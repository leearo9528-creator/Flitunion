"use client";

import { useState } from "react";

/**
 * 협력사 등록 폼.
 *
 * ⚠️ 항목을 늘리지 말 것 — 입력 항목 수가 곧 이탈률이다.
 * 사업자등록·영업신고·위생교육·필요 전력·차량 대수 같은 세부 조건은 **섭외 확정 단계**에서 확인한다.
 * 여기서 받아야 하는 건 "연락할 수 있는 업체인가 + 무엇을 파는가 + 사진을 받을 수 있는가" 뿐이다.
 */

type PartnerType = "foodtruck" | "seller";

type FormState = {
  partnerType: PartnerType | "";
  brandName: string;
  phone: string;
  items: string;
  region: string;
  link: string;
  message: string;
};

const initialForm: FormState = {
  partnerType: "",
  brandName: "",
  phone: "",
  items: "",
  region: "",
  link: "",
  message: "",
};

const TYPES: { value: PartnerType; label: string; desc: string; icon: string }[] = [
  { value: "foodtruck", label: "푸드트럭", desc: "행사 출장이 가능한 푸드트럭·케이터링", icon: "🚚" },
  { value: "seller", label: "셀러", desc: "플리마켓·팝업 참가 셀러 · 공방 · 브랜드", icon: "🏪" },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors";

export default function PartnerForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const itemsLabel =
    form.partnerType === "foodtruck" ? "대표 메뉴" : form.partnerType === "seller" ? "판매 품목" : "대표 품목 · 메뉴";
  const itemsPlaceholder =
    form.partnerType === "foodtruck"
      ? "예) 화덕피자, 감자튀김 사이드"
      : "예) 레진 키링, 그립톡, 폰 비즈키링";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "등록 신청에 실패했습니다.");
      setStatus("done");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "등록 신청에 실패했습니다.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-2xl p-8 sm:p-10 text-center"
        style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
      >
        <span className="text-4xl" aria-hidden="true">🤝</span>
        <h3 className="text-xl font-black text-gray-900 mt-4 mb-2">등록 신청이 접수되었습니다</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 break-keep">
          담당자가 확인 후 연락드립니다. 조건이 맞는 행사가 있을 때 우선 연락드리겠습니다.
          <br />
          사진이나 포트폴리오를 아직 보내지 못하셨다면{" "}
          <a href="mailto:hello@flitunion.com" className="font-semibold underline" style={{ color: "#16a34a" }}>
            hello@flitunion.com
          </a>
          {" "}으로 보내주시면 프로필에 함께 수록해 드립니다.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          다른 업체 등록하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl p-6 sm:p-8 bg-white border border-gray-100" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      {/* 구분 */}
      <fieldset className="mb-6">
        <legend className="text-sm font-bold text-gray-900 mb-3">
          구분 <span style={{ color: "#3182f6" }}>*</span>
        </legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {TYPES.map((t) => {
            const active = form.partnerType === t.value;
            return (
              <button
                key={t.value}
                type="button"
                onClick={() => set("partnerType", t.value)}
                aria-pressed={active}
                className="text-left px-4 py-3.5 rounded-xl border transition-all"
                style={{
                  borderColor: active ? "#3182f6" : "#e5e7eb",
                  background: active ? "#eff6ff" : "#ffffff",
                  boxShadow: active ? "0 0 0 3px rgba(49,130,246,0.12)" : "none",
                }}
              >
                <span className="text-lg mr-2" aria-hidden="true">{t.icon}</span>
                <span className="text-sm font-bold text-gray-900">{t.label}</span>
                <span className="block text-xs text-gray-500 mt-1 break-keep">{t.desc}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="brandName" className="block text-sm font-bold text-gray-900 mb-2">
            업체명 · 활동명 <span style={{ color: "#3182f6" }}>*</span>
          </label>
          <input
            id="brandName"
            required
            value={form.brandName}
            onChange={(e) => set("brandName", e.target.value)}
            className={inputClass}
            placeholder="예) 플릿공방"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
            연락처 <span style={{ color: "#3182f6" }}>*</span>
          </label>
          <input
            id="phone"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClass}
            placeholder="010-0000-0000"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="items" className="block text-sm font-bold text-gray-900 mb-2">
          {itemsLabel} <span style={{ color: "#3182f6" }}>*</span>
        </label>
        <input
          id="items"
          required
          value={form.items}
          onChange={(e) => set("items", e.target.value)}
          className={inputClass}
          placeholder={itemsPlaceholder}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="region" className="block text-sm font-bold text-gray-900 mb-2">
          주 활동 지역 <span style={{ color: "#3182f6" }}>*</span>
        </label>
        <input
          id="region"
          required
          value={form.region}
          onChange={(e) => set("region", e.target.value)}
          className={inputClass}
          placeholder="예) 수도권 전역 / 대구·경북"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="link" className="block text-sm font-bold text-gray-900 mb-2">
          사진 · SNS 링크
          <span className="ml-2 text-xs font-medium text-gray-400">선택 · 제출하시면 프로필 등록이 빨라집니다</span>
        </label>
        <input
          id="link"
          value={form.link}
          onChange={(e) => set("link", e.target.value)}
          className={inputClass}
          placeholder="인스타그램 · 블로그 · 스마트스토어 주소"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
          하고 싶은 말
          <span className="ml-2 text-xs font-medium text-gray-400">선택</span>
        </label>
        <textarea
          id="message"
          rows={3}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className={inputClass + " resize-none"}
          placeholder="참가 이력, 선호하는 행사 유형, 문의사항 등"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm mb-4 px-4 py-3 rounded-xl" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>
          {error} 문제가 계속되면 hello@flitunion.com 으로 보내주시기 바랍니다.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending" || !form.partnerType}
        className="w-full px-6 py-4 text-white font-bold rounded-xl btn-primary disabled:cursor-not-allowed"
      >
        {status === "sending" ? "접수 중…" : "협력사 등록 신청하기"}
      </button>

      <p className="text-xs text-gray-500 leading-relaxed mt-4 break-keep">
        등록은 무료이며, 신청하신다고 하여 참가 의무가 발생하지는 않습니다. 사업자등록·영업신고·위생교육·필요 전력 같은
        세부 조건은 실제 섭외가 진행될 때 확인합니다. 보내주신 연락처는 행사 섭외 연락 외의 용도로 사용하지 않습니다.
      </p>
    </form>
  );
}
