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
      {/*
        object-fit: cover + overflow hidden means the studio background is CROPPED OUT.
        Every card shows only the textile pattern, filling the frame identically.
        Hover scale zooms into the product itself, not into white space — consistent across all.
      */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "#EAE5DB", // neutral mid-point — barely visible behind cover
        }}
      >
        <Image
          src={showAlt ? product.images.alt! : product.images.main}
          alt={`${product.name} in ${product.colourway.label}`}
          fill
          className="object-cover"
          style={{
            objectPosition: "center 25%",   // favour the pattern, not the fringe
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
