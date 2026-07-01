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

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ display: "block", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*
        object-fit: contain shows the full throw. mix-blend-mode: multiply maps
        the studio's near-white backgrounds to the site cream (#F4EFE5) so all
        cards share the same background regardless of how warm or cool the photo was.
        On hover, crossfade to the detail (pattern close-up) image — never shows
        thickness layers, just the weave pattern.
      */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "#F4EFE5",
        }}
      >
        <Image
          src={product.images.main}
          alt={`${product.name} in ${product.colourway.label}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: "contain",
            mixBlendMode: "multiply",
            opacity: hovered && product.images.flat ? 0 : 1,
            transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {product.images.flat && (
          <Image
            src={product.images.flat}
            alt={`${product.name} flat view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              objectFit: "contain",
              mixBlendMode: "multiply",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        )}
      </div>

      {/* Caption */}
      <div style={{ paddingTop: "0.9rem" }}>
        <p
          className="font-sans"
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
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
            marginBottom: "0.2rem",
            letterSpacing: "0.02em",
          }}
        >
          {product.name}
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: "0.7rem",
            color: "#6B665C",
            letterSpacing: "0.04em",
          }}
        >
          From {formatPrice(fromPrice)}
        </p>
      </div>
    </Link>
  );
}
