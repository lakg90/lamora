import { notFound } from "next/navigation";
import { products, getProduct, getRelated } from "@/lib/products";
import type { Metadata } from "next";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.colourway.label}`,
    description: product.shortDescription,
    openGraph: {
      images: [{ url: product.images.main }],
    },
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelated(product);

  return <ProductDetail product={product} related={related} />;
}
