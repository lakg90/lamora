"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, WeightId } from "@/lib/products";
import { CURRENCY } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import MeanderRule from "@/components/MeanderRule";
import Reveal from "@/components/Reveal";
import { useCart } from "@/lib/cart";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
  }).format(amount);
}

type Props = { product: Product; related: Product[] };

export default function ProductDetail({ product, related }: Props) {
  const [selectedWeight, setSelectedWeight] = useState<WeightId>("classic");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const activeWeight = product.weights.find((w) => w.id === selectedWeight)!;

  function handleAdd() {
    addItem({
      slug: product.slug,
      weightId: activeWeight.id,
      name: product.name,
      colourwayLabel: product.colourway.label,
      weightLabel: activeWeight.label,
      price: activeWeight.price,
      qty,
      image: product.images.main,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-paper">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 px-6 md:px-16 bg-ink">
        <nav className="max-w-7xl mx-auto" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[0.65rem] font-sans tracking-wider uppercase text-paper/40">
            <li><Link href="/" className="hover:text-paper/70 transition-colors">Home</Link></li>
            <li aria-hidden="true">·</li>
            <li><Link href="/shop" className="hover:text-paper/70 transition-colors">Shop</Link></li>
            <li aria-hidden="true">·</li>
            <li className="text-paper/60">{product.name}</li>
          </ol>
        </nav>
      </div>
      <MeanderRule color="brass" />

      {/* Main product layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Gallery */}
          <Reveal>
            <ProductGallery product={product} />
          </Reveal>

          {/* Details */}
          <Reveal delay={150}>
            <div className="max-w-sm">
              <p className="text-eyebrow-brass mb-3">{product.colourway.label}</p>
              <h1 className="text-display-md font-display text-ink mb-4">
                {product.name}
              </h1>
              <div className="w-10 h-px bg-brass mb-5" />

              {/* Price + weight selector */}
              <div className="mb-6">
                <p className="font-display text-2xl text-ink font-light mb-4">
                  {formatPrice(activeWeight.price)}
                </p>
                <div
                  className="flex gap-2"
                  role="radiogroup"
                  aria-label="Select weight"
                >
                  {product.weights.map((w) => (
                    <button
                      key={w.id}
                      role="radio"
                      aria-checked={selectedWeight === w.id}
                      onClick={() => setSelectedWeight(w.id)}
                      className={`px-4 py-2 text-xs font-sans tracking-wide border transition-all duration-200 ${
                        selectedWeight === w.id
                          ? "bg-ink text-paper border-ink"
                          : "bg-transparent text-muted border-line hover:border-ink-soft"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-muted leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Composition */}
              <p className="font-sans text-xs text-muted/70 mb-6">
                {product.composition}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-5">
                <label className="text-eyebrow" htmlFor={`qty-${product.slug}`}>
                  Quantity
                </label>
                <div className="flex items-center border border-line">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-muted hover:text-ink transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    id={`qty-${product.slug}`}
                    className="w-8 text-center font-sans text-sm text-ink"
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-muted hover:text-ink transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to bag */}
              <button
                onClick={handleAdd}
                className="w-full bg-ink text-paper font-sans text-xs tracking-widest uppercase py-4 hover:bg-ink-soft transition-colors duration-200 mb-3"
              >
                {added ? "Added to bag" : "Add to bag"}
              </button>

              {/* Accordions */}
              <div className="mt-8 border-t border-line">
                <Accordion title="Care">
                  <ul className="space-y-2">
                    {product.care.map((c) => (
                      <li key={c} className="font-sans text-sm text-muted">
                        {c}
                      </li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Composition &amp; spec">
                  <div className="space-y-2 font-sans text-sm text-muted">
                    <p>{product.composition}</p>
                    {product.weights.map((w) => (
                      <p key={w.id}>
                        {w.label}: {w.gsm}gsm — {formatPrice(w.price)}
                      </p>
                    ))}
                  </div>
                </Accordion>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <MeanderRule color="line" />

      {/* Related throws */}
      {related.length > 0 && (
        <div className="bg-paper-raised py-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <p className="text-eyebrow mb-2">You may also like</p>
              <h2 className="text-display-md font-display text-ink mb-10">
                Related throws
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 120}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full justify-between items-center py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-sans text-sm text-ink tracking-wide">{title}</span>
        <span
          className="text-muted text-lg transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}
