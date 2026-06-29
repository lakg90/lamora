"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/sourcing", label: "Sourcing" },
  { href: "/heritage", label: "Heritage" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(27,41,66,0.97)" : "#1B2942",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2.5rem",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark only */}
          <Link
            href="/"
            aria-label="LAMORA home"
            style={{ textDecoration: "none" }}
          >
            <span
              className="font-display text-paper"
              style={{
                fontSize: "1.1rem",
                fontWeight: 300,
                letterSpacing: "0.28em",
                lineHeight: 1,
              }}
            >
              LAMORA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: "2.5rem" }} aria-label="Main navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-paper transition-colors duration-200"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: bag + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <button
              onClick={openCart}
              aria-label={`Bag${count > 0 ? ` — ${count} item${count !== 1 ? "s" : ""}` : ""}`}
              className="text-paper transition-opacity duration-200"
              style={{ background: "none", border: "none", cursor: "pointer", position: "relative", opacity: 0.6, padding: 0 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
            >
              <BagIcon />
              {count > 0 && (
                <span
                  className="font-sans"
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-8px",
                    fontSize: "0.5rem",
                    letterSpacing: "0.05em",
                    color: "#AE8B4C",
                    fontWeight: 500,
                  }}
                >
                  {count}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-paper"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.6, padding: 0 }}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(27,41,66,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute top-0 right-0 bottom-0 flex flex-col"
            style={{ width: "280px", background: "#1B2942", padding: "2rem" }}
          >
            <button
              className="self-end text-paper mb-12"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4 }}
            >
              <CloseIcon />
            </button>
            <nav className="flex flex-col" style={{ gap: "2rem" }}>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-paper"
                  style={{ fontSize: "1.6rem", fontWeight: 300, letterSpacing: "0.05em", textDecoration: "none", opacity: 0.85 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5.5 6.5V5a3.5 3.5 0 0 1 7 0v1.5M3 6.5h12l1 9H2l1-9Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
