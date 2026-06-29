# LAMORA

Pure cashmere throws storefront — Next.js App Router, TypeScript, Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Adding images

Drop renamed files into `/public/brand/`, `/public/lifestyle/`, and `/public/products/`. See `§6` of the build brief for the canonical rename map.

## Updating prices or currency

Open `lib/products.ts`. Edit the `WEIGHTS` array near the top — each weight has `gsm` and `price`. Change `CURRENCY` for the symbol. No other files need touching.

## Checkout integration

The checkout seam is `lib/checkout.ts` — a single file with a stub that returns `{ url: null }`. Replace the stub with either:

- **Path A (Stripe):** POST cart to `app/api/checkout/route.ts`, return `session.url`
- **Path B (Shopify):** Use Storefront API `cartCreate` / `cartLinesAdd`, return `cart.checkoutUrl`

Full instructions are in comments at the top of `lib/checkout.ts`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in values when integrating payments or email:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
STRIPE_SECRET_KEY=...
SHOPIFY_STORE_DOMAIN=...
SHOPIFY_STOREFRONT_TOKEN=...
```

## PLACEHOLDERs to fill in

Search the codebase for `PLACEHOLDER` to find all items awaiting owner input:

- `lib/products.ts` — confirm `gsm`, `price`, `CURRENCY`
- `app/contact/page.tsx` — real email and address
- `app/heritage/page.tsx` — name origin story, founder background
- `app/sourcing/page.tsx` — fibre origin, certifications, finishing location
- `app/sitemap.ts` / `app/robots.ts` — set `NEXT_PUBLIC_SITE_URL` in env

## Deploy to Vercel

1. Push this repo to GitHub
2. Import on vercel.com → Framework: Next.js (auto-detected)
3. Add env vars in Vercel dashboard
4. Deploy — zero config needed
