"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

type Phase = "idle" | "logo" | "sub" | "out" | "done";

export default function EntranceSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const finish = useCallback(() => {
    setPhase("out");
    setTimeout(() => {
      sessionStorage.setItem("lamora-intro-seen", "1");
      setPhase("done");
      onDone();
    }, 1000);
  }, [onDone]);

  useEffect(() => {
    if (sessionStorage.getItem("lamora-intro-seen")) {
      setPhase("done");
      onDone();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("lamora-intro-seen", "1");
      setPhase("done");
      onDone();
      return;
    }

    const onKey = () => finish();
    document.addEventListener("keydown", onKey);

    const t1 = setTimeout(() => setPhase("logo"), 100);
    const t2 = setTimeout(() => setPhase("sub"), 1400);
    const t3 = setTimeout(() => finish(), 3600);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.removeEventListener("keydown", onKey);
    };
  }, [finish, onDone]);

  if (phase === "done") return null;

  const logoVisible = phase === "logo" || phase === "sub" || phase === "out";
  const subVisible  = phase === "sub" || phase === "out";
  const isOut       = phase === "out";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#1B2942",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isOut ? 0 : 1,
        transform: isOut ? "scale(1.015)" : "scale(1)",
        transition: isOut
          ? "opacity 1s cubic-bezier(0.76,0,0.24,1), transform 1s cubic-bezier(0.76,0,0.24,1)"
          : "none",
        pointerEvents: isOut ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      {/* Logo — already white on navy, no filters needed */}
      <div
        style={{
          position: "relative",
          width: "clamp(240px, 38vw, 420px)",
          aspectRatio: "1280 / 640",
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)",
          transitionDelay: logoVisible ? "0s" : "0s",
        }}
      >
        <Image
          src="/brand/lamora-logo.png"
          alt="LAMORA"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 280px, 420px"
          priority
        />
      </div>

      {/* Tagline */}
      <p
        className="font-sans"
        style={{
          marginTop: "2.5rem",
          fontSize: "0.58rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(244,239,229,0.35)",
          opacity: subVisible ? 1 : 0,
          transition: "opacity 0.9s ease",
          transitionDelay: subVisible ? "0.2s" : "0s",
        }}
      >
        Pure cashmere
      </p>

      {/* Enter button */}
      <button
        onClick={finish}
        className="font-sans"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(244,239,229,0.28)",
          background: "none",
          border: "none",
          cursor: "pointer",
          opacity: subVisible ? 1 : 0,
          transition: "opacity 0.7s ease",
          transitionDelay: subVisible ? "0.5s" : "0s",
          padding: "0.5rem 1rem",
        }}
        aria-label="Enter site"
      >
        Enter
      </button>
    </div>
  );
}
