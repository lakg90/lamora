import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LAMORA — Cashmere Throws",
    template: "%s — LAMORA",
  },
  description:
    "Pure cashmere throws, woven in two patterns and three colours. Made to outlast the season.",
  keywords: ["cashmere", "throws", "blankets", "luxury", "lamora"],
  openGraph: {
    type: "website",
    siteName: "LAMORA",
    title: "LAMORA — Cashmere Throws",
    description:
      "Pure cashmere throws, woven in two patterns and three colours. Made to outlast the season.",
    images: [{ url: "/lifestyle/bedroom.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAMORA — Cashmere Throws",
    description:
      "Pure cashmere throws, woven in two patterns and three colours. Made to outlast the season.",
    images: ["/lifestyle/bedroom.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-paper text-ink-soft antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
