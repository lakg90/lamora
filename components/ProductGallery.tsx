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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Main image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#F4EFE5",
        }}
      >
        <Image
          src={images[active]}
          alt={`${product.name} in ${product.colourway.label}`}
          fill
          className="object-contain"
          style={{
            mixBlendMode: "multiply",
            padding: "1rem",
            transition: "opacity 0.3s ease",
          }}
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto" }}>
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              style={{
                position: "relative",
                flexShrink: 0,
                width: "72px",
                height: "90px",
                background: "#F4EFE5",
                border: active === i ? "1.5px solid #AE8B4C" : "1.5px solid transparent",
                cursor: "pointer",
                overflow: "hidden",
                padding: 0,
                transition: "border-color 0.2s ease",
              }}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-contain"
                style={{ mixBlendMode: "multiply", padding: "4px" }}
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
