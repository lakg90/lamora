"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { WeightId } from "./products";

export type CartItem = {
  slug: string;
  weightId: WeightId;
  name: string;
  colourwayLabel: string;
  weightLabel: string;
  price: number;
  qty: number;
  image: string;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "UPDATE_QTY"; slug: string; weightId: WeightId; qty: number }
  | { type: "REMOVE"; slug: string; weightId: WeightId }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.slug === action.item.slug && i.weightId === action.item.weightId
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.slug === action.item.slug && i.weightId === action.item.weightId
              ? { ...i, qty: i.qty + action.item.qty }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.slug === action.slug && i.weightId === action.weightId
            ? { ...i, qty: Math.max(1, action.qty) }
            : i
        ),
      };
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => !(i.slug === action.slug && i.weightId === action.weightId)
        ),
      };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQty: (slug: string, weightId: WeightId, qty: number) => void;
  removeItem: (slug: string, weightId: WeightId) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lamora-cart");
      if (stored) {
        dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lamora-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const count = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        count,
        subtotal,
        addItem: (item) => dispatch({ type: "ADD", item }),
        updateQty: (slug, weightId, qty) =>
          dispatch({ type: "UPDATE_QTY", slug, weightId, qty }),
        removeItem: (slug, weightId) =>
          dispatch({ type: "REMOVE", slug, weightId }),
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
