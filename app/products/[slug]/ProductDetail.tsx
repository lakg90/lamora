"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, WeightId } from "@/lib/products";
import { CURRENCY } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
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
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div style={{ background: "#F4EFE5", minHeight: "100vh" }}>
      {/* Nav band */}
      <div style={{ background: "#1B2942", paddingTop: "4rem", paddingBottom: "1rem", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
        <nav style={{ maxWidth: "1400px", margin: "0 auto" }} aria-label="Breadcrumb">
          <ol
            className="font-sans"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}
          >
            <li>
              <Link href="/" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,229,0.35)", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li style={{ color: "rgba(244,239,229,0.2)", fontSize: "0.6rem" }} aria-hidden="true">·</li>
            <li>
              <Link href="/shop" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,229,0.35)", textDecoration: "none" }}>
                Shop
              </Link>
            </li>
            <li style={{ color: "rgba(244,239,229,0.2)", fontSize: "0.6rem" }} aria-hidden="true">·</li>
            <li>
              <span className="font-sans" style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(244,239,229,0.6)" }}>
                {product.name}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "4rem 2.5rem 6rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="product-grid"
        >
          {/* Gallery */}
          <Reveal>
            <ProductGallery product={product} />
          </Reveal>

          {/* Details */}
          <Reveal delay={100}>
            <div style={{ maxWidth: "440px" }}>
              {/* Colourway dots — shows all colourways for this pattern */}
              <ColourwayNav product={product} />

              <p
                className="font-sans"
                style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#AE8B4C", marginBottom: "0.75rem" }}
              >
                {product.colourway.label}
              </p>
              <h1
                className="font-display"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, color: "#1B2942", marginBottom: "0.5rem", letterSpacing: "0.02em", lineHeight: 1.1 }}
              >
                {product.name}
              </h1>
              <p
                className="font-sans"
                style={{ fontSize: "0.7rem", color: "#6B665C", letterSpacing: "0.06em", marginBottom: "2rem" }}
              >
                {product.composition}
              </p>

              {/* Price */}
              <p
                className="font-display"
                style={{ fontSize: "1.6rem", fontWeight: 300, color: "#1B2942", marginBottom: "1.5rem", letterSpacing: "0.02em" }}
              >
                {formatPrice(activeWeight.price)}
              </p>

              {/* Weight selector */}
              <div style={{ marginBottom: "1.75rem" }}>
                <p className="font-sans" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B665C", marginBottom: "0.75rem" }}>
                  Weight
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }} role="radiogroup" aria-label="Select weight">
                  {product.weights.map((w) => (
                    <button
                      key={w.id}
                      role="radio"
                      aria-checked={selectedWeight === w.id}
                      onClick={() => setSelectedWeight(w.id)}
                      className="font-sans"
                      style={{
                        padding: "0.6rem 1.2rem",
                        fontSize: "0.7rem",
                        letterSpacing: "0.06em",
                        border: selectedWeight === w.id ? "1px solid #1B2942" : "1px solid #D8CCB8",
                        background: selectedWeight === w.id ? "#1B2942" : "transparent",
                        color: selectedWeight === w.id ? "#F4EFE5" : "#6B665C",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
                <p className="font-sans" style={{ fontSize: "0.65rem", color: "#6B665C", marginTop: "0.5rem", opacity: 0.7 }}>
                  {activeWeight.gsm}gsm
                </p>
              </div>

              {/* Description */}
              <p
                className="font-sans"
                style={{ fontSize: "0.85rem", color: "#6B665C", lineHeight: 1.75, marginBottom: "2rem" }}
              >
                {product.description}
              </p>

              {/* Quantity + Add */}
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #D8CCB8" }}>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{ width: "40px", height: "48px", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#6B665C" }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    className="font-sans"
                    style={{ width: "32px", textAlign: "center", fontSize: "0.85rem", color: "#1B2942" }}
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{ width: "40px", height: "48px", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#6B665C" }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="font-sans"
                  style={{
                    flex: 1,
                    background: added ? "#2C3A55" : "#1B2942",
                    color: "#F4EFE5",
                    border: "none",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                    padding: "0 1.5rem",
                  }}
                >
                  {added ? "Added to bag" : "Add to bag"}
                </button>
              </div>

              {/* Accordions */}
              <div style={{ marginTop: "2.5rem", borderTop: "1px solid #D8CCB8" }}>
                <Accordion title="Care instructions">
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {product.care.map((c) => (
                      <li key={c} className="font-sans" style={{ fontSize: "0.8rem", color: "#6B665C", lineHeight: 1.6 }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </Accordion>
                <Accordion title="Composition &amp; specifications">
                  <div className="font-sans" style={{ fontSize: "0.8rem", color: "#6B665C", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <p>{product.composition}</p>
                    {product.weights.map((w) => (
                      <p key={w.id}>{w.label}: {w.gsm}gsm — {formatPrice(w.price)}</p>
                    ))}
                  </div>
                </Accordion>
                <Accordion title="Delivery &amp; returns">
                  <div className="font-sans" style={{ fontSize: "0.8rem", color: "#6B665C", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {/* PLACEHOLDER: add real shipping and returns policy */}
                    <p>Standard delivery: 3–7 business days.</p>
                    <p>Returns accepted within 30 days in original condition.</p>
                  </div>
                </Accordion>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ background: "#FBF8F1", padding: "5rem 2.5rem" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <Reveal>
              <h2
                className="font-display"
                style={{ fontSize: "1rem", fontWeight: 400, color: "#1B2942", letterSpacing: "0.04em", marginBottom: "3rem" }}
              >
                You may also like
              </h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "2.5rem" }}>
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 100}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

function ColourwayNav({ product }: { product: Product }) {
  const colourways = [
    { id: "fjord", hex: "#8DA6BE", label: "Fjord" },
    { id: "dune",  hex: "#C2A98A", label: "Dune" },
    { id: "slate", hex: "#7E8488", label: "Slate" },
  ];
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
      {colourways.map((c) => (
        <Link
          key={c.id}
          href={`/products/${product.pattern}-${c.id}`}
          title={c.label}
          style={{
            display: "block",
            width: "22px",
            height: "22px",
            background: c.hex,
            border: product.colourway.id === c.id ? "2px solid #1B2942" : "2px solid transparent",
            outline: product.colourway.id === c.id ? "1px solid #D8CCB8" : "none",
            outlineOffset: "1px",
            transition: "border-color 0.2s",
          }}
          aria-label={`View in ${c.label}`}
          aria-current={product.colourway.id === c.id ? "page" : undefined}
        />
      ))}
    </div>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #D8CCB8" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", padding: "1.1rem 0", background: "none", border: "none", cursor: "pointer" }}
        aria-expanded={open}
      >
        <span className="font-sans" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2942" }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <span style={{ color: "#6B665C", fontSize: "1rem", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.25s ease", lineHeight: 1 }} aria-hidden="true">
          +
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: "1.25rem" }}>{children}</div>
      )}
    </div>
  );
}
