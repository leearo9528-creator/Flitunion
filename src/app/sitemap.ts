import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const BASE_URL = "https://flitunion.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    // 서비스 상세는 services.ts 에서 파생 — 서비스를 추가해도 사이트맵을 따로 고칠 필요가 없다
    ...services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
