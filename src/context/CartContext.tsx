"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { ArtItem, CartItem } from "@/types";
import { useToast } from "./ToastContext";

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  totalTk: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (art: ArtItem) => void;
  removeFromCart: (artId: string) => void;
  clearCart: () => void;
  likedIds: string[];
  toggleLike: (art: ArtItem) => void;
  isLiked: (artId: string) => boolean;
  quickViewItem: ArtItem | null;
  openQuickView: (art: ArtItem) => void;
  closeQuickView: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "novusphere_cart";
const LIKES_STORAGE_KEY = "novusphere_likes";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>(["art-1", "art-7"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<ArtItem | null>(null);
  const { showToast } = useToast();

  const cartRef = useRef<CartItem[]>(cart);
  cartRef.current = cart;

  const likedIdsRef = useRef<string[]>(likedIds);
  likedIdsRef.current = likedIds;

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedLikes = localStorage.getItem(LIKES_STORAGE_KEY);
      if (savedLikes) {
        setLikedIds(JSON.parse(savedLikes));
      }
    } catch {
      // Storage access error or SSR fallback
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Fallback
    }
  }, [cart]);

  // Sync likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedIds));
    } catch {
      // Fallback
    }
  }, [likedIds]);

  const addToCart = useCallback(
    (art: ArtItem) => {
      const exists = cartRef.current.some((item) => item.art.id === art.id);
      if (exists) {
        showToast("Already in Bag", `"${art.title}" is already in your collected items.`, "info");
      } else {
        setCart((prev) => [...prev, { art, addedAt: Date.now() }]);
        showToast("Added to Collection", `"${art.title}" was added to your bag.`, "success");
      }
      setIsCartOpen(true);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (artId: string) => {
      const item = cartRef.current.find((i) => i.art.id === artId);
      if (item) {
        showToast("Item Removed", `Removed "${item.art.title}" from bag.`, "info");
      }
      setCart((prev) => prev.filter((i) => i.art.id !== artId));
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    showToast("Bag Cleared", "All items have been removed from your bag.", "info");
  }, [showToast]);

  const toggleLike = useCallback(
    (art: ArtItem) => {
      const isCurrentlyLiked = likedIdsRef.current.includes(art.id);
      if (isCurrentlyLiked) {
        setLikedIds((prev) => prev.filter((id) => id !== art.id));
        showToast("Removed from Favorites", `Removed "${art.title}" from your wishlist.`, "info");
      } else {
        setLikedIds((prev) => [...prev, art.id]);
        showToast("Saved to Favorites", `Added "${art.title}" to your favorites.`, "success");
      }
    },
    [showToast]
  );

  const isLiked = useCallback(
    (artId: string) => {
      return likedIds.includes(artId);
    },
    [likedIds]
  );

  const openQuickView = useCallback((art: ArtItem) => {
    setQuickViewItem(art);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewItem(null);
  }, []);

  const itemCount = cart.length;
  const totalTk = cart.reduce((sum, item) => sum + item.art.priceTk, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        totalTk,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        likedIds,
        toggleLike,
        isLiked,
        quickViewItem,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const fallbackCart: CartContextType = {
  cart: [],
  itemCount: 0,
  totalTk: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  likedIds: [],
  toggleLike: () => {},
  isLiked: () => false,
  quickViewItem: null,
  openQuickView: () => {},
  closeQuickView: () => {},
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    return fallbackCart;
  }
  return context;
}
