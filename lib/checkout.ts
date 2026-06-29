// CHECKOUT SEAM — this is the single file to touch when wiring payments.
//
// Current state: calls /api/checkout (Stripe). If STRIPE_SECRET_KEY is not set,
// the API route logs a warning and returns { url: null }, keeping the UI safe.
//
// PATH A — Stripe Checkout (active implementation in app/api/checkout/route.ts):
//   1. Add STRIPE_SECRET_KEY to Vercel env vars.
//   2. Create products in Stripe dashboard → copy price IDs into STRIPE_PRICE_IDS
//      in lib/products.ts.
//   3. Done — Stripe hosts the payment page.
//
// PATH B — Headless Shopify (alternative):
//   1. Set SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN.
//   2. Replace /api/checkout with a Shopify cartCreate/cartLinesAdd flow.
//   3. Return cart.checkoutUrl here instead.

import type { CartItem } from "./cart";

export async function createCheckout(
  items: CartItem[]
): Promise<{ url: string | null }> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: "Unknown error" }));
      console.error("[checkout]", error);
      return { url: null };
    }

    const { url } = await res.json();
    return { url: url ?? null };
  } catch (err) {
    console.error("[checkout]", err);
    return { url: null };
  }
}
