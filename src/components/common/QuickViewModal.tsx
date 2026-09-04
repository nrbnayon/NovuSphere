"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatTk } from "@/utils/formatters";
import { X, Heart, ShoppingBag, ShieldCheck, Eye, Sparkles } from "lucide-react";

export default function QuickViewModal() {
  const { quickViewItem, closeQuickView, addToCart, isLiked, toggleLike } = useCart();

  if (!quickViewItem) return null;

  const liked = isLiked(quickViewItem.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#141722] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white z-10 animate-fade-in">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-black/40">
            <Image
              src={quickViewItem.imageUrl}
              alt={quickViewItem.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Edition #{quickViewItem.edition.current} of {quickViewItem.edition.total}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Stats */}
              <div className="flex items-center justify-between text-xs text-brand-cyan mb-2 font-medium">
                <span>{quickViewItem.category}</span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Eye className="w-3.5 h-3.5" />
                  {quickViewItem.likes * 3 + 140} views
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-black tracking-tight text-white mb-1">
                {quickViewItem.title}
              </h2>
              <p className="text-xs text-gray-400 font-medium mb-4">
                {quickViewItem.subtitle}
              </p>

              {/* Creator Pill */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={quickViewItem.creator.avatar}
                    alt={quickViewItem.creator.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white truncate">
                      {quickViewItem.creator.name}
                    </span>
                    {quickViewItem.creator.verified && (
                      <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{quickViewItem.creator.handle}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 leading-relaxed mb-4 line-clamp-4">
                {quickViewItem.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {quickViewItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/5 text-gray-300 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing & Actions */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                    Acquisition Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-emerald-400">
                      {formatTk(quickViewItem.priceTk)}
                    </span>
                    <span className="text-xs text-gray-400">
                      (~{quickViewItem.priceEth} ETH / ${quickViewItem.priceUsd})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(quickViewItem)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    liked
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                  title={liked ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewItem);
                    closeQuickView();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Collect Asset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
