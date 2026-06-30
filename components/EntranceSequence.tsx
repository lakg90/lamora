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
    }, 1100);
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

    const t1 = setTimeout(() => setPhase("logo"), 80);
    const t2 = setTimeout(() => setPhase("sub"), 1600);
    const t3 = setTimeout(() => finish(), 4000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      document.removeEventListener("keydown", onKey);
    };
  }, [finish, onDone]);

  if (phase === "done") return null;

  const logoIn = phase === "logo" || phase === "sub" || phase === "out";
  const subIn  = phase === "sub"  || phase === "out";
  const isOut  = phase === "out";

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
        transition: isOut ? "opacity 1.1s cubic-bezier(0.76,0,0.24,1)" : "none",
        pointerEvents: isOut ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "relative",
          width: "clamp(300px, 46vw, 560px)",
          aspectRatio: "16 / 9",
          opacity: logoIn ? 1 : 0,
          transform: logoIn
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.96)",
          transition:
            "opacity 1.6s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Image
          src="/brand/lamora-logo-new.png"
          alt="LAMORA"
          fill
          className="object-contain"
          style={{ mixBlendMode: "screen" }}
          sizes="(max-width: 768px) 320px, 560px"
          priority
        />
        {/* Radial vignette dissolves the rectangular PNG background into the entrance bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 62% 58% at center, transparent 52%, #1B2942 88%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* "Pure cashmere" fades in below */}
      <p
        className="font-sans"
        style={{
          marginTop: "2rem",
          fontSize: "0.6rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(244,239,229,0.38)",
          opacity: subIn ? 1 : 0,
          transition: "opacity 1s ease",
          transitionDelay: subIn ? "0.15s" : "0s",
        }}
      >
        Pure cashmere
      </p>

      {/* Enter */}
      <button
        onClick={finish}
        className="font-sans"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(244,239,229,0.25)",
          background: "none",
          border: "none",
          cursor: "pointer",
          opacity: subIn ? 1 : 0,
          transition: "opacity 0.8s ease",
          transitionDelay: subIn ? "0.6s" : "0s",
          padding: "0.5rem 1.5rem",
        }}
        aria-label="Enter site"
      >
        Enter
      </button>
    </div>
  );
}
