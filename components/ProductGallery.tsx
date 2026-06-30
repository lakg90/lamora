"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

type Props = { product: Product };

export default function ProductGallery({ product }: Props) {
  const images = [
    product.images.main,
    product.images.detail,
    product.images.alt,
    product.images.lifestyle,
  ].filter((src): src is string => !!src);

  const [active, setActive] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Main image — contain shows full throw; multiply normalises studio background to site cream */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "#F4EFE5",
        }}
      >
        <Image
          src={images[active]}
          alt={`${product.name} in ${product.colourway.label}`}
          fill
          style={{
            objectFit: active === 0 ? "contain" : "cover",
            mixBlendMode: "multiply",
            transition: "opacity 0.35s ease",
          }}
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: "0.6rem", overflowX: "auto" }}>
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
              style={{
                position: "relative",
                flexShrink: 0,
                width: "68px",
                height: "85px",
                background: "#F4EFE5",
                border: "none",
                outline: active === i ? "1.5px solid #AE8B4C" : "1.5px solid transparent",
                outlineOffset: "2px",
                cursor: "pointer",
                overflow: "hidden",
                padding: 0,
                transition: "outline-color 0.2s ease",
              }}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                style={{
                  objectFit: i === 0 ? "contain" : "cover",
                  mixBlendMode: "multiply",
                }}
                sizes="68px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
