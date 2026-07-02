"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import type { FilterState } from "@/components/Filters";

function ShopContent() {
  const params = useSearchParams();
  const initialPattern = (params.get("pattern") ?? "all") as FilterState["pattern"];

  const [filters, setFilters] = useState<FilterState>({
    pattern: initialPattern,
    colour: "all",
  });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.pattern !== "all" && p.pattern !== filters.pattern) return false;
      if (filters.colour !== "all" && p.colourway.id !== filters.colour) return false;
      return true;
    });
  }, [filters]);

  return (
    <div style={{ background: "#F4EFE5", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "#1B2942", paddingTop: "7rem", paddingBottom: "3.5rem", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p
            className="font-sans"
            style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(244,239,229,0.35)", marginBottom: "1rem" }}
          >
            Collection
          </p>
          <h1
            className="font-display text-paper"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "0.02em" }}
          >
            Cashmere throws
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "4rem 2.5rem" }}>
        {/* Filters */}
        <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid #D8CCB8" }}>
          <Filters filters={filters} onChange={setFilters} />
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p className="font-display" style={{ fontSize: "1.5rem", color: "rgba(27,41,66,0.3)", fontWeight: 300 }}>
              No throws match those filters.
            </p>
            <button
              onClick={() => setFilters({ pattern: "all", colour: "all" })}
              className="font-sans"
              style={{
                marginTop: "1.5rem",
                background: "none",
                border: "none",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#6B665C",
                cursor: "pointer",
                borderBottom: "1px solid #D8CCB8",
                paddingBottom: "2px",
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-12">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#F4EFE5" }} />}>
      <ShopContent />
    </Suspense>
  );
}
