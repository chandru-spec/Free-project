"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StateStorage } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  colour: string;
  quantity: number;
}

interface BoutiqueState {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isVideoModalOpen: boolean;
  quickViewSlug: string | null;
  hasHydrated: boolean;

  setHasHydrated: (val: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openVideoModal: () => void;
  closeVideoModal: () => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;

  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string, size: string, colour: string) => void;
  updateQuantity: (productId: string, size: string, colour: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
}

const safeLocalStorage: StateStorage = {
  getItem: (name: string): string | null => {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(name, value);
    } catch {
      // Ignore storage quota or private browsing errors
    }
  },
  removeItem: (name: string): void => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(name);
    } catch {
      // Ignore
    }
  },
};

export const useBoutiqueStore = create<BoutiqueState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,
      isSearchOpen: false,
      isVideoModalOpen: false,
      quickViewSlug: null,
      hasHydrated: false,

      setHasHydrated: (val) => set({ hasHydrated: val }),
      openCart: () => set({ isCartOpen: true, isSearchOpen: false }),
      closeCart: () => set({ isCartOpen: false }),
      openSearch: () => set({ isSearchOpen: true, isCartOpen: false }),
      closeSearch: () => set({ isSearchOpen: false }),
      openVideoModal: () => set({ isVideoModalOpen: true }),
      closeVideoModal: () => set({ isVideoModalOpen: false }),
      openQuickView: (slug) => set({ quickViewSlug: slug }),
      closeQuickView: () => set({ quickViewSlug: null }),

      addToCart: (incoming) => {
        const qty = incoming.quantity ?? 1;
        const current = get().cart;
        const idx = current.findIndex(
          (i) =>
            i.productId === incoming.productId &&
            i.size === incoming.size &&
            i.colour === incoming.colour
        );

        if (idx > -1) {
          const updated = [...current];
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + qty,
          };
          set({ cart: updated, isCartOpen: true });
        } else {
          set({
            cart: [...current, { ...incoming, quantity: qty }],
            isCartOpen: true,
          });
        }
      },

      removeFromCart: (productId, size, colour) => {
        set({
          cart: get().cart.filter(
            (i) =>
              !(i.productId === productId && i.size === size && i.colour === colour)
          ),
        });
      },

      updateQuantity: (productId, size, colour, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size, colour);
          return;
        }
        set({
          cart: get().cart.map((i) =>
            i.productId === productId && i.size === size && i.colour === colour
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) => {
        const current = get().wishlist;
        if (current.includes(productId)) {
          set({ wishlist: current.filter((id) => id !== productId) });
        } else {
          set({ wishlist: [...current, productId] });
        }
      },
    }),
    {
      name: "rera-boutique-store-v1",
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
