"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { CURRENCY } from "@/lib/products";
import { createCheckout } from "@/lib/checkout";
import { useState } from "react";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function CartDrawer() {
  const { items, subtotal, count, updateQty, removeItem, isOpen, closeCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutSoon, setCheckoutSoon] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  async function handleCheckout() {
    setCheckingOut(true);
    const { url } = await createCheckout(items);
    if (url) {
      window.location.href = url;
    } else {
      setCheckoutSoon(true);
      setCheckingOut(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-paper-raised flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <div>
            <p className="text-eyebrow">Your bag</p>
            <p className="font-display text-lg text-ink font-light mt-0.5">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={closeCart}
            aria-label="Close bag"
            className="p-1 text-muted hover:text-ink transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.2" />
              <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <p className="font-display text-2xl text-ink/40 font-light">Your bag is empty.</p>
              <button
                onClick={closeCart}
                className="text-eyebrow text-brass border-b border-brass/30 pb-0.5"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.slug}-${item.weightId}`} className="flex gap-4">
                <div className="relative w-20 h-24 shrink-0 bg-paper overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-eyebrow mb-0.5">{item.colourwayLabel}</p>
                  <p className="font-display text-ink font-light text-base">{item.name}</p>
                  <p className="font-sans text-xs text-muted mb-3">{item.weightLabel}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-line">
                      <button
                        onClick={() => updateQty(item.slug, item.weightId, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-sans text-sm text-ink w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.slug, item.weightId, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-sans text-sm text-ink">
                        {formatPrice(item.price * item.qty)}
                      </p>
                      <button
                        onClick={() => removeItem(item.slug, item.weightId)}
                        className="text-muted hover:text-ink transition-colors text-xs font-sans underline-offset-2 hover:underline"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-sans text-sm text-muted">Subtotal</p>
              <p className="font-display text-xl text-ink font-light">{formatPrice(subtotal)}</p>
            </div>
            <p className="font-sans text-xs text-muted">
              Shipping and taxes calculated at checkout.
            </p>
            {checkoutSoon ? (
              <div className="bg-ink text-paper px-4 py-3 text-sm font-sans text-center">
                Checkout coming soon — we&apos;ll be in touch.
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-ink text-paper font-sans text-sm tracking-wider uppercase py-4 hover:bg-ink-soft transition-colors duration-200 disabled:opacity-60"
              >
                {checkingOut ? "Preparing…" : "Checkout"}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
