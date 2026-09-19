import Image from "next/image";

/** 카탈로그 품목 카드 그리드. 사진이 없는 품목은 제목 해시 기반 그라데이션으로 대체한다. */

const GRADIENTS = [
  "linear-gradient(135deg, #1e3a8a 0%, #3182f6 100%)",
  "linear-gradient(135deg, #4a1d96 0%, #a855f7 100%)",
  "linear-gradient(135deg, #881337 0%, #f43f5e 100%)",
  "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
  "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
  "linear-gradient(135deg, #134e4a 0%, #14b8a6 100%)",
];

/** 같은 품목은 항상 같은 색이 나오도록 slug 해시로 고정 */
export function gradientFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

export type CatalogEntry = {
  slug: string;
  title: string;
  desc: string;
  photo?: string;
  /** 우상단 배지 (예: 보유 셀러 수) */
  badge?: string;
};

export default function CatalogGrid({ items, index }: { items: CatalogEntry[]; index?: boolean }) {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <li key={item.slug} id={item.slug} className="scroll-mt-28">
          <article
            className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="relative w-full h-36 overflow-hidden" style={{ background: gradientFor(item.slug) }}>
              {item.photo ? (
                <Image
                  src={item.photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : null}
              {index ? (
                <span
                  className="absolute top-3 left-3 text-xs font-black px-2 py-1 rounded-md"
                  style={{ background: "rgba(0,0,0,0.45)", color: "#ffffff" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              {item.badge ? (
                <span
                  className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.92)", color: "#1b64da" }}
                >
                  {item.badge}
                </span>
              ) : null}
            </div>

            <div className="p-5 flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed break-keep">{item.desc}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
