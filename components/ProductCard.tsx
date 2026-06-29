"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { CURRENCY } from "@/lib/products";

type Props = { product: Product };

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const fromPrice = Math.min(...product.weights.map((w) => w.price));
  const showAlt = hovered && !!product.images.alt && product.images.alt !== product.images.main;

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ display: "block", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — white bg melts into cream via multiply */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#F4EFE5", // paper — white studio bg becomes this
        }}
      >
        <Image
          src={showAlt ? product.images.alt! : product.images.main}
          alt={`${product.name} in ${product.colourway.label}`}
          fill
          className="object-contain"
          style={{
            mixBlendMode: "multiply",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            padding: "0.5rem",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Caption */}
      <div style={{ paddingTop: "1rem" }}>
        <p
          className="font-sans"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6B665C",
            marginBottom: "0.3rem",
          }}
        >
          {product.colourway.label}
        </p>
        <p
          className="font-display"
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            color: "#1B2942",
            marginBottom: "0.25rem",
            letterSpacing: "0.02em",
          }}
        >
          {product.name}
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: "0.72rem",
            color: "#6B665C",
            letterSpacing: "0.04em",
          }}
        >
          From {fromPrice === 185 ? "£185" : formatPrice(fromPrice)}
        </p>
      </div>
    </Link>
  );
}
