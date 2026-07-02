"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/sourcing", label: "Sourcing" },
  { href: "/heritage", label: "Heritage" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1B2942", color: "rgba(244,239,229,0.5)" }}>
      {/* Top rule */}
      <div style={{ height: "1px", background: "rgba(244,239,229,0.08)" }} />

      <div
        className="footer-grid"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "4rem 2.5rem 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
        }}
      >
        {/* Brand */}
        <div>
          <p
            className="font-display"
            style={{
              fontSize: "1rem",
              fontWeight: 300,
              letterSpacing: "0.25em",
              color: "rgba(244,239,229,0.85)",
              marginBottom: "0.5rem",
            }}
          >
            LAMORA
          </p>
          <p
            className="font-sans"
            style={{ fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.35 }}
          >
            Cashmere
          </p>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }} aria-label="Footer navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(244,239,229,0.45)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(244,239,229,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,239,229,0.45)")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Newsletter */}
        <FooterNewsletter />
      </div>

      {/* Bottom */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1.5rem 2.5rem",
          borderTop: "1px solid rgba(244,239,229,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p className="font-sans" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", opacity: 0.25 }}>
          © {new Date().getFullYear()} LAMORA
        </p>
        <p className="font-sans" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", opacity: 0.25 }}>
          {/* PLACEHOLDER: add privacy + terms links */}
          Privacy · Terms
        </p>
      </div>
    </footer>
  );
}

function FooterNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <p
        className="font-sans"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: 0.35,
          marginBottom: "1rem",
        }}
      >
        Newsletter
      </p>
      {submitted ? (
        <p className="font-sans" style={{ fontSize: "0.75rem", opacity: 0.5 }}>
          Thank you.
        </p>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          style={{ display: "flex", gap: "0" }}
          aria-label="Newsletter signup"
        >
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            type="email"
            placeholder="Email"
            required
            className="font-sans"
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid rgba(244,239,229,0.15)",
              padding: "0.6rem 0.75rem",
              fontSize: "0.72rem",
              color: "rgba(244,239,229,0.7)",
              outline: "none",
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            className="font-sans"
            style={{
              background: "transparent",
              border: "1px solid rgba(244,239,229,0.15)",
              borderLeft: "none",
              padding: "0.6rem 0.85rem",
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(244,239,229,0.45)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            →
          </button>
        </form>
      )}
    </div>
  );
}
