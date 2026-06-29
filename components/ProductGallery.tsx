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
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative shrink-0 w-16 h-20 md:w-18 md:h-24 overflow-hidden border transition-colors duration-200 ${
              active === i ? "border-brass" : "border-line hover:border-ink-soft"
            }`}
          >
            <Image
              src={src}
              alt={`${product.name} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="72px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-paper-raised">
        <Image
          src={images[active]}
          alt={`${product.name} in ${product.colourway.label}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
      </div>
    </div>
  );
}
