import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | 플릿 유니온(Flit Union)`,
    description: service.heroDesc,
    alternates: { canonical: `https://flitunion.co.kr/services/${service.slug}` },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}
