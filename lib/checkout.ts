// INTEGRATION — This is the single swap point for payments.
//
// PATH A — Stripe Checkout (recommended for a small catalogue):
//   1. Add STRIPE_SECRET_KEY to env.
//   2. Create app/api/checkout/route.ts -> creates a Stripe Checkout Session
//      from `items` (map slug+weightId -> price). Return session.url.
//   3. Replace this stub to POST the cart to /api/checkout and return { url }.
//   Stripe hosts the payment page (cards, tax, fraud). You manage inventory.
//
// PATH B — Headless Shopify (best if you want inventory/orders/back-office):
//   1. Set SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_TOKEN.
//   2. Replace lib/products.ts reads with Storefront API (GraphQL) queries.
//   3. Build a Shopify cart (cartCreate / cartLinesAdd) and return cart.checkoutUrl here.
//   Shopify hosts checkout and owns inventory/orders.

import type { CartItem } from "./cart";

export async function createCheckout(
  items: CartItem[]
): Promise<{ url: string | null }> {
  // STUB — replace with Stripe or Shopify integration
  console.log("[checkout stub] items:", items);
  return { url: null };
}
