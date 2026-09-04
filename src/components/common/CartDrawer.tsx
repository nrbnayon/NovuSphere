"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatTk } from "@/utils/formatters";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function CartDrawer() {
  const { cart, itemCount, totalTk, isCartOpen, setIsCartOpen, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    showToast("Checkout Simulated", "Your order has been placed in preview mode! Thank you for testing.", "success");
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12151E] border-l border-white/10 text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Collected Assets</h2>
                <p className="text-xs text-gray-400">{itemCount} items ready for acquisition</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Your bag is empty</h3>
                <p className="text-xs max-w-xs mb-6 text-gray-400">
                  Browse our curated discovery gallery to collect exclusive generative art & 3D assets.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple/90 text-white text-sm font-medium transition-colors"
                >
                  Explore Showcase
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.art.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                    <Image
                      src={item.art.imageUrl}
                      alt={item.art.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-white truncate pr-2">
                          {item.art.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.art.id)}
                          className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400">{item.art.creator.name}</p>
                    </div>

                    <div className="flex justify-between items-baseline mt-2">
                      <span className="text-xs text-gray-500">Edition #{item.art.edition.current}</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {formatTk(item.art.priceTk)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Network Gas / Mint Fee</span>
                  <span className="text-emerald-400 font-medium">Free (Promotional)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                  <span>Subtotal</span>
                  <span className="text-brand-cyan text-lg">{formatTk(totalTk)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="px-4 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow transition-all"
                >
                  <span>Complete Acquisition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
