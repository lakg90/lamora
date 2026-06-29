import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartItem } from "@/lib/cart";
import { STRIPE_PRICE_IDS } from "@/lib/products";

// Stripe Checkout session creator.
// Requires STRIPE_SECRET_KEY in environment variables.
// PLACEHOLDER: Create products in your Stripe dashboard, then update
// STRIPE_PRICE_IDS in lib/products.ts with the real price IDs.

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-06-24.dahlia" });
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }

    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    // Build line items — two paths:
    // PATH A (recommended): Use pre-created Stripe Price IDs (fill STRIPE_PRICE_IDS in lib/products.ts)
    // PATH B: Use ad-hoc price_data (works without pre-creating prices, but loses Stripe reporting)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const priceId = STRIPE_PRICE_IDS[item.weightId];

      if (priceId && !priceId.startsWith("price_PLACEHOLDER")) {
        // PATH A — pre-created Price ID
        return { price: priceId, quantity: item.qty };
      }

      // PATH B — ad-hoc price_data
      return {
        quantity: item.qty,
        price_data: {
          currency: "gbp", // PLACEHOLDER: update to match CURRENCY in lib/products.ts
          unit_amount: Math.round(item.price * 100), // pence
          product_data: {
            name: `${item.name} — ${item.colourwayLabel}`,
            description: item.weightLabel,
            metadata: {
              slug: item.slug,
              weight: item.weightId,
            },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/shop?checkout=success`,
      cancel_url: `${siteUrl}/shop?checkout=cancelled`,
      shipping_address_collection: {
        allowed_countries: [
          "GB", "NO", "SE", "DK", "FI", "DE", "FR", "NL",
          "BE", "AT", "CH", "IT", "ES", "PT", "IE", "US",
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "gbp" },
            display_name: "Standard shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      payment_method_types: ["card"],
      metadata: {
        source: "lamora-web",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("[checkout]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
