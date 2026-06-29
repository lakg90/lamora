"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

type Phase = "idle" | "logo" | "wordmark" | "sub" | "done" | "out";

export default function EntranceSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");

  const finish = useCallback(() => {
    setPhase("out");
    setTimeout(() => {
      sessionStorage.setItem("lamora-intro-seen", "1");
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
    const t2 = setTimeout(() => setPhase("wordmark"), 1000);
    const t3 = setTimeout(() => setPhase("sub"), 1700);
    const t4 = setTimeout(() => finish(), 3800);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
      document.removeEventListener("keydown", onKey);
    };
  }, [finish, onDone]);

  if (phase === "done") return null;

  const visible = phase !== "idle";
  const out = phase === "out";

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
      style={{
        opacity: out ? 0 : 1,
        transform: out ? "translateY(-2%)" : "translateY(0)",
        transition: out
          ? "opacity 1s cubic-bezier(0.76,0,0.24,1), transform 1.1s cubic-bezier(0.76,0,0.24,1)"
          : "none",
        pointerEvents: out ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center select-none" style={{ gap: "2rem" }}>
        {/* Logo mark only */}
        <div
          style={{
            width: 72,
            height: 72,
            position: "relative",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Image
            src="/brand/lamora-logo.png"
            alt="LAMORA"
            fill
            className="object-contain"
            style={{ filter: "brightness(10) saturate(0)" }}
            sizes="72px"
            priority
          />
        </div>

        {/* Thin brass rule */}
        <div
          style={{
            height: "1px",
            background: "#AE8B4C",
            width: phase === "wordmark" || phase === "sub" || phase === "out" ? "64px" : "0px",
            transition: "width 0.8s cubic-bezier(0.76,0,0.24,1)",
            transitionDelay: "0.1s",
          }}
        />

        {/* Wordmark */}
        <div style={{ textAlign: "center" }}>
          <p
            className="font-display text-paper"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 300,
              letterSpacing: "0.35em",
              opacity: phase === "wordmark" || phase === "sub" || phase === "out" ? 1 : 0,
              transform: phase === "wordmark" || phase === "sub" || phase === "out" ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            LAMORA
          </p>
          <p
            className="font-sans text-paper"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              marginTop: "0.6rem",
              opacity: phase === "sub" || phase === "out" ? 0.35 : 0,
              transition: "opacity 0.8s ease",
              textTransform: "uppercase",
            }}
          >
            Cashmere
          </p>
        </div>
      </div>

      {/* Enter */}
      <button
        onClick={finish}
        className="absolute bottom-10 font-sans text-paper"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: phase === "sub" ? 0.3 : 0,
          transition: "opacity 0.6s ease 0.4s",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Enter site"
      >
        Enter
      </button>
    </div>
  );
}
