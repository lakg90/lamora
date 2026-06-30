"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EntranceSequence from "@/components/EntranceSequence";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const ALL_PRODUCTS = products;

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <EntranceSequence onDone={() => setIntroComplete(true)} />

      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
        className="motion-reduce:opacity-100"
      >

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section style={{ position: "relative", height: "100svh", minHeight: "600px" }}>
          <Image
            src="/lifestyle/sofa.jpg"
            alt="LAMORA Laurel Dune throw draped over a sofa"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{
              transform: "scale(1.04)",
              animation: "heroSettle 2s cubic-bezier(0.16,1,0.3,1) forwards",
            }}
          />
          {/* very light vignette only at bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(27,41,66,0.55) 0%, transparent 55%)",
            }}
          />

          {/* Hero text — bottom left */}
          <div
            style={{
              position: "absolute",
              bottom: "4rem",
              left: "2.5rem",
              right: "2.5rem",
              maxWidth: "520px",
            }}
          >
            <Reveal>
              <h1
                className="font-display text-paper"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: "0.02em",
                  marginBottom: "1.5rem",
                }}
              >
                Cashmere that keeps its quiet.
              </h1>
              <Link
                href="/shop"
                className="font-sans text-paper"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.35)",
                  paddingBottom: "2px",
                  display: "inline-block",
                  opacity: 0.85,
                }}
              >
                Shop the collection
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── EDITORIAL INTRO ──────────────────────────────────────── */}
        <section style={{ background: "#F4EFE5", padding: "7rem 2.5rem" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <Reveal>
              <div style={{ maxWidth: "520px" }}>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#AE8B4C",
                    marginBottom: "1.5rem",
                  }}
                >
                  The collection
                </p>
                <p
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    fontWeight: 300,
                    color: "#1B2942",
                    lineHeight: 1.2,
                    letterSpacing: "0.01em",
                  }}
                >
                  Pure cashmere throws, woven in two patterns and three colours —
                  made to outlast the season.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── COLLECTION STATEMENT ─────────────────────────────────── */}
        <section style={{ background: "#F4EFE5" }}>
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 2.5rem 7rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            <Reveal>
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  color: "#1B2942",
                  lineHeight: 1.25,
                  letterSpacing: "0.01em",
                }}
              >
                Pure cashmere throws, woven in two patterns and three colours — made to outlast the season.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#F4EFE5" }}>
                <Image
                  src="/products/laurel-fjord-flat.jpg"
                  alt="Laurel Throw in Fjord — flat lay"
                  fill
                  style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PRODUCT GRID ──────────────────────────────────────────── */}
        <section style={{ background: "#FBF8F1", padding: "7rem 2.5rem" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "3.5rem",
                }}
              >
                <h2
                  className="font-display"
                  style={{ fontSize: "1.1rem", fontWeight: 400, color: "#1B2942", letterSpacing: "0.04em" }}
                >
                  Selected throws
                </h2>
                <Link
                  href="/shop"
                  className="font-sans"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#6B665C",
                    textDecoration: "none",
                    borderBottom: "1px solid #D8CCB8",
                    paddingBottom: "2px",
                  }}
                >
                  View all
                </Link>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2.5rem 2rem",
              }}
            >
              {ALL_PRODUCTS.map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL-BLEED DARK BAND ─────────────────────────────────── */}
        <section style={{ position: "relative", background: "#1B2942" }}>
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "7rem 2.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
          >
            <Reveal>
              <div>
                <p
                  className="font-sans text-paper"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                    marginBottom: "1.75rem",
                  }}
                >
                  Sourcing
                </p>
                <p
                  className="font-display text-paper"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 300,
                    lineHeight: 1.2,
                    marginBottom: "1.75rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  From fibre to fringe.
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(244,239,229,0.55)",
                    lineHeight: 1.75,
                    maxWidth: "360px",
                    marginBottom: "2.5rem",
                  }}
                >
                  Selected for fineness. Woven for consistency.
                  Knotted by hand at the fringe. A cloth that
                  grows softer, not worse, with time.
                </p>
                <Link
                  href="/sourcing"
                  className="font-sans text-paper"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(174,139,76,0.5)",
                    paddingBottom: "2px",
                    opacity: 0.7,
                  }}
                >
                  Learn more
                </Link>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                <Image
                  src="/products/meander-fjord-detail.jpg"
                  alt="Detail of the Meander cashmere weave"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{ transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)" }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── NEWSLETTER ────────────────────────────────────────────── */}
        <section style={{ background: "#F4EFE5", padding: "6rem 2.5rem" }}>
          <Reveal>
            <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 300,
                  color: "#1B2942",
                  marginBottom: "2.5rem",
                  letterSpacing: "0.01em",
                }}
              >
                New throws. No noise.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "flex", flexDirection: "column", gap: "0" }}
                aria-label="Newsletter signup"
              >
                <label htmlFor="home-email" className="sr-only">Email address</label>
                <input
                  id="home-email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="font-sans"
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid #D8CCB8",
                    padding: "0.75rem 0",
                    fontSize: "0.85rem",
                    color: "#1B2942",
                    outline: "none",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                  }}
                />
                <button
                  type="submit"
                  className="font-sans"
                  style={{
                    background: "#1B2942",
                    color: "#F4EFE5",
                    border: "none",
                    padding: "0.9rem 2rem",
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Reveal>
        </section>

      </div>

      <style jsx global>{`
        @keyframes heroSettle {
          from { transform: scale(1.04); }
          to   { transform: scale(1); }
        }
      `}</style>
    </>
  );
}

