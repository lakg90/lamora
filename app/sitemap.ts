import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lamora.com"; // PLACEHOLDER

export default function sitemap(): MetadataRoute.Sitemap {
  const static_routes = ["/", "/shop", "/sourcing", "/heritage", "/contact"].map(
    (route) => ({
      url: `${BASE}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })
  );

  const product_routes = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...static_routes, ...product_routes];
}
