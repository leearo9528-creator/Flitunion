import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/data/services";
import ServiceDetailClient from "./ServiceDetailClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | 플릿 유니온(Flit Union)`,
    description: service.heroDesc,
    alternates: { canonical: `https://flitunion.com/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailClient service={service} />;
}
